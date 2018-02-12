
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
        attack *= attack
    }



};

//array of characters with their raw data
var characters = [
    ["assets/images/fTrunks.png", "Trunks", 100, 10, 10, "fTrunks"],
    ["assets/images/gogeta.png", "Gogeta", 170, 25, 25, "gogeta"],
    ["assets/images/gotenks.png", "Gotenks", 120, 15, 15, "gotenks"],
    ["assets/images/mVegeta.png", "Majin Vegeta", 150, 30, 30, "mVegeta"]
];

//creates a playable character from the characters array
function loadCharacters(characters) {
    characters.forEach(element => {
      var attributes = element;
      var playable = new Character(...attributes);
      playableCharacters.push(playable)
        
    });
    
}

function takePositions(character) {
   
    var chosenID = character.target.id;
    console.log(character.currentTarget);
   //the character the player clicks on will be identified as their chosen player from the pool of playable characters
    chosenOne = playableCharacters.find(function(obj) {
        var choice = obj.reference == chosenID
        return choice
    })
    var selectedCharacter = $(character.currentTarget).remove();
    selectedCharacter.appendTo("#yourCharacter").removeClass("playable");

    //console.log(chosenOne);
    $("#toolTip").html("<h1>Pick An Enemy!</h1>")

    enemies = yourEnemies(playableCharacters, chosenOne);
    
    $(".playable").each(function () {
        $(this).children().css("background-color", "red")
        console.log($(this))
        $(this).appendTo("#enemies");
    })
        
    // var selectCharacter = 
    // console.log(chosenOne)
    // // setStage(chosenOne);
    
}
//creates an array of enemies
function yourEnemies(playableCharacters,chosenOne) {
    return playableCharacters.filter(characters => characters !== chosenOne);       
}


function displayCharacters(characters) {
    $("#toolTip").html("<h1>Select Your Character</h1>")
    characters.forEach(element => {
        // console.log(element)
        
        var avatarDiv = $("<div></div>").attr("id", element.reference).attr( "class", "card playable",);

        //adds image to character card and enables a character to be chosen
        avatarDiv.prepend("<img class='card-img-top avatars' id='" + element.reference + "' src='" + element.avatar + "'/>").click(takePositions);
        
        $("#chooseCharacter").append(avatarDiv);
    });
}


var playableCharacters = [];
var chosenOne = "";
var enemies = [];
loadCharacters(characters);
//console.log(playableCharacters);
displayCharacters(playableCharacters);
$("#attackButton").hide();
})