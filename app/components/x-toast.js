import Ember from 'ember';

const {
  Component,
  computed,
  computed: { readOnly },
  get,
  getWithDefault,
  isEqual,
  run: { next, cancel },
  set
} = Ember;

export default Component.extend({
  classNames: ['material-toast', 'toast'],
  classNameBindings: ['active', 'exiting', 'color'],
  active: false,
  color: computed('content.type', function() {
    let color = '';
    let contentType = get(this, 'content.type');
    if (isEqual(contentType, 'danger')) {
      color = 'red darken-2 white-text';
    } else if (isEqual(contentType, 'warning')) {
      color = 'yellow lighten-1 black-text';
    }
    return color;
  }),
  exiting: readOnly('content.exiting'),

  _destroyFlashMessage() {
    const flash = getWithDefault(this, 'content', false);
    if (flash) {
      flash.destroyMessage();
    }
  },

  didInsertElement() {
    this._super(...arguments);
    // Very shortly after a message is created, add the "active"
    // class to it, so that we can use CSS animations for
    // the entry transition
    this._applyActiveClass = next(() => {
      set(this, 'active', true);
    });
  },

  willDestroyElement() {
    this._super();
    // Prevent leaking
    this._destroyFlashMessage();
    // To be thorough, we will cancel any queued
    // task to add the "active" class (see: didInsertElement)
    if (this._applyActiveClass) {
      cancel(this._applyActiveClass);
    }
  }
});
