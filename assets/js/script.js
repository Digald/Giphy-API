$(document).ready(function() {
    var pokemonList = ["pichu", "lugia", "ho-oh", "raichu", "venusaur"];

    function displayGifs() {
        var searchTerm = $(this).data("name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + searchTerm + "&limit=10";
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
        	console.log(response);
        	response.

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
    $(document).click(".gifButton", displayGifs);
    makeButtons();
}); // end of document ready