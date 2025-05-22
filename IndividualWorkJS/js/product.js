import { techCatalog, paintCatalog, booksCatalog, figCatalog } from './catalog.js';

        const params = new URLSearchParams(window.location.search);
        const name = params.get("name");

        const allItems = [...techCatalog, ...paintCatalog, ...booksCatalog, ...figCatalog];
        const product = allItems.find(item => item.name === name);

        if (product) {
            document.getElementById("product-name").textContent = product.name;
            document.getElementById("product-price").textContent = `${product.price} MDL`;
            document.getElementById("product-image").src = product.image;
            document.getElementById("product-image").alt = product.name;
            document.getElementById("product-image").title = product.name;
            document.getElementById("product-description").textContent = product.description;
        } else {
            document.querySelector('.product_contetnt').innerHTML = "<h2>Товар не найден.</h2>";
        }