// Hero Slideshow Rotation
(function() {
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    if (!slides || slides.length === 0) return;
    let idx = 0;
    setInterval(() => {
        slides[idx].classList.remove('active');
        idx = (idx + 1) % slides.length;
        slides[idx].classList.add('active');
    }, 4000);
})();

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const thank = document.getElementById('contactThankYou');
        if (thank) thank.style.display = 'block';
        contactForm.reset();
    });
}
// Feedback Form
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const thank = document.getElementById('feedbackThankYou');
        if (thank) thank.style.display = 'block';
        feedbackForm.reset();
    });
}
// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const thank = document.getElementById('newsletterThankYou');
        if (thank) thank.style.display = 'block';
        newsletterForm.reset();
    });
}
// Donation Form
const donationForm = document.getElementById('donationForm');
if (donationForm) {
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('donationThankYou').style.display = 'block';
        donationForm.reset();
    });
}
// Volunteer Form
const volunteerForm = document.getElementById('volunteerForm');
if (volunteerForm) {
    volunteerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('volunteerThankYou').style.display = 'block';
        volunteerForm.reset();
    });
}
// Admin Functionality
const adminLoginForm = document.getElementById('adminLoginForm');
const adminPanel = document.getElementById('adminPanel');
const adminLoginSection = document.getElementById('adminLoginSection');
const adminLoginError = document.getElementById('adminLoginError');
const logoutBtn = document.getElementById('logoutBtn');
const ADMIN_PASSWORD = 'Arpit@shivam';
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const pwd = document.getElementById('adminPassword').value;
        if (pwd === ADMIN_PASSWORD) {
            adminLoginSection.style.display = 'none';
            adminPanel.style.display = 'block';
            adminLoginError.style.display = 'none';
            loadAdminData();
            renderAdminTestimonials();
        } else {
            adminLoginError.style.display = 'block';
        }
    });
}
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        adminPanel.style.display = 'none';
        adminLoginSection.style.display = 'block';
    });
}
// Admin: Events
const addEventForm = document.getElementById('addEventForm');
const adminEventList = document.getElementById('adminEventList');
function loadAdminData() {
    // Events
    if (adminEventList) {
        adminEventList.innerHTML = '';
        const events = JSON.parse(localStorage.getItem('events') || '[]');
        events.forEach((ev, idx) => {
            const li = document.createElement('li');
            li.textContent = `${ev.title} - ${ev.date}`;
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.onclick = () => {
                events.splice(idx, 1);
                localStorage.setItem('events', JSON.stringify(events));
                loadAdminData();
                renderEvents();
            };
            li.appendChild(delBtn);
            adminEventList.appendChild(li);
        });
    }
    // Gallery
    if (adminGalleryList) {
        adminGalleryList.innerHTML = '';
        const gallery = JSON.parse(localStorage.getItem('gallery') || '[]');
        gallery.forEach((img, idx) => {
            const li = document.createElement('li');
            li.textContent = img;
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.onclick = () => {
                gallery.splice(idx, 1);
                localStorage.setItem('gallery', JSON.stringify(gallery));
                loadAdminData();
            };
            li.appendChild(delBtn);
            adminGalleryList.appendChild(li);
        });
    }
}
if (addEventForm) {
    addEventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('eventTitle').value;
        const date = document.getElementById('eventDate').value;
        const events = JSON.parse(localStorage.getItem('events') || '[]');
        events.push({ title, date });
        localStorage.setItem('events', JSON.stringify(events));
        loadAdminData();
        renderEvents();
        addEventForm.reset();
    });
}
// Admin: Gallery
const addGalleryForm = document.getElementById('addGalleryForm');
const adminGalleryList = document.getElementById('adminGalleryList');
if (addGalleryForm) {
    addGalleryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const imgUrl = document.getElementById('galleryImgUrl').value;
        const gallery = JSON.parse(localStorage.getItem('gallery') || '[]');
        gallery.push(imgUrl);
        localStorage.setItem('gallery', JSON.stringify(gallery));
        loadAdminData();
        addGalleryForm.reset();
    });
}
// Testimonials Page: Only render testimonials for viewers
const testimonialList = document.getElementById('testimonialList');
const adminAddTestimonialForm = document.getElementById('adminAddTestimonialForm');
const adminTestimonialList = document.getElementById('adminTestimonialList');
function renderTestimonials() {
    if (!testimonialList) return;
    testimonialList.innerHTML = '';
    const testimonials = JSON.parse(localStorage.getItem('testimonials_full') || '[]');
    testimonials.forEach(t => {
        const div = document.createElement('div');
        div.className = 'testimonial';
        if (t.photoDataUrl) {
            div.innerHTML += `<img src="${t.photoDataUrl}" alt="Testimonial Photo" class="testimonial-photo">`;
        } else if (t.photoUrl) {
            div.innerHTML += `<img src="${t.photoUrl}" alt="Testimonial Photo" class="testimonial-photo">`;
        }
        div.innerHTML += `<blockquote>"${t.quote}"</blockquote><p>- ${t.name}</p>`;
        if (t.pdfDataUrl && t.pdfName) {
            div.innerHTML += `<p><a href="${t.pdfDataUrl}" target="_blank">View PDF</a></p>`;
        }
        testimonialList.appendChild(div);
    });
}
if (testimonialList) renderTestimonials();
// Admin Panel: Manage testimonials with PDF upload
function renderAdminTestimonials() {
    if (!adminTestimonialList) return;
    adminTestimonialList.innerHTML = '';
    const testimonials = JSON.parse(localStorage.getItem('testimonials_full') || '[]');
    testimonials.forEach((t, idx) => {
        const li = document.createElement('li');
        if (t.photoDataUrl) {
            li.innerHTML += `<img src="${t.photoDataUrl}" alt="Testimonial Photo" class="testimonial-photo" style="max-height:40px;vertical-align:middle;"> `;
        } else if (t.photoUrl) {
            li.innerHTML += `<img src="${t.photoUrl}" alt="Testimonial Photo" class="testimonial-photo" style="max-height:40px;vertical-align:middle;"> `;
        }
        li.innerHTML += `${t.name}: "${t.quote}"`;
        if (t.pdfDataUrl && t.pdfName) {
            li.innerHTML += ` <a href="${t.pdfDataUrl}" target="_blank">[PDF]</a>`;
        }
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => {
            testimonials.splice(idx, 1);
            localStorage.setItem('testimonials_full', JSON.stringify(testimonials));
            renderAdminTestimonials();
            renderTestimonials();
        };
        li.appendChild(delBtn);
        adminTestimonialList.appendChild(li);
    });
}
if (adminAddTestimonialForm) {
    adminAddTestimonialForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('adminTestimonialName').value;
        const quote = document.getElementById('adminTestimonialQuote').value;
        const pdfInput = document.getElementById('adminTestimonialPdf');
        const photoInput = document.getElementById('adminTestimonialPhoto');
        const photoUrlInput = document.getElementById('adminTestimonialPhotoUrl');
        const testimonials = JSON.parse(localStorage.getItem('testimonials_full') || '[]');
        const photoUrl = photoUrlInput.value.trim();
        function saveTestimonial(pdfDataUrl, pdfName, photoDataUrl) {
            const testimonial = { name, quote };
            if (pdfDataUrl && pdfName) {
                testimonial.pdfDataUrl = pdfDataUrl;
                testimonial.pdfName = pdfName;
            }
            if (photoDataUrl) {
                testimonial.photoDataUrl = photoDataUrl;
            } else if (photoUrl) {
                testimonial.photoUrl = photoUrl;
            }
            testimonials.push(testimonial);
            localStorage.setItem('testimonials_full', JSON.stringify(testimonials));
            adminAddTestimonialForm.reset();
            renderAdminTestimonials();
            renderTestimonials();
        }
        // Handle PDF upload
        if (pdfInput.files && pdfInput.files[0]) {
            const pdfFile = pdfInput.files[0];
            const pdfReader = new FileReader();
            pdfReader.onload = function(evt) {
                // Handle photo upload
                if (photoInput.files && photoInput.files[0]) {
                    const photoFile = photoInput.files[0];
                    const photoReader = new FileReader();
                    photoReader.onload = function(ev2) {
                        saveTestimonial(evt.target.result, pdfFile.name, ev2.target.result);
                    };
                    photoReader.readAsDataURL(photoFile);
                } else {
                    saveTestimonial(evt.target.result, pdfFile.name, null);
                }
            };
            pdfReader.readAsDataURL(pdfFile);
        } else if (photoInput.files && photoInput.files[0]) {
            const photoFile = photoInput.files[0];
            const photoReader = new FileReader();
            photoReader.onload = function(ev2) {
                saveTestimonial(null, null, ev2.target.result);
            };
            photoReader.readAsDataURL(photoFile);
        } else {
            saveTestimonial(null, null, null);
        }
    });
    renderAdminTestimonials();
}
// Events Page: Render events for public
function renderEvents() {
    const eventList = document.getElementById('eventList');
    if (!eventList) return;
    eventList.innerHTML = '';
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    if (events.length === 0) {
        eventList.innerHTML = '<li>No upcoming events. Please check back later!</li>';
        return;
    }
    events.forEach(ev => {
        const li = document.createElement('li');
        li.textContent = `${ev.title} - ${ev.date}`;
        eventList.appendChild(li);
    });
}
if (document.getElementById('eventList')) renderEvents();

// Impact stats counters
(function() {
	const counters = document.querySelectorAll('.stat-number');
	if (!counters || counters.length === 0) return;
	let started = false;
	function animate() {
		if (started) return;
		const trigger = document.querySelector('.impact-stats');
		if (!trigger) return;
		const rect = trigger.getBoundingClientRect();
		if (rect.top < window.innerHeight - 100) {
			started = true;
			counters.forEach(el => {
				const target = parseInt(el.getAttribute('data-target') || '0', 10);
				let current = 0;
				const increment = Math.ceil(target / 120);
				const interval = setInterval(() => {
					current += increment;
					if (current >= target) { current = target; clearInterval(interval); }
					el.textContent = current.toLocaleString();
				}, 20);
			});
		}
	}
	window.addEventListener('scroll', animate);
	window.addEventListener('load', animate);
})(); 

// Stories Management
let stories = JSON.parse(localStorage.getItem('stories')) || [
    {
        id: 1,
        image: 'https://via.placeholder.com/300x200?text=Story+Image+1',
        title: 'Simran\'s Journey',
        description: 'A story of resilience and growth through education.'
    },
    {
        id: 2,
        image: 'https://via.placeholder.com/300x200?text=Story+Image+2',
        title: 'Priya\'s Success',
        description: 'How support transformed her life and future.'
    },
    {
        id: 3,
        image: 'https://via.placeholder.com/300x200?text=Story+Image+3',
        title: 'Muskan\'s Independence',
        description: 'Empowered to achieve financial freedom.'
    }
];

// Save stories to localStorage
function saveStories() {
    localStorage.setItem('stories', JSON.stringify(stories));
}

// Add new story
function addStory(imageFile, title, description) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const newStory = {
            id: Date.now(),
            image: e.target.result,
            title: title,
            description: description
        };
        stories.push(newStory);
        saveStories();
        renderStories();
        renderAdminStories();
    };
    reader.readAsDataURL(imageFile);
}

// Remove story
function removeStory(id) {
    stories = stories.filter(story => story.id !== id);
    saveStories();
    renderStories();
    renderAdminStories();
}

// Build home stories from gallery images (no captions)
function renderStories() {
    const storiesGrid = document.getElementById('storiesGrid');
    if (!storiesGrid) return;

    // Prefer admin-managed gallery from localStorage
    let gallery = JSON.parse(localStorage.getItem('gallery') || '[]');

    // If empty, fallback to WhatsApp images present in the project
    if (!gallery || gallery.length === 0) {
        gallery = [
            'WhatsApp Image 2025-07-18 at 11.22.35_cd1cd2c9.jpg',
            'WhatsApp Image 2025-07-18 at 11.22.38_2d301f41.jpg',
            'WhatsApp Image 2025-07-18 at 11.22.38_9f8f88a2.jpg',
            'WhatsApp Image 2025-07-18 at 11.22.36_3a628bf9.jpg',
            'WhatsApp Image 2025-07-18 at 11.22.35_47dcda89.jpg',
            'WhatsApp Image 2025-07-18 at 11.22.35_ca688dc8.jpg',
            'WhatsApp Image 2025-07-18 at 11.22.43_bbf452a9.jpg',
            'WhatsApp Image 2025-07-18 at 11.56.20_fa76dc08.jpg',
            'WhatsApp Image 2025-07-18 at 11.56.20_b2a0f960.jpg'
        ];
    }

    // Limit to first 6 images for the home grid
    const toShow = gallery.slice(0, 6);

    storiesGrid.innerHTML = '';
    toShow.forEach(src => {
        const storyCard = document.createElement('div');
        storyCard.className = 'story-card';
        storyCard.innerHTML = `
            <img src="${src}" alt="Gallery Image" class="story-image">
        `;
        storiesGrid.appendChild(storyCard);
    });
}

// Render admin stories list
function renderAdminStories() {
    const adminStoriesList = document.getElementById('adminStoriesList');
    if (!adminStoriesList) return;
    
    adminStoriesList.innerHTML = '';
    stories.forEach(story => {
        const storyItem = document.createElement('div');
        storyItem.className = 'admin-item';
        storyItem.innerHTML = `
            <div class="admin-item-content">
                <img src="${story.image}" alt="${story.title}" style="width: 100px; height: 60px; object-fit: cover; border-radius: 8px;">
                <div>
                    <strong>${story.title}</strong><br>
                    <small>${story.description}</small>
                </div>
            </div>
            <button onclick="removeStory(${story.id})" class="admin-btn remove-btn">Remove</button>
        `;
        adminStoriesList.appendChild(storyItem);
    });
}

// Handle story form submission
function handleStoryForm() {
    const addStoryForm = document.getElementById('addStoryForm');
    if (!addStoryForm) return;
    
    addStoryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const imageFile = document.getElementById('storyImage').files[0];
        const title = document.getElementById('storyTitle').value;
        const description = document.getElementById('storyDescription').value;
        
        if (imageFile && title && description) {
            addStory(imageFile, title, description);
            addStoryForm.reset();
        }
    });
}

// Initialize stories functionality
function initStories() {
    renderStories();
    handleStoryForm();
}

// Call initStories when admin panel is loaded
if (document.getElementById('addStoryForm')) {
    initStories();
    renderAdminStories();
}

// Call renderStories when home page loads
if (document.getElementById('storiesGrid')) {
    renderStories();
} 