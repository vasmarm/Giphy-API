
//Global Variables
var apiKey = "TolAYTQXtHkC4X2gJaA7gy8NjY2XS0o4";
var searchAnimal = "";
var imageUrl = "";
var animalImg = "";
var animalButtons = [];


//calling the function getGifInfo 
/*$("#addanimal").on("click", function() {
  console.log("hi");
  getURL();
   
});*/

function getURL(){

   var searchAnimal = $(this).attr("data-name");

   //url for the API along with the API Key which is declared globally
   var url = "https://api.giphy.com/v1/gifs/search?q=" + searchAnimal + "&api_key=" + apiKey;

   //calling the function getGifInfo to fetch the API object while passing the URL into it
   getGifInfo(url);
}

function getGifInfo(urlLink){

    
    //AJAX call using the urlLink passed in the function
  $.ajax({
          url: urlLink,
          method: "GET"
          }).done(function(response) {

          //for loop to render all the images till the end of length of API array
          for(var i=0; i<response.data.length; i++){

          //image is captured in the imageURL from the response
          imageUrl = response.data[i].images.original.url;


          //animalImg is equated to the IMG tag which is being created using jQuery
          animalImg = $("<img>");

          //give the image tag through animalImg the attributes of the URL source of the cat image
          animalImg.attr("src", imageUrl);
          animalImg.attr("alt", "animal image");

          //captured animal image is rendered in the screen into the images div using the prepend function
          $("#animal-img").append(animalImg);
        }    
    }); 
  }

// This function handles events where one button is clicked
$("#addanimal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();
        // The movie from the textbox is then added to our array
        animalButtons.push(animal);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

      });

// Function for displaying movie data
      function renderButtons() {

        // Deleting the buttons prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animalButtons.length; i++) {

          // Then dynamicaly generating buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var b = $("<button>");

          // Adding a class of animal to our button
          b.addClass("animal");

          //  Adding a data-attribute
          b.attr("data-name", animalButtons[i]);

          // Providing the initial button text
          b.text(animalButtons[i]);

          // Adding the button to the buttons-view div
          $("#buttons-view").append(b);
        }
      }

// Generic function for displaying the movieInfo
      $(document).on("click", ".animal", getURL);


// Calling the renderButtons function to display the intial buttons
//      renderButtons();




