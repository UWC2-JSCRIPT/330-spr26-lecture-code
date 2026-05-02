import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{type: String, enum: ['user', 'admin']}],
});

export default mongoose.model('User', userSchema);
