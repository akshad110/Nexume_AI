import { TEMPLATE_IDS } from './resumeTemplates'

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
      description:
        'Open source python library for financial data analysis and machine learning for finance.',
    },
    {
      name: 'Github Visualization',
      description: 'Data Visualization of Git Log data using D3.',
    },
  ],
  programmingSkills: {
    languages: 'Scala, Python, Javascript, C++, SQL, Java',
    technologies: 'AWS, Play, React, Kafka, GCE',
  },
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
    { name: 'Portfolio Site', description: 'Personal portfolio with React.' },
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
}

export const TEMPLATE_SAMPLE_DATA = {
  [TEMPLATE_IDS.CLASSIC]: classicSample,
  [TEMPLATE_IDS.PROFESSIONAL]: professionalSample,
  [TEMPLATE_IDS.MODERN]: modernSample,
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
    summery: '',
    education: [],
    experience: [],
    projects: [],
    skills: [],
    programmingSkills: { languages: '', technologies: '' },
  }

  if (templateId === TEMPLATE_IDS.PROFESSIONAL) {
    return {
      ...base,
      themeColor: '#171717',
    }
  }

  if (templateId === TEMPLATE_IDS.MODERN) {
    return {
      ...base,
      themeColor: '#0f172a',
    }
  }

  return {
    ...base,
    themeColor: '#7c3aed',
  }
}
