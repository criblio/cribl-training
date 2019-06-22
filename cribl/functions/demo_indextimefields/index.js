exports.name = 'Add index-time fields';
exports.version = '0.1';
exports.disabled = false;
exports.group = 'Demo Functions';

let conf;
let users = ['NONE'];

exports.init = (opt) => {
  conf = (opt || {}).conf || {};
  if (!conf.users) {
    users = ['NONE'];
  } else {
    users = conf.users;
  }
};

exports.process = (event) => {
  event.geo = ['us-south', 'us-north', 'us-east', 'us-west'][Math.floor(Math.random() * 4)];
  event.dc = `dc-0${Math.floor(Math.random() * 8)}`;
  event.rack = `rack-${Math.floor(Math.random() * 12)}`;
  event.user = users[Math.floor(Math.random() * users.length)];
  return event;
};
