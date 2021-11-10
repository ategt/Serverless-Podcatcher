const encodeGetParams = p => 
  Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

async function perform_search(search_term) {
    const url = "https://us.api.iheart.com/api/v3/search/all";
    const params = {'boostMarketId':159,
                      'bundle':false,
                      'keyword':true,
                      'maxRows':20,
                      'countryCode':'US',
                      'startIndex':0,
                      'album':false,
                      'artist':false,
                      'playlist':false,
                      'station':false,
                      'podcast':true,
                      'track':false};

    params.keywords = search_term;

    return await axios.get(`${url}?${encodeGetParams(params)}`);
};

async function fetchShowEpisodes(showId) {
    const url = `https://us.api.iheart.com/api/v3/podcast/podcasts/${showId}/episodes`;
    const params = {newEnabled:false,
    				limit:5,
    				sortBy:"startDate-desc"};

    params.keywords = search_term;

    return await axios.get(`${url}?${encodeGetParams(params)}`);
};

kellyres = await perform_search("Jesse kelly");
kellyres_json = new Blob([JSON.stringify(kellyres)], {type: "text/plain;charset=utf-8"});
saveAs(kellyres_json, "jessekellysearch2.json");

`https://us.api.iheart.com/api/v3/podcast/podcasts/29962174/episodes?newEnabled=false&limit=5&sortBy=startDate-desc`

jk0ep = await axios.get(`https://us.api.iheart.com/api/v3/podcast/podcasts/29962174/episodes?newEnabled=false&limit=5&sortBy=startDate-desc`);
jk0epjson = new Blob([JSON.stringify(jk0ep)], {type: "text/plain;charset=utf-8"});
saveAs(jk0epjson, "jessekellysearch0episoderesult-limit5.json");

