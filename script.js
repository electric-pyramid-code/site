document.addEventListener('DOMContentLoaded', () => {
    
    // --- Hero Background Fading Logic ---
    const images = [
        './main/assets/banner_hero/image_dj.webp',
        './main/assets/banner_hero/image_festival.webp',
        './main/assets/banner_hero/image_drumkit.webp',
        './main/assets/banner_hero/image_ravelaser.webp'
    ];

    let currentIndex = 0;
    const bg1 = document.getElementById('bg1');
    const bg2 = document.getElementById('bg2');

    // Set initial image
    if (bg1 && images.length > 0) {
        bg1.style.backgroundImage = `url('${images[0]}')`;
        bg1.classList.add('active');
    }

    function changeImage() {
        if (!bg1 || !bg2 || images.length === 0) return;

        currentIndex = (currentIndex + 1) % images.length;
        
        const activeBg = bg1.classList.contains('active') ? bg1 : bg2;
        const inactiveBg = bg1.classList.contains('active') ? bg2 : bg1;

        inactiveBg.style.backgroundImage = `url('${images[currentIndex]}')`;

        activeBg.classList.remove('active');
        inactiveBg.classList.add('active');
    }

    setInterval(changeImage, 5000);

    // --- Mobile Menu Toggle Logic ---
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.nav-links');

    if (menu) {
        menu.addEventListener('click', function() {
            menu.classList.toggle('is-active'); 
            menuLinks.classList.toggle('active'); 
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('is-active')) {
                menu.classList.remove('is-active');
                menuLinks.classList.remove('active');
            }
        });
    });

    // --- Enquiry Form logic ---
    const enquiryForm = document.getElementById('enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Enquiry Sent! We will get back to you shortly.');
            this.reset();
        });
    }
});