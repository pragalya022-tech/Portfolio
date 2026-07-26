/* ==========================================================================
   PRAGALYA S. - BLACK & CRIMSON RED PORTFOLIO JAVASCRIPT
   Features: 3D Visiting Card Flip, Toast System, Copy Utilities, 
             AI Patent Classifier Simulator, WebSocket Chat & IoT Switches
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ================= 1. 3D VISITING CARD FLIP HANDLER ================= */
  const visitingCardInner = document.getElementById('visiting-card-inner');

  window.flipVisitingCard = function() {
    if (!visitingCardInner) return;
    visitingCardInner.classList.toggle('flipped');
    visitingCardInner.classList.toggle('manual-flipped');
  };


  /* ================= 2. MOBILE MENU TOGGLE ================= */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    });
  });


  /* ================= 3. TOAST NOTIFICATION UTILITY ================= */
  window.showToast = function(message) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #ef4444;"></i> ${message}`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  window.copyText = function(text, successMsg) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg || 'Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };


  /* ================= 4. AI PATENT CLASSIFIER SIMULATOR ================= */
  const complaintInput = document.getElementById('complaint-input');
  const classifyBtn = document.getElementById('classify-btn');
  const aiResultCard = document.getElementById('ai-result-card');
  const resultCategory = document.getElementById('result-category');
  const resultPriority = document.getElementById('result-priority');
  const resultAction = document.getElementById('result-action');

  if (classifyBtn) {
    classifyBtn.addEventListener('click', () => {
      const text = complaintInput.value.trim().toLowerCase();
      if (!text) return;

      aiResultCard.classList.remove('hidden');

      let category = "General Campus Infrastructure";
      let priority = "MEDIUM (65 / 100)";
      let action = "Assigned to Campus Facilities Administrator.";

      if (text.includes('wifi') || text.includes('network') || text.includes('router') || text.includes('internet')) {
        category = "Telecom & Network Infrastructure";
        priority = "HIGH (88 / 100)";
        action = "Auto-dispatched to Network Systems Engineer with high-priority alert.";
      } else if (text.includes('light') || text.includes('power') || text.includes('electricity') || text.includes('fan')) {
        category = "IoT Electrical & Power Automation";
        priority = "HIGH (82 / 100)";
        action = "Signaled IoT Smart Breaker & Facilities Field Support.";
      } else if (text.includes('server') || text.includes('database') || text.includes('api') || text.includes('code')) {
        category = "Software & Cloud Systems";
        priority = "CRITICAL (95 / 100)";
        action = "Escalated to Lead DevOps Engineer & Cloud Infrastructure Team.";
      }

      resultCategory.textContent = category;
      resultPriority.textContent = priority;
      resultAction.textContent = action;
      
      showToast("AI Complaint Analysis Complete!");
    });
  }


  /* ================= 5. WEBSOCKET MINI CHAT SANDBOX ================= */
  const chatUserInput = document.getElementById('chat-user-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatMessages = document.getElementById('chat-messages');

  function sendChatMessage() {
    const text = chatUserInput.value.trim();
    if (!text) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'msg user-msg';
    userMsg.textContent = text;
    chatMessages.appendChild(userMsg);

    chatUserInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'msg bot-msg';

      const responses = [
        "Server ACK: Message broadcasted with low-latency client architecture.",
        "WebSocket Broadcast: Hello! Pragalya built this instant messaging pipeline in Node.js.",
        "Node.js Cluster: Broadcast packet delivered successfully!"
      ];
      const reply = responses[Math.floor(Math.random() * responses.length)];
      botMsg.textContent = `Pragalya-Bot: ${reply}`;
      chatMessages.appendChild(botMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
  }

  if (chatSendBtn) {
    chatSendBtn.addEventListener('click', sendChatMessage);
    chatUserInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
  }


  /* ================= 6. IOT CLASSROOM CONTROLLER SWITCHES ================= */
  const lightToggle = document.getElementById('iot-light-toggle');
  const fanToggle = document.getElementById('iot-fan-toggle');
  const iotStatusMsg = document.getElementById('iot-status-msg');

  function updateIotStatus() {
    const lightsOn = lightToggle.checked;
    const fanOn = fanToggle.checked;

    let msg = `Status: Lights ${lightsOn ? 'ON 💡' : 'OFF 🌙'} | HVAC ${fanOn ? 'ON 🌀' : 'OFF ❄️'}`;
    if (!lightsOn && !fanOn) {
      msg += " (Energy Saving Mode Active 🌱)";
    } else if (lightsOn && fanOn) {
      msg += " (Full Power Mode Active ⚡)";
    }
    iotStatusMsg.textContent = msg;
  }

  if (lightToggle && fanToggle) {
    lightToggle.addEventListener('change', updateIotStatus);
    fanToggle.addEventListener('change', updateIotStatus);
  }


  /* ================= 7. SCROLL SPY FOR NAVIGATION ================= */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });


  /* ================= 8. CONTACT FORM SUBMISSION ================= */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      showToast(`Thank you, ${name}! Your message has been sent successfully.`);
      contactForm.reset();
    });
  }

});
