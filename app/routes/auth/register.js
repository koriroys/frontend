import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    doRegister() {
      console.log("registration submitted");
    }
  }
});
