#!/usr/bin/env node
const cli = require('commander');
const generateMetrics = require('./src/MetricsGenerator');

cli
  .version('0.0.1')
  .description('Generate NodeJS metrics for Sonar')
  .option('-H, --host', 'sonar host', 'sonar.vzr.com.br')
  .option('-P, --password', 'sonar password', '')
  .option('-T, --token', 'sonar token', '6eda626bbedb22e224bd1bb17e7d4edb9c1e9180')
  .option('-M, --metric [type]', 'determine which kind of metric to generate [type]', 'dependencies_check')
  .parse(process.argv);

generateMetrics(cli);