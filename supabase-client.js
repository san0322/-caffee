// supabase-client.js
const SUPABASE_URL = "https://YOUR_PROJECT_REF.supabase.co"; // Replace with your URL
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";                  // Replace with your Anon Key

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