import { defaultPodcastURLs, podcastURLsTAG } from './CONSTANTS';

export function getPodcastsFromStorage () {
  return localStorage.getItem(podcastURLsTAG);
};

export function loadPodcastUrls () {
  const podcastsFromStorage = getPodcastsFromStorage();
  return podcastsFromStorage ? JSON.parse(podcastsFromStorage) : defaultPodcastURLs;
};

/**
  Roll a url into CORS Proxy usage.

  Previous options included:
    `https://gobetween.oklabs.org/${cast_url}`
    "http://127.0.0.1:5000/send/drinkin.xml"
    `https://api.allorigins.win/get?url=${encodeURIComponent(cast_url)}`
*/
export function buildCorsProxyUrl ( url ) {
  return `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
}