
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
    ["assets/images/fTrunks.png", "Trunks", 100, 7, 7, "fTrunks"],
    ["assets/images/gogeta.png", "Gogeta", 150, 11, 25, "gogeta"],
    ["assets/images/gotenks.png", "Gotenks", 120, 7, 8, "gotenks"],
    ["assets/images/mVegeta.png", "Majin Vegeta", 130, 9, 20, "mVegeta"]
];
//Global Variables
    var playableCharacters = [];
    var chosenOne = "";
    var defendingOne = "";
    var enemies = [];
    var deadOnes = [];
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

function newGame() {
    $("#playAgain").hide()
    $("chooseCharacter").show()
    $("#yourCharacter").empty()
    $("#enemies").empty()
    $("#defendingOne").empty()
    playableCharacters = [];
    chosenOne = "";
    defendingOne = "";
    enemies = [];
    deadOnes = [];
    isDefender = "";
    selectedYet = false;
    yourHealth = "";
    enemyHealth = "";
    loadCharacters(characters);
    displayCharacters(playableCharacters);
    $(".playable").click(takePositions);
    $(".enemies").click(takePositions);
}


function takePositions(character) {
   if (selectedYet == false){
       selectedYet = true;
       isDefender = false;
       $("chooseCharacter").hide();
       $("#yourCharacter").show();
        var chosenID = character.target.id;
    //the character the player clicks on will be identified as their chosen player from the pool of playable characters
        chosenOne = playableCharacters.find(function(obj) {
            var choice = obj.reference == chosenID
            return choice
        })
       //sets chosenOnes health to be later shown on screen 
       yourHealth = chosenOne.health; 

        var selectedCharacter = $(character.currentTarget).remove();
        selectedCharacter.appendTo("#yourCharacter").removeClass("playable").addClass("chosenOne");

    
        $("#toolTip").html("<h1>Pick An Enemy!</h1> <h3>Choose Wisely</h3>")

        enemies = yourEnemies(playableCharacters, chosenOne);
    
    $(".playable").each(function () {
        $(this).children(".avatars").addClass("enemy").removeClass("characterSelect")
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
   //This function handles the battle
    if ( chosenOne.health > 0 && defendingOne.health > 0 ){
        
        //broadcasts battle sequence 
        $("#toolTip").html("<h3>You attacked " + defendingOne.name + " for " + chosenOne.attack + " damage, " + defendingOne.name +" attacked you for " +defendingOne.defense+  " damage</h3>")
        
        //update enemey's health
        enemyHealth = defendingOne.health -= chosenOne.attack 
        enemyHealthDiv = defendingOne.reference + "-health"
        $('#'+enemyHealthDiv).html('HP: '+ enemyHealth)


        //updates your character's health
        yourHealth = defendingOne.attackBack(chosenOne)
        yourHealthDiv = chosenOne.reference + "-health"
        $('#'+yourHealthDiv).html('HP: '+ yourHealth)
        healthCheck()

        //Increases attack for your character after each attack
        chosenOne.powerUp()


    }
}

function healthCheck() {
    if (chosenOne.health <= 0) {
        $("#toolTip").html("<h1>YOU LOSE</h1>")
        gameOver();
    }
    
    else if (defendingOne.health <= 0) {
        $("#toolTip").html("<h1>" + defendingOne.name +" is Defeated!</h1> <h3>Choose Next Opponent</h3>")
        $("#defendingOne").empty()
        isDefender = false
        deadOnes.push(defendingOne)
        gameOver();
    }
    
}


function gameOver() {
    if (deadOnes.length == enemies.length) {
        $("#toolTip").html("<h1> YOU ARE VICTORIOUS!</h1>")
        $("#attackButton").hide();
        $("#playAgain").show();
    }
    else if (chosenOne.health <= 0){
        $("#attackButton").hide();
        $("#playAgain").show();
    }
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
        var avatarDiv = $("<div></div>").attr("id", element.reference).attr("class", "card w-25 playable avatar mx-auto");

        //adds image to character card and enables a character to be chosen
        avatarDiv.prepend("<img class='card-img-top avatars w-100 characterSelect' id='" + element.reference + "' src='" + element.avatar + "'/>");

        //creates card block div to hold the character data
        var avatarCardBlock = $("<div></div>").attr("class", "card-block h-25 characterData");

        //adds character data to the card block
        avatarCardBlock.prepend("<p class='card-title characterData text-center namePlate'>" + element.name +"</p>");
        avatarCardBlock.append("<p class='card-text characterData text-center' id='"+element.reference+"-health'> HP: " + element.health +"</p>");

        //adds all characer data to the holding div
        avatarDiv.append(avatarCardBlock);
        
        $("#chooseCharacter").append(avatarDiv);
    });
}

loadCharacters(characters);
displayCharacters(playableCharacters);
$("#attackButton").hide();
$("#playAgain").hide();
$("#playAgain").click(newGame);
$("#attackButton").click(battle);
$("#yourCharacter").hide();
$(".playable").click(takePositions);
$(".enemies").click(takePositions);

})