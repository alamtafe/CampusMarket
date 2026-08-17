let indexModifier = localStorage.getItem("indexModifier");

let annonces = JSON.parse(localStorage.getItem("annonces")) || [];

let annonce = annonces[indexModifier];

if (!annonce)
{
    window.location.href = "mes-annonces.html";
}

let form = document.querySelector("form");
let formAlert = document.createElement("div");
formAlert.className = "form-alert";
formAlert.style.display = "none";
form.prepend(formAlert);

document.getElementById("titre").value = annonce.titre;
document.getElementById("description").value = annonce.description;
document.getElementById("prix").value = annonce.prix;
document.getElementById("ville").value = annonce.ville;
document.getElementById("categorie").value = annonce.categorie;
document.getElementById("telephone").value = annonce.telephone;

let imagesInput = document.getElementById("images");
let photosRow = document.getElementById("photos-row");
let photoCount = document.getElementById("photo-count");
let imageError = document.getElementById("image-error");

let imagesAnnonce = annonce.images || [annonce.image];

imageError.style.display = "none";

afficherPhotos();

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

    let inputs = document.querySelectorAll("form input, form textarea, form select");

    for (let i = 0; i < inputs.length; i++)
    {
        inputs[i].classList.remove("input-error");
    }
}

let btnModifier = document.getElementById("btn-modifier");

btnModifier.addEventListener("click", function()
{
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
        afficherErreur("Ajoutez au moins une photo avant d'enregistrer.");
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

    let annonceModifiee = {
        titre: titre.value.trim(),
        description: description.value.trim(),
        prix: prix.value,
        ville: ville.value.trim(),
        telephone: telephone.value.trim(),
        categorie: categorie.value,
        images: imagesAnnonce,
        image: imagesAnnonce[0],
        ownerEmail: annonce.ownerEmail,
        date: annonce.date
    };

    annonces[indexModifier] = annonceModifiee;

    localStorage.setItem("annonces", JSON.stringify(annonces));
    localStorage.removeItem("indexModifier");
    localStorage.setItem("successMessage", "Annonce modifiée avec succès.");

    window.location.href = "mes-annonces.html";
});
