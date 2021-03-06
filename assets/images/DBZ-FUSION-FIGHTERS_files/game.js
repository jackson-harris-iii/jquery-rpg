
$(document).ready(function () {

//Character Class    
function Character (avatar, name, health, attack, defense, reference) {
    this.avatar = avatar;
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.reference = reference;
    
    this.powerUp = function () {
         return this.attack += this.attack
        
    }

    this.attackBack = function (target, yourHealth) {
        return target.health -= this.defense
    }



};

//array of characters with their raw data
var characters = [
    ["assets/images/fTrunks.png", "Trunks", 100, 10, 5, "fTrunks"],
    ["assets/images/gogeta.png", "Gogeta", 170, 25, 50, "gogeta"],
    ["assets/images/gotenks.png", "Gotenks", 120, 15, 8, "gotenks"],
    ["assets/images/mVegeta.png", "Majin Vegeta", 150, 30, 15, "mVegeta"]
];
//Global Variables
    var playableCharacters = [];
    var chosenOne = "";
    var defendingOne = "";
    var enemies = [];
    var isDefender = "";
    var selectedYet = false;
    var yourHealth = "";
    var enemyHealth = "";

//creates a playable character from the characters array
function loadCharacters(characters) {
    characters.forEach(element => {
      var attributes = element;
      var playable = new Character(...attributes);
      playableCharacters.push(playable)
        
    });
    
}


function takePositions(character) {
   if (selectedYet == false){
       selectedYet = true;
       isDefender = false;
       $("#yourCharacter").show();
        var chosenID = character.target.id;
        //console.log(character.currentTarget);
    //the character the player clicks on will be identified as their chosen player from the pool of playable characters
        chosenOne = playableCharacters.find(function(obj) {
            var choice = obj.reference == chosenID
            return choice
        })
       //sets chosenOnes health to be later shown on screen 
       yourHealth = chosenOne.health; 

        var selectedCharacter = $(character.currentTarget).remove();
        selectedCharacter.appendTo("#yourCharacter").removeClass("playable");

        //console.log(chosenOne);
        $("#toolTip").html("<h1>Pick An Enemy!</h1> <h3>Choose Wisely</h3>")

        enemies = yourEnemies(playableCharacters, chosenOne);
    
    $(".playable").each(function () {
        $(this).children().addClass("enemy")
        //console.log($(this))
        $(this).appendTo("#enemies");

    })
    }
    else if (isDefender == false) {
        isDefender = true
        $("#attackButton").show();
        //console.log("you has defender")
        //console.log($(this));
        var defenderID = character.target.id;

       defendingOne = enemies.find(function (obj) {
           var choice = obj.reference == defenderID
           return choice
        })
       var selectedDefender = $(character.currentTarget).remove();
       selectedDefender.appendTo("#defendingOne").removeClass("enemy").addClass("defendingOne");
       $("#toolTip").html("<h1>Now Attack!</h1>")
       
    }            
}

function battle() {
    //here you will put the defindingOne on defense.
    // console.log(chosenOne);
    // console.log(defendingOne);
    if ( chosenOne.health > 0 && defendingOne.health > 0 ){
        
        //broadcasts battle sequence 
        $("#toolTip").html("<h3>You attacked " + defendingOne.name + " for " + chosenOne.attack + " damage</h3>")
        
        //update enemey's health
        enemyHealth = defendingOne.health -= chosenOne.attack 
        enemyHealthDiv = defendingOne.reference + "-health"
        $('#'+enemyHealthDiv).html('HP: '+ enemyHealth)


        //updates your character's health
        yourHealth = defendingOne.attackBack(chosenOne)
        yourHealthDiv = chosenOne.reference + "-health"
        $('#'+yourHealthDiv).html('HP: '+ yourHealth)
    

        //Increases attack for your character after each attack
        chosenOne.powerUp()

        console.log(chosenOne)
        console.log(defendingOne)

    }

    else if (chosenOne.health <= 0){
        $("#toolTip").html("<h1>YOU LOSE</hs1>")
    }
}


function battleReport(yourData, enemyData) {
    $("#toolTip").html()
}

//creates an array of enemies
function yourEnemies(playableCharacters,chosenOne) {
    return playableCharacters.filter(characters => characters !== chosenOne);       
}

function displayCharacters(characters) {
    $("#toolTip").html("<h1>Select Your Character</h1>")
    characters.forEach(element => {
        // console.log(element)
        
        //creates a Div to hold all of the character data
        var avatarDiv = $("<div></div>").attr("id", element.reference).attr( "class", "card w-25 playable avatar");

        //adds image to character card and enables a character to be chosen
        avatarDiv.prepend("<img class='card-img-top avatars' id='" + element.reference + "' src='" + element.avatar + "'/>");

        //creates card block div to hold the character data
        var avatarCardBlock = $("<div></div>").attr("class", "card-block");

        //adds character data to the card block
        avatarCardBlock.prepend("<h4 class='card-title characterData'>" + element.name +"</h4>");
        avatarCardBlock.append("<p class='card-text characterData' id='"+element.reference+"-health'> HP: " + element.health +"</p>");

        //adds all characer data to the holding div
        avatarDiv.append(avatarCardBlock);
        
        $("#chooseCharacter").append(avatarDiv);
    });
}

loadCharacters(characters);
//console.log(playableCharacters);
displayCharacters(playableCharacters);
$("#attackButton").hide();
$("#attackButton").click(battle);
$("#yourCharacter").hide();
$(".playable").click(takePositions);
$(".enemies").click(takePositions);

})