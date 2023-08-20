/**
Betrayal at House on the Hill Player Aid (v_2.1 October 2020)  Created by Sean Doyle.
NEW:
V 2.1
-Added End Session functionality
V 2.0
-Implemented sockets technology.
-Modified game functions for use with socket emit events.
-Handle error of no player names entered.

TODO:  (NOTE:  ##REL are things to be added to next release) 
#####FUNCTIONALITY##
-add alert when a character dies
-ADD BIRTHDAY PROPERTY AND PUT THAT PLAYER FIRST IN THE ORDER (TO MATCH GAME RULE FOR STARTING ORDER)

-ADD for in LOOP
-REVIEW VARIABLES & SEE IF THEY'RE ALL USED.
##REL-CLEAN UP TABS & EXTRA SPACES - JSLINT?

#####STYLING##
-make responsive/test on tablets & phones
-make responsive for phones
*/
//window.onload = function () {
    "use strict";
//Game variables
    var minPlayers = 1;
    var maxPlayers = 6;
    var numOfPlayers, numOfPlayersInt;
    //var playrNumGot = false;//GET PLAYERS LOOP INITIALIZED TO FALSE
    var playerName, charPick;
    var playerArray = [];
    var playerHelpText = "Player Name?";
    var allTds; //ARRAY OF ALL <td> ELEMENTS

//====Get elements====
/*var p1SP = document.getElementById("p1Sp");
var p1MI = document.getElementById("p1Mt");
var p1SA = document.getElementById("p1Sn");
var p1KW = document.getElementById("p1Kw");
var p1Char = document.getElementById("p1Name");
var plrFormBox = document.getElementById("formBox");*/
var plrDisplay = document.getElementById("playerTables");
var plrForm = document.getElementById("PlayerForm");
var startBtn = document.getElementById("btnSub");
var allTxtBs = document.getElementsByTagName("input");

//========SET LISTENERS========
//startBtn.onclick = startGame;

//Clear help text from text boxes on focus
for (var ia = 0; ia < allTxtBs.length; ia += 1){
    allTxtBs[ia].onfocus = function () {
        if(this.value == playerHelpText){
            this.value = "";
        }
    }
}

//====Check text boxes on blur
for (var ib = 0; ib < allTxtBs.length; ib += 1){
    allTxtBs[ib].onblur = function(){
        var currentClass, charPair;
        //Reset helper text if empty
        if (this.value == ""){
            this.value = playerHelpText;
        } else {
            //Hide the other Name of same colour
            currentClass = this.parentElement.className;
            if(currentClass.length === 6){
                charPair = document.getElementsByClassName(currentClass);
                this.parentElement.className = currentClass + "Set";
                for(var ii = 0; ii < charPair.length; ii += 1){
                    charPair[ii].style.display = "none";
                    charPair[ii].blur();
                }
            }
            
        }//end else
    }//END onblur anon function
}


/*#### function changeTraitValue
* FUNCTION TO CHANGE THE ATTRIBUTE LEVELS
*/
function changeTraitValue(selectedTD){
    var pickdTd = document.getElementById(selectedTD);
	var parentRow, rowChldrn, ri;
    parentRow = pickdTd.parentNode;//GET ROW OF CLICKED <td>
    rowChldrn = parentRow.childNodes;//ARRAY OF SIBLING <td>s

    //REMOVE TR_actv CLASS FROM ALL <td>
    for(let ri = 1; ri < rowChldrn.length; ri++) {
        if(rowChldrn[ri].className.indexOf("d") != -1){
            rowChldrn[ri].className = "TR_default";
        } 
		else if(rowChldrn[ri].className.indexOf("XX") != -1){
            rowChldrn[ri].className = "XX";
        } else {
            rowChldrn[ri].className = "";
        }
    }
    //ADD ACTIVE CLASS (TR_actv)TO CLICKED <td>
    if(pickdTd.className.indexOf("d") != -1){
        pickdTd.className += "TR_default TR_actv";
    }else{
        pickdTd.className += " TR_actv";
    }
}//END changeTraitValue


/*#### function showChars
* Display characters selected by players.
* Called by startGame()
*/
    function showChars(newPlayers){

		var playerChar;
        for(let j = 0; j < newPlayers.length; j++) {
            playerChar = characterArray[newPlayers[j].pl_charIndx];
            
             plrDisplay.innerHTML += "<div class='playerBox2'><div class='charBox2 " + newPlayers[j].myChar.ch_Colr + "'><h2>" + newPlayers[j].pl_name.toUpperCase() + "</h2><img src='images/" + newPlayers[j].myChar.ch_img + ".png' width='100' alt='My Character Image' /><p>" + newPlayers[j].myChar.ch_name + "</p></div><div class='traitBox'><table id='tbl" + j +"'></table></div></div>";
            
            //DISPLAY TRAIT ROWS
            playerChar.shoSpd(j);
			playerChar.shoMit(j);
            playerChar.shoSan(j);
            playerChar.shoKno(j);
        }
    }//END showChars


/*#### function pickChars
* Get Player names and their character choices.
* Called by startGame()
*/
    function pickChars(){
        var allInputs = document.getElementsByTagName("input");
        var i, plyrNameIn, newPlayer, plyrCharPick;
        for (i = 0; i < allInputs.length; i +=1){
            //if valid
            if(allInputs[i].value !== "" && allInputs[i].value !== playerHelpText){
                //get playerName & character ID
                plyrNameIn = allInputs[i].value;
                plyrCharPick = allInputs[i].id;
                
                //create new Player & add to Player Array
                newPlayer = new Player(plyrNameIn, (parseInt(plyrCharPick.substring(4))));
                playerArray.push(newPlayer);
            }
        }//END forloop
		return playerArray;
    }//END pickChars

/*#### function setTDListenrs
* Add onclick event to <td> to allow for attribute changes.
* Click calls changeTraitValue.
* Called by startGame()
*/
function setTDListenrs(){
    var allTds = document.getElementsByTagName("td");
    for(let y = 0; y < allTds.length; y += 1){
        //DON'T ADD CLICK EVENT TO <td class="traitName">
        if(allTds[y].className != "traitName"){
            allTds[y].onclick = changeTraitValue;
        }
    }
}//END setTdListenrs


/*#### function startGame
 Start the game.
**/
function startGame(){
    //Hide Player form
    plrForm.style.display = "none";

    //Loop through inputs and grab user names & selected characters
    //pickChars();

    //Display selected characters to begin game.
    showChars();

    //Set onclick listeners for attributes.
    setTDListenrs();
}//END startGame

//};//END onload FUNCTION