$(document).ready(function() {

var st = "data-still";
var an="data-animated";

	var animalsArray = [
		"bison",
		"ferret",
		"shark",
		"cocker spaniel",
		"panda",
		"sand cat",
		"lamb",
		"alpaca",
		"capybera",
		"tiger",
		"giraffe",
		"kangaroo"
	];

	function renderAnimalLinks() {
		$("#animalButtons").empty(); //delete the current animal buttons.
		// loop through the animals
		$.each(animalsArray, function animalLinks() {
			$("#animalButtons").append("<input type='button' class='animalButton' id='" + this + "'  value='" + this + "' onclick=''>");
		});
	}

	function displayAnimals(ani) {

		console.log(ani);
		theAni = ani.replace(/ /g, '+');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theAni + "&api_key=dc6zaTOxFJmzC&limit=10";
		$.ajax({url: queryURL, method: "GET"}).done(function(response) {
			var animalImages = response.data;
			console.log(animalImages);
			$("#animalPics").html("");
			for(var i = 0;i<animalImages.length;i++)
				var  theURL = $("#animalPics").append("<img src=" + JSON.stringify(animalImages[i].images.fixed_height_still.url) + " class='aniClass'  id=" + JSON.stringify(.id) + " data-still=" + JSON.stringify(animalImages[i].images.fixed_height_still.url) + " data-animated=" + JSON.stringify(animalImages[i].images.fixed_height.url) + ">");
			console.log(theURL)})
	})
}
	renderAnimalLinks();


	$("#addAnimal").on("click", function(event) {
		var a = $("#animal-input").val().trim(); //Get the input
		animalsArray.push(a); //add new animal to array
		renderAnimalLinks(); // remake the buttons
	});

	$(".animalButton").on("click", function(event) {
		var ta = $(this).val();
		console.log(ta);
		displayAnimals(ta);
	});

	$("#animalPics").on("click", function(event) {
		var theimg = event.target;
		if(JSON.stringify($(theimg).attr("src")) === JSON.stringify($(theimg).attr("data-still"))) {
			JSON.stringify($(theimg).attr("src", $(theimg).attr("data-animated")));
		} else { JSON.stringify($(theimg).attr("src",$(theimg).attr("data-still")));
		}
	});
});
