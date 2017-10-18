
//Global Variables
var topics = ["Bat", "Bike", "Cliff", "Baseball", "Grey", "Pillow", "Blue", "Window", "Keyboard"];


// Function for displaying buttons
function renderButtons(){

  // Deleting the buttons prior to adding new topics
  $("#buttons-view").empty();

  // Looping through the array of topics
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

//Calling renderButtons at the starting so that buttons could be displayed which are present in the topics array
renderButtons();

//Function for getting the URL and calling the getGifInfo function
function getURL(){

   //Capturing the data-name in a variable
   var searchAnimal = $(this).attr("data-name");

   //Url for the API which passes searchAnimal along with the API Key 
   var url = "https://api.giphy.com/v1/gifs/search?q=" + searchAnimal + "&rating=g&limit=10&api_key=TolAYTQXtHkC4X2gJaA7gy8NjY2XS0o4";

   //Calling the function getGifInfo to fetch the API object while passing the URL into it
   getGifInfo(url);
}

//Function getGifInfo
function getGifInfo(urlLink){

  //results area is cleared at the starting so that previous results are not displayed
  $("#results").empty();

  //AJAX call using the urlLink passed in the function
  $.ajax({
          url: urlLink,
          method: "GET"
          }).done(function(response) {

          //For loop to render all the images till the end of length of API array
          for(var i=0; i < response.data.length; i++){

          //Animated Image is captured in the imageAnimated from the response
          var imageAnimated = response.data[i].images.fixed_height.url;

          //Still Image is captured in the imageStill from the response
          var imageStill = response.data[i].images.fixed_height_still.url;

          //Creating the div with the class animalClass
          var animalDiv = $("<div class = 'animalClass'>");

          //AnimalImg is equated to the IMG tag which is being created using jQuery
          var animalImg = $("<img>");

          //Adding attributes the the animalImg 
          animalImg.attr({
            "src": imageStill,
            "alt": "animal image",
            "data-still": imageStill,
            "data-animate": imageAnimated,
            "data-state": "still",
            "class": "gif"
          });

          //animalImg is appended into animalDiv
          animalDiv.append(animalImg);

          //Rendering the Rating of the GIF using a p tag
          $("<p>Rating: " + response.data[i].rating  + "</p>").appendTo(animalDiv);

          //Captured animal image is rendered in the screen into the results div using the appepend function
          $("#results").append(animalDiv);
        }    
    }); 
  }

// This function handles events where one button is clicked
$("#addanimal").on("click", function(event) {

        //Prevents the deault part to occur
        event.preventDefault();

        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        //checking the condition if user enters nothing then button should not be created
        if(animal === ""){

          alert("Unable To Render Button With The Empty Name");
  
        }

        //Control goes here if user enters something in the textbox
        else{

        // The movie from the textbox is then added to our array
        topics.push(animal);

        // Calling renderButtons which handles the processing of rendering the new set of buttons
        renderButtons();

        // Clearing out the Textbox after the Button has been rendered on screen
        $("#animal-input").val('');
      }
      });

//This funtion gets called when user clicks the image to change its state
$(document).on("click", ".gif", function() {
      
    //variable state is used to grab the surrent state of the clicked image    
    var state = $(this).attr("data-state");
     
    //Check if the variable state is equal to 'still',
    // then update the src attribute of this image to it's data-animate value,
    // and update the data-state attribute to 'animate'.

    if(state === "still"){
      var animate = $(this).attr("data-animate"); 
      $(this).attr({
        "src": animate, 
        "data-state": "animate"
      }); 
    }

    // If state is equal to 'animate', then update the src attribute of this
    // image to it's data-still value and update the data-state attribute to 'still'
    
    else if(state === "animate"){
        var still = $(this).attr("data-still"); //captures the data-still URL into variable still
        $(this).attr({
          "src": still, 
          "data-state": "still"
          }); 
    }
});

// Generic function for calling the getURL function
      $(document).on("click", ".animal", getURL);
       




