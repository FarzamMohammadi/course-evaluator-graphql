const Student = require('../../models/Student');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

module.exports = {
  Mutation: {
    login: async (root, args, context, info) => {
      const { email, password } = args;
      try {
        let tokenToReturn;
        let student = await Student.findOne({ email });
        const isMatch = await bcrypt.compare(password, student.password);

        if (!isMatch || !student) {
          throw new Error('Invalid Credentials');
        }

        const payload = {
          student: {
            id: student.id,
          },
        };

        return jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 });
        console.log(tokenToReturn);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
