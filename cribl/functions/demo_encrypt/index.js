const crypto = require('crypto');

exports.group = 'Demo Functions';

//TODO; make this REAL!
const iv = Buffer.alloc(16); // fill with zeros
const key = Buffer.from('12'.repeat(16));

function getCipher() {
  return crypto.createCipheriv('aes-256-cbc', key, iv);
}

// add support for inline modifiers
const REGEX_FLAGS = /^(?:\(\?([gimuy]+)\))(.*)$/;
let regex; // that captures 3 groups, with group 2 being encrypted
exports.init = (opts) => {
  const conf = (opts || {}).conf || {};
  console.log(conf);
  if (conf.regex) {
    const m = REGEX_FLAGS.exec(conf.regex);
    regex = new RegExp(m[2], m[1]);
  }
};

exports.process = (event) => {
  if (regex) {
    event._raw = event._raw.replace(regex, (match, p1, p2, p3) => {
      if (p2 === undefined) {
        return p1 || '';
      }
      const cipher = getCipher();
      return `${p1}"$0$${cipher.update(p2, 'utf8', 'base64')}${cipher.final('base64')}$"${p3 || ''}`;
    });
  }
  return event;
};
