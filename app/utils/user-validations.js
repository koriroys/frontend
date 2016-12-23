import { validator } from 'ember-cp-validations';

export const email = [
  validator('presence', true),
  validator('format', { type: 'email' })
];

export const password = [
  validator('presence', true),
  validator('length', {
    min: 8,
    max: 255
  })
];

export const passwordConfirmation = [
  validator('confirmation', {
    on: 'password',
    description: 'Confirmation'
  })
];

export default {
  email, password, passwordConfirmation
};
