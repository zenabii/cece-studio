export default function renderProducts(products) {
    const container = document.querySelector(".all-products")
    container.innerHTML = "";
    products.forEach(function (product) {
        container.innerHTML += `<div class="product-container">
                                    <a href="product.html?id=${product.id}">
                                        <img src="${product.image.url}" class="product-img" alt="${product.image.alternativeText != null ? product.image.alternativeText : "picture of " + product.title}">
                                    </a>
                                    <div class="product-info-container">
                                        <div class="product-info">
                                            <a href="product.html?id=${product.id}" class="product-title">${product.title}</a>
                                            <a href="product.html?id=${product.id}" class="product-title">${product.price} NOK</a>
                                        </div>
                                    </div>              
                                </div>`
    });
};