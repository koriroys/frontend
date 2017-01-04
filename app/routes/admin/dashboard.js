import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  model() {
    let startDate = moment().startOf('month').toDate();
    return this.store.queryRecord('month', { start_day: startDate });
  }
});
