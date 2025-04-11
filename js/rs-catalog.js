/* ====================================
Инициализация range-input в сайдбаре
==================================== */
function rangePrice() {
	const rangePriceSlider = document.querySelector('#range-price__slider');

	if (rangePriceSlider) {
		noUiSlider.create(rangePriceSlider, {
			start: [1000, 7000],
			step: 1000,
			behaviour: 'drag-tap',
			connect: [false, true, false],
			range: {
				'min': [1000],
				'max': [7000]
			}
		});

		const inputPriceMin = document.querySelector('#input-price__min');
		const inputPriceMax = document.querySelector('#input-price__max');

		const inputsPrice = [inputPriceMin, inputPriceMax]

		rangePriceSlider.noUiSlider.on('update', function (values, handle) {
			inputsPrice[handle].value = Math.round(values[handle])
		});

		inputsPrice.forEach(input => {
			input.addEventListener('change', function () {
				rangePriceSlider.noUiSlider.set([this.value]);
			});
		});
	}
}
if (document.querySelector('#range-price__slider')) {
	rangePrice()
}

function openFilter() {
	const filterBtn = document.querySelector('.rs-catalog__open-filter')
	const filterBody = document.querySelector('.rs-filter')

	filterBtn.addEventListener('click', function () {
		filterBody.classList.toggle('_filter-open')
	})

	// filterBody.addEventListener('click', function (e) {
	// 	e.stopPropagation();
	// });
	// document.addEventListener('click', function (e) {
	// 	filterBody.classList.remove('_filter-open')
	// });
}
openFilter()

function changeView() {
	const catalogs = document.querySelectorAll('.rs-catalog')

	catalogs.forEach(catalog => {
		const displayBtns = catalog.querySelectorAll('.rs-catalog__display ul li a')
		const catalogList = catalog.querySelector('.rs-catalog__list')

		displayBtns.forEach(displayBtn => {
			displayBtn.addEventListener('click', function (e) {
				e.preventDefault();

				displayBtns.forEach(otherBtn => {
					otherBtn.classList.remove('_active');
				})

				displayBtn.classList.add('_active');

				let view = displayBtn.getAttribute('data-view');

				catalogList.setAttribute('data-view', view)

			})
		});
	});
}
changeView()