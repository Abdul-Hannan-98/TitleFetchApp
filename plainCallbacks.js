import http from 'http';
import https from 'https';
import { URL } from 'url';

const fetchTitle = (address, callback) => {
  const url = new URL(address);
  const protocol = url.protocol === 'https:' ? https : http;

  protocol.get(address, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const match = data.match(/<title>(.*?)<\/title>/);
      if (match) {
        callback(null, match[1]);
      } else {
        callback('NO RESPONSE');
      }
    });
  }).on('error', (err) => {
    callback('NO RESPONSE');
  });
};

export { fetchTitle };
