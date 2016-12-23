import DS from 'ember-data';
import { buildValidations } from 'ember-cp-validations';
import { email, password, passwordConfirmation } from '../utils/user-validations';

const Validations = buildValidations({
  email: email,
  password: password,
  passwordConfirmation: passwordConfirmation
});

export default DS.Model.extend(Validations, {
  email: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string')
});
