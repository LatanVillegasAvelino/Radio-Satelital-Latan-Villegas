<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="theme-color" content="#05070a">
  
  <title>Radio Satelital | Ultra Interface v6.3</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="css/style.css" />
</head>

<body class="page">
  <div class="ambient-bg"></div>

  <header class="site-header">
    <div class="container header-inner">
      <div class="brand-mark">
        <div class="brand-icon"><div class="brand-wave"></div></div>
        <div class="brand-text">
          <h1 class="site-title">Satelital</h1>
          <p class="site-subtitle">Wave Player v6.3</p>
        </div>
      </div>
    </div>
  </header>

  <main id="mainContent" class="site-main">
    <div class="container layout">

      <aside class="sidebar">
        <section class="player-section glass-panel">
          <div class="player-info">
            <span class="status-indicator" id="statusIndicator">Ready</span>
            <div class="track-display">
                <h2 id="currentStation" class="track-title">Selecciona Emisora</h2>
                <p id="streamInfo" class="track-artist">Esperando conexión...</p>
                <div class="meta-badge" id="metaBadge" style="display:none">LIVE</div>
            </div>
            <div class="stats-row" id="statsRow" style="opacity:0">
              <div class="stat-item">
                <span id="listenerCount">0</span>
              </div>
              <div class="stat-item">
                <span id="likeCount">0</span>
              </div>
            </div>
          </div>

          <div id="timerDisplay" class="timer-text">00:00</div>
          <audio id="radioPlayer" preload="none" class="sr-only" crossorigin="anonymous"></audio>

          <div class="custom-controls">
            <div class="control-group">
              <button id="btnPrev" class="sec-btn" aria-label="Anterior">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
              </button>
              <button id="btnPlay" class="btn-control play-btn" aria-label="Reproducir">
                <svg class="icon-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                <svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              </button>
              <button id="btnNext" class="sec-btn" aria-label="Siguiente">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
              </button>
            </div>
            <div class="volume-control">
              <input type="range" id="volSlider" min="0" max="1" step="0.01" value="1">
            </div>
          </div>
        </section>

        <section class="add-station glass-panel">
          <div class="panel-head-small"><h3>Agregar Frecuencia</h3></div>
          <form id="addStationForm" class="mini-form">
            <input type="text" id="newStationName" placeholder="Nombre" required class="input-dark mini">
            <input type="text" id="newStationCountry" placeholder="País" required class="input-dark mini">
            <input type="url" id="newStationUrl" placeholder="URL (HTTPS)" required class="input-dark mini">
            <button type="submit" class="btn-action">Guardar</button>
          </form>
        </section>

        <section class="filters glass-panel">
          <div class="filters-header"><h3>Filtros</h3><button id="clearFilters" class="btn-text">Reset</button></div>
          <div class="form-group">
            <select id="themeSelect" class="input-dark">
              <option value="default">Cyber Dark</option>
              <option value="amoled">Pure AMOLED</option>
              <option value="gold">Gold Luxury</option>
              <option value="purple">Neon Purple</option>
            </select>
          </div>
          <div class="filter-row">
            <div class="form-group"><select id="regionSelect" class="input-dark"></select></div>
            <div class="form-group"><select id="countrySelect" class="input-dark"></select></div>
          </div>
        </section>
      </aside>

      <section class="stations-panel glass-panel">
        <div class="panel-head">
          <h3>Frecuencias</h3>
          <input id="stationSearch" type="search" placeholder="Buscar..." class="input-dark search-input">
        </div>
        <div class="fav-toggle-wrap">
          <label class="switch-label">
            <input type="checkbox" id="favoritesToggle">
            <span class="switch-text">Prioridad Favoritos</span>
          </label>
        </div>
        <div id="stationList" class="station-grid"></div>
      </section>

    </div>
  </main>

  <footer class="site-footer"><p>&copy; 2025 Radio Satelital</p></footer>

  <script>
    const defaultStations = [
      // ====== PERÚ ======
      { name: "Radio Moda", country: "Perú", region: "Sudamérica", url: "https://25023.live.streamtheworld.com/CRP_MOD_SC" },
      { name: "Ritmo Romántica", country: "Perú", region: "Sudamérica", url: "https://25103.live.streamtheworld.com/CRP_RIT_SC" },
      { name: "Onda Cero", country: "Perú", region: "Sudamérica", url: "https://mdstrm.com/audio/6598b65ab398c90871aff8cc/icecast.audio" },
      { name: "La Zona", country: "Perú", region: "Sudamérica", url: "https://mdstrm.com/audio/5fada54116646e098d97e6a5/icecast.audio" },
      { name: "Radio Corazón", country: "Perú", region: "Sudamérica", url: "https://mdstrm.com/audio/5fada514fc16c006bd63370f/icecast.audio" },
      { name: "La Inolvidable", country: "Perú", region: "Sudamérica", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/CRP_LI_SC" },
      { name: "Radio Mágica", country: "Perú", region: "Sudamérica", url: "https://26513.live.streamtheworld.com/MAG_AAC_SC" },
      { name: "Radiomar", country: "Perú", region: "Sudamérica", url: "https://24873.live.streamtheworld.com/CRP_MARAAC_SC" },
      { name: "RPP Noticias", country: "Perú", region: "Sudamérica", url: "https://mdstrm.com/audio/5fab3416b5f9ef165cfab6e9/icecast.audio" },
      { name: "Exitosa Noticias", country: "Perú", region: "Sudamérica", url: "https://neptuno-2-audio.mediaserver.digital/79525baf-b0f5-4013-a8bd-3c5c293c6561" },
      { name: "Radio PBO", country: "Perú", region: "Sudamérica", url: "https://stream.radiojar.com/2fse67zuv8hvv" },
      { name: "Radio Inca", country: "Perú", region: "Sudamérica", url: "https://stream.zeno.fm/b9x47pyk21zuv" },
      { name: "Radio Turbo Mix", country: "Perú", region: "Sudamérica", url: "https://serverssl.innovatestream.pe:8080/167.114.118.120:7624/stream" },
      { name: "Radio Fuego", country: "Perú", region: "Sudamérica", url: "https://serverssl.innovatestream.pe:8080/sp.onliveperu.com:8128/" },
      { name: "Radio Andina", country: "Perú", region: "Sudamérica", url: "https://serverssl.innovatestream.pe:8080/http://167.114.118.120:7058/;stream" },
      { name: "Radio Ilucan", country: "Perú", region: "Sudamérica", url: "https://serverssl.innovatestream.pe:8080/167.114.118.120:7820/;stream" },
      { name: "Radio Abba Padre", country: "Perú", region: "Sudamérica", url: "https://stream-175.zeno.fm/6rrwumthg6quv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiI2cnJ3dW10aGc2cXV2IiwiaG9zdCI6InN0cmVhbS0xNzUuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6Im9XY2g3dmlTU0NHYlVGQ0QtZmNxUFEiLCJpYXQiOjE3NjQ3OTMwNDksImV4cCI6MTc2NDc5MzEwOX0.U3kdYbFm_XjuESzU_aSQ7owwkG9ScWV9h4fLn36I88U" },
      { name: "Radio ABN", country: "Perú", region: "Sudamérica", url: "https://jml-stream.com/radio/8000/radio.mp3" },

      // ====== REGIONALES HTTPS ======
      { name: "Radio Santa Lucía", country: "Perú", region: "Sudamérica", url: "https://sp.dattavolt.com/8014/stream" },
      { name: "Radio Pampa Yurac", country: "Perú", region: "Sudamérica", url: "https://rr5200.globalhost1.com/8242/stream" },
      { name: "Radio Stereo TV", country: "Perú", region: "Sudamérica", url: "https://sp.onliveperu.com:7048/stream" },
      { name: "Radio La Kuadra", country: "Perú", region: "Sudamérica", url: "https://dattavolt.com/8046/stream" },
      { name: "Radio Frecuencia", country: "Perú", region: "Sudamérica", url: "https://conectperu.com/8384/stream" },
      { name: "Onda Popular (Lima)", country: "Perú", region: "Sudamérica", url: "https://envivo.top:8443/am" },
      { name: "Onda Popular (Juliaca)", country: "Perú", region: "Sudamérica", url: "https://dattavolt.com/8278/stream" },
      { name: "Radio Nor Andina", country: "Perú", region: "Sudamérica", url: "https://mediastreamm.com/8012/stream/1/" },
      { name: "Radio Bambamarca", country: "Perú", region: "Sudamérica", url: "https://envivo.top:8443/lider" },
      { name: "Radio Continente", country: "Perú", region: "Sudamérica", url: "https://sonic6.my-servers.org/10170/" },
      { name: "La Cheverísima", country: "Perú", region: "Sudamérica", url: "https://sp.onliveperu.com:8114/stream" },
      { name: "Radio TV El Shaddai", country: "Perú", region: "Sudamérica", url: "https://stream.zeno.fm/ppr5q4q3x1zuv" },
      { name: "Radio Inica Digital", country: "Perú", region: "Sudamérica", url: "https://stream.zeno.fm/487vgx80yuhvv" },
      { name: "Radio La Falsa", country: "Perú", region: "Sudamérica", url: "https://stream.zeno.fm/b9x47pyk21zuv" },
      { name: "Radio Activa", country: "Perú", region: "Sudamérica", url: "https://sp.onliveperu.com:8108/stream" },
      { name: "Radio Mía", country: "Perú", region: "Sudamérica", url: "https://streaming.zonalatinaeirl.com:8020/radio" },
      { name: "Radio Patrón", country: "Perú", region: "Sudamérica", url: "https://streaming.zonalatinaeirl.com:8010/radio" },
      { name: "Radio TV Sureña", country: "Perú", region: "Sudamérica", url: "https://stream.zeno.fm/p7d5fpx4xnhvv" },
      { name: "Radio Enamorados", country: "Perú", region: "Sudamérica", url: "https://stream.zeno.fm/gnybbqc1fnruv" },

      // ====== INTERNACIONAL ======
      { name: "Radio ABC (San Luis)", country: "México", region: "Norteamérica", url: "https://16643.live.streamtheworld.com/XHCZFM.mp3" },
      { name: "Radio ABC (Taxco)", country: "México", region: "Norteamérica", url: "https://streaming.servicioswebmx.com/8288/stream" },
      { name: "ABC 760", country: "México", region: "Norteamérica", url: "https://streamingcwsradio30.com/8292/stream" },
      { name: "ABC Radio Puebla", country: "México", region: "Norteamérica", url: "https://streaming.servicioswebmx.com/8264/stream" },
      { name: "Radio Acceso Total", country: "México", region: "Norteamérica", url: "https://us10a.serverse.com/proxy/acce8712?mp=/;" },
      { name: "Ach Kuxlejal 100.3", country: "México", region: "Norteamérica", url: "https://stream-178.zeno.fm/md6tfkaaechvv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJtZDZ0ZmthYWVjaHZ2IiwiaG9zdCI6InN0cmVhbS0xNzguemVuby5mbSIsInJ0dGwiOjUsImp0aSI6IkI4TUMzLXR3UTR1Q1VzbXY2M0gwUFEiLCJpYXQiOjE3NjQ3OTQ4MTksImV4cCI6MTc2NDc5NDg3OX0.xBJOxw_oGdW4sqNsL4n9WyUeK6CTvzAY8o5i5MjLe78" },
      
      { name: "ABC 94.7", country: "Argentina", region: "Sudamérica", url: "https://stream-176.zeno.fm/n03jc4xoy63tv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJuMDNqYzR4b3k2M3R2IiwiaG9zdCI6InN0cmVhbS0xNzYuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6Im9aa3kyRHRvUXBDU3kwNUF2OGdPX3ciLCJpYXQiOjE3NjQ3OTM2MzksImV4cCI6MTc2NDc5MzY5OX0.clgYVIm4DHZtHwGTjXdSfYi0SjVgGWj8UkiZEBz3yg0" },
      { name: "Estéreo Abejorral", country: "Colombia", region: "Sudamérica", url: "https://icecasthd.net/proxy/abejorral/live" },
      { name: "Abriendo Surcos", country: "Colombia", region: "Sudamérica", url: "https://djp.sytes.net/public/abriendo_surcos" },
      { name: "Acacio de Chile", country: "Chile", region: "Sudamérica", url: "https://sonic.portalfoxmix.cl:7057/;" },
      { name: "Acción FM", country: "Venezuela", region: "Sudamérica", url: "https://stream.intervalohost.com:7008/stream" },
      { name: "Aclo Chuquisaca", country: "Bolivia", region: "Sudamérica", url: "https://cloudstream2030.conectarhosting.com/8192/stream" },
      { name: "Aclo Tarija", country: "Bolivia", region: "Sudamérica", url: "https://cloudstream2030.conectarhosting.com/8242/stream" },
      
      { name: "Radio La Hondureña", country: "Honduras", region: "Centroamérica", url: "https://s2.mkservers.space/rih" },
      { name: "Abriendo Los Cielos", country: "Honduras", region: "Centroamérica", url: "https://stream-177.zeno.fm/a8uwe88svy8uv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJhOHV3ZTg4c3Z5OHV2IiwiaG9zdCI6InN0cmVhbS0xNzcuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6Ik9VWVRibTdpUVUtQjVhSHFOWUNyX1EiLCJpYXQiOjE3NjQ3OTQwOTQsImV4cCI6MTc2NDc5NDE1NH0.n3CeLd9U7rcF9A9NsPpzFGJJjuPsUoaf2EsUxGah04w" },
      { name: "Una Radio Viva Voz", country: "Nicaragua", region: "Centroamérica", url: "https://rr5100.globalhost1.com/8006/stream" },
      
      { name: "105.3 El Ritmo", country: "EE.UU", region: "Norteamérica", url: "https://n02b-e2.revma.ihrhls.com/zc3209/hls.m3u8?rj-ttl=5&rj-tok=AAABmuXcB-4Ad7qhABJqQGGBcg" },
      { name: "Acción Cristiana", country: "EE.UU", region: "Norteamérica", url: "https://panel.lifestreammedia.net:8162/stream" },

      { name: "RFI Internacional", country: "Francia", region: "Europa", url: "https://rfienespagnol64k.ice.infomaniak.ch/rfienespagnol-64.mp3" },
      { name: "RFI Español (96k)", country: "Francia", region: "Europa", url: "https://rfiespagnol96k.ice.infomaniak.ch/rfiespagnol-96k.mp3" },
      { name: "DW Español", country: "Alemania", region: "Europa", url: "https://dwstream6-lh.akamaihd.net/i/dwstream6_live@123544/master.m3u8" },
      
      { name: "RNE 5 (España)", country: "España", region: "Europa", url: "https://dispatcher.rndfnk.com/crtve/rne5/main/mp3/high?aggregator=tunein" },
      { name: "RNE Radio Clásica", country: "España", region: "Europa", url: "https://rnelivestream.rtve.es/rnerc/main/master.m3u8" },
      { name: "RNE Radio Nacional", country: "España", region: "Europa", url: "https://f141.rndfnk.com/star/crtve/rne1/nav/mp3/128/ct/stream.mp3?cid=01GENZSPVYG0R84NK9E1C77RSZ&sid=36LhA65FiO252hsvxBqzfqiI4HF&token=-FbGT-8Eif8zgFPSMX7ER3TPiwAZ4pI8BsNKr1HldC4&tvf=HsCHLkTgfRhmMTQxLnJuZGZuay5jb20" },
      { name: "Radio AFRONTAR", country: "España", region: "Europa", url: "https://vigo-copesedes-rrcast.flumotion.com/copesedes/vigo-low.mp3" },
      { name: "AB 95 FM", country: "España", region: "Europa", url: "https://stream-153.zeno.fm/szskq9dxs98uv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJzenNrcTlkeHM5OHV2IiwiaG9zdCI6InN0cmVhbS0xNTMuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6Ims0M0xwaVpDVE1pRXExWVhvMEpjUmciLCJpYXQiOjE3NjQ3OTI4NjUsImV4cCI6MTc2NDc5MjkyNX0.dpzu-0oLrJ2nsOJU25J8ghjMS2O_2FSyXzntk4rD05A" },
      { name: "Radio Tele Taxi", country: "España", region: "Europa", url: "https://radiott-web.streaming-pro.com:6103/radiott.mp3" },
      { name: "Radio ES", country: "España", region: "Europa", url: "https://libertaddigital-radio-live1.flumotion.com/libertaddigital/ld-live1-low.mp3" },
      { name: "Cadena COPE", country: "España", region: "Europa", url: "https://net1-cope-rrcast.flumotion.com/cope/net1-low.mp3" }
    ];
  </script>

  <script>
    const regionClassMap = {
      "Sudamérica": "badge-sudamerica", "Europa": "badge-europa",
      "Norteamérica": "badge-norteamerica", "Centroamérica": "badge-norteamerica",
      "Internacional": "badge-default", "Custom": "badge-custom"
    };

    let stations = [];
    let favorites = new Set(JSON.parse(localStorage.getItem("ultra_favs") || "[]"));
    let currentStation = null;
    let isPlaying = false;
    let timerInterval = null;
    let secondsElapsed = 0;

    const els = {
      player: document.getElementById("radioPlayer"),
      btnPlay: document.getElementById("btnPlay"),
      btnPrev: document.getElementById("btnPrev"),
      btnNext: document.getElementById("btnNext"),
      volSlider: document.getElementById("volSlider"),
      status: document.getElementById("statusIndicator"),
      title: document.getElementById("currentStation"),
      info: document.getElementById("streamInfo"),
      badge: document.getElementById("metaBadge"),
      timer: document.getElementById("timerDisplay"),
      list: document.getElementById("stationList"),
      search: document.getElementById("stationSearch"),
      region: document.getElementById("regionSelect"),
      country: document.getElementById("countrySelect"),
      favToggle: document.getElementById("favoritesToggle"),
      clearFilters: document.getElementById("clearFilters"),
      themeSelect: document.getElementById("themeSelect"),
      statsRow: document.getElementById("statsRow"),
      listenerCount: document.getElementById("listenerCount"),
      likeCount: document.getElementById("likeCount"),
      addForm: document.getElementById("addStationForm")
    };

    // =======================
    // INIT
    // =======================
    const init = () => {
      if(!els.list) { console.error("FATAL: DOM Elements not found"); return; }
      
      const customStations = JSON.parse(localStorage.getItem("ultra_custom") || "[]");
      stations = [...customStations, ...defaultStations];

      const savedTheme = localStorage.getItem("ultra_theme") || "default";
      setTheme(savedTheme);
      if(els.themeSelect) els.themeSelect.value = savedTheme;

      loadFilters();
      els.search.value = ""; els.region.value = "Todas"; els.country.value = "Todos"; els.favToggle.checked = false;
      
      updateVolumeVisuals(els.volSlider.value);
      renderList();
      setupListeners();
    };

    const setTheme = (themeName) => {
      document.body.setAttribute("data-theme", themeName === "default" ? "" : themeName);
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if(metaTheme) metaTheme.setAttribute("content", themeName === "amoled" ? "#000000" : "#05070a");
      updateVolumeVisuals(els.volSlider.value);
    };

    // =======================
    // PLAYER LOGIC
    // =======================
    const simulateStats = () => {
      const viewers = Math.floor(Math.random() * (5000 - 100) + 100);
      const likes = Math.floor(viewers * (Math.random() * 0.8));
      animateValue(els.listenerCount, 0, viewers, 1000);
      animateValue(els.likeCount, 0, likes, 1000);
      els.statsRow.style.opacity = "1";
    };

    const animateValue = (obj, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = new Intl.NumberFormat().format(Math.floor(progress * (end - start) + start));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };

    const playStation = (station) => {
      if (currentStation && currentStation.name === station.name) { togglePlay(); return; }
      currentStation = station;
      
      els.title.innerText = station.name;
      els.info.innerText = `${station.country} · ${station.region}`;
      els.status.innerText = "CONECTANDO...";
      els.status.style.color = "";
      els.badge.style.display = "none";
      els.statsRow.style.opacity = "0";
      
      stopTimer();
      if(els.timer) els.timer.innerText = "00:00";

      els.player.src = station.url;
      els.player.volume = els.volSlider.value;
      
      const p = els.player.play();
      if (p !== undefined) {
        p.then(() => {
          setPlayingState(true);
          simulateStats();
          if (navigator.vibrate) navigator.vibrate([10,30]);
          updateMediaSession(); 
        }).catch(e => {
          console.error(e);
          els.info.innerText = "Stream Offline";
          els.status.innerText = "ERROR";
          els.status.style.color = "#ff3d3d";
          setPlayingState(false);
        });
      }
    };

    const togglePlay = () => {
      if (!currentStation) {
        if(stations.length > 0) playStation(stations[0]);
        return;
      }
      if (els.player.paused) { els.player.play(); setPlayingState(true); } 
      else { els.player.pause(); setPlayingState(false); }
    };

    const setPlayingState = (playing) => {
      isPlaying = playing;
      if (playing) {
        els.btnPlay.classList.add("playing");
        els.status.innerText = "EN VIVO";
        els.status.classList.add("live");
        els.badge.style.display = "inline-block";
        startTimer();
        if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing';
      } else {
        els.btnPlay.classList.remove("playing");
        els.status.innerText = "PAUSADO";
        els.status.classList.remove("live");
        els.badge.style.display = "none";
        stopTimer();
        if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused';
      }
      renderList();
    };

    const skipStation = (direction) => {
      if (stations.length === 0) return;
      let newIndex = 0;
      if (!currentStation) {
        newIndex = direction > 0 ? 0 : stations.length - 1;
      } else {
        const currentIndex = stations.findIndex(s => s.name === currentStation.name);
        newIndex = currentIndex + direction;
        if (newIndex >= stations.length) newIndex = 0;
        if (newIndex < 0) newIndex = stations.length - 1;
      }
      playStation(stations[newIndex]);
    };

    const updateMediaSession = () => {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: currentStation.name,
          artist: currentStation.country + ' · ' + currentStation.region,
          album: 'Satelital Wave Player v6.3',
        });
        navigator.mediaSession.setActionHandler('previoustrack', () => skipStation(-1));
        navigator.mediaSession.setActionHandler('nexttrack', () => skipStation(1));
        navigator.mediaSession.setActionHandler('play', () => { els.player.play(); setPlayingState(true); });
        navigator.mediaSession.setActionHandler('pause', () => { els.player.pause(); setPlayingState(false); });
      }
    };

    const addCustomStation = (e) => {
      e.preventDefault();
      const name = document.getElementById("newStationName").value;
      const country = document.getElementById("newStationCountry").value;
      const url = document.getElementById("newStationUrl").value;
      if(name && url) {
        const newStation = { name, country, region: "Custom", url, isCustom: true };
        const customStations = JSON.parse(localStorage.getItem("ultra_custom") || "[]");
        customStations.push(newStation);
        localStorage.setItem("ultra_custom", JSON.stringify(customStations));
        location.reload(); 
      }
    };

    const deleteCustomStation = (e, stationName) => {
      e.stopPropagation();
      if(confirm(`¿Eliminar ${stationName}?`)) {
        let customStations = JSON.parse(localStorage.getItem("ultra_custom") || "[]");
        customStations = customStations.filter(s => s.name !== stationName);
        localStorage.setItem("ultra_custom", JSON.stringify(customStations));
        location.reload();
      }
    };

    const renderList = () => {
      els.list.innerHTML = "";
      const term = els.search.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const region = els.region.value;
      const country = els.country.value;
      const showFavs = els.favToggle.checked;

      const filtered = stations.filter(st => {
        const matchSearch = !term || st.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(term);
        const matchRegion = region === "Todas" || st.region === region;
        const matchCountry = country === "Todos" || st.country === country;
        const matchFav = !showFavs || favorites.has(st.name);
        return matchSearch && matchRegion && matchCountry && matchFav;
      });

      if (filtered.length === 0) {
        els.list.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted);">Sin señal.</div>`;
        return;
      }

      filtered.forEach(st => {
        const isActive = currentStation && currentStation.name === st.name;
        const isFav = favorites.has(st.name);
        const badgeClass = regionClassMap[st.region] || "badge-default";
        const animatingClass = (isActive && isPlaying) ? 'animating' : '';

        const div = document.createElement("div");
        div.className = `station-card ${isActive ? 'active' : ''} ${animatingClass}`;
        let deleteHtml = st.isCustom ? `<button class="del-btn" aria-label="Eliminar">×</button>` : '';

        div.innerHTML = `
          <div class="st-info">
            <div class="st-icon ${badgeClass}"></div>
            <div><span class="st-name">${st.name}</span><span class="st-meta">${st.country}</span></div>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            ${deleteHtml}
            <button class="fav-btn ${isFav ? 'is-fav' : ''}">★</button>
          </div>
        `;
        
        div.onclick = (e) => { if(!e.target.closest('button')) playStation(st); };
        div.querySelector('.fav-btn').onclick = (e) => {
          e.stopPropagation();
          if(favorites.has(st.name)) favorites.delete(st.name); else favorites.add(st.name);
          localStorage.setItem("ultra_favs", JSON.stringify([...favorites]));
          renderList();
        };

        if(st.isCustom) {
          div.querySelector('.del-btn').onclick = (e) => deleteCustomStation(e, st.name);
        }
        els.list.appendChild(div);
      });
    };

    const updateVolumeVisuals = (val) => {
      const percentage = val * 100;
      els.volSlider.style.background = `linear-gradient(90deg, #ffffff 0%, #ffffff ${percentage}%, rgba(255,255,255,0.0) ${percentage}%, rgba(255,255,255,0.0) 100%)`;
    };

    const loadFilters = () => {
      const regions = ["Todas", ...new Set(stations.map(s => s.region))].sort();
      const countries = ["Todos", ...new Set(stations.map(s => s.country))].sort();
      const fill = (sel, arr) => {
        sel.innerHTML = "";
        arr.forEach(val => {
          const opt = document.createElement("option");
          opt.value = val; opt.innerText = val; sel.appendChild(opt);
        });
      };
      fill(els.region, regions); fill(els.country, countries);
    };

    const startTimer = () => {
      stopTimer(); secondsElapsed = 0;
      if(els.timer) {
        els.timer.innerText = "00:00";
        timerInterval = setInterval(() => {
          secondsElapsed++;
          const m = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
          const s = (secondsElapsed % 60).toString().padStart(2, '0');
          els.timer.innerText = `${m}:${s}`;
        }, 1000);
      }
    };
    const stopTimer = () => { if (timerInterval) clearInterval(timerInterval); };

    const setupListeners = () => {
      els.btnPlay.addEventListener("click", togglePlay);
      els.btnPrev.addEventListener("click", () => skipStation(-1));
      els.btnNext.addEventListener("click", () => skipStation(1));
      els.volSlider.addEventListener("input", (e) => {
        const val = e.target.value;
        els.player.volume = val;
        updateVolumeVisuals(val);
      });
      els.themeSelect.addEventListener("change", (e) => { setTheme(e.target.value); localStorage.setItem("ultra_theme", e.target.value); });
      [els.search, els.region, els.country].forEach(el => el.addEventListener("input", renderList));
      els.favToggle.addEventListener("change", renderList);
      els.clearFilters.addEventListener("click", () => {
        els.search.value = ""; els.region.value = "Todas"; els.country.value = "Todos"; els.favToggle.checked = false;
        renderList();
      });
      if(els.addForm) els.addForm.addEventListener("submit", addCustomStation);
    };

    document.addEventListener("DOMContentLoaded", init);
  </script>
</body>
</html>
