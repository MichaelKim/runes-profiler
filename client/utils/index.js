import QueryString from 'querystring';

const qs = QueryString.parse(window.location.search.slice(1));

function makeRequest(url, callback) {
  return fetch(url)
    .then(res => {
      if (res.ok) return res.json();
      throw 'HTTP Error ' + res.status;
    });
}

module.exports = { qs, makeRequest };
