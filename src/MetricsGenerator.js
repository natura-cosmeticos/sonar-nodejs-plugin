const dependenciesMetrics = require('./command/DependenciesMetrics');

const metricsGenerator = argv => {
  const { metric } = argv;

  switch(metric) {
    case 'dependencies_check':
      dependenciesMetrics(argv);
    break;
  }
}

module.exports = metricsGenerator;