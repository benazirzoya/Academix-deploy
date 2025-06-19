import express from 'express';
import User from '../models/user.js'; 
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'No students found' });
    }

    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);  
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;
