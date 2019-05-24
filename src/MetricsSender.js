// const fs = require('fs-extra');
// const syncExec = require('sync-exec');
// const rp = require('request-promise');

// const config = {
//   host: 'sonar.vzr.com.br',
//   token: '6eda626bbedb22e224bd1bb17e7d4edb9c1e9180',
//   password: '',
// };

// const projectKey = 'architecture-node-base';

// const endpoints = {
//   SEARCH: projectKey => `search?projectKey=${projectKey}`,
//   CREATE: 'create',
//   UPDATE: 'update',
// };

// const buildPath = ({ token, password, host, service }) => `https://${token}:${password}@${host}/api/custom_measures/${service}`;

// const sonar = (totalDependencies) => {
//   var service = ''
//   var url = ''
//   var exists = false

//   service = '/api/metrics/search'
//   url = 'https://' + config.token + ':' + config.password + '@' + config.host + service
//   rp(url).then(function(json) {
//     var dTableMetrics = JSON.parse(json)
//     for (var i = 0; i < dTableMetrics.metrics.length; i++) {
//       if (dTableMetrics.metrics[i].key === 'dependencies_check') {
//         exists = true
//       }
//     }

//     if (!exists) {
//       service = '/api/metrics/create'
//       url = 'https://' + config.token + ':' + config.password + '@' + config.host + service
//       var options = {
//         method: 'POST',
//         uri: url,
//         formData: {
//           description: 'Total de Dependências',
//           domain: 'Dependencies Check',
//           key: 'dependencies_check',
//           name: 'Total',
//           type: 'INT',
//         },
//         json: true,
//       }

//       rp(options)
//         .then(function(json) {
//           let metrics = json
//           console.log(metrics)
//         })
//         .catch(function(err) {
//           console.log(err)
//         })
//     }
//   })

//   //Testa se a custom_measures ja existe para esse projeto
//   service = '/api/custom_measures/search?projectKey=architecture-node-base'
//   url = 'https://' + config.token + ':' + config.password + '@' + config.host + service
//   rp(url).then(function(json) {
//     var dtableJSON = JSON.parse(json)
//     if (
//       dtableJSON.customMeasures.length == 0 ||
//       dtableJSON.customMeasures[0].metric.key != 'dependencies_check'
//     ) {
//       //Cria a custom_measures
//       service = '/api/custom_measures/create'
//       url = 'https://' + config.token + ':' + config.password + '@' + config.host + service
//       var options = {
//         method: 'POST',
//         uri: url,
//         formData: {
//           projectKey: 'architecture-node-base',
//           metricKey: 'dependencies_check',
//           value: totalDependencies,
//           description: 'Total',
//         },
//         json: true,
//       }

//       rp(options)
//         .then(function(json) {
//           let metrics = json
//           console.log(metrics)
//         })
//         .catch(function(err) {
//           console.log(err)
//         })
//     } else {
//       //Atualiza custom_measures
//       var id = dtableJSON.customMeasures[0].id
//       service = '/api/custom_measures/update'
//       url = 'https://' + config.token + ':' + config.password + '@' + config.host + service
//       var options = {
//         method: 'POST',
//         uri: url,
//         formData: {
//           id: id,
//           value: totalDependencies,
//         },
//         json: true,
//       }

//       rp(options)
//         .then(function(json) {
//           let metrics = json
//         })
//         .catch(function(err) {
//           console.log(err)
//         })
//     }
//   })

//   //Executando npm-audit
//   fs.exists('./npm-audit.json', function(exists) {
//     if (exists) {
//       fs.unlink('./npm-audit.json', function(err) {
//         if (err) {
//           console.error(err)
//         }
//       })
//     }

//     console.log('Running  npm-audit')
//     let command = `npm audit --json > npm-audit.json`

//     console.log(command)
//     console.log()

//     /* Run install command */
//     syncExec(command, { stdio: [0, 1, 2] })
//     console.log()

//     //Lendo dados do npm-audit.json
//     // const audit = require('../npm-audit.json')
//     // let auditJSON = JSON.stringify(audit)
//     // console.log(auditJSON)
//     // console.log('finish!')
//   })
// }

// module.exports = sonar;