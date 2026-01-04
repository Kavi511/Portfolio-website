import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import PersonalInfo from '../models/PersonalInfo.js';

dotenv.config();

const checkPersonalInfo = async () => {
  try {
    await connectDB();
    console.log('Checking PersonalInfo document...\n');

    let personalInfo = await PersonalInfo.findOne();

    if (!personalInfo) {
      console.log('❌ PersonalInfo document does NOT exist!');
      console.log('Creating PersonalInfo document with default values...\n');
      
      personalInfo = await PersonalInfo.create({
        name: 'Your Name',
        role: 'Your Role',
        tagline: 'Your Tagline',
        about: 'About you',
        location: 'Your Location',
        education: 'Your Education',
        email: 'your@email.com',
        phone: 'Your Phone',
        cvUrl: '',
        cvFile: null,
        cvFileName: '',
        cvFileType: 'application/pdf',
      });
      
      console.log('✅ PersonalInfo document created successfully!');
      console.log('Document ID:', personalInfo._id);
    } else {
      console.log('✅ PersonalInfo document exists!');
      console.log('Document ID:', personalInfo._id);
      console.log('Name:', personalInfo.name);
      console.log('Email:', personalInfo.email);
      
      // Check if CV fields exist
      const hasCvFields = personalInfo.schema.paths.cvFile !== undefined;
      if (hasCvFields) {
        console.log('✅ CV storage fields (cvFile, cvFileName, cvFileType) are available');
        if (personalInfo.cvFile) {
          console.log('📄 CV file is stored in database');
          console.log('   File name:', personalInfo.cvFileName);
          console.log('   File type:', personalInfo.cvFileType);
          console.log('   File size:', (personalInfo.cvFile.length / 1024).toFixed(2), 'KB');
        } else {
          console.log('📄 No CV file stored yet');
        }
      } else {
        console.log('⚠️  CV storage fields may not be in schema');
      }
    }

    console.log('\n✅ Check complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error checking PersonalInfo:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
};

checkPersonalInfo();

