import displayMessage from "./displayMessage.js";

export default function footer() {
    const footerContainer = document.querySelector("footer");
    try {
        footerContainer.innerHTML = `<div class="footer-grid">
                                        <div class="footer-flex-left">
                                            <h3 class="white-style">who are we?</h3>
                                            <p class="footer-paragraph">
                                                CECE Stuido is a high end sneaker store for literally anyone! 
                                                We aim for a high standard in the products we sell and the service
                                                provided to all of our customers. Can't find the shoes you're looking for?
                                                Contact us and we'll personally order a pair for you!              
                                            </p>
                                        </div>
                                        <div class="footer-flex-right">
                                            <a href="index.html"><img src="img/logo-white.svg" alt="white cece studio logo" class="white-logo"></a>
                                        </div>
                                    </div>`
    } catch (error) {
        console.log(error);
        footerContainer.innerHTML = displayMessage("error", error);
    }
}