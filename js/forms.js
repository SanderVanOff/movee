const form = document.querySelectorAll('form'),
	inputs = document.querySelectorAll('input'),
	modalWindowWrapper = document.querySelector('.modal-window__wrapper');
const modalMailText = document.querySelector('.modal-mail__text');

// сообщения, которые выводятся пользователю
const message = {
	loading: 'Загрузка...',
	success: 'Спасибо! Скоро мы с вами свяжемся',
	failure: 'Что-то пошло не так...',
};
// получение данных
const postData = async (url, data) => {
	modalMailText.textContent = message.loading;
	let res = await fetch(url, {
		method: 'POST',
		body: data,
	});

	return await res.text();
};
// очищение инпутов
const clearInputs = () => {
	inputs.forEach(item => {
		item.value = '';
	});
};

form.forEach(item => {
	item.addEventListener('submit', e => {
		e.preventDefault();

		console.log();
		const modalMail = document.querySelector('.modal-mail');
		const formDelails = document.querySelector('.form__details');

		modalWindowWrapper.classList.remove('modal-window__wrapper_visible');
		formDelails.classList.remove('form__details-show');
		modalMail.style.display = 'flex';
		modalMailText.textContent = message.success;

		const formData = new FormData(item);
		debugger;
		if (
			modalWindowWrapper.classList.contains('modal-window__wrapper_visible')
		) {
			formData.append('type', e.target.childNodes[5].childNodes[3].value);
			formData.append('height', e.target.childNodes[5].childNodes[7].value);
			formData.append('capacity', e.target.childNodes[5].childNodes[9].value);
			formData.append('carrying', e.target.childNodes[5].childNodes[11].value);
		}
		postData('send.php', formData)
			.then(res => {
				console.log(res);
				modalMailText.textContent = message.success;
			})
			.catch(err => {
				modalMailText.textContent = message.failure;
				console.log(err);
			})
			.finally(() => {
				clearInputs();
				setTimeout(() => {
					modalMail.style.display = 'none';
				}, 2000);
				document.body.style.overflow = 'scroll';
			});
	});
});

//модальное окно
const modalWindow = document.querySelector('.modal-window__wrapper');
const btnOpenModalWindowDetails = document.querySelectorAll(
	'.car-park-item__btn',
);
const formDelails = document.querySelector('.form__details');

btnOpenModalWindowDetails.forEach(item => {
	item.addEventListener('click', event => {
		const target = event.target;
		modalWindow.classList.add('modal-window__wrapper_visible');
		modalWindow.classList.add('modal-details');

		document.body.style.overflow = 'hidden';
		formDelails.classList.add('form__details-show');

		const inputType = document.querySelector('input[name="type"]');
		const inputHeight = document.querySelector('input[name="height"]');
		const inputCapacity = document.querySelector('input[name="capacity"]');
		const inputCarrying = document.querySelector('input[name="carrying"]');

		inputType.value = `${target.previousElementSibling.previousElementSibling.textContent}`;
		inputHeight.value = `${target.previousElementSibling.children[1].textContent.trim()}`;
		inputCapacity.value = `${target.previousElementSibling.children[2].textContent.trim()}`;
		inputCarrying.value = `${target.previousElementSibling.children[3].textContent.trim()}`;
	});
});

// модальное окно

function openPoppup(button, poppupWindow) {
	const modalOpenBtn = document.querySelectorAll(button),
		modalWindow = document.querySelector(poppupWindow);

	modalOpenBtn.forEach(item => {
		item.addEventListener('click', () => {
			modalWindow.classList.add('modal-window__wrapper_visible');
			document.body.style.overflow = 'hidden';
		});
	});

	modalWindow.addEventListener('click', event => {
		const target = event.target;
		if (
			target.closest('.modal-window__close') ||
			!target.closest('.modal-window__inner')
		) {
			modalWindow.classList.remove('modal-window__wrapper_visible');
			formDelails.classList.remove('form__details-show');
			document.body.style.overflow = 'scroll';
		}
	});
}
openPoppup('.modal-open-btn', '.modal-window__wrapper');
