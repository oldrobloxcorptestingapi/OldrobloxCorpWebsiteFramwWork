// loader.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 🔑 Your Firebase config (edit if needed)
const firebaseConfig = {
  apiKey: "AIzaSyAuKVVUBWNDNgtDPwAdEqaZNabwfXyKmRw",
  authDomain: "oldrobloxcorpsinginadmin.firebaseapp.com",
  projectId: "oldrobloxcorpsinginadmin",
  storageBucket: "oldrobloxcorpsinginadmin.appspot.com",
  messagingSenderId: "1038903313808",
  appId: "1:1038903313808:web:e86fd0d6af963648045f15"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔄 Inject loader overlay
document.body.insertAdjacentHTML("afterbegin", `
  <div id="loader-overlay">
    <div class="loader"></div>
  </div>
  <style>
    #loader-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,1); /* fully solid black */
      display: flex; justify-content: center; align-items: center;
      z-index: 9999;
      transition: opacity 1s ease;
    }
    #loader-overlay.fade-out { opacity: 0; pointer-events: none; }
    #content { display: none; }

    .loader {
      width: 175px; height: 80px;
      position: relative;
      background-image: 
        radial-gradient(circle 25px at 25px 25px, #FFF 100%, transparent 0), 
        radial-gradient(circle 50px at 50px 50px, #FFF 100%, transparent 0), 
        radial-gradient(circle 25px at 25px 25px, #FFF 100%, transparent 0), 
        linear-gradient(#FFF 50px, transparent 0);
      background-size: 50px 50px, 100px 76px, 50px 50px, 120px 40px;
      background-position: 0px 30px, 37px 0px, 122px 30px, 25px 40px;
      background-repeat: no-repeat;
    }
    .loader::before {
      content: ''; position: absolute; border-radius: 50%;
      left: 60px; bottom: 18px; width:36px; height:36px;
      background-color:#FF3D00;
      background-image:
        radial-gradient(circle 8px at 18px 18px, #FFF 100%, transparent 0),
        radial-gradient(circle 4px at 18px 0px, #FFF 100%, transparent 0),
        radial-gradient(circle 4px at 0px 18px, #FFF 100%, transparent 0),
        radial-gradient(circle 4px at 36px 18px, #FFF 100%, transparent 0),
        radial-gradient(circle 4px at 18px 36px, #FFF 100%, transparent 0),
        radial-gradient(circle 4px at 30px 5px, #FFF 100%, transparent 0),
        radial-gradient(circle 4px at 30px 30px, #FFF 100%, transparent 0),
        radial-gradient(circle 4px at 5px 30px, #FFF 100%, transparent 0),
        radial-gradient(circle 4px at 5px 5px, #FFF 100%, transparent 0);
      animation: rotationBack 3s linear infinite;
    }
    .loader::after {
      content: ''; position: absolute; border-radius: 50%;
      left: 94px; bottom: 15px; width:24px; height:24px;
      background-color:#FF3D00;
      background-image:
        radial-gradient(circle 5px at 12px 12px, #FFF 100%, transparent 0),
        radial-gradient(circle 2.5px at 12px 0px, #FFF 100%, transparent 0),
        radial-gradient(circle 2.5px at 0px 12px, #FFF 100%, transparent 0),
        radial-gradient(circle 2.5px at 24px 12px, #FFF 100%, transparent 0),
        radial-gradient(circle 2.5px at 12px 24px, #FFF 100%, transparent 0),
        radial-gradient(circle 2.5px at 20px 3px, #FFF 100%, transparent 0),
        radial-gradient(circle 2.5px at 20px 20px, #FFF 100%, transparent 0),
        radial-gradient(circle 2.5px at 3px 20px, #FFF 100%, transparent 0),
        radial-gradient(circle 2.5px at 3px 3px, #FFF 100%, transparent 0);
      animation: rotationBack 4s linear infinite reverse;
    }
    @keyframes rotationBack {
      to { transform: rotate(-360deg); }
    }
  </style>
`);

// 🔄 Helper: fade out loader
function hideLoader() {
  const overlay = document.getElementById("loader-overlay");
  if (overlay) {
    overlay.classList.add("fade-out");
    setTimeout(() => overlay.remove(), 1000);
  }
}

// 🔐 Auth check
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ Logged in:", user.email);
    hideLoader();
    const c = document.getElementById("content");
    if (c) c.style.display = "block";
  } else {
    console.log("❌ Not logged in → redirecting");
    window.location.href = "login.html";
  }
});