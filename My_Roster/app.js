var playerRoster = [];

function Player(name, position, number) {
    this.playerName = name;
    this.playerPosition = position;
    this.playerNumber = number;
  
}
$(document).ready(function () {
    $("#submit").on('click', function () {
        var playerName = $("playerName").val();
        var playerPosition = $("playerPosition").val();
        var playerNumber = $("playerNumber").val();
        var player = new Player(playerName, playerPosition, playerNumber);
        playerRoster.push(player);
       
        //displayPlayer();
    });

/*


function displayPlayer(){
    
    for (var i = 0; i < playerRoster.length; i++) {
        $('#roster').append('<div class="player-card"> <img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/"><span id="pName">' + playerRoster[i].name + '</span><span id="pPosition">' + PlayerRoster[i].position + '</span><span id="pNumber">' + playerRoster[i].number + '</span></div>')
    }

}
*/
});