document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const beginButton = document.getElementById('beginButton');
    const sections = document.querySelectorAll('.section');
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const popup = document.getElementById('memoryPopup');
    const closePopup = document.querySelector('.close-popup');
    const memoryOptions = document.querySelectorAll('.memory-option');
    const selectedMemory = document.getElementById('selectedMemory');
    const heroContent = document.querySelector('.hero-content');
    const handwrittenMessage = document.querySelector('.handwritten');

    // Variables
    let currentIndex = 0;
    let galleryIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const itemsPerPage = 3;
    let carouselInterval;
    let heartSize = 20;
    const maxHeartSize = 40;
    let sparkleTimeout;

    // Modal creation
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Friendship Agreement</h2>
            <div class="agreement-text">
                <p>By clicking "I Agree", you promise to:</p>
                <ul style="text-align: left; margin: 10px 0;">
                    <li>Always be there for each other</li>
                    <li>Share happiness and support in tough times</li>
                    <li>Keep secrets safe</li>
                    <li>Celebrate achievements together</li>
                </ul>
            </div>
            <div class="handshake">
                🤝
                <h3 style="text-align:center;font-size:32px;">Congratulations!</h3>
                <p style="text-align:justify;font-size:24px;">Let's be partners-in-crime forever—ready for mischief, laughter, and unforgettable moments together!</p>
            </div>
            <button class="agree-btn">I Agree</button>
        </div>
    `;
    document.body.appendChild(modal);

    // Functions
    // Update the showItem function in your JavaScript
function showItem(index) {
    items.forEach((item, i) => {
        item.classList.remove('active');
        const offset = i - index;
        item.style.transform = `translateX(${offset * 100}%)`;
    });
    items[index].classList.add('active');
}

    function autoAdvanceCarousel() {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    }

    function createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = Math.random() * 100 + 'vw';
        firework.style.animationDuration = Math.random() * 2 + 1 + 's';
        firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.getElementById('fireworks').appendChild(firework);
        setTimeout(() => firework.remove(), 3000);
    }

    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        sparkle.style.animationDuration = Math.random() * 1 + 5 + 's';
        document.getElementById('sparkles').appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 3000);
    }

    function createConfetti() {
        for(let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = -20 + 'px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '1000';
            document.body.appendChild(confetti);

            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0)', opacity: 1 },
                { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: 2000 + Math.random() * 1000,
                easing: 'cubic-bezier(.37,0,.63,1)'
            });

            animation.onfinish = () => confetti.remove();
        }
    }

    function createAnimations() {
        if (Math.random() < 0.1) createFirework();
        if (Math.random() < 0.3) createSparkle();
        if (Math.random() < 0.05) createConfetti();
        
        // Limit sparkle animation time to 10 seconds
        clearTimeout(sparkleTimeout);
        sparkleTimeout = setTimeout(() => {
            const sparkles = document.querySelectorAll('.sparkle');
            sparkles.forEach(sparkle => sparkle.remove());
        }, 9000);

        requestAnimationFrame(createAnimations);
    }

    function typeMessage(index) {
        if (index < handwrittenMessage.dataset.text.length) {
            handwrittenMessage.textContent += handwrittenMessage.dataset.text.charAt(index);
            setTimeout(() => typeMessage(index + 1), 100);
        }
    }

    // function createHeart(x, y) {
    //     const heart = document.createElement('div');
    //     heart.className = 'heart';
    //     heart.style.left = x + 'px';
    //     heart.style.top = y + 'px';
    //     heart.style.fontSize = heartSize + 'px';
    //     heart.innerHTML = '❤️';
    //     document.body.appendChild(heart);

    //     setTimeout(() => {
    //         heart.remove();
    //         heartSize = Math.max(20, heartSize - 0.5);
    //     }, 3000);
    // }

    function updateGallery() {
        galleryItems.forEach((item, index) => {
            const shouldShow = index >= galleryIndex * itemsPerPage && 
                             index < (galleryIndex + 1) * itemsPerPage;
            
            if (shouldShow) {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                }, 300);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    // Event Listeners
    beginButton.addEventListener('click', () => {
        popup.style.display = 'block';
    });

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    memoryOptions.forEach(option => {
        option.addEventListener('click', () => {
            const memory = option.dataset.memory;
            let content = '';

            switch (memory) {
                case 'first':
                    content = '<h4>Our First Memory</h4><p>Remember the first time I messaged you on WhatsApp to let you know about Anurag Sir\'s classes? We both barely knew each other back then.</p>';
                    break;
                case 'funny':
                    content = '<h4>Funny Moments</h4><p>You sat on top of my higher bench to complete your project and draw the lines for the Digital Electronics project.</p>';
                    break;
                case 'adventure':
                    content = '<h4>Our Biggest Adventure</h4><p>There is no adventure we are supposed to do till now, but soon we will make it happen.</p>';
                    break;
            }

            selectedMemory.innerHTML = content;
        });
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    });

    document.getElementById('prev').addEventListener('click', () => {
        if (galleryIndex > 0) {
            galleryIndex--;
            updateGallery();
        }
    });

    document.getElementById('next').addEventListener('click', () => {
        if ((galleryIndex + 1) * itemsPerPage < galleryItems.length) {
            galleryIndex++;
            updateGallery();
        }
    });

    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(autoAdvanceCarousel, 5000);
    });

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });

    document.querySelector('.click-here').addEventListener('click', function() {
        modal.classList.add('active');
    });

    modal.querySelector('.agree-btn').addEventListener('click', function() {
        this.style.display = 'none';
        modal.querySelector('.agreement-text').style.display = 'none';
        modal.querySelector('.handshake').classList.add('show');
        
        createConfetti();
        
        setTimeout(() => {
            modal.classList.remove('active');
            setTimeout(() => {
                this.style.display = 'block';
                modal.querySelector('.agreement-text').style.display = 'block';
                modal.querySelector('.handshake').classList.remove('show');
            }, 500);
        }, 3000);
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    document.addEventListener('mousemove', function(e) {
        createHeart(e.clientX, e.clientY);
        heartSize = Math.min(heartSize + 1, maxHeartSize);
    });

    // Initialization
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    createAnimations();

    handwrittenMessage.dataset.text = handwrittenMessage.textContent;
    handwrittenMessage.textContent = '';

    const messageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeMessage(0);
                messageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    messageObserver.observe(document.getElementById('message'));

    showItem(currentIndex);
    updateGallery();

    carouselInterval = setInterval(autoAdvanceCarousel, 5000);

    console.log('Friendship page script loaded and initialized.');
});

