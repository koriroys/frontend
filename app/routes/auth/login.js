import Ember from 'ember';
import { buildValidations } from 'ember-cp-validations';
import { email, password } from '../../utils/user-validations';

const { get, getOwner, inject: { service }, Object: EObject, Route } = Ember;

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
  session: service(),
  flashMessages: service(),

  model() {
    // container is required to lookup validations on the model
    // so we inject the container. More info at:
    // http://offirgolan.github.io/ember-cp-validations/docs/modules/Basic.html
    return User.create(getOwner(this).ownerInjection());
  },

  actions: {
    doLogin() {
      const user = get(this, 'currentModel');
      const session = get(this, 'session');
      session.authenticate('authenticator:school-canteen', user.email, user.password).then(() => {
        // set(this, 'session.userType', 'user');
        // success
        get(this, 'flashMessages').success('Logged in successfully');
      }).catch((response) => {
        const { errors } = response;

        // Unauthorized
        if (errors.mapBy('code').indexOf(401) >= 0) {
          get(this, 'flashMessages').danger(
            'There was a problem with your username or password, please try again');
        } else {
          get(this, 'flashMessages').danger('Server error');
        }
      });
    }
  }
});
