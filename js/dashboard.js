// dashboard.js - Using Compatibility SDK Syntax (Global 'firebase' object)

// Access services globally via the 'firebase' object
const auth = firebase.auth();
const db = firebase.firestore();

// Get DOM elements
const welcomeTitle = document.getElementById('welcome-title');
const xpFill = document.getElementById('xp-fill');
const healthFill = document.getElementById('health-fill');
const energyFill = document.getElementById('energy-fill');
const happinessFill = document.getElementById('happiness-fill');

const restBtn = document.getElementById('rest-btn');
const trainBtn = document.getElementById('train-btn');
const playBtn = document.getElementById('play-btn');
const gainXpBtn = document.getElementById('gainxp-btn');
const logoutBtn = document.getElementById('logout-btn');

let userDocRef = null;

// Checks if the user is logged in
auth.onAuthStateChanged(user => {
  if (!user) {
    // Not logged in -> redirect to login
    window.location.href = 'login.html';
    return;
  }

  // Reference to user's Firestore document (Compatibility syntax)
  userDocRef = db.collection('users').doc(user.uid);

  // Attaches a real-time listener to the document (Compatibility syntax)
  userDocRef.onSnapshot(docSnap => {
    if (docSnap.exists) {
      const data = docSnap.data();
      
      // FIX: Get the 'username' from the Firestore document
      // Fallback to the email prefix if the username is somehow missing
      const username = data.username || user.email.split('@')[0] || "Player";
      welcomeTitle.textContent = `Welcome, ${username}!`; 

      // Update stats bars
      xpFill.style.width = `${Math.min(data.xp || 0, 100)}%`;
      healthFill.style.width = `${Math.min(data.stats?.health || 0, 100)}%`;
      energyFill.style.width = `${Math.min(data.stats?.energy || 0, 100)}%`;
      happinessFill.style.width = `${Math.min(data.stats?.happiness || 0, 100)}%`;
    } else {
        // Fallback if the document doesn't exist
        welcomeTitle.textContent = `Welcome, ${user.email.split('@')[0]}! (Data Error)`;
        console.error("Firestore document for user does not exist.");
    }
  }, error => {
      console.error("Firestore snapshot error:", error);
      welcomeTitle.textContent = "Data connection failed.";
  });
});

// incrementStat function to update stats in Firestore
const incrementStat = async (field) => {
  if (!userDocRef) {
    console.warn("User document reference is not set.");
    return;
  }

  try {
    // Update document using Compatibility syntax and FieldValue
    await userDocRef.update({
      [field]: firebase.firestore.FieldValue.increment(10)
    });
  } catch (err) {
    console.error("Failed to increment stat:", err);
  }
};

// Button event listeners
restBtn.addEventListener('click', () => incrementStat('stats.health'));
trainBtn.addEventListener('click', () => incrementStat('stats.energy'));
playBtn.addEventListener('click', () => incrementStat('stats.happiness'));
gainXpBtn.addEventListener('click', () => incrementStat('xp'));

// Logout button listener
logoutBtn.addEventListener('click', async () => {
  try {
    await auth.signOut(); // Compatibility syntax
    window.location.href = 'login.html';
  } catch (error) {
    console.error("Logout failed:", error);
  }
});