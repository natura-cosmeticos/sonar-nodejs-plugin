const { assert } = require('chai');
const metricsGenerator = require('MetricsGenerator');

describe('Metrics Generator', () => {
  const commonOutput = 'command output';

  const mapCommand = {
    asyncCommand: () => new Promise(resolve => setTimeout(() => resolve(commonOutput), 200)),
    test: () => commonOutput,
  };

  it('map metric name to command execution', async () => {
    const [exec] = await metricsGenerator({ metrics: 'asyncCommand' }, mapCommand);

    assert.equal(exec, commonOutput);
  });

  it('return undefined if command does not exist', async () => {
    const [exec] = await metricsGenerator({ metrics: 'test2' }, mapCommand);

    assert.equal(exec, undefined);
  });

  it('execute a list of commands separated by comma', async () => {
    const [test, asyncCommand] = await metricsGenerator({ metrics: 'test,asyncCommand' }, mapCommand);

    assert.equal(test, commonOutput);
    assert.equal(asyncCommand, commonOutput);
  });
});
