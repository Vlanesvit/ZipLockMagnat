/* ====================================
Инициализация слайдера в блоке rs-slider
==================================== */
function initMainSliders() {
	// Перечень слайдеров
	const swiperMain = new Swiper('.rs-slider__slider', {
		// // Автопрокрутка
		// autoplay: {
		// 	// Пауза между прокруткой
		// 	delay: 5000,
		// 	// Закончить на последнем слайде
		// 	stopOnLastSlide: false,
		// 	// Отключить после ручного переключения
		// 	disableOnInteraction: false,
		// },
		// Кол-во показываемых слайдов
		slidesPerView: 1,
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
		effect: 'fade',
		grabCursor: true,
		// Пагинация
		pagination: {
			el: ".rs-slider__pagination",
			clickable: true,
		},
		// Навигация
		navigation: {
			nextEl: ".rs-slider__button-next",
			prevEl: ".rs-slider__button-prev",
		},
		waitForTransition: false,

	});

	const pagination = document.querySelector('.rs-slider__pagination');
	const navigation = document.querySelector('.rs-slider__navigation');

	swiperMain.on('beforeTransitionStart', function () {
		const slide = document.querySelector('.rs-slider__slide.swiper-slide-active.rs-slider__slide-inversion');
		if (slide) {
			pagination.classList.add('rs-slider__pagination-inversion')
			navigation.classList.add('rs-slider__navigation-inversion')
		} else {
			pagination.classList.remove('rs-slider__pagination-inversion')
			navigation.classList.remove('rs-slider__navigation-inversion')
		}
	});
}
window.addEventListener("load", function (e) {
	if (document.querySelector('.rs-slider__slider')) {
		// Запуск инициализации слайдеров
		initMainSliders();
	}
});