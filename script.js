 // Navigation
        document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('.section');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    const targetSection = this.getAttribute('data-section');
                    
                    // Update active nav link
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Show target section, hide others
                    sections.forEach(section => {
                        if (section.id === targetSection) {
                            section.classList.add('active');
                        } else {
                            section.classList.remove('active');
                        }
                    });
                });
            });
            
            // Handle CTA buttons
            const ctaButtons = document.querySelectorAll('[data-section]');
            ctaButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const targetSection = this.getAttribute('data-section');
                    if (!targetSection) return;
                    
                    // Update active nav link
                    navLinks.forEach(link => {
                        if (link.getAttribute('data-section') === targetSection) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                    
                    // Show target section, hide others
                    sections.forEach(section => {
                        if (section.id === targetSection) {
                            section.classList.add('active');
                        } else {
                            section.classList.remove('active');
                        }
                    });
                });
            });
            
            // Initialize date picker
            flatpickr("#appointmentDate", {
                dateFormat: "Y-m-d",
                minDate: "today",
                locale: "ar",
                disable: [
                    function(date) {
                        // Disable Fridays and Saturdays (weekend in Algeria)
                        return (date.getDay() === 5 || date.getDay() === 6);
                    }
                ]
            });
            
            // Time slot selection
            const timeSlots = document.querySelectorAll('.appointment-time-slot');
            const appointmentTimeInput = document.getElementById('appointmentTime');
            
            timeSlots.forEach(slot => {
                slot.addEventListener('click', function() {
                    timeSlots.forEach(s => s.classList.remove('selected'));
                    this.classList.add('selected');
                    appointmentTimeInput.value = this.getAttribute('data-time');
                });
            });
            
            // Form submission
            const appointmentForm = document.getElementById('appointmentForm');
            const contactForm = document.getElementById('contactForm');
            const successModal = document.getElementById('successModal');
            const closeModal = document.getElementById('closeModal');
            
            appointmentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // In a real application, you would send the form data to the server here
                successModal.classList.remove('hidden');
                appointmentForm.reset();
                timeSlots.forEach(s => s.classList.remove('selected'));
            });
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // In a real application, you would send the form data to the server here
                successModal.classList.remove('hidden');
                contactForm.reset();
            });
            
            closeModal.addEventListener('click', function() {
                successModal.classList.add('hidden');
            });
            
            // Language selector
            const languageSelectors = document.querySelectorAll('.language-selector');
            let currentLang = 'ar';
            
            // Function to update all text content based on language
            function updateLanguage(lang) {
                currentLang = lang;
                
                // Update direction and font
                if (lang === 'ar') {
                    document.documentElement.setAttribute('dir', 'rtl');
                    document.documentElement.setAttribute('lang', 'ar');
                    document.body.classList.remove('ltr');
                } else {
                    document.documentElement.setAttribute('dir', 'ltr');
                    document.documentElement.setAttribute('lang', lang);
                    document.body.classList.add('ltr');
                }
                
                // Update all elements with data-ar, data-fr, data-en attributes
                document.querySelectorAll('[data-' + lang + ']').forEach(el => {
                    el.textContent = el.getAttribute('data-' + lang);
                });
                
                // Update flatpickr locale
                if (flatpickr.l10ns[lang]) {
                    flatpickr.localize(flatpickr.l10ns[lang]);
                    if (document.getElementById('appointmentDate')._flatpickr) {
                        document.getElementById('appointmentDate')._flatpickr.destroy();
                        flatpickr("#appointmentDate", {
                            dateFormat: "Y-m-d",
                            minDate: "today",
                            locale: lang,
                            disable: [
                                function(date) {
                                    // Disable Fridays and Saturdays (weekend in Algeria)
                                    return (date.getDay() === 5 || date.getDay() === 6);
                                }
                            ]
                        });
                    }
                }
            }
            
            languageSelectors.forEach(selector => {
                selector.addEventListener('click', function() {
                    const lang = this.getAttribute('data-lang');
                    
                    // Update active language selector
                    languageSelectors.forEach(s => s.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Update language
                    updateLanguage(lang);
                });
            });
        });