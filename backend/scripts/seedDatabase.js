import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import PersonalInfo from '../models/PersonalInfo.js';
import ProfessionalSummary from '../models/ProfessionalSummary.js';
import Experience from '../models/Experience.js';
import SkillCategory from '../models/SkillCategory.js';
import Project from '../models/Project.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    // Create admin user
    const adminExists = await User.findOne({ username: process.env.ADMIN_USERNAME || 'admin' });
    if (!adminExists) {
      const admin = new User({
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        role: 'admin',
      });
      await admin.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    // Seed Personal Info
    const personalInfoExists = await PersonalInfo.findOne();
    if (!personalInfoExists) {
      await PersonalInfo.create({
        name: 'Kavishka Herath',
        role: 'Entry-Level DevOps Engineer',
        tagline: 'Bridging the gap between development and operations through automation, cloud efficiency, and infrastructure excellence.',
        about: 'A final year Computer Science undergraduate passionate about Cloud Computing and DevOps. Focused on building highly available, scalable, and automated systems that empower developers and enhance operational efficiency.',
        location: 'Colombo, Sri Lanka',
        education: 'CINEC Campus (Pvt) Ltd – Sri Lanka\nBSc (Hons) Computer Science (University of Wolverhampton)',
        email: 'kavishkacherath@gmail.com',
        phone: '+94 72 764 3866',
        github: 'https://github.com/Kavi511',
        linkedin: 'https://www.linkedin.com/in/kavishka-herath-2ab2b3245/',
        medium: 'https://medium.com/@kavishkacherath',
        x: 'https://x.com/herath_kavishka',
        strava: '',
        cvUrl: '/cv.pdf',
      });
      console.log('Personal info seeded');
    }

    // Seed Professional Summary
    const summaryExists = await ProfessionalSummary.findOne();
    if (!summaryExists) {
      await ProfessionalSummary.create({
        title: 'Foundational DevOps & Cloud Knowledge',
        description: 'I focus on modernizing infrastructure through the lens of "Everything as Code". My approach centers on high availability, automated recovery, and security-first CI/CD pipelines.',
        highlights: [
          'AWS, Docker, CI/CD, Infrastructure as Code',
          'Automation & Scalability Focus',
          'Security-first Networking & Operations',
        ],
      });
      console.log('Professional summary seeded');
    }

    // Seed Experiences
    const experiencesCount = await Experience.countDocuments();
    if (experiencesCount === 0) {
      await Experience.insertMany([
        {
          id: 'exp-3',
          role: 'MC Associate – YouTube Project',
          company: 'Orfium Sri Lanka',
          period: 'Feb 2025 - Jul 2025 | Full-time | Hybrid',
          description: 'Managed YouTube Music copyright claims and CMS operations for global music clients, working directly with record labels and publishers. Ensured content compliance with YouTube and partner guidelines, conducted thorough metadata reviews and resolved conflicts to maintain accurate rights management for clients\' content.',
          order: 0,
        },
        {
          id: 'exp-2',
          role: 'Research Associate – TikTok & Meta Project',
          company: 'Orfium Sri Lanka',
          period: 'Nov 2023 - Jan 2025 | Full-time | Hybrid',
          description: 'Led content classification initiatives for TikTok by reviewing and categorizing multimedia content in alignment with platform community guidelines, working directly with record labels and music publishers and contributing high quality labeled data to support the training and improvement of AI-based content moderation models.',
          order: 1,
        },
        {
          id: 'exp-1',
          role: 'Process Associate',
          company: 'Infomate (Pvt) Ltd – John Keells Holdings Colombo, Western Province, Sri Lanka',
          period: 'Jul 2022 - Jun 2023 | Full-time | Hybrid',
          description: 'Processed vendor invoices with a strong focus on accuracy and timely payment while managing multilingual purchase orders and invoices in Swedish, Norwegian, Spanish, and Finnish. Collaborated closely with internal teams and external vendors to resolve discrepancies efficiently, maintaining high levels of accuracy and meeting tight deadlines in a fast-paced environment.',
          order: 2,
        },
      ]);
      console.log('Experiences seeded');
    }

    // Seed Skill Categories
    const skillsCount = await SkillCategory.countDocuments();
    if (skillsCount === 0) {
      await SkillCategory.insertMany([
        {
          name: 'Cloud & Infrastructure',
          skills: [
            'AWS Core Services (EC2, S3, RDS, VPC, IAM, CloudFront, ACM, WAF)',
            'AWS ECS (Fargate)',
            'AWS Lambda',
            'AWS Cost Monitoring & Optimization (Fundamentals)',
          ],
          order: 0,
        },
        {
          name: 'Infrastructure as Code (IaC)',
          skills: ['Terraform', 'AWS CloudFormation (Fundamentals)'],
          order: 1,
        },
        {
          name: 'Containers & CI/CD',
          skills: [
            'Docker',
            'GitHub Actions',
            'Secure CI/CD Pipelines',
            'HTTPS Deployments',
            'Auto-scaling & High Availability Architectures (Fundamentals)',
          ],
          order: 2,
        },
        {
          name: 'Monitoring & Observability',
          skills: [
            'AWS CloudWatch',
            'Prometheus',
            'Grafana (Metrics, Dashboards, Alerts Fundamentals)',
          ],
          order: 3,
        },
        {
          name: 'Security & Networking',
          skills: [
            'AWS Security Best Practices (IAM, Least Privilege, WAF)',
            'AWS Secrets Manager',
            'Networking Fundamentals (VPC, Subnets, Routing, Security Groups)',
          ],
          order: 4,
        },
        {
          name: 'DNS & SSL Management',
          skills: ['Cloudflare (DNS Management, SSL/TLS Configuration)'],
          order: 5,
        },
        {
          name: 'Systems & Automation',
          skills: ['Linux Fundamentals', 'Python Scripting & Automation', 'Git & Version Control'],
          order: 6,
        },
        {
          name: 'Databases & Platforms',
          skills: ['PostgreSQL', 'MySQL', 'MongoDB Atlas', 'Kubernetes (Fundamentals)'],
          order: 7,
        },
        {
          name: 'IDEs & Developer Tools',
          skills: ['Visual Studio Code', 'IntelliJ IDEA', 'Cursor'],
          order: 8,
        },
      ]);
      console.log('Skill categories seeded');
    }

    // Seed Projects
    const projectsCount = await Project.countDocuments();
    if (projectsCount === 0) {
      await Project.insertMany([
        {
          id: 'p1',
          title: 'AWS Multi-Tier Infrastructure',
          description: 'Fully automated VPC setup with public/private subnets, load balancers, and auto-scaling groups using Terraform.',
          techStack: ['Terraform', 'AWS', 'Bash'],
          githubUrl: '#',
          imageUrl: '/h9Ec3oA2XWnXSQVuah-xg.jpg',
          order: 0,
        },
        {
          id: 'p2',
          title: 'Kubernetes Cluster Deployment',
          description: 'Self-healing microservices architecture deployed on a managed K8s cluster with persistent storage and monitoring.',
          techStack: ['K8s', 'Docker', 'Helm', 'Prometheus'],
          githubUrl: '#',
          imageUrl: '/6877c771def8830380a19f13_Kubernetes_1-e1490380003654.jpeg',
          order: 1,
        },
        {
          id: 'p3',
          title: 'Dockerize an Application',
          description: 'Containerized a simple web application by creating a Docker image to ensure consistent environments across development and deployment. The project focuses on writing an optimized Dockerfile, managing application dependencies, and running the application in isolated containers for easy setup and scalability.',
          techStack: ['Docker', 'Linux', 'Git', 'Web Application (Node.js / Python)'],
          githubUrl: '#',
          imageUrl: '/dockerize-windows-app.png',
          order: 2,
        },
      ]);
      console.log('Projects seeded');
    }

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

