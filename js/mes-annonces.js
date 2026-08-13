let zoneMesAnnonces = document.getElementById("mes-annonces");
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let annonces = JSON.parse(localStorage.getItem("annonces")) || [];

if (!currentUser)
{
    window.location.href = "index.html";
}

let mesAnnonces = [];

for (let i = 0; i < annonces.length; i++)
{
    if (annonces[i].ownerEmail === currentUser.email)
    {
        mesAnnonces.push(i);
    }
}

if (mesAnnonces.length === 0)
{
    zoneMesAnnonces.innerHTML = `
        <div class="empty empty-large">
            <i class="fa-solid fa-clipboard-list"></i>
            <h3>Vous n'avez aucune annonce</h3>
            <p>Publiez votre première annonce et commencez à vendre sur CampusMarket.</p>
            <a href="ajouter-annonce.html">Publier une annonce</a>
        </div>
    `;
}

for (let k = 0; k < mesAnnonces.length; k++)
{
    let i = mesAnnonces[k];
    let imagePrincipale = annonces[i].image || (annonces[i].images && annonces[i].images[0]) || "";

    zoneMesAnnonces.innerHTML += `
        <div class="annonce">

            <img class="annonce-img" src="${imagePrincipale}" alt="Image">

            <div class="annonce-body">

                <span class="annonce-date">
                    ${annonces[i].date || ""}
                </span>

                <h3>${annonces[i].titre}</h3>

                <p class="annonce-description">
                    ${annonces[i].description}
                </p>

                <p>
                    <i class="fa-solid fa-location-dot"></i>
                    ${annonces[i].ville}
                </p>

                <p>
                    <i class="fa-solid fa-tag"></i>
                    ${annonces[i].categorie}
                </p>

                <span class="prix-badge">
                    ${annonces[i].prix} DH
                </span>

                <div class="actions">

                    <button class="btn-modifier" data-index="${i}">
                        <i class="fa-solid fa-pen"></i>
                        Modifier
                    </button>

                    <button class="btn-supprimer" data-index="${i}">
                        <i class="fa-solid fa-trash"></i>
                        Supprimer
                    </button>

                </div>

            </div>

        </div>
    `;
}

let indexASupprimer = null;

let btnSupprimer = document.querySelectorAll(".btn-supprimer");

for (let i = 0; i < btnSupprimer.length; i++)
{
    btnSupprimer[i].addEventListener("click", function()
    {
        indexASupprimer = this.getAttribute("data-index");

        document.getElementById("popup-supprimer").style.display = "flex";
    });
}

let annulerSupprimer = document.getElementById("annuler-supprimer");
let confirmerSupprimer = document.getElementById("confirmer-supprimer");

if (annulerSupprimer)
{
    annulerSupprimer.addEventListener("click", function()
    {
        document.getElementById("popup-supprimer").style.display = "none";
    });
}

if (confirmerSupprimer)
{
    confirmerSupprimer.addEventListener("click", function()
    {
        annonces.splice(indexASupprimer, 1);

        localStorage.setItem("annonces", JSON.stringify(annonces));
        localStorage.setItem("successMessage", "Annonce supprimée avec succès.");

        location.reload();
    });
}

let btnModifier = document.querySelectorAll(".btn-modifier");

for (let i = 0; i < btnModifier.length; i++)
{
    btnModifier[i].addEventListener("click", function()
    {
        let index = this.getAttribute("data-index");

        localStorage.setItem("indexModifier", index);

        window.location.href = "modifier-annonce.html";
    });
}
