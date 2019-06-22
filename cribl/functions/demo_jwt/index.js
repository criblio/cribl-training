
exports.disabled = 0;
exports.name = 'Decode JWT tokens';
exports.version = '0.1';
exports.group = 'Demo Functions';

exports.process = (event) => {
  const rex = new RegExp(/jwt:\s*([A-Za-z0-9+/=]+)/);
  const matches = rex.exec(event._raw);
  if (matches) {
    event.hasjwt = 'yes';
    const match = matches[1];
    event.jwt = Buffer.from(match, 'base64').toString();
  }
  event.source = 'pretty_base64';
  return event;
};

