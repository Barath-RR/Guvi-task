function logn() {
  var email = $("#email").val();
  var password = $("#password").val();

  if (isValidLogin(email, password)) {
    $.ajax({
      type: "POST",
      url: "php/login.php", 
      data: { email: email, password: password },
      dataType: "json",
      success: function(response) {
        try {
          console.log(response);
          if (response.success) {

            var token = generateToken();

            localStorage.setItem('token', token);

            sendTokenToServer(token, email);

            window.location.href = "profile.html";
          } else {
            alert("Login failed. credentials.");
          }
        } catch (error) {
          console.error("Error parsing JSON: ", error);
          alert("An error occurred during login. Please try again.");
        }
      },
      error: function(error) {
        console.error("Error during login AJAX request: ", error);
        alert("An error occurred during login. Please try again.");
      }
    });
  } else {
    alert("Invalid login. Please enter valid credentials.");
  }
}

function isValidLogin(email, password) {
  return true;
}

function generateToken() {
  return Math.random().toString(36).substr(2);
}

function sendTokenToServer(token, email) {
  $.ajax({
    type: "POST",
    url: "php/storeToken.php", 
    data: { token: token, email: email },
    success: function(response) {
      console.log(response);
    },
    error: function(error) {
      console.error("Error: ", error);
    }
  });
}
