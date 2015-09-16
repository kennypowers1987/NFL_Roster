var playerRoster = {};




$(document).ready(function () {
   
    var playerCount = 0;
    function Player(name, position, number) {
        playerCount++;
        this.name = name;
        this.position = position;
        this.number = number;
        this.id = playerCount;
    }


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
        $("#roster").append('<div class="player-card"> <img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/"><p id="' + playerRoster[i].id + '" class="delete glyphicon glyphicon-remove" value="Remove"><p id="pName"><h5><span class="label label-success"> Name: </span></h5>' + playerRoster[i].name + '</p><p id="pPosition"><h5><span class="label label-success">Position: </span></h5>' + playerRoster[i].position + '</p><p id="pNumber"><h5><span class="label label-success"> Number: </span></h5>' + playerRoster[i].number + '</p></div>')
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