import { baseUrl } from "./settings/api.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const productImg = document.querySelector(".product-img-container")
const productName = document.querySelector(".product-name")
const productPrice = document.querySelector(".product-price")
const productDescription = document.querySelector(".details")


const productUrl = baseUrl + "products/" + productId;

async function getProduct(productUrl) {
    const response = await fetch(productUrl);
    const product = await response.json();

    document.title =`${product.title}`;
    productImg.innerHTML = `<img src="${product.image.formats.large.url}" id="productImg" class="d-block w-100" alt="${product.image.alternativeText}">`;
    productName.innerHTML= product.title;
    productPrice.innerHTML = product.price + "NOK";
    productDescription.innerHTML = product.description;


}

getProduct(productUrl);
