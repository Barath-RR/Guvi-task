function register() {
  var username = $("#username").val();
  var password = $("#password").val();
  var email = $("#email").val();
  var dob = $("#dob").val();
  var age = $("#age").val();
  var num = $("#num").val();
  var op = $("#op").val();
  console.log(username);

  if (validateInput(username, password, dob, num, op, age)) { 
  var data = {
    username: username,
    password: password,
    email: email,
    dob: dob,
    age: age,
    num: num,
    op: op
  };

  $.ajax({
    type: "POST",
    url: "php/register.php",
    data: data,
    dataType: "json", 
    success: function(response) {
      console.log(response);

      if (response.success) {
        alert("Registration successful! You can now log in.");
        window.location.href = "login.html";
      } else {
        alert("Registration failed. " + response.message);
      }
    },
    error: function(error) {
      console.error("Error: ", error);
    }
  });
}
}


function validateInput(username, password, dob, num, op, age, email) {
  
  if (username === "") {
    alert("Please enter a valid username.");
    return false; 
  }
  if (password === "") {
    alert("Please enter a valid pasword");
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
