
function Player(name, position, number) {
    playerCount++;
    this.name = name;
    this.position = position;
    this.number = number;
    this.id = playerCount;
}

var playerRoster = {};
$(document).ready(function () {
   
    var playerCount = 0;
   


    $("#submit").on('click', function () {
        
        var name = $("#playerName").val();
        var position = $("#playerPosition").val();
        var number = $("#playerNumber").val();
        var player = new Player(name, position, number);
        playerRoster[player.id] = player;
       
        $("#playerName").val('');
        $("#playerPosition").val('');
        $("#playerNumber").val('');
        displayPlayer();
        
    });




    function displayPlayer() {
       // debugger;
    $("#roster").html("");
   
    for (i in playerRoster) {
        $("#roster").append('<div class="player-card"> <img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/"><input type="button" id="' + playerRoster[i].id + '" class="delete" value="Delete"><p id="pName">' + playerRoster[i].name + '</p><p id="pPosition">' + playerRoster[i].position + '</p><p id="pNumber">' + playerRoster[i].number + '</p></div>')
       // $("#roster").append("Kenny");
    }

}
    $("#roster").on('click','.delete', function (e) {

     //   debugger;
        deletePlayer(this.id);
        displayPlayer();

    });
});

function deletePlayer(i){

    for (i in playerRoster) if(i = playerRoster[i].id) delete playerRoster[i];


}