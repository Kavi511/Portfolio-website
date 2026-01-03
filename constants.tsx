
import React from 'react';
import { 
  Cloud, 
  Terminal, 
  ShieldCheck, 
  Activity, 
  Box, 
  Code2, 
  Database, 
  Network, 
  Cpu, 
  GitBranch, 
  Monitor,
  TestTube
} from 'lucide-react';
import { Experience, SkillCategory, Project, Certification } from './types';

export const PERSONAL_INFO = {
  name: "Kavishka Herath",
  role: "Entry-Level DevOps Engineer",
  tagline: "Bridging the gap between development and operations through automation, cloud efficiency, and infrastructure excellence.",
  about: "A final year Computer Science undergraduate passionate about Cloud Computing and DevOps. Focused on building highly available, scalable, and automated systems that empower developers and enhance operational efficiency.",
  location: "Colombo, Sri Lanka",
  education: "CINEC Campus (Pvt) Ltd – Sri Lanka\nBSc (Hons) Computer Science (University of Wolverhampton)",
  email: "kavishkacherath@gmail.com",
  phone: "+94 72 764 3866",
  github: "https://github.com/Kavi511",
  linkedin: "https://www.linkedin.com/in/kavishka-herath-2ab2b3245/",
  medium: "https://medium.com/@kavishkacherath",
  x: "https://x.com/herath_kavishka",
  strava: ""
};

export const PROFESSIONAL_SUMMARY = {
  title: "Foundational DevOps & Cloud Knowledge",
  description: "I focus on modernizing infrastructure through the lens of 'Everything as Code'. My approach centers on high availability, automated recovery, and security-first CI/CD pipelines.",
  highlights: [
    "AWS, Docker, CI/CD, Infrastructure as Code",
    "Automation & Scalability Focus",
    "Security-first Networking & Operations"
  ]
};

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-3',
    role: "MC Associate – YouTube Project",
    company: "Orfium Sri Lanka",
    period: "Feb 2025 - Jul 2025 | Full-time | Hybrid",
    description: "Managed YouTube Music copyright claims and CMS operations for global music clients, working directly with record labels and publishers. Ensured content compliance with YouTube and partner guidelines, conducted thorough metadata reviews and resolved conflicts to maintain accurate rights management for clients' content."
  },
  {
    id: 'exp-2',
    role: "Research Associate – TikTok & Meta Project",
    company: "Orfium Sri Lanka",
    period: "Nov 2023 - Jan 2025 | Full-time | Hybrid",
    description: "Led content classification initiatives for TikTok by reviewing and categorizing multimedia content in alignment with platform community guidelines, working directly with record labels and music publishers and contributing high quality labeled data to support the training and improvement of AI-based content moderation models."
  },
  {
    id: 'exp-1',
    role: "Process Associate",
    company: "Infomate (Pvt) Ltd – John Keells Holdings Colombo, Western Province, Sri Lanka",
    period: "Jul 2022 - Jun 2023 | Full-time | Hybrid",
    description: "Processed vendor invoices with a strong focus on accuracy and timely payment while managing multilingual purchase orders and invoices in Swedish, Norwegian, Spanish, and Finnish. Collaborated closely with internal teams and external vendors to resolve discrepancies efficiently, maintaining high levels of accuracy and meeting tight deadlines in a fast-paced environment."
  }
];

export const SKILL_CATEGORIES: (SkillCategory & { icon: React.ReactNode })[] = [
  {
    name: "Cloud & Infrastructure",
    icon: <Cloud className="w-5 h-5" />,
    skills: [
      "AWS Core Services (EC2, S3, RDS, VPC, IAM, CloudFront, ACM, WAF)",
      "AWS ECS (Fargate)",
      "AWS Lambda",
      "AWS Cost Monitoring & Optimization (Fundamentals)"
    ]
  },
  {
    name: "Infrastructure as Code (IaC)",
    icon: <Cpu className="w-5 h-5" />,
    skills: [
      "Terraform",
      "AWS CloudFormation (Fundamentals)"
    ]
  },
  {
    name: "Containers & CI/CD",
    icon: <Box className="w-5 h-5" />,
    skills: [
      "Docker",
      "GitHub Actions",
      "Secure CI/CD Pipelines",
      "HTTPS Deployments",
      "Auto-scaling & High Availability Architectures (Fundamentals)"
    ]
  },
  {
    name: "Monitoring & Observability",
    icon: <Activity className="w-5 h-5" />,
    skills: [
      "AWS CloudWatch",
      "Prometheus",
      "Grafana (Metrics, Dashboards, Alerts Fundamentals)"
    ]
  },
  {
    name: "Security & Networking",
    icon: <ShieldCheck className="w-5 h-5" />,
    skills: [
      "AWS Security Best Practices (IAM, Least Privilege, WAF)",
      "AWS Secrets Manager",
      "Networking Fundamentals (VPC, Subnets, Routing, Security Groups)"
    ]
  },
  {
    name: "DNS & SSL Management",
    icon: <Network className="w-5 h-5" />,
    skills: [
      "Cloudflare (DNS Management, SSL/TLS Configuration)"
    ]
  },
  {
    name: "Systems & Automation",
    icon: <Terminal className="w-5 h-5" />,
    skills: [
      "Linux Fundamentals",
      "Python Scripting & Automation",
      "Git & Version Control"
    ]
  },
  {
    name: "Databases & Platforms",
    icon: <Database className="w-5 h-5" />,
    skills: [
      "PostgreSQL",
      "MySQL",
      "Kubernetes (Fundamentals)"
    ]
  },
  {
    name: "IDEs & Developer Tools",
    icon: <Code2 className="w-5 h-5" />,
    skills: [
      "Visual Studio Code",
      "IntelliJ IDEA",
      "Cursor"
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: "AWS Multi-Tier Infrastructure",
    description: "Fully automated VPC setup with public/private subnets, load balancers, and auto-scaling groups using Terraform.",
    techStack: ["Terraform", "AWS", "Bash"],
    githubUrl: "#",
    imageUrl: "/h9Ec3oA2XWnXSQVuah-xg.jpg"
  },
  {
    id: 'p2',
    title: "Kubernetes Cluster Deployment",
    description: "Self-healing microservices architecture deployed on a managed K8s cluster with persistent storage and monitoring.",
    techStack: ["K8s", "Docker", "Helm", "Prometheus"],
    githubUrl: "#",
    imageUrl: "/Pic01.jpg"
  },
  {
    id: 'p3',
    title: "Automated CI/CD Pipeline",
    description: "Streamlined deployment process from Git push to production using GitHub Actions, including automated testing and linting.",
    techStack: ["GitHub Actions", "Node.js", "Docker Hub"],
    githubUrl: "#",
    imageUrl: "/Gemini_Generated_Image_3661ag3661ag3661.png"
  }
];

export const CERTIFICATIONS: Certification[] = [
  // Add your certifications here
];
