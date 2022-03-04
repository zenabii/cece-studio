import { baseUrl } from "../settings/api.js";
import displayMessage from "../components/displayMessage.js";


async function heroBanner() {
    
    const bannerUrl = baseUrl + "home?id=1";
    const heroContainer = document.querySelector(".img-header")
    heroContainer.innerHTML = "";

    try {
        const bannerResponse = await fetch(bannerUrl);
        const bannerJson = await bannerResponse.json();


        heroContainer.innerHTML = `<img src="${bannerJson.hero_banner.formats.large.url}" alt="${bannerJson.hero_banner.alternativeText}" class="top-img">
                                    <div class="title-padding"><h1 class="white-style">new arrivals</h1></div>
                                    <div class="header-padding">
                                        <h2>SS22</h2>
                                        <p class="text-wrap">Lorem ipsum dolor sit amet, adipiscing elit. Proin dictum purus in tempor. Duis ante.</p>
                                        <a href="products.html" class="shopButton">shop now</a>
                                    </div>
                                                            
        `
    } catch (error) {
        console.log(error);
        heroContainer.innerHTML = displayMessage("error", error);
    }
};

export default heroBanner()