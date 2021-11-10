export const podcastURLsTAG = "ServerlessPodcastingURLList";

export const validCharSet = new Set("abcdefghijklmnopqrstuvwxyz" +
                            "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                            "0123456789" +
                            " _-");

export const defaultPodcastURLs = ["https://www.spreaker.com/ihr/show/2372109/episodes/feed-passthrough",
       		                       "https://itunes.apple.com/us/podcast/superdatascience/id1163599059?mt=2",
              		               "http://escapepod.org/feed/",
];

export let myPodcastsStorage = localStorage.getItem(podcastURLsTAG);
export let myPodcasts = myPodcastsStorage ? JSON.parse(myPodcastsStorage) : defaultPodcastURLs;