// supabase-client.js
const SUPABASE_URL = "https://gxfwumrjrsfixitgknuh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4Znd1bXJqcnNmaXhpdGdrbnVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2Njg4NDgsImV4cCI6MjEwNjI0NDg0OH0.wbWBj6Q5Z-pHwHsXUpflZGMr6Z_Zlj0JCozq2v1RY7o";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
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

// Tablet Wake-up Auto-Resync
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    // When tablet wakes up, trigger a full data re-fetch
    if (typeof refreshActiveData === 'function') {
      refreshActiveData();
    }
  }
});
