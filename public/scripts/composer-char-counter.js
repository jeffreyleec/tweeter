
$(document).ready(function () {
  let maxCounter = 140;
  let $remainingChar;

  $("#tweet-text").on('input', function () {
    let numberOfLetters = $(this).val().length;
    $remainingChar = maxCounter - numberOfLetters;
    let $counter = $(this).parent().parent().find('.counter');
    //console.log($counter)
    $counter.text($remainingChar);
    //console.log($counter[0])
    if ($remainingChar < 0) {
      $counter[0].classList.add("overMax")
    } else {
      $counter[0].classList.remove("overMax")
    }

    //console.log(document.querySelector('.counter').classList)
  });

});