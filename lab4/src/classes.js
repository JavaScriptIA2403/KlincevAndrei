export class Item{
    id;
    name;
    category; 
    rarity;
    description;
    constructor(id, name, category,rarity,description){
        this.id = id;
        this.name = name;
        this.category = category;
        this.rarity = rarity;
        this.description = description;        
    }

    getInfo() {
        return `ID ${this.id}\tName ${this.name}\tCategory ${this.category}\tRarity ${this.rarity}\tDescription ${this.description}`;        
    }

}

export class Weapon extends Item{
    damage;

    constructor(id, name, category,rarity,description, damage){
        super(id, name, category,rarity,description);
        this.damage = damage;
    }

    attack(){
        return `Оружие ${this.name} ${this.damage} урона!`;
    }
}
