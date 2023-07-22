
/* ====================================
Инициализация слайдера в блоке rs-product
==================================== */
function initNewProductSliders() {
	const product4x2 = document.querySelectorAll('.rs-product.rs-product-4x2');
	const product3x2 = document.querySelectorAll('.rs-product.rs-product-3x2');
	const product4x1 = document.querySelectorAll('.rs-product.rs-product-4x1');

	product4x2.forEach(product => {
		const productNext = product.querySelector('.rs-product__button-next');
		const productPrev = product.querySelector('.rs-product__button-prev');
		const productSlider = product.querySelector('.rs-product__slider');

		// Перечень слайдеров
		new Swiper(productSlider, {
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
				nextEl: productNext,
				prevEl: productPrev,
			},

			// Брейкпоинты(адаптив)
			// Шрина экрана
			breakpoints: {
				320: {
					slidesPerView: 1.15,
					spaceBetween: 20,
					grid: {
						fill: 'row',
						rows: 1,
					},
				},
				540: {
					slidesPerView: 2,
					spaceBetween: 20,
					grid: {
						fill: 'row',
						rows: 1,
					},
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 20,
					grid: {
						fill: 'row',
						rows: 2,
					},
				},
				1350: {
					slidesPerView: 4,
					spaceBetween: 30,
					grid: {
						fill: 'row',
						rows: 2,
					},
				},
			},
		});
	});

	product4x1.forEach(product => {
		const productNext = product.querySelector('.rs-product__button-next');
		const productPrev = product.querySelector('.rs-product__button-prev');
		const productSlider = product.querySelector('.rs-product__slider');

		// Перечень слайдеров
		new Swiper(productSlider, {
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
				nextEl: productNext,
				prevEl: productPrev,
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
				1350: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
		});
	});

	product3x2.forEach(product => {
		const productNext = product.querySelector('.rs-product__button-next');
		const productPrev = product.querySelector('.rs-product__button-prev');
		const productSlider = product.querySelector('.rs-product__slider');

		// Перечень слайдеров
		new Swiper(productSlider, {
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
				nextEl: productNext,
				prevEl: productPrev,
			},

			// Брейкпоинты(адаптив)
			// Шрина экрана
			breakpoints: {
				320: {
					slidesPerView: 1.15,
					spaceBetween: 20,
					grid: {
						fill: 'row',
						rows: 1,
					},
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
					grid: {
						fill: 'row',
						rows: 2,
					},
				},
				1350: {
					slidesPerView: 3,
					spaceBetween: 30,
					grid: {
						fill: 'row',
						rows: 2,
					},
				},
			},
		});
	});

}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initNewProductSliders();
});

/* ====================================
Кнопка избранное
==================================== */
function favProduct() {
	const favBtn = document.querySelectorAll('.product__action .fav-btn')

	favBtn.forEach(btn => {
		btn.addEventListener('click', function () {
			btn.classList.toggle('_active');
			console.log('1');
		})
	});
}
favProduct()