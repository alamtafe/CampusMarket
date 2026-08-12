let listeAnnonces = document.getElementById("annonces-container");

let annonces = JSON.parse(localStorage.getItem("annonces")) || [];

function afficherAnnonces(data)
{
    listeAnnonces.innerHTML = "";

    for (let i = 0; i < data.length; i++)
    {   
        listeAnnonces.innerHTML += `
            <div class="annonce">
                <h3>${data[i].titre}</h3>
                <p>${data[i].prix} DH</p>
                <p>${data[i].description}</p>
                <p>${data[i].ville}</p>
                <p>${data[i].categorie}</p>
                <a href="tel:${data[i].telephone}">Contacter le vendeur</a>
                <a href="whatsapp://send?phone=${data[i].telephone}">WhatsApp</a>
            </div>
        `;
    }
}
afficherAnnonces(annonces);
