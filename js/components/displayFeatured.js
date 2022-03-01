import { baseUrl } from "../settings/api.js";
import { displayMessage } from "./displayMessage.js";

const productsUrl = baseUrl + "products?featured=true";

async function featuredProducts() {

    const container = document.querySelector(".featured-content")
    container.innerHTML = "";

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        json.forEach(function (product) {
            container.innerHTML += `<div class="featured-product-container">
                                        <a href="product.html?id=${product.id}">
                                        <img src="${product.image.formats.medium.url}" class="product-img" alt="${product.image.alternativeText}">
                                        </a>
                                        <div class="product-info-container">
                                            <div class="product-info">
                                                <a href="product.html?id=${product.id}" class="product-title">${product.title}</a>
                                                <a href="product.html?id=${product.id}" class="product-title">${product.price} NOK</a>
                                            </div>
                                            <div class="product-info">
                                            <i class="fa-regular fa-heart fa-2x"></i>
                                            </div>
                                        </div>                                      
                                    </div>
            
            `
        });

    } catch (error) {
        console.log(error);
        container.innerHTML = displayMessage("error", error);
    }

};

export default featuredProducts()