exports.disabled = 0;
exports.name = 'Numerify';
exports.version = '0.1';
exports.group = 'Demo Functions';

let conf = {};

exports.init = (opt) => {
  conf = (opt || {}).conf || {};
  if (!conf.ignoreFields) conf.ignoreFields = [];
};

exports.process = (event) => {
  Object.keys(event).filter(k => conf.ignoreFields.indexOf(k) === -1).forEach(k => {
    const val = event[k];
    const nval = Number(val);
    if (!Number.isNaN(nval)) {
      event[k] = nval;
    }
  });
  return event;
};

