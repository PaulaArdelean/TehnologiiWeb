var Character = {
    characterName: '',
    characterClass: {
        className: '',
        classHp: 0,
        classArmour: 0,
        classDamage: 0
    },
    characterRace: {
        raceName: '',
        baseHp: 0,
        baseArmour: 0,
        baseDamage: 0
    },
    currentHp: 0,
    maxHp: 0,
    armour: 0,
    damage: 0, 
    gold: 0,
    level: 0,
    currentXp: 0,
    maxXp: 0
};

var Enemies = [
    {
        name: 'skeleton',
        hp: 20,
        maxHp: 20,
        armour: 5,
        damage: 7,
        valueInGold: 25,
        valueInXp: 50
    },
    {
        name: 'zombie',
        hp: 25,
        maxHp: 25,
        armour: 0,
        damage: 5,
        valueInGold: 50,
        valueInXp: 25
    },
    {
        name: 'ogre',
        hp: 50,
        maxHp: 50,
        armour: 15,
        damage: 15,
        valueInGold: 100,
        valueInXp: 100
    }
];

var Item = {
    name: '',
    effect: 0,
    sellPrice: 0,
    buyPrice: 0,
    equippable: false
};

window.onload = function() {
    let createGame = document.getElementById('playDiv').style.display = 'none';
}

function getCharacterData() {
    let characterName = document.getElementById('nameInput').value;
    let select1 = document.getElementById('classInput');
    let characterClass = select1.options[select1.selectedIndex].value;
    let select2 = document.getElementById('raceInput');
    let characterRace = select2.options[select2.selectedIndex].value;
    if(characterName !== '' && characterClass !== 'Choose class' && characterRace !== 'Choose race') {
        Character.characterName = characterName;
        if(characterClass === 'mage') {
            Character.characterClass.className = 'Mage';
            Character.characterClass.classHp = 40;
            Character.characterClass.classDamage = 20;
            Character.characterClass.classArmour = 5;
        } else if (characterClass === 'priest') {
            Character.characterClass.className = 'Priest';
            Character.characterClass.classHp = 50;
            Character.characterClass.classDamage = 15
            Character.characterClass.classArmour = 10;
        }
        if (characterRace === 'human') {
            Character.characterRace.raceName = 'Human';
            Character.characterRace.baseHp = 50;
            Character.characterRace.baseDamage = 10;
            Character.characterRace.baseArmour = 5;
        } else if (characterRace === 'bloodelf') {
            Character.characterRace.raceName = 'Blood elf';
            Character.characterRace.baseHp = 40;
            Character.characterRace.baseDamage = 20;
            Character.characterRace.baseArmour = 0;
        }
        Character.armour = Character.characterClass.classArmour + Character.characterRace.baseArmour;
        Character.maxHp = Character.characterClass.classHp + Character.characterRace.baseHp;
        Character.currentHp = Character.maxHp;
        Character.damage = Character.characterClass.classDamage + Character.characterRace.baseDamage;
        Character.gold = 100;
        Character.level = 1;
        Character.currentXp = 0;
        Character.maxXp = 100;
        return true;
    }
    return false;
}

function goToGame() {
    if(getCharacterData()) {
        let createCharacter = document.getElementById('createCharacterDiv').style.display = 'none';
        let createGame = document.getElementById('playDiv').style.display = 'block';
        document.getElementById('bag').style.display = 'none';
        let displayCharClass = document.getElementById('displayCharClass');
        displayCharClass.innerHTML = Character.characterClass.className;
        let displayCharName = document.getElementById('displayCharName');
        displayCharName.innerHTML = Character.characterName;
        let displayCharRace = document.getElementById('displayCharRace');
        displayCharRace.innerHTML = Character.characterRace.raceName;
        let displayCharMaxHp = document.getElementById('displayCharMaxHp');
        displayCharMaxHp.innerHTML = Character.maxHp;
        let displayCharCurrentHp = document.getElementById('displayCharCurrentHp');
        displayCharCurrentHp.innerHTML = Character.currentHp;
        let displayCharMaxXp = document.getElementById('displayCharMaxXp');
        displayCharMaxXp.innerHTML = Character.maxXp;
        let displayCharCurrentXp = document.getElementById('displayCharCurrentXp');
        displayCharCurrentXp.innerHTML = Character.currentXp;
        let displayCharLevel = document.getElementById('displayCharLevel');
        displayCharLevel.innerHTML = Character.level;
        let displayCharArmour = document.getElementById('displayCharArmour');
        displayCharArmour.innerHTML = Character.armour;
        let displayCharDamage = document.getElementById('displayCharDamage');
        displayCharDamage.innerHTML = Character.damage;
        let displayCharGold = document.getElementById('displayCharGold');
        displayCharGold.innerHTML = Character.gold  ;
        document.getElementById('textarea').innerHTML += 'Ai intrat intr-o padure.....\n';
    } else {
        alert('Name, class or race not set.');
    }
}

function refreshDisplay() {
    let displayCharMaxHp = document.getElementById('displayCharMaxHp');
    displayCharMaxHp.innerHTML = Character.maxHp;
    let displayCharCurrentHp = document.getElementById('displayCharCurrentHp');
    displayCharCurrentHp.innerHTML = Character.currentHp;
    let displayCharMaxXp = document.getElementById('displayCharMaxXp');
    displayCharMaxXp.innerHTML = Character.maxXp;
    let displayCharCurrentXp = document.getElementById('displayCharCurrentXp');
    displayCharCurrentXp.innerHTML = Character.currentXp;
    let displayCharLevel = document.getElementById('displayCharLevel');
    displayCharLevel.innerHTML = Character.level;
    let displayCharGold = document.getElementById('displayCharGold');
    displayCharGold.innerHTML = Character.gold  ;
    let displayCharDamage = document.getElementById('displayCharDamage');
    displayCharDamage.innerHTML = Character.damage;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function movement(direction) {
    addToTextarea('You went ' + direction);
    if(isCombat()) {
        let enemy = Enemies[getRndInteger(0, 2)]
        addToTextarea('You encountered a ' + enemy.name + '.');
        combat(enemy);
    }
    if(isShop()) {
        addToTextarea('You found a shop.');
    }
}

function combat(enemy) {
    while(Character.currentHp > 0 && enemy.hp > 0) {
        if(enemy.damage > Character.armour) {
            Character.currentHp -= (enemy.damage - Character.armour);
        }
        if(Character.damage > enemy.armour) {
            enemy.hp  -= (Character.damage - enemy.armour);
        }
    }
    if(Character.currentHp <= 0) {
        addToTextarea('You died.');
    } else if(enemy.hp <= 0) {
        Character.gold += enemy.valueInGold;
        if(Character.currentXp + enemy.valueInXp < Character.maxXp) {
            Character.currentXp += enemy.valueInXp;
        } else { // BUG: se dubleaza maxXp inainte sa ajung la fostul maxXp
            Character.level++;
            Character.maxXp *= 2;
            Character.damage += 5;
            Character.currentHp += 10;
            Character.maxHp += 10;
            for(let nr = 0; nr <= 2; nr++) {
                Enemies[nr].damage += 3;
                Enemies[nr].hp += 5;
                Enemies[nr].maxHp += 5;
                Enemies[nr].valueInGold += 5;
                Enemies[nr].valueInXp += 10;
            }
            currentXp = Character.currentXp + enemy.valueInXp - Character.maxXp;
        }
        refreshDisplay();
        addToTextarea('You won the battle.');
    }
    enemy.hp = enemy.maxHp;
}

function addToTextarea(s) {
    let rowNumber = 17;
    let text = '';
    var lines = document.getElementById('textarea').value.split('\n');
    lines.pop();
    let i = document.getElementById('textarea').value.split('\n').length - 1;
    console.log('i: ', i);
    if(i < rowNumber) {
        lines[i] = s;
        console.log('linia i', lines[i]);
    } else {
        lines.shift();
        i--;
        lines[i] = s;
    }
    for(j = 0; j <= i; j++) {
        text += lines[j] + '\n';
    }
    console.log('textul e: ', text);
    document.getElementById('textarea').innerHTML = text;
}

function isCombat() {
    if(Math.floor(Math.random() * 100) + 1 < 30) {
        return true;
    }
    return false;
}

function isShop() {
    if(Math.floor(Math.random() * 100) + 1 <= 20) {
        return true;
    }
    return false;
}

function showBag() {
    if(document.getElementById('bag').style.display === 'none') {
        document.getElementById('bag').style.removeProperty('display');
        document.getElementById('showhidebag').innerHTML = 'Hide bag';
        let displayGoldAmount = document.getElementById('goldamount');
        displayGoldAmount.innerHTML = Character.gold;

    } else {
        document.getElementById('bag').style.display = 'none';
        document.getElementById('showhidebag').innerHTML = 'Show bag';
    }
}