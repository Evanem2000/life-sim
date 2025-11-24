// ===============================
// Firebase Setup
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyA1aXYgCVU9P9kN-7sKymkN9MmRq5fbbZQ",
  authDomain: "life-simulator-90019.firebaseapp.com",
  projectId: "life-simulator-90019",
  storageBucket: "life-simulator-90019.appspot.com",
  messagingSenderId: "351428828952",
  appId: "1:351428828952:web:ff1c7a6d9568369c24086d"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


// ===============================
// Change Display Name
// ===============================
const changeNameForm = document.getElementById("change-name-form");

if (changeNameForm) {
  changeNameForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newName = document.getElementById("new-name").value.trim();
    const user = auth.currentUser;

    if (!user) {
      alert("No user is signed in.");
      return;
    }

    if (newName === "") {
      alert("Name cannot be empty.");
      return;
    }

    try {
      // Update Firestore
      await db.collection("users").doc(user.uid).update({
        username: newName
      });

      alert("Name updated successfully!");
      document.getElementById("new-name").value = "";

    } catch (error) {
      console.error("Name update error:", error);
      alert("Error updating name: " + error.message);
    }
  });
}


// ===============================
// Delete Account
// ===============================
const deleteBtn = document.getElementById("delete-account");

if (deleteBtn) {
  deleteBtn.addEventListener("click", () => {
    showDeleteConfirm();
  });
}


// ===============================
// Confirm Popup
// ===============================
function showDeleteConfirm() {

  // Create popup container
  const popup = document.createElement("div");
  popup.innerHTML = `
    <div class="confirm-overlay">
      <div class="confirm-box">
        <h3>Delete Account?</h3>
        <p>This action cannot be undone.</p>
        
        <div class="confirm-buttons">
          <button id="confirm-yes" class="gray-btn">Yes</button>
          <button id="confirm-no" class="cancel-btn">No</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(popup);

  // Buttons
  document.getElementById("confirm-yes").addEventListener("click", deleteAccount);
  document.getElementById("confirm-no").addEventListener("click", () => {
    popup.remove();
  });
}


// ===============================
// Delete account logic
// ===============================
async function deleteAccount() {
  const user = auth.currentUser;

  if (!user) {
    alert("No user is signed in.");
    return;
  }

  try {
    // Delete Firestore profile
    await db.collection("users").doc(user.uid).delete();

    // Delete Auth account
    await user.delete();

    alert("Account deleted.");
    window.location.href = "index.html";

  } catch (error) {
    console.error("Account delete error:", error);
    alert("Error deleting account: " + error.message);
  }
}

// Back-to-dashboard button
const backBtn = document.getElementById("back-btn");

if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });
}


