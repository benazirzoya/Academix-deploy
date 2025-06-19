const Mentor = require("../models/Mentor");
const bcrypt = require("bcryptjs");

const addMentor = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingMentor = await Mentor.findOne({ email });
    if (existingMentor) {
      return res.status(400).json({ message: "Mentor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const mentor = new Mentor({
      name,
      email,
      password: hashedPassword,
      role: "mentor", 
    });

    await mentor.save();

    return res.status(201).json({ message: "Mentor added successfully" });
  } catch (error) {
    console.error("Add Mentor Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addMentor };
