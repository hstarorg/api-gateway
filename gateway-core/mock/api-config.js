module.exports = {
  apis: [
    {
      apiName: 'Test',
      apiBase: '/test',
      apiHosts: [{ host: 'localhost', port: 5001 }, { host: 'localhost', port: 5002 }],
      paths: [{ path: '/abc' }, { path: '/get' }]
    }
  ]
};
