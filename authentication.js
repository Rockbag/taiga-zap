const taigaHostUrl = process.env.TAIGA_URL;

const testAuth = (z /*, bundle*/) => {
  const promise = z.request({
    url: taigaHostUrl + '/api/v1/users/me'
  });

  return promise.then((response) => {
    if (response.status === 401) {
      throw new Error('The Session Key you supplied is invalid');
    }
    return response;
  });
};

const getSessionKey = (z, bundle) => {
  const promise = z.request({
    method: 'POST',
    url: taigaHostUrl + '/api/v1/auth',
    body: {
      username: bundle.authData.username,
      password: bundle.authData.password,
      type: 'normal'
    }
  });

  return promise.then((response) => {
    if (response.status === 401) {
      throw new Error('The username/password you supplied is invalid');
    }
    const json = JSON.parse(response.content);
    return {
      sessionKey: json.auth_token || null
    };
  });
};

module.exports = {
  type: 'session',
  fields: [
    {key: 'username', label: 'Username', required: true, type: 'string'},
    {key: 'password', label: 'Password', required: true, type: 'password'}
  ],
  test: {
    url: taigaHostUrl + '/api/v1/users/me'
  },
  sessionConfig: {
    perform: getSessionKey
  },
  connectionLabel: '{{username}}'
};
