$(document).ready(function() {
  var token = localStorage.getItem('token');

  if (token) {
    fetchUserProfile(token);
  } else {
    window.location.href = "login.html";
  }
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
        alert("user found")
        console.log(response)
        displayUserProfile(response);
      }
    },
    error: function(error) {
      console.error("Error fetching user profile AJAX request: ", error);
      alert("Error fetching user profile. Please try again.");
    }
  });
}

function displayUserProfile(profile) {
  console.log(profile.username);
  alert(profile.email);
  document.getElementById("username").innerHTML = profile.username;
document.getElementById("email").innerHTML =profile.email;
document.getElementById("dob").innerHTML =profile.dob;
document.getElementById("age").innerHTML =profile.age;
document.getElementById("num").innerHTML =profile.number;
document.getElementById("op").innerHTML =profile.occupation;

}
