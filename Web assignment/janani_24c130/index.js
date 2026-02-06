function validate() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var cpass = document.getElementById("confirm_password").value;
   
     let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "" || email === "" || password === "" || cpass === "") {
        alert("Please fill in all fields.");
        return false;
    }

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (password !== cpass) {
        alert("Passwords do not match.");
        return false;
    }

    alert("Registration successful!");
}