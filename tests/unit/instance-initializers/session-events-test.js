import Ember from 'ember';
import { initialize } from 'frontend/instance-initializers/session-events';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';

//this is the mock session service:
const sessionStubFactory  = Ember.Service.extend({
  // data: null,
  init(){
    this.actions = [];
  },
  on(event) {
    this.get('actions').pushObject(event);
  },
});

module('Unit | Instance Initializer | session events', {
  beforeEach() {
    Ember.run(() => {
      this.application = Ember.Application.create();
      this.appInstance = this.application.buildInstance();
      this.appInstance.register('service:session', sessionStubFactory);
    });
  },
  afterEach() {
    Ember.run(this.appInstance, 'destroy');
    destroyApp(this.application);
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initialize(this.appInstance);

  // you would normally confirm the results of the initializer here
  assert.equal(this.appInstance.lookup('service:session').get('actions').join(', '), 'authenticationSucceeded, invalidationSucceeded');
});
