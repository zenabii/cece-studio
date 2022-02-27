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
                                        <img src="${product.image.formats.medium.url}" class="product-img" alt="${product.image.alternativeText}">
                                        <div class="product-info">
                                            <a href="" class="product-title">${product.title}</a>
                                            <a href="" class="product-title">${product.price} NOK</a>
                                        </div>
                                    </div>
            
            `
        });


    } catch (error) {
        console.log(error);
    }

})();