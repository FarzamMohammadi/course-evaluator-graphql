const Student = require('../../models/Student');
const bcrypt = require('bcrypt');

const student = {
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
        return student;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = student;
