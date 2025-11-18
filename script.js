const body = document.querySelector('body');
const hiddenElements = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});
const knowMoreBtn = document.querySelectorAll('.know-more-btn');
const overlay = document.getElementById('overlay');
const experienceObjs = [
    {
        id: 'experience-No2',
        title: 'Nick Ratliff Realty Team',
        image: 'media/nick_ratliff_realty_team_logo.jpg',
        imageAlt: "Nick Ratliff Realty Team's logo",
        role: 'Real Estate Intern',
        position: 'Intership',
        duration: `${getPresentTime('2025-08-1')}`,
        timeline: 'Sep 2025 - Present',
        location: 'USA, Lexington, KY',
        para1: 'Supporting property listings, client interactions, and transaction coordination.',
        para2: 'Learning real estate marketing, data entry, and lead management.',
        para3: 'Observing and contributing to day-to-day operations within a successful real estate team.',
    },
    {
        id: 'experience-No1',
        title: 'Prime Time Pub & Grill',
        image: 'media/prime-time-logo.jpg',
        imageAlt: "Prime Time Pub & Grill's logo",
        role: 'Host',
        position: 'Part-Time',
        duration: '4 Months',
        timeline: 'May 2024 - Aug 2024',
        location: 'USA, Newburgh, IN',
        para1: 'Delivered outstanding customer service and maintained a welcoming atmosphere.',
        para2: 'Collaborated with staff to ensure smooth operations during peak hours.',
        para3: 'Developed interpersonal and problem-solving skills in a fast-paced environment.',
    }
]

function getPresentTime(startTime) { // Accepted format 2025-09-01
    const startDate = new Date(startTime);
    const currentDate = new Date();
    let totalMonths = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());
    let output = '';
    
    if (currentDate.getDate() < startDate.getDate()) {
        totalMonths -= 1;
    }
    
    if (totalMonths < 12) {
        output = `${totalMonths} month${totalMonths !== 1 ? 's' : ''}`;
    } else  {
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;
        output = `${years} year${years !== 1 ? 's' : ''}`;
        if (months > 0) {
            output += `${months} month${months !== 1 ? 's' : ''}`;
        }
    }
    return output
}

function openModel (parentEl) {
    experienceObjs.forEach(obj => {
        if (obj.id === parentEl.id) {
            overlay.innerHTML = `
            <div id="expended-card">
                <h3 id="title" class="h3">${obj.title}</h3>
                <img id="expended-card-img" src="${obj.image}" alt="${obj.imageAlt}">
                <section id="job-description">
                    <h4 class="h4">Job Description</h4>
                    <p><strong>Role: </strong><span id="job-role">${obj.role}</span></p>
                    <p><strong>Position: </strong><span id="job-position">${obj.position}</span></p>
                    <p><strong>Duration: </strong><span id="job-duration">${obj.duration}</span></p>
                    <p><strong>Timeline: </strong><span id="job-timeline">${obj.timeline}</span></p>
                    <p><strong>Location: </strong><span id="job-location">${obj.location}</span></p>
                </section>
                <section id="results">
                    <h4 class="h4">Results</h4>
                    <p>${obj.para1}</p>
                    <p>${obj.para2}</p>
                    <p>${obj.para3}</p>
                </section>
                <button id='close-btn' type="button">Back</button>
            </div>
            `
        }
    })

    overlay.classList.add('active');
    body.classList.add('modal-open');
    document.getElementById('close-btn').addEventListener('click', closeModel);
}

function closeModel() {
    overlay.classList.remove('active');
    body.classList.remove('modal-open');
    overlay.innerHTML = '';
}

knowMoreBtn.forEach(b => b.addEventListener('click', e => {
    openModel(e.target.parentElement)
  }
))

hiddenElements.forEach((el) => observer.observe(el))