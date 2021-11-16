import { buildCorsProxyUrl } from '../shared/index';
import { processRSS } from '../shared/podcatcher';
import parseXml from 'parseXml';
import axios from 'axios';

function update ( response ) {
  const rss_document = parseXml( response.data.contents );
  let feed = processRSS(rss_document.children[0])[0];
  feed.id = vm.podcastFeedsList.filter((item) => item.stale === false).length + 1;
  feed.media = assignIds(feed.media);
  feed.cast_url = cast_url;
  feed.stale = false;
  try {
    vm.podcastFeedsList = vm.podcastFeedsList.filter((item) => item.cast_url !== cast_url).concat(feed);
    sessionStorage.setItem(cast_url, JSON.stringify(Object.assign({}, feed, {media: feed.media.slice(0,15)})));
  } catch (error){
    problems = JSON.stringify({feedsList: vm.podcastFeedsList, errorsList: vm.podcastErrorsList, sources: vm.myPodcasts});
    saveAs(problems, "Problems.json");
  }
};

function handle ( error ) {
  const feeds = vm.podcastFeedsList.filter((item) => item.cast_url === cast_url);

  if (feeds.length > 0) {
      feeds[0].info = "Error - See Details At Bottom";
  }

  const oldErrors = vm.podcastErrorsList.filter((lerror) => lerror.url === cast_url);
  if (oldErrors.length == 0) {
    vm.podcastErrorsList = vm.podcastErrorsList.concat({url:cast_url, error:error, id: vm.podcastErrorsList.length + 1});
  } else {
    const position = vm.podcastErrorsList.indexOf(oldErrors[0]);
    const ammendedError = Object.assign({}, oldErrors[0], {error:error});
    Vue.set(vm.podcastErrorsList, position, ammendedError);
  }
};

function loading () {
  if (this.podcastFeedsList.filter((item) => item.cast_url === cast_url).length === 0) {
    const oldResultRaw = sessionStorage.getItem(cast_url);

    if (oldResultRaw && oldResultRaw != null && oldResultRaw != undefined && oldResultRaw != "undefined") {
      const feed = JSON.parse(oldResultRaw);
      feed.info = "Loading...";
      feed.stale = true;
      this.podcastFeedsList = this.podcastFeedsList.concat(feed);
    }
  }
};

/**
  Load a podcast from XML feed.
    //.get(`https://gobetween.oklabs.org/${cast_url}`)
    //.get("http://127.0.0.1:5000/send/drinkin.xml")

*/
export function refresh ( cast_url ) {
  axios
    .get(buildCorsProxyUrl(cast_url))
    .then(update).catch(handle);
  loading();
};
