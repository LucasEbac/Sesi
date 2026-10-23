function setupCarousel(trackId, prevBtnId, nextBtnId) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    let index = 0;

    function updateCarousel() {
        if (!track.firstElementChild) return;
        const cardWidth = track.firstElementChild.getBoundingClientRect().width + 24;
        track.style.transform = `translateX(${-index * cardWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        const itemWidth = track.firstElementChild.getBoundingClientRect().width + 24;
        const visibleWidth = track.parentElement.getBoundingClientRect().width;
        const maxIndex = track.children.length - Math.floor(visibleWidth / itemWidth);
        if (index < maxIndex) {
            index++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (index > 0) {
            index--;
            updateCarousel();
        }
    });

    window.addEventListener('resize', updateCarousel);
}

document.addEventListener('DOMContentLoaded', () => {
    setupCarousel('course-track', 'course-prev', 'course-next');
    setupCarousel('testi-track', 'testi-prev', 'testi-next');

    const animElements = document.querySelectorAll('.scroll-anim');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    animElements.forEach(el => observer.observe(el));
});

function openModal(title, category, desc, duration) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalCategory').innerText = category.toUpperCase();
    document.getElementById('modalDescription').innerText = desc;
    document.getElementById('modalDuration').innerText = duration;
    
    const categoryTag = document.getElementById('modalCategory');
    if(category.toLowerCase().includes('matemática')) {
        categoryTag.className = 'category-tag tag-math';
    } else {
        categoryTag.className = 'category-tag tag-science';
    }
    document.getElementById('courseModal').classList.add('show');
}

function closeModal() {
    document.getElementById('courseModal').classList.remove('show');
}

window.onclick = function(event) {
    const modal = document.getElementById('courseModal');
    if (event.target == modal) {
        closeModal();
    }
}
