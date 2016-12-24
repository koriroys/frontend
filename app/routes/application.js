import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { get, inject: { service }, Route } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  flashMessages: service(),

  actions: {
    logout() {
      get(this, 'session').invalidate();
      get(this, 'flashMessages').success('Logged out');
    }
  }
});
