// Import necessary packages
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Replace with your MongoDB connection string
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/formDB';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event listeners for connection success or error
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err.message}`);
});

// Define a schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

async function getData() {
  try {
      const data = await User.find({})
      return data;
  } catch (err) {
      console.error(err);
  } finally {
      // Close the connection after the query
      mongoose.connection.close();
  }
}


// Insert a new document when POST request is made
app.post('/userdata', async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const newUser = new User({ name, email, contact });
    await newUser.save();
    res.status(201).send('User details saved successfully');
  } catch (error) {
    console.error('Error saving user details:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Express app setup (middlewares, routes, etc.)
app.get('/getuserdata', async(req, res) => {
  const result=await getData();
  console.log(result)
  res.send(result);
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
