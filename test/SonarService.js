// describe('Sonar Service', function () {
//   const nock = require('nock');
//   const { assert } = require('chai');
//   const { random, internet } = require('faker');
//   const CustomMeasuresService = require('service/custom-measures-service');

//   const config = {
//     token: internet.domainWord(),
//     password: internet.password(),
//     host: internet.domainName(),
//     projectKey: internet.domainWord(),
//   };

//   const metric = 'customMetric';

//   it('build path based on config', function () {
//     const service = new CustomMeasuresService(config, metric);
//     const customPath = 'path';
//     const path = service.buildPath(customPath);
//     const { token, password, host } = config;

//     const buildedPath = `https://${token}:${password}@${host}/api/custom_measures/${customPath}`;

//     assert.equal(path, buildedPath);
//   });

//   it('return custom measure found by metric key', async function () {
//     const { token, password, host, projectKey } = config;
//     const service = new CustomMeasuresService(config, metric);

//     const mockResponse = {
//       customMeasures: [{
//         metric: { key: random.word() }
//       }, {
//         metric: { key: metric }
//       }]
//     };

//     nock(`https://${host}`)
//       .get(`/api/custom_measures/search?projectKey=${projectKey}`)
//       .reply(200, JSON.stringify(mockResponse));

//     const foundMetric = await service.search();

//     assert.deepEqual(foundMetric, mockResponse.customMeasures[1]);
//   });
// });
