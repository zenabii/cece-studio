export function cartCounter(number) {
    document.getElementById("cartCount").innerHTML = "cart(" + number + ")";

}

cartCounter(JSON.parse(localStorage.getItem("favorites")).length);