import Ember from 'ember';
import config from '../config/environment';
import fetch from 'ember-network/fetch';

const { get, Route, inject: { service }, set} = Ember;

export default Route.extend({
  session: service(),

  beforeModel() {
    if(!get(this, 'session.isAuthenticated')) {
      this.transitionTo('auth.login');
    }
  },
  afterModel() {
    return fetch(`${config.DS.host}/${config.DS.namespace}/user/current`, {
      type: 'GET',
      headers: {
        'Authorization': `Bearer ${this.get('session').get('session.content.authenticated.access_token')}`
      }
    }).then((raw) => {
      return raw.json().then((data) => {
        const currentUser = this.store.push(data);
        set(this, 'session.currentUser', currentUser);
      });
    });
  }
});
