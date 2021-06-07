const fetch = require('node-fetch');

const handler = async function (event) {
  const { headers, path, httpMethod, queryStringParameters, body } = event;

  // node-fetch doesn't have anything
  // out of the box to handle query-string
  // parameters - have to do this manually
  const params =
    queryStringParameters && Object.keys(queryStringParameters).length
      ? `?${new URLSearchParams(queryStringParameters)}&api_key=${process.env.WORD_API_KEY}`
      : `?api_key=${process.env.WORD_API_KEY}`;

  // build the actual api uri
  const api = path.replace('/.netlify/functions/api-proxy/', '');
  const uri = `${process.env.WORD_API_ENDPOINT}/${api}${params}`;

  console.log('URI', uri);

  // set the request headers
  // and include the api key
  // from the netlfiy env
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

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    // output to netlify function log
    console.log(error);

    // todo - could do something better here...
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };
