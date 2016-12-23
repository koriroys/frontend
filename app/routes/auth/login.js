import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import { email, password } from '../../utils/user-validations';

const { getOwner, Object: EObject, Route } = Ember;

// can't figure out how to get the validations to work
// in the login-card component, so just doing it here
const Validations = buildValidations({
  email: email,
  password: password
});

// make a simple user object, since we will depart from
// standard CRUD calls for authentication
const User = EObject.extend(Validations, {
  email: '', password: ''
});

export default Route.extend({
  model() {
    // container is required to lookup validations on the model
    // so we inject the container. More info at:
    // http://offirgolan.github.io/ember-cp-validations/docs/modules/Basic.html
    return User.create(getOwner(this).ownerInjection());
  },

  actions: {
    doLogin() {
      alert('login attempted');
    }
  }
});
