import Ember from 'ember';

const { get, Route, inject: { service } } = Ember;

export default Route.extend({
  flashMessages: service(),

  model() {
    return this.store.createRecord('user');
  },

  actions: {
    doRegister() {
      get(this, 'currentModel').save().then(() => {
        // success
        this.transitionTo('auth.login');
        get(this, 'flashMessages').success('Registered! Please login now');
      }).catch((response) => {
        const { errors } = response;

        get(this, 'flashMessages').danger(errors.mapBy('detail').join(', '));
      });
    }
  }
});
