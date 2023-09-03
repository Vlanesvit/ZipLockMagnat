window.sr = ScrollReveal({
	// reset: true,
	duration: 500,
});
// console.clear();

const h2 = document.querySelectorAll('h2')
const h3 = document.querySelectorAll('h3')
const titles = [...h2, ...h3]
for (let i = 0; i < titles.length; i++) {
	sr.reveal(titles[i], {
		distance: '50px',
		origin: 'right',
		delay: 300,
	})
}
const lineTitle = document.querySelectorAll('.line-title')
for (let i = 0; i < lineTitle.length; i++) {
	sr.reveal(lineTitle[i], {
		distance: '50px',
		origin: 'right',
		delay: 150,
	})
}

const bannerDescription = document.querySelectorAll('.rs-banner__description')
for (let i = 0; i < bannerDescription.length; i++) {
	sr.reveal(bannerDescription[i], {
		distance: '50px',
		origin: 'right',
		delay: 300,
	})
}
const textBlockImgRev = document.querySelectorAll('.rs-text-block.rs-text-block-reverse .rs-text-block__picture')
for (let i = 0; i < textBlockImgRev.length; i++) {
	sr.reveal(textBlockImgRev[i], {
		distance: '50px',
		origin: 'right',
		delay: 300,
	})
}
const textBlockDesRev = document.querySelectorAll('.rs-text-block.rs-text-block-reverse .rs-text-block__description')
for (let i = 0; i < textBlockDesRev.length; i++) {
	sr.reveal(textBlockDesRev[i], {
		distance: '50px',
		origin: 'right',
		delay: 300,
	})
}
const textBlockImg = document.querySelectorAll('.rs-text-block:not(.rs-text-block-reverse) .rs-text-block__picture')
for (let i = 0; i < textBlockImg.length; i++) {
	sr.reveal(textBlockImg[i], {
		distance: '50px',
		origin: 'left',
		delay: 300,
	})
}
const textBlockDes = document.querySelectorAll('.rs-text-block:not(.rs-text-block-reverse) .rs-text-block__description')
for (let i = 0; i < textBlockDes.length; i++) {
	sr.reveal(textBlockDes[i], {
		distance: '50px',
		origin: 'left',
		delay: 300,
	})
}
const aboutSpoller = document.querySelectorAll('.rs-about-block__spollers')
for (let i = 0; i < aboutSpoller.length; i++) {
	sr.reveal(aboutSpoller[i], {
		distance: '50px',
		origin: 'right',
		delay: 450,
	})
}
const stepsWrapper = document.querySelectorAll('.rs-steps__wrapper')
for (let i = 0; i < stepsWrapper.length; i++) {
	sr.reveal(stepsWrapper[i], {
		distance: '50px',
		origin: 'right',
		delay: 450,
	})
}
const listItem = document.querySelectorAll('.rs-list-block__item')
for (let i = 0; i < listItem.length; i++) {
	sr.reveal(listItem[i], {
		distance: '50px',
		origin: 'bottom',
		delay: i * 150,
	})
}
const featuresItem = document.querySelectorAll('.rs-features__item')
for (let i = 0; i < featuresItem.length; i++) {
	sr.reveal(featuresItem[i], {
		distance: '50px',
		origin: 'bottom',
		delay: i * 200,
	})
}

//========================================================================================================================================================
// Фикс анимации
function fixSR() {
	if (typeof (Event) === 'function') {
		// modern browsers
		window.dispatchEvent(new Event('resize'));
	} else {
		// for IE and other old browsers
		// causes deprecation warning on modern browsers
		var evt = window.document.createEvent('UIEvents');
		evt.initUIEvent('resize', true, false, window, 0);
		window.dispatchEvent(evt);
	}
}
setTimeout(() => {
	fixSR()
}, 100);