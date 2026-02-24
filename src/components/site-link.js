// Animal emojis that will pop out
const animalEmojis = ['🐱', '🐶', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'];

let emojiElement = null;
let currentEmojiIndex = -1;
let isAnimating = false;
let hasShownThisHover = false;

/**
 * Initialize the site link component with animal emoji animation
 */
export function initSiteLink() {
  const linkElement = document.querySelector('[data-component="site-link"]');
  if (!linkElement) return;

  // Create emoji element
  emojiElement = document.createElement('span');
  emojiElement.className = 'animal-emoji';
  linkElement.appendChild(emojiElement);

  // Event listeners
  linkElement.addEventListener('mouseenter', handleMouseEnter);
  linkElement.addEventListener('mouseleave', handleMouseLeave);
}

function handleMouseEnter() {
  if (isAnimating) return;

  // Reset flag for new hover session
  hasShownThisHover = false;

  // Start the peek animation
  startPeekAnimation();
}

function handleMouseLeave() {
  // Reset flag when leaving
  hasShownThisHover = false;
}

function startPeekAnimation() {
  if (isAnimating || hasShownThisHover) return;

  isAnimating = true;
  hasShownThisHover = true;

  // Pick a different random emoji
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * animalEmojis.length);
  } while (newIndex === currentEmojiIndex);
  currentEmojiIndex = newIndex;

  emojiElement.textContent = animalEmojis[currentEmojiIndex];

  // Reset styles
  emojiElement.classList.remove('peek-out', 'peek-in');

  // Force reflow
  void emojiElement.offsetWidth;

  // Start peek out animation (300ms max)
  emojiElement.classList.add('peek-out');

  // Wait for peek out to complete, then wait a bit, then peek in
  setTimeout(() => {
    // Hold for a moment (200ms)
    setTimeout(() => {
      // Peek in (retreat)
      emojiElement.classList.remove('peek-out');
      emojiElement.classList.add('peek-in');

      // Animation complete after peek-in (300ms)
      setTimeout(() => {
        isAnimating = false;
        emojiElement.classList.remove('peek-in');
      }, 300);
    }, 200);
  }, 300);
}
