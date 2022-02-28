import { baseUrl } from "./settings/api.js";

const productsUrl = baseUrl + "products?featured=true";

(async function() {

    const container = document.querySelector(".featured-content")

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        container.innerHTML = "";

        json.forEach(function (product) {
            container.innerHTML += `<div class="featured-product-container">
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

const bannerUrl = baseUrl + "home?id=1";

(async function() {

    const heroContainer = document.querySelector(".img-header")

    try {
        const bannerResponse = await fetch(bannerUrl);
        const bannerJson = await bannerResponse.json();

        heroContainer.innerHTML = "";

        heroContainer.innerHTML = `<img src="${bannerJson.hero_banner.formats.large.url}" alt="${bannerJson.hero_banner.alternativeText}" class="top-img">
                                    <div class="title-padding"><h1 class="white-style">new arrivals</h1></div>
                                    <div class="header-padding">
                                        <h2>SS22</h2>
                                        <p class="text-wrap">Lorem ipsum dolor sit amet, adipiscing elit. Proin dictum purus in tempor. Duis ante.</p>
                                        <a href="products.html" class="shopButton">shop now</a>
                                    </div>
                                                            
        `

    } catch (error) {
        console.log(error);
    }

})();