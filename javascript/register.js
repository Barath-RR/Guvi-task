function register() {
    var username = $("#username").val();
    var password = $("#password").val();
    var email = $("#email").val();
    var dob = $("#dob").val();
    var age = $("#age").val();
    var num = $("#num").val();
    var op = $("#op").val();
    console.log(username);
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
  