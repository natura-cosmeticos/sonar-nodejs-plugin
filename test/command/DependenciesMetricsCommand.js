const nock = require('nock');
const sandbox = require('sinon').createSandbox();
const { assert } = require('chai');
const { random, internet } = require('faker');

describe('Command Dependencies Metrics', () => {
  // eslint-disable-next-line global-require
  const costOfModules = require('lib/CostOfModules');

  const costOfModulesMock = {
    totalChildrenDependencies: 50,
    totalDependencies: 10,
    totalSize: '25M',
  };

  const argv = {
    host: internet.domainName(),
    key: internet.domainWord(),
    password: internet.password(),
    projectKey: internet.domainWord(),
    token: internet.domainWord(),
  };

  beforeEach(() => sandbox.stub(costOfModules, 'costOfModules').returns(costOfModulesMock));

  afterEach(() => sandbox.restore());

  it('has exported command and key', () => {
    // eslint-disable-next-line global-require
    const dependenciesMetricsCommand = require('command/DependenciesMetricsCommand');

    assert.hasAllKeys(dependenciesMetricsCommand, ['key', 'command']);
  });

  it('can be executed', async () => {
    // eslint-disable-next-line global-require
    const { command } = require('command/DependenciesMetricsCommand');
    const host = `https://${argv.host}`;

    nock(host).get('/api/metrics/search').reply(200, `{"metrics":[{"key": "${random.word()}", "id": 123}, {"key": "dependencies_checks", "id": 321}]}`);
    nock(host).post('/api/metrics/create').reply(200, '{"id": 453}');

    const mockResponse = {
      customMeasures: [{
        metric: { id: 123, key: random.word() },
      }, {
        metric: { id: 321, key: 'dependencies_check' },
      }],
    };

    nock(host).get(`/api/custom_measures/search?projectKey=${argv.projectKey}`).reply(200, JSON.stringify(mockResponse));
    nock(host).post('/api/custom_measures/update').reply(200);

    const response = await command(argv, true);

    assert.equal(response.command, costOfModulesMock.totalDependencies);
  });
});
