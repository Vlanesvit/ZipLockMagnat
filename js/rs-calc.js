function openDetails() {
	const orderDetailsBtn = document.querySelector('.rs-calc__order_open')
	const orderDetailsBody = document.querySelector('.rs-calc__order_body')

	orderDetailsBtn.addEventListener('click', function () {
		_slideToggle(orderDetailsBody, 500)
		orderDetailsBtn.classList.toggle('_open-details')
	})
}
openDetails()