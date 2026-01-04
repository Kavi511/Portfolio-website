import mongoose from 'mongoose';

const skillCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  skills: [{
    type: String,
  }],
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const SkillCategory = mongoose.model('SkillCategory', skillCategorySchema);

export default SkillCategory;

