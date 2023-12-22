import IMask from 'imask';
var $ = require('jquery');
import openModal from './main-a';

const form = () => {
    const form = document.querySelector('.form__form');
    const name = document.querySelector('.form__input--name');
    const phone = document.querySelector('.form__input--tel');
    const mail = document.querySelector('.form__input--mail');
    const nameError = document.querySelector(".form__input--name + span.error");
    const phoneError = document.querySelector(".form__input--tel + span.error");
    const mailError = document.querySelector(".form__input--mail + span.error");
    
    name.addEventListener("input", function (event) {
        if (name.validity.valid) {
            nameError.innerText = "";
            nameError.className = "error";
            name.classList.remove("invalid");
        } else {
            if (name.validity.valueMissing) {
                nameError.className = "error active";
                name.classList.add("invalid");
            }
            nameError.className = "error active";
            name.classList.add("invalid");
        }
    });

    phone.addEventListener("input", function (event) {
        if (phone.validity.valid) {
            phoneError.textContent = "";
            phoneError.className = "error";
            phone.classList.remove("invalid");
        } else {
            if (phone.validity.valueMissing) {
                phoneError.className = "error active";
                phone.classList.add("invalid");
            }
            phoneError.className = "error active";
            phone.classList.add("invalid");
        }
    });
    
    mail.addEventListener("input", function (event) {
        if (mail.validity.valid) {
            mailError.textContent = "";
            mailError.className = "error";
            mail.classList.remove("invalid");
        } else {
            if (mail.validity.valueMissing) {
                mailError.className = "error active";
                mail.classList.add("invalid");
            }
            mailError.className = "error active";
            mail.classList.add("invalid");
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(name.value,phone.value,mail.value)

        if (name.value == "" && phone.value == "" && mail.value == "" || mail.value == "" || phone.value == "" || name.value == "") {
            if (name.value == "") {
                name.classList.add("invalid");
                nameError.textContent = "Заполните поле";
                nameError.className = "error active";
            }
            if (phone.value == "") {
                phone.classList.add("invalid");
                phoneError.textContent = "Заполните поле";
                phoneError.className = "error active";
            }
            if (mail.value == "") {
                mail.classList.add("invalid");
                mailError.textContent = "Заполните поле";
                mailError.className = "error active";
            }
            // name.classList.add("invalid");
            // nameError.textContent = "Заполните поле";
            // nameError.className = "error active";
            // phone.classList.add("invalid");
            // phoneError.textContent = "Заполните поле";
            // phoneError.className = "error active";
            // mail.classList.add("invalid");
            // mailError.textContent = "Заполните поле";
            // mailError.className = "error active";
            return;
        } else {
            $.ajax();
            name.value = "";
            phone.value = "";
            mail.value = "";
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