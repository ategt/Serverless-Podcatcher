import { processRSS, assignIds, getMediafilename } from '../shared/podcatcher';
import { loadPodcastUrls, savePodcastURLs } from '../../shared/index';
import { getPodcast, download } from '../../api/feed';
import { saveAs } from 'file-saver';
import parseXml from 'parseXml';

import Vue from 'vue';

// initial state
const state = () => ({
  podcastFeedsList: new Array(),
  podcastErrorsList: new Array(),
  myPodcasts: loadPodcastUrls(),
});

// getters
const getters = {};

// actions
const actions = {
  addPodcastURL ({ commit, dispatch, state }, url ) {
    getPodcast( url ).then(function (response) {
      dispatch("update", response);
    }).catch(function (error) {
      commit("refreshError", { error, cast_url: url });
    });

    const podcastSet = new Set(state.myPodcasts);

    podcastSet.add(url);
    
    const tempPodcasts = new Array();
    podcastSet.forEach((s) => tempPodcasts.push(s));

    commit("setMyPodcasts", tempPodcasts);
    dispatch("updatePodcastURLs");
  },
  update ({ commit, state }, response ) {
    const rss_document = parseXml( response.data.contents );

    let feed = processRSS(rss_document.children[0])[0];
    feed.id = state.podcastFeedsList.filter((item) => item.stale === false).length + 1;
    feed.media = assignIds(feed.media);
    feed.cast_url = cast_url;
    feed.stale = false;

    commit("appendFeed", { url, feed });
  },
  removePodcastURL ({ dispatch, state }, url ) {
    const podcasts = state.myPodcasts.filter((cast_url) => cast_url !== url).map((cx) => cx);
    console.log(`Removing ${url}`);
    dispatch("replaceFeeds", podcasts);
  },
  download ({ state }, item ) {
    download(item.media.url)
      .then(function (response) {
        saveAs(response.data.contents, getMediafilename(item), item.media.type);
      });
  },
  replaceFeeds ({ commit }, replacementFeeds ) {
    savePodcastURLs(replacementFeeds);
    commit("setMyPodcasts", replacementFeeds);
  },
  saveDebug ({ state }, getFeeds ) {
    saveAs(new Blob([JSON.stringify(state.podcastFeedsList)], {type:"plain/text"}), "Debugging-Feeds.json");
    saveAs(new Blob([state.myPodcasts.join("\n")], {type:"plain/text"}), "feeds.txt");

    if ( getFeeds ) {
      saveFeeds( state.myPodcasts );
    }
  }
};

// mutations
const mutations = {
  appendFeed ( state, { url, feed } ) {
    try {
      state.podcastFeedsList = state.podcastFeedsList.filter((item) => item.cast_url !== url).concat(feed);
      sessionStorage.setItem(url, JSON.stringify(Object.assign({}, feed, {media: feed.media.slice(0,15)})));
    } catch ( error ) {
      problems = JSON.stringify({feedsList: state.podcastFeedsList, errorsList: state.podcastErrorsList, sources: state.myPodcasts});
      saveAs(problems, "Problems.json");
    }
  },
  markLoading ( state, cast_url ) {
    if ( state.podcastFeedsList.filter((item) => item.cast_url === cast_url).length === 0 ) {
      const oldResultRaw = sessionStorage.getItem( cast_url );

      if ( oldResultRaw && oldResultRaw != null && oldResultRaw != undefined && oldResultRaw != "undefined" ) {
        const feed = JSON.parse(oldResultRaw);
        feed.info = "Loading...";
        feed.stale = true;
        state.podcastFeedsList = state.podcastFeedsList.concat(feed);
      }
    }
  },
  refreshError ( state, { error, cast_url }) {
    const feeds = state.podcastFeedsList.filter((item) => item.cast_url === cast_url);

    if (feeds.length > 0) {
      feeds[0].info = "Error - See Details At Bottom";
    }

    const oldErrors = state.podcastErrorsList.filter((lerror) => lerror.url === cast_url);

    if (oldErrors.length == 0) {
      state.podcastErrorsList = state.podcastErrorsList.concat({url:cast_url, error:error, id: state.podcastErrorsList.length + 1});
    } else {
      const position = state.podcastErrorsList.indexOf(oldErrors[0]);
      const ammendedError = Object.assign({}, oldErrors[0], {error:error});
      Vue.set(state.podcastErrorsList, position, ammendedError);
    }
  },
  setMyPodcasts ( state, podcasts ) {
    state.myPodcasts = podcasts;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
