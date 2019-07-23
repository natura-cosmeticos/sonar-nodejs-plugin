const SonarService = require('./SonarService');

const metricsGenerator = async (argv, mapper) => {
  const sonarService = new SonarService(argv);
  const { valid } = await sonarService.validateCredentials();

  if (!valid) throw new Error('Could not authenticate to Sonar Qube with given credentials');

  const { metrics } = argv;
  const metricsList = metrics.split(',');

  const commands = metricsList.map((metric) => {
    const command = mapper[metric];

    if (command) return command(sonarService);

    return null;
  });

  await Promise.all(commands);
};

module.exports = metricsGenerator;
