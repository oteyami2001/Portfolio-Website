/**
 * Single source of truth for portfolio content.
 * Every page, the resume and the AI assistant read from this file,
 * so updating a role, certification or project here updates the whole site.
 */

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com").replace(/\/$/, "");
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "oteyami2001@gmail.com";
export const contactPhone = { display: "718-593-6007", tel: "+17185936007" };

export const profile = {
  name: "Thierry Arcadius Oteyami",
  shortName: "Thierry Oteyami",
  initials: "TO",
  title: "Cloud Engineer · Cloud Solutions Architect · Oracle DBA",
  headline: "Engineering Secure, Scalable, and Intelligent Cloud Infrastructure.",
  tagline: "Cloud Engineer | AWS | OCI | Azure",
  location: "Silver Spring, Maryland",
  citizenship: "U.S. Citizen",
  company: "Cloud Tech Inter LLC",
  photo: "/images/thierry-oteyami.jpg",
  summary:
    "Cloud Engineer and Software Developer experienced in designing, deploying, automating, securing, and supporting cloud solutions across AWS, OCI, and Microsoft Azure. Skilled in cloud architecture, migration, Infrastructure as Code, Terraform, CloudFormation, CI/CD, Docker, Kubernetes, networking, IAM, monitoring, databases, and disaster recovery. Strong software development and Oracle database background with Python, Java, SQL, Oracle, MySQL, and PostgreSQL. AWS Certified Solutions Architect – Associate and Oracle Cloud Infrastructure certified; experience with RMF, NIST SP 800-53, DISA STIG, encryption, MFA, and least-privilege security.",
  intro:
    "I sit where infrastructure meets data. A background in Oracle database administration and software development taught me what production really demands — and that discipline now shapes how I design, automate and secure cloud platforms on AWS, OCI and Azure.",
  targetRoles: [
    "AWS Cloud Engineer",
    "OCI Cloud Engineer",
    "Cloud Solutions Architect",
    "DevOps Engineer",
    "Oracle DBA",
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/thierry-oteyami-645335347/",
    github: "https://github.com/oteyami2001",
  },
  resumePdf: "/resume/Thierry-Oteyami-Resume.pdf",
  yearsExperience: 6,
} as const;

export const stats = [
  { value: "6", label: "Years of professional experience" },
  { value: "3", label: "Cloud platforms: AWS, OCI and Azure" },
  { value: "3", label: "Cloud certifications: AWS and OCI" },
  { value: "2025", label: "Founded Cloud Tech Inter LLC" },
] as const;

export type Role = {
  id: string;
  company: string;
  role: string;
  period: string;
  type: "Founder" | "Freelance";
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    id: "cloud-tech-inter",
    company: "Cloud Tech Inter LLC",
    role: "Founder & Self-Employed Cloud Engineer",
    period: "2025 – Present",
    type: "Founder",
    summary:
      "Design and implement secure, scalable cloud solutions for small businesses and professional-service clients using AWS, Oracle Cloud Infrastructure (OCI) and Microsoft Azure.",
    highlights: [
      "Build AWS environments using VPCs, public/private subnets, EC2, S3, RDS, IAM, Route 53, CloudWatch, Application Load Balancers, Auto Scaling and related services.",
      "Develop Infrastructure-as-Code solutions with Terraform and AWS CloudFormation to standardize deployments and reduce manual configuration.",
      "Configure cloud identity and access management using least-privilege permissions, MFA, groups, roles and permission sets to strengthen account security.",
      "Plan and execute cloud migration solutions for applications, databases, websites and business data, including backup, validation, cutover, rollback and post-migration monitoring.",
    ],
    stack: ["AWS", "OCI", "Azure", "Terraform", "CloudFormation", "AWS Organizations", "IAM Identity Center", "ECS Fargate", "DMS", "MGN"],
  },
  {
    id: "freelance-dev",
    company: "Upwork / Freelance",
    role: "Software Developer",
    period: "2022 – 2025",
    type: "Freelance",
    summary:
      "Independent software and database development for client projects, from backend logic to automation and cloud deployment.",
    highlights: [
      "Designed, developed, tested and maintained software and database solutions using Java, Python, C#, C++, SQL and web technologies.",
      "Built data-driven applications and backend components, stored procedures, application logic and integrations.",
      "Developed automation scripts in Python, Bash and PowerShell to streamline repetitive technical and administrative tasks.",
      "Worked with Git-based source control and structured development practices for versioning, testing, troubleshooting and deployment.",
      "Deployed and supported applications in Linux and cloud-based environments, troubleshooting application, database, networking and configuration issues.",
    ],
    stack: ["Java", "Python", "C#", "C++", "SQL", "Bash", "PowerShell", "Git", "Linux"],
  },
  {
    id: "brontech",
    company: "BRONTECH SOLUTIONS",
    role: "Freelance Oracle Database Administrator",
    period: "2020 – 2022",
    type: "Freelance",
    summary:
      "Freelance Oracle DBA focused on availability, performance, recoverability and security of client database environments.",
    highlights: [
      "Administered Oracle database environments, including installation, configuration, patching, upgrades, performance monitoring and production support.",
      "Managed backup, recovery, cloning, refresh and migration activities using RMAN and Data Pump; supported RAC, ASM, Data Guard and disaster-recovery testing.",
      "Tuned database performance using Oracle Enterprise Manager, AWR, ASH, ADDM, execution plans and SQL tuning; resolved connectivity, storage, locking and performance issues.",
      "Strengthened database security through least-privilege access, auditing, patching, encryption and role administration, while automating recurring DBA tasks with SQL, PL/SQL and Bash.",
    ],
    stack: ["Oracle Database", "RMAN", "Data Pump", "RAC", "ASM", "Data Guard", "OEM", "AWR / ASH / ADDM", "PL/SQL"],
  },
];

export type Education = { degree: string; school: string; status: string; detail: string };

export const education: Education[] = [
  {
    degree: "Master of Science, Cloud Computing Systems",
    school: "University of Maryland Global Campus (UMGC)",
    status: "In progress",
    detail:
      "Graduate study in cloud architecture, migration, orchestration, security and operations — the source of the BallotOnline AWS and Azure case studies.",
  },
  {
    degree: "Bachelor of Science, Software Development and Security",
    school: "University of Maryland Global Campus (UMGC)",
    status: "Completed",
    detail: "Secure software engineering, application security, databases and systems programming.",
  },
  {
    degree: "Associate Degree, Computer Information Systems",
    school: "Kingsborough Community College (CUNY, New York)",
    status: "Completed",
    detail: "Foundations in information systems, programming and database design.",
  },
];

export type Certification = {
  id: string;
  name: string;
  issuer: "Amazon Web Services" | "Oracle";
  short: string;
  level: string;
  focus: string[];
  verifyUrl?: string;
};

export const certifications: Certification[] = [
  {
    id: "aws-saa",
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    short: "AWS SAA",
    level: "Associate",
    focus: ["Resilient architectures", "High-performing design", "Secure applications", "Cost optimization"],
  },
  {
    id: "oci-arch",
    name: "Oracle Cloud Infrastructure Architect Associate",
    issuer: "Oracle",
    short: "OCI Architect",
    level: "Associate",
    focus: ["VCN design", "Compute & storage", "IAM & security", "High availability"],
  },
  {
    id: "oci-found",
    name: "Oracle Cloud Infrastructure Foundations",
    issuer: "Oracle",
    short: "OCI Foundations",
    level: "Foundations",
    focus: ["Core OCI services", "Cloud concepts", "Pricing & governance"],
  },
];

export type SkillGroup = { id: string; title: string; blurb: string; accent: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    id: "aws",
    title: "AWS Cloud",
    blurb: "Landing zones, migrations and resilient application platforms on Amazon Web Services.",
    accent: "#F3B65D",
    skills: [
      "EC2", "S3", "VPC", "IAM", "RDS / Aurora", "Lambda", "ECS", "Fargate", "Application Load Balancer", "Auto Scaling",
      "CloudWatch", "CloudTrail", "Route 53", "AWS Organizations", "IAM Identity Center", "Systems Manager", "DMS", "MGN",
      "CloudFormation", "ParallelCluster",
    ],
  },
  {
    id: "oci",
    title: "Oracle Cloud Infrastructure",
    blurb: "OCI networking, compute, storage and Oracle database services.",
    accent: "#FF6B5B",
    skills: [
      "Compute", "Storage", "VCN", "IAM", "Load Balancer", "DRG", "VPN", "Object Storage", "Block Volumes", "KMS",
      "DBCS", "Exadata", "Autonomous Database", "GoldenGate",
    ],
  },
  {
    id: "azure",
    title: "Microsoft Azure",
    blurb: "IaaS and PaaS deployments, golden images and infrastructure as code on Azure.",
    accent: "#5B8CFF",
    skills: [
      "Virtual Machines", "VNets", "Storage", "App Service", "VM Scale Sets", "Load Balancer", "ARM Templates",
      "Azure CLI", "Azure Monitor", "Azure DevOps",
    ],
  },
  {
    id: "devops",
    title: "DevOps, IaC & Containers",
    blurb: "Everything as code — repeatable, reviewable and continuously validated.",
    accent: "#35C8E8",
    skills: [
      "Terraform", "CloudFormation", "ARM", "GitHub Actions", "Jenkins", "Ansible", "Git / GitOps", "CI/CD",
      "Docker", "Kubernetes", "Amazon ECS", "AWS Fargate", "Linux",
    ],
  },
  {
    id: "database",
    title: "Database Administration",
    blurb: "Oracle 12c–19c administration plus managed relational and NoSQL databases.",
    accent: "#9B8CFF",
    skills: [
      "Oracle 12c–19c", "RAC", "ASM", "Data Guard", "GoldenGate", "RMAN", "Data Pump", "OEM · AWR · ASH · ADDM",
      "RDS", "Aurora", "MySQL", "PostgreSQL", "SQL Server", "MongoDB", "DynamoDB", "Performance Tuning", "Backup & Recovery",
    ],
  },
  {
    id: "programming",
    title: "Software Development",
    blurb: "Applications, backend components and automation scripts.",
    accent: "#7FE3F5",
    skills: ["Python", "Java", "C#", "C++", "SQL", "PL/SQL", "Bash", "PowerShell", "Git"],
  },
  {
    id: "security",
    title: "Security & Governance",
    blurb: "Least privilege, encryption and compliance frameworks — RMF, NIST SP 800-53 and DISA STIG.",
    accent: "#4ADE9B",
    skills: [
      "IAM", "MFA", "RBAC", "Least Privilege", "Encryption", "TDE", "RMF", "NIST SP 800-53", "DISA STIG",
      "Auditing", "Disaster Recovery", "Network Security",
    ],
  },
];

/** Capability topology used by the interactive cloud map. */
export type Capability = {
  id: string;
  label: string;
  summary: string;
  aws: string[];
  azure: string[];
  oci: string[];
  tools: string[];
  projects: string[];
};

export const capabilities: Capability[] = [
  {
    id: "networking",
    label: "Networking",
    summary: "Segmented, private-by-default networks with hybrid connectivity.",
    aws: ["VPC", "Route 53", "Site-to-Site VPN", "ALB", "NAT"],
    azure: ["Virtual Network", "Load Balancer", "NSG"],
    oci: ["VCN", "DRG", "VPN", "Load Balancing"],
    tools: ["Subnetting", "Routing", "DNS", "Security groups"],
    projects: ["ballotonline-aws-migration", "wordpress-ecs-fargate", "ballotonline-azure-orchestration"],
  },
  {
    id: "compute",
    label: "Compute",
    summary: "Right-sized, scalable compute from VMs to containers.",
    aws: ["EC2", "Auto Scaling", "Lambda", "ECS", "Fargate", "ParallelCluster"],
    azure: ["Virtual Machines", "VM Scale Sets", "App Service"],
    oci: ["Compute", "Block Volumes"],
    tools: ["Docker", "Kubernetes", "Linux", "Slurm"],
    projects: ["wordpress-ecs-fargate", "aws-parallelcluster-hpc", "ballotonline-azure-orchestration"],
  },
  {
    id: "databases",
    label: "Databases",
    summary: "Highly available data tiers with tested recovery.",
    aws: ["Aurora", "RDS", "DynamoDB", "DMS"],
    azure: ["Azure SQL (evaluated)"],
    oci: ["DBCS", "Exadata", "Autonomous Database", "GoldenGate"],
    tools: ["Oracle RAC", "Data Guard", "RMAN", "Data Pump", "SQL Server", "PostgreSQL", "MySQL", "MongoDB"],
    projects: ["ballotonline-aws-migration", "wordpress-ecs-fargate"],
  },
  {
    id: "security",
    label: "Security",
    summary: "Identity-first, least-privilege, encrypted and audited.",
    aws: ["IAM", "IAM Identity Center", "KMS", "Secrets Manager", "GuardDuty", "CloudTrail"],
    azure: ["Entra ID / RBAC", "Managed Identity", "Trusted Launch"],
    oci: ["IAM Policies", "Compartments", "KMS Vault"],
    tools: ["MFA", "RBAC", "RMF", "NIST SP 800-53", "DISA STIG", "TDE"],
    projects: ["ballotonline-aws-migration", "ballotonline-azure-orchestration", "cloud-tech-inter-foundation"],
  },
  {
    id: "observability",
    label: "Observability",
    summary: "Alarms, dashboards and runbooks designed in from day one.",
    aws: ["CloudWatch", "EventBridge", "SNS", "Trusted Advisor"],
    azure: ["Azure Monitor", "Health Probes"],
    oci: ["Monitoring", "Logging"],
    tools: ["Runbooks", "AWR", "Alert design"],
    projects: ["ballotonline-aws-migration", "ballotonline-azure-orchestration"],
  },
  {
    id: "automation",
    label: "Automation",
    summary: "Infrastructure as code and CI pipelines that validate every change.",
    aws: ["CloudFormation", "Systems Manager", "MGN"],
    azure: ["ARM Templates", "Azure CLI", "Azure DevOps"],
    oci: ["Terraform (OCI provider)"],
    tools: ["Terraform", "GitHub Actions", "Jenkins", "Ansible", "Python", "Bash", "PowerShell"],
    projects: ["wordpress-ecs-fargate", "ballotonline-aws-migration", "ballotonline-azure-orchestration"],
  },
];
