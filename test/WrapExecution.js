const { assert } = require('chai');
const { random } = require('faker');
const WrapExecution = require('WrapExecution');

describe('Wrap execution', () => {
  it('receives an sync function and return a promise', async () => {
    const response = random.word();
    const syncCommand = () => response;
    const asyncCommand = WrapExecution(syncCommand);

    assert.isOk(asyncCommand instanceof Promise);
    assert.equal(await asyncCommand, response);
  });
});
