const Course = require('../../models/Course');
const Student = require('../../models/Student');

module.exports = {
  Query: {
    getAllCourses: async () => {
      try {
        return await Course.find();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getCourseById: async (root, { id }, context, info) => {
      try {
        return await Course.findById(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createCourse: async (root, args, context, info) => {
      try {
        const { code, name, section, semester, studentId } = args;
        const attendees = await Student.findById(studentId);
        const newCourse = new Course({
          code: code,
          name: name,
          section: section,
          semester: semester,
          attendees: attendees,
        });
        const course = await newCourse.save();
        return course;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    editCourse: async (root, args, context, info) => {
      try {
        const { id, studentId } = args;
        const attendeeToAdd = await Student.findById(studentId);
        const courseToUpdate = await Course.findById(id);
        const currentAttendees = courseToUpdate.attendees;
        var currentIds = currentAttendees.map(function (attendee) {
          return attendee.id;
        });
        const attendeeExists = currentIds.includes(attendeeToAdd.id);
        // If user is not already an attendee in DB record
        if (!attendeeExists) {
          let course = await Course.findOneAndUpdate(
            { _id: id },
            { new: true }
          );
          course.attendees.unshift(attendeeToAdd);
          await course.save();
          console.log(course);
          return course;
        } else {
          throw new Error('You are already an attendee');
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
