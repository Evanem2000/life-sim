document.addEventListener('DOMContentLoaded', () => {
  // Redirect to login or signup when buttons are clicked
  document.getElementById('login-btn').addEventListener('click', () => {
    window.location.href = 'login.html';
  });

  document.getElementById('signup-btn').addEventListener('click', () => {
    window.location.href = 'signup.html';
  });

  console.log("Index page loaded. Buttons ready.");
});
