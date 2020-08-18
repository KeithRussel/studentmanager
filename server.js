const express = require('express');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }), fileUpload());
// app.use(express.json(fileUpload()));

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(
    `${__dirname}/client/public/uploads/${file.name.replace(/ /g, '-')}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.json({
        fileName: file.name.replace(/ /g, '-'),
        filePath: `/uploads/${file.name.replace(/ /g, '-')}`,
      });
    }
  );
});

// app.get('/', (req, res) =>
//   res.json({ msg: 'Welcome to the Student Manager API' })
// );

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
