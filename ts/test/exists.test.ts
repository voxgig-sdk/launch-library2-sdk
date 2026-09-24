
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LaunchLibrary2SDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = LaunchLibrary2SDK.test()
    equal(testsdk instanceof LaunchLibrary2SDK, true,
      'LaunchLibrary2SDK.test() must return a client synchronously')
  })

})
