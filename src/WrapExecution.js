const wrapExecution = (fn, ...params) => new Promise(resolve => resolve(fn(params)));

module.exports = wrapExecution;
