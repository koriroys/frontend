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
  validator('presence', true),
  validator('length', {
    min: 8,
    max: 255
  }),
  validator('confirmation', {
    on: 'password',
    message: 'Passwords do not match'
  })
];

export default {
  email, password, passwordConfirmation
};
