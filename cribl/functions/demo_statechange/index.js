exports.disabled = 0;
exports.name = 'State Change';
exports.version = 0.1;
exports.group = 'Demo Functions';

const { Expression } = C.expr;

const prev = {};
let conf;
let nsExpr;
let initExpr;
let checkExpr;
let initialized = false;

exports.init = (opt) => {
  conf = (opt || {}).conf || {};
  if (conf.namespace) {
    nsExpr = new Expression(conf.namespace, { disallowAssign: true });
  }
  if (conf.init) {
    initExpr = new Expression(conf.init, { disallowAssign: true });
  }
  if (conf.check) {
    checkExpr = new Expression(conf.check, { disallowAssign: true });
  }
  initialized = nsExpr && initExpr && checkExpr; // Make all three are set
};


exports.process = (event) => {
  if (initialized) {
    const ns = nsExpr.evalOn(event);
    // Previous state is undefined, so initialize it
    if (prev[ns] === undefined) {
      prev[ns] = initExpr.evalOn(event);
    }
    // Prev should be defined by stateInitExpression
    if (prev[ns] !== undefined) {
      // Get the result of our state check expression
      const res = checkExpr.evalOn(Object.assign(event.clone(), { prev: prev[ns] }));

      // If we return undefined, filter the event by returning undefined to Cribl
      if (res === undefined) {
        return undefined;
      }

      // Otherwise set the previous value to the new value
      // and fall through to return the event at the end of the function
      prev[ns] = res;
    }
  }
  return event;
};

