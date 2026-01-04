import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import PersonalInfo from '../models/PersonalInfo.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// ES6 module dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadCV = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB\n');

    // Get CV file path from command line argument or use default
    const cvPath = process.argv[2] || path.join(__dirname, '../cv.pdf');
    
    console.log(`Looking for CV file at: ${cvPath}`);

    // Check if file exists
    if (!fs.existsSync(cvPath)) {
      console.error(`❌ Error: CV file not found at: ${cvPath}`);
      console.log('\nUsage:');
      console.log('  node scripts/uploadCV.js <path-to-cv.pdf>');
      console.log('\nExample:');
      console.log('  node scripts/uploadCV.js ../my-cv.pdf');
      console.log('  node scripts/uploadCV.js C:/Users/YourName/Desktop/cv.pdf');
      process.exit(1);
    }

    // Read the file
    console.log('Reading CV file...');
    const fileBuffer = fs.readFileSync(cvPath);
    const fileName = path.basename(cvPath);
    const fileSizeMB = fileBuffer.length / (1024 * 1024);

    console.log(`File: ${fileName}`);
    console.log(`Size: ${fileSizeMB.toFixed(2)} MB\n`);

    // Check file size
    if (fileSizeMB > 16) {
      console.error('❌ Error: File is too large (>16MB). MongoDB document limit is 16MB.');
      process.exit(1);
    }

    if (fileSizeMB > 5) {
      console.warn('⚠️  Warning: File is larger than 5MB (upload limit), but will be stored in database.');
    }

    // Get or create PersonalInfo document
    console.log('Getting PersonalInfo document...');
    let personalInfo = await PersonalInfo.findOne();
    
    if (!personalInfo) {
      console.log('PersonalInfo document not found, creating new one...');
      personalInfo = await PersonalInfo.create({
        name: 'Kavishka Herath',
        role: 'Entry-Level DevOps Engineer',
        tagline: 'Bridging the gap between development and operations through automation, cloud efficiency, and infrastructure excellence.',
        about: 'A final year Computer Science undergraduate passionate about Cloud Computing and DevOps. Focused on building highly available, scalable, and automated systems that empower developers and enhance operational efficiency.',
        location: 'Colombo, Sri Lanka',
        email: 'kavishkacherath@gmail.com',
        phone: '+94 72 764 3866',
        github: 'https://github.com/Kavi511',
        linkedin: 'https://www.linkedin.com/in/kavishka-herath-2ab2b3245/',
        medium: 'https://medium.com/@kavishkacherath',
        x: 'https://x.com/herath_kavishka',
        strava: '',
      });
      console.log('✅ PersonalInfo document created');
    } else {
      console.log('✅ PersonalInfo document found');
      console.log(`   Name: ${personalInfo.name}`);
      console.log(`   Email: ${personalInfo.email}`);
    }

    // Store CV in database
    console.log('\nStoring CV file in database...');
    personalInfo.cvFile = fileBuffer;
    personalInfo.cvFileName = fileName;
    personalInfo.cvFileType = 'application/pdf';
    personalInfo.cvUrl = '/api/upload/cv/download';
    
    await personalInfo.save();
    
    console.log('✅ CV file stored successfully in database!');
    console.log(`\nCV Details:`);
    console.log(`   File Name: ${personalInfo.cvFileName}`);
    console.log(`   File Type: ${personalInfo.cvFileType}`);
    console.log(`   File Size: ${fileSizeMB.toFixed(2)} MB`);
    console.log(`   Download URL: ${personalInfo.cvUrl}`);
    console.log(`\n✅ You can now download the CV from: http://localhost:5000${personalInfo.cvUrl}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error uploading CV:', error);
    console.error('Error details:', error.message);
    if (error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }
    process.exit(1);
  }
};

uploadCV();

