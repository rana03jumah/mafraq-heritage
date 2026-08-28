let currentSiteData = null;
let currentLang = 'ar';
let mapInstance = null;

// 1. تشغيل التطبيق عند التحميل
document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const siteId = urlParams.get('id') || 'umm_al_jimal'; // الافتراضي أم الجمال

  await loadSiteData(siteId);
});

// 2. قراءة البيانات من sites.json
async function loadSiteData(siteId) {
  try {
    const response = await fetch('data/sites.json');
    const allSites = await response.json();
    
    currentSiteData = allSites[siteId];

    if (!currentSiteData) {
      alert("الموقع الأثري غير موجود!");
      return;
    }

    renderUI();
  } catch (error) {
    console.error("خطأ في تحميل البيانات:", error);
  }
}

// 3. عرض البيانات في الواجهة
function renderUI() {
  const data = currentSiteData;

  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

  // العناوين والنصوص
  document.getElementById('site-title').innerText = data.name[currentLang];
  document.getElementById('site-era').innerText = data.era[currentLang];
  document.getElementById('site-desc').innerText = data.description[currentLang];

  // شارة اليونسكو
  const unescoBadge = document.getElementById('unesco-badge');
  if (data.unesco) unescoBadge.classList.remove('hidden');
  else unescoBadge.classList.add('hidden');

  // ملف الصوت
  const audioPlayer = document.getElementById('audio-player');
  audioPlayer.src = data.audio[currentLang];

  // زر اللغة
  document.getElementById('lang-btn').innerText = currentLang === 'ar' ? 'English' : 'عربي';

  // الخريطة والمعالم
  initMap(data);
}

// 4. خريطة Leaflet التفاعلية
function initMap(data) {
  if (mapInstance) {
    mapInstance.remove(); // إعادة ضبط الخريطة إذا كانت موجودة
  }

  mapInstance = L.map('map').setView([data.coordinates.lat, data.coordinates.lng], 16);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(mapInstance);

  // ماركر الموقع الرئيسي
  L.marker([data.coordinates.lat, data.coordinates.lng])
    .addTo(mapInstance)
    .bindPopup(`<b>${data.name[currentLang]}</b>`)
    .openPopup();

  // إضافة ماركرز المعالم الفرعية
  const landmarksList = document.getElementById('landmarks-list');
  landmarksList.innerHTML = '';

  if (data.landmarks && data.landmarks.length > 0) {
    data.landmarks.forEach(lm => {
      L.marker([lm.lat, lm.lng]).addTo(mapInstance).bindPopup(lm.name[currentLang]);

      landmarksList.innerHTML += `
        <div class="bg-slate-800 p-3 rounded-xl border border-slate-700 text-xs">
          <div class="font-bold text-amber-400 mb-1"><i class="fa-solid fa-location-pin ml-1"></i>${lm.name[currentLang]}</div>
          <div class="text-slate-300">${lm.desc[currentLang]}</div>
        </div>
      `;
    });
  }
}

// 5. أدوات تفاعلية
function toggleLanguage() {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  renderUI();
}

function setAudioSpeed(speed) {
  const audio = document.getElementById('audio-player');
  audio.playbackRate = speed;
}

function scrollSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}