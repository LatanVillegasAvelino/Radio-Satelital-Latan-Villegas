// =======================
// SYSTEM CORE v3.0 (PROD)
// =======================

const systemConfig = {
  fadeDuration: 200,
  defaultVolume: 0.8
};

// DATA: FRECUENCIAS (Se mantiene igual, solo asegúrate de copiar toda tu lista aquí)
// NOTA: Para este ejemplo usaré una versión abreviada, tú pega TU lista completa de estaciones aquí.
const stations = [
  // ... PEGA AQUÍ TUS ESTACIONES (El array stations del archivo original) ...
  { name: "Radio Moda", country: "Perú", region: "Sudamérica", url: "https://25023.live.streamtheworld.com/CRP_MOD_SC" },
  { name: "Ritmo Romántica", country: "Perú", region: "Sudamérica", url: "https://25103.live.streamtheworld.com/CRP_RIT_SC" },
  { name: "Onda Cero", country: "Perú", region: "Sudamérica", url: "https://mdstrm.com/audio/6598b65ab398c90871aff8cc/icecast.audio" },
  { name: "La Zona", country: "Perú", region: "Sudamérica", url: "https://mdstrm.com/audio/5fada54116646e098d97e6a5/icecast.audio" },
  { name: "RPP Noticias", country: "Perú", region: "Sudamérica", url: "https://mdstrm.com/audio/5fab3416b5f9ef165cfab6e9/icecast.audio" },
  { name: "Radio PBO", country: "Perú", region: "Sudamérica", url: "https://stream.radiojar.com/2fse67zuv8hvv" },
  { name: "Radio Inca", country: "Perú", region: "Sudamérica", url: "https://stream.zeno.fm/b9x47pyk21zuv" },
  { name: "RFI Internacional", country: "Francia", region: "Europa", url: "https://rfienespagnol64k.ice.infomaniak.ch/rfienespagnol-64.mp3" },
  { name: "DW Español", country: "Alemania", region: "Europa", url: "https://dwstream6-lh.akamaihd.net/i/dwstream6_live@123544/master.m3u8" },
  { name: "Radio La Hondureña", country: "Honduras", region: "Centroamérica", url: "https://s2.mkservers.space/rih" }
];

// ESTADO GLOBAL
let appState = {
  currentStation: null,
  isPlaying: false,
  favorites: new Set(JSON.parse(localStorage.getItem("pro_favs") || "[]")),
  viewMode: localStorage.getItem("pro_view") || "grid", // grid | list
  theme: localStorage.getItem("pro_theme") || "amoled" // amoled | midnight | gold
};

// ELEMENTOS DOM
const ui = {
  body: document.body,
  audio: document.getElementById("radioPlayer"),
  playBtn: document.getElementById("btnPlay"),
  volSlider: document.getElementById("volSlider"),
  status: document.getElementById("statusIndicator"),
  title: document.getElementById("currentStation"),
  artist: document.getElementById("playerHint"),
  list: document.getElementById("stationList"),
  search: document.getElementById("stationSearch"),
  region: document.getElementById("regionSelect"),
  country: document.getElementById("countrySelect"),
  favToggle: document.getElementById("favoritesToggle"),
  clearFilters: document.getElementById("clearFilters"),
  // Nuevos controles
  themeSelect: document.getElementById("themeSelector"),
  btnGrid: document.getElementById("viewGrid"),
  btnList: document.getElementById("viewList")
};

// =======================
// CORE FUNCTIONS
// =======================

const init = () => {
  if (!ui.list) return console.error("Critical: DOM Error");

  // 1. Restaurar Preferencias
  applyTheme(appState.theme);
  applyViewMode(appState.viewMode);
  
  // 2. Cargar Filtros y Audio
  loadFilters();
  ui.audio.volume = systemConfig.defaultVolume;
  ui.volSlider.value = systemConfig.defaultVolume;
  
  // 3. Render Inicial (Muestra TODO automáticamente)
  renderList();
  
  // 4. Bind Events
  bindEvents();
};

// --- LOGIC: THEME & VIEW ---

const applyTheme = (themeName) => {
  appState.theme = themeName;
  ui.body.setAttribute("data-theme", themeName);
  ui.themeSelect.value = themeName;
  localStorage.setItem("pro_theme", themeName);
};

const applyViewMode = (mode) => {
  appState.viewMode = mode;
  
  // Toggle clases en el contenedor
  ui.list.classList.remove("grid-view", "list-view");
  ui.list.classList.add(`${mode}-view`);
  
  // Toggle estado visual botones
  ui.btnGrid.classList.toggle("active", mode === "grid");
  ui.btnList.classList.toggle("active", mode === "list");
  
  localStorage.setItem("pro_view", mode);
};

// --- LOGIC: AUDIO ---

const playStation = async (station) => {
  // Update UI inmediato
  document.querySelectorAll('.station-card').forEach(c => c.classList.remove('active'));
  
  if (appState.currentStation?.name === station.name) {
    togglePlay();
    renderList(); 
    return;
  }

  appState.currentStation = station;
  appState.isPlaying = true;
  
  ui.title.innerText = station.name;
  ui.artist.innerText = `${station.country} · ${station.region}`;
  updateStatus("CONECTANDO...", true);

  ui.audio.src = station.url;
  
  try {
    await ui.audio.play();
    updateStatus("TRANSMITIENDO", true);
    renderList(); 
    updatePlayButton(true);
  } catch (err) {
    console.error("Stream Error:", err);
    updateStatus("SEÑAL CAÍDA", false);
    appState.isPlaying = false;
    updatePlayButton(false);
  }
};

const togglePlay = () => {
  if (!appState.currentStation) return;

  if (ui.audio.paused) {
    ui.audio.play()
      .then(() => {
        appState.isPlaying = true;
        updateStatus("TRANSMITIENDO", true);
        updatePlayButton(true);
      })
      .catch(() => {
        updateStatus("ERROR", false);
        appState.isPlaying = false;
      });
  } else {
    ui.audio.pause();
    appState.isPlaying = false;
    updateStatus("EN PAUSA", false);
    updatePlayButton(false);
  }
};

// --- UI UPDATES ---

const updateStatus = (text, isLive) => {
  ui.status.innerText = text;
  if (isLive) ui.status.classList.add("live");
  else ui.status.classList.remove("live");
};

const updatePlayButton = (isPlaying) => {
  const playIcon = `<svg class="icon-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
  const pauseIcon = `<svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
  
  ui.playBtn.innerHTML = isPlaying ? pauseIcon : playIcon;
  document.title = isPlaying ? `▶ ${appState.currentStation.name}` : "Satelital | Core";
};

const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const renderList = () => {
  ui.list.innerHTML = "";
  
  const term = normalize(ui.search.value);
  const region = ui.region.value;
  const country = ui.country.value;
  const showFavs = ui.favToggle.checked;

  const filtered = stations.filter(st => {
    const matchSearch = !term || normalize(st.name).includes(term);
    const matchRegion = region === "Todas" || st.region === region;
    const matchCountry = country === "Todos" || st.country === country;
    const matchFav = !showFavs || appState.favorites.has(st.name);
    return matchSearch && matchRegion && matchCountry && matchFav;
  });

  if (filtered.length === 0) {
    ui.list.innerHTML = `<p style="color:var(--text-muted); text-align:center; grid-column: 1/-1; padding: 2rem;">NO SE ENCONTRARON FRECUENCIAS.</p>`;
    return;
  }

  const fragment = document.createDocumentFragment();

  filtered.forEach(st => {
    const isActive = appState.currentStation?.name === st.name;
    const isFav = appState.favorites.has(st.name);
    
    const div = document.createElement("div");
    div.className = `station-card ${isActive ? 'active' : ''}`;
    
    div.innerHTML = `
      <div class="st-info">
        <div class="st-icon">
          ${st.name.substring(0,2).toUpperCase()}
        </div>
        <div class="st-text">
          <span class="st-name">${st.name}</span>
          <span class="st-meta">${st.country}</span>
        </div>
      </div>
      
      <div style="display:flex; align-items:center; gap:12px; flex-shrink:0;">
        <div class="visualizer">
          <div class="bar"></div><div class="bar"></div><div class="bar"></div>
        </div>
        <button class="fav-btn ${isFav ? 'is-fav' : ''}" aria-label="Favorito">
          ${isFav ? '★' : '☆'}
        </button>
      </div>
    `;

    div.onclick = (e) => {
      if(!e.target.closest('.fav-btn')) playStation(st);
    };

    const btnFav = div.querySelector('.fav-btn');
    btnFav.onclick = (e) => {
      e.stopPropagation();
      toggleFavorite(st.name);
    };

    fragment.appendChild(div);
  });

  ui.list.appendChild(fragment);
};

const toggleFavorite = (name) => {
  if (appState.favorites.has(name)) {
    appState.favorites.delete(name);
  } else {
    appState.favorites.add(name);
  }
  localStorage.setItem("pro_favs", JSON.stringify([...appState.favorites]));
  renderList();
};

const loadFilters = () => {
  const regions = ["Todas", ...new Set(stations.map(s => s.region))].sort();
  const countries = ["Todos", ...new Set(stations.map(s => s.country))].sort();
  
  populateSelect(ui.region, regions);
  populateSelect(ui.country, countries);
};

const populateSelect = (el, items) => {
  el.innerHTML = "";
  items.forEach(i => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.innerText = i;
    el.appendChild(opt);
  });
};

const bindEvents = () => {
  ui.playBtn.addEventListener("click", togglePlay);
  
  ui.volSlider.addEventListener("input", (e) => {
    ui.audio.volume = e.target.value;
  });

  // Filtros
  [ui.search, ui.region, ui.country, ui.favToggle].forEach(el => {
    if(el) el.addEventListener(el.type === 'checkbox' ? 'change' : 'input', renderList);
  });

  if(ui.clearFilters) {
    ui.clearFilters.addEventListener("click", () => {
      ui.search.value = "";
      ui.region.value = "Todas";
      ui.country.value = "Todos";
      ui.favToggle.checked = false;
      renderList();
    });
  }

  // NUEVOS CONTROLES
  ui.themeSelect.addEventListener("change", (e) => applyTheme(e.target.value));
  ui.btnGrid.addEventListener("click", () => applyViewMode("grid"));
  ui.btnList.addEventListener("click", () => applyViewMode("list"));

  // Error Audio
  ui.audio.onerror = () => {
    if(appState.isPlaying) updateStatus("ERROR DE STREAM", false);
  };
};

// BOOT
document.addEventListener("DOMContentLoaded", init);
