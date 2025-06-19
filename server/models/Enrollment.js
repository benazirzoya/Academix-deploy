import mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  }, 
  instructor: {
    type: String,
    required: true,
    trim: true
  }, 
  amount: {
    type: Number,
    required: true
  }, 
  fromDate: {
    type: Date,
    required: true
  }, 
  paymentMethod: {
    type: String,
    required: true,
    trim: true
  } 
}, { timestamps: true });

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);
export default Enrollment;
