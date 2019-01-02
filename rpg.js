var Character = {
    characterName: '',
    characterClass: {
        className: '',
        classHP: 0,
        classArmour: 0,
        classDamage: 0
    },
    characterRace: {
        raceName: '',
        baseHP: 0,
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

var Enemy = {
    name: '',
    hp: 0,
    armour: 0,
    baseDamage: 0,
    valueInGold: 0,
    valueInXP: 0
};

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
            Character.characterClass.classHP = 40;
            Character.characterClass.classDamage = 20;
            Character.characterClass.classArmour = 5;
        } else if (characterClass === 'priest') {
            Character.characterClass.className = 'Priest';
            Character.characterClass.classHP = 50;
            Character.characterClass.classDamage = 15
            Character.characterClass.classArmour = 10;
        }
        if (characterRace === 'human') {
            Character.characterRace.raceName = 'Human';
            Character.characterRace.baseHP = 50;
            Character.characterRace.baseDamage = 10;
            Character.characterRace.baseArmour = 5;
        } else if (characterRace === 'bloodelf') {
            Character.characterRace.raceName = 'Blood elf';
            Character.characterRace.baseHP = 40;
            Character.characterRace.baseDamage = 20;
            Character.characterRace.baseArmour = 0;
        }
        Character.armour = Character.characterClass.classArmour + Character.characterRace.baseArmour;
        Character.maxHp = Character.characterClass.classHP + Character.characterRace.baseHP;
        Character.currentHp = Character.maxHp;
        Character.damage = Character.characterClass.classDamage + Character.characterRace.baseDamage;
        Character.gold = 100;
        Character.level = 1;
        Character.currentXP = 0;
        Character.maxXP = 100;
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

function createDirectionText(direction) {
    let rowNumber = 17;
    var directionText = document.getElementById('textarea').value.split("\n");
    directionText.pop();
    let i = document.getElementById('textarea').value.split("\n").length-1;
    console.log('direction text is' ,directionText);
    console.log('I is',i);
    if(i < rowNumber) {
        document.getElementById('textarea').innerHTML += 'You went ' + direction + '\n';
    } else {
        console.log('direction text b4 shift',directionText);
        directionText.shift();
        console.log('direction text after shift',directionText);
        i--;
        directionText[i] = 'You went ' + direction  + '\n';
        var text = '';
        for(var j = 0; j < directionText.length; j++) {
            if(j !== directionText.length-1)
                text += directionText[j]+'\n';
            else
                text += directionText[j];
        }
        console.log('Textul este:');
        console.log(text);
        document.getElementById('textarea').innerHTML = text;
    }
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