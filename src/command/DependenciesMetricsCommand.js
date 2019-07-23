/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
const ora = require('ora');
const SonarService = require('./../SonarService');
const WrapExecution = require('./../WrapExecution');
const PrettyPrintSteps = require('./../PrettyPrintSteps');
const { costOfModules } = require('./../lib/CostOfModules');

const key = 'dependencies_check';
const keyTotal = 'dependencies_check_total';
const keyChildren = 'dependencies_check_children';
const keySize = 'dependencies_check_size';

const metricSchemaTotal = {
  description: 'Installed dependencies on project',
  domain: 'Dependencies Check',
  key: keyTotal,
  name: 'Total',
  type: 'INT',
};

const metricSchemaChildren = {
  description: 'Installed children dependencies on project',
  domain: 'Dependencies Check',
  key: keyChildren,
  name: 'Children',
  type: 'INT',
};

const metricSchemaSize = {
  description: 'Size of dependencies on project',
  domain: 'Dependencies Check',
  key: keySize,
  name: 'Size',
  type: 'STRING',
};

const customMeasureSchema = {
  description: 'Total number',
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
  });

  const { totalDependencies, totalChildrenDependencies, totalSize } = await PrettyPrintSteps(
    'Calculating number of dependencies',
    () => WrapExecution(costOfModules),
    silent,
  );

  const metric = await PrettyPrintSteps(
    'Sending metric to sonar qube',
    () => sonarService.upsertMetric(metricSchemaTotal),
    silent,
  );

  const customMeasure = await PrettyPrintSteps(
    'Sending custom measure to sonar qube',
    () => sonarService.upsertCustomMeasure({
      ...customMeasureSchema,
      key: metric.key,
      metricId: metric.id,
      value: totalDependencies,
    }),
    silent,
  );

  const metricChildren = await PrettyPrintSteps(
    'Sending children metric to sonar qube',
    () => sonarService.upsertMetric(metricSchemaChildren),
    silent,
  );

  const customMeasureChildren = await PrettyPrintSteps(
    'Sending children custom measure to sonar qube',
    () => sonarService.upsertCustomMeasure({
      ...customMeasureSchema,
      key: metricChildren.key,
      metricId: metricChildren.id,
      value: totalChildrenDependencies,
    }),
    silent,
  );

  const metricSize = await PrettyPrintSteps(
    'Sending size metric to sonar qube',
    () => sonarService.upsertMetric(metricSchemaSize),
    silent,
  );

  const customMeasureSize = await PrettyPrintSteps(
    'Sending size custom measure to sonar qube',
    () => sonarService.upsertCustomMeasure({
      ...customMeasureSchema,
      key: metricSize.key,
      metricId: metricSize.id,
      value: totalSize,
    }),
    silent,
  );

  return {
    command: totalDependencies,
    customMeasure,
    customMeasureChildren,
    customMeasureSize,
    metric,
  };
};

module.exports = { command, key };
