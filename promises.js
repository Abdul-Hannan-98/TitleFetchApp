import http from 'http';
import https from 'https';
import { URL } from 'url';

const fetchTitle = (address) => {
  return new Promise((resolve, reject) => {
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
          resolve(match[1]);
        } else {
          resolve('NO RESPONSE');
        }
      });
    }).on('error', () => {
      resolve('NO RESPONSE');
    });
  });
};

export { fetchTitle };
