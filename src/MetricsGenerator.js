const metricsGenerator = async (argv, mapper) => {
  const { metrics } = argv;
  const metricsList = metrics.split(',');

  const commands = metricsList.map((metric) => {
    const command = mapper[metric];

    if (command) return command(argv);
  });

  const commandsList = await Promise.all(commands);

  return commandsList;
};

module.exports = metricsGenerator;
