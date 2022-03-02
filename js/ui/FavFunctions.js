export function getExistingProducts() {

    const favs = localStorage.getItem("favorites");

    if(!favs) {
        return [];
    }
    else{
        return JSON.parse(favs);
    }
}