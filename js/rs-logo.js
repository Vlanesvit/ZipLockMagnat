/* ====================================
Инициализация слайдера в блоке rs-slider
==================================== */
function initLogoSliders() {
	// Перечень слайдеров
	const swiperLogo = new Swiper('.rs-logo__slider', {
		// // Автопрокрутка
		// autoplay: {
		// 	// Пауза между прокруткой
		// 	delay: 5000,
		// 	// Закончить на последнем слайде
		// 	stopOnLastSlide: false,
		// 	// Отключить после ручного переключения
		// 	disableOnInteraction: false,
		// },
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
		allowTouchMove: true,
		// Чувствительность свайпа
		touchRadio: 1,
		// Угол срабатывания свайпа/перетаскивания
		touchAngle: 45,
		// Цикличность слайдера
		// loop: true,
		// Анимация переключения
		// effect: 'fade',
		grabCursor: true,

		// Брейкпоинты(адаптив)
		// Шрина экрана
		breakpoints: {
			320: {
				slidesPerView: 2,
				spaceBetween: 40,
				centeredSlides: true,
			},
			540: {
				slidesPerView: 4,
				spaceBetween: 40,
				centeredSlides: false,

			},
			768: {
				slidesPerView: 6,
				spaceBetween: 50,
				centeredSlides: false,

			},
			1070: {
				slidesPerView: 8,
				spaceBetween: 60,
				centeredSlides: false,

			},
		},
	});
}
window.addEventListener("load", function (e) {
	if (document.querySelector('.rs-logo__slider')) {
		// Запуск инициализации слайдеров
		initLogoSliders();
	}
});