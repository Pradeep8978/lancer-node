if (process.env.NODE_ENV === 'test') {
  module.exports = {
    JWT_SECRET: 'conmentrauth',
    oauth: {
      google: {
        clientID: 'number',
        clientSecret: 'string',
      },
      facebook: {
        clientID: 'number',
        clientSecret: 'string',
      },
    },
  };
} else {
  module.exports = {
    MONGODB_CONN_STR: "mongodb+srv://kriyauser:kriyapassword@cluster0-ghp8w.mongodb.net/test?retryWrites=true&w=majority",
    JWT_SECRET: 'conmentrauth',
    oauth: {
      google: {
        clientID: '338601550454-1u2bn4i06l30sn0brqgshlqu3jnn7f2h.apps.googleusercontent.com',
        clientSecret: 'n3HF4pWz42Q6qP9p6DksNxCO',
      },
      facebook: {
        clientID: '2273900542721665',
        clientSecret: '13c6f5d78a2c8c683c1e26d30e9f5583',
      },
    },
  };
}