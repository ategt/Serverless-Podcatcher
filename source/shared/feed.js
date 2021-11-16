import { buildCorsProxyUrl } from '../shared/index';
import { processRSS, assignIds } from '../shared/podcatcher';
import { saveAs } from 'file-saver';
import parseXml from 'parseXml';
import axios from 'axios';

export default class Feeds {
  constructor ( store ) {
    this.store = store;
  }

  _update ( response ) {
  }

  _handle ( error ) {
  }

  refresh ( cast_url ) {
    axios
      .get(buildCorsProxyUrl(cast_url))
      .then(update).catch(handle);
  }
};