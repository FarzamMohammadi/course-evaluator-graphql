const Student = require('../../models/Student');
const bcrypt = require('bcrypt');

const studentsResolver = {
  Query: {
    getAllStudents: async () => {
      return await Student.find();
    },
    getStudentById: async (root, { id }, context, info) => {
      return await Student.findById(id);
    },
  },
  Mutation: {
    createStudent: async (root, args, context, info) => {
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
    },
  },
};

module.exports = studentsResolver;
