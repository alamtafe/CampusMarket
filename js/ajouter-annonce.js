let currentUser = JSON.parse(localStorage.getItem("currentUser"));

let imagesInput = document.getElementById("images");
let photosRow = document.getElementById("photos-row");
let photoCount = document.getElementById("photo-count");
let imageError = document.getElementById("image-error");
let formAnnonce = document.getElementById("form-annonce");

let imagesAnnonce = [];

imageError.style.display = "none";

let formAlert = document.createElement("div");
formAlert.className = "form-alert";
formAlert.style.display = "none";
formAnnonce.prepend(formAlert);

imagesInput.addEventListener("change", function()
{
    let files = Array.from(imagesInput.files);

    for (let i = 0; i < files.length; i++)
    {
        if (imagesAnnonce.length >= 8)
        {
            break;
        }

        let reader = new FileReader();

        reader.onload = function(e)
        {
            imagesAnnonce.push(e.target.result);

            afficherPhotos();
        };

        reader.readAsDataURL(files[i]);
    }

    imagesInput.value = "";
});

function afficherPhotos()
{
    let anciennesPhotos = document.querySelectorAll(".photo-preview-card");

    for (let i = 0; i < anciennesPhotos.length; i++)
    {
        anciennesPhotos[i].remove();
    }

    for (let i = 0; i < imagesAnnonce.length; i++)
    {
        let card = document.createElement("div");
        card.className = "photo-preview-card";

        card.innerHTML = `
            <img src="${imagesAnnonce[i]}">

            <span class="photo-number">${i + 1}</span>

            <button type="button" class="remove-photo" data-index="${i}">
                <i class="fa-solid fa-xmark"></i>
            </button>

            ${
                i === 0
                ? `<span class="main-photo">
                    <i class="fa-solid fa-star"></i>
                    Photo principale
                   </span>`
                : ""
            }
        `;

        photosRow.appendChild(card);
    }

    photoCount.textContent = imagesAnnonce.length + "/8";

    let removeButtons = document.querySelectorAll(".remove-photo");

    for (let i = 0; i < removeButtons.length; i++)
    {
        removeButtons[i].addEventListener("click", function()
        {
            let index = this.getAttribute("data-index");

            imagesAnnonce.splice(index, 1);

            afficherPhotos();
        });
    }
}

function afficherErreur(message)
{
    formAlert.textContent = message;
    formAlert.style.display = "block";
}

function cacherErreur()
{
    formAlert.style.display = "none";
    imageError.style.display = "none";

    let inputs = document.querySelectorAll("#form-annonce input, #form-annonce textarea, #form-annonce select");

    for (let i = 0; i < inputs.length; i++)
    {
        inputs[i].classList.remove("input-error");
    }
}

let btnAjouter = document.getElementById("btn-ajouter");

btnAjouter.addEventListener("click", function () {
    cacherErreur();

    let titre = document.getElementById("titre");
    let description = document.getElementById("description");
    let prix = document.getElementById("prix");
    let ville = document.getElementById("ville");
    let telephone = document.getElementById("telephone");
    let categorie = document.getElementById("categorie");

    if (imagesAnnonce.length === 0)
    {
        imageError.style.display = "block";
        afficherErreur("Ajoutez au moins une photo pour publier votre annonce.");
        return;
    }

    if (titre.value.trim().length < 3)
    {
        titre.classList.add("input-error");
        afficherErreur("Le titre doit contenir au moins 3 caractères.");
        return;
    }

    if (description.value.trim().length < 5)
    {
        description.classList.add("input-error");
        afficherErreur("La description est trop courte.");
        return;
    }

    if (Number(prix.value) <= 0)
    {
        prix.classList.add("input-error");
        afficherErreur("Le prix doit être supérieur à 0.");
        return;
    }

    if (ville.value.trim() === "")
    {
        ville.classList.add("input-error");
        afficherErreur("La ville est obligatoire.");
        return;
    }

    if (telephone.value.trim() === "")
    {
        telephone.classList.add("input-error");
        afficherErreur("Le téléphone est obligatoire.");
        return;
    }

    let annonce = {
        titre: titre.value.trim(),
        description: description.value.trim(),
        prix: prix.value,
        ville: ville.value.trim(),
        telephone: telephone.value.trim(),
        categorie: categorie.value,
        images: imagesAnnonce,
        image: imagesAnnonce[0],
        ownerEmail: currentUser.email,
        date: new Date().toLocaleDateString()
    };

    let annonces = JSON.parse(localStorage.getItem("annonces")) || [];
    annonces.push(annonce);
    localStorage.setItem("annonces", JSON.stringify(annonces));

    localStorage.setItem("successMessage", "Annonce publiée avec succès.");

    window.location.href = "index.html";
});
