export default class Wrapper {
  constructor(apiKey, oauthToken) {
    this.wrapped = {};
    this.

    this.params = {
      key: apiKey,
      token: oauthToken
    };
  }

  get(id) {
    if (this.wrapped[id]) {
      return new Promise((resolve) => (resolve(this.wrapped[id])))
    } else {
      return this.fetch(id)
    }
  }

  updateAll(){
    // todo: after login & out...
  }

  fetch(id) {
    console.log('IMPLEMENT ME')
  }
}
