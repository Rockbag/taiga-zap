require('should');

const zapier = require('zapier-platform-core');
const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('session auth app', () => {
    it('has an exchange for username/password', (done) => {
      const bundle = {
        authData: {
          username: 'admin',
          password: '123123'
        }
      };
  
      appTester(App.authentication.sessionConfig.perform, bundle)
        .then((newAuthData) => {
          should(newAuthData.sessionKey).not.eql(null);
          done();
        })
        .catch(done);
    });

    it('has returns null for invalid login', (done) => {
        const bundle = {
            authData: {
              username: 'non-existent-user',
              password: 'some-password'
            }
          };

          appTester(App.authentication.sessionConfig.perform, bundle)
          .then((newAuthData) => {
            should(newAuthData.sessionKey).eql(null);
            done();
          })
          .catch(done);
    });
});
