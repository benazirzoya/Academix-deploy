import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'mentor', 'student'],
    },
    name: {
      type: String,
      required: function () {
        return this.role !== 'student'; 
      },
      trim: true,
    },
    pendingApproval: {
      type: Boolean,
      default: true, 
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course', 
      required: function () {
        return this.role === 'mentor'; 
      },
    },
  },
  { timestamps: true }
);


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
