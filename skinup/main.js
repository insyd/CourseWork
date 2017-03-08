/* DOCUMENTATION FROM JS SOURCE

ECrashState
Object {Unknown: 0, Counting: 1, Preparing: 2, Rising: 3, Crashed: 4}


*/


//Element Handlers
var $betElem = $("#bet-coins");
var $betCashout = $("#bet-cashout");
var $betBtn = $("#bet-coins").parent().parent().children(".bet-butt");

//Function Wrappers
function placeBet($Value, $Cashout) {
  $betElem.val($Value);
  $betCashout.val($Cashout);
  Crash.onManualButtonClick();
}
function getLastResult() {
  return Crash.$history.children().children(".multiplier")[0].innerHTML;
}

//Variables
var $toPlayWith = 1740;
var $currentBet = 0;
var $cashOutAt = 1.05;
var $baseBet = 0;
var $end = false;
var $profit = 0;
var $streak = 0;
var $streakStop = 5;
var $bankAt = 1500;
var $crashed = true;
var $banked = 0;

//Main Functions
function init() {
  $toPlayWith = prompt("Amount to play with:", 0);
  $cashOutAt = prompt("Cash out at:", 1.05);
  $streakStop = prompt("Streak to stop: ", 5);
  
  $toPlayWith -= $toPlayWith % $cashOutAt;
  $toPlayWith = Math.round($toPlayWith);
  $baseBet = $toPlayWith;
  
  $betElem.val($toPlayWith);
  $betCashout.val($cashOutAt);
}

function main() {
  switch(Crash.state) {
    case 1: // Bet Time
      $crashed = false;
      if(Crash.myBet === 0) {
        if($streak < $streakStop) {
          console.log("Placing bet: " + $toPlayWith);
          placeBet($toPlayWith, $cashOutAt);  
        }        
      }
      break;
    case 2: // Preparing
      break;
    case 3: // Bet Active
      break;
    case 4: // Crashed
      if($crashed === false) {
        if (getLastResult() >= $cashOutAt) {
          if($streak < $streakStop) {
            $profit += Math.round($toPlayWith * ($cashOutAt-1));
            $toPlayWith *= $cashOutAt;
            $toPlayWith = Math.round($toPlayWith);
            $streak += 1;
            if($profit >= ($bankAt+$banked)) {
              $toPlayWith -= $bankAt;
              $banked += $bankAt;
            }
            console.log("Won! Profit (banked): " + $profit + "(" + $banked + "), Streak: " + $streak)
            $crashed = true;
          } else {
            console.log("Streak high, waiting for a loss. Streak: " + $streak);
            $streak += 1;
            $crashed = true;
          }
        } else {
          if($streak >= $streakStop) {
            $streak = 0;
            console.log("Resetting streak and resuming betting");
            $crashed = true;
          } else {
            $profit -= $toPlayWith;
            $end = true;
            alert("Hit a loss! Profit: " + $profit)
          }
        }
        break;
      }
  }
  if ($end === true) {
    return;
  }
  setTimeout(main, 1500);
}

init();
main();