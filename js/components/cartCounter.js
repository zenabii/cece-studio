export function cartCounter() {
    const number = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")).length : 0;
    document.getElementById("cartCount").innerHTML = "cart(" + number + ")";

}

cartCounter();