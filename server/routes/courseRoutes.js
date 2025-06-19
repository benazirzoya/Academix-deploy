import express from 'express';
import mongoose from 'mongoose';
import Course from '../models/Course.js';
import User from '../models/user.js';
const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const { mentorId } = req.query; 

    if (mentorId) {
      const mentor = await User.findById(mentorId);
      if (!mentor || mentor.role !== 'mentor') {
        return res.status(404).json({ message: 'Mentor not found or role mismatch' });
      }
      if (!mentor.course) {
        return res.status(200).json([]); 
      }
      const course = await Course.findById(mentor.course);
      if (!course) {
        return res.status(404).json({ message: 'Course not found for this mentor' });
      }
      return res.status(200).json([course]); 
    }

    const courses = await Course.find();
    if (!courses.length) {
      return res.status(404).json({ message: 'No courses found' });
    }
    res.status(200).json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Failed to fetch courses', error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedData = req.body;

  
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updatedData, {
      new: true, 
      runValidators: true, 
    });

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(updatedCourse);
  } catch (err) {
    console.error('Error updating course:', err); 
    res.status(500).json({ message: 'Failed to update course', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ message: 'Error fetching course', error: err.message });
  }
});

router.get('/mentor/:mentorId/course', async (req, res) => {
  try {
    const { mentorId } = req.params;

    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({ message: 'Mentor not found or role mismatch' });
    }

    const course = await Course.findOne({ _id: mentor.course });

    if (!course) {
      return res.status(404).json({ message: 'No course assigned or course not found' });
    }

    res.status(200).json(course);
  } catch (err) {
    console.error('Error fetching assigned course:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.put('/:id/syllabus', async (req, res) => {
  try {
    const courseId = req.params.id;
    const { syllabus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    if (!Array.isArray(syllabus)) {
      return res.status(400).json({ message: 'Invalid syllabus format' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { syllabus },
      { new: true, runValidators: true } 
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Syllabus updated', syllabus: updatedCourse.syllabus });
  } catch (err) {
    console.error('Error updating syllabus:', err);
    res.status(500).json({ message: 'Failed to update syllabus', error: err.message });
  }
});

export default router;
