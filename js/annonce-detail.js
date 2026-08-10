let index = localStorage.getItem("annonceDetail");

let annonces = JSON.parse(localStorage.getItem("annonces")) || [];

let annonce = annonces[index];

let detail = document.getElementById("detail-annonce");

if (!annonce)
{
    detail.innerHTML = `
        <div class="empty empty-large detail-empty">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <h3>Annonce introuvable</h3>
            <p>Cette annonce n'existe plus ou a été supprimée.</p>
            <a href="index.html">Retour à l'accueil</a>
        </div>
    `;
}
else
{
    let images = annonce.images || [annonce.image];

    detail.innerHTML = `
        <section class="detail-card">

            <div class="detail-gallery">

                <img id="main-detail-image" class="main-detail-image" src="${images[0]}">

                <div class="detail-thumbnails">
                    ${images.map(function(img, i)
                    {
                        return `
                            <img class="detail-thumb ${i === 0 ? "active-thumb" : ""}"
                                 src="${img}"
                                 data-index="${i}">
                        `;
                    }).join("")}
                </div>

            </div>

            <div class="detail-info">

                <span class="annonce-date">
                    Publié le ${annonce.date || ""}
                </span>

                <h1>${annonce.titre}</h1>

                <span class="detail-prix">
                    ${annonce.prix} DH
                </span>

                <p class="detail-description">
                    ${annonce.description}
                </p>

                <div class="detail-meta">
                    <p>
                        <i class="fa-solid fa-location-dot"></i>
                        ${annonce.ville}
                    </p>

                    <p>
                        <i class="fa-solid fa-tag"></i>
                        ${annonce.categorie}
                    </p>

                    <p>
                        <i class="fa-solid fa-phone"></i>
                        ${annonce.telephone}
                    </p>
                </div>

                <div class="actions detail-actions">

                    <a class="btn-whatsapp"
                       href="https://wa.me/212${annonce.telephone}"
                       target="_blank">
                        <i class="fa-brands fa-whatsapp"></i>
                    </a>

                    <a class="btn-call"
                       href="tel:${annonce.telephone}">
                        <i class="fa-solid fa-phone"></i>
                        Contacter le vendeur
                    </a>

                </div>

            </div>

        </section>
    `;

    let mainImage = document.getElementById("main-detail-image");
    let thumbs = document.querySelectorAll(".detail-thumb");

    for (let i = 0; i < thumbs.length; i++)
    {
        thumbs[i].addEventListener("click", function()
        {
            mainImage.src = this.src;

            for (let j = 0; j < thumbs.length; j++)
            {
                thumbs[j].classList.remove("active-thumb");
            }

            this.classList.add("active-thumb");
        });
    }
}
