var header_side_nav = document.getElementById('header-side-nav')

// Open Side Nav function
function openNav() 
{
    header_side_nav.style.width = "240px";
    document.querySelector(".header-menu_icon").style.display = 'none';
}

// Close Side Nav function
function closeNav()
{
    header_side_nav.style.width = "0";
    setTimeout(function()
                        {
                            document.querySelector(".header-menu_icon").style.display = 'block';
                        }, 500);

}

var userName = document.querySelector('.header__navbar-user-name');
userName.innerHTML = localStorage.getItem("userData");