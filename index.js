// Log in setting
import logIn from './logIn.js'

// Setting Login Form
Validator({
    form: '#auth-form',
    formGroupSelector: '.auth-form__group',
    errorSelector: '.auth-form_message',
    rules: [
        Validator.isRequired('#username'),
        Validator.isRequired('#password'),
    ],
    onSubmit: function(data) {
        if (data !== undefined)
        {
            logIn(data);
            location.assign('./pages/login/loggedIn.html');
        }
    }
});