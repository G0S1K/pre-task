document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form__login');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let message = document.querySelector('.error_mes');
        let error = formValidate(form);
        let formData = new FormData(form);
        let data = {};

        for (const [key, value] of formData) {
            data[key] = value
        }

        if (error === 0) {
            message.style.display = 'none';
            let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(data)
            });

            if (response.ok) {
                form.reset();
            } else {
                console.log('Error');
            }

        }else {
            console.log('Errors: ' + error);
            message.style.display = 'inline';
        }

    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (const input of formReq) {
            formRemoveError(input);
            if (input.value === '') {
                formAddError(input);
                error++;
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

});