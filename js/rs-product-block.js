/* ====================================
Инициализация слайдера в блоке rs-product
====================Card================ */
function initProductCardSliders() {
	// Перечень слайдеров
	const thumbsSlider = new Swiper('.rs-thumbs__slider', {
		// // Автовысота
		// autoHeight: true,

		// // Бесконечность
		// loop: true,

		// // Предзагрузка изоражений
		// preloadImages: false,

		// // Ленивая загрузка
		// lazy: true,

		// Слежка за слайдером
		watchOverflow: true,

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
		// Чувствительность свайпа
		touchRadio: 1,
		// Угол срабатывания свайпа/перетаскивания
		touchAngle: 45,

		grabCursor: true,

		direction: 'vertical',

		// Брейкпоинты(адаптив)
		// Шрина экрана
		breakpoints: {
			1549.98: {
				slidesPerView: 5.5,
				spaceBetween: 12,
			},

		},
	});

	const productSlider = new Swiper('.rs-product-block__slider', {
		// Слияние слайдеров
		thumbs: {
			swiper: thumbsSlider,
		},
		grabCursor: true,

		// // Автовысота
		// autoHeight: true,

		// // Бесконечность
		// loop: true,

		// // Предзагрузка изоражений
		// preloadImages: false,

		// // Ленивая загрузка
		// lazy: true,

		// Слежка за слайдером
		watchOverflow: true,

		// // Автопрокрутка
		// autoplay: {
		// 	// Пауза между прокруткой
		// 	delay: 5000,
		// 	// Закончить на последнем слайде
		// 	stopOnLastSlide: false,
		// 	// Отключить после ручного переключения
		// 	disableOnInteraction: false,
		// },

		// // Управлениt колесом мыши
		// mousewheel: {
		// 	// Чувствительность колеса мыши
		// 	sensitivity: 1,
		// },


		// Навигация
		navigation: {
			prevEl: ".rs-product-block__button-prev",
			nextEl: ".rs-product-block__button-next",
		},

		// Кол-во показываемых слайдов
		slidesPerView: 1,
		// spaceBetween: 30,

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
	});
}
initProductCardSliders();
