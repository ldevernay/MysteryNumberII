$(document).ready(function(){

/* ------- classe Chrono ------- */
var counter;

function Chrono(currentTime) {
  console.log("init chrono");
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
  console.log("start chrono");
    Chronometre.start();
    $("#start").hide();
});

/* ------ timer -------- */
function timer(){
    console.log("timer = " + Chronometre.time);
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


/* ------- stop ------- */
function stop(){
    clearInterval(counter);
    Chronometre.time = 61;
    $("#timer").html("01:00");
}

});






function guessMysteryNumber(){
nbMyst = (Math.floor((9)*Math.random()+1));

var essai = prompt('Devinez le nombre mystère, il est compris entre 0 et 9');

 for(var i = 1; i<=3; i++){
    if (essai < nbMyst){
     alert('Le nombre mystère est plus grand !');
    //  var essai = prompt('Essai encore');
    } if (essai > nbMyst) {
      alert('Le nombre mystère est plus petit !');
      // var essai = prompt('Devinez le nombre mystère, il est compris entre 0 et 9');
    } if (essai == nbMyst) {
      alert("Bravo ! le nombre mystère était bien " + nbMyst);
      break;
    }
 }
 }
