import { defaultPodcastURLs, podcastURLsTAG } from './CONSTANTS';

export function getPodcastsFromStorage () {
	// myPodcastsStorage;
	return localStorage.getItem(podcastURLsTAG);
};

export function loadPodcastUrls () {
	// myPodcastsStorage
	const podcastsFromStorage = getPodcastsFromStorage();
	return podcastsFromStorage ? JSON.parse(podcastsFromStorage) : defaultPodcastURLs;
};

export function buildCorsProxyUrl ( url ) {
	return `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
}