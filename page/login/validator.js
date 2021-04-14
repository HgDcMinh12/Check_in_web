// import logIn from '../history/history_main.js';
// Đối tượng Validator

function Validator (options)
{
    //tìm element parent 
    function getParent(element, selector)
    {
        while (element.parentElement)
        {
            if (element.parentElement.matches(selector))
            {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    // Tổng các rule của các selector
    var selectorRules = {};

    // Hàm thực hiện validate từng rule của 1 selector
    function validate(inputElement, rule)
    {
        var errorMessage;
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        // Lặp qua từng Rule và kiểm tra
        // Nếu có lỗi thì dừng việc kiểm tra

        for (var i = 0; i < rules.length; ++i)
        {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break ;
        }

        if (errorMessage)
        {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        }
        else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }
        return !errorMessage;
    }
    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);

    if (formElement)
    {
        

        formElement.onsubmit = function(e)
        {
            e.preventDefault();
            
            var isFormValid = true;

            // Thực hiện lặp qua từng rule và validate
            options.rules.forEach(function(rule)
            {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement,rule);
                if (!isValid)
                {
                    isFormValid = false;
                }
            });

            
            if (isFormValid)
            {
                var enableInputs = formElement.querySelectorAll('[name]');
                var formValues = Array.from(enableInputs).reduce(function(values, input){
                    values[input.name] = input.value;
                    return values;
                }, {});
                console.log(formValues)
                options.onSubmit(formValues)
            }
        }
        

        // Lặp qua mỗi rule của từng selector để validate và xử lý (lắng nghe sự kiện: blur, input,...)
        options.rules.forEach(function(rule)
        {
            // Lưu lại các qui định cho mỗi input
            if(Array.isArray(selectorRules[rule.selector]))
            {
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function(inputElement)
            {
                // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function() {
                    //value: inputElement.value
                    //test func: rule.test
                    validate(inputElement, rule);
                }
                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }
            }
            )
        })
    }    
}

//Định nghĩa các rule

Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

// Validator.isEmail = function (selector, message) {
//     return {
//         selector : selector,
//         test: function (value) {
//             var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//             return regex.test(value) ? undefined : message || 'Trường này phải là email'
//         }
//     }
// }