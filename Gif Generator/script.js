$(document).ready(function () {

  
// global values
  
var $input = $("#input");
var $submit = $("#submit");
var apiKey = "l7lKT46iaPwFEDN7ikfo0PfxjGjqNkza";
var $imgBody = $(".img-body");

  
// get input values when the user presses Submit 
$submit.on("click", function(event) {
  event.preventDefault();
  var inputVal = $input.val();
  getGiphys(inputVal);
  
  //Here I tried to empty the image body to remove old gifs and show new gifs when a new submition would take place, but it didn't succeed..
  /*var oldVal = inputVal
    .done(function() {
      if (oldVal != inputVal) {
        $imgBody.empty()
        getGiphys(inputVal); }
      else {
        return false;
      }*/
});
  
// Make a GET request to the giphy api with the input 
  
function getGiphys(inputVal) {
  $.getJSON("http://api.giphy.com/v1/gifs/search?q=" + inputVal + "&api_key=" + apiKey + "&limit=5")
      .done(function(data) { 
        for (var i = 1; i <  5; i++) {
          var gifImg = data.data[i].images.downsized.url; 
          createBox(gifImg);
        }
  });
  
};

function createBox(gifImg) {
  var $newImg = $("<img>") //We create a new html tag named <img>
  $newImg.attr("src", gifImg);// ==> <img src="gifImg">
  $newImg.addClass("img-box");
  $imgBody.append($newImg);
  var $button = $("<button class='button js-button'>Show URL</button>");
  var $sectiontohide = $("<div>" + gifImg + "</div>");
  $imgBody.append($button);
  $imgBody.append($sectiontohide);
  $sectiontohide.hide() == true;
  $button.on("click",function() {
      $sectiontohide.toggle();
  });
};
});