export let inventory = new Array();



export function addItemToInventory(item){
    inventory.push(item);
}


export function removeItemFromInventoryById(fid)
    {
        inventory.splice(inventory.findIndex(item => item.id ==fid), 0);        
    }

export function getItemCount(){
    return inventory.length;
}


