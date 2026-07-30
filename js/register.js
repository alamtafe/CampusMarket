let btnRegister = document.getElementById("btn-register");

btnRegister.addEventListener("click", function()
{
    let nom = document.getElementById("nom");
    let email = document.getElementById("email");
    let telephone = document.getElementById("telephone");
    let password = document.getElementById("password"); 
    let confirmPassword = document.getElementById("confirm-password");
    let emailError = document.getElementById("email-error");
    let passwordError = document.getElementById("password-error");
    
    emailError.style.display = "none";
    passwordError.style.display = "none";
    email.classList.remove("input-error");
    password.classList.remove("input-error");
    confirmPassword.classList.remove("input-error");    

    if (password.value !== confirmPassword.value)
    {
        passwordError.style.display = "block";
        password.classList.add("input-error");
        confirmPassword.classList.add("input-error");
        return;
    }
    let user = {
        nom: nom.value,
        email: email.value, 
        password: password.value
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];

    for(let i = 0; i < users.length; i++)
    {
        if(users[i].email === user.email)
        {
            emailError.style.display = "block";
            email.classList.add("input-error");
            return;
        }   
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "login.html";
});
