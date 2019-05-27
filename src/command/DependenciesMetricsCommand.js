const {
  setup,
  getSizeForNodeModules,
  getRootDependencies,
  attachNestedDependencies,
  getAllDependencies,
  displayResults,
  teardown,
} = require('cost-of-modules/lib/helpers');
const metricsSender = require('../MetricsSender');

const dependenciesMetrics = async (metric, argv) => {
  setup();

  const moduleSizes = getSizeForNodeModules();
  const rootDependencies = getRootDependencies();
  let flatDependencies = attachNestedDependencies(rootDependencies);

  for (let i = 0; i < flatDependencies.length; i++) {
    let dep = flatDependencies[i]

    let sizeOfModule = moduleSizes[dep.name]

    let sizeOfChildren = 0
    dep.children.forEach(child => {
      sizeOfChildren += moduleSizes[child] || 0
    })

    dep.actualSize = sizeOfModule + sizeOfChildren
    dep.numberOfChildren = dep.children.length
  }

  let allDependencies = getAllDependencies(flatDependencies);

  let totalSize = 0;
  
  allDependencies.forEach(dep => { totalSize += moduleSizes[dep] || 0 });

  displayResults(flatDependencies, allDependencies, totalSize);

  const totalDependencies = flatDependencies.length;

  const eita = await metricsSender(metric, argv);

  teardown();
}

module.exports = dependenciesMetrics;