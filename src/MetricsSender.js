const MetricsService = require('./service/MetricsService');
const CustomMeasuresService = require('./service/CustomMeasuresService');

const checkAll = async (metric, argv) => {
  const metricsSender = new MetricsService(argv, metric);
  const customMeasuresService = new CustomMeasuresService(argv, metric);

  const alreadyCreated = await metricsSender.search();
  const alreadyCreatedCustom = await customMeasuresService.search();

  // console.log('####### alreadyCreated');
  // console.log(alreadyCreated);

  // console.log('####### alreadyCreatedCustom');
  // console.log(alreadyCreatedCustom);

  // const create = await metricsSender.create({
  //   description: 'Total de Dependências',
  //   domain: 'Dependencies Check',
  //   key: metric,
  //   name: 'Total',
  //   type: 'INT',
  // });

  // const create = await alreadyCreatedCustom.create({
  //   description: 'Total de Dependências',
  //   domain: 'Dependencies Check',
  //   key: metric,
  //   name: 'Total',
  //   type: 'INT',
  // });

  // o id aqui eh o retorno do search
  // const create = await alreadyCreatedCustom.update({
  //   id: id,
  //   value: totalDependencies,
  // });
};

module.exports = checkAll;