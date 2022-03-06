import { baseUrl } from "./settings/api.js";
import { getExistingProducts, saveFavs } from "./ui/FavFunctions.js";
import createMenu from "./ui/createMenu.js";
import { cartCounter } from "./components/cartCounter.js";
import footer from "./components/footer.js";

createMenu();
footer();
cartCounter();

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const productImg = document.querySelector(".product-img-container")
const productName = document.querySelector(".product-name")
const productPrice = document.querySelector(".product-price")
const productDescription = document.querySelector(".details")
const addToCart = document.querySelector(".button-container")
const productUrl = baseUrl + "products/" + productId;

async function getProduct(productUrl) {
    const favorites = getExistingProducts();
    const response = await fetch(productUrl);
    const product = await response.json();
    let cssClass = "far-solid fa-heart "
    let buttonText = "add to cart";
    const doesObjectExist = favorites.find(function(fav) {
        return parseInt(fav.id) == product.id;
    });
    if(doesObjectExist) {
        cssClass = "fa-solid fa-xmark"
        buttonText = "Remove"
    }
    document.title =`${product.title}`;
    productImg.innerHTML = `<img src="${product.image.url}" id="productImg" class="d-block w-100" alt="${product.image.alternativeText}">`;
    productName.innerHTML= product.title;
    productPrice.innerHTML = product.price + "NOK";
    productDescription.innerHTML = product.description;
    addToCart.innerHTML = `<a href="#" class="shopButtonBlack" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-img="${product.image.url}">${buttonText}<i class="${cssClass} fa-2x"></i></a>`;
    addProductToCart();
};

getProduct(productUrl);

function addProductToCart() {
    const cartButton = document.querySelectorAll(".button-container a");
    cartButton.forEach((button) => {
        button.addEventListener("click", handleClick);
    });
};

function handleClick() {
    this.children[0].classList.toggle("fa-solid");
    this.children[0].classList.toggle("far-solid");
    const title = this.dataset.title;
    const price = this.dataset.price;
    const img = this.dataset.img;
    const id = this.dataset.id;
    const currentFavs = getExistingProducts();
    const productExists = currentFavs.find(function(fav) {
        return fav.title === title;
    });
    if(productExists === undefined) {
        const favProduct = { id: id, title: title, price: price, img: img};
        currentFavs.push(favProduct);
        saveFavs(currentFavs)
    }
    else {
        const newFavs = currentFavs.filter(fav => fav.title !== title);
        saveFavs(newFavs);
    }
    getProduct(productUrl);
    cartCounter(JSON.parse(localStorage.getItem("favorites")).length);
};

