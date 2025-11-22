// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA1aXYgCVU9P9kN-7sKymkN9MmRq5fbbZQ",
  authDomain: "life-simulator-90019.firebaseapp.com",
  projectId: "life-simulator-90019",
  storageBucket: "life-simulator-90019.appspot.com",
  messagingSenderId: "351428828952",
  appId: "1:351428828952:web:ff1c7a6d9568369c24086d"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Signup form listener
const signupForm = document.getElementById('signup-form');

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("✅ Signup intercepted");

    // Get user input values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    console.log({ username, email });

    try {
      // Create user in Firebase Auth
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log("Firebase user created:", user.uid);

      // Create Firestore document with default stats and username
      await db.collection('users').doc(user.uid).set({
        username: username,          // Store username
        xp: 0,                       // Default XP
        stats: {
          health: 50,                // Default Health
          energy: 50,                // Default Energy
          happiness: 50              // Default Happiness
        }
      });
      console.log("Firestore document created for user with username");

      // Redirect to dashboard
      console.log("Redirecting to dashboard.html...");
      setTimeout(() => {
        window.location.href = 'dashboard.html'; // Redirect after Firestore write
      }, 50);

    } catch (error) {
      console.error("Signup error:", error);
      alert(`Sign-up failed: ${error.message}`);
    }
  });
}

// Login form listener
const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("✅ Login intercepted");

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      // Sign in user
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log("Firebase user signed in:", user.uid);

      // Redirect to dashboard
      window.location.href = 'dashboard.html';
    } catch (error) {
      console.error("Login error:", error);
      alert(`Login failed: ${error.message}`);
    }
  });
}

// --- Forgot Password Link ---
const forgotPasswordLink = document.getElementById('forgot-password-link');

if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    const email = document.getElementById('email').value.trim();

    if (!email) {
      alert("Please enter your email in the login form first.");
      return;
    }

    try {
      // Send password reset email via Firebase Auth
      await auth.sendPasswordResetEmail(email);
      alert(`Password reset email sent to ${email}. Check your inbox.`);
      console.log(`Password reset email sent to ${email}`);
    } catch (error) {
      console.error("Password reset error:", error);
      alert(`Failed to send password reset email: ${error.message}`);
    }
  });
}