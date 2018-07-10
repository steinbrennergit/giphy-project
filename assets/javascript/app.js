var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle",
    "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil",
    "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"]


// Function for creating individual buttons, so we don't have to dump buttons to render new ones
function createButton(str) {

    // Basic button construction
    let $newButton = $("<button>");
    $newButton.text(str);
    $newButton.addClass("animal-button");
    $("#buttons").append($newButton);
}

$(document).on("click", ".gif", function () {
    let state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$(document).on("click", ".animal-button", function () {
    var animal = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({ url: queryURL, method: "GET" }).then(function (response) {
        let results = response.data;

        for (var i = 0; i < results.length; i++) {
            let gifDiv = $("<div class='item'>");

            let rating = results[i].rating;

            let p = $("<p>").text("Rating: " + rating);

            let animalImage = $("<img>").addClass("gif");
            let url = results[i].images.fixed_height_still.url;
            animalImage.attr("src", url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-still", url);
            animalImage.attr("data-state", "still");

            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

            $("#gifs").prepend(gifDiv);
        }
    });
});

// This function handles events where one button is clicked
$("#add-animal").on("click", function (event) {

    // Prevent input form from reloading page
    event.preventDefault();

    // Get input and clear the input box
    let input = $("#animal-input").val().trim();
    $("#animal-input").val("");

    // Only push to animals and render if user entered a NEW animal
    if (animals.indexOf(input) === -1 && input !== "") {
        animals.push(input);
        createButton(input);
    }
});