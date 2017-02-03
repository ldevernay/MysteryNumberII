$(document).ready(function(){

  var counter;
  var nbMyst;
  var i = 1;
  var score;
  var lives;
  var guessStorage = localStorage;
  var hiScores = JSON.parse(localStorage.getItem('hiScores'));
  var output = "";
  $('[data-toggle="tooltip"]').tooltip();

  // modif hiScores
  // localStorage.clear();
  // localStorage.setItem('hiScores', JSON.stringify({'100':'LDE','10':'LDE','1':'LDE'}));
  // hiScores = JSON.parse(localStorage.getItem('hiScores'));
  // fin modif hiScores

  refreshHiScores();

  function Chrono(currentTime) {
    $("#guessInput").hide();
    $("#guessBtn").hide();
    this.time = currentTime;
    this.start = function(){
      clearInterval(counter);
      counter = setInterval(timer, 1000);
      timer();
    };
    this.stop = function(){
      stop();
    };
  }

  var Chronometre = new Chrono(61, 0);

  $("#start").click(function(){
    nbMyst = (Math.floor((9)*Math.random()+1));
    console.log(nbMyst);
    Chronometre.start();
    $("#start").hide();
    $("#over").hide();
    $("#guessInput").show();
    $("#guessBtn").show();
    i = 1;
    score = 0;
    $("#score").html('Score : ' + score);
    lives = ("<img src='img/heart.png'>").repeat(3);
    $("#life").html(lives);
    var hiScores = JSON.parse(localStorage.getItem('hiScores'));
  });

  $( "#guessForm" ).submit(function( event ) {
    $("#next").hide();
    guessMysteryNumber();
  });

  $( "#guessBtn" ).click(function() {
    $( "#guessForm" ).submit();
  });

  function timer(){
    Chronometre.time -=1;
    var minute = Math.floor((Chronometre.time)/60);
    var seconds = Chronometre.time - (minute*60);
    if (seconds<10) {
      seconds = "0" + seconds;
    }
    if (minute<10) {
      minute = "0" + minute;
    }
    if (Chronometre.time <= 0) {
      stop();
      gameOver();
    }
    $("#timer").html(minute + ":" + seconds);
  }


  function stop(){
    clearInterval(counter);
    Chronometre.time = 61;
    $("#timer").html("01:00");
  }

  function gameOver(){
    $("#over").html('GAME OVER');
    $("#over").show();
    $("#start").show();
    $("#result").empty();
    $("#guessInput").val('');
    $("#guessInput").hide();
    $("#guessBtn").hide();
    stop();
    hiScore();
  }

  function refreshHiScores(){
    output = "";
    $("#hiScores").empty();
    for (var property in hiScores) {
      output += '<h2>' + hiScores[property] + ': ' + property+'</h2>';
    }
    $("#hiScores").html(output);
  }
  // If necessary, add hiScore, max 3
  function hiScore(){
    var arr = Object.keys( hiScores ).map(function ( key ) { return key; });

    var min = Math.min.apply( null, arr );
    // var max = Math.max.apply( null, arr );
    if (score > min){
      var initiales = prompt('Bravo, tu as réalisé un high-score! Entre ton nom : ');
      hiScores[score] = initiales;
    }
    if (Object.keys(hiScores).length > 3){
      delete hiScores[min];
    }
    localStorage.setItem('hiScores', JSON.stringify(hiScores));
    hiScores = JSON.parse(localStorage.getItem('hiScores'));
    refreshHiScores();
  }

  function guessMysteryNumber(){
    var guess = document.getElementById("guessInput").value;

    if (guess < nbMyst){
      $("#result").html('Le nombre mystère est plus grand !');
    } if (guess > nbMyst) {
      $("#result").html('Le nombre mystère est plus petit !');
    } if (guess == nbMyst) {
      $("#result").html('Bravo ! le nombre mystère était bien ' + nbMyst);
      $("#next").html('Nouveau chiffre!');
      $("#next").show();
      score += 5 - i;
      $("#score").html('Score : ' + score);
      nbMyst = (Math.floor((9)*Math.random()+1));
      console.log(nbMyst);
      i = 0;
    }
    lives = ("<img src='img/heart.png'>").repeat(3-i);
    $("#life").html(lives);
    i++;

    if (i>3){
      gameOver();
    }
  }

});
