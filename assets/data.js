// ─────────────────────────────────────────────────────────────
// PORTFOLIO DATA — the only file you should need to edit
// ─────────────────────────────────────────────────────────────

const PORTFOLIO = {
    // IDENTITY
    name: "Ahnaf Zaman",
    headline: "Aspiring Electrical Engineer, Edge AI Enthusiast",
    bio: "I am an aspiring electrical engineer currently studying at the University. I build systems integrating low-cost hardware and cutting-edge software technology to make edge computing more accessible. ",
    avatar: "assets/images/avatar.png",
    cv: "cv.pdf",

    // CONTACT
    contact: {
        email: "ahnafzaman2006@gmail.com",
        github: "https://github.com/ahnaf-zaman",
        linkedin: "https://linkedin.com/in/ahnafzaman2006",
        cv: "cv.pdf",
    },

    // PROJECTS
    projects: [
        {
            title: "Home Monitor",
            description: "ESP32-based local environment monitoring system, integrating Flask server for storing and visualizing historical sensor data",
            tags: ["ESP32", "Sensors", "Flask", "SQLite"],
            image: "assets/images/project-1.png",
            github: "https://github.com/you/project",
            demo: "https://project-demo.vercel.app",
            featured: true,
        },
        {
            title: "PyLLM",
            description: "Terminal-native LLM chatting environment with support for local and cloud models, long-term memory, and more.",
            tags: ["Python", "Ollama", "ChromaDB", "SQLite"],
            image: "assets/images/project-1.png",
            github: "https://github.com/you/project",
            demo: "https://project-demo.vercel.app",
            featured: true,
        },
        {
            title: "Shobdle",
            description: "Bangla variant of Wordle shipped and approved for Summer of Making 2025.",
            tags: ["HTML", "JavaScript", "Regex"],
            image: "assets/images/project-1.png",
            github: "https://github.com/you/project",
            demo: "https://project-demo.vercel.app",
            featured: true,
        },
        {
            title: "This Website!",
            description: "A portfolio website designed to showcase my projects and skills.",
            tags: ["HTML", "CSS", "JavaScript"],
            image: "assets/images/projects/portfolio.png",
            github: "https://github.com/ahnaf-zaman/ahnaf-zaman.github.io",
            demo: "https://ahnaf-zaman.github.io",
            featured: true,
        },
    ],

    // SKILLS
    skills: [
        {
            category: "Languages",
            items: [
                { name: "Python", level: 5 }, // 1 (beginner) – 5 (expert)
                { name: "JavaScript", level: 4 },
                { name: "C++", level: 3 },
            ],
        },
        {
            category: "Tools & Frameworks",
            items: [
                { name: "React", level: 4 },
                { name: "Docker", level: 3 },
            ],
        },
    ],

    // EXPERIENCE
    experience: [
        {
            role: "Private Tutor",
            company: "Self-Employed",
            dates: "Aug 2024 - Present",
            location: "Dhaka, BD",
            bullets: [
                "Built custom teaching materials",
                "Led development of feature W",
            ],
        },
    ],

    // AWARDS
    awards: [
        {
            title: "1st Place — University Hackathon",
            org: "University XYZ",
            year: 2024,
            icon: "award", // feather icon name
        },
    ],

    // EDUCATION
    education: [
        {
            degree: "B.Sc. Computer Science",
            institution: "University Name",
            dates: "2021 - 2025",
            gpa: "3.8/4.0", // optional
        },
    ],
};
