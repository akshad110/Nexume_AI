import { TEMPLATE_IDS, getDefaultSectionOrder } from './resumeTemplates'
import {
  DEFAULT_BODY_FONT_SIZE,
  DEFAULT_HEADING_FONT_SIZE,
} from './resumeTypography'

/** Sample data for template picker previews (LaTeX professional layout) */
const professionalSample = {
  templateId: TEMPLATE_IDS.PROFESSIONAL,
  themeColor: '#171717',
  firstName: 'Sourabh',
  lastName: 'Bajaj',
  jobTitle: 'Software Engineer',
  email: 'mail@website.com',
  phone: '+1-123-456-7890',
  website: 'http://www.sourabhbajaj.com',
  education: [
    {
      universityName: 'Georgia Institute of Technology',
      degree: 'Master of Science in Computer Science',
      major: 'Atlanta, GA',
      startDate: 'Aug. 2012',
      endDate: 'Dec. 2013',
    },
    {
      universityName: 'Birla Institute of Technology and Science',
      degree: 'Bachelor of Engineering in Electrical and Electronics',
      major: 'Pilani, India',
      startDate: 'Aug. 2008',
      endDate: 'July 2012',
    },
  ],
  experience: [
    {
      title: 'Software Engineer',
      companyName: 'Google',
      city: 'Mountain View',
      state: 'CA',
      startDate: 'Oct 2016',
      endDate: '',
      currenlyworking: true,
      workSummery:
        '<ul><li><b>Tensorflow</b>: Open source library for training deep learning models.</li><li><b>Apache Beam</b>: Unified model for batch and streaming pipelines.</li></ul>',
    },
    {
      title: 'Senior Software Engineer',
      companyName: 'Coursera',
      city: 'Mountain View',
      state: 'CA',
      startDate: 'Jan 2014',
      endDate: 'Oct 2016',
      workSummery:
        '<ul><li><b>Notifications</b>: Email, push and in-app notification service.</li></ul>',
    },
  ],
  projects: [
    {
      name: 'QuantSoftware Toolkit',
      techUsed: 'Python, Pandas, NumPy',
      description:
        'Open source python library for financial data analysis and machine learning for finance.',
    },
    {
      name: 'Github Visualization',
      techUsed: 'JavaScript, D3.js',
      description: 'Data Visualization of Git Log data using D3.',
    },
  ],
  skills: [
    { title: 'Languages', skills: ['Scala', 'Python', 'Javascript', 'C++', 'SQL', 'Java'] },
    { title: 'Tools', skills: ['AWS', 'Play', 'React', 'Kafka', 'GCE'] },
  ],
}

const classicSample = {
  templateId: TEMPLATE_IDS.CLASSIC,
  themeColor: '#7c3aed',
  firstName: 'Alex',
  lastName: 'Johnson',
  jobTitle: 'Full Stack Developer',
  email: 'alex@email.com',
  phone: '+1 555-0100',
  address: 'San Francisco, CA',
  summery:
    'Experienced developer building scalable web applications with React and Node.js.',
  experience: [
    {
      title: 'Full Stack Developer',
      companyName: 'Tech Corp',
      city: 'SF',
      state: 'CA',
      startDate: '2021',
      endDate: 'Present',
      currenlyworking: true,
      workSummery: '<ul><li>Built customer-facing dashboards</li></ul>',
    },
  ],
  projects: [
    {
      name: 'Portfolio Site',
      techUsed: 'React, Vite, Tailwind CSS',
      description: 'Personal portfolio with React.',
    },
  ],
  education: [
    {
      universityName: 'State University',
      degree: 'B.S. Computer Science',
      major: '',
      startDate: '2017',
      endDate: '2021',
    },
  ],
  skills: [
    { title: 'Frontend', skills: ['React', 'TypeScript', 'Tailwind'] },
    { title: 'Backend', skills: ['Node.js', 'PostgreSQL'] },
  ],
}

const modernSample = {
  templateId: TEMPLATE_IDS.MODERN,
  themeColor: '#0f172a',
  firstName: 'Jordan',
  lastName: 'Lee',
  jobTitle: 'Product Engineer',
  email: 'jordan@email.com',
  phone: '+1 555-0200',
  summery: 'Product-focused engineer with 5+ years shipping user-centric features.',
  experience: [
    {
      title: 'Product Engineer',
      companyName: 'Startup Inc',
      city: 'Remote',
      state: '',
      startDate: '2020',
      endDate: 'Present',
      currenlyworking: true,
      workSummery: '<ul><li>Led MVP launch for 50k users</li></ul>',
    },
  ],
  education: [
    {
      universityName: 'Tech Institute',
      degree: 'B.Tech',
      major: 'Information Technology',
      startDate: '2016',
      endDate: '2020',
    },
  ],
  skills: [
    { title: 'Tools', skills: ['Figma', 'Jira', 'Git'] },
  ],
  projects: [
    {
      name: 'Analytics Dashboard',
      techUsed: 'React, Node.js',
      description: 'Built internal metrics dashboard for product team.',
    },
  ],
}

const dataScienceSample = {
  templateId: TEMPLATE_IDS.DATA_SCIENCE,
  themeColor: '#2563eb',
  firstName: 'Timmy',
  lastName: 'Chan',
  jobTitle: 'Data Scientist / Junior Developer',
  email: 'timmy@email.com',
  phone: '(555) 123-4567',
  address: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/timmy-l-chan',
  github: 'github.com/TimmyChan',
  website: 'https://mathtodata.com',
  summery:
    'Data scientist with experience in Python, SQL, and ML pipelines. Seeking roles in analytics and product data.',
  skills: [
    { title: 'Languages', skills: ['Python', 'R', 'SQL'] },
    { title: 'ML', skills: ['scikit-learn', 'TensorFlow', 'Pandas'] },
    { title: 'Tools', skills: ['Jupyter', 'Git', 'Docker'] },
  ],
  experience: professionalSample.experience.slice(0, 2),
  education: professionalSample.education.slice(0, 1),
  customSections: [
    {
      title: 'Activities',
      content: '<ul><li>Open source contributor</li><li>Kaggle competitions</li></ul>',
    },
  ],
}

const developerSample = {
  templateId: TEMPLATE_IDS.DEVELOPER,
  themeColor: '#2563eb',
  firstName: 'Jane',
  lastName: 'Doe',
  jobTitle: 'Full Stack Developer',
  email: 'jane.doe@email.com',
  phone: '5555555555',
  address: 'Anycity, Anystate',
  linkedin: 'linkedin.com/in/jane-doe',
  github: 'github.com/jane-doe',
  website: 'jane-doe.com',
  summery:
    'Highly skilled web developer with 3+ years of experience in React, Node.js, and PHP. Experience with REST APIs and MVC frameworks.',
  skills: [
    { title: 'Languages', skills: ['JavaScript', 'PHP', 'Java', 'HTML', 'CSS'] },
    { title: 'Frameworks', skills: ['React.js', 'Angular', 'Express', 'Node.js'] },
    { title: 'Databases', skills: ['MongoDB', 'PostgreSQL'] },
  ],
  experience: [
    {
      title: 'Web Developer',
      companyName: 'Anycompany',
      city: 'Remote',
      state: 'Anystate',
      startDate: 'Apr 2022',
      endDate: 'Present',
      currenlyworking: true,
      workSummery:
        '<ul><li>Designed dynamic websites using HTML, CSS, JavaScript, and PHP</li><li>Improved website performance by 55%</li></ul>',
    },
  ],
  education: [
    {
      universityName: 'University of Anystate',
      degree: 'B.S. Computer Science',
      major: 'Anycity',
      startDate: 'Jan 2016',
      endDate: 'Dec 2020',
    },
  ],
  projects: [
    {
      name: 'Project 1',
      techUsed: 'React.js, Redux, PHP, MySQL',
      description: 'Clean modern website with responsive design.',
    },
  ],
  customSections: [
    {
      title: 'Certifications',
      content: '<ul><li>AWS Certified Developer</li></ul>',
    },
  ],
}

const sidebarSample = {
  templateId: TEMPLATE_IDS.SIDEBAR,
  themeColor: '#1f2937',
  firstName: 'Rahul',
  lastName: 'Chauhan',
  jobTitle: 'B.Tech CSE — Final Year',
  email: 'rahul@email.com',
  phone: '+91-8449368522',
  address: 'NIT Srinagar, India',
  linkedin: 'linkedin.com/in/rahulworld',
  github: 'github.com/rahulworld',
  website: 'rahulchauhan.net',
  summery: 'Computer Science student with internship experience in ML and open source.',
  skills: [
    { title: 'Languages', skills: ['C/C++', 'Java', 'Python', 'JavaScript'] },
    { title: 'Framework', skills: ['Flask', 'Node.js', 'React'] },
    { title: 'Databases', skills: ['MySQL', 'PostgreSQL', 'MongoDB'] },
  ],
  education: [
    {
      universityName: 'NIT Srinagar',
      degree: 'B.Tech in CSE',
      major: '',
      startDate: '2018',
      endDate: '2024',
    },
  ],
  experience: [
    {
      title: 'GSoC Student Developer',
      companyName: 'OSGeo',
      city: '',
      state: '',
      startDate: '2018',
      endDate: '2019',
      workSummery: '<p>Unit of measure conversion in istSOS3.</p>',
    },
  ],
  projects: [
    {
      name: 'Digital Certificate Dapp',
      techUsed: 'Blockchain, Web3JS',
      description: 'Dapp to issue and verify certificates on Ethereum.',
    },
  ],
  customSections: [
    {
      title: 'Achievements',
      content: '<ul><li>Digital India — Grand Prize Winner</li></ul>',
    },
  ],
}

export const TEMPLATE_SAMPLE_DATA = {
  [TEMPLATE_IDS.CLASSIC]: classicSample,
  [TEMPLATE_IDS.PROFESSIONAL]: professionalSample,
  [TEMPLATE_IDS.MODERN]: modernSample,
  [TEMPLATE_IDS.DATA_SCIENCE]: dataScienceSample,
  [TEMPLATE_IDS.DEVELOPER]: developerSample,
  [TEMPLATE_IDS.SIDEBAR]: sidebarSample,
}

export function getTemplateSample(templateId) {
  return (
    TEMPLATE_SAMPLE_DATA[templateId] ||
    TEMPLATE_SAMPLE_DATA[TEMPLATE_IDS.CLASSIC]
  )
}

/** Empty starter data when user creates a new resume */
export function getInitialResumeData(templateId, { title, resumeid, userEmail, userName }) {
  const base = {
    title,
    resumeid,
    userEmail,
    userName,
    templateId,
    firstName: '',
    lastName: '',
    jobTitle: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    linkedin: '',
    github: '',
    summery: '',
    education: [],
    experience: [],
    projects: [],
    skills: [],
    programmingSkills: { languages: '', technologies: '' },
    customSections: [],
    sectionOrder: getDefaultSectionOrder(templateId),
    sectionVisibility: Object.fromEntries(
      getDefaultSectionOrder(templateId).map((id) => [id, true]),
    ),
    headingFontSize: DEFAULT_HEADING_FONT_SIZE,
    bodyFontSize: DEFAULT_BODY_FONT_SIZE,
  }

  const themeByTemplate = {
    [TEMPLATE_IDS.PROFESSIONAL]: '#171717',
    [TEMPLATE_IDS.MODERN]: '#0f172a',
    [TEMPLATE_IDS.DATA_SCIENCE]: '#2563eb',
    [TEMPLATE_IDS.DEVELOPER]: '#2563eb',
    [TEMPLATE_IDS.SIDEBAR]: '#1f2937',
    [TEMPLATE_IDS.CLASSIC]: '#7c3aed',
  }

  return {
    ...base,
    themeColor: themeByTemplate[templateId] || themeByTemplate[TEMPLATE_IDS.CLASSIC],
  }
}
