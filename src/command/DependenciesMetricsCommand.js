const {
  setup,
  getSizeForNodeModules,
  getRootDependencies,
  attachNestedDependencies,
  getAllDependencies,
  displayResults,
  teardown,
} = require('cost-of-modules/lib/helpers');
const Listr = require('listr');
const metricsSender = require('../MetricsSender');

const costOfModules = context => {
  setup();

  // const moduleSizes = getSizeForNodeModules();
  const rootDependencies = getRootDependencies();
  let flatDependencies = attachNestedDependencies(rootDependencies);

  // for (let i = 0; i < flatDependencies.length; i++) {
  //   let dep = flatDependencies[i]

  //   let sizeOfModule = moduleSizes[dep.name]

  //   let sizeOfChildren = 0
  //   dep.children.forEach(child => {
  //     sizeOfChildren += moduleSizes[child] || 0
  //   })

  //   dep.actualSize = sizeOfModule + sizeOfChildren
  //   dep.numberOfChildren = dep.children.length
  // }

  // let allDependencies = getAllDependencies(flatDependencies);

  // let totalSize = 0;
  
  // allDependencies.forEach(dep => { totalSize += moduleSizes[dep] || 0 });

  // displayResults(flatDependencies, allDependencies, totalSize);

  // const totalDependencies = flatDependencies.length;

  teardown();

  context.totalDependencies = flatDependencies.length;

  // return flatDependencies.length;
}

const dependenciesMetrics = async (metric, argv) => {
  const tasks = new Listr([
    {
      title: 'Calculating size',
      task: costOfModules
    },
    {
      title: 'Sending metrics to sonar',
      task: context => {
        console.log('COST OF MODULES: ', context.totalDependencies);
        metricsSender(metric, argv);
      }
    }
  ]);

  await tasks.run();
}

module.exports = dependenciesMetrics;