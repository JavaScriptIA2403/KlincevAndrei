import * as item from './classes.js'

import * as inventory from './inventroy.js'
import { writeFromFormItem, clearAddingForm} from './ui.js';

let iventTable = document.querySelector('#inventroryTable');



let panelToAddActive = false;

let addButton = document.querySelector("#submitFormAdding")
addButton.addEventListener('click', () =>{ writeFromFormItem(); 
    if (panelToAddActive){
        document.querySelector('#inputNewItemBlock').style.visibility = "hidden";
        panelToAddActive = false;    
    }
        console.log(panelToAddActive) });


document.getElementById('itemCategory').addEventListener('change', function () {
    const damageField = document.getElementById('damageField');
    const selectedCategory = this.value;
    
    if (selectedCategory === 'weapon') {
    damageField.style.visibility = 'visible';
    } else {
    damageField.style.visibility = 'hidden';
    }
    });

document.querySelector("#clearFormAdding").addEventListener('click',() => {
    clearAddingForm()
    if (panelToAddActive){
        document.querySelector('#inputNewItemBlock').style.visibility = "hidden";
        panelToAddActive = false;    
    }
        console.log(panelToAddActive)
});

let addNewItemToTable = document.querySelector("#addNewItem");

addNewItemToTable.addEventListener('click',() =>{
    if (!panelToAddActive){
        document.querySelector('#inputNewItemBlock').style.visibility = "visible";
        panelToAddActive = true;
    }
    console.log(panelToAddActive)
});

    
    inventroryTable.addEventListener('click', (event) => {
        const cell = event.target.closest('.delleteOfCell');
        if (cell) {
            let row = cell.closest('tr');
            console.log("Clicked row:", row, "It's id:", row.rowIndex);
            
        }
    });

