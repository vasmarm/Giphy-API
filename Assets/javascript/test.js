
//Global Variables
var apiKey = "TolAYTQXtHkC4X2gJaA7gy8NjY2XS0o4";
var searchAnimal = "rat";
var imageUrl;
var animalImg;


//calling the function getGifInfo 
$("#addanimal").on("click", function() {
  
  var url = "https://api.giphy.com/v1/gifs/search?q=" + searchAnimal + "&api_key=" + apiKey;
   console.log(url);
    $.ajax({
          url: url,
          method: "GET"
        }).done(function(data) {
          console.log(data);


       //   for(var i=0; i<data.data.length; i++){
          //image is captured in the imageURL from the response
          imageUrl = data.data[0].url;

          console.log(imageUrl);

          //animalImg is equated to the IMG tag which is being created using jQuery
          animalImg = $("<img>");

          //give the image tag through animalImg the attributes of the URL source of the cat image
          animalImg.attr("src", imageUrl);
          animalImg.attr("alt", "animal image");
          console.log(animalImg);

          //captured animal image is rendered in the screen into the images div using the prepend function
          $("#animal-img").prepend(animalImg);

      //  }
            
        }); 
}
);


//function to render the gifs on the screen



