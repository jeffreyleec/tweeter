// $(document).ready(function() {
//   // --- our code goes here ---

//   let countMax = 140
//   $("#tweet-text").on('keypress', function(event) {
//     //console.log(event.originalEvent.key,' was clicked')
//     //console.log(this); //The this keyword is a reference to the button
//     // if(event.originalEvent.key){
//     //   $(.counter)
//     // }
//     //count -= event.target.value.length 

//     //console.log(this.value.length + 1)

//     let countLeft = countMax - (this.value.length + 1)   
//     console.log(countLeft)
//     //return countLeft;

//     document.querySelector('.counter').innerHTML = countLeft
//     if(countLeft > 0 && countLeft <= 140){
//       count.setAttribute('status', notOverMax)
//     } else {
//       count.setAttribute('status', notOverMax)
//     }

//   });
// });
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
    if ($remainingChar < 100) {
      $counter[0].classList.add("overMax")
    } else {
      $counter[0].classList.remove("overMax")
    }

    //console.log(document.querySelector('.counter').classList)
  });

});