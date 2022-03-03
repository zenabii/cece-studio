import { getExistingProducts } from "./ui/FavFunctions.js";

const favorites = getExistingProducts();

const productContainer = document.querySelector(".all-products");
const titleContainer = document.querySelector(".title-section");

if(favorites.length === 0) {
    titleContainer.innerHTML += `<hr>
                                <h3>
                                cart is empty
                                </h3>
                                <hr>`
} else {
    titleContainer.innerHTML += `<hr>
                                <h3>
                                your products
                                </h3>
                                <hr>`
}

favorites.forEach(favorite => {
    productContainer.innerHTML += `<div class="product-container">
                                <a href="product.html?id=${favorite.id}">
                                <img src="${favorite.img}" class="product-img" alt="">
                                </a>
                                <div class="product-info-container">
                                    <div class="product-info">
                                        <a href="product.html?id=${favorite.id}" class="product-title">${favorite.title}</a>
                                        <a href="product.html?id=${favorite.id}" class="product-title">${favorite.price} NOK</a>
                                    </div>
                                    <div class="product-info">
                                    <i class="fa-solid fa-heart fa-2x" data-id="${favorite.id}" data-title="${favorite.title}" data-price="${favorite.price}" data-img="${favorite.img}"></i>
                                    </div>
                                </div>              
                            </div>          
                                `
})


