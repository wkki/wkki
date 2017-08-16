# trellowiki

> A Vue.js project

## setup

- create a public trello board

- copy trixi.conf.js.dist to trixi.conf.js and fill in your board id and api key (if you know your board id and api key, you may jump to build setup :) )

### getting board id and api key

#### board id

in your browser, go to the board you want to use for the wiki.
if you append ".json" to the board url, you can see the board data. "id" is your board id.
(eg. https://trello.com/b/dpgtVTOV/demo -> https://trello.com/b/dpgtVTOV/demo.json)

#### api key

get from https://trello.com/app-key


## Dev Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

## Prod Setup
``` bash
# install dependencies
npm install

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

this creates a dist folder. serve these files somewhere!

## todo

- links inside cards (to other cards)
- searching
- (markdown?) formatting
- login & editing
