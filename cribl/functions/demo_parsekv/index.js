
exports.disabled = 0;
exports.name = 'Parse key=value';
exports.version = '0.1';
exports.group = 'Demo Functions';

let conf = {};
let filterFields = {};
let srcField = '_raw';
let dstField = '__parsed';
const rex = new RegExp(/\s?([\w\d]+=(?:"[^"]+"|[^\s,]+))[\s,]?(?:\s+)?/gm);

exports.init = (opt) => {
  conf = (opt || {}).conf || {};

  if (conf.ignoreFields && Array.isArray(conf.ignoreFields)) {
    // Convert our list of filtered fields to an object for more efficient matching
    filterFields = conf.ignoreFields.reduce((prev, cur) => { prev[cur] = true; return prev; }, {});
  }
  if (conf.srcField) {
    srcField = conf.srcField;
  }
  if (conf.dstField) {
    dstField = conf.dstField;
  }
};

exports.process = (event) => {
  const outkv = {};
  let matches;
  // This regex will find all k=v pairs in srcField
  while (matches = rex.exec(event[srcField])) {
    // Ensure we've only matched k=v
    if (matches.length === 2) {
      const kv = matches[1].split('=');
      // Check against filterFields to ensure we want to insert this k/v pair into out dstField
      if (!filterFields[kv[0]]) {
        const val = kv[1].replace(/(^")|("$)/g, '');
        outkv[kv[0]] = val;
      }
    }
  }
  // Use Object.assign to merge with any existing object key/values that may be there
  event[dstField] = Object.assign({}, event[dstField] || {}, outkv);
  return event;
};

