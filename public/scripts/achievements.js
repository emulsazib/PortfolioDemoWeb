const galleryGrid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let achievements = [];
let currentIndex = 0;

async function loadAchievements() {
  try {
    const response = await fetch('/api/achievements');
    const data = await response.json();
    achievements = data?.achievements || [];
    renderGallery(achievements);
  } catch (error) {
    console.error('Failed to load achievements', error);
    galleryGrid.innerHTML = '<p class="form-status">Unable to load achievements. Please refresh.</p>';
  }
}

function renderGallery(achievements) {
  if (!achievements.length) {
    galleryGrid.innerHTML = '<p>No achievements found. Check back soon.</p>';
    return;
  }

  galleryGrid.innerHTML = achievements
    .map(
      ({ image, title, description, date }, index) => `
        <div class="gallery-item" data-index="${index}">
          <img src="${image}" alt="${title}" loading="lazy">
          <div class="gallery-item__caption">
            <h3>${title}</h3>
            <p>${description}</p>
            ${date ? `<p style="font-size: 0.85rem; margin-top: 0.5rem; color: var(--muted);">${date}</p>` : ''}
          </div>
        </div>
      `,
    )
    .join('');

  // Add click event listeners to gallery items
  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      const index = parseInt(item.dataset.index);
      openLightbox(index);
    });
  });
}

function openLightbox(index) {
  currentIndex = index;
  const achievement = achievements[index];
  lightboxImage.src = achievement.image;
  lightboxImage.alt = achievement.title;
  lightboxCaption.textContent = `${achievement.title} - ${achievement.description}`;
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showNext() {
  currentIndex = (currentIndex + 1) % achievements.length;
  const achievement = achievements[currentIndex];
  lightboxImage.src = achievement.image;
  lightboxImage.alt = achievement.title;
  lightboxCaption.textContent = `${achievement.title} - ${achievement.description}`;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + achievements.length) % achievements.length;
  const achievement = achievements[currentIndex];
  lightboxImage.src = achievement.image;
  lightboxImage.alt = achievement.title;
  lightboxCaption.textContent = `${achievement.title} - ${achievement.description}`;
}

// Event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNext);
lightboxPrev.addEventListener('click', showPrev);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (lightbox.getAttribute('aria-hidden') === 'false') {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  }
});

loadAchievements();

