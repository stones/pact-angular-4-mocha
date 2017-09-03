const pact = require('@pact-foundation/pact-node')
const path = require('path')

const opts = {
  pactUrls          : [path.resolve(__dirname, '../pacts/molfrontend-molbackend.json')],
  pactBroker        : '<url>',
  pactBrokerUsername: '',
  pactBrokerPassword: '',
  tags              : ['prod', 'test'],
  consumerVersion   : '1.0.0'
}

pact.publishPacts(opts)
  .then(() => {
    console.log('Pact contract publishing complete!')
    console.log('')
    console.log('Head over to <url> and login with')
    console.log('=> Username: ')
    console.log('=> Password: ')
    console.log('to see your published contracts.')
  })
  .catch(e => {
    console.log('Pact contract publishing failed: ', e)
  })
