# cqjs

![npm](https://img.shields.io/npm/v/cqjs.svg)
![license](https://img.shields.io/npm/l/cqjs.svg)
![github-issues](https://img.shields.io/github/issues/vizidrix.com/cqjs.svg)
![Circle CI build status](https://circleci.com/gh/vizidrix.com/cqjs.svg?style=svg)

The vizidrix.com Command Query JS library provides support for an event oriented runtime designed to support clean Single Page App development.

![nodei.co](https://nodei.co/npm/cqjs.png?downloads=true&downloadRank=true&stars=true)

![travis-status](https://img.shields.io/travis/vizidrix.com/cqjs.svg)
![stars](https://img.shields.io/github/stars/vizidrix.com/cqjs.svg)
![forks](https://img.shields.io/github/forks/vizidrix.com/cqjs.svg)

![forks](https://img.shields.io/github/forks/vizidrix.com/cqjs.svg)

![](https://david-dm.org/vizidrix.com/cqjs/status.svg)
![](https://david-dm.org/vizidrix.com/cqjs/dev-status.svg)

## Features


## Install

`npm install --save cqjs`


## Scripts

 - **npm run readme** : `node ./node_modules/.bin/node-readme`
 - **npm run flow** : `flow`
 - **npm run test** : `./node_modules/.bin/babel-tape-runner ./test/**/*.test.js | ./node_modules/.bin/tap-spec`
 - **npm run zuul** : `./node_modules/.bin/zuul --local --open -- test/**/*.test.js`
 - **npm run compile** : `./node_modules/.bin/babel -d ./dist ./src`
 - **npm run build** : `npm run test && npm run readme && npm run compile`
 - **npm run publish** : `git push && git push --tags && npm publish`
 - **npm run validate** : `npm ls`
 - **npm run dev:exec** : `clear && npm run --silent flow && npm run --silent test`
 - **npm run dev** : `npm run --silent dev:exec; chokidar 'src/**/*.js' 'test/**/*.js' -c 'npm run --silent dev:exec'`
 - **npm run lint** : `jshint .`

## Dependencies

Package | Version | Dev
--- |:---:|:---:
[es6-promise](https://www.npmjs.com/package/es6-promise) | 3.0.2 | ✖
[babel-cli](https://www.npmjs.com/package/babel-cli) | ^6.9.0 | ✔
[babel-eslint](https://www.npmjs.com/package/babel-eslint) | * | ✔
[babel-plugin-transform-class-properties](https://www.npmjs.com/package/babel-plugin-transform-class-properties) | ^6.6.0 | ✔
[babel-plugin-transform-flow-strip-types](https://www.npmjs.com/package/babel-plugin-transform-flow-strip-types) | ^6.7.0 | ✔
[babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015) | * | ✔
[babel-preset-stage-0](https://www.npmjs.com/package/babel-preset-stage-0) | ^6.5.0 | ✔
[babel-preset-stage-1](https://www.npmjs.com/package/babel-preset-stage-1) | ^6.5.0 | ✔
[babel-preset-stage-2](https://www.npmjs.com/package/babel-preset-stage-2) | ^6.5.0 | ✔
[babel-tape-runner](https://www.npmjs.com/package/babel-tape-runner) | * | ✔
[babelify](https://www.npmjs.com/package/babelify) | 7.2.0 | ✔
[benchmark](https://www.npmjs.com/package/benchmark) | 1.0.0 | ✔
[blue-tape](https://www.npmjs.com/package/blue-tape) | 0.1.11 | ✔
[chokidar-cli](https://www.npmjs.com/package/chokidar-cli) | 1.2.0 | ✔
[clear](https://www.npmjs.com/package/clear) | 0.0.1 | ✔
[coveralls](https://www.npmjs.com/package/coveralls) | 2.11.6 | ✔
[dependency-check](https://www.npmjs.com/package/dependency-check) | 2.5.1 | ✔
[doctoc](https://www.npmjs.com/package/doctoc) | 0.15.0 | ✔
[dts-generator](https://www.npmjs.com/package/dts-generator) | 1.6.3 | ✔
[eslint](https://www.npmjs.com/package/eslint) | * | ✔
[eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb) | * | ✔
[eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) | ^1.8.1 | ✔
[eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) | ^1.2.2 | ✔
[eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) | ^5.1.1 | ✔
[faucet](https://www.npmjs.com/package/faucet) | 0.0.1 | ✔
[istanbul](https://www.npmjs.com/package/istanbul) | 0.4.1 | ✔
[microtime](https://www.npmjs.com/package/microtime) | 2.0.0 | ✔
[node-libs-browser](https://www.npmjs.com/package/node-libs-browser) | 0.5.3 | ✔
[node-readme](https://www.npmjs.com/package/node-readme) | ^0.1.8 | ✔
[nsp](https://www.npmjs.com/package/nsp) | 2.2.0 | ✔
[precommit-hook](https://www.npmjs.com/package/precommit-hook) | 3.0.0 | ✔
[proxyquire](https://www.npmjs.com/package/proxyquire) | ^1.7.3 | ✔
[rimraf](https://www.npmjs.com/package/rimraf) | 2.5.0 | ✔
[sinon](https://www.npmjs.com/package/sinon) | ^1.17.2 | ✔
[source-map-support](https://www.npmjs.com/package/source-map-support) | 0.4.0 | ✔
[tap](https://www.npmjs.com/package/tap) | 5.5.0 | ✔
[tap-spec](https://www.npmjs.com/package/tap-spec) | ^4.0.2 | ✔
[tape](https://www.npmjs.com/package/tape) | 4.3.0 | ✔
[tape-catch](https://www.npmjs.com/package/tape-catch) | 1.0.4 | ✔
[zuul](https://www.npmjs.com/package/zuul) | ^3.8.0 | ✔

## Notes

### Running in OSX

"microtime": "2.0.0",
"chokidar-cli": "1.2.0",

### Running in Linux / Ubuntu

Chokidar has a dependency that doesn't work in Ubuntu, see below for instructions for configuring:
https://www.npmjs.com/package/filemonitor

## Contributing

Contributions welcome; Please submit all pull requests the against master branch. If your pull request contains JavaScript patches or features, you should include relevant unit tests. Please check the [Contributing Guidelines](contributng.md) for more details. Thanks!

## Author

Vizidrix (admin@vizidrix.com)

## License

 - **ISC** : http://opensource.org/licenses/ISC
