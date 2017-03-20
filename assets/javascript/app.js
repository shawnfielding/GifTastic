$(document).ready(function() {

	var animalsArray = ["bison", "ferret", "shark", "cocker spaniel", "panda", "sand cat", "lamb", "alpaca", "capybera", "tiger", "giraffe", "kangaroo"];

	function renderAnimalLinks() {
		$("#animalButtons").empty(); //delete the current animal buttons.
		// loop through the animals
		$.each(animalsArray, function animalLinks() {
			$("#animalButtons").append("<input type='button' class='animalButton' id='" + this + "'  value='" + this + "'>");
		});
	}

	function displayAnimals(ani) {
		console.log("made it here")
		theAni = ani.replace(/ /g, '+');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theAni + "&api_key=dc6zaTOxFJmzC+limit=10";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			var animalImage = response;
			$("#animalPics").html("");
			$.each(animalImage, function() {
				var theImage = JSON.parse(animalImage).data.images.fixed_width_small.url;
				var theImageMoving = JSON.parse(animalImage).data.images.fixed_width_small_still.url;
				var aniTag = $("<img>");
				aniTag.attr("src", theImage);
				aniTag.attr("data-still", theImage);
				aniTag.attr("data-animated", theImageMoving);
				aniTag.attr("onClick", "changeState('" + theImage + "'," + theImageMoving + "')");
				$("#animalPics").append(aniTag);
			});
		});
	}

	function changeState(x, y) {
		if ($(this).attr("src") === x) { //if it is still, animate.
			$(this).attr("src", y);
		} else if ($(this).attr("src") === y) { // if it is animate, still.
			$(this).attr("src", y);
		} else {
			console.log("No match for src.")
		}
	}

	$("#addAnimal").on("click", function(event) {
		event.preventDefault(); // stop another click
		var a = $("#animal-input").val().trim(); //Get the input
		animalsArray.push(a); //add new animal to array
		renderAnimalLinks(); // remake the buttons
	});

	renderAnimalLinks();

	$("#addAnimal").on("click", function(event) {
		event.preventDefault(); // stop another click
		var a = $("#animal-input").val().trim(); //Get the input
		animalsArray.push(a); //add new animal to array
		renderAnimalLinks(); // remake the buttons
	});

	$(".animalButton").on("click", function(event) {
		console.log("made it to click")
		event.preventDefault();
		var ta = $(this).val();
		displayAnimals(ta);
	})



})
