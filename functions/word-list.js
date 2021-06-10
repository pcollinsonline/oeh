// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('node-fetch');

const LETTERS = /^[A-Za-z]+$/;

const handler = async event => {
  const { headers, httpMethod, body } = event;

  const uri =
    'https://api.wordnik.com/v4/words.json/randomWords?' +
    'hasDictionaryDef=true' +
    '&maxCorpusCount=-1' +
    '&minDictionaryCount=1' +
    '&maxDictionaryCount=-1' +
    '&excludePartOfSpeech=family-name,given-name,idiom,proper-noun,prefix' +
    '&minLength=5' +
    '&maxLength=14' +
    `&limit=100` +
    `&api_key=${process.env.WORD_API_KEY}`;

  // set the request headers
  // and include the api key
  // from the netlify env
  const appHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  // propagate the user-token
  // header if present
  const userToken = headers['user-token'];
  if (userToken) {
    appHeaders['user-token'] = userToken;
  }

  const method = httpMethod.toLowerCase();
  const requestConfig = {
    headers: appHeaders,
    method,
  };

  if (method === 'post' || method === 'put') {
    requestConfig.body = body;
  }

  try {
    const response = await fetch(uri, requestConfig);
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    const scrubbed = data
      .map(wordObj => wordObj.word)
      .filter(word => word.match(LETTERS));

    return {
      statusCode: 200,
      body: JSON.stringify(scrubbed),
    };
  } catch (error) {
    // output to netlify function log
    // eslint-disable-next-line no-console
    console.log(error);

    // todo - could do something better here...
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };
