import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    title: { 
      type: String, 
      required: true 
    },
    description: {
      type: String,
      default: 'No description provided', 
    },
    deadline: {
      type: Date,
      validate: {
        validator: (value) => value > Date.now(), 
        message: 'Deadline must be a future date.',
      },
    },
    fileUrl: {
      type: String,
      validate: {
        validator: (value) => {
          if (!value) return true; 
          const regex = /^(ftp|http|https):\/\/[^ "]+$/; 
          return regex.test(value);
        },
        message: 'Invalid URL format for fileUrl.',
      },
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending', 
    },
    submissions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission', 
    }],
  },
  { timestamps: true }
);

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
