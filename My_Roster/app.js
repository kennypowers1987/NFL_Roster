var playerRoster = [];
var playerCount = 0;
var positions = ['QB', 'RB', 'WR', 'TE', 'Flex'];
var option = '';
var lineup = {};
var _players = [];
var myPlayers = [];

$(document).ready(function () {
     
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
        playerRoster.push(player);
       
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
    
    var idx = -1;
    for (var p in playerRoster) if (playerRoster[p].id == i) {
        idx = p;
    }
    if (idx != -1) { playerRoster.splice(idx,1);}

}


var playerService = function() {
    return {
        loadPlayers: function(cb) {
            var url = "http://bcw-getter.herokuapp.com/?url=";
            var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
            var apiUrl = url + encodeURIComponent(url2);
            $.getJSON(apiUrl, function(response) {
                
                var p = response.body.players.filter(function(player){
                    if (player.position === "QB" || player.position === "RB" || player.position === "WR" || player.position === "TE" && player.pro_status === "A") {
                        return true;
                    }});
                
                _players = p;
                cb();
            })
        },
        //getPlayers: function() {
        //    return _players.slice();
        //},
        //getPlayersByPosition: function(position) {
        //    var requestedTeam = _players.filter(function(player) {
                
        //        }
        //    })
        //    return requestedTeam;
        //}        
    }
}

var ps = playerService();
function loadPlayersList(cl){
    $('#allPlayers').dataTable({
        paging: false,
        "data": _players,
        "columns": [
          { "data": "fullname" },
          { "data": "position" },
          { "data": "pro_team" },
          {
              "mRender": function (data, type, full) {
                  //this.attr('data-player-id');
                  return '<a data-player-id="' + full.id + '" class="btn btn-info btn-sm" href=#/' + full[0] + '>' + '+' + '</a>';
              }
          },

        ]
    });


};
function loadLineup(cl) {
    $('#myPlayers').dataTable({
        "data": myPlayers,
        "columns": [
          { "data": "fullname" },
          { "data": "position" },
          { "data": "pro_team" },


        ]
    });


};

ps.loadPlayers(loadPlayersList);

