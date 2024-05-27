let timeRemaining = 3; // Amount of time remaining for the countdown

let timeToShowMonster = 2000; // Amount of time to show the monster
let timeToHideMonster = 2000; // Amount of time to hide the monster

let hideMonsterTimeout; // Timeout id for hiding the monster

let life = 3; // The player's life

function hideMonster() {
  // Change the life and the colour of the holes
  life--;

  switch (life) {
    case 2:
      $(".hole").css({ "border-color": "yellow" });
      break;
    case 1:
      $(".hole").css({ "border-color": "red" });
      break;
    case 0:
      // If the game is over show the game over screen
      $("#gameover").slideDown(500);
      break;
  }

  // Hide the monster
  $("#monster").hide();

  // Show the monster later again
  setTimeout(showMonster, timeToShowMonster);
}

function showMonster() {
  // Find the target div randomly and move the monster
  // to that div
  let div = $(".hole").eq(parseInt(Math.random() * 9));

  // Show the monster
  $("#monster").appendTo(div).show();

  // Hide the monster later
  hideMonsterTimeout = setTimeout(hideMonster, timeToHideMonster);
}

function startGame() {
  // Hide the countdown timer
  $("#countdown").fadeOut(500);
  // Show the monster the first time
  setTimeout(showMonster, timeToShowMonster);

  // Set up the click handler of the monster
  $("#monster").on("click", function () {
    // - Clear the previous timeout
    clearTimeout(hideMonsterTimeout);

    // - Hide the monster
    $("#monster").hide();

    // - Adjust the monster time
    timeToHideMonster -= 100;
    timeToShowMonster -= 100;

    // - Show the monster later again
    setTimeout(showMonster, timeToShowMonster);
  });
}

function countdown() {
  // Decrease the remaining time
  timeRemaining--;

  if (timeRemaining > 0) {
    // Continue the countdown if there is still time;
    $("#countdown").text(timeRemaining);
    // Wait for 1 second, and call countdown() again
    setTimeout(countdown, 1000);
  } else {
    // otherwise, start the game when the time is up
    $("#countdown").text("Start");
    startGame();
  }
}

$(function () {
  // Start the countdown screen one second after the page is ready
  setTimeout(countdown, 1000);
});
