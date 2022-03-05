import displayMessage from "./components/displayMessage.js";
import { getToken } from "./settings/storage.js"
import { cartCounter } from "./components/cartCounter.js";
import { baseUrl } from "./settings/api.js";
import createMenu from "./ui/createMenu.js";


createMenu();
cartCounter();

const form = document.querySelector("form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const message = document.querySelector(".message-container");
const featured = document.querySelector("#flexCheckDefault");
const image = document.querySelector("#inputGroupFile02")

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const nameValue = name.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const imgValue = image.files[0];
    let featuredValue = false;

    if(nameValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0 || imgValue.length === 0) {
        return displayMessage("warning", "Please supply proper values", ".message-container")
    }

    addProduct();
}

async function addProduct() {
    const url = baseUrl + "products";  
    const formData = new FormData();
    const formElements = form.elements;
    const data = {};

    for (let i = 0; i < formElements.length; i++) {
        const currentElement = formElements[i];
        if (!['submit', 'file'].includes(currentElement.type)) {
            if ( currentElement.type === "checkbox") {
                data[currentElement.name] = currentElement.checked ? currentElement.value : 0;
            } else {
                data[currentElement.name] = currentElement.value;
            }
        } else if (currentElement.type === 'file') {
            for (let i = 0; i < currentElement.files.length; i++) {
                const file = currentElement.files[i];
                formData.append(`files.${currentElement.name}`, file, file.name);
            }
        }
    }

    formData.append('data', JSON.stringify(data));

    const token = getToken();

    const options = {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        // form.reset();
        console.log(json);
        fetchProducts();
    }
    catch(error){
        console.log(error);
    }
} 


let products;

async function fetchProducts() {

    const productsUrl = baseUrl + "products";
    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        products = json;

        renderProducts(products);

    } catch (error) {
        console.log(error);
    }
};


function renderProducts(products) {
    
    const container = document.querySelector(".edit-products")

    container.innerHTML = "";

    products.forEach(function (product) {
        container.innerHTML += `<div class="product-container-edit">
                                    <a href="product.html?id=${product.id}">
                                    <img src="${product.image.url}" class="product-img-edit" alt="${product.image.alternativeText}">
                                    </a>
                                    <form class="form-margin editForm" id="${product.id}">
                                    <div class="message-container"></div>
                                    <div class="input-group upload mb-3">
                                        <input name="image" type="file" class="form-control edit" id="inputGroupFile02">
                                    </div>
                                    <div class="input-group upload mb-3">
                                        <input name="title" value="${product.title}" type="text" id="name" class="form-control edit" placeholder="title" aria-label="title" aria-describedby="basic-addon1">
                                      </div>
                                      <div class="input-group upload mb-3">
                                        <input name="price" value="${product.price}" type="text" id="price" class="form-control edit" placeholder="price" aria-label="price" aria-describedby="basic-addon1">
                                      </div>
                                      <div class="input-group upload">
                                        <textarea name="description" class="form-control edit" id="description" aria-label="With textarea" placeholder="description">${product.description}</textarea>
                                      </div>
                                      <div class="form-check">
                                        <input name="featured" class="form-check-input" type="checkbox" value="1" id="flexCheckDefault" ${product.featured && "checked"}>
                                        <label class="form-check-label" for="flexCheckDefault">
                                          set as featured product
                                        </label>
                                      </div>
                                      <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                        <button type="submit" class="btn btn-primary">save</button>
                                        <button type="button" class="btn btn-outline-primary deleteButton" data-id="${product.id}">delete</button>
                                  </form>            
                                </div>
                                         
        `
    });

    bindForms();
    bindDelete();
};

fetchProducts();


async function updateProduct(id, editForm) {
    const url = baseUrl + "products/" + id;  
    const formData = new FormData();
    const formElements = editForm.elements;
    const data = {};

    for (let i = 0; i < formElements.length; i++) {
        const currentElement = formElements[i];
        if (!['submit', 'file'].includes(currentElement.type)) {
            if ( currentElement.type === "checkbox") {
                data[currentElement.name] = currentElement.checked ? currentElement.value : 0;
            } else {
                data[currentElement.name] = currentElement.value;
            }
        } else if (currentElement.type === 'file') {
            for (let i = 0; i < currentElement.files.length; i++) {
                const file = currentElement.files[i];
                formData.append(`files.${currentElement.name}`, file, file.name);
            }
        }
    }

    formData.append('data', JSON.stringify(data));

    const token = getToken();

    const options = {
        method: "PUT",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        console.log(json);
        fetchProducts();
    }
    catch(error){
        console.log(error);
    }
} 

function bindForms() {
    const newForms = document.querySelectorAll(".editForm")   

    for (const key in newForms) {
        if (Object.hasOwnProperty.call(newForms, key)) {
            const element = newForms[key];
            element.addEventListener("submit", submitUpdateForms);
        }
    }
}

function submitUpdateForms(event) {
    event.preventDefault();
    message.innerHTML = "";

    updateProduct(event.target.id, event.target);
}

function bindDelete() {
    const deleteButtons = document.querySelectorAll(".deleteButton")   

    for (const key in deleteButtons) {
        if (Object.hasOwnProperty.call(deleteButtons, key)) {
            const element = deleteButtons[key];
            element.addEventListener("click", deleteProduct);
        }
    }
}

async function deleteProduct(event) {
    if (confirm("Are you sure you want to delete this product?")) {
        const id = this.dataset.id;
        console.log(id);
        const url = baseUrl + "products/" + id;  
    
        const token = getToken();
    
        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },
        };
    
        try {
            const response = await fetch(url, options);
            const json = await response.json();
    
            console.log(json);
            fetchProducts();
        }
        catch(error){
            console.log(error);
        }
        
    }
}