let btnlogin = document.getElementById("btn-login");
    
btnlogin.addEventListener("click", function()
{
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loginError = document.getElementById("login-error");
    loginError.style.display = "none";
    email.classList.remove("input-error");
    password.classList.remove("input-error");
    let found = false;
    for(let i = 0; i < users.length; i++)
    {
        if(users[i].email === email.value && users[i].password === password.value)
        {
            found = true;
            localStorage.setItem("currentUser", JSON.stringify(users[i]));
            window.location.href = "index.html";
            return;
        }
    }
    if(!found)
    {
        loginError.style.display = "block";
        email.classList.add("input-error");
        password.classList.add("input-error");
    }
});
