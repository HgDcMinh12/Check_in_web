// Open/Close login form
// Open
function openLoginForm() 
{
    if (document.querySelectorAll('.invalid') !== undefined)
    {
        errorItems = document.querySelectorAll('.invalid');
        if (errorItems.length != 0)
        {
            Array.from(errorItems).forEach(function(item)
            {
                item.classList.remove("invalid");
                item.querySelector('.auth-form_message').innerText = '';
            });
        }
        document.querySelector('.modal').style.display = "flex";
    }
    else 
    {
        document.querySelector('.modal').style.display = "flex";
    }
}

var btnLogin = document.querySelector('.btn-homepage-login');
btnLogin.addEventListener("click", openLoginForm)

// Close
function closeLoginForm()
{
    document.querySelector('.modal').style.display = "none";
    document.getElementById("auth-form").reset();
}
var btnBack = document.querySelector('.auth-form__controls-back')
btnBack.addEventListener("click", closeLoginForm)

// export function openLoginForm()