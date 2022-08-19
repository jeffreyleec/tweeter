const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//creates new tweet with html template.
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

//inital clear tweet, then loops and appends all posts in reverse order
const renderTweets = function (tweets) {
  $("#tweetContainerID").empty();

  for (let i = tweets.length - 1; i >= 0; i--) {
    $("#tweetContainerID").append(createTweetElement(tweets[i]));
  }
};

//get request to load tweets
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

  //submit button - onclick submit posts new tweet
  myForm.addEventListener("submit", function (event) {
    // repeat
    event.preventDefault();

    $("#tweet-text").text($("#tweet-text").val());
    let innertext = $("#tweet-text").serialize();
    let innertextVal = $("#tweet-text").val().length;

    //new tweet input check
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

    //POST request for new tweet
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/tweets/",
      data: innertext,
    }).then((response) => {
      loadTweets();
      $remainingChar = 140;
      $(".counter").val($remainingChar);
      $("#tweet-text").val("");
    });

    //.catch(error => console.error(error));
  });
  let eventVal = false;
  const arrowSubmit = document.querySelector("#arrowBtn");
  const containerBox = document.querySelector("#newTweetContainer");

  arrowSubmit.addEventListener("click", function (event) {
    //arrow onclick feature for hiding posts container
    if (eventVal === false) {
      eventVal = true;
      containerBox.classList.add("disappear");
    } else if (eventVal === true) {
      eventVal = false;
      containerBox.classList.remove("disappear");
    }
  });
});
