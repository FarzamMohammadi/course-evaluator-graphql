const Student = require('../../models/Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
  Query: {
    getAllStudents: async () => {
      try {
        return await Student.find();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getStudentById: async (root, { id }, context, info) => {
      try {
        return await Student.findById(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createStudent: async (root, args, context, info) => {
      try {
        let studentExists = await Student.findOne({ email: args.email });
        console.log(studentExists);
        if (studentExists) {
          throw new Error('Student already exits');
        }
        const {
          studentNumber,
          fname,
          lname,
          email,
          password,
          address,
          city,
          phoneNumber,
          program,
        } = args;

        student = new Student({
          studentNumber,
          fname,
          lname,
          email,
          password,
          address,
          city,
          phoneNumber,
          program,
        });

        const salt = await bcrypt.genSalt(10);

        student.password = await bcrypt.hash(password, salt);
        await student.save();
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
