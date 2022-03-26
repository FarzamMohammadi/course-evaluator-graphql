const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  section: {
    type: String,
  },
  semester: {
    type: String,
  },
  attendees: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
      },
    },
  ],
});

module.exports = Course = mongoose.model('course', CourseSchema);
