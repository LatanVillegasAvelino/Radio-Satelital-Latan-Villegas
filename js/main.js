// =======================
// SYSTEM CONFIG v2.0
// =======================
const stations = [
  // PERÚ
  { name: "Radio Moda", country: "Perú", region: "Sudamérica", url: "https://25023.live.streamtheworld.com/CRP_MOD_SC" },
  { name: "Ritmo Romántica", country: "Perú", region: "Sudamérica", url: "https://25103.live.streamtheworld.com/CRP_RIT_SC" },
  { name: "Onda Cero", country: "Perú", region: "Sudamérica", url: "https://mdstrm.com/audio/6598b65ab398c90871aff8cc/icecast.audio" },
  { name: "La Zona", country: "Perú", region: "Sudamérica", url: "https://mdstrm.com/audio/5fada54116646e098d97e6a5/icecast.audio" },
  { name: "RPP Noticias", country: "Perú", region: "Sudamérica", url: "https://mdstrm.com/audio/5fab3416b5f9ef165cfab6e9/icecast.audio" },
  { name: "Exitosa", country: "Perú", region: "Sudamérica", url: "https://neptuno-2-audio.mediaserver.digital/79525baf-b0f5-4013-a8bd-3c5c293c6561" },
  { name: "Radio Corazón", country: "Perú", region: "Sudamérica", url: "https://mdstrm.com/audio/5fada514fc16c006bd63370f/icecast.audio" },
  { name: "La Inolvidable", country: "Perú", region: "Sudamérica", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/CRP_LI_SC" },
  { name: "Radio Mágica", country: "Perú", region: "Sudamérica", url: "https://26513.live.streamtheworld.com/MAG_AAC_SC" },
  { name: "Radiomar", country: "Perú", region: "Sudamérica", url: "https://24873.live.streamtheworld.com/CRP_MARAAC_SC" },
  
  // EUROPA
  { name: "RFI Español", country: "Francia", region: "Europa", url: "https://rfiespagnol64k.ice.infomaniak.ch/rfienespagnol-64.mp3" },
  { name: "RNE 5", country: "España", region: "Europa", url: "https://dispatcher.rndfnk.com/crtve/rne5/main/mp3/high?aggregator=tunein" },
  { name: "Cadena COPE", country: "España", region: "Europa", url: "https://net1-cope-rrcast.flumotion.com/cope/net1-low.mp3" },
  { name: "Radio ES", country: "España", region: "Europa", url: "https://libertaddigital-radio-live1.flumotion.com/libertaddigital/ld-live1-low.mp3" },
  
  // INTERNACIONAL
  { name: "Radio Florida", country: "Internacional", region: "Norteamérica", url: "https://s8.myradiostream.com/56524/stream" }
];

const regionClassMap = {
  Sudamérica: "badge-sudamerica",
  Europa: "badge-europa",
  Norteamérica: "badge-default"
};

let favorites = new Set(JSON.parse(localStorage.getItem("ultra_favs") || "[]"));
let currentStation = null;
let isPlaying = false;

// ELEMENTOS DOM
const els = {
  player: document.getElementById("radioPlayer"),
  btnPlay: document.getElementById("btnPlay"),
  iconPlay: document.querySelector(".icon-play"),
  iconPause: document.querySelector(".icon-pause"),
  volSlider: document.getElementById("volSlider"),
  status: document.getElementById("statusIndicator"),
  title: document.getElementById("currentStation"),
  artist: document.getElementById("playerHint"),
  list: document.getElementById("stationList"),
  search: document.getElementById("stationSearch"),
  region: document.getElementById("regionSelect"),
  country: document.getElementById("countrySelect"),
  favToggle: document.getElementById("favoritesToggle"),
  clearFilters: document.getElementById("clearFilters")
};

// =======================
// UTILS & HAPTICS
// =======================
const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// Feedback Táctil (Vibración)
const hapticFeedback = (intensity = 'light') => {
  if (!navigator.vibrate) return;
  if (intensity === 'light') navigator.vibrate(10);
  if (intensity === 'medium') navigator.vibrate(20);
  if (intensity === 'success') navigator.vibrate([10, 30, 10]);
};

// =======================
// RENDER & LOGIC
// =======================
const init = () => {
  if(!els.list) return;
  loadFilters();
  updateVolumeVisuals(els.volSlider.value); // Set initial gradient
  renderList();
  setupListeners();
};

const renderList = () => {
  // View Transitions API: Animación suave entre estados de filtro
  if (!document.startViewTransition) {
    updateDOM(); // Fallback navegadores viejos
    return;
  }
  document.startViewTransition(() => {
    updateDOM();
  });
};

const updateDOM = () => {
  els.list.innerHTML = "";
  
  const term = normalize(els.search.value);
  const region = els.region.value;
  const country = els.country.value;
  const showFavs = els.favToggle.checked;

  const filtered = stations.filter(st => {
    const matchSearch = !term || normalize(st.name).includes(term);
    const matchRegion = region === "Todas" || st.region === region;
    const matchCountry = country === "Todos" || st.country === country;
    const matchFav = !showFavs || favorites.has(st.name);
    return matchSearch && matchRegion && matchCountry && matchFav;
  });

  if (filtered.length === 0) {
    els.list.innerHTML = `<p style="color:var(--text-muted); text-align:center; grid-column: 1/-1; padding: 2rem;">Sin señal en esta frecuencia.</p>`;
    return;
  }

  filtered.forEach(st => {
    const isActive = currentStation && currentStation.name === st.name;
    const isFav = favorites.has(st.name);
    
    const div = document.createElement("div");
    div.className = `station-card ${isActive ? 'active' : ''}`;
    
    // Mouse Tracking para el Glow Magnético
    div.onmousemove = (e) => {
      const rect = div.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      div.style.setProperty("--x", `${x}px`);
      div.style.setProperty("--y", `${y}px`);
    };

    div.onclick = (e) => {
      hapticFeedback('medium');
      if(!e.target.closest('.fav-btn')) playStation(st);
    };

    const badgeClass = regionClassMap[st.region] || "badge-default";

    // Visualizer ahora tiene 5 barras
    div.innerHTML = `
      <div class="st-info">
        <div class="st-icon ${badgeClass}"></div>
        <div>
          <span class="st-name">${st.name}</span>
          <span class="st-meta">${st.country}</span>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:10px;">
        <div class="visualizer">
          <div class="bar"></div><div class="bar"></div><div class="bar"></div>
          <div class="bar"></div><div class="bar"></div>
        </div>
        <button class="fav-btn ${isFav ? 'is-fav' : ''}" aria-label="Favorito">
          ${isFav ? '★' : '☆'}
        </button>
      </div>
    `;

    const btnFav = div.querySelector('.fav-btn');
    btnFav.onclick = (e) => {
      e.stopPropagation();
      hapticFeedback('light');
      if(favorites.has(st.name)) favorites.delete(st.name);
      else favorites.add(st.name);
      localStorage.setItem("ultra_favs", JSON.stringify([...favorites]));
      renderList();
    };

    els.list.appendChild(div);
  });
};

// =======================
// PLAYER ENGINE
// =======================
const playStation = (station) => {
  const allCards = document.querySelectorAll('.station-card');
  allCards.forEach(c => c.classList.remove('active'));
  
  if (currentStation && currentStation.name === station.name && isPlaying) {
    togglePlay();
    renderList();
    return;
  }

  currentStation = station;
  els.title.innerText = station.name;
  els.artist.innerText = "Estableciendo conexión...";
  els.status.innerText = "BUFFERING";
  els.status.style.color = "#ffca28"; 
  els.status.classList.remove("live");

  els.player.src = station.url;
  els.player.volume = els.volSlider.value;
  
  const playPromise = els.player.play();

  if (playPromise !== undefined) {
    playPromise.then(() => {
      setPlayingState(true);
      hapticFeedback('success');
      renderList(); 
    }).catch(error => {
      console.error("Stream Error:", error);
      els.artist.innerText = "Error: Stream offline.";
      els.status.innerText = "OFFLINE";
      els.status.style.color = "#ff3d3d";
      setPlayingState(false);
      hapticFeedback('medium'); // Vibración de error
    });
  }
};

const togglePlay = () => {
  if (!currentStation) return;
  hapticFeedback('light');
  if (els.player.paused) {
    els.player.play();
    setPlayingState(true);
  } else {
    els.player.pause();
    setPlayingState(false);
  }
};

const setPlayingState = (playing) => {
  isPlaying = playing;
  if (playing) {
    if(els.iconPlay) els.iconPlay.style.display = "none";
    if(els.iconPause) els.iconPause.style.display = "block";
    els.status.innerText = "EN VIVO";
    els.status.classList.add("live");
    els.status.style.color = "#00e676";
    if(currentStation) els.artist.innerText = `${currentStation.country} · ${currentStation.region}`;
    document.title = `▶ ${currentStation.name} • En Vivo`;
  } else {
    if(els.iconPlay) els.iconPlay.style.display = "block";
    if(els.iconPause) els.iconPause.style.display = "none";
    els.status.innerText = "PAUSADO";
    els.status.classList.remove("live");
    els.status.style.color = "var(--accent)";
    document.title = "Satelital | Pausado";
  }
};

const updateVolumeVisuals = (val) => {
  // Truco para rellenar el slider con gradiente
  const percentage = val * 100;
  els.volSlider.style.background = `linear-gradient(to right, #fff ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`;
};

// =======================
// FILTERS & EVENTS
// =======================
const loadFilters = () => {
  const regions = ["Todas", ...new Set(stations.map(s => s.region))];
  const countries = ["Todos", ...new Set(stations.map(s => s.country))];
  fillSelect(els.region, regions);
  fillSelect(els.country, countries);
};

const fillSelect = (sel, arr) => {
  sel.innerHTML = "";
  arr.forEach(val => {
    const opt = document.createElement("option");
    opt.value = val;
    opt.innerText = val;
    sel.appendChild(opt);
  });
};

const setupListeners = () => {
  if(els.btnPlay) els.btnPlay.addEventListener("click", togglePlay);
  
  if(els.volSlider) {
    els.volSlider.addEventListener("input", (e) => {
      const val = e.target.value;
      els.player.volume = val;
      updateVolumeVisuals(val);
    });
  }

  if(els.search) els.search.addEventListener("input", renderList);
  if(els.region) els.region.addEventListener("change", renderList);
  if(els.country) els.country.addEventListener("change", renderList);
  if(els.favToggle) els.favToggle.addEventListener("change", () => {
    hapticFeedback('light');
    renderList();
  });

  if(els.clearFilters) {
    els.clearFilters.addEventListener("click", () => {
      hapticFeedback('light');
      els.search.value = "";
      els.region.value = "Todas";
      els.country.value = "Todos";
      els.favToggle.checked = false;
      renderList();
    });
  }
};

document.addEventListener("DOMContentLoaded", init);
