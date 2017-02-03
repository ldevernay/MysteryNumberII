$(document).ready(function(){

  var counter;
  var nbMyst;
  var i = 1;

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
    Chronometre.start();
    $("#start").hide();
    $("#over").hide();
    $("#guessInput").show();
    $("#guessBtn").show();
    i = 1;
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
  }

  function guessMysteryNumber(){
    var guess = document.getElementById("guessInput").value;

    console.log(nbMyst);
    if (guess < nbMyst){
      $("#result").html('Le nombre mystère est plus grand !');
    } if (guess > nbMyst) {
      $("#result").html('Le nombre mystère est plus petit !');
      // var essai = prompt('Devinez le nombre mystère, il est compris entre 0 et 9');
    } if (guess == nbMyst) {
      $("#result").html('Bravo ! le nombre mystère était bien ' + nbMyst);
      $("#next").html('Nouveau chiffre!');
      $("#next").show();
      nbMyst = (Math.floor((9)*Math.random()+1));
      i = 0;
    }
    i++;

    if (i>3){
      gameOver();
    }
  }

});
