const fs = require('fs-extra');
const syncExec = require('sync-exec');

//Executando npm-audit
fs.exists('./npm-audit.json', function(exists) {
  if (exists) {
    fs.unlink('./npm-audit.json', function(err) {
      if (err) {
        console.error(err)
      }
    })
  }

  console.log('Running  npm-audit')
  let command = `npm audit --json > npm-audit.json`

  console.log(command)
  console.log()

  /* Run install command */
  syncExec(command, { stdio: [0, 1, 2] })
  console.log()

  //Lendo dados do npm-audit.json
  // const audit = require('../npm-audit.json')
  // let auditJSON = JSON.stringify(audit)
  // console.log(auditJSON)
  // console.log('finish!')
})