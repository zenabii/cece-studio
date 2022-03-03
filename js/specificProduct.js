import { baseUrl } from "./settings/api.js";
import { getExistingProducts } from "./ui/FavFunctions.js";


const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const productImg = document.querySelector(".product-img-container")
const productName = document.querySelector(".product-name")
const productPrice = document.querySelector(".product-price")
const productDescription = document.querySelector(".details")
const addToCart = document.querySelector(".button-container")

const favorites = getExistingProducts();

const productUrl = baseUrl + "products/" + productId;

async function getProduct(productUrl) {
    const response = await fetch(productUrl);
    const product = await response.json();

    let cssClass = "fa-solid"

    //check favs through array
    //does id already exist in the favs array
    const doesObjectExist = favorites.find(function(fav) {
        console.log(fav)

        return parseInt(fav.id) === product.id;
    });

    console.log(doesObjectExist);

    if(doesObjectExist) {
        let cssClass = "fa-solid"
    }

    document.title =`${product.title}`;
    productImg.innerHTML = `<img src="${product.image.formats.large.url}" id="productImg" class="d-block w-100" alt="${product.image.alternativeText}">`;
    productName.innerHTML= product.title;
    productPrice.innerHTML = product.price + "NOK";
    productDescription.innerHTML = product.description;
    addToCart.innerHTML = `<a href="#" class="shopButtonBlack">add to cart <i class="${cssClass} fa-heart fa-2x" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-img="${product.image.formats.large.url}"></i></a>`;


    addProductToCart();
};

getProduct(productUrl);



function addProductToCart() {
    const cartButton = document.querySelectorAll(".button-container i");

    cartButton.forEach((button) => {
        button.addEventListener("click", handleClick);
    });
};

function handleClick() {
    this.classList.toggle("fa-solid");
    this.classList.toggle("far-solid");


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

};



function saveFavs(favs) {
    localStorage.setItem("favorites", JSON.stringify(favs));
}