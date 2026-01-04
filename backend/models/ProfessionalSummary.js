import mongoose from 'mongoose';

const professionalSummarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  highlights: [{
    type: String,
  }],
}, {
  timestamps: true,
});

// Only one document should exist
professionalSummarySchema.statics.getProfessionalSummary = async function() {
  let summary = await this.findOne();
  if (!summary) {
    summary = await this.create({
      title: '',
      description: '',
      highlights: [],
    });
  }
  return summary;
};

const ProfessionalSummary = mongoose.model('ProfessionalSummary', professionalSummarySchema);

export default ProfessionalSummary;

