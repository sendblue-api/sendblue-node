require('dotenv').config();
const api_key = process.env.OPENAI_TEST_API_KEY;
const expect = require('chai').expect;
const OpenAI = require('../index');

if (!api_key) {
  throw new Error('api key is needed to run testsuite: set environment variable: OPENAI_TEST_API_KEY');
}

describe('basic openai api methods', function () {
  this.timeout(8000);

  const openai = new OpenAI(api_key);

  it('should handle simple completion', async function () {
    const result = await openai.complete({
      engine: 'ada',
      prompt: "this is a test",
      maxTokens: 5,
      temperature: 0.9,
      frequencyPenalty: 0,
      bestOf: 1,
      stop: ["\n", "lol"]
    });
    expect(result).to.be.ok;
  });

  it('should handle search', async function () {
    const result = await openai.search({
      engine: 'ada',
      documents: ["White House", "hospital", "school"],
      query: "the president"
    });
    expect(result).to.be.ok;
  });

  it('should handle answers', async function () {
    const result = await openai.answers({
      "documents": ["Puppy A is happy.", "Puppy B is sad."],
      "question": "which puppy is happy?",
      "search_model": "ada",
      "model": "curie",
      "examples_context": "In 2017, U.S. life expectancy was 78.6 years.",
      "examples": [["What is human life expectancy in the United States?", "78 years."]],
      "max_tokens": 5,
      "stop": ["\n", "<|endoftext|>"],
    });
    expect(result).to.be.ok;
  });

  it("should handle classification", async function () {
    const result = await openai.classification({
      examples: [
        ["A happy moment", "Positive"],
        ["I am sad.", "Negative"],
        ["I am feeling awesome", "Positive"],
      ],
      labels: ["Positive", "Negative", "Neutral"],
      query: "It is a raining day :(",
      search_model: "ada",
      model: "curie",
    });
    expect(result).to.be.ok;
  });

  it('should handle engines', async function () {
    const result = await openai.engines();
    expect(result).to.be.ok;
  });

  it('should handle engine', async function () {
    const result = await openai.engine('ada');
    expect(result).to.be.ok;
  });

  it('should use the davinci engine by default', async function () {
    const result = await openai.complete({
      prompt: "this is a test",
      maxTokens: 5,
      temperature: 0.9,
      frequencyPenalty: 0,
      bestOf: 1,
      stop: ["\n", "engine test"]
    });
    expect(result).to.be.ok;
  });

  it('should return a default value from the encode function', async function () {
    const result = await openai.encode('this is a string');
    expect(result).to.be.ok;
    expect(result.length).to.be.eql(2047);
  });

  it('should handle embeddings', async function () {
    const result = await openai.embeddings({
      engine: 'text-similarity-ada-001',
      input: [
        "A happy moment",
        "I am sad.",
        "I am feeling awesome"
      ]
    });
    expect(result).to.be.ok;
  });
});