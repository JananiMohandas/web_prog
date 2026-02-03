document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop form submission

  // Get values
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let country = document.getElementById("country").value;
  let state = document.getElementById("state").value;
  let city = document.getElementById("city").value;
  let dob = document.getElementById("dob").value;
  let address = document.getElementById("address").value.trim();
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm").value;

  // Regex patterns
  let nameRegex = /^[A-Za-z ]{3,}$/;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let phoneRegex = /^[0-9]{10}$/;
  let passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  // Name validation
  if (!nameRegex.test(name)) {
    if (!confirm("Invalid Name!\nUse only letters (min 3 chars).\n\nPress OK to fix.")) {
      return;
    }
    document.getElementById("name").focus();
    return;
  }

  // Email validation
  if (!emailRegex.test(email)) {
    if (!confirm("Invalid Email format!\n\nPress OK to fix.")) {
      return;
    }
    document.getElementById("email").focus();
    return;
  }

  // Phone validation
  if (!phoneRegex.test(phone)) {
    if (!confirm("Phone number must be 10 digits!\n\nPress OK to fix.")) {
      return;
    }
    document.getElementById("phone").focus();
    return;
  }

  // Dropdown validation
  if (country === "" || state === "" || city === "") {
    if (!confirm("Please select Country, State and City!\n\nPress OK to fix.")) {
      return;
    }
    return;
  }

  // DOB validation
  if (dob === "") {
    if (!confirm("Please select Date of Birth!\n\nPress OK to fix.")) {
      return;
    }
    return;
  }

  // Address validation
  if (address.length < 10) {
    if (!confirm("Address must be at least 10 characters long!\n\nPress OK to fix.")) {
      return;
    }
    document.getElementById("address").focus();
    return;
  }

  // Password validation
  if (!passwordRegex.test(password)) {
    if (
      !confirm(
        "Weak Password!\n\nPassword must contain:\n• 8 characters\n• 1 uppercase\n• 1 lowercase\n• 1 number\n• 1 special character\n\nPress OK to fix."
      )
    ) {
      return;
    }
    document.getElementById("password").focus();
    return;
  }

  // Confirm password validation
  if (password !== confirmPassword) {
    if (!confirm("Passwords do not match!\n\nPress OK to fix.")) {
      return;
    }
    document.getElementById("confirm").focus();
    return;
  }

  // Success popup
  alert("✅ Registration Successful!");
  document.getElementById("signupForm").reset();
});
