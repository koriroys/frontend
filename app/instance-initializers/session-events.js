export function initialize(instance) {
  const applicationRoute = instance.lookup('route:application');
  const session          = instance.lookup('service:session');

  session.on('authenticationSucceeded', function() {
    applicationRoute.transitionTo('/');
  });
  session.on('invalidationSucceeded', function() {
    applicationRoute.transitionTo('/');
  });
}

export default {
  name: 'session-events',
  initialize
};
