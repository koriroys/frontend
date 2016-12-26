import Ember from 'ember';

const { get, Route, inject } = Ember;

export default Route.extend({
  session: inject.service(),

  beforeModel() {
    if ( get(this, 'session.isAuthenticated') ) {
      this.transitionTo('app.index');
    }
  }
});
