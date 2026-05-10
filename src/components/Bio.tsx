import {
  Box,
  Container,
  Typography,
  Divider,
  Stack,
  Paper,
  Chip,
  Grid,
  Avatar,
} from '@mui/material'
import {
  Person,
  School,
  Work,
  Code,
  VerifiedUser,
  LocationOn,
  Email as EmailIcon,
} from '@mui/icons-material'

const summary =
  'Full-stack Software Engineer and Technical Lead with 14+ years of experience in designing and building scalable web applications. Skilled in mentoring cross-functional teams, driving architectural decisions, and overseeing the full software development lifecycle. Strong expertise in Microsoft and JavaScript ecosystems and cloud platforms. Proven success in delivering results across diverse industries including accounting, pharma, and hospitality. Versatile in agile environments, with a focus on fostering high-performing teams through clean code principles and test-driven development.'

const technicalSkills = {
  'Languages & Frameworks': [
    'React', 'Node.js', 'C#', 'TypeScript', 'JavaScript',
    'ASP.NET MVC/Core', 'Angular', 'KnockoutJS',
  ],
  'Frontend': [
    'React (Hooks, Redux, Context API)', 'SASS', 'Material UI',
    'AngularJS', 'KnockoutJS', 'CSS3',
  ],
  'Backend & APIs': ['.NET Core', 'WebAPI', 'Entity Framework', 'Node.js'],
  'Databases': ['MS SQL Server', 'MySQL'],
  'Tools & Platforms': [
    'Azure DevOps', 'Git', 'SVN', 'Docker', 'GitHub', 'Storybook', 'GitHub Copilot',
  ],
  'CMS': ['SharePoint', 'Drupal', 'Kentico', 'Umbraco'],
  'Testing & QA': ['Jest', 'React Testing Library', 'TDD', 'Automated Testing'],
  'Methodologies': ['Agile (Scrum/Kanban)', 'Waterfall', 'SOLID', 'Design Patterns'],
  'AI Tools': ['GitHub Copilot (Claude Sonnet)', 'Microsoft Copilot'],
}

interface Experience {
  company: string
  role: string
  period: string
  highlights: string[]
}

const experience: Experience[] = [
  {
    company: 'Cognizant Softvision',
    role: 'Senior Software Engineer',
    period: 'Oct 2016 – Present',
    highlights: [
      'Technical Lead for a team of 10 (DEV + QA) for an accounting and advisory firm, building a Resource Management website with React, Redux, Node.js, SQL, and GitHub Copilot.',
      'SharePoint development using ReactJS and .NET Core API development for audit, assurance, tax, and consulting services.',
      'Pure front-end development for Pharmacy Benefit Management using React with Context API, Storybook, and React Testing Library — from ground development to production deployment.',
      'Full-stack development for a fleet management platform using .NET Core, AngularJS, and SQL.',
      'Test-driven SharePoint module development with React and automated testing for a public accounting firm.',
      'Maintained and enhanced KnockoutJS/ASP.NET applications for a digital LED display manufacturer.',
      'Ground-up Angular v4.x development for a utilities services company.',
      'Maintenance and bug fixes for hospitality and vacation ownership sites using .NET MVC, SQL, and Drupal.',
      'Facilitated daily stand-ups, managed backlog refinement, and ensured cross-regional project continuity with US onshore leads.',
    ],
  },
  {
    company: 'Chantons',
    role: 'Software Developer',
    period: 'Apr 2016 – Sep 2016',
    highlights: [
      'Supported and enhanced a finance-related CMS for an online casino platform.',
      'Utilized .NET MVC and Angular v2.x to develop and maintain features.',
    ],
  },
  {
    company: 'Cloud Employee',
    role: 'Software Developer',
    period: 'May 2015 – Apr 2016',
    highlights: [
      'Handled projects for UK-based clients using Kentico and Umbraco CMS.',
      'Developed ASP.NET applications with C#, LINQ, MVC, and SQL.',
      'Engaged in agile and test-driven environments for finance and business websites.',
    ],
  },
  {
    company: 'Metrobank Card Corporation',
    role: 'Software Developer',
    period: 'Nov 2014 – May 2015',
    highlights: [
      'Worked on core banking systems related to credit card transactions.',
      'Built and tested modules using C#, ASP.NET MVC, and PL/SQL.',
    ],
  },
  {
    company: 'Mobext',
    role: 'Web Developer',
    period: 'Nov 2013 – Nov 2014',
    highlights: [
      "Led the development of the Shakey's Pizza delivery website, SWEEP card app and website.",
      'Created backend APIs for mobile apps and integrated multiple JS frameworks.',
    ],
  },
  {
    company: "Tom's World",
    role: 'Programmer',
    period: 'Apr 2013 – Nov 2013',
    highlights: [
      'Created biometric log retrieval tools and employee punch-in systems using VB.NET and C#.',
      'Provided tech support and internal software maintenance.',
    ],
  },
  {
    company: 'New Alabang TLI',
    role: 'Technical Instructor',
    period: 'Jun 2012 – Mar 2013',
    highlights: [
      'Taught web and software development (VB.NET, PHP, Java, SQL).',
      'Managed computer lab equipment and Linux-based systems.',
    ],
  },
  {
    company: 'RTLawrence',
    role: 'Programmer',
    period: 'Oct 2011 – Apr 2012',
    highlights: [
      'Developed a Windows-based touchscreen kiosk application using VB.NET and ASP.NET.',
    ],
  },
]

const sectionPaper = {
  p: { xs: 3, md: 4 },
  bgcolor: '#1a1a1a',
  border: '1px solid #222',
  borderRadius: 3,
}

export default function Bio() {
  return (
    <Box id="bio" sx={{ py: 10, bgcolor: '#0a0a0a' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 3, lg: 8 } }}>
        {/* Section heading */}
        <Stack direction="row" alignItems="center" spacing={1} mb={4}>
          <Person sx={{ color: '#90caf9' }} />
          <Typography variant="h4" fontWeight={700}>
            Bio / Curriculum Vitae
          </Typography>
        </Stack>
        <Divider sx={{ borderColor: '#222', mb: 5 }} />

        {/* Info strip */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={5} alignItems="center">
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: '#1565c0',
              fontSize: 32,
              border: '3px solid #90caf9',
            }}
          >
            ARD
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Alberto Rico Desalisa
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#90caf9' }}>
              Senior Software Engineer / Technical Lead
            </Typography>
            <Stack direction="row" spacing={2} mt={0.5}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <LocationOn sx={{ fontSize: 16, color: '#888' }} />
                <Typography variant="body2" sx={{ color: '#888' }}>
                  Pasig City, Philippines
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <EmailIcon sx={{ fontSize: 16, color: '#888' }} />
                <Typography variant="body2" sx={{ color: '#888' }}>
                  ricodesalisa@gmail.com
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        {/* Summary */}
        <Paper sx={{ ...sectionPaper, mb: 4 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#90caf9' }}>
            Summary
          </Typography>
          <Typography variant="body1" sx={{ color: '#bbb', lineHeight: 1.9 }}>
            {summary}
          </Typography>
        </Paper>

        {/* Technical Skills */}
        <Paper sx={{ ...sectionPaper, mb: 4 }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <Code sx={{ color: '#90caf9' }} />
            <Typography variant="h6" fontWeight={700} sx={{ color: '#90caf9' }}>
              Technical Skills
            </Typography>
          </Stack>
          <Grid container spacing={3}>
            {Object.entries(technicalSkills).map(([category, items]) => (
              <Grid key={category} size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography variant="subtitle2" sx={{ color: '#ccc', mb: 1 }}>
                  {category}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                  {items.map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      size="small"
                      sx={{
                        bgcolor: '#1a237e22',
                        color: '#90caf9',
                        border: '1px solid #1565c0',
                        fontWeight: 500,
                        fontSize: 12,
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Professional Experience */}
        <Paper sx={{ ...sectionPaper, mb: 4 }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={3}>
            <Work sx={{ color: '#90caf9' }} />
            <Typography variant="h6" fontWeight={700} sx={{ color: '#90caf9' }}>
              Professional Experience
            </Typography>
          </Stack>

          {experience.map((exp, idx) => (
            <Box
              key={exp.company}
              sx={{
                mb: idx < experience.length - 1 ? 4 : 0,
                pl: { xs: 0, md: 2 },
                borderLeft: { md: '2px solid #1565c0' },
              }}
            >
              <Box sx={{ pl: { md: 2 } }}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ sm: 'center' }}
                  spacing={0.5}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#fff' }}>
                      {exp.role}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#90caf9' }}>
                      {exp.company}
                    </Typography>
                  </Box>
                  <Chip
                    label={exp.period}
                    size="small"
                    sx={{
                      bgcolor: '#0d1b2a',
                      color: '#90caf9',
                      fontSize: 11,
                      alignSelf: { xs: 'flex-start', sm: 'center' },
                    }}
                  />
                </Stack>
                <Box component="ul" sx={{ color: '#999', mt: 1, pl: 2, '& li': { mb: 0.5 } }}>
                  {exp.highlights.map((h, i) => (
                    <li key={i}>
                      <Typography variant="body2" sx={{ color: '#999' }}>
                        {h}
                      </Typography>
                    </li>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </Paper>

        {/* Education & Certification */}
        <Paper sx={sectionPaper}>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <School sx={{ color: '#90caf9' }} />
            <Typography variant="h6" fontWeight={700} sx={{ color: '#90caf9' }}>
              Education & Certification
            </Typography>
          </Stack>
          <Stack spacing={2}>
            <Box>
              <Stack direction="row" alignItems="center" spacing={1}>
                <School sx={{ fontSize: 18, color: '#888' }} />
                <Typography variant="subtitle2" sx={{ color: '#ccc' }}>
                  Education
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: '#999', pl: 3.5 }}>
                AMA Computer Learning Center — Web Application Development
              </Typography>
            </Box>
            <Box>
              <Stack direction="row" alignItems="center" spacing={1}>
                <VerifiedUser sx={{ fontSize: 18, color: '#888' }} />
                <Typography variant="subtitle2" sx={{ color: '#ccc' }}>
                  Certification
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: '#999', pl: 3.5 }}>
                SAFe 6 Certification for Teams
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
