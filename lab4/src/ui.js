import * as item from './classes.js'
import * as inventory from './inventroy.js'
import {randomingID} from './utils.js'

let damage =0;


let table  = document.querySelector("#inventroryTable");

let feeldsToAdd = [
        document.getElementById("itemName"),
        document.getElementById("itemCategory"),
        document.getElementById("itemRarity"),
        document.getElementById("itemDescription"),
        document.getElementById("itemDamage")];

export function clearAddingForm(){
    feeldsToAdd.forEach(item => item.value ='');
}


export function writeFromFormItem(){
    
    if (feeldsToAdd[4].style.visibility == "hidden")
    {
        inventory.inventory.push(new item.Item(randomingID(),feeldsToAdd[0].value,feeldsToAdd[1].value,feeldsToAdd[2].value,feeldsToAdd[3].value));
    }
    else{
        inventory.inventory.push(new item.Weapon(randomingID(),feeldsToAdd[0].value,feeldsToAdd[1].value,feeldsToAdd[2].value,feeldsToAdd[3].value,feeldsToAdd[4].value));
    }
    console.log(inventory.inventory[0].getInfo());
    clearAddingForm();

    while (table.rows.length > 2) {
        table.deleteRow(1);
    }

    inventory.inventory.forEach((item, index) => {
        
        
        let row = table.insertRow(1+index);

        for (let i = 1 ; i<4; i++){
            let cell = row.insertCell();
            cell.textContent = Object.values(item)[i];
        }


        let delCell = row.insertCell();
        delCell.className = "delleteOfCell"
        delCell.textContent = 'Удалить';
        delCell.style.textAlign = "center";
        

        console.log(item.rarity);
        if (item.rarity ==='legendary'){
            row.style.backgroundColor = "yellow";
        }
    });
}
/*
inventory.inventory.forEach(item, index => {
    let row = table.insertRow(1+index);

    for (let i = 1 ; i<3; i++){
        let cell = row.insertCell();
        cell.textContent = Object.values(item)[i]
    }
});
*/



        /*
        Object.values(item).forEach(feeld, index => {
            if (index = 0){continue};
            let cell = row.insertCell();
            cell.textContent = feeld;
        });
        */
        //firstElementChild  - первый детёнышь
        //nextElementSibling  - следующий элемент