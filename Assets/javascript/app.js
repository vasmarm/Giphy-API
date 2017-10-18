
//Global Variables
var topics = ["Bat", "Bike", "Cliff", "Baseball", "Grey", "Pillow", "Blue", "Window", "Keyboard"];


//calling the function getGifInfo 
/*$("#addanimal").on("click", function() {
  console.log("hi");
  getURL();
   
});*/

// Function for displaying movie data
function renderButtons(){

  // Deleting the buttons prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of animals
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each animal in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var b = $("<button>");

    // Adding a class of animal to our button
    b.addClass("animal");

    //  Adding a data-attribute
    b.attr("data-name", topics[i]);

    // Providing the initial button text
    b.text(topics[i]);

    // Adding the button to the buttons-view div
    $("#buttons-view").append(b);
  }
}

renderButtons();

function getURL(){


   //capturing the data-name 
   var searchAnimal = $(this).attr("data-name");

   //url for the API along with the API Key which is declared globally
   var url = "https://api.giphy.com/v1/gifs/search?q=" + searchAnimal + "&rating=g&limit=2&api_key=TolAYTQXtHkC4X2gJaA7gy8NjY2XS0o4";

   //calling the function getGifInfo to fetch the API object while passing the URL into it
   getGifInfo(url);
}

function getGifInfo(urlLink){

    $("#results").empty();

    //AJAX call using the urlLink passed in the function
  $.ajax({
          url: urlLink,
          method: "GET"
          }).done(function(response) {

            console.log(response);
          //For loop to render all the images till the end of length of API array
          for(var i=0; i < response.data.length; i++){

          //Image is captured in the imageURL from the response
          var imageAnimated = response.data[i].images.fixed_height.url;

          var imageStill = response.data[i].images.fixed_height_still.url;

          //creating the div
          var animalDiv = $("<div class = 'animalClass'>");

          //AnimalImg is equated to the IMG tag which is being created using jQuery
          var animalImg = $("<img>");

          //Give the image tag through animalImg the attributes of the URL source of the cat image
          animalImg.attr("src", imageStill);
          animalImg.attr("alt", "animal image");
          animalImg.attr("data-still", imageStill);
          animalImg.attr("data-animate", imageAnimated);
          animalImg.attr("data-state", "still");
          animalImg.attr("class", "gif");

          animalDiv.append(animalImg);

          //Rendering the Rating of the GIF
          $("<p>Rating: " + response.data[i].rating  + "</p>").appendTo(animalDiv);

          //Captured animal image is rendered in the screen into the images div using the prepend function
          $("#results").append(animalDiv);
        }    
    }); 
  }

// This function handles events where one button is clicked
$("#addanimal").on("click", function(event) {

        event.preventDefault();

        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        if(animal === ""){

          alert("Unable to render button with the empty name");
  
        }

        else{

        // The movie from the textbox is then added to our array
        topics.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

        // Clearing out the Textbox after the Button has been rendered on screen
        $("#animal-input").val('');
      }
      });

$(document).on("click", ".gif", function() {
      
    console.log("Click is working");    
    var state = $(this).attr("data-state");
     
    //Check if the variable state is equal to 'still',
    // then update the src attribute of this image to it's data-animate value,
    // and update the data-state attribute to 'animate'.

    if(state === "still"){
      var animate = $(this).attr("data-animate"); //captures the data-animate URL into variable animate
      $(this).attr("src", animate); //updates the src to what we have in the varibale animate
      $(this).attr("data-state", "animate"); //updates the data-state to the word "animate"
      
    }

    // If state is equal to 'animate', then update the src attribute of this
    // image to it's data-still value and update the data-state attribute to 'still'
    
    else if(state === "animate"){
        var still = $(this).attr("data-still"); //captures the data-still URL into variable still
        $(this).attr("src", still); //updates the src to what we have in the varibale still
        $(this).attr("data-state", "still"); //updates the data-state to the word "still"
    }
});

// Generic function for calling the getURL function
      $(document).on("click", ".animal", getURL);
       




