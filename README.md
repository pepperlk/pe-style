# Prereqs:
* Install bower `npm install -g bower`
* Install gulp  `npm install -g gulp`

# Setup
* Step 1: `bower update`
* Step 2: `npm install`

# Getting things going
* `gulp run`
* Browser will open to localhost:3000

# Gulp tasks
* `run` convenience alias for `watch`, this "runs" the styleguide in a browser at localhost:3000
* `watch` generates the styleguide and opens in a browser. Adds a browsersync so code changes are live
* `dist` used to create a distribution that can be pulled by projects using bower update **Make a new Git tag with the version number**



