import { baseUrl } from "../settings/api.js";
import displayMessage from "../components/displayMessage.js";

async function featuredProducts() {
    const productsUrl = baseUrl + "products?featured=true";
    const container = document.querySelector(".featured-content")
    container.innerHTML = "";
    try {
        const response = await fetch(productsUrl);
        const json = await response.json();
        json.forEach(function (product) {
            container.innerHTML += `<div class="product-container">
                                        <a href="product.html?id=${product.id}">
                                            <img src="${product.image.url}" class="product-img" alt="${product.image.alternativeText != null ? product.image.alternativeText : "picture of " + product.title}">
                                        </a>
                                        <div class="product-info-container">
                                            <div class="product-info">
                                                <a href="product.html?id=${product.id}" class="product-title">${product.title}</a>
                                                <a href="product.html?id=${product.id}" class="product-title">${product.price} NOK</a>
                                            </div>
                                        </div>                                      
                                    </div>`
        });
    } catch (error) {
        console.log(error);
        container.innerHTML = displayMessage("error", error);
    }
};

export default featuredProducts()