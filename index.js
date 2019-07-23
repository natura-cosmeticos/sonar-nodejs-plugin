#!/usr/bin/env node
const cli = require('commander');
const generateMetrics = require('./src/MetricsGenerator');
const {
  command: dependenciesMetricsCommand,
  key: dependenciesMetricsKey,
} = require('./src/command/DependenciesMetricsCommand');

const mapMetricToCommand = {
  [dependenciesMetricsKey]: dependenciesMetricsCommand,
};

cli
  .version('0.0.1')
  .description('Generate NodeJS metrics for Sonar')
  .option('-H, --host [host]', 'sonar host')
  .option('-P, --password [password]', 'sonar password')
  .option('-T, --token [token]', 'sonar token')
  .option('-K, --projectKey [projectKey]', 'sonar project key')
  .option('-M, --metrics [metric]', 'determine which kind of metrics to generate, comma separated list', 'dependencies_check')
  .parse(process.argv);

generateMetrics(cli, mapMetricToCommand);
