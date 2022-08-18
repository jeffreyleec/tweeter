/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {


  const createTweetElement = function (tweetData) {
    const name = tweetData.user.name;
    const avatar = tweetData.user.avatars;
    const handle = tweetData.user.handle;
    const content = tweetData.content.text;
    const time = timeago.format(tweetData.created_at);
    //console.log(name)
    return ` 
  <article class="tweet-container">
        <header>
            <div class="identity">
              <div class="logo">
                <img src="${avatar}">  
              </div>
              <div class="name">${name}</div>
            </div>
            
            <div class="tagHandle">${handle}</div>
          

        </header>
        
        <div class="tweetContentById">
          <p>${content}</p>
        </div>


        <footer>
          <p>${time} </p>
          <div >
            <i id="icon1" class="fa-solid fa-flag"></i>
            <i id="icon2" class="fa-solid fa-retweet"></i>    
            <i id="icon3" class="fa-solid fa-heart"></i>
          </div>
        </footer>
  `


  }

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    //let output=[];
    for (let i = tweets.length - 1; i >=0; i--) {
      $('#tweetContainerID').append(createTweetElement(tweets[i]))
    }


  }

  const loadTweets = function () {
    $.ajax({
      method: "GET",
      url: "http://localhost:8080/tweets/",
    })
      .then(response => {
        //empty text box/ reset counter / refresh to get rdy for next tweet 
        renderTweets(response);
      })

      .catch(error => console.error(error));
  }
  //call a load tweet func 
  loadTweets();
  //called when you made req


  const myForm = document.querySelector('form');



  myForm.addEventListener('submit', function (event) {

    // repeat
    event.preventDefault();
    let innertext = $('#tweet-text').serialize()
    let innertextVal = $('#tweet-text').val().length
    //console.log(innertextVal)
    //console.log(innertextVal[0].value.length)

    if (innertextVal === 0) {
      alert("Please enter some text!");
      return
    }else if (innertextVal > 140){
      alert("Too Many Letters!");
      return
    }

    $.ajax({
      method: "POST",
      url: "http://localhost:8080/tweets/",
      data: innertext,
      success: function(response) {
        $remainingChar = 140;
        $(".counter").val($remainingChar);
        $("#tweet-text").val('');
       // loadTweets();
      }
    })
      .then(response => {

        //renderTweets(response);
      })

      .catch(error => console.error(error));

    //set text field empty, 
  });








  //renderTweets(data);
});













