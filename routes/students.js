const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// const User = require('../models/User');
const Student = require('../models/Student');

// @route   GET api/students
// @desc    Get all users students
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const count = await Student.countDocuments({ user: req.user.id });
    const students = await Student.find({ user: req.user.id })
      .sort({
        date: -1,
      })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    // console.log(req.query);
    res.json({ students, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/students
// @desc    Add new students
// @access  Private
router.post(
  '/',
  [auth, [body('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { imgUrl, name, year, block, phone, email } = req.body;

    try {
      const newStudent = new Student({
        imgUrl,
        name,
        year,
        block,
        phone,
        email,
        user: req.user.id,
        // subject: req.subject.id,
      });

      const student = await newStudent.save();

      res.json(student);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/students/:id
// @desc    Update student
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { imgUrl, name, year, block, phone, email } = req.body;

  // Build student object
  const studentFields = {};
  if (imgUrl) studentFields.imgUrl = imgUrl;
  if (name) studentFields.name = name;
  if (year) studentFields.year = year;
  if (block) studentFields.block = block;
  if (phone) studentFields.phone = phone;
  if (email) studentFields.email = email;

  try {
    let student = await Student.findById(req.params.id);

    if (!student)
      return res.status(404).json({ msg: 'Student data not found' });

    // Make sure user owns student
    if (student.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: studentFields },
      { new: true }
    );

    res.json(student);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/students/:id
// @desc    Delete student
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) return res.status(404).json({ msg: 'Student not found' });

    // Make sure user owns student
    if (student.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    await Student.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Student removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
