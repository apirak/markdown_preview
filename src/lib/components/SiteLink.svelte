<script lang="ts">
	// Props
	export let className: string = '';

	// Animal emojis that will pop out
	const animalEmojis = ['🐱', '🐶', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'];

	let emojiElement: HTMLElement;
	let currentEmojiIndex = -1;
	let isAnimating = false;
	let hasShownThisHover = false;

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
		let newIndex: number;
		do {
			newIndex = Math.floor(Math.random() * animalEmojis.length);
		} while (newIndex === currentEmojiIndex);
		currentEmojiIndex = newIndex;

		// Update emoji content
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
</script>

<a
	href="https://apirak.com"
	target="_blank"
	rel="noopener noreferrer"
	class="site-link {className}"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
>
	<slot />
	<span bind:this={emojiElement} class="animal-emoji" aria-hidden="true"></span>
</a>

<style>
	.site-link {
		position: relative;
		display: inline-flex;
		align-items: center;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.animal-emoji {
		position: absolute;
		left: 100%;
		margin-left: 4px;
		font-size: 1rem;
		opacity: 0;
		pointer-events: none;
		will-change: transform, opacity;
		/* Start position: hidden and rotated */
		transform: translateY(0) rotate(0deg);
	}

	/* Peek out animation: slide out 60% and tilt head */
	.animal-emoji:global(.peek-out) {
		animation: peekOut 300ms ease-out forwards;
	}

	/* Peek in animation: retreat and tilt back */
	.animal-emoji:global(.peek-in) {
		animation: peekIn 300ms ease-in forwards;
	}

	@keyframes peekOut {
		0% {
			opacity: 0;
			transform: translateX(-8px) rotate(-15deg);
		}
		100% {
			opacity: 1;
			transform: translateX(6px) rotate(10deg);
		}
	}

	@keyframes peekIn {
		0% {
			opacity: 1;
			transform: translateX(6px) rotate(10deg);
		}
		100% {
			opacity: 0;
			transform: translateX(-8px) rotate(-15deg);
		}
	}
</style>
