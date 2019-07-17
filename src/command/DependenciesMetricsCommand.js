/* eslint-disable max-lines-per-function */
const ora = require('ora');
const SonarService = require('./../SonarService');
const WrapExecution = require('./../WrapExecution');
const PrettyPrintSteps = require('./../PrettyPrintSteps');
const { costOfModules } = require('./../lib/CostOfModules');

const key = 'dependencies_check';

const metricSchema = {
  description: 'Total de Dependências',
  domain: 'Dependencies Check',
  key,
  name: 'Total',
  type: 'INT',
};

const customMeasureSchema = {
  description: 'Total de dependencias instaladas no projeto',
  metricId: '',
  value: '',
};

const command = async ({
  host,
  password,
  token,
  projectKey,
}, silent = false) => {
  if (!silent) ora('Generating metrics...').start().info();

  const sonarService = new SonarService({
    host,
    password,
    projectKey,
    token,
  }, key);

  const { totalDependencies } = await PrettyPrintSteps(
    'Calculating number of dependencies',
    () => WrapExecution(costOfModules),
    silent,
  );

  const metric = await PrettyPrintSteps(
    'Sending metric to sonar qube',
    () => sonarService.upsertMetric(metricSchema),
    silent,
  );

  const customMeasure = await PrettyPrintSteps(
    'Sending custom measure to sonar qube',
    () => sonarService.upsertCustomMeasure({
      ...customMeasureSchema,
      metricId: metric.id,
      value: totalDependencies,
    }),
    silent,
  );

  return {
    command: totalDependencies,
    customMeasure,
    metric,
  };
};

module.exports = { command, key };
