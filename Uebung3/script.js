$(document).on("click", ".btn-success", function () { // selektiert <p>
  $(this).parent("li").remove();   // nimmt den selektierten absatz (this) und fadet ihn out
})

$(document).on("click", "#add", function () { // selektiert <p>
  $("#item").val("");
})

$(document).on("click", "#hideList", function () { // wenn hideList geklickt wird
  $("ol").toggle(function () {    // oeffnet wenn zu, schliesst wenn offen
    if ($("ol").is(":visible")) {   // if list not hidden: text von button "hide"
      $("#hideList").text("Hide List");
    } else {
      $("#hideList").text("Show List");   // if list hidden: text von button "show"
    }
  });
})


// make sortable
$(function () {
  $("#list").sortable();
  $("#list").disableSelection();    // so that the text isnt selected when i click on the item for too long
});



// A D D I N G   I T E M S   T O   T H E    L I S T :

function addItem() {
  // saves #item value in a variable to use it in the list elements
  e = $("#item").val();

  if (e !== '') { // check if input is not empty then add it as a new element
    $("ol").append('<li id="element" class="list-group-item">' + e + ' <button type="button" class="btn btn-success">Done</button> </li>');
    console.log("element added");
  }

  $("#item").val(''); // clear the input field after adding the item

  updateHideListButton(); // once one element is added, the hide list button should appear
}

// IF ADD BUTTON CLICKED, ADD THE ITEM
$(document).ready($("#add").on("click", addItem));

$(document).on("click", ".btn-success", function () {
  $(this).parent().toggleClass("done");
  updateHideListButton();


  // create confetti elements
  const confettiColors = ['#76e7cf', '#ce76e7', '#8fe776', '#e8768f']; 
  const numConfetti = 250;
  const confetti = document.createElement('div');
  confetti.className = 'confetti';

  for (let i = 0; i < numConfetti; i++) {
    const confettiItem = document.createElement('div');
    confettiItem.className = 'confetti__item';
    confettiItem.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    confettiItem.style.left = Math.random() * 100 + '%';
    confettiItem.style.top = Math.random() * 100 + '%';
    confetti.appendChild(confettiItem);
  }

  document.body.appendChild(confetti);

  const suppiElement = document.createElement('div');
  suppiElement.textContent = 'Suppiiiiii 👏🏻';
  suppiElement.style.color = '#e8768f';
  suppiElement.style.position = 'fixed';
  suppiElement.style.top = '50%';
  suppiElement.style.left = '50%';
  suppiElement.style.transform = 'translate(-50%, -50%)';
  suppiElement.style.fontSize = '3em';
  suppiElement.style.zIndex = '99999';
  document.body.appendChild(suppiElement);

  // remove Suppiiiiii element after 1.5 seconds
  setTimeout(() => {
    document.body.removeChild(suppiElement);
  }, 1500);


  // remove confetti after animation is finished
  setTimeout(function () {
    document.body.removeChild(confetti);
  }, 3000);
});

// depending on if there are any tasks: show or hide the button of showing and hiding the list
function updateHideListButton() {
  var numUnfinishedTasks = $(".list-group-item:not(.done)").length;
  if (numUnfinishedTasks > 0) {
    $("#hideList").show();
  } else {
    $("#hideList").hide();
  }
}

$(document).ready(function () {
  $("#add").on("click", addItem);
  $("#item").keypress(function (event) {
    if (event.which === 13) { // check if the pressed key is "Enter"
      addItem();
    }
  });
});