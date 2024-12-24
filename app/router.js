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
  this.route('privacy-policy');
});
