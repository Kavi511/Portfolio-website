import mongoose from 'mongoose';

const personalInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    default: '',
  },
  linkedin: {
    type: String,
    default: '',
  },
  medium: {
    type: String,
    default: '',
  },
  x: {
    type: String,
    default: '',
  },
  strava: {
    type: String,
    default: '',
  },
  cvUrl: {
    type: String,
    default: '',
  },
  cvFile: {
    type: Buffer, // Store PDF file as binary data in database
    default: null,
  },
  cvFileName: {
    type: String,
    default: '',
  },
  cvFileType: {
    type: String,
    default: 'application/pdf',
  },
}, {
  timestamps: true,
});

// Only one document should exist
personalInfoSchema.statics.getPersonalInfo = async function() {
  let info = await this.findOne();
  if (!info) {
    // Create with minimal required fields if document doesn't exist
    info = await this.create({
      name: 'Your Name',
      role: 'Your Role',
      tagline: 'Your Tagline',
      about: 'About you',
      location: 'Your Location',
      email: 'your@email.com',
      phone: 'Your Phone',
    });
  }
  return info;
};

const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);

export default PersonalInfo;

