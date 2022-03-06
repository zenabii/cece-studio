import { getUserName, logout } from "../settings/storage.js";

export default function createMenu() {
    const { pathname } = document.location;    
    const container = document.querySelector(".menu-container");
    const username = getUserName();
    let authLink = `<a class="nav-link text-uppercase ${pathname === "/login.html" ? "active" : ""}" aria-current="page" href="login.html">login</a>`;
    let logoutLink = ``;
    if(username) {
        authLink = `<a class="nav-link text-uppercase ${pathname === "/admin.html" ? "active" : ""}" aria-current="page" href="admin.html">admin</a>`
        logoutLink = `<li><a class="nav-link text-uppercase ${pathname === "/index.html" ? "active" : ""}" id="logout" aria-current="page" href="index.html">logout</a></li>`
    }
    container.innerHTML = `<nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light d-flex ">
                                <div class="container-fluid">
                                    <a href="index.html"><img src="img/logo-black.svg" alt="black cece studio logo" class="img_logo"></a>
                                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                        <span class="navbar-toggler-icon"></span>
                                    </button>
                                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                                        <ul class="navbar-nav navbar-nav-scroll">
                                            <li class="nav-item">
                                                <a class="nav-link text-uppercase ${pathname === "/index.html" ? "active" : ""}" href="index.html">home</a>
                                                </li>
                                            <li class="nav-item">
                                                <a class="nav-link text-uppercase ${pathname === "/products.html" ? "active" : ""}" href="products.html">products</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link text-uppercase ${pathname === "/cart.html" ? "active" : ""}" href="cart.html" id="cartCount"></a>
                                            </li>
                                            <li class="nav-item">
                                                ${authLink}
                                            </li>
                                            ${logoutLink}
                                        </ul>
                                    </div>
                                </div>
                            </nav>`
    const logoutButton = document.querySelector("#logout");
    if(logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
}

