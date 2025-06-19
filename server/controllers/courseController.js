
export const getAllCourses = async (req, res) => {
  try {
    
    const courses = await Course.find().sort({ order: 1 });

    if (!courses.length) {
      return res.status(404).json({ message: 'No courses found' });
    }

    res.json(courses); 
  } catch (err) {
    console.error("Error fetching courses:", err); 
    res.status(500).json({ message: 'Failed to fetch courses', error: err.message });
  }
};
