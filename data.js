// === Portfolio Data - Muhd Amir Rashidi Bin Hamzah ===

const portfolioData = {
    center: {
        name: "Amir Rashidi",
        subtitle: "QA & Software Engineer",
        bio: "QA & Software Engineer with 8+ years in IT. From building government portals to leading test automation for banking apps — I bring a developer's mindset to quality assurance. Specializing in Selenium, API testing, and CI/CD pipelines across web, mobile & desktop platforms."
    },

    categories: [
        {
            id: "work",
            label: "Work",
            icon: "💼",
            color: "#ff6b6b",
            items: [
                {
                    id: "work-1",
                    title: "Senior QA (Manual & Automation)",
                    subtitle: "Asian Business Software Solution",
                    date: "Mac 2024 – Present",
                    description: [
                        "Lead automation initiative for Accounting System",
                        "Design test scripts, test scope and detailed test artifacts",
                        "Perform regression testing for desktop application",
                        "Develop and maintain web automation test suites",
                        "Review and validate Jira tickets raised by TSR",
                        "Log and manage bugs with detailed analysis and screenshots",
                        "Validate new feature enhancements and report defects",
                        "Conduct end-to-end testing for new projects"
                    ],
                    tags: ["Selenium", "Jira", "Regression", "Automation", "Web"]
                },
                {
                    id: "work-2",
                    title: "Automation Engineer Sr Analyst",
                    subtitle: "Accenture",
                    date: "Dec 2023 – Dec 2024",
                    description: [
                        "Execute and test web, API and mobile applications for tech resiliency and fallback",
                        "Test fraud app mobile application for security measurements",
                        "Prepare test scripts, test scope and test artifacts",
                        "Collaborate with client and internal stakeholders on deliverables"
                    ],
                    tags: ["API Testing", "Mobile", "Security", "Automation"]
                },
                {
                    id: "work-3",
                    title: "Senior QA (Technical Tester)",
                    subtitle: "Appfuxion Consulting",
                    date: "Nov 2021 – Nov 2023",
                    description: [
                        "Led testing team during daily standup and project discussions",
                        "Analyze user story requirements and identify gaps",
                        "Conduct SIT/UAT Testing",
                        "Perform API, functional and backend testing for BAU process",
                        "Check logs and errors in Kibana/Apache Kafka",
                        "Verify ETL processes using SFTP/WinSCP",
                        "Check reporting accuracy in SFTPGO Web Client",
                        "Liaise with developers on test plan execution"
                    ],
                    tags: ["API Testing", "Kibana", "Kafka", "SIT/UAT", "ETL"]
                },
                {
                    id: "work-4",
                    title: "Portal Developer",
                    subtitle: "MyQuick HR Sdn Bhd",
                    date: "Oct 2020 – Nov 2021",
                    description: [
                        "Develop, maintain and bug fix payroll system using POJO and Spring MVC",
                        "Create and generate reports using Microsoft Crystal Reports"
                    ],
                    tags: ["Java", "Spring MVC", "Crystal Reports"]
                },
                {
                    id: "work-5",
                    title: "Application Support / Tester",
                    subtitle: "Orisoft Technology",
                    date: "July 2019 – July 2020",
                    description: [
                        "Support in-house HR application (leave, allowance, OT, claim, salary)",
                        "Provide SQL queries based on client needs",
                        "Report bugs and prepare necessary documents",
                        "Test patches released by programmers",
                        "Install and migrate applications remotely"
                    ],
                    tags: ["SQL", "Support", "Testing", "Kayako"]
                },
                {
                    id: "work-6",
                    title: "Portal Developer",
                    subtitle: "Faradisse High Sdn Bhd",
                    date: "June 2016 – June 2019",
                    description: [
                        "Develop government portals using Joomla CMS",
                        "Build government web applications using Struts2 framework",
                        "Create reports using Jasper Report and Apache Poi",
                        "Develop APIs/webservices using PHP and Spring Hibernate",
                        "Build in-house HR system using Spring Security, JPA",
                        "Develop mobile application using Android Studio"
                    ],
                    tags: ["Java", "Struts2", "PHP", "Spring", "Android"]
                }
            ]
        },
        {
            id: "project",
            label: "Projects",
            icon: "🚀",
            color: "#4ecdc4",
            items: [
                {
                    id: "project-1",
                    title: "Mobile App Shielding",
                    subtitle: "MAYBANK — Accenture",
                    date: "Dec 2023 – Dec 2024",
                    description: "Testing the security of banking mobile application pre-login and post-login.",
                    tags: ["Security", "Mobile", "Banking"]
                },
                {
                    id: "project-2",
                    title: "Touch 'n Go Migration",
                    subtitle: "Appfuxion Consulting",
                    date: "Nov 2021 – Nov 2023",
                    description: "Manage migration of multiple modules from old legacy system to new enhanced system. Implement new threshold checking system.",
                    tags: ["Migration", "ETL", "Legacy System"]
                },
                {
                    id: "project-3",
                    title: "UiTM & PNB Payroll",
                    subtitle: "MyQuick HR",
                    date: "Oct 2020 – Nov 2021",
                    description: "Develop payroll system for the client based on requirements gathered by system implementer.",
                    tags: ["Payroll", "Java", "Spring MVC"]
                },
                {
                    id: "project-4",
                    title: "Parliament Portal",
                    subtitle: "Faradisse High",
                    date: "Jun 2016 – Jun 2019",
                    description: "Official Portal to manage Takwim and related functionality. Development and maintenance of web apps for parliament units.",
                    tags: ["Government", "Portal", "Struts2"]
                }
            ]
        },
        {
            id: "education",
            label: "Education",
            icon: "🎓",
            color: "#ffd93d",
            items: [
                {
                    id: "edu-1",
                    title: "BSc Information System Engineering",
                    subtitle: "UiTM Jasin",
                    date: "Sep 2013 – Feb 2016",
                    description: "Bachelor's degree in Information System Engineering with CGPA 3.19.",
                    tags: ["Degree", "CGPA 3.19", "Engineering"]
                },
                {
                    id: "edu-2",
                    title: "Diploma in Computer Science",
                    subtitle: "UiTM Segamat",
                    date: "June 2009 – June 2012",
                    description: "Diploma in Computer Science with CGPA 2.77.",
                    tags: ["Diploma", "CGPA 2.77", "CS"]
                },
                {
                    id: "edu-3",
                    title: "Certified Kubernetes Administrator",
                    subtitle: "Professional Certification",
                    date: "Certified",
                    description: "CKA certification in Kubernetes administration and container orchestration.",
                    tags: ["Kubernetes", "CKA", "Cloud"]
                },
                {
                    id: "edu-4",
                    title: "Certified DevOps Practitioner",
                    subtitle: "Professional Certification",
                    date: "Certified",
                    description: "Certification in DevOps practices, CI/CD pipelines and automation.",
                    tags: ["DevOps", "CI/CD", "Automation"]
                }
            ]
        },
        {
            id: "skill",
            label: "Skills",
            icon: "⚡",
            color: "#a78bfa",
            // Constellation data — stars grouped by cluster with connections
            constellation: true,
            stars: [
                // Testing cluster
                { id: "s-selenium", label: "Selenium", cluster: "testing", x: 0.25, y: 0.3 },
                { id: "s-katalon", label: "Katalon", cluster: "testing", x: 0.15, y: 0.2 },
                { id: "s-robot", label: "Robot FW", cluster: "testing", x: 0.12, y: 0.35 },
                { id: "s-testng", label: "TestNG", cluster: "testing", x: 0.32, y: 0.18 },
                { id: "s-junit", label: "JUnit", cluster: "testing", x: 0.35, y: 0.32 },
                { id: "s-jmeter", label: "JMeter", cluster: "performance", x: 0.28, y: 0.48 },
                { id: "s-gatling", label: "Gatling", cluster: "performance", x: 0.18, y: 0.52 },
                // Dev cluster
                { id: "s-java", label: "Java", cluster: "dev", x: 0.55, y: 0.3 },
                { id: "s-spring", label: "Spring Boot", cluster: "dev", x: 0.65, y: 0.22 },
                { id: "s-php", label: "PHP", cluster: "dev", x: 0.5, y: 0.18 },
                { id: "s-maven", label: "Maven", cluster: "dev", x: 0.68, y: 0.35 },
                // DevOps cluster
                { id: "s-docker", label: "Docker", cluster: "devops", x: 0.72, y: 0.55 },
                { id: "s-k8s", label: "Kubernetes", cluster: "devops", x: 0.82, y: 0.48 },
                { id: "s-jenkins", label: "Jenkins", cluster: "devops", x: 0.78, y: 0.65 },
                { id: "s-github-actions", label: "GH Actions", cluster: "devops", x: 0.88, y: 0.6 },
                { id: "s-sonarqube", label: "SonarQube", cluster: "devops", x: 0.85, y: 0.72 },
                // DB cluster
                { id: "s-mysql", label: "MySQL", cluster: "db", x: 0.4, y: 0.7 },
                { id: "s-mssql", label: "MSSQL", cluster: "db", x: 0.5, y: 0.75 },
                { id: "s-oracle", label: "Oracle", cluster: "db", x: 0.45, y: 0.85 },
                { id: "s-mongodb", label: "MongoDB", cluster: "db", x: 0.55, y: 0.82 },
                // Logging
                { id: "s-kafka", label: "Kafka", cluster: "logging", x: 0.62, y: 0.72 },
                { id: "s-kibana", label: "Kibana", cluster: "logging", x: 0.58, y: 0.62 },
            ],
            connections: [
                // Testing cluster
                ["s-selenium", "s-katalon"],
                ["s-selenium", "s-robot"],
                ["s-selenium", "s-testng"],
                ["s-selenium", "s-junit"],
                ["s-testng", "s-junit"],
                // Testing to Performance
                ["s-selenium", "s-jmeter"],
                ["s-jmeter", "s-gatling"],
                // Dev cluster
                ["s-java", "s-spring"],
                ["s-java", "s-php"],
                ["s-java", "s-maven"],
                ["s-spring", "s-maven"],
                // Dev to Testing
                ["s-java", "s-selenium"],
                ["s-java", "s-junit"],
                // DevOps cluster
                ["s-docker", "s-k8s"],
                ["s-docker", "s-jenkins"],
                ["s-jenkins", "s-github-actions"],
                ["s-k8s", "s-sonarqube"],
                ["s-jenkins", "s-sonarqube"],
                // DevOps to Dev
                ["s-maven", "s-jenkins"],
                ["s-maven", "s-docker"],
                // DB cluster
                ["s-mysql", "s-mssql"],
                ["s-mysql", "s-oracle"],
                ["s-oracle", "s-mongodb"],
                ["s-mssql", "s-mongodb"],
                // DB to others
                ["s-mysql", "s-java"],
                // Logging
                ["s-kafka", "s-kibana"],
                ["s-kafka", "s-docker"],
                ["s-kibana", "s-mysql"],
            ],
            clusters: {
                testing: { label: "Testing", color: "#ff6b6b" },
                performance: { label: "Performance", color: "#ff9f43" },
                dev: { label: "Development", color: "#4ecdc4" },
                devops: { label: "DevOps", color: "#a78bfa" },
                db: { label: "Database", color: "#ffd93d" },
                logging: { label: "Logging & ETL", color: "#38bdf8" }
            },
            items: [
                {
                    id: "skill-1",
                    title: "Test Automation",
                    subtitle: "Core Expertise",
                    date: "5+ years",
                    description: "Selenium, Katalon, JUnit + Mockito, Robot Framework, TestNG. Web, mobile, and desktop automation.",
                    tags: ["Selenium", "Katalon", "Robot Framework", "TestNG"]
                },
                {
                    id: "skill-2",
                    title: "API & Performance Testing",
                    subtitle: "Testing",
                    date: "4+ years",
                    description: "REST API and SOAP testing. Performance testing with JMeter and Gatling. Allure and Extent Reports.",
                    tags: ["REST", "SOAP", "JMeter", "Gatling"]
                },
                {
                    id: "skill-3",
                    title: "Java & Spring",
                    subtitle: "Development",
                    date: "5+ years",
                    description: "Java Spring Boot, Spring MVC, Hibernate, Security, JPA. Maven & Gradle.",
                    tags: ["Java", "Spring Boot", "Maven", "Gradle"]
                },
                {
                    id: "skill-4",
                    title: "DevOps & Cloud",
                    subtitle: "Infrastructure",
                    date: "Certified",
                    description: "Docker, Kubernetes, Jenkins, GitHub Actions, SonarQube, Trivy. AWS CloudWatch.",
                    tags: ["Docker", "K8s", "Jenkins", "AWS"]
                },
                {
                    id: "skill-5",
                    title: "Database",
                    subtitle: "Data",
                    date: "5+ years",
                    description: "MySQL, MSSQL, Oracle (SP, Views, Triggers). NoSQL: MongoDB.",
                    tags: ["MySQL", "MSSQL", "Oracle", "MongoDB"]
                }
            ]
        },
        {
            id: "contact",
            label: "Contact",
            icon: "📬",
            color: "#38bdf8",
            items: [
                {
                    id: "contact-2",
                    title: "Email",
                    subtitle: "Yahoo Mail",
                    date: "Active",
                    description: "amirrashidihamzah91@yahoo.com",
                    tags: ["Email", "Professional"],
                    link: "mailto:amirrashidihamzah91@yahoo.com"
                },
                {
                    id: "contact-3",
                    title: "LinkedIn",
                    subtitle: "Professional Network",
                    date: "Connect",
                    description: "linkedin.com/in/amirrashidi-hamzah/",
                    tags: ["LinkedIn", "Networking"],
                    link: "https://linkedin.com/in/amirrashidi-hamzah/"
                }
            ]
        },
        {
            id: "github",
            label: "GitHub",
            icon: "🐙",
            color: "#f472b6",
            items: [
                {
                    id: "github-1",
                    title: "Portfolio Website",
                    subtitle: "This Project",
                    date: "2024",
                    description: "Interactive solar system portfolio built with D3.js and GSAP. Orbital animations, timeline view, and space-themed UI.",
                    tags: ["JavaScript", "GSAP", "SVG", "CSS"],
                    link: "https://github.com/amirrashidi"
                },
                {
                    id: "github-2",
                    title: "Automation Framework",
                    subtitle: "Test Automation",
                    date: "2023",
                    description: "Web automation test framework using Selenium + TestNG with Page Object Model pattern. Allure reporting integrated.",
                    tags: ["Selenium", "TestNG", "Java", "POM"],
                    link: "https://github.com/amirrashidi"
                },
                {
                    id: "github-3",
                    title: "API Test Suite",
                    subtitle: "REST Testing",
                    date: "2023",
                    description: "REST API automation using Rest Assured with data-driven testing approach and CI/CD integration.",
                    tags: ["Rest Assured", "Java", "CI/CD"],
                    link: "https://github.com/amirrashidi"
                }
            ]
        }
    ]
};
