// قاعدة بيانات المواقع المكتملة بالصور والمحتوى
const sitesData = {
  "umm_al_jimal": {
    "id": "umm_al_jimal",
    "name": { "ar": "أم الجمال", "en": "Umm al-Jimal" },
    "sub": { "ar": "واحة البازلت الأسود", "en": "Black Basalt Oasis" },
    "era": { "ar": "النبطي، الروماني، البيزنطي، الأموي", "en": "Nabataean, Roman, Byzantine, Umayyad" },
    "unesco": true,
    "coordinates": { "lat": 32.3278, "lng": 36.3714 },
    "images": {
      "past": "assets/images/umm_al_jimal.jpg",
      "present": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80"
    },
    "audio": { "ar": "assets/audio/umm_al_jimal_ar.mp3", "en": "assets/audio/umm_al_jimal_en.mp3" },
    "description": {
      "ar": "تُعتبر أم الجمال لؤلؤة البادية السوداء، وموقعاً مدرجاً على قائمة التراث العالمي (UNESCO). شُيدت بالكامل من حجارة البازلت البركاني وتتميز بنظام حصاد مائي معقد وأقواس معمارية فريدة.",
      "en": "Umm al-Jimal is a UNESCO World Heritage site constructed entirely from black basalt, famous for its ancient water systems and arches."
    },
    "landmarks": [
      { "name": { "ar": "كنيسة جوليانوس", "en": "Julianos Church" }, "lat": 32.3282, "lng": 36.3718, "desc": { "ar": "أحد أقدم المباني الدينية في الموقع.", "en": "One of the oldest churches." } }
    ]
  },
  "rihab": {
    "id": "rihab",
    "name": { "ar": "رحاب", "en": "Rihab" },
    "sub": { "ar": "موطن أقدم الكنائس الفسيفسائية", "en": "Home of Ancient Churches" },
    "era": { "ar": "الروماني، البيزنطي، الأموي", "en": "Roman, Byzantine, Umayyad" },
    "unesco": false,
    "coordinates": { "lat": 32.3256, "lng": 36.0892 },
    "images": {
      "past": "assets/images/rihab_past.jpg",
      "present": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80"
    },
    "audio": { "ar": "assets/audio/rihab_ar.mp3", "en": "assets/audio/rihab_en.mp3" },
    "description": {
      "ar": "تضم بلدة رحاب الأثرية أكثر من 30 كنيسة بيزنطية تاريخية، وتعتبر كنيسة القديس جورجيوس إحدى أقدم المصليات المسيحية المكتشفة عالمياً والمزخرفة بالفسيفساء.",
      "en": "Rihab hosts over 30 ancient churches, including St. Georgeous church, standard-bearer of early Christian worship with mosaic floors."
    },
    "landmarks": []
  },
  "fadayn": {
    "id": "fadayn",
    "name": { "ar": "قصر الفدين", "en": "Qasr al-Fadayn" },
    "sub": { "ar": "عقدة الطرق التاريخية وسكة الحجاز", "en": "Historical Trade Hub" },
    "era": { "ar": "الحديد، الأموي، العثماني", "en": "Iron Age, Umayyad, Ottoman" },
    "unesco": false,
    "coordinates": { "lat": 32.3421, "lng": 36.2085 },
    "images": {
      "past": "assets/images/fadayn_past.jpg",
      "present": "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80"
    },
    "audio": { "ar": "assets/audio/fadayn_ar.mp3", "en": "assets/audio/fadayn_en.mp3" },
    "description": {
      "ar": "النواة التاريخية لمدينة المفرق. ملتقى قوافل التجارة القديمة، ويحتوي على قلعة ومسجد أموي إضافة لمهمته الاستراتيجية في العصر العثماني كمحطة لسكة حديد الحجاز.",
      "en": "The historic heart of Mafraq, featuring an Umayyad palace complex and an Ottoman Hejaz railway station."
    },
    "landmarks": []
  },
  "quttayn": {
    "id": "quttayn",
    "name": { "ar": "أم القطين", "en": "Umm al-Quttayn" },
    "sub": { "ar": "المعسكر والحصن الروماني", "en": "Roman Military Outpost" },
    "era": { "ar": "النبطي، الروماني، البيزنطي", "en": "Nabataean, Roman, Byzantine" },
    "unesco": false,
    "coordinates": { "lat": 32.3120, "lng": 36.6320 },
    "images": {
      "past": "assets/images/quttayn_past.jpg",
      "present": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80"
    },
    "audio": { "ar": "assets/audio/quttayn_ar.mp3", "en": "assets/audio/quttayn_en.mp3" },
    "description": {
      "ar": "واحة أثرية بارزة في شرق المفرق، ضمت معسكراً عسكرياً رومانياً لحماية الحدود الشرقية، وتتميز ببرك المياه الأثرية والمنازل البازلتية متعددة الطوابق.",
      "en": "A major site in eastern Mafraq featuring a Roman fort, ancient water reservoirs, and multi-story basalt buildings."
    },
    "landmarks": []
  }
};

let currentLang = 'ar';
let currentSiteId = null;
let mapInstance = null;

// التشغيل الأولي
document.addEventListener('DOMContentLoaded', () => {
  renderCatalogGrid();

  // فحص إذا فتح الزائر رابط QR مباشر لموقع معين
  const urlParams = new URLSearchParams(window.location.search);
  const siteParam = urlParams.get('id');

  if (siteParam && sitesData[siteParam]) {
    openSiteDetail(siteParam);
  }
});

// 1. توليد معرض المواقع الرئيسية
function renderCatalogGrid() {
  const grid = document.getElementById('sites-grid');
  grid.innerHTML = '';

  Object.values(sitesData).forEach(site => {
    grid.innerHTML += `
      <div onclick="openSiteDetail('${site.id}')" class="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-amber-500/50 transition duration-300">
        <div class="relative h-44 overflow-hidden">
          <img src="${site.images.past}" alt="${site.name[currentLang]}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          ${site.unesco ? `<span class="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow"><i class="fa-solid fa-award ml-1"></i> UNESCO</span>` : ''}
          <div class="absolute bottom-3 right-3 text-white">
            <span class="text-[10px] font-bold text-amber-400 block">${site.era[currentLang]}</span>
            <h3 class="text-lg font-black">${site.name[currentLang]}</h3>
          </div>
        </div>
        <div class="p-4 flex justify-between items-center">
          <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold">${site.sub[currentLang]}</p>
          <span class="text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-[-4px] transition-transform">استكشف <i class="fa-solid fa-chevron-left text-[10px] mr-1"></i></span>
        </div>
      </div>
    `;
  });
}

// 2. التنقل بين المعرض وصفحة التفاصيل
function openSiteDetail(siteId) {
  currentSiteId = siteId;
  document.getElementById('catalog-view').classList.add('hidden');
  document.getElementById('detail-view').classList.remove('hidden');
  
  // تحديث رابط الـ URL دون إعادة تحميل الصفحة
  history.pushState(null, '', `?id=${siteId}`);
  
  renderDetailView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showCatalogView() {
  document.getElementById('detail-view').classList.add('hidden');
  document.getElementById('catalog-view').classList.remove('hidden');
  
  // إعادة الرابط للرئيسية
  history.pushState(null, '', window.location.pathname);
}

// 3. عرض تفاصيل الموقع المحدد
function renderDetailView() {
  const site = sitesData[currentSiteId];
  if (!site) return;

  document.getElementById('site-title').innerText = site.name[currentLang];
  document.getElementById('site-era').innerText = site.era[currentLang];
  document.getElementById('site-desc').innerText = site.description[currentLang];

  // شارة يونسكو
  const badge = document.getElementById('unesco-badge');
  if (site.unesco) badge.classList.remove('hidden');
  else badge.classList.add('hidden');

  // الصور والصوت
  document.getElementById('img-past').src = site.images.past;
  document.getElementById('img-present').src = site.images.present;
  document.getElementById('audio-player').src = site.audio[currentLang];

  // الخريطة
  initMap(site);
}

// 4. خريطة Leaflet
function initMap(site) {
  if (mapInstance) mapInstance.remove();

  mapInstance = L.map('map').setView([site.coordinates.lat, site.coordinates.lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);

  L.marker([site.coordinates.lat, site.coordinates.lng])
    .addTo(mapInstance)
    .bindPopup(`<b>${site.name[currentLang]}</b>`)
    .openPopup();
}

// 5. السلايدر التفاعلي
function updateBeforeAfter(val) {
  document.getElementById('present-wrapper').style.width = val + '%';
}

// 6. تبديل الثيم (Dark / Light Theme)
function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById('theme-icon');

  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    icon.className = 'fa-solid fa-sun text-amber-500';
  } else {
    html.classList.add('dark');
    icon.className = 'fa-solid fa-moon';
  }
}

// 7. تبديل اللغة
function toggleLanguage() {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('lang-btn').innerText = currentLang === 'ar' ? 'English' : 'عربي';

  renderCatalogGrid();
  if (currentSiteId) renderDetailView();
}
