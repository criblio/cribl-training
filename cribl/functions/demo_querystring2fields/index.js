
exports.disabled = 0;
exports.name = 'Querystring To Fields';
exports.version = 0.1;
exports.group = 'Demo Functions';

let conf;

exports.init = (opt) => {
  conf = (opt || {}).conf || {};
};


exports.process = (event) => {
  if (conf.field) {
    const qs = event[conf.field];
    if (qs) {
      const kvpairs = qs.split('&');
      kvpairs.forEach(kv => {
        const parts = kv.split('=');
        const k = decodeURIComponent(parts[0]);
        if (k && k.length > 0) {
          const v = decodeURIComponent(parts[1]);
          event[k] = v;
        }
      });
    }
  }
  return event;
};

