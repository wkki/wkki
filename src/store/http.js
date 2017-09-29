import axios from 'axios';

let baseURL = 'https://trello.com/1';

let http = axios.create({
  baseURL: baseURL,
  params: {
    key: process.env.WKKI_TRELLO_API_KEY
  }
});

let setToken = (oauthToken) => {
  console.log('updating axios')
  http.defaults.params.token = oauthToken
};

export default {
  http,
  setToken
}
