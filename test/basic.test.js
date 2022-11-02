require('dotenv').config();
const expect = require('chai').expect;
const Sendblue = require('../dist/').default;

const api_key = process.env.SENDBLUE_TEST_API_KEY;
if (!api_key) {
  throw new Error('api key is needed to run testsuite: set environment variable: SENDBLUE_TEST_API_KEY');
}

const api_secret = process.env.SENDBLUE_TEST_API_SECRET;
if (!api_secret) {
  throw new Error('api secret is needed to run testsuite: set environment variable: SENDBLUE_TEST_API_SECRET');
}

const test_number_1 = process.env.TEST_NUMBER_1;
if (!test_number_1) {
  throw new Error('test number 1 is needed to run testsuite: set environment variable: TEST_NUMBER_1');
}

const test_number_2 = process.env.TEST_NUMBER_2;
if (!test_number_2) {
  throw new Error('test number 2 is needed to run testsuite: set environment variable: TEST_NUMBER_2');
}

describe('basic sendblue api methods', function () {
  this.timeout(8000);

  const sendblueClient = new Sendblue(api_key, api_secret, {logLevel: 'debug'});

  it('should handle single message', async function () {
    const result = await sendblueClient.sendMessage({
      number: test_number_1,
      content: 'hello world',
      media_url: 'https://source.unsplash.com/random/1000x1000.png',
    })
    expect(result).to.be.ok;
  });

  it('should handle group message', async function () {
    const result = await sendblueClient.sendGroupMessage({
      numbers: [test_number_1, test_number_2],
      content: 'hello world 2',
      media_url: 'https://source.unsplash.com/random/1000x1000.png',
    });
    expect(result).to.be.ok;
  });
});