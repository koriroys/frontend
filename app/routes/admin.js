import Ember from 'ember';
import config from '../config/environment';
import fetch from 'ember-network/fetch';

const { get, Route, inject: { service } } = Ember;

export default Route.extend({
  session: service(),
  flashMessages: service(),

  beforeModel() {
    if ( !get(this, 'session.isAuthenticated') ) {
      this.transitionTo('auth.admin.login');
    } else if ( get(this, 'session.userType') === 'admin-user' ) {
      this.transitionTo('/');
    }
  },
  afterModel() {
    return fetch(`${config.DS.host}/${config.DS.namespace}/admin_user/current`, {
      type: 'GET',
      headers: {
        'Authorization': `Bearer ${this.get('session').get('session.content.authenticated.access_token')}`
      }
    }).then((raw) => {
      if (raw.ok) {
        return raw.json().then((data) => {
          const currentAdminUser = this.store.push(data);
          const session = this.get('session');
          session.set('userType', get(currentAdminUser, '_internalModel.modelName'));
          session.set('currentAdminUser', currentAdminUser);
        });
      } else {
        this.get('flashMessages').danger("Hey, you're not an admin!");
        this.transitionTo('/');
      }
    });
  }
});
