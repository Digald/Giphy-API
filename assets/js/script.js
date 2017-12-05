$(document).ready(function() {
    var pokemonList = ["pichu", "lugia", "ho-oh", "raichu", "venusaur"];

    function displayGifs() {
        var searchTerm = $(this).data("name");
        console.log(searchTerm);
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + searchTerm + "&limit=10";
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {

            console.log(response);
            $("#gif-dump").empty();
            for (var i = 0; response.data.length; i++) {
                var gifDiv = $("<div class='gifItem'>");
                var rating = response.data[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var image = $("<img>");
                // give the image two more data attributes
                // set each of the attributes equal to one of the two links
                // set the src equal to the data state just like in the click function at the bottom
                image.addClass("gif");
                image.attr("src", response.data[i].images.fixed_height.url);
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

    // whenever you click something with the class .gif, it runs the function to display gifs searched with the text in the button
    $(document).on("click", ".gifButton", displayGifs);
    makeButtons();

    // change pause or play gif on click
    $(".gif").on("click"), function() {
        var state = $(this).attr('data-state');
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    } // of of pause gif

}); // end of document ready