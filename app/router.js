import EmberRouter from '@ember/routing/router';
import config from 'pulmo-rehab-fe/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('index', { path: '/' });
  this.route('register');
  this.route('my-account');
  this.route('dashboard');
  this.route('details');
  this.route('privacy-policy');
  this.route('ai-chat');
  this.route('air-pollution');
  this.route('local-air-pollution');

  this.route('users', function () {
    this.route('edit', {
      path: '/:user_id',
    });
  });
});
