import Ember from 'ember';

const { get, Route } = Ember;

export default Route.extend({
  model() {
    return this.store.createRecord('user');
  },

  actions: {
    doRegister() {
      get(this, 'currentModel').save().then(() => {
        this.transitionTo('auth.login');
      });
    }
  }
});
