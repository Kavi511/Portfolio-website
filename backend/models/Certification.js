import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  issuer: {
    type: String,
    required: true,
  },
  issueDate: {
    type: String,
    default: '',
  },
  expiryDate: {
    type: String,
    default: '',
  },
  credentialUrl: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Certification = mongoose.model('Certification', certificationSchema);

export default Certification;

