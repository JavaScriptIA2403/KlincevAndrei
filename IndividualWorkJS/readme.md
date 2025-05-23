# **Индивидуальная работа:** *Работа с динамическими каталогами сайта*

__Студент:__  *Клинчев Андрей IA2403*  
__Проверил:__  *Муринец Алексей*
__Консультировал__ *Нартя Никита*  
__Дата:__ 22.05.2025

*[Основная ветка репозитория](https://github.com/JavaScriptIA2403/KlincevAndrei/edit/main/IndividualWorkJS/)*

---

## 1. Инструкции по запуску проекта.

1. Необходимо сохранить папку индивидуальной работы в удобном месте на устройстве
2. Работу запустить через Visual Studio Code с расширением LiveServer.
3. В правом нижнем углу нужно запустить  `Go Live`
4. Открытие файла [`./index.html`](./index.html)  



## 2. Автор проекта.
Автором данной проекта явлеяеться Клинчев Андрей, студент 1-го курса факультета Математика и Информатика, государственного университета, группа IA2403 


## 3. Описание проекта. Цель. Основные функции. Код.

**Описание:**
- *Целью данного проекта яляеться желание автора, возраждения магазина посвящённого возраждению субкультыры "Вахалюбов" в Молдове. По этой причине было принято решение написать сайт-могазин посвящённый вселонной `Warhammer 40k`*

- *Основной функцией является динамическое отображение товаров каталога в зависимости от выранной категории товара*

**Программный код разделен на модули:**

- [`./main.js`](./main.js) - Условная точка входа в приложение, тут происходит вызов необходимых функция для редактирования html разметки, методы реагирования на действия пользователя.
- [`./js/catalog.js`](./js/catalog.js) - содержит массивы продуктов а также функции их имплиментирования в html код
- [`./js/displayHeadFoot.js`](./js/displayHeadFoot.js) - содерджит функции встраивания хэдера и футера на страницу. 
- [`./js/product.js`](./js/product.js) - получает данные из ссылки передаваемой при нажатии на товар и подставляет их на страницу. 

**Принцип работы кода:**

- Каждая HTML страница при прогрузке кода, заупускает файл [`./main.js`](./main.js), внутри которого запускаеться методы `displayFoot()` и`displayHeader()`, которыеотевтсвенны за отображение header и footer сайта. После происходит проверка если на текущей HTML странице присутствут блоки кода ответсвенные за отображение каталогов и если присутсвуют, то отображать сотвествующий каталог товара.

```js
import {renderCatalog, techCatalog,figCatalog,paintCatalog,booksCatalog} from './js/catalog.js'
import {displayFoot, displayHead, displayHeader} from './js/displayHeadFoot.js'

displayFoot()
displayHeader()

if (document.querySelector("#mechProducts")){
    renderCatalog("mechProducts", techCatalog);
}
if (document.querySelector("#figProducts")){
    renderCatalog("figProducts", figCatalog);
}
if (document.querySelector("#paintsProducts")){
    renderCatalog("paintsProducts", paintCatalog);
}
if (document.querySelector("#booksProducts")){
    renderCatalog("booksProducts", booksCatalog);
}
```
- Каталог и его функции, как уже говорилось выше, был реализован при помощи массивов объектов которые относяться к какому-либо типу товаров `techCatalog = [...obj]`, `paintCatalog = [...obj]`, `booksCatalog = [...obj]`, `figCatalog=[...obj]` также содаржит 2 главные функции а именно: функция которая возвращает HTML блок товара , с подставленными полями объекта `createProductCard(product)`, а также `renderCatalog(sectionId, items)`, которая проверяет если секция с `id` из `sectionId` есть на странице, и если есть, вызывает функци `createProductCard(product)` для каждого элемента из `item`

```js
/**
 * Создаёт HTML-разметку карточки товара.
 * 
 * @param {Object} product - Объект товара.
 * @param {string} product.name - Название товара.
 * @param {string} product.image - Путь к изображению товара.
 * @param {number|string} product.price - Цена товара.
 * @returns {string} HTML-строка карточки товара.
 */
 function createProductCard(product) {
    return ` 
    <div class="product_plate">
        <a href="http://127.0.0.1:5500/product.html?name=${encodeURIComponent(product.name)}">
            <div class="product_image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product_info">
                <h2>${product.name}</h2>
            </div>
            <div class="product_coast_buy">
                <h3 style="float:left;">${product.price} MDL</h3>
                <button><img src="image/add_cart_icon.png" alt="Добавить в корзину"></button>
            </div>
        </a>
    </div>
    `;
}

/**
 * Отображает каталог товаров в указанном разделе.
 * 
 * @param {string} sectionId - ID HTML-элемента, в который будет вставлен каталог.
 * @param {Array<Object>} items - Массив объектов товаров.
 */
export function renderCatalog(sectionId, items) {
    const container = document.getElementById(sectionId);
    if (container) {
        container.innerHTML = items.map(createProductCard).join("");
    }
}
```

- При загрузки HTML страницы товара, запускается скрипт [`./js/product.js`](./js/product.js). Из ссылки тоовара, вычленяеться параметр товара `name`, по которому будет происзодить поиск товаров из всех массивов с соответсвующим именем. А затем, поля товара с этим именем, заносятья в блоки кода c соответсвующими `id`
  ```js
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
  ```

## 4. Скриншоты. Готовые результаты
### 1. Скрин 1 (Основная страница магазина, каталог содержащий все продукты)
![(Основная страница магазина, каталог содержащий все продукты)](image/request/Screenshot_1.png)
### 2. Скрин 2 (Страница каталога красок)
![(Страница каталога красок)](image/request/Screenshot_3.png)
### 3. Скрин 3 (Страница товара, в которую динамически подставляються все значения)
![(Страница товара, в которую динамически подставляються все значения)](image/request/Screenshot_2.png)


## 5. Список источников.

[Основная информация о DOM дереве](https://learn.javascript.ru/dom-nodes)

[Общие сведенья по языку JS](https://github.com/MSU-Courses/javascript/tree/main/docs)

[Решение триваильных задач различного плана. Например, передачапараметров через ссылку](ru.stackoverflow.com/questions/)

[Обучающие материалы по JS (W3Schools)](https://www.w3schools.com/js/default.asp)
