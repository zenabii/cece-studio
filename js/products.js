import { baseUrl } from "./settings/api.js";
import renderProducts from "./ui/renderProducts.js";
import { searchProducts } from "./components/searchProducts.js";
import createMenu from "./ui/createMenu.js";
import { cartCounter } from "./components/cartCounter.js";
import footer from "./components/footer.js";

createMenu();
footer();

let products;

async function fetchProducts() {

    const productsUrl = baseUrl + "products";
    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        products = json;
        renderProducts(products);
        searchProducts(products);

    } catch (error) {
        console.log(error);
        container.innerHTML = displayMessage("error", error);
    }
    cartCounter();

};

fetchProducts();
