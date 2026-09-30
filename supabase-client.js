// supabase-client.js
const SUPABASE_PROJECT_URL = "https://gxfwumrjrsfixitgknuh.supabase.co";
const SUPABASE_PROJECT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4Znd1bXJqcnNmaXhpdGdrbnVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2Njg4NDgsImV4cCI6MjEwNjI0NDg0OH0.wbWBj6Q5Z-pHwHsXUpflZGMr6Z_Zlj0JCozq2v1RY7o";

// Initialize and attach client instance cleanly
window.supabase = window.supabase.createClient(SUPABASE_PROJECT_URL, SUPABASE_PROJECT_KEY, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Tablet Audio Chime for Barista Display
const chimeAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
function playOrderChime() {
  try {
    chimeAudio.currentTime = 0;
    chimeAudio.play().catch(() => {});
  } catch (e) {}
}

// Request desktop/mobile system notifications permission
function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

// Display system notification when new order arrives
function showOrderSystemNotification(order) {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      const n = new Notification(`New Order #${order.id}`, {
        body: `${order.customer} - RM ${Number(order.price).toFixed(2)}`,
        icon: 'https://cdn-icons-png.flaticon.com/512/924/924514.png',
        tag: order.id
      });
      n.onclick = () => {
        window.focus();
        n.close();
      };
    } catch (e) {}
  }
}

// Auto-resync when returning to the tab or reopening the device
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    if (typeof refreshActiveData === 'function') {
      refreshActiveData();
    }
  }
});

window.addEventListener('focus', () => {
  if (typeof refreshActiveData === 'function') {
    refreshActiveData();
  }
});
