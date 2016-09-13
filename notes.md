
Add non-determinism to the publish list to avoid order related side effect reliance

# Some backup commands from earlier npm scripts

"test2": "istanbul cover tape \"es5/**/*.test.js\" > test.tap && istanbul report --include=./coverage clover",

"test3": "istanbul cover _mocha -- --reporter ${MOCHA_REPORTER-nyan} --slow 10 --ui tdd --full-trace --require source-map-support/register --recursive lib/**/*_test.js ",

> bundle needs work
"prebundle": "npm run compile && mv es5/** .",
"bundle": "dts-generator --name $npm_package_name --main ${npm_package_name}/index --baseDir . --exclude node_modules/dts-generator/node_modules/typescript/bin/lib.es6.d.ts -out ${npm_package_name}.d.ts *.d.ts",



"pre-commit": [
  "compile"
],


"compile": "./node_modules/.bin/babel-cli -d ./dist ./src",


"dev:osx": "chokidar 'src/**/*.js' 'test/**/*.js' -c 'npm run --silent dev:exec'",
"dev:linux": "supervisor -w 'src/**/*.js','test/**/*.js' -x npm run",


"dev": "npm run --silent dev:exec",
"lint": "jshint ."

"zuul": "./node_modules/.bin/zuul --local --open -- test/**/*.test.js",
"compile": "./node_modules/.bin/babel -d ./dist ./src",
"build": "npm run test && npm run readme && npm run compile",
"buildcli": "babel src -d dist",
"publish": "git push && git push --tags && npm publish",
"validate": "npm ls",
"webpack2": "webpack ./dist/cqjs.js -o cqjs.bundle.js",
