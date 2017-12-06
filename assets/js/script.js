$(document).ready(function() {
    var pokemonList = ["pichu", "lugia", "ho-oh", "raichu", "venusaur"];

    function displayGifs() {
        var searchTerm = $(this).attr("data-name");
        console.log(searchTerm);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            console.log(response);
            $("#gif-dump").empty();

            var results = response.data;
            var gifDiv;
            var rating;
            var p;
            var image;
            for (var i = 0; results.length; i++) {
                gifDiv = $("<div class='gifItem'>");
                rating = results[i].rating;
                p = $("<p>").text("Rating: " + rating);
                image = $("<img>");
                // give the image two more data attributes
                // set each of the attributes equal to one of the two links
                // set the src equal to the data state just like in the click function at the bottom
                image.addClass("gif");
                image.attr("data-state", "still");
                image.attr("data-still", results[i].images.fixed_height_still.url);
                image.attr("data-animate", results[i].images.fixed_height.url);
                image.attr("src", results[i].images.fixed_height_still.url);
                gifDiv.append(p);
                gifDiv.append(image);

                $("#gif-dump").prepend(gifDiv);
            }
            // end of done
        });
    } // end of displayGifs

    function makeButtons() {
        // empty out any buttons that have been put previously
        $("#button-dump").empty();
        // make buttons for each item in the array by looping over it
        for (var i = 0; i < pokemonList.length; i++) {
            var button = $("<button>");
            button.addClass("gifButton");
            button.attr("data-name", pokemonList[i]);
            button.text(pokemonList[i]);
            $("#button-dump").append(button);
        }
    } // end of makeButtons

    // when you click go button it will add new button to list and push term to the array
    $("#go").click(function(event) {
        // prevents from reloading the page upon submission
        event.preventDefault();
        // takes input from the search and stores it into a variable
        var searchInput = $("#term-input").val().trim();
        // pushes that searched term into my first array
        pokemonList.push(searchInput);
        // run the makeButton fucntion again so that the new search can show up too
        makeButtons();
    });
    // change pause or play gif on click
    function toggleGif() {
        var state = $(this).attr('data-state');
        console.log(state);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        console.log(state);
    } // end of of pause gif

    // whenever you click something with the class, it runs the function to display gifs and then toggle them if clicked
    $(document).on("click", ".gifButton", displayGifs);
    $(document).on("click", ".gif", toggleGif)
    makeButtons();

}); // end of document ready