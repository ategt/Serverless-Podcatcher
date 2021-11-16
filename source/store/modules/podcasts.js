import { loadPodcastUrls } from '../../shared/index';
import { saveAs } from 'file-saver';

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
  addPodcastURL ({ commit, state }, url ) {
    this.feedRefresher(url);

    const podcastSet = new Set(vm.myPodcasts);

    podcastSet.add(url);
    
    const tempPodcasts = new Array();
    podcastSet.forEach((s) => tempPodcasts.push(s));

    vm.myPodcasts = tempPodcasts;
    this.updatePodcastURLs();
  },
  addPodcastURL ({ commit, state, dispatch }, { url, feed }) {
    try {
      vm.podcastFeedsList = vm.podcastFeedsList.filter((item) => item.cast_url !== cast_url).concat(feed);
      sessionStorage.setItem(cast_url, JSON.stringify(Object.assign({}, feed, {media: feed.media.slice(0,15)})));
    } catch (error){
      problems = JSON.stringify({feedsList: vm.podcastFeedsList, errorsList: vm.podcastErrorsList, sources: vm.myPodcasts});
      saveAs(problems, "Problems.json");
    }
  },
    removePodcastURL: function (url) {
        vm.myPodcasts = vm.myPodcasts.filter((cast_url) => cast_url !== url).map((cx) => cx);
        console.log(`Removing ${url}`);
        this.updatePodcastURLs();
    },
    updatePodcastURLs: function () {
        localStorage.setItem(podcastURLsTAG, JSON.stringify(vm.myPodcasts));
    },
    itemDownloader: function (item) {
        //saveAs(`https://gobetween.oklabs.org/${item.media.url}`, this.getMediafilename(item), item.media.type);
      axios
          .get(`https://api.allorigins.win/get?url=${encodeURIComponent(item.media.url)}`)
          .then(function (response) {
        saveAs(response.data.contents, this.getMediafilename(item), item.media.type);
          });
    },
      getMediafilename: function(media) {
        let filename;
        let titleBaseFilename = "";

        // Try to generate the filename by the item title
        if (media != null && media.title != null) {
            const title = media.title;
            titleBaseFilename = Array.from(title).map(letter => validCharSet.has(letter) ? letter : "_").join("").trim();

            if (titleBaseFilename.length == 0) {
              titleBaseFilename = Array.from(new Array(12)).map(_ => Math.floor(Math.random() * 26) + 'a'.charCodeAt(0)).map(code => String.fromCharCode(code)).join('');
            }
        }

        const URLBaseFilename = fileNameFromUrl(media.media.url);

        if (!titleBaseFilename == "") {
            // Append extension
            const FILENAME_MAX_LENGTH = 220;
            if (titleBaseFilename.length > FILENAME_MAX_LENGTH) {
                titleBaseFilename = titleBaseFilename.substring(0, FILENAME_MAX_LENGTH);
            }
            filename = titleBaseFilename + URLBaseFilename.match(/(\.\w{3,4})$/g)[0];
        } else {
            // Fall back on URL file name
            filename = URLBaseFilename;
        }
        return filename;
    },
    replaceFeeds: function(replacementFeeds) {
      this.myPodcasts = replacementFeeds;
      this.updatePodcastURLs();
    },
    saveDebug: function(getFeeds) {
      saveAs(new Blob([JSON.stringify(vm.podcastFeedsList)], {type:"plain/text"}), "Debugging-Feeds.json");
      saveAs(new Blob([vm.myPodcasts.join("\n")], {type:"plain/text"}), "feeds.txt");

      if (getFeeds) {
        const proms = new Array();
        const results = new Array();

        for(let line of this.myPodcasts) {
           proms.push(axios.get(`https://gobetween.oklabs.org/${line}`, {responseType: 'blob'})
            .then(function (response) {
            results.push({source:line, response:response.data});
          })
          .catch(function (error) {
            console.error(error);
          }));
        }

        axios.all(proms)
          .then(function(not_sure){
            saveAs(JSON.stringify(results), `debug-feeds-${Math.random()}${Math.random()}${Math.random()}`.replace(/\./g,"") + ".json");
        });
      }
    }
}

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
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
