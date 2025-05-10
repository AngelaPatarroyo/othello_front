module.exports = {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '/node_modules/(?!(axios)/)', // let Jest process axios
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
