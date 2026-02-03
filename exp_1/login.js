document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Stop default form submission

  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value;

  // Regex patterns
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;

  // Email validation
  if (!emailRegex.test(email)) {
    if (!confirm("Invalid Email format!\n\nPress OK to fix.")) {
      return;
    }
    document.getElementById("loginEmail").focus();
    return;
  }

  // Password validation
  if (!passwordRegex.test(password)) {
    if (
      !confirm(
        "Invalid Password!\n\nPassword must:\n• Be at least 6 characters\n• Contain letters and numbers\n\nPress OK to fix."
      )
    ) {
      return;
    }
    document.getElementById("loginPassword").focus();
    return;
  }

  // Success
  alert("✅ Login Successful!");
  document.getElementById("loginForm").reset();
});
