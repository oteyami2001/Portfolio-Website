/**
 * Project case studies. Content is sourced from each project's GitHub README.
 * Diagrams are original SVG layouts rendered by <ArchitectureDiagram />.
 */

export type DiagramZone = { id: string; label: string; x: number; y: number; w: number; h: number; tone: "onprem" | "cloud" | "subnet" | "control" };
export type DiagramNode = { id: string; label: string; sub?: string; x: number; y: number; kind: "network" | "compute" | "data" | "security" | "ops" | "automation" | "user"; detail: string };
export type DiagramEdge = { from: string; to: string; label?: string; dashed?: boolean };
export type Diagram = { title: string; width: number; height: number; zones: DiagramZone[]; nodes: DiagramNode[]; edges: DiagramEdge[] };

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  platform: "AWS" | "Azure" | "AWS · Multi-account";
  summary: string;
  github?: string;
  liveDemo?: string;
  context: string;
  challenge: string;
  approach: { title: string; body: string }[];
  services: string[];
  troubleshooting?: { issue: string; cause: string; fix: string }[];
  outcomes: string[];
  lessons: string[];
  evidence?: string;
  diagram: Diagram;
};

export const projects: Project[] = [
  {
    slug: "ballotonline-aws-migration",
    title: "BallotOnline AWS Cloud Migration",
    kicker: "On-premises → AWS",
    platform: "AWS",
    summary:
      "Enterprise migration of an on-premises MySQL HR database and Hyper-V servers to AWS — replatforming the database to Amazon Aurora with AWS DMS and rehosting servers with AWS Application Migration Service, all defined in seven CloudFormation stacks.",
    github: "https://github.com/oteyami2001/BallotOnline-AWS-Cloud-Migration",
    context:
      "BallotOnline ran its HR database and internal services on aging on-premises infrastructure: a MySQL server holding employee records and a single Hyper-V host running Intranet, FTP and NTP servers — with limited capacity, no high availability, manual database administration and little centralized logging.",
    challenge:
      "Move these workloads to AWS with minimal disruption while improving availability, security and operations — and make the move reversible with a tested rollback path.",
    approach: [
      { title: "Replatform the database", body: "MySQL → Amazon Aurora MySQL via AWS DMS, with source-preparation SQL, exact table mappings, task settings and post-migration validation queries (row counts, content hashes, spot checks)." },
      { title: "Rehost the servers", body: "Hyper-V → Amazon EC2 with AWS Application Migration Service (MGN): agent install scripts, a lifecycle script and a cutover validation checklist." },
      { title: "Private two-AZ network", body: "VPC across two Availability Zones with public, application, database and staging subnets, NAT, routing, Flow Logs and a Site-to-Site VPN back to the office." },
      { title: "Infrastructure as code", body: "Seven ordered CloudFormation stacks (network → operations) deployed by a single deploy.sh, linted with cfn-lint in CI." },
      { title: "Security built in", body: "Least-privilege IAM with MFA policies, KMS encryption, Secrets Manager, TLS-only database connections, CloudTrail, GuardDuty and IAM Access Analyzer." },
      { title: "Operate and recover", body: "22 CloudWatch alarms and a dashboard, SNS alerting, EventBridge rules, Systems Manager, plus cutover, go/no-go, rollback and disaster-recovery runbooks." },
    ],
    services: [
      "VPC", "Site-to-Site VPN", "EC2", "Aurora MySQL", "AWS DMS", "AWS MGN", "CloudFormation", "IAM", "KMS",
      "Secrets Manager", "CloudTrail", "GuardDuty", "CloudWatch", "EventBridge", "SNS", "Systems Manager", "Trusted Advisor", "GitHub Actions",
    ],
    troubleshooting: [
      { issue: "DMS source endpoint connection failure", cause: "ODBC-related failure reaching the source MySQL", fix: "Verified availability, credentials, routing, security rules and DNS; endpoint tests are now a blocking go/no-go item." },
      { issue: "DMS-00001 hostname not resolved", cause: "The VPC resolver cannot resolve on-premises names", fix: "Use the private IP or a Route 53 Resolver outbound endpoint." },
      { issue: "\"No tables were found at task initialization\"", cause: "Schema name / table-mapping mismatch and missing grants", fix: "Exact schema name in table-mappings.json and a SHOW GRANTS check in source preparation." },
    ],
    outcomes: [
      "Seven CloudFormation stacks, migration scripts, validation SQL, IAM policies and runbooks in one reviewable repository.",
      "CI on every pull request: cfn-lint, shellcheck, JSON/YAML and SVG checks, Markdown link checks and a secret-pattern scan.",
      "Documented rollback and DR strategy: Aurora backups and point-in-time recovery, EC2 recovery and rebuild-from-code.",
    ],
    lessons: [
      "Validate connectivity — and DNS resolution from where the migration actually runs — before creating a task.",
      "One wrong schema name selects zero tables; validate mappings explicitly.",
      "Plan and test rollback before cutover: once users write to the target, rollback needs data reconciliation.",
      "Treat monitoring as part of the migration design, not something added after go-live.",
    ],
    evidence:
      "Originated as UMGC M.S. Cloud Computing Systems coursework (DMS endpoints and tasks run in the course lab) and extended into an engineering portfolio. Templates are statically validated; the full environment has not been deployed as a production system.",
    diagram: {
      title: "BallotOnline target architecture on AWS",
      width: 1000,
      height: 560,
      zones: [
        { id: "onprem", label: "On-premises datacenter", x: 20, y: 70, w: 210, h: 420, tone: "onprem" },
        { id: "aws", label: "AWS Region · VPC across 2 Availability Zones", x: 290, y: 30, w: 690, h: 400, tone: "cloud" },
        { id: "app", label: "Private app subnets", x: 490, y: 80, w: 190, h: 150, tone: "subnet" },
        { id: "db", label: "Private DB subnets", x: 490, y: 260, w: 190, h: 150, tone: "subnet" },
        { id: "ctrl", label: "Security & operations plane", x: 290, y: 440, w: 690, h: 108, tone: "control" },
      ],
      nodes: [
        { id: "mysql", label: "MySQL HR DB", sub: "source", x: 125, y: 170, kind: "data", detail: "On-premises MySQL holding employee records. Prepared with a dedicated, least-privilege dms_migration user restricted to the DMS subnet with TLS required." },
        { id: "hyperv", label: "Hyper-V host", sub: "Intranet · FTP · NTP", x: 125, y: 360, kind: "compute", detail: "Single Hyper-V host running Intranet, FTP and NTP servers — rehosted with the MGN replication agent." },
        { id: "vpn", label: "Site-to-Site VPN", sub: "encrypted tunnel", x: 360, y: 260, kind: "network", detail: "IPsec Site-to-Site VPN connecting the office network to the VPC for replication and hybrid access." },
        { id: "dms", label: "AWS DMS", sub: "replication instance", x: 580, y: 330, kind: "automation", detail: "Full-load replication from MySQL to Aurora with explicit table mappings, task settings and row-level validation." },
        { id: "mgn", label: "AWS MGN", sub: "block replication", x: 580, y: 155, kind: "automation", detail: "Application Migration Service continuously replicates server disks to a staging subnet, then launches test and cutover instances." },
        { id: "ec2", label: "Amazon EC2", sub: "Intranet · FTP · NTP", x: 850, y: 155, kind: "compute", detail: "Rehosted workloads on EC2 in private subnets, managed with Systems Manager Session Manager and Patch Manager — no SSH exposure." },
        { id: "aurora", label: "Aurora MySQL", sub: "Multi-AZ · encrypted", x: 850, y: 330, kind: "data", detail: "Managed Aurora MySQL with KMS encryption, TLS-only connections, automated backups and point-in-time recovery." },
        { id: "sec", label: "Security services", sub: "IAM · KMS · GuardDuty", x: 590, y: 505, kind: "security", detail: "Least-privilege IAM with MFA, KMS keys, Secrets Manager for credentials, CloudTrail auditing, GuardDuty threat detection and IAM Access Analyzer." },
        { id: "ops", label: "Observability", sub: "CloudWatch · SSM · SNS", x: 850, y: 505, kind: "ops", detail: "22 CloudWatch alarms and a dashboard, CIS-style security alarms, SNS alerting, EventBridge rules and Systems Manager operations." },
      ],
      edges: [
        { from: "mysql", to: "vpn" },
        { from: "hyperv", to: "vpn" },
        { from: "vpn", to: "dms", label: "full load" },
        { from: "vpn", to: "mgn", label: "replication" },
        { from: "dms", to: "aurora" },
        { from: "mgn", to: "ec2", label: "cutover" },
        { from: "ec2", to: "aurora", dashed: true },
        { from: "sec", to: "dms", dashed: true },
        { from: "ops", to: "aurora", dashed: true },
      ],
    },
  },
  {
    slug: "ballotonline-azure-orchestration",
    title: "BallotOnline Azure Cloud Orchestration",
    kicker: "IaaS + PaaS on Microsoft Azure",
    platform: "Azure",
    summary:
      "An Azure proof of concept evaluating IaaS and PaaS side by side: a load-balanced VM Scale Set built from a golden Compute Gallery image, and a Linux App Service deployed from Git — automated with ARM templates, Azure CLI and Bash.",
    github: "https://github.com/oteyami2001/BallotOnline-Azure-Cloud-Orchestration",
    liveDemo: "https://oteyami2001.github.io/BallotOnline-Azure-Cloud-Orchestration/",
    context:
      "BallotOnline needed an evaluation of Microsoft Azure as an alternative and complementary platform to AWS, comparing operational responsibility, scaling and cost of control between IaaS and PaaS.",
    challenge:
      "Evolve a single VM into a highly available, multi-instance web tier, stand up an equivalent PaaS deployment, and document the trade-offs — with security and repeatability built in.",
    approach: [
      { title: "Golden image", body: "Ubuntu + Nginx VM captured into an Azure Compute Gallery image so every instance is identical." },
      { title: "High availability", body: "VM Scale Set (min 1, default 2, max 2) behind an Azure Load Balancer with an HTTP health probe on port 80 — no public IPs on backend instances." },
      { title: "PaaS path", body: "Linux App Service with a PHP runtime provisioned via Azure CLI and deployed from Git, with monitoring and scaling evaluation." },
      { title: "Automation & IaC", body: "Parameterized ARM templates for the VM and VMSS, Bash bootstrap/user-data scripts and GitHub Actions repository validation." },
      { title: "Security & governance", body: "SSH keys only, Network Security Groups, managed identity, Trusted Launch with Secure Boot and vTPM, sanitized public artifacts." },
      { title: "Multi-cloud analysis", body: "AWS ↔ Azure service mapping and architecture decision records (IaaS vs. PaaS, load-balanced VMSS)." },
    ],
    services: [
      "Virtual Machines", "VM Scale Sets", "Azure Load Balancer", "Compute Gallery", "App Service", "Azure CLI", "ARM Templates",
      "Network Security Groups", "Managed Identity", "Azure Monitor", "Nginx", "GitHub Actions",
    ],
    troubleshooting: [
      { issue: "Nginx install failed with 404", cause: "Stale APT package index", fix: "apt-get update, then reinstall." },
      { issue: "App Service Plan creation failed", cause: "No regional compute quota in East US", fix: "Deployed to West US 3." },
      { issue: "Azure CLI rejected --resource-group", cause: "Typographic dash pasted from a document", fix: "Retyped with ASCII hyphens." },
      { issue: "git push authentication failed", cause: "Remote still used the old deployment username", fix: "git remote set-url with the new credentials." },
    ],
    outcomes: [
      "Load-balanced, multi-instance web tier built from a reusable golden image.",
      "Side-by-side IaaS vs. PaaS comparison showing how service model shifts operational responsibility.",
      "Thirteen implementation guides, a troubleshooting runbook and two ADRs, validated by GitHub Actions.",
    ],
    lessons: [
      "The choice of service model affects day-to-day responsibility as much as the choice of cloud provider.",
      "Regional quotas are a real constraint — plan region fallbacks.",
      "Golden images make scale-out instances predictable and fast to boot.",
    ],
    evidence: "UMGC M.S. Cloud Computing Systems project extended into a public engineering portfolio with a live demo site.",
    diagram: {
      title: "BallotOnline IaaS and PaaS architecture on Azure",
      width: 1000,
      height: 560,
      zones: [
        { id: "iaas", label: "IaaS · Virtual Network", x: 230, y: 30, w: 500, h: 300, tone: "cloud" },
        { id: "vmss", label: "VM Scale Set (min 1 · default 2 · max 2)", x: 470, y: 80, w: 240, h: 230, tone: "subnet" },
        { id: "paas", label: "PaaS", x: 230, y: 360, w: 500, h: 140, tone: "cloud" },
        { id: "ctrl", label: "Governance & operations", x: 760, y: 30, w: 220, h: 470, tone: "control" },
      ],
      nodes: [
        { id: "users", label: "Users", sub: "internet", x: 100, y: 180, kind: "user", detail: "Public HTTP traffic reaches only the load balancer frontend — backend instances have no public IPs." },
        { id: "dev", label: "Developer", sub: "Git · Azure CLI", x: 100, y: 430, kind: "user", detail: "Provisioning with Azure CLI and Bash; application changes deployed with git push." },
        { id: "lb", label: "Azure Load Balancer", sub: "HTTP probe :80 /", x: 340, y: 180, kind: "network", detail: "Distributes traffic across healthy VMSS instances using an HTTP health probe on port 80, path /." },
        { id: "vm1", label: "Instance 1", sub: "Ubuntu + Nginx", x: 590, y: 130, kind: "compute", detail: "Scale-set instance launched from the golden image, hardened with SSH keys only and Trusted Launch." },
        { id: "vm2", label: "Instance 2", sub: "Ubuntu + Nginx", x: 590, y: 255, kind: "compute", detail: "Second instance providing redundancy; the scale set replaces unhealthy instances automatically." },
        { id: "app", label: "App Service", sub: "Linux · PHP", x: 480, y: 430, kind: "compute", detail: "Managed PaaS hosting with Git-based continuous deployment — Azure manages OS and web server." },
        { id: "gallery", label: "Compute Gallery", sub: "golden image", x: 870, y: 110, kind: "automation", detail: "Versioned image definition captured from the configured Ubuntu + Nginx VM." },
        { id: "arm", label: "ARM Templates", sub: "+ GitHub Actions", x: 870, y: 230, kind: "automation", detail: "Parameterized templates for VM and VMSS, validated in CI with GitHub Actions." },
        { id: "nsg", label: "NSG · Managed Identity", sub: "Trusted Launch", x: 870, y: 345, kind: "security", detail: "Network Security Groups, managed identity, Secure Boot and vTPM, SSH-key-only access." },
        { id: "mon", label: "Azure Monitor", sub: "metrics · autoscale", x: 870, y: 455, kind: "ops", detail: "Monitoring and autoscaling evaluation for both the VMSS and App Service." },
      ],
      edges: [
        { from: "users", to: "lb", label: "HTTP" },
        { from: "lb", to: "vm1" },
        { from: "lb", to: "vm2" },
        { from: "dev", to: "app", label: "git push" },
        { from: "gallery", to: "vm1", dashed: true },
        { from: "gallery", to: "vm2", dashed: true },
        { from: "mon", to: "app", dashed: true },
      ],
    },
  },
  {
    slug: "cloud-tech-inter-foundation",
    title: "Cloud Tech Inter LLC Cloud Infrastructure",
    kicker: "Multi-account AWS foundation",
    platform: "AWS · Multi-account",
    summary:
      "The governed, multi-account AWS foundation behind Cloud Tech Inter LLC — AWS Organizations, organizational units, IAM Identity Center permission sets and centralized security — designed as a repeatable blueprint for small-business clients.",
    context:
      "Small businesses often start with a single AWS account and shared root credentials. That model does not scale, makes least privilege hard, and mixes production with experimentation.",
    challenge:
      "Provide a secure, auditable foundation that a small team can operate: separated workloads, single sign-on with role-based access, centralized logging and guardrails — without enterprise-level overhead.",
    approach: [
      { title: "AWS Organizations", body: "A management account that owns billing and governance, with member accounts grouped into organizational units by function and environment." },
      { title: "Organizational units", body: "Separate OUs for security, shared infrastructure, workloads (production and non-production) and sandbox experimentation." },
      { title: "IAM Identity Center", body: "Single sign-on with permission sets mapped to job functions — administrator, power user, read-only and billing — assigned per account." },
      { title: "Guardrails", body: "Service control policies, MFA everywhere, no long-lived access keys and least-privilege defaults." },
      { title: "Centralized visibility", body: "Organization-wide CloudTrail and centralized logging for audit and incident response." },
      { title: "Automation", body: "Infrastructure defined with CloudFormation and Terraform and delivered through GitHub Actions for repeatable client rollouts." },
    ],
    services: ["AWS Organizations", "IAM Identity Center", "Permission Sets", "Service Control Policies", "CloudTrail", "IAM", "KMS", "CloudFormation", "Terraform", "GitHub Actions"],
    outcomes: [
      "A repeatable multi-account blueprint for small-business cloud adoption.",
      "Human access through short-lived, role-based SSO sessions instead of IAM users.",
      "Clear blast-radius boundaries between production, non-production and sandbox workloads.",
    ],
    lessons: [
      "Governance is cheapest on day one — retrofitting account boundaries is expensive.",
      "Permission sets mapped to job functions keep access reviews simple for small teams.",
    ],
    evidence: "Reference architecture for Cloud Tech Inter LLC. OU and permission-set names illustrate the design pattern.",
    diagram: {
      title: "Cloud Tech Inter LLC multi-account AWS organization",
      width: 1000,
      height: 560,
      zones: [
        { id: "org", label: "AWS Organization", x: 20, y: 30, w: 960, h: 510, tone: "cloud" },
        { id: "ous", label: "Organizational units", x: 260, y: 230, w: 700, h: 290, tone: "subnet" },
      ],
      nodes: [
        { id: "mgmt", label: "Management account", sub: "billing · SCPs", x: 500, y: 100, kind: "security", detail: "Owns consolidated billing and organization-wide policy. No workloads run here." },
        { id: "idc", label: "IAM Identity Center", sub: "SSO · MFA", x: 140, y: 230, kind: "security", detail: "Single sign-on for every human user with MFA enforced; access is granted through permission sets." },
        { id: "ps", label: "Permission sets", sub: "Admin · PowerUser · ReadOnly · Billing", x: 140, y: 400, kind: "security", detail: "Job-function roles assigned per account and group, producing short-lived credentials." },
        { id: "secou", label: "Security OU", sub: "log archive · audit", x: 380, y: 300, kind: "ops", detail: "Centralized organization CloudTrail, log archive and security tooling, isolated from workloads." },
        { id: "infra", label: "Infrastructure OU", sub: "shared network", x: 600, y: 300, kind: "network", detail: "Shared networking and services consumed by workload accounts." },
        { id: "prod", label: "Workloads · Prod", sub: "client production", x: 820, y: 300, kind: "compute", detail: "Production workloads with the strictest guardrails and change control." },
        { id: "dev", label: "Workloads · Non-prod", sub: "dev · test", x: 600, y: 445, kind: "compute", detail: "Development and test accounts mirroring production patterns." },
        { id: "sandbox", label: "Sandbox OU", sub: "experiments", x: 820, y: 445, kind: "automation", detail: "Isolated experimentation with budget alerts and restrictive SCPs." },
      ],
      edges: [
        { from: "mgmt", to: "secou" },
        { from: "mgmt", to: "infra" },
        { from: "mgmt", to: "prod" },
        { from: "idc", to: "ps" },
        { from: "ps", to: "secou", label: "assign", dashed: true },
        { from: "infra", to: "dev" },
        { from: "infra", to: "sandbox", dashed: true },
        { from: "mgmt", to: "idc", dashed: true },
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
