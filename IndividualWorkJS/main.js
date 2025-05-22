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

