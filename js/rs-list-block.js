/* ====================================
Инициализация слайдера rs-banner-features
==================================== */
function initFeaturesSlider() {
	if (document.querySelector('.rs-list-block.rs-features')) {
		'use strict';
		// До этой ширины слайдер будет неактивным
		const breakpoint = window.matchMedia('(min-width: 991.98px)');

		let featuresSlider;

		const breakpointChecker = function () {
			if (breakpoint.matches === true) {
				if (featuresSlider !== undefined) featuresSlider.destroy(true, true);
				return;
			} else if (breakpoint.matches === false) {
				return enableSwiper();
			}
		};

		// Инициализация слайдера
		const enableSwiper = function () {
			featuresSlider = new Swiper('.rs-list-block__slider', {
				// Автопрокрутка
				autoplay: {
					// Пауза между прокруткой
					delay: 3000,
					// Закончить на последнем слайде
					stopOnLastSlide: false,
					// Отключить после ручного переключения
					disableOnInteraction: true,
				},

				// Обновить свайпер
				// при изменении элементов слайдера
				observer: true,
				// при изменении родительских элементов слайдера
				observeParents: true,
				// при изменении дочерних элементов слайдера
				observeSlideChildren: true,

				// Скорость смены слайдов
				speed: 500,

				// Включение/отключение
				// перетаскивание на ПК
				simulateTouch: true,
				// Чувствительность свайпа
				touchRadio: 1,
				// Угол срабатывания свайпа/перетаскивания
				touchAngle: 45,
				// Cобытие touchstart (pointerdown)
				touchStartPreventDefault: true,

				// Курсор перетаскивания
				grabCursor: true,

				// Брекпоинты (адаптив)
				breakpoints: {
					320: {
						slidesPerView: 1,
						spaceBetween: 31,
					},
					540: {
						slidesPerView: 1.1,
						spaceBetween: 31,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 31,
					},
				},
			});
		};

		breakpoint.addListener(breakpointChecker);
		breakpointChecker();
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдера
	initFeaturesSlider();
});