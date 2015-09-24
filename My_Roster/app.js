var playerRoster = [];
var playerCount = 0;
var positions = ['QB', 'RB', 'WR', 'TE', 'Flex'];
var option = '';
var lineup = {};
var _players = [];
var myPlayers = [];
$(document).ready(function () {
    function displayPlayer() {
        // debugger;
        $("#roster").html("");
        for (i in playerRoster) {
            $("#roster").append('<div class="player-card"> <img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/"><p id="' + playerRoster[i].id + '" class="delete glyphicon glyphicon-remove" value="Remove"><p id="pName"><h5><span class="label label-success"> Name: </span></h5>' + playerRoster[i].name + '</p><p id="pPosition"><h5><span class="label label-success">Position: </span></h5>' + playerRoster[i].position + '</p><p id="pNumber"><h5><span class="label label-success"> Number: </span></h5>' + playerRoster[i].number + '</p></div>')
            // $("#roster").append("Kenny");
        }
    }
    $("#roster").on('click', '.delete', function (e) {
        //   debugger;
        deletePlayer(this.id);
        displayPlayer();
    });

});
var playerService = function () {
    return {
        loadPlayers: function (cb) {
            var url = "http://bcw-getter.herokuapp.com/?url=";
            var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
            var apiUrl = url + encodeURIComponent(url2);
            $.getJSON(apiUrl, function (response) {
                var p = response.body.players.filter(function (player) {
                    if (player.position === "QB" || player.position === "RB" || player.position === "WR" || player.position === "TE" && player.pro_status === "A") {
                        return true;
                    }
                });
                _players = p;
               cb();
            })
        },
    }
}
var ps = playerService();
function loadPlayersList(cl) {
    var table = $('#allPlayers').DataTable({
        paging: false,
        "data": _players,
        "columns": [
          {
              "data": "fullname",
              "title": "Name"
          },
          {
              "data": "position",
              "title": "Position"
          },
          {
              "data": "pro_team",
              "title": "Team"
          },
          {
              "mRender": function (data, type, full) {
                  //this.attr('data-player-id');
                  //return '<a data-player-id="' + full.id + '" class="btn btn-info btn-sm" href=#/' + full[0] + '>' + '+' + '</a>';
                  return '<button class="btn btn-success">+</button>';
              }
          },
        ]
    });
    $("#allPlayers tbody").on('click', 'button', function () {
        var data = table.row($(this).parents('tr')).data();
        var fullname = data.fullname;//$(this).attr("tr[0]");
        var position = data.position;// $(this).attr("tr[1]");
        var pro_team = data.pro_team;// $(this).attr("tr[2]");
        //var id = $(this).attr("data-player-id")
        var player = new Player(fullname, position, pro_team);
        myPlayers.push(player);
        loadLineup();
    });
    
    function Player(fullname, position, pro_team) {
        this.name = fullname;
        this.position = position;
        this.team = pro_team;
        //this.id = id;
    }
};
function loadLineup(cl) {
    var lineup = $('#myPlayers').DataTable({
       paging: false,
        "bDestroy": true,
        "data": myPlayers,
        "columns": [
         {
             "data": "name",
              "title": "Name"
          },
          {
             "data": "position",
              "title": "Position"
          },
         {
              "data": "team",
              "title": "Team"
          },
          {
              "mRender": function (data, type, full) {
                  //this.attr('data-player-id');
                  //return '<a data-player-id="' + full.id + '" class="btn btn-info btn-sm" href=#/' + full[0] + '>' + '+' + '</a>';
                  return '<button class="btn btn-danger">x</button>';
              }
          },
        ]
    });
    $("#myPlayers tbody").on('click', 'button', function () {
        var pdata = lineup.row($(this).parents('tr')).data();
        var fullname = pdata.fullname;//$(this).attr("tr[0]");
        var position = pdata.position;// $(this).attr("tr[1]");
        var pro_team = pdata.pro_team;// $(this).attr("tr[2]");
        //var id = $(this).attr("data-player-id")
       // var player = new Player(fullname, position, pro_team);
        myPlayers = myPlayers.filter(function (fullname) {
            return myPlayers.name !== fullname;
        });
        loadLineup();
    });
};
ps.loadPlayers(loadPlayersList);
ps.loadPlayers(loadLineup);