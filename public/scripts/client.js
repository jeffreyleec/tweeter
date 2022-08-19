/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweetData) {
  const name = tweetData.user.name;
  const avatar = tweetData.user.avatars;
  const handle = tweetData.user.handle;
  const safeHTML = `<p>${escape(tweetData.content.text)}</p>`;
  const content = safeHTML;
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
`;
};

const renderTweets = function (tweets) {
  $("#tweetContainerID").empty();

  for (let i = tweets.length - 1; i >= 0; i--) {
    $("#tweetContainerID").append(createTweetElement(tweets[i]));
  }
};

const loadTweets = function () {
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/tweets/",
  })

    .then((response) => {
      renderTweets(response);
    })

    .catch((error) => console.error(error));
};

$(document).ready(function () {
  loadTweets();

  const myForm = document.querySelector("form");
  const textError = document.querySelector("#textError");
  myForm.addEventListener("submit", function (event) {
    // repeat
    event.preventDefault();

    $("#tweet-text").text($("#tweet-text").val());
    let innertext = $("#tweet-text").serialize();
    let innertextVal = $("#tweet-text").val().length;

    if (innertextVal === 0) {
      document.getElementById("textError").innerHTML =
        '<i class="fa-solid fa-triangle-exclamation"></i>Please enter some text!<i class="fa-solid fa-triangle-exclamation"></i>';
      textError.classList.add("errorSection");
      return;
    } else if (innertextVal > 140) {
      document.getElementById("textError").innerHTML =
        '<i class="fa-solid fa-triangle-exclamation"></i>Too Much Test!<i class="fa-solid fa-triangle-exclamation"></i>';
      textError.classList.add("errorSection");
      return;
    } else {
      document.getElementById("textError").innerHTML = "";
      textError.classList.remove("errorSection");
    }

    $.ajax({
      method: "POST",
      url: "http://localhost:8080/tweets/",
      data: innertext,
    })
    .then((response) => {
      loadTweets();
      $remainingChar = 140;
      $(".counter").val($remainingChar);
      $("#tweet-text").val("");
    });

    //.catch(error => console.error(error));
  });
});
