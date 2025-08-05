// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Enhanced Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation from current page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                
                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle navigation from external pages (department pages to main sections)
    const urlParams = new URLSearchParams(window.location.search);
    const scrollTo = urlParams.get('scrollTo');
    
    if (scrollTo) {
        setTimeout(() => {
            const target = document.querySelector(`#${scrollTo}`);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    }
});

// Navigation function for cross-page navigation
function navigateToSection(page, section) {
    if (page === 'index') {
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            // Already on index page, just scroll
            const target = document.querySelector(`#${section}`);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            // Navigate to index page with section parameter
            window.location.href = `index.html?scrollTo=${section}`;
        }
    } else {
        window.location.href = `${page}.html`;
    }
}

// Page Navigation Function (for department pages)
function navigateToPage(page) {
    window.location.href = `${page}.html`;
}

// Enhanced Doctor Data with more details
const doctorData = {
    cardiology: [
        { 
            name: 'Dr. Sarah Johnson', 
            specialty: 'Cardiologist',
            experience: '15+ years',
            education: 'MD from Harvard Medical School',
            specialization: 'Interventional Cardiology, Heart Surgery'
        },
        { 
            name: 'Dr. Robert Kim', 
            specialty: 'Cardiac Surgeon',
            experience: '12+ years',
            education: 'MD from Johns Hopkins',
            specialization: 'Bypass Surgery, Valve Replacement'
        },
        { 
            name: 'Dr. Maria Santos', 
            specialty: 'Interventional Cardiologist',
            experience: '10+ years',
            education: 'MD from Mayo Clinic',
            specialization: 'Angioplasty, Stent Placement'
        }
    ],
    neurology: [
        { 
            name: 'Dr. Michael Chen', 
            specialty: 'Neurologist',
            experience: '18+ years',
            education: 'MD from Stanford Medical School',
            specialization: 'Brain Disorders, Epilepsy Treatment'
        },
        { 
            name: 'Dr. Lisa Wang', 
            specialty: 'Neurosurgeon',
            experience: '14+ years',
            education: 'MD from UCLA Medical School',
            specialization: 'Brain Surgery, Spinal Surgery'
        },
        { 
            name: 'Dr. James Miller', 
            specialty: 'Pediatric Neurologist',
            experience: '11+ years',
            education: 'MD from Cleveland Clinic',
            specialization: 'Childhood Neurological Disorders'
        }
    ],
    orthopedics: [
        { 
            name: 'Dr. David Brown', 
            specialty: 'Orthopedic Surgeon',
            experience: '16+ years',
            education: 'MD from University of Pennsylvania',
            specialization: 'Joint Replacement, Trauma Surgery'
        },
        { 
            name: 'Dr. Jennifer Lee', 
            specialty: 'Sports Medicine Specialist',
            experience: '9+ years',
            education: 'MD from Duke University',
            specialization: 'Sports Injuries, Arthroscopy'
        },
        { 
            name: 'Dr. Mark Davis', 
            specialty: 'Spine Specialist',
            experience: '13+ years',
            education: 'MD from University of Chicago',
            specialization: 'Spinal Surgery, Back Pain Management'
        }
    ],
    ophthalmology: [
        { 
            name: 'Dr. Susan Taylor', 
            specialty: 'Ophthalmologist',
            experience: '17+ years',
            education: 'MD from Columbia University',
            specialization: 'Cataract Surgery, Glaucoma Treatment'
        },
        { 
            name: 'Dr. Ahmad Hassan', 
            specialty: 'Retinal Specialist',
            experience: '12+ years',
            education: 'MD from Washington University',
            specialization: 'Retinal Disorders, Macular Degeneration'
        },
        { 
            name: 'Dr. Rachel Green', 
            specialty: 'Corneal Specialist',
            experience: '8+ years',
            education: 'MD from Emory University',
            specialization: 'Corneal Transplant, Dry Eye Treatment'
        }
    ],
    pediatrics: [
        { 
            name: 'Dr. Emily Rodriguez', 
            specialty: 'Pediatrician',
            experience: '14+ years',
            education: 'MD from Boston University',
            specialization: 'General Pediatrics, Child Development'
        },
        { 
            name: 'Dr. Kevin Park', 
            specialty: 'Pediatric Surgeon',
            experience: '11+ years',
            education: 'MD from Northwestern University',
            specialization: 'Pediatric Surgery, Minimally Invasive Surgery'
        },
        { 
            name: 'Dr. Amy Wilson', 
            specialty: 'Neonatologist',
            experience: '13+ years',
            education: 'MD from Vanderbilt University',
            specialization: 'Newborn Care, NICU Management'
        }
    ],
    general: [
        { 
            name: 'Dr. Thomas Anderson', 
            specialty: 'General Practitioner',
            experience: '20+ years',
            education: 'MD from University of Michigan',
            specialization: 'Primary Care, Preventive Medicine'
        },
        { 
            name: 'Dr. Laura Thompson', 
            specialty: 'Family Medicine Physician',
            experience: '15+ years',
            education: 'MD from University of Wisconsin',
            specialization: 'Family Health, Chronic Disease Management'
        },
        { 
            name: 'Dr. Richard Clark', 
            specialty: 'Internal Medicine Specialist',
            experience: '18+ years',
            education: 'MD from Yale Medical School',
            specialization: 'Adult Medicine, Diabetes Management'
        }
    ]
};

// Booking Modal Functions
function openBookingModal(department = '', doctor = '') {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('appointmentDate');
        if (dateInput) {
            dateInput.min = today;
        }
        
        // Pre-fill department if provided
        if (department) {
            const departmentSelect = document.getElementById('department');
            if (departmentSelect) {
                departmentSelect.value = department;
                updateDoctors();
            }
        }
        
        // Pre-fill doctor if provided
        if (doctor) {
            setTimeout(() => {
                const doctorSelect = document.getElementById('doctor');
                if (doctorSelect) {
                    doctorSelect.value = doctor;
                }
            }, 100);
        }
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetBookingForm();
    }
}

function resetBookingForm() {
    const form = document.getElementById('bookingForm');
    const doctorSelect = document.getElementById('doctor');
    
    if (form) {
        form.reset();
    }
    
    if (doctorSelect) {
        doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
    }
}

// Fixed: Update doctors based on selected department
function updateDoctors() {
    const departmentSelect = document.getElementById('department');
    const doctorSelect = document.getElementById('doctor');
    
    if (!departmentSelect || !doctorSelect) {
        return;
    }
    
    const selectedDepartment = departmentSelect.value;
    
    // Clear existing options
    doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
    
    if (selectedDepartment && doctorData[selectedDepartment]) {
        doctorData[selectedDepartment].forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.name;
            option.textContent = `${doctor.name} - ${doctor.specialty}`;
            doctorSelect.appendChild(option);
        });
    }
}

// Success Modal Functions
function openSuccessModal(appointmentData) {
    const modal = document.getElementById('successModal');
    const detailsDiv = document.getElementById('appointmentDetails');
    
    if (!modal || !detailsDiv) return;
    
    // Format appointment details
    const date = new Date(appointmentData.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const time = appointmentData.time.replace(/(\d{2}):(\d{2})/, (match, hour, minute) => {
        const hourInt = parseInt(hour);
        const ampm = hourInt >= 12 ? 'PM' : 'AM';
        const displayHour = hourInt > 12 ? hourInt - 12 : (hourInt === 0 ? 12 : hourInt);
        return `${displayHour}:${minute} ${ampm}`;
    });
    
    detailsDiv.innerHTML = `
        <h3>Appointment Details:</h3>
        <p><strong>Patient:</strong> ${appointmentData.name}</p>
        <p><strong>Department:</strong> ${appointmentData.department.charAt(0).toUpperCase() + appointmentData.department.slice(1)}</p>
        <p><strong>Doctor:</strong> ${appointmentData.doctor}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Contact:</strong> ${appointmentData.phone}</p>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('patientName')?.value.trim() || '',
                email: document.getElementById('patientEmail')?.value.trim() || '',
                phone: document.getElementById('patientPhone')?.value.trim() || '',
                age: document.getElementById('patientAge')?.value || '',
                department: document.getElementById('department')?.value || '',
                doctor: document.getElementById('doctor')?.value || '',
                date: document.getElementById('appointmentDate')?.value || '',
                time: document.getElementById('appointmentTime')?.value || '',
                symptoms: document.getElementById('symptoms')?.value.trim() || ''
            };
            
            // Validate required fields
            const requiredFields = ['name', 'email', 'phone', 'age', 'department', 'doctor', 'date', 'time'];
            const missingFields = requiredFields.filter(field => !formData[field]);
            
            if (missingFields.length > 0) {
                alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Validate phone format (basic validation)
            const phoneRegex = /^[\d\-\+\(\)\s]+$/;
            if (!phoneRegex.test(formData.phone) || formData.phone.length < 10) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            // Validate date (not in the past)
            const selectedDate = new Date(formData.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                alert('Please select a future date for the appointment.');
                return;
            }
            
            // Simulate booking process
            simulateBookingProcess(formData);
        });
    }
    
    // Initialize department change handler
    const departmentSelect = document.getElementById('department');
    if (departmentSelect) {
        departmentSelect.addEventListener('change', updateDoctors);
    }
});

function simulateBookingProcess(appointmentData) {
    // Show loading state
    const submitBtn = document.querySelector('#bookingForm button[type="submit"]');
    if (!submitBtn) return;
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Close booking modal and show success modal
        closeBookingModal();
        openSuccessModal(appointmentData);
        
        // Store appointment in localStorage (for demo purposes)
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments.push({
            ...appointmentData,
            id: Date.now(),
            status: 'confirmed',
            bookingTime: new Date().toISOString()
        });
        localStorage.setItem('appointments', JSON.stringify(appointments));
        
        // Log to console for demo purposes
        console.log('Appointment booked:', appointmentData);
    }, 2000);
}

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            if (!submitBtn) return;
            
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate sending
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const bookingModal = document.getElementById('bookingModal');
    const successModal = document.getElementById('successModal');
    
    if (e.target === bookingModal) {
        closeBookingModal();
    }
    
    if (e.target === successModal) {
        closeSuccessModal();
    }
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    }
});

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    console.log('MediCare Hospital Website Loaded Successfully!');
    
    // Set minimum date for appointment booking
    const today = new Date().toISOString().split('T')[0];
    const appointmentDate = document.getElementById('appointmentDate');
    if (appointmentDate) {
        appointmentDate.min = today;
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards and doctor cards for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .doctor-card, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});
