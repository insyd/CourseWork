function pays($bal, $pay, $tapr) {
  var $months = 0, $total = 0, $paid = 0;
  while ($bal > 0) {
    $bal -= $pay;
    $bal += ($bal * ($tapr / 12));
    $months++;
    $total = $total + $pay;
  }
  return [$months, $total];
}

$("#formCalculate").on("click", function () {

  var $curBal = $("#currentBalance").val();
  var $payAmt = $("#monthlyPayment").val();
  var $apr = ($("#APR").val() / 100);
  var $payPer = $("#payFreq").val();
  var $multiplier = 0;

  switch($payPer) {
    case 'Weekly':
      $multiplier = 0.25;
      break;
    case 'Fortnightly':
      $multiplier = 0.5;
      break;
    case 'Monthly':
      $multiplier = 1;
      break;
    case 'Quarterly':
      $multiplier = 3;
      break;
  }

  alert("Test");

  var $temp = pays($curBal, $payAmt, $apr);

  var $payDura = $temp[0];
  var $totalPaid = $temp[1];

  $("#totalPay").html("£" + $totalPaid);
  $("#interestPaid").html("£");
  $("#timetoPay").html($payDura * $multiplier + " payments " + $payPer);
  $("#calcResult").css("width", $("#calcForm").width());
  $("#calcResult").css("display", "table");
});