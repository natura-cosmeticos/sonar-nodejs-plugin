/* eslint-disable id-length */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable no-plusplus */
/* eslint-disable max-statements-per-line */
const {
  getSizeForNodeModules,
  getRootDependencies,
  attachNestedDependencies,
  getAllDependencies,
} = require('cost-of-modules/lib/helpers');

const costOfModules = () => {
  const moduleSizes = getSizeForNodeModules();
  const rootDependencies = getRootDependencies();
  const flatDependencies = attachNestedDependencies(rootDependencies);

  for (let i = 0; i < flatDependencies.length; i++) {
    const dep = flatDependencies[i];
    const sizeOfModule = moduleSizes[dep.name];
    let sizeOfChildren = 0;

    dep.children.forEach((child) => {
      sizeOfChildren += moduleSizes[child] || 0;
    });

    dep.actualSize = sizeOfModule + sizeOfChildren;
    dep.numberOfChildren = dep.children.length;
  }

  const allDependencies = getAllDependencies(flatDependencies);

  let totalSize = 0;

  allDependencies.forEach((dep) => { totalSize += moduleSizes[dep] || 0; });

  const totalDependencies = {
    totalChildrenDependencies: allDependencies.length - flatDependencies.length,
    totalDependencies: flatDependencies.length,
    totalSize: `${(totalSize / 1024).toFixed(2)}M`,
  };

  return totalDependencies;
};

module.exports = {
  costOfModules,
};
