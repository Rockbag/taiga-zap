const authentication = require('./authentication')
const taigaTrigger = require('./triggers/taiga')
const taigaIssues = require('./creates/issue')

const includeSessionKeyHeader = (request, z, bundle) => {
  const sessionKey = bundle.sessionKey || bundle.authData.sessionKey;
  console.log(sessionKey);
  if (sessionKey) {
    request.headers = request.headers || {};
    request.headers['Authorization'] = "Bearer " + sessionKey;
  }
  return request;
};

// We can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,
  beforeRequest: [includeSessionKeyHeader],
  afterResponse: [],
  resources: {},
  triggers: {
    [taigaTrigger.key]: taigaTrigger
  },
  searches: { },
  creates: {
    [taigaIssues.key]: taigaIssues
  }
};

module.exports = App;
