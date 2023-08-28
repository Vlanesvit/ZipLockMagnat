
/* ====================================
Инициализация слайдера в блоке rs-project
==================================== */
function initNewprojectSliders() {
	const projects = document.querySelectorAll('.rs-project');
	projects.forEach(project => {
		const projectNext = project.querySelector('.rs-project__button-next');
		const projectPrev = project.querySelector('.rs-project__button-prev');
		const projectSlider = project.querySelector('.rs-project__slider');

		// Перечень слайдеров
		new Swiper(projectSlider, {
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

			navigation: {
				nextEl: projectNext,
				prevEl: projectPrev,
			},

			// Брейкпоинты(адаптив)
			// Шрина экрана
			breakpoints: {
				320: {
					slidesPerView: 1.15,
					spaceBetween: 20,
				},
				540: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1169.98: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
		});
	});
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initNewprojectSliders();
});