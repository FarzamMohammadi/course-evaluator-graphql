const studentsResolver = require('./student');

//Root
const rootResolver = {
  ...studentsResolver,
};

module.exports = rootResolver;
