import IMask from 'imask';
var $ = require('jquery');
import openModal from './main-a';

const form = () => {
    const form = document.querySelector('.form__form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.querySelector('.form__input--name').value;

        function validateName(name) {
            return name.trim() !== '';
        }

        if (!validateName(name)) {
            alert('Введите корректное имя.');
            return;
        }

        if (validateName(name)) {
            // form.submit();
            $.ajax();
            if (form.closest('.modal')) {
                form.closest('.modal').classList.remove("active");
            }
            $(".modal.success-application").addClass("active");
            openModal();
        }
    });




const tel = document.querySelector('.form__input--tel')

    IMask(tel, {
        mask: '+{7}(000)000-00-00',
    });
}

export default form