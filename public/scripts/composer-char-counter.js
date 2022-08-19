//new tweet container values
$(document).ready(function () {
  let maxCounter = 140;
  let $remainingChar;

  $("#tweet-text").on('input', function () {
    let numberOfLetters = $(this).val().length;
    $remainingChar = maxCounter - numberOfLetters;
    let $counter = $(this).parent().parent().find('.counter');
    $counter.text($remainingChar);
    if ($remainingChar < 0) {
      $counter[0].classList.add("overMax")
    } else {
      $counter[0].classList.remove("overMax")
    }
  });

});