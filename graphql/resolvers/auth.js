const Student = require('../../models/Student');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

module.exports = {
  Mutation: {
    loginUser: async (root, args, context, info) => {
      const { email, password } = args;
      try {
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
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
