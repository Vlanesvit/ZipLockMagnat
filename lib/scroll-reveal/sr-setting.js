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
		delay: 500,
	})
}
const bannerDescription = document.querySelectorAll('.rs-banner__description')
for (let i = 0; i < bannerDescription.length; i++) {
	sr.reveal(bannerDescription[i], {
		distance: '50px',
		origin: 'right',
		delay: 500,
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