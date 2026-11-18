// Runs once all the DOM elements of the page are ready to be used
$(function() {

  // Show the starting stats on the page
  checkAndUpdatePetInfoInHtml();

  // When each button is clicked, call the function for that button
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.sleep-button').click(clickedSleepButton);

});

// The pet's info: name (string), weight, happiness, and energy (numbers)
var pet_info = {name: "Anthony Helicopter", weight: 20, happiness: 5, energy: 5};

// Arrays of things the pet can say, one array per button
var treat_comments = ["Yum! More please!", "Best treat ever!", "Nom nom nom!"];
var play_comments = ["That was so fun!", "Again, again!", "Wheee!"];
var exercise_comments = ["I'm so tired...", "Do we have to?", "My legs hurt!"];
var sleep_comments = ["Zzz... so cozy.", "I feel rested!", "Five more minutes..."];

// Picks a random phrase out of an array
function getRandomComment(comments) {
  var index = Math.floor(Math.random() * comments.length);
  return comments[index];
}

// Shows a message from the pet on the page (no alert or console.log)
function showPetComment(message) {
  /*
    jQUERY METHOD #1: .fadeToggle(duration)
    .fadeToggle() fades an element in if it is currently hidden, and fades it
    out if it is currently visible. The number is how long the fade takes in
    milliseconds (400 = 0.4 seconds).
    Here I want the comment to always FADE IN, so before calling .fadeToggle()
    I hide the comment on purpose. Because it is hidden, .fadeToggle() fades it in.

    .css('display', 'none') is jQUERY METHOD #2 (explained in updateMoodColors below).
    Here it instantly hides the comment so .fadeToggle() has a hidden element to fade in.

    .finish() makes sure any fade that is still running is completed and cleared
    from the queue first. Without it, clicking buttons quickly would stack up
    fades and the comment could fade out instead of in.
  */
  $('.pet-comment')
    .finish()
    .text(pet_info['name'] + " says: " + message)
    .css('display', 'none')
    .fadeToggle(400);
}

// Treat: happier and heavier
function clickedTreatButton() {
  pet_info['happiness'] += 2;
  pet_info['weight'] += 1;
  showPetComment(getRandomComment(treat_comments));
  checkAndUpdatePetInfoInHtml();
}

// Play: happier, lighter, and a bit more tired
function clickedPlayButton() {
  pet_info['happiness'] += 2;
  pet_info['weight'] -= 1;
  pet_info['energy'] -= 1;
  showPetComment(getRandomComment(play_comments));
  checkAndUpdatePetInfoInHtml();
}

// Exercise: less happy, lighter, and more tired
function clickedExerciseButton() {
  pet_info['happiness'] -= 1;
  pet_info['weight'] -= 2;
  pet_info['energy'] -= 2;
  showPetComment(getRandomComment(exercise_comments));
  checkAndUpdatePetInfoInHtml();
}

// Sleep (new button): more energy and a little happier
function clickedSleepButton() {
  pet_info['energy'] += 3;
  pet_info['happiness'] += 1;
  showPetComment(getRandomComment(sleep_comments));
  checkAndUpdatePetInfoInHtml();
}

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

// Stops weight, happiness, and energy from ever going below zero
function checkWeightAndHappinessBeforeUpdating() {
  if (pet_info['weight'] < 0) {
    pet_info['weight'] = 0;
  }
  if (pet_info['happiness'] < 0) {
    pet_info['happiness'] = 0;
  }
  if (pet_info['energy'] < 0) {
    pet_info['energy'] = 0;
  }
}

// Changes colors based on how happy the pet is
function updateMoodColors() {
  // Pick a color: green if very happy, red if sad, gray otherwise
  var mood_color = "gray";
  if (pet_info['happiness'] >= 8) {
    mood_color = "green";
  } else if (pet_info['happiness'] <= 2) {
    mood_color = "red";
  }

  /*
    jQUERY METHOD #2: .css(property, value)
    .css() changes a CSS style of an element directly from JavaScript.
    The first argument is the CSS property name and the second is the new value.
    Here it sets the text color of the happiness number, and the border
    around the pet image, to the mood color picked above. Because the colors
    are set every time the stats update, they change as the pet's mood changes.
  */
  $('.happiness').css('color', mood_color);
  $('.pet-image').css('border', '4px solid ' + mood_color);
}

// Updates the HTML with the current values in pet_info
function updatePetInfoInHtml() {
  $('.name').text(pet_info['name']);
  $('.weight').text(pet_info['weight']);
  $('.happiness').text(pet_info['happiness']);
  $('.energy').text(pet_info['energy']);
  updateMoodColors();
}