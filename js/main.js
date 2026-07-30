let logout = document.getElementById("logout");
let loginLink = document.getElementById("login");
let registerLink = document.getElementById("register");
let mesAnnoncesLink = document.getElementById("mes-annonces");

if (logout)
{
    logout.addEventListener("click", function(event)
    {
        event.preventDefault();

        localStorage.removeItem("currentUser");
        localStorage.removeItem("indexModifier");
        localStorage.removeItem("annonceDetail");

        window.location.href = "login.html";
    });
}

if (localStorage.getItem("currentUser"))
{
    if (loginLink)
    {
        loginLink.style.display = "none";
    }

    if (registerLink)
    {
        registerLink.style.display = "none";
    }
}
else
{
    if (mesAnnoncesLink)
    {
        mesAnnoncesLink.style.display = "none";
    }

    if (logout)
    {
        logout.style.display = "none";
    }
}

let btnPublierHome = document.getElementById("btn-publier-home");
let btnPublierHome1 = document.getElementById("btn-publier-home-1");
let popupLogin = document.getElementById("popup-login");
let closeLoginPopup = document.getElementById("close-login-popup");

if (btnPublierHome)
{
    btnPublierHome.addEventListener("click", function(event)
    {
        event.preventDefault();

        let currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (currentUser)
        {
            window.location.href = "ajouter-annonce.html";
        }
        else if (popupLogin)
        {
            popupLogin.style.display = "flex";
        }
    });
}

if (closeLoginPopup)
{
    closeLoginPopup.addEventListener("click", function()
    {
        popupLogin.style.display = "none";
    });
}

function afficherToast(message)
{
    let toast = document.createElement("div");
    toast.className = "toast-success";
    toast.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(function()
    {
        toast.classList.add("show");
    }, 100);

    setTimeout(function()
    {
        toast.classList.remove("show");

        setTimeout(function()
        {
            toast.remove();
        }, 300);
    }, 2500);
}

let successMessage = localStorage.getItem("successMessage");

if (successMessage)
{
    afficherToast(successMessage);
    localStorage.removeItem("successMessage");
}
