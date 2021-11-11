const podcastURLsTAG = "ServerlessPodcastingURLList";

const validCharSet = new Set("abcdefghijklmnopqrstuvwxyz" +
                            "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                            "0123456789" +
                            " _-");

const defaultPodcastURLs = ["https://www.spreaker.com/ihr/show/2372109/episodes/feed-passthrough",
       		                "https://itunes.apple.com/us/podcast/superdatascience/id1163599059?mt=2",
              		        "http://escapepod.org/feed/",
];

export { podcastURLsTAG, validCharSet, defaultPodcastURLs };