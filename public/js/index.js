// Get references to page elements
var $restaurantList = $("#restaurant-list");

// The API object contains methods for each kind of request we'll make
var API = {
  searchRestaurants: function (cityInput) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/restaurants",
      data: JSON.stringify(cityInput)
    });
  },
  getRestaurants: function () {
    return $.ajax({
      url: "api/restaurants",
      type: "GET"
    });
  },
  deleteRestaurants: function () {
    return $.ajax({
      url: "api/restaurants/",
      type: "DELETE"
    });
  },
  createSelectedLocation: function (locationInput) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/selectedLocation",
      data: JSON.stringify(locationInput)
    });
  },
  deleteSelectedLocations: function () {
    return $.ajax({
      url: "api/selectedLocation/",
      type: "DELETE"
    });
  }
};

var deleteRestaurantsInCurrentDatabase = function () {
  API.deleteRestaurants().then(function () {
    console.log("DELETE!");
  });
};

// var deleteSelectedLocations = function() {
//   API.deleteSelectedLocations().then(function() {
//     console.log("Delected Selected Location Table");
//   });
// };

// refreshExamples gets new examples from the db and repopulates the list
var refreshRestaurants = function () {
  API.getRestaurants().then(function (data) {    
    var $restaurants = data.map(function (restaurant) {
      var $a = $("<a>")
        .text(restaurant.name)
        .append(" " + restaurant.address);
        // .attr("href", "/input");

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "id": restaurant.id,
          "name": restaurant.name,
          "address": restaurant.address
        })
        .append($a);

      var $button = $(
        "<a href=\"#\" class=\"btn btn-danger float-right delete\" role=\"button\">Select</a>"
      );

      $li.append($button);

      return $li;
    });

    $restaurantList.empty();
    $restaurantList.append($restaurants);
  });
};

// handleUserInput
//  is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleUserInput = function (event) {
  console.log("Here I am");
  event.preventDefault();
  // deleteSelectedLocations();
  deleteRestaurantsInCurrentDatabase();
  var $userCityInput = $("#cityInput");
  var cityInput = {
    text: $userCityInput.val().trim()
  };

  if (!cityInput.text) {
    alert("You must enter a city!");
    return;
  }

  API.searchRestaurants(cityInput).then(function () {
    refreshRestaurants();
  });

  $userCityInput.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleSelectButtonClick = function () {
//   var chosenName = $(this).data - name.val().trim()
//   var chosenAddress = $(this).data - address.val().trim()

//   function breweryChoice(chosenName, chosenAddress) {
//     database.ref().child("brewery/name").set(chosenName)
//     database.ref().child("brewery/location").set(chosenAddress)
//     $("body").addClass("animated slideOutLeft")
//     setTimeout(function () {
//       window.location.replace("contact.html")
//     }, 500)
//   }

//   // var idToSelect = $(this)
//   //   .parent()
//   //   .attr("data-id");

//   // var chosenName = $(this)
//   //   .parent()
//   //   .attr("data-name");

//   // var chosenAddress = $(this)
//   //   .parent()
//   //   .attr("data-address");

//   // var locationInput = {
//   //   name: chosenName,
//   //   address: chosenAddress
//   // };
//   // console.log(idToSelect, chosenName, chosenAddress);

//   API.createSelectedLocation(locationInput).then(function () {
//     refreshRestaurants();
//   });
// };

// Add event listeners to the submit and delete buttons
$(document).on("click", "#searchBtn", handleUserInput);
// $restaurantList.on("click", ".delete", handleSelectButtonClick);