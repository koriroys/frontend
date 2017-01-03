import Ember from 'ember';
import config from '../config/environment';
import fetch from 'ember-network/fetch';

const { get, Route, inject: { service } } = Ember;

export default Route.extend({
  session: service(),

  beforeModel() {
    if ( !get(this, 'session.isAuthenticated') ) {
      this.transitionTo('auth.login');
    } else {
      if ( get(this, 'session.userType') === 'admin' ) {
        this.transitionTo('admin.dashboard');
      }
    }
  },
  afterModel() {
    return fetch(`${config.DS.host}/${config.DS.namespace}/user/current`, {
      type: 'GET',
      headers: {
        'Authorization': `Bearer ${this.get('session').get('session.content.authenticated.access_token')}`
      }
    }).then((raw) => {
      if ( raw.ok ) {
        return raw.json().then((data) => {
          const currentUser = this.store.push(data);
          const session = this.get('session');
          session.set('userType', get(currentUser, '_internalModel.modelName'));
          session.set('currentUser', currentUser);
        });
      } else {
        this.get('flashMessages').danger("something went wrong");
        this.transitionTo('/');
      }
    });
  }
});
