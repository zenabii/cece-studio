import { baseUrl } from "../settings/api.js";
import { displayMessage } from "../components/displayMessage.js";

function renderProducts(products) {

    console.log(products)
    
    const container = document.querySelector(".all-products")

    container.innerHTML = "";

    products.forEach(function (product) {
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

};

export default renderProducts
