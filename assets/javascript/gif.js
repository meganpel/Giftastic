var animals = ["kitten", "puppy", "goat", "elephant", "cockatiel", "penguin", "giraffe", "otter", "dinosaur", "turtle", "zebra"];

for (var i = 0; i < animals.length; i++) {
    createButton(animals[i]);
}

function createButton(animal) {
    $("#animal-buttons").append('<button class="animal-button" animal="' + animal + '">' + animal + '</button>');

    $(".animal-button").on('click', function(){
        var animal = $(this).attr("animal");
        searchForAnimal(animal);
    });
}

$("#animal-search-submit").click(function() {
    var animal = $("#animal-search").val();
    createButton(animal);
});

function searchForAnimal(animal) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=quOvlYlPFDtAY7vwA6cHTHP6b8njBUHV&limit=10";

     $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var results = response.data;

        $("#animal-pictures").html("");
        
        for (var i = 0; i < results.length; i++) {
            var holder = $("<div>");
            holder.attr("class", "animal-image-holder");

            var p = $("<div>").text("Rating: " + results[i].rating);
            //var rating = results[i].rating;            
            var animalImage = $("<img>");

            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("class", "animal-image");
            animalImage.attr("data-state", "data-still");
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);

            holder.append(animalImage, p);
            $("#animal-pictures").append(holder);
        }

        $(".animal-image").on("click", function() {
            var state = $(this).attr("data-state");
            if (state === "data-still")  {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "data-animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "data-still");
            }
        });
      });
}