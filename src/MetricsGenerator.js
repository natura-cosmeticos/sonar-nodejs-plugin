const dependenciesMetrics = require('./command/DependenciesMetricsCommand');

const mapMetricToCommand = {
  dependencies_check: dependenciesMetrics,
};

const metricsGenerator = argv => {
  const { metrics } = argv;
  const metricsList = metrics.split(',');

  metricsList.map(metric => {
    const command = mapMetricToCommand[metric];

    if (command) command(metric, argv);
  });
}

module.exports = metricsGenerator;