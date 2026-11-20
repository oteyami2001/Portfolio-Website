/**
 * Single source of truth for portfolio content.
 * Every page, the resume and the AI assistant read from this file,
 * so updating a role, certification or project here updates the whole site.
 */

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com").replace(/\/$/, "");
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

export const profile = {
  name: "Thierry Arcadius Oteyami",
  shortName: "Thierry Oteyami",
  initials: "TO",
  title: "Cloud Engineer · Cloud Solutions Architect · Oracle DBA",
  headline: "Engineering Secure, Scalable, and Intelligent Cloud Infrastructure.",
  tagline: "Cloud Engineer | AWS • Azure • OCI | Oracle DBA | DevOps & Automation",
  location: "Maryland, USA",
  company: "Cloud Tech Inter LLC",
  photo: "/images/thierry-oteyami.jpg",
  summary:
    "Cloud engineer and Oracle database administrator with more than 13 years of Oracle database experience and over four years of Oracle Cloud Infrastructure engineering, plus hands-on work across Amazon Web Services and Microsoft Azure. I design secure, scalable cloud infrastructure, migrate enterprise workloads, run mission-critical databases, build high-availability and disaster-recovery solutions, and automate infrastructure so it can be rebuilt from code.",
  intro:
    "I sit where infrastructure meets data. Years of keeping Oracle databases fast, recoverable and secure taught me what production really demands — and that discipline now shapes how I design cloud platforms on AWS, OCI and Azure.",
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
} as const;

export const stats = [
  { value: "13+", label: "Years of Oracle database administration" },
  { value: "4+", label: "Years engineering on Oracle Cloud Infrastructure" },
  { value: "3", label: "Cloud platforms: AWS, OCI and Azure" },
  { value: "5", label: "Professional certifications" },
] as const;

export type Role = {
  id: string;
  company: string;
  role: string;
  period: string;
  type: "Founder" | "Full-time" | "Freelance" | "Earlier career";
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    id: "cloud-tech-inter",
    company: "Cloud Tech Inter LLC",
    role: "Founder & Cloud Engineer",
    period: "2025 – Present",
    type: "Founder",
    summary:
      "Founded a cloud engineering practice that designs and implements cloud solutions for small businesses on AWS, OCI and Azure.",
    highlights: [
      "Design multi-account AWS foundations with AWS Organizations, organizational units and IAM Identity Center permission sets.",
      "Plan and deliver workload migrations, landing zones and secure network topologies across AWS, OCI and Azure.",
      "Codify infrastructure with Terraform and CloudFormation and automate delivery with GitHub Actions.",
      "Apply security-first governance: least-privilege access, MFA, encryption, centralized logging and auditing.",
    ],
    stack: ["AWS Organizations", "IAM Identity Center", "OCI", "Azure", "Terraform", "CloudFormation", "GitHub Actions"],
  },
  {
    id: "freelance-dev",
    company: "Freelance",
    role: "Software Developer",
    period: "2019 – 2025",
    type: "Freelance",
    summary:
      "Built and maintained software and scripting solutions for clients, combining application development with database and infrastructure expertise.",
    highlights: [
      "Developed applications and automation scripts in Python, Bash and PowerShell.",
      "Designed relational data models and database-backed features on Oracle, SQL Server, PostgreSQL and MySQL.",
      "Used Git-based workflows and CI practices to ship reliable, maintainable code.",
    ],
    stack: ["Python", "Bash", "PowerShell", "SQL", "Git", "Linux"],
  },
  {
    id: "synacore",
    company: "Synacore",
    role: "Oracle Cloud Engineer / Solutions Architect",
    period: "2019 – 2023",
    type: "Full-time",
    summary:
      "Designed and operated Oracle Cloud Infrastructure environments and supported the migration of enterprise Oracle workloads to OCI.",
    highlights: [
      "Architected OCI tenancies with VCNs, subnets, security lists, DRG and site-to-site VPN connectivity.",
      "Provisioned compute, load balancing, block volumes and object storage for database and application tiers.",
      "Implemented IAM policies, compartments and KMS-based encryption for secure, governed access.",
      "Migrated Oracle databases to OCI with RMAN and Data Guard, including high-availability and disaster-recovery design.",
    ],
    stack: ["OCI VCN", "DRG", "VPN", "Compute", "Load Balancer", "Object Storage", "KMS", "Oracle DB", "Data Guard", "RMAN"],
  },
  {
    id: "brontech",
    company: "BRONTECH SOLUTIONS",
    role: "Freelance Oracle & SQL Server Database Administrator",
    period: "2020 – 2022",
    type: "Freelance",
    summary:
      "Administered Oracle and Microsoft SQL Server databases for client environments, focused on availability, performance and recoverability.",
    highlights: [
      "Installed, patched and upgraded Oracle and SQL Server database environments.",
      "Built and tested backup and recovery strategies with RMAN and native SQL Server tooling.",
      "Diagnosed and tuned performance using AWR, execution plans and index strategies.",
      "Managed users, roles and auditing to meet least-privilege and compliance needs.",
    ],
    stack: ["Oracle Database", "SQL Server", "RMAN", "AWR", "Performance Tuning", "Backup & Recovery"],
  },
  {
    id: "coopervision",
    company: "CooperVision",
    role: "Database Engineer",
    period: "Earlier career",
    type: "Earlier career",
    summary: "Database engineering supporting enterprise Oracle environments.",
    highlights: [
      "Administered Oracle databases including RAC and ASM configurations.",
      "Supported high availability, backup and recovery, and performance operations.",
    ],
    stack: ["Oracle RAC", "ASM", "RMAN", "Linux"],
  },
  {
    id: "westsides",
    company: "Westsides Donut Group",
    role: "Database Engineer",
    period: "Earlier career",
    type: "Earlier career",
    summary: "Database engineering and administration for business systems.",
    highlights: [
      "Maintained database availability, backups and routine operational tasks.",
      "Supported reporting and data integrity for business applications.",
    ],
    stack: ["Oracle Database", "SQL", "Backup & Recovery"],
  },
  {
    id: "moov",
    company: "MOOV Telecom",
    role: "Database Engineer",
    period: "Earlier career",
    type: "Earlier career",
    summary: "Began a career in Oracle database engineering in the telecommunications sector.",
    highlights: [
      "Administered Oracle databases supporting telecom operations.",
      "Built a foundation in SQL, PL/SQL, Linux and database operations.",
    ],
    stack: ["Oracle Database", "PL/SQL", "Linux"],
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
    degree: "Computer Information Systems",
    school: "Earlier education",
    status: "Completed",
    detail: "Foundations in information systems, programming and database design.",
  },
];

export type Certification = {
  id: string;
  name: string;
  issuer: "Amazon Web Services" | "Oracle" | "CompTIA";
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
  {
    id: "oca",
    name: "Oracle Certified Associate (OCA)",
    issuer: "Oracle",
    short: "Oracle OCA",
    level: "Associate",
    focus: ["Oracle Database administration", "SQL", "Backup & recovery"],
  },
  {
    id: "secplus",
    name: "CompTIA Security+",
    issuer: "CompTIA",
    short: "Security+",
    level: "Professional",
    focus: ["Threats & vulnerabilities", "Identity & access", "Network security", "Risk management"],
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
      "EC2", "VPC", "S3", "IAM", "RDS / Aurora", "ECS", "Fargate", "Application Load Balancer", "Auto Scaling",
      "CloudWatch", "CloudTrail", "Route 53", "AWS Organizations", "Systems Manager", "DMS", "MGN", "CloudFormation",
    ],
  },
  {
    id: "oci",
    title: "Oracle Cloud Infrastructure",
    blurb: "Four-plus years designing OCI networks, compute and storage for Oracle workloads.",
    accent: "#FF6B5B",
    skills: ["VCN", "Compute", "Load Balancing", "IAM", "DRG", "VPN", "Object Storage", "Block Volumes", "KMS", "Cloud Migrations"],
  },
  {
    id: "azure",
    title: "Microsoft Azure",
    blurb: "IaaS and PaaS deployments, golden images and infrastructure as code on Azure.",
    accent: "#5B8CFF",
    skills: [
      "Azure Virtual Machines", "VM Scale Sets", "App Service", "Azure DevOps", "Azure CLI", "ARM Templates",
      "Networking", "Azure Monitor",
    ],
  },
  {
    id: "devops",
    title: "DevOps & Automation",
    blurb: "Everything as code — repeatable, reviewable, and continuously validated.",
    accent: "#35C8E8",
    skills: [
      "Terraform", "CloudFormation", "GitHub Actions", "Jenkins", "Ansible", "Docker", "Kubernetes", "Python",
      "Bash", "PowerShell", "Linux", "Git",
    ],
  },
  {
    id: "database",
    title: "Database Administration",
    blurb: "Thirteen-plus years keeping mission-critical data fast, available and recoverable.",
    accent: "#9B8CFF",
    skills: [
      "Oracle Database", "RAC", "ASM", "Data Guard", "GoldenGate", "RMAN", "SQL Server", "PostgreSQL", "MySQL",
      "Performance Tuning", "Backup & Recovery", "High Availability",
    ],
  },
  {
    id: "security",
    title: "Security & Governance",
    blurb: "Security+ certified. Least privilege, encryption and auditability by default.",
    accent: "#4ADE9B",
    skills: [
      "IAM", "MFA", "Least-Privilege Access", "Active Directory", "Network Security", "Encryption", "Auditing",
      "Disaster Recovery", "Cloud Security Best Practices",
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
    tools: ["Subnetting", "Routing", "DNS"],
    projects: ["ballotonline-aws-migration", "ballotonline-azure-orchestration"],
  },
  {
    id: "compute",
    label: "Compute",
    summary: "Right-sized, scalable compute from VMs to containers.",
    aws: ["EC2", "Auto Scaling", "ECS", "Fargate"],
    azure: ["Virtual Machines", "VM Scale Sets", "App Service"],
    oci: ["Compute", "Block Volumes"],
    tools: ["Docker", "Kubernetes", "Linux"],
    projects: ["ballotonline-aws-migration", "ballotonline-azure-orchestration"],
  },
  {
    id: "databases",
    label: "Databases",
    summary: "Highly available data tiers with tested recovery.",
    aws: ["Aurora", "RDS", "DMS"],
    azure: ["Azure SQL (evaluated)"],
    oci: ["Oracle DB on OCI", "Object Storage backups"],
    tools: ["Oracle RAC", "Data Guard", "GoldenGate", "RMAN", "SQL Server", "PostgreSQL", "MySQL"],
    projects: ["ballotonline-aws-migration"],
  },
  {
    id: "security",
    label: "Security",
    summary: "Identity-first, least-privilege, encrypted and audited.",
    aws: ["IAM", "IAM Identity Center", "KMS", "Secrets Manager", "GuardDuty", "CloudTrail"],
    azure: ["Entra ID / RBAC", "Managed Identity", "Trusted Launch"],
    oci: ["IAM Policies", "Compartments", "KMS Vault"],
    tools: ["MFA", "Active Directory", "Security+ practices"],
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
    projects: ["ballotonline-aws-migration", "ballotonline-azure-orchestration", "cloud-tech-inter-foundation"],
  },
];
