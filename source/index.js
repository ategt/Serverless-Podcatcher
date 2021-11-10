const ExpandingInfoField = {
  props: ['channel'],
  template: '<div class=\"delete-confirm-container content collapsed content-pane-id popup\">\
                      <div class=\"delete-confirm-content content-hidden hidden content-hidden-id\">\
                        <div class=\"delete-confirm-container-text delete-confirm-container-result custom-hidden\">\
                          Removal Succeded\
                        </div>\
                        <div class=\"delete-confirm-container-text hidable\">\
                          Please confirm to perminently delete\
                        </div>\
                        <div class=\"delete-button-container delete-button-sub-container\">\
                          <div class=\"confirm-delete-button hidable\" v-on:click=\"confirmDelete\">\
                            Confirm\
                          </div>\
                          <div class=\"cancel-delete-button hidable\" v-on:click=\"hideDeletePane\">\
                            Cancel\
                          </div>\
                        </div>\
                      </div>\
                    </div>\
                    ',
  methods: {
    panelViewInit: function(context) {
      if (context.contentPane === undefined) {
        context.contentPane = context.$el;
      }

      if (context.contentPane && context.contentHeight === undefined) {
        context.contentPane.classList.remove("collapsed");
        context.contentHeight = context.contentPane.offsetHeight;
        context.contentPane.classList.add("collapsed");
      }
    },
    hideDeletePane: function() {
      const overlay = document.getElementById('background-overlay');
      overlay.style.display = 'none';

      if (this.contentPane) {
        this.panelViewInit(this);
        this.contentPane.style["max-height"] = "0px";
      }
    },
    confirmDelete: function() {
      this.$root.removePodcastURL(this.$parent.channel.cast_url);

      let parentDiv = this.$el.parentElement;

      while (!parentDiv.classList.contains("feed-panel") && parentDiv !== parentDiv.parentElement) {
        parentDiv = parentDiv.parentElement;
      }

      if ( parentDiv.classList.contains("feed-panel") ) {
        parentDiv.parentElement.style["max-height"] = parentDiv.parentElement.offsetHeight ? `${parentDiv.parentElement.offsetHeight}px` : "200px";
        parentDiv.parentElement.style.transition = "max-height 3.0s linear 0.0s";
        parentDiv.parentElement.style.overflow = "hidden";
  
        setInterval(function(){
          parentDiv.parentElement.style["max-height"] = "0px";
        }, 10);
      }

      console.log(`Did the delete thing with ${this.$parent.channel.cast_url}.`);
      const context = this;
      Array.from(this.$el.getElementsByClassName("delete-confirm-container-result")).forEach(item => item.classList.remove("custom-hidden"));
      Array.from(this.$el.getElementsByClassName("hidable")).forEach(item => item.classList.add("custom-hidden"));
      setInterval(function(){
        context.hideDeletePane();
      }, 600);
    },
  },
  mounted() {
    this.panelViewInit(this);
  },
};
Vue.component('podcast', {
  components: {
    'expanding-info-field': ExpandingInfoField,
  },
  props: ['channel'],
  data: function() {
    return {
      contentHeight: undefined,
      //maxHeight: this.contentHeight ? `${this.contentHeight}px` : "200px",
      //contentPane: this.$el,
    }
  },
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
                    <div class=\"title-bar\">\
                      <div class=\"title-correcting-div\"></div>\
                      <div class=\"title\">{{ channel.title }}</div>\
                      <div class=\"button-correcting-div\">\
                        <span class=\"delete-button\" v-on:click=\"deleteClick\">X</span>\
                        <expanding-info-field></expanding-info-field>\
                      </div>\
                    </div>\
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
            </div>',
  mounted() {
    this.panelViewInit(this);
  },
  methods: {
    panelViewInit: function(context) {
      context.contentPane = context.$el.getElementsByClassName("content-pane-id")[0];

      if (context.contentPane && context.contentHeight === undefined) {
        context.contentPane.classList.remove("collapsed");
        context.contentHeight = context.contentPane.offsetHeight;
        context.contentPane.classList.add("collapsed");
      }
    },
    deleteClick: function() {
      this.contentPane.style["max-height"] = this.contentHeight ? `${this.contentHeight}px` : "200px";
      const context = this;

      const overlay = document.getElementById('background-overlay');
      overlay.style.display = 'block';
      overlay.addEventListener("click", function(event) {
        overlay.style.display = 'none';
        Array.from(context.$children).filter(child => child.$vnode.tag.includes("expanding-info-field")).forEach(item => item.$vnode.componentInstance.hideDeletePane());
      });

      const localFunction = this.panelViewInit;
      const contentPane = this.contentPane;
      this.contentPane.addEventListener("transitionend", function(event) {
        if (event.target === contentPane) {
          localFunction(context);
        }
      });
    },
  },
})
Vue.component('podcast-feed-channel', {
  props: ['channel'],
  data: function() {
    return {
      maxHeight: this.contentHeight ? `${this.contentHeight}px` : "200px",
      contentHeight: -7,
      contentPane: null,
    }
  },
  template: '<div class=\"feed-panel\">\
                <div class=\"feed-image-panel\">\
                    <img class=\"feed-image\" v-bind:src=\"channel.image.url\" \>\
                </div>\
                <div>\
                    <div class=\"title\" v-on:click=\"deleteClick()\">{{ channel.title }}</div>\
                    <div class=\"description\" v-html=\"channel.description\"></div>\
                    <div class=\"media-panel\">\
                    </div>\
                </div>\
            </div>',
  methods: {
    panelViewInit: function(context) {
      context.contentPane = context.$el.getElementsByClassName("content-pane-id")[0];

      if (contentPane && context.contentHeight === -7) {
        contentPane.classList.remove("collapsed");
        context.contentHeight = contentPane.offsetHeight;
        contentPane.$el.classList.add("collapsed");
      }
    },
    deleteClick: function() {
      this.contentPane.style["max-height"] = this.contentHeight ? `${this.contentHeight}px` : "200px";
      const localFunction = this.panelViewInit;
      const contentPane = this.contentPane;
      const context = this;
      this.contentPane.addEventListener("transitionend", function(event) {
        if (event.target === contentPane) {
          localFunction(context);
        }
      });
    },
  },
  mounted() {
    this.panelViewInit(this);
  } 
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
            <div class=\"item-enclosure\">\
            	<a class=\"download-link\" v-if=\"item.media\" v-bind:href=\"item.media.url\">link</a>\
            	<a class=\"no-download-link\" v-else>No Media</a>\
            </div>\
        </div>",
    methods: {
            downloadMedia: function() {
            	if (this.item.media) {
                	this.$root.itemDownloader(this.item);
            	} else {
            		alert("No Media");
            	}
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
        //saveAs(`https://gobetween.oklabs.org/${item.media.url}`, this.getMediafilename(item), item.media.type);
    	axios
          .get(`https://api.allorigins.win/get?url=${encodeURIComponent(item.media.url)}`)
          .then(function (response) {
			  saveAs(response.data.contents, this.getMediafilename(item), item.media.type);
          });
    },
    feedRefresher: function(cast_url){
            axios
              .get(`https://api.allorigins.win/get?url=${encodeURIComponent(cast_url)}`)
              //.get(`https://gobetween.oklabs.org/${cast_url}`)
              //.get("http://127.0.0.1:5000/send/drinkin.xml")
              .then(function(response) {
                  const rss_document = parseXml(response.data.contents);
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
  },
  mounted () {
    myPodcasts.forEach(this.feedRefresher);

    window.onload = function(){
      var popup = document.getElementById('popup');
      var overlay = document.getElementById('background-overlay');
      var openButton = document.getElementById('openOverlay');
      document.onclick = function(e){
        if(e.target.id == 'backgroundOverlay'){
            popup.style.display = 'none';
            overlay.style.display = 'none';
        }
        if(e.target === openButton){
           popup.style.display = 'block';
            overlay.style.display = 'block';
        }
      };
    };
  },
})