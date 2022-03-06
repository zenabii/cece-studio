import renderProducts from "../ui/renderProducts.js"

export function searchProducts(products) {
    const search = document.querySelector(".search");
    search.onkeyup = function(event) {
        const searchValue = event.target.value.trim().toLowerCase();
        const searchProducts = products.filter(function(product) {
            if(product.title.toLowerCase().includes(searchValue)) {
                return true;
            }
        })
        renderProducts(searchProducts);
    };
}