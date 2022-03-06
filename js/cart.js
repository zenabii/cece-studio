import { getExistingProducts, saveFavs } from "./ui/FavFunctions.js";
import { cartCounter } from "./components/cartCounter.js";
import createMenu from "./ui/createMenu.js";

createMenu();
cartCounter();

const favorites = getExistingProducts();

const productContainer = document.querySelector(".all-products");
const titleContainer = document.querySelector(".title-section");
const priceContainer = document.querySelector(".price");


function createCart(renderFavs) {
    productContainer.innerHTML = ``

    let total = 0;

    renderFavs.forEach(favorite => {
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
                                                <i class="fa-solid fa-xmark fa-3x" data-id="${favorite.id}"></i>
                                            </div>
                                            </div>              
                                        </div>          
                                        `
        total += parseFloat(favorite.price); 
    })
 
    if(renderFavs.length === 0) {
        titleContainer.innerHTML += `<hr />
                                    <h3>
                                    cart is empty
                                    </h3>
                                    <hr />`
        priceContainer.innerHTML = "";
    
    } else {
        titleContainer.innerHTML += `<hr />
                                    <h3>
                                    your products
                                    </h3>
                                    <hr />`
        priceContainer.innerHTML = `<hr />
                                    <h5>
                                    Total price
                                    </h5>
                                    ${total} NOK
                                    <hr />`;                         
    }
}


createCart(favorites);

let listItems = [];

const deleteProduct = document.querySelectorAll(".product-info i");

deleteProduct.forEach(function(can) {
    can.addEventListener("click", removeFromList);
})

function removeFromList(event) {

    const deleteThisProduct = event.target.dataset.id;

    const newList = listItems.filter(function(item) {
        if(deleteThisProduct !== item.id) {
            return true;
        }
    })

    listItems = newList;

    createCart(listItems);
    saveFavs(listItems);
    cartCounter();
}