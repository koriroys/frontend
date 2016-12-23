import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { get, Route } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  actions: {
    logout() {
      get(this, 'session').invalidate();
    }
  }
});
