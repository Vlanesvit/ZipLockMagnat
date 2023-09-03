function openDetails() {
	const orderDetailsBtn = document.querySelector('.rs-calc__order_open')
	const orderDetailsBody = document.querySelector('.rs-calc__order_body')

	orderDetailsBtn.addEventListener('click', function () {
		_slideToggle(orderDetailsBody, 500)
		orderDetailsBtn.classList.toggle('_open-details')
	})
}
openDetails()

const calcTables = document.querySelectorAll('.rs-calc__table');
calcTables.forEach(calcTable => {
	const thead = calcTable.querySelector('thead')
	const tbody = calcTable.querySelector('tbody')
	const trsHead = thead.querySelectorAll('tr')
	const trsBody = tbody.querySelectorAll('tr')

	trsHead.forEach(trHead => {
		const ths = trHead.querySelectorAll('th')

		trsBody.forEach(trBody => {
			const tds = trBody.querySelectorAll('td:not(.td-count)')
			const tdsCount = trBody.querySelector('td.td-count')

			for (let i = 0; i < tds.length; i++) {
				tds[i].addEventListener('mouseenter', function () {
					tdsCount.style.background = "#F3F6FB";
					ths[i + 1].style.background = "#F3F6FB";
				})
				tds[i].addEventListener('mouseleave', function () {
					tdsCount.style.background = "#fff";
					ths[i + 1].style.background = "#fff";
				})
			}
		});
	});
});