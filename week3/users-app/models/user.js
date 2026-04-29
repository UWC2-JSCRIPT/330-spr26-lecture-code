import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  settings: {
    useDarkMode: Boolean,
    language: String,
  },
  contact: {
    email: String,
  },
});

userSchema.index({'contact.email': 1})
const User = mongoose.model('users', userSchema);

// User.on('index', (...args) => {
//   console.log('Index created', args);
// })

export default User;
