
exports.disabled = 0;
exports.name = 'Base64 Decode';
exports.version = 0.1;
exports.group = 'Demo Functions';

let conf;

exports.init = (opt) => {
  conf = (opt || {}).conf || {};
};


exports.process = (event) => {
  if (conf.srcField && conf.dstField) {
    event[conf.dstField] = Buffer.from(event[conf.srcField], 'base64').toString();
  }
  return event;
};

