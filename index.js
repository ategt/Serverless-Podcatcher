Vue.component('podcast', {
  props: ['channel'],
  template: '<div class=\"feed-panel\">\
                <div class=\"feed-image-panel\">\
                    <div class=\"feed-image-container\" v-if=\"channel.image\">\
                        <img class=\"feed-image\" v-bind:src=\"channel.image.url\" ></img>\
                    </div>\
                    <div class=\"feed-info-container\">\
                      <div v-if="channel.info">\
                          {{ channel.info }}\
                      </div>\
                    </div>\
                </div>\
                <div>\
                    <div class=\"title\">{{ channel.title }}</div>\
                    <div class=\"description\" v-html=\"channel.description\"></div>\
                    <div class=\"media-panel\" v-bind:class=\"{ \'feed-stale\': channel.stale }\">\
                        <podcast-feed-item \
                                        v-for=\"(item, index) in channel.media\"\
                                        v-bind:item=\"item\"\
                                        v-bind:index=\"index\"\
                                        v-bind:key=\"item.guid\"\
                                         ></podcast-feed-item>\
                    </div>\
                </div>\
            </div>'
})
Vue.component('podcast-feed-channel', {
  props: ['channel'],
  template: '<div class=\"feed-panel\">\
                <div class=\"feed-image-panel\">\
                    <img class=\"feed-image\" v-bind:src=\"channel.image.url\" \>\
                </div>\
                <div>\
                    <div class=\"title\">{{ channel.title }}</div>\
                    <div class=\"description\" v-html=\"channel.description\"></div>\
                    <div class=\"media-panel\">\
                    </div>\
                </div>\
            </div>'
})
Vue.component('problem', {
  props: ['issue'],
  template: '<div class=\"issue-pane\">\
              <div class=\"issue-panel-retry-wrapper\" v-on:click=\"refreshFeed\">\
                <div class=\"issue-panel\" >\
                  <div class=\"issue-main\">\
                    <span class=\"issue-explain\"><span class=\"issue-text\">Could not load </span><span class=\"issue-url\">{{ issue.url }}</span></span>\
                  </div>\
                  <div class=\"issue-info\">\
                    <div class=\"issue-refresh issue-info-item\">\
                      Click to Retry\
                    </div>\
                    <div class=\"issue-message issue-info-item\">\
                      {{ issue.error.message }} \
                    </div>\
                  </div>\
                </div>\
              </div>\
              <div class=\"issue-panel-remove-wrapper\" v-on:click=\"removeFeed\">\
                <div class=\"issue-panel-remove-top\">\
                </div>\
                <div class=\"issue-panel-remove-content\">\
                    <span class=\"remove-feed-button issue-remove-feed-button\">X</span>\
                </div>\
                <div class=\"issue-panel-remove-bottom\">\
                </div>\
              </div>\
            </div>',
  methods: {
            refreshFeed: function() {
                this.$root.feedRefresher(this.issue.url);
            },
            removeFeed: function() {
                this.$root.removePodcastURL(this.issue.url);
                this.$root.podcastErrorsList = this.$root.podcastErrorsList.filter((item) => item.id !== this.issue.id);
            }
  }
})
Vue.component('podcast-feed-item', {
  props: ['item'],
  template: "<div class=\"item\" v-on:click=\"downloadMedia\">\
                <div class=\"download-button-holder\">\
                    <span class=\"download-symbol download-button\" />\
                </div>\
                <div class=\"item-title\">{{ item.title }}</div>\
                <div class=\"item-description\" v-html=\"item.description\"></div>\
            <div class=\"item-enclosure\"><a v-bind:href=\"item.media.url\">link</a></div>\
        </div>",
    methods: {
            downloadMedia: function() {
                this.$root.itemDownloader(this.item);
            }
        }
})
Vue.component('add-podcast-feed-url', {
  data: function() {
    return {
      newFeedUrl: '',
    }
  },
  template: "<div class=\"add-url-form\">\
    <div class=\"add-url-form-subpanel\">\
      <div class=\"add-url-form-input-div\">\
        <input class=\"add-url-form-input\" v-model=\"newFeedUrl\" v-on:keydown=\"submitForm($event)\" placeholder=\"Feed URL To Be Added\"></input>\
      </div>\
      <div class=\"add-podcast-feed-button\" v-on:click=\"addFeed\">\
        Add Podcast\
      </div>\
    </div>\
  </div>\
  ",
  methods: {
          addFeed: function() {
            this.$root.addPodcastURL(this.newFeedUrl);
          },
          submitForm: function(event) {
            if (event.key === "Enter") {
              this.addFeed();
            }
          }
  },
})

const podcastURLsTAG = "ServerlessPodcastingURLList";

const validCharSet = new Set("abcdefghijklmnopqrstuvwxyz" +
                            "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                            "0123456789" +
                            " _-");

const defaultPodcastURLs = ["https://www.spreaker.com/ihr/show/2372109/episodes/feed-passthrough",
                            "https://itunes.apple.com/us/podcast/superdatascience/id1163599059?mt=2",
                            "http://escapepod.org/feed/"
];

let myPodcastsStorage = localStorage.getItem(podcastURLsTAG);
let myPodcasts = myPodcastsStorage ? JSON.parse(myPodcastsStorage) : defaultPodcastURLs;

const vm = new Vue({
  el: '#app',         
  data: {
    podcastFeedsList: new Array(),
    podcastErrorsList: new Array(),
    myPodcasts: myPodcastsStorage ? JSON.parse(myPodcastsStorage) : defaultPodcastURLs,
  },
  methods: {
    addPodcastURL: function (url) {
        this.feedRefresher(url);

        const podcastSet = new Set(vm.myPodcasts);

        podcastSet.add(url);
        
        const tempPodcasts = new Array();
        podcastSet.forEach((s) => tempPodcasts.push(s));

        vm.myPodcasts = tempPodcasts;
        this.updatePodcastURLs();
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
        download(`https://cors-anywhere.herokuapp.com/${item.media.url}`, this.getMediafilename(item));
    },
    feedRefresher: function(cast_url){
            axios
              .get(`https://cors-anywhere.herokuapp.com/${cast_url}`)
              .then(function(response) {
                  const rss_document = parseXml(response.data);
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
                    download(problems, "Problems.json");
                  }
              }).catch(function(error) {
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
              });

            if (this.podcastFeedsList.filter((item) => item.cast_url === cast_url).length === 0) {
              const oldResultRaw = sessionStorage.getItem(cast_url);

              if (oldResultRaw && oldResultRaw != null && oldResultRaw != undefined && oldResultRaw != "undefined") {
                const feed = JSON.parse(oldResultRaw);
                feed.info = "Loading...";
                feed.stale = true;
                this.podcastFeedsList = this.podcastFeedsList.concat(feed);
              }
            }
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
    }          
  },
  mounted () {
    myPodcasts.forEach(this.feedRefresher);
  },
})