import { buildCorsProxyUrl } from '../shared/index';
import { saveAs } from 'file-saver';
import axios from 'axios';

export const getPodcast = function ( cast_url ) {
  return axios.get(buildCorsProxyUrl(cast_url));
};

export const download = function ( url ) {
  return axios.get(buildCorsProxyUrl(url));
};

export const saveFeeds = function ( podcasts ) {
  const proms = new Array();
  const results = new Array();

  for ( let line of podcasts ) {
     proms.push(axios.get(buildCorsProxyUrl(line), {responseType: 'blob'})
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
};