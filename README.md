# com.dmalliaros.cv

Template to create a cv and hosted in [GitHub Pages](https://pages.github.com/)

## Getting Started


### Prerequisites
* Clone or Download [cv repo](https://github.com/DMalliaros/cv)
* [npm](https://www.npmjs.com/get-npm)
* (optional) Enable [GitHub Pages](https://pages.github.com/) if you want to host the page in Github

### Installing

After you have clone/download the repo install all necessary js packages 

```
npm install
```
## Settings

Copy the following files

* src/json/jsonContext.json.json.template --> src/json/jsonContext.json 
* src/json/skills.json.json.template --> src/json/skills.json 

This files have all the data of the site.

On jsonContext.json the first variable is where is the data on the server 

## Installing

To compile the js and less files run 

```
npm run start:dev
```

Or if you want to run production mode to make chunk hash at js and css files

```
npm run start:prod
```

To start a local http server run the follow.
```
npm run server:dev
```
After the server run check [localhost:9000](http://localhost:9000/)

## Built With

* [webpack](https://webpack.js.org/)
* [less](http://lesscss.org/)
* [es6](http://es6-features.org/)
* [Nunjucks](https://mozilla.github.io/nunjucks/)