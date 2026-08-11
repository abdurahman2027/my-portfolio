// =========================
// Mobile Menu
// =========================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}


// Close mobile menu after clicking a link

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

    });

});



// =========================
// Active Navigation
// =========================

const sections = document.querySelectorAll("main section");


function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;


        if (
            window.scrollY >=
            sectionTop - 200
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach((link) => {

        link.classList.remove("active");


        const linkTarget =
            link.getAttribute("href");


        if (
            linkTarget ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


updateActiveNavigation();



// =========================
// Section Entrance Animation
// =========================

const animatedSections =
    document.querySelectorAll("section");


const sectionObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


animatedSections.forEach((section) => {

    sectionObserver.observe(section);

});



// =========================
// Typing Effect
// =========================

const typingText =
    document.getElementById("typing-text");


const roles = [

    "Data Science Student",

    "AI/ML Enthusiast",

    "Data Analyst",

    "Community Educator"

];


let roleIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeRole() {

    if (!typingText) return;


    const currentRole =
        roles[roleIndex];


    if (!deleting) {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex + 1
            );


        characterIndex++;


        if (
            characterIndex ===
            currentRole.length
        ) {

            deleting = true;


            setTimeout(
                typeRole,
                1800
            );


            return;

        }

    } else {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex - 1
            );


        characterIndex--;


        if (
            characterIndex === 0
        ) {

            deleting = false;


            roleIndex =
                (roleIndex + 1) %
                roles.length;

        }

    }


    const speed =
        deleting ? 50 : 100;


    setTimeout(
        typeRole,
        speed
    );

}


typeRole();



// =========================
// Contact Form
// =========================

const contactForm =
    document.querySelector(".contact-form");


const formStatus =
    document.getElementById("form-status");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const submitButton =
                contactForm.querySelector("button");


            if (!submitButton) return;


            submitButton.disabled = true;

            submitButton.textContent =
                "Sending...";


            const formData =
                new FormData(contactForm);


            try {

                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                if (response.ok) {

                    if (formStatus) {

                        formStatus.textContent =
                            "Message sent successfully! Thank you for reaching out.";

                        formStatus.classList.remove(
                            "error"
                        );

                        formStatus.classList.add(
                            "success"
                        );

                    }


                    contactForm.reset();


                    submitButton.textContent =
                        "Message Sent ✓";


                } else {

                    if (formStatus) {

                        formStatus.textContent =
                            "Something went wrong. Please try again.";

                        formStatus.classList.remove(
                            "success"
                        );

                        formStatus.classList.add(
                            "error"
                        );

                    }


                    submitButton.disabled =
                        false;


                    submitButton.textContent =
                        "Send Message →";

                }


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                if (formStatus) {

                    formStatus.textContent =
                        "Unable to send the message. Please try again.";

                    formStatus.classList.remove(
                        "success"
                    );

                    formStatus.classList.add(
                        "error"
                    );

                }


                submitButton.disabled =
                    false;


                submitButton.textContent =
                    "Send Message →";

            }

        }
    );

}



// =========================
// Google Sheets
// Achievements
// =========================

const achievementsCSV =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTOZJg2ABZdrGu98NpvDccP3Gl4uOcc05yykbxUjoyYlYMibC1SY-9c5IumVyw69ZbWQg3VOmj8PW02/pub?gid=0&single=true&output=csv";



// =========================
// CSV Parser
// =========================

function parseCSV(text) {

    const rows = [];

    let row = [];

    let value = "";

    let insideQuotes = false;


    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        const char = text[i];

        const next = text[i + 1];


        if (
            char === '"' &&
            insideQuotes &&
            next === '"'
        ) {

            value += '"';

            i++;

        }

        else if (
            char === '"'
        ) {

            insideQuotes =
                !insideQuotes;

        }

        else if (
            char === "," &&
            !insideQuotes
        ) {

            row.push(
                value.trim()
            );

            value = "";

        }

        else if (
            (
                char === "\n" ||
                char === "\r"
            ) &&
            !insideQuotes
        ) {

            if (
                char === "\r" &&
                next === "\n"
            ) {

                i++;

            }


            row.push(
                value.trim()
            );


            if (row.length > 0) {

                rows.push(row);

            }


            row = [];

            value = "";

        }

        else {

            value += char;

        }

    }


    if (
        value ||
        row.length
    ) {

        row.push(
            value.trim()
        );


        rows.push(row);

    }


    return rows;

}



// =========================
// Create Achievement Card
// =========================

function createAchievementCard(
    achievement
) {

    const card =
        document.createElement("article");


    card.className =
        "achievement-card";


    // Icon

    const icon =
        document.createElement("div");

    icon.className =
        "achievement-icon";

    icon.textContent =
        achievement.icon || "🏆";


    // Year

    const year =
        document.createElement("span");

    year.className =
        "achievement-year";

    year.textContent =
        achievement.year || "";


    // Title

    const title =
        document.createElement("h2");

    title.textContent =
        achievement.title || "";


    // Description

    const description =
        document.createElement("p");

    description.textContent =
        achievement.description || "";


    // Category

    const category =
        document.createElement("span");

    category.className =
        "achievement-category";

    category.textContent =
        achievement.category || "";


    // Add everything to card

    card.appendChild(icon);

    card.appendChild(year);

    card.appendChild(title);

    card.appendChild(description);

    card.appendChild(category);


    return card;

}



// =========================
// Load Achievements
// =========================

function loadAchievements() {

    const grid =
        document.getElementById(
            "achievements-grid"
        );


    if (!grid) return;


    fetch(achievementsCSV)

        .then((response) => {

            if (!response.ok) {

                throw new Error(
                    "Could not load achievements."
                );

            }


            return response.text();

        })


        .then((csvText) => {

            const rows =
                parseCSV(csvText);


            if (
                rows.length < 2
            ) {

                throw new Error(
                    "No achievement data found."
                );

            }


            // First row contains headings

            const headers =
                rows[0].map(
                    (header) =>
                        header
                            .toLowerCase()
                            .trim()
                );


            const iconIndex =
                headers.indexOf("icon");


            const yearIndex =
                headers.indexOf("year");


            const titleIndex =
                headers.indexOf("title");


            const descriptionIndex =
                headers.indexOf("description");


            const categoryIndex =
                headers.indexOf("category");


            // Make sure required columns exist

            if (
                titleIndex === -1 ||
                descriptionIndex === -1
            ) {

                throw new Error(
                    "Required Google Sheet columns are missing."
                );

            }


            // Clear existing content

            grid.innerHTML = "";


            // Create cards

            rows
                .slice(1)
                .forEach((row) => {

                    const achievement = {

                        icon:
                            iconIndex !== -1
                                ? row[iconIndex]
                                : "🏆",

                        year:
                            yearIndex !== -1
                                ? row[yearIndex]
                                : "",

                        title:
                            titleIndex !== -1
                                ? row[titleIndex]
                                : "",

                        description:
                            descriptionIndex !== -1
                                ? row[descriptionIndex]
                                : "",

                        category:
                            categoryIndex !== -1
                                ? row[categoryIndex]
                                : ""

                    };


                    // Skip completely empty rows

                    if (
                        !achievement.title
                    ) {

                        return;

                    }


                    const card =
                        createAchievementCard(
                            achievement
                        );


                    grid.appendChild(card);

                });

        })


        .catch((error) => {

            console.error(
                "Achievements error:",
                error
            );


            grid.innerHTML = "";


            const errorMessage =
                document.createElement("p");


            errorMessage.textContent =
                "Unable to load achievements right now.";


            grid.appendChild(
                errorMessage
            );

        });

}



// =========================
// Start Google Sheets Loading
// =========================

loadAchievements();

// =========================
// Google Sheets
// Projects
// =========================

const projectsCSV =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTOZJg2ABZdrGu98NpvDccP3Gl4uOcc05yykbxUjoyYlYMibC1SY-9c5IumVyw69ZbWQg3VOmj8PW02/pub?gid=1672395699&single=true&output=csv";


// =========================
// Create Project Card
// =========================

function createProjectCard(project, index) {

    const card =
        document.createElement("article");

    card.className = "project-card";


    // Project image

    const image =
        document.createElement("img");

    image.src =
        project.image || "";

    image.alt =
        project.title || "Project";

    image.className =
        "project-image";


    // Project number

    const number =
        document.createElement("div");

    number.className =
        "project-number";

    number.textContent =
        project.number ||
        String(index + 1).padStart(2, "0");


    // Project title

    const title =
        document.createElement("h3");

    title.textContent =
        project.title || "";


    // Project description

    const description =
        document.createElement("p");

    description.textContent =
        project.description || "";


    // Technologies

    const technologyContainer =
        document.createElement("div");

    technologyContainer.className =
        "project-tech";


    const technologies =
        (project.technologies || "")
            .split(",")
            .map(item => item.trim())
            .filter(item => item);


    technologies.forEach(technology => {

        const technologyTag =
            document.createElement("span");

        technologyTag.textContent =
            technology;

        technologyContainer.appendChild(
            technologyTag
        );

    });


    // Links

    const links =
        document.createElement("div");

    links.className =
        "project-links";


    if (
        project.github &&
        project.github !== "#"
    ) {

        const github =
            document.createElement("a");

        github.href =
            project.github;

        github.target =
            "_blank";

        github.rel =
            "noopener noreferrer";

        github.textContent =
            "GitHub ↗";

        links.appendChild(github);

    }


    if (
        project.demo &&
        project.demo !== "#"
    ) {

        const demo =
            document.createElement("a");

        demo.href =
            project.demo;

        demo.target =
            "_blank";

        demo.rel =
            "noopener noreferrer";

        demo.textContent =
            "Live Demo ↗";

        links.appendChild(demo);

    }


    // Build card

    card.appendChild(image);

    card.appendChild(number);

    card.appendChild(title);

    card.appendChild(description);

    card.appendChild(technologyContainer);

    card.appendChild(links);


    return card;

}



// =========================
// Load Projects
// =========================

function loadProjects() {

    const grid =
        document.getElementById(
            "projects-grid"
        );


    if (!grid) return;


    fetch(projectsCSV)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Could not load projects."
                );

            }


            return response.text();

        })


        .then(csvText => {

            const rows =
                parseCSV(csvText);


            if (
                rows.length < 2
            ) {

                throw new Error(
                    "No project data found."
                );

            }


            const headers =
                rows[0].map(
                    header =>
                        header
                            .toLowerCase()
                            .trim()
                );


            const numberIndex =
                headers.indexOf("number");

            const imageIndex =
                headers.indexOf("image");

            const titleIndex =
                headers.indexOf("title");

            const descriptionIndex =
                headers.indexOf("description");

            const technologiesIndex =
                headers.indexOf("technologies");

            const githubIndex =
                headers.indexOf("github");

            const demoIndex =
                headers.indexOf("demo");


            if (
                titleIndex === -1 ||
                descriptionIndex === -1
            ) {

                throw new Error(
                    "Required project columns are missing."
                );

            }


            grid.innerHTML = "";


            rows
                .slice(1)
                .forEach((row, index) => {

                    const project = {

                        number:
                            numberIndex !== -1
                                ? row[numberIndex]
                                : "",

                        image:
                            imageIndex !== -1
                                ? row[imageIndex]
                                : "",

                        title:
                            titleIndex !== -1
                                ? row[titleIndex]
                                : "",

                        description:
                            descriptionIndex !== -1
                                ? row[descriptionIndex]
                                : "",

                        technologies:
                            technologiesIndex !== -1
                                ? row[technologiesIndex]
                                : "",

                        github:
                            githubIndex !== -1
                                ? row[githubIndex]
                                : "",

                        demo:
                            demoIndex !== -1
                                ? row[demoIndex]
                                : ""

                    };


                    if (!project.title) {
                        return;
                    }


                    const card =
                        createProjectCard(
                            project,
                            index
                        );


                    grid.appendChild(card);

                });

        })


        .catch(error => {

            console.error(
                "Projects error:",
                error
            );


            grid.innerHTML = "";


            const errorMessage =
                document.createElement("p");


            errorMessage.textContent =
                "Unable to load projects right now.";


            grid.appendChild(
                errorMessage
            );

        });

}



// =========================
// Start Projects Loading
// =========================

loadProjects();

// =========================
// Google Sheets
// Experience
// =========================

const experienceCSV =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTOZJg2ABZdrGu98NpvDccP3Gl4uOcc05yykbxUjoyYlYMibC1SY-9c5IumVyw69ZbWQg3VOmj8PW02/pub?gid=2124998944&single=true&output=csv";


// =========================
// Create Experience Item
// =========================

function createExperienceItem(experience) {

    const item =
        document.createElement("div");

    item.className =
        "timeline-item";


    // Timeline dot

    const dot =
        document.createElement("div");

    dot.className =
        "timeline-dot";


    // Content container

    const content =
        document.createElement("div");

    content.className =
        "timeline-content";


    // Duration

    const duration =
        document.createElement("span");

    duration.className =
        "timeline-date";

    duration.textContent =
        experience.duration || "";


    // Title + organization

    const title =
        document.createElement("h3");

    if (
        experience.organization &&
        experience.organization !== "-"
    ) {

        title.textContent =
            `${experience.title} — ${experience.organization}`;

    } else {

        title.textContent =
            experience.title || "";

    }


    // Description

    const description =
        document.createElement("p");

    description.textContent =
        experience.description || "";


    // Build content

    content.appendChild(duration);

    content.appendChild(title);

    content.appendChild(description);


    // Build timeline item

    item.appendChild(dot);

    item.appendChild(content);


    return item;

}



// =========================
// Load Experience
// =========================

function loadExperience() {

    const timeline =
        document.getElementById(
            "experience-timeline"
        );


    if (!timeline) return;


    fetch(experienceCSV)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Could not load experience."
                );

            }


            return response.text();

        })


        .then(csvText => {

            const rows =
                parseCSV(csvText);


            if (
                rows.length < 2
            ) {

                throw new Error(
                    "No experience data found."
                );

            }


            const headers =
                rows[0].map(
                    header =>
                        header
                            .toLowerCase()
                            .trim()
                );


            const durationIndex =
                headers.indexOf(
                    "duration (from–to)"
                );


            const titleIndex =
                headers.indexOf("title");


            const organizationIndex =
                headers.indexOf(
                    "organization"
                );


            const descriptionIndex =
                headers.indexOf(
                    "description"
                );


            if (
                titleIndex === -1 ||
                descriptionIndex === -1
            ) {

                throw new Error(
                    "Required Experience columns are missing."
                );

            }


            timeline.innerHTML = "";


            rows
                .slice(1)
                .forEach(row => {

                    const experience = {

                        duration:
                            durationIndex !== -1
                                ? row[durationIndex]
                                : "",

                        title:
                            titleIndex !== -1
                                ? row[titleIndex]
                                : "",

                        organization:
                            organizationIndex !== -1
                                ? row[organizationIndex]
                                : "",

                        description:
                            descriptionIndex !== -1
                                ? row[descriptionIndex]
                                : ""

                    };


                    if (
                        !experience.title
                    ) {

                        return;

                    }


                    const item =
                        createExperienceItem(
                            experience
                        );


                    timeline.appendChild(
                        item
                    );

                });

        })


        .catch(error => {

            console.error(
                "Experience error:",
                error
            );


            timeline.innerHTML = "";


            const errorMessage =
                document.createElement("p");


            errorMessage.textContent =
                "Unable to load experience right now.";


            timeline.appendChild(
                errorMessage
            );

        });

}



// =========================
// Start Experience Loading
// =========================

loadExperience();

// =========================
// Google Sheets
// Education
// =========================

const educationCSV =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTOZJg2ABZdrGu98NpvDccP3Gl4uOcc05yykbxUjoyYlYMibC1SY-9c5IumVyw69ZbWQg3VOmj8PW02/pub?gid=2241324&single=true&output=csv";


// =========================
// Create Education Item
// =========================

function createEducationItem(education) {

    const item =
        document.createElement("div");

    item.className =
        "education-item";


    // Duration / year

    const year =
        document.createElement("span");

    year.className =
        "education-year";

    year.textContent =
        education.duration || "";


    // Title

    const title =
        document.createElement("h3");

    title.textContent =
        education.title || "";


    // Institution

    if (education.institution) {

        const institution =
            document.createElement("p");

        institution.className =
            "institution";

        institution.textContent =
            education.institution;

        item.appendChild(institution);

    }


    // Description

    const description =
        document.createElement("p");

    description.textContent =
        education.description || "";


    // Build item

    item.appendChild(year);

    item.appendChild(title);

    if (education.institution) {

        // Institution was already added above

    }

    item.appendChild(description);


    return item;

}


// =========================
// Load Education
// =========================

function loadEducation() {

    const academicBackground =
        document.getElementById(
            "academic-background"
        );


    const academicFocus =
        document.getElementById(
            "academic-focus"
        );


    if (
        !academicBackground ||
        !academicFocus
    ) {

        return;

    }


    fetch(educationCSV)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Could not load education."
                );

            }


            return response.text();

        })


        .then(csvText => {

            const rows =
                parseCSV(csvText);


            if (
                rows.length < 2
            ) {

                throw new Error(
                    "No education data found."
                );

            }


            const headers =
                rows[0].map(
                    header =>
                        header
                            .toLowerCase()
                            .trim()
                );


            const categoryIndex =
                headers.indexOf(
                    "category"
                );


            const durationIndex =
                headers.indexOf(
                    "duration"
                );


            const titleIndex =
                headers.indexOf(
                    "title"
                );


            const institutionIndex =
                headers.indexOf(
                    "institution"
                );


            const descriptionIndex =
                headers.indexOf(
                    "description"
                );


            if (
                categoryIndex === -1 ||
                titleIndex === -1 ||
                descriptionIndex === -1
            ) {

                throw new Error(
                    "Required Education columns are missing."
                );

            }


            academicBackground.innerHTML =
                "";

            academicFocus.innerHTML =
                "";


            rows
                .slice(1)
                .forEach(row => {

                    const education = {

                        category:
                            row[categoryIndex]
                                ? row[categoryIndex]
                                      .trim()
                                : "",

                        duration:
                            durationIndex !== -1
                                ? row[durationIndex]
                                : "",

                        title:
                            row[titleIndex]
                                ? row[titleIndex]
                                      .trim()
                                : "",

                        institution:
                            institutionIndex !== -1
                                ? row[institutionIndex]
                                      .trim()
                                : "",

                        description:
                            row[descriptionIndex]
                                ? row[descriptionIndex]
                                      .trim()
                                : ""

                    };


                    if (
                        !education.title
                    ) {

                        return;

                    }


                    const item =
                        createEducationItem(
                            education
                        );


                    if (
                        education.category
                            .toLowerCase()
                            .includes(
                                "background"
                            )
                    ) {

                        academicBackground
                            .appendChild(item);

                    }

                    else if (
                        education.category
                            .toLowerCase()
                            .includes(
                                "focus"
                            )
                    ) {

                        academicFocus
                            .appendChild(item);

                    }

                });

        })


        .catch(error => {

            console.error(
                "Education error:",
                error
            );


            academicBackground.innerHTML =
                "";

            academicFocus.innerHTML =
                "";


            const errorMessage =
                document.createElement("p");


            errorMessage.textContent =
                "Unable to load education right now.";


            academicBackground.appendChild(
                errorMessage
            );

        });

}


// =========================
// Start Education Loading
// =========================

loadEducation();

// =========================================
// Google Sheets — Skills & Technologies
// =========================================

const skillsCSV =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTOZJg2ABZdrGu98NpvDccP3Gl4uOcc05yykbxUjoyYlYMibC1SY-9c5IumVyw69ZbWQg3VOmj8PW02/pub?gid=24389914&single=true&output=csv";


// =========================================
// CSV Parser
// =========================================

function parseSkillsCSV(csv) {

    const rows = [];

    let row = [];

    let value = "";

    let insideQuotes = false;


    for (let i = 0; i < csv.length; i++) {

        const character = csv[i];

        const nextCharacter =
            csv[i + 1];


        if (
            character === '"' &&
            insideQuotes &&
            nextCharacter === '"'
        ) {

            value += '"';

            i++;

        }

        else if (character === '"') {

            insideQuotes =
                !insideQuotes;

        }

        else if (
            character === "," &&
            !insideQuotes
        ) {

            row.push(
                value.trim()
            );

            value = "";

        }

        else if (
            (character === "\n" ||
             character === "\r") &&
            !insideQuotes
        ) {

            if (
                character === "\r" &&
                nextCharacter === "\n"
            ) {

                i++;

            }


            row.push(
                value.trim()
            );

            value = "";


            if (row.some(cell => cell !== "")) {

                rows.push(row);

            }

            row = [];

        }

        else {

            value += character;

        }

    }


    if (value !== "" || row.length > 0) {

        row.push(
            value.trim()
        );

        if (row.some(cell => cell !== "")) {

            rows.push(row);

        }

    }


    return rows;

}



// =========================================
// Update Horizontal Skills
// =========================================

function updateHorizontalSkill(
    skillName,
    percentage
) {

    const skillItems =
        document.querySelectorAll(
            ".skill-item"
        );


    skillItems.forEach(item => {

        const nameElement =
            item.querySelector(
                ".skill-info span:first-child"
            );


        const percentageElement =
            item.querySelector(
                ".skill-info span:last-child"
            );


        const progress =
            item.querySelector(
                ".skill-progress"
            );


        if (!nameElement) return;


        const currentName =
            nameElement.textContent.trim();


        if (
            currentName.toLowerCase() !==
            skillName.toLowerCase()
        ) {

            return;

        }


        if (percentageElement) {

            percentageElement.textContent =
                `${percentage}%`;

        }


        if (progress) {

            progress.style.setProperty(
                "--skill-level",
                `${percentage}%`
            );

        }

    });

}



// =========================================
// Update Circular Skills
// =========================================

function updateCircularSkill(
    skillName,
    percentage
) {

    const circularSkills =
        document.querySelectorAll(
            ".circular-skill"
        );


    circularSkills.forEach(skill => {

        const nameElement =
            skill.querySelector(
                ".circular-skill-name"
            );


        const circle =
            skill.querySelector(
                ".skill-circle"
            );


        const percentageElement =
            skill.querySelector(
                ".skill-circle-inner span"
            );


        if (!nameElement) return;


        const currentName =
            nameElement.textContent.trim();


        if (
            currentName.toLowerCase() !==
            skillName.toLowerCase()
        ) {

            return;

        }


        if (percentageElement) {

            percentageElement.textContent =
                `${percentage}%`;

        }


        if (circle) {

            circle.style.setProperty(
                "--circle-level",
                `${percentage}%`
            );

        }

    });

}



// =========================================
// Load Skills from Google Sheets
// =========================================

async function loadSkills() {

    try {

        const response =
            await fetch(
                skillsCSV
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load Skills data."
            );

        }


        const csvText =
            await response.text();


        const rows =
            parseSkillsCSV(
                csvText
            );


        if (rows.length < 2) {

            throw new Error(
                "No Skills data found."
            );

        }


        // First row = headings

        const headers =
            rows[0].map(
                header =>
                    header
                        .trim()
                        .toLowerCase()
            );


        const categoryIndex =
            headers.indexOf(
                "category"
            );


        const skillIndex =
            headers.indexOf(
                "skill"
            );


        const percentageIndex =
            headers.indexOf(
                "percentage"
            );


        if (
            skillIndex === -1 ||
            percentageIndex === -1
        ) {

            throw new Error(
                "Skills sheet must contain: skill and percentage."
            );

        }


        rows
            .slice(1)
            .forEach(row => {

                const skillName =
                    row[skillIndex]
                        ?.trim();


                const rawPercentage =
                    row[percentageIndex]
                        ?.trim();


                if (!skillName) {

                    return;

                }


                let percentage =
                    Number(
                        rawPercentage
                    );


                // Keep percentage safely between 0 and 100

                if (
                    Number.isNaN(
                        percentage
                    )
                ) {

                    return;

                }


                percentage =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            percentage
                        )
                    );


                // Check horizontal skills

                updateHorizontalSkill(
                    skillName,
                    percentage
                );


                // Check circular skills

                updateCircularSkill(
                    skillName,
                    percentage
                );

            });


        console.log(
            "Skills loaded successfully from Google Sheets."
        );

    }


    catch (error) {

        console.error(
            "Skills loading error:",
            error
        );

        // Existing HTML values remain visible
        // if Google Sheets cannot be reached.

    }

}



// =========================================
// Start Skills Loading
// =========================================

loadSkills();