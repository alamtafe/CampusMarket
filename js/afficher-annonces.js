let listeAnnonces = document.getElementById("liste-annonces");
let search = document.getElementById("search");
let totalAnnonces = document.getElementById("total-annonces");

let annonces = JSON.parse(localStorage.getItem("annonces")) || [];

if (totalAnnonces)
{
    totalAnnonces.textContent = annonces.length;
}

function afficherAnnonces(data)
{
    if (!listeAnnonces)
    {
        return;
    }

    listeAnnonces.innerHTML = "";

    if (data.length === 0)
    {
        listeAnnonces.innerHTML = `
            <div class="empty empty-large">
                <i class="fa-solid fa-box-open"></i>
                <h3>Aucune annonce trouvée</h3>
                <p>Essayez une autre recherche ou publiez la première annonce.</p>
                <a href="#" id="btn-publier-home">Publier une annonce</a>
            </div>
        `;
        return;
    }

    for (let i = 0; i < data.length; i++)
    {
        let originalIndex = annonces.indexOf(data[i]);
        let imagePrincipale = data[i].image || (data[i].images && data[i].images[0]) || "";

        listeAnnonces.innerHTML += `
            <div class="annonce" data-index="${originalIndex}">

                <img class="annonce-img" src="${imagePrincipale}" alt="Image de l'annonce">

                <div class="annonce-body">

                    <span class="annonce-date">
                        ${data[i].date || ""}
                    </span>

                    <h3>${data[i].titre}</h3>

                    <p class="annonce-description">
                        ${data[i].description}
                    </p>

                    <p>
                        <i class="fa-solid fa-location-dot"></i>
                        ${data[i].ville}
                    </p>

                    <p>
                        <i class="fa-solid fa-tag"></i>
                        ${data[i].categorie}
                    </p>

                    <span class="prix-badge">
                        ${data[i].prix} DH
                    </span>

                    <div class="actions">

                        <a class="btn-whatsapp" href="https://wa.me/212${data[i].telephone}" target="_blank">
                            <i class="fa-brands fa-whatsapp"></i>
                        </a>

                        <a class="btn-call" href="tel:${data[i].telephone}">
                            <i class="fa-solid fa-phone"></i>
                            Contacter
                        </a>

                    </div>

                </div>

            </div>
        `;
    }

    activerDetailsCards();
}

function activerDetailsCards()
{
    let cards = document.querySelectorAll(".annonce");

    for (let i = 0; i < cards.length; i++)
    {
        cards[i].addEventListener("click", function(event)
        {
            if (event.target.closest("a") || event.target.closest("button"))
            {
                return;
            }

            let index = this.getAttribute("data-index");

            localStorage.setItem("annonceDetail", index);

            window.location.href = "annonce-detail.html";
        });
    }
}

afficherAnnonces(annonces);

if (search)
{
    search.addEventListener("input", function()
    {
        let texte = search.value.toLowerCase();

        let resultat = [];

        for (let i = 0; i < annonces.length; i++)
        {
            if (annonces[i].titre.toLowerCase().includes(texte))
            {
                resultat.push(annonces[i]);
            }
        }

        afficherAnnonces(resultat);
    });
}

let categories = document.querySelectorAll(".categorie");

for (let i = 0; i < categories.length; i++)
{
    categories[i].addEventListener("click", function(event)
    {
        event.preventDefault();

        let categorieChoisie = categories[i].dataset.category;
        let resultat = [];

        for (let j = 0; j < annonces.length; j++)
        {
            if (annonces[j].categorie === categorieChoisie)
            {
                resultat.push(annonces[j]);
            }
        }

        afficherAnnonces(resultat);
    });
}
