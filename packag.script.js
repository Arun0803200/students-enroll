const { series, concurrent, rimraf } = require('nps-utils');

module.exports = {
  scripts: {
    serve: 'nps serve',
    start: 'nps start',
    build: 'nps build',
    test: 'nps test',
    serveScript: {
      default: series('create-index', 'nodemon src/app.ts --watch'),
    },
    startScript: {
      default: series('build', 'nodemon build/src/app.js'),
    },
    buildScript: {
      default: 'tsc --build',
    },
    testScript: {
      default: 'jest --watchAll',
    },
    indexController: 'ts-node --pretty Utils/controller.index.ts',
    createIndex: 'npm run indexController',
  },
};
