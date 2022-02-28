import { baseUrl } from "./settings/api.js";

const productsUrl = baseUrl + "products";

(async function() {

    const container = document.querySelector(".all-products")

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        container.innerHTML = "";

        json.forEach(function (product) {
            container.innerHTML += `<div class="product-container">
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
    }

})();