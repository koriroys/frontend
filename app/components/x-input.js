import Ember from 'ember';
const { computed, get } = Ember;

export default Ember.Component.extend({
  classNames: ['input-field'],
  type: 'text',

  _errorMessages: computed('errors.[]', function() {
    return (get(this, 'errors') || []).join(', ');
  })
});
