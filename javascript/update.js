$(document).ready(function() {
    var token = localStorage.getItem('token');

  if (token) {
    fetchUserProfile(token);
  } else {
    window.location.href = "login.html";
  }
  
    $("#update-profile-form").submit(function(event) {
      event.preventDefault(); 
      var username = $("#username").val();
      var dob = $("#dob").val();
      var phnumber = $("#phnumber").val();
      var occupation = $("#Occupation").val();
      var age = $("#age").val();
      var token = localStorage.getItem('token');
      console.log(token);
      if (validateInput(dob, phnumber,occupation,age,u)) {
        $.ajax({
          type: "POST",
          url: "php/update.php",
          data: {
            token: token,
            username: username,
            dob: dob,
            phnumber: phnumber,
            occupation: occupation,
            age: age
          },
          success: function(response) {
            try {
              var result = JSON.parse(response);
  
              if (result.success) {
                alert("Profile updated successfully.");
                window.location.href = "profile.html";
              } else {
                alert("Profile update failed. Please try again.");
              }
            } catch (error) {
              console.error("Error parsing JSON: ", error);
              alert("An error occurred during profile update. Please try again.");
            }
          },
          error: function(error) {
            console.error("Error during profile update AJAX request: ", error);
            alert("An error occurred during profile update. Please try again.");
          }
        });
      } else {
        alert("Please enter valid profile details.");
      }
    });
  });
  
  function fetchUserProfile(token) {
    $.ajax({
      type: "GET",
      url: "php/profile.php",
      data: { token: token },
      success: function(response) {
        if (response.error) {
          console.error("Error fetching user profile: ", response.error);
          alert("Error fetching user profile. Please log in again.");
          window.location.href = "login.html";
        } else {
          // Populate the form with user profile data
          $("#Email").val(response.email);
          $("#username").val(response.username);
          $("#dob").val(response.dob);
          $("#phnumber").val(response.number);
          $("#Occupation").val(response.occupation);
          $("#age").val(response.age);
        }
      },
      error: function(error) {
        console.error("Error fetching user profile AJAX request: ", error);
        alert("Error fetching user profile. Please try again.");
      }
    });
  }
  
  function validateInput(username, dob, num, op, age) {
  
    if (username === "") {
      alert("Please enter a valid username.");
      return false; 
    }
    if (dob === "") {
      alert("Please enter a valid date of birth");
      return false; 
    }
  
    if (isNaN(age)) {
      alert("Please enter a valid age");
      return false; 
    }
    if (op === "") {
      alert("Please enter a valid occupation");
      return false; 
    }
  
    if (isNaN(num) || num.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return false; 
    }
  
    return true; 
  }
  
  