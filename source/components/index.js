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