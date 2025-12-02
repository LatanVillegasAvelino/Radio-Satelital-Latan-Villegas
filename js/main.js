// ====== LISTA DE EMISORAS ======
const stations = [
  // ====== PERÚ – LIMA / NACIONAL ======
  {
    name: "Radio Moda",
    country: "Perú",
    region: "Sudamérica",
    url: "https://25023.live.streamtheworld.com/CRP_MOD_SC"
  },
  {
    name: "Ritmo Romántica",
    country: "Perú",
    region: "Sudamérica",
    url: "https://25103.live.streamtheworld.com/CRP_RIT_SC"
  },
  {
    name: "Onda Cero",
    country: "Perú",
    region: "Sudamérica",
    url: "https://mdstrm.com/audio/6598b65ab398c90871aff8cc/icecast.audio"
  },
  {
    name: "La Zona",
    country: "Perú",
    region: "Sudamérica",
    url: "https://mdstrm.com/audio/5fada54116646e098d97e6a5/icecast.audio"
  },
  {
    name: "Corazón",
    country: "Perú",
    region: "Sudamérica",
    url: "https://mdstrm.com/audio/5fada514fc16c006bd63370f/icecast.audio"
  },
  {
    name: "La Inolvidable",
    country: "Perú",
    region: "Sudamérica",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/CRP_LI_SC"
  },
  {
    name: "Mágica",
    country: "Perú",
    region: "Sudamérica",
    url: "https://26513.live.streamtheworld.com/MAG_AAC_SC"
  },
  {
    name: "Radiomar",
    country: "Perú",
    region: "Sudamérica",
    url: "https://24873.live.streamtheworld.com/CRP_MARAAC_SC"
  },
  {
    name: "RPP",
    country: "Perú",
    region: "Sudamérica",
    url: "https://mdstrm.com/audio/5fab3416b5f9ef165cfab6e9/icecast.audio"
  },
  {
    name: "Romántica (otra señal)",
    country: "Perú",
    region: "Sudamérica",
    url: "https://27153.live.streamtheworld.com/CRP_RIT_SC"
  },
  {
    name: "Exitosa Noticias",
    country: "Perú",
    region: "Sudamérica",
    url: "https://neptuno-2-audio.mediaserver.digital/79525baf-b0f5-4013-a8bd-3c5c293c6561"
  },

  // ====== PERÚ – REGIONES / CAJAMARCA / PUNO, ETC. ======
  {
    name: "Radio Santa Lucía",
    country: "Perú",
    region: "Sudamérica",
    url: "https://sp.dattavolt.com/8014/stream"
  },
  {
    name: "Radio Pampa Yurac",
    country: "Perú",
    region: "Sudamérica",
    url: "https://rr5200.globalhost1.com/8242/stream"
  },
  {
    name: "Radio Turbo Mix",
    country: "Perú",
    region: "Sudamérica",
    url: "https://serverssl.innovatestream.pe:8080/167.114.118.120:7624/stream"
  },
  {
    name: "Radio Fuego",
    country: "Perú",
    region: "Sudamérica",
    url: "https://serverssl.innovatestream.pe:8080/sp.onliveperu.com:8128/"
  },
  {
    name: "Radio Stereo TV",
    country: "Perú",
    region: "Sudamérica",
    url: "https://sp.onliveperu.com:7048/stream"
  },
  {
    name: "Radio La Kuadra",
    country: "Perú",
    region: "Sudamérica",
    url: "https://dattavolt.com/8046/stream"
  },
  {
    name: "Radio Frecuencia",
    country: "Perú",
    region: "Sudamérica",
    url: "https://conectperu.com/8384/stream"
  },
  {
    name: "Onda Popular (Cajamarca)",
    country: "Perú",
    region: "Sudamérica",
    url: "https://envivo.top:8443/am"
  },
  {
    name: "Onda Popular (Juliaca, Puno)",
    country: "Perú",
    region: "Sudamérica",
    url: "https://dattavolt.com/8278/stream"
  },
  {
    name: "Radio Nor Andina",
    country: "Perú",
    region: "Sudamérica",
    url: "https://mediastreamm.com/8012/stream/1/"
  },
  {
    name: "Radio Andina",
    country: "Perú",
    region: "Sudamérica",
    url: "https://serverssl.innovatestream.pe:8080/http://167.114.118.120:7058/;stream"
  },
  {
    name: "Radio Ilucán",
    country: "Perú",
    region: "Sudamérica",
    url: "https://serverssl.innovatestream.pe:8080/167.114.118.120:7820/;stream"
  },
  {
    name: "Radio Bambamarca",
    country: "Perú",
    region: "Sudamérica",
    url: "https://envivo.top:8443/lider"
  },
  {
    name: "Radio Continente",
    country: "Perú",
    region: "Sudamérica",
    url: "https://sonic6.my-servers.org/10170/"
  },
  {
    name: "La Cheverísima (Jaén, Cajamarca)",
    country: "Perú",
    region: "Sudamérica",
    url: "https://sp.onliveperu.com/8114/stream"
  },
  {
    name: "Radio TV El Shaddai (Cajamarca)",
    country: "Perú",
    region: "Sudamérica",
    url: "https://stream.zeno.fm/ppr5q4q3x1zuv"
  },
  {
    name: "Radio Inica Digital (Cajamarca)",
    country: "Perú",
    region: "Sudamérica",
    url: "https://stream.zeno.fm/487vgx80yuhvv"
  },
  {
    name: "Radio La Falsa (Cajamarca)",
    country: "Perú",
    region: "Sudamérica",
    url: "https://stream.zeno.fm/b9x47pyk21zuv"
  },
  {
    name: "Radio Activa (Jaén, Cajamarca)",
    country: "Perú",
    region: "Sudamérica",
    url: "https://sp.onliveperu.com/8108/stream"
  },
  {
    name: "Radio Mía",
    country: "Perú",
    region: "Sudamérica",
    url: "https://streaming.zonalatinaeirl.com:8020/radio"
  },
  {
    name: "Radio Patrón",
    country: "Perú",
    region: "Sudamérica",
    url: "https://streaming.zonalatinaeirl.com:8010/radio"
  },
  {
    name: "Radio El Patrón (otra señal)",
    country: "Perú",
    region: "Sudamérica",
    url: "https://serverssl.innovatestream.pe:8080/http://sp.onliveperu.com:8046/;stream"
  },

  // ====== PERÚ – OTROS / TEMÁTICAS ======
  {
    name: "Radio Televisión Sureña",
    country: "Perú",
    region: "Sudamérica",
    url: "https://stream.zeno.fm/p7d5fpx4xnhvv"
  },
  {
    name: "Radio Enamorados",
    country: "Perú",
    region: "Sudamérica",
    url: "https://stream.zeno.fm/gnybbqc1fnruv"
  },
  {
    name: "Radio PBO",
    country: "Perú",
    region: "Sudamérica",
    url: "https://stream.radiojar.com/2fse67zuv8hvv"
  },

  // ====== FRANCIA / ESPAÑA – EUROPA ======
  {
    name: "RFI Internacional en Español (64k)",
    country: "Francia",
    region: "Europa",
    url: "https://rfienespagnol64k.ice.infomaniak.ch/rfienespagnol-64.mp3"
  },
  {
    name: "RFI Español (96k)",
    country: "Francia",
    region: "Europa",
    url: "https://rfiespagnol96k.ice.infomaniak.ch/rfiespagnol-96k.mp3"
  },
  {
    name: "RNE 5 España",
    country: "España",
    region: "Europa",
    url: "https://dispatcher.rndfnk.com/crtve/rne5/main/mp3/high?aggregator=tunein"
  },
  {
    name: "Radio Tele Taxi (Barcelona)",
    country: "España",
    region: "Europa",
    url: "https://radiott-web.streaming-pro.com:6103/radiott.mp3"
  },
  {
    name: "Radio ES (Libertad Digital)",
    country: "España",
    region: "Europa",
    url: "https://libertaddigital-radio-live1.flumotion.com/libertaddigital/ld-live1-low.mp3"
  },
  {
    name: "Cadena COPE",
    country: "España",
    region: "Europa",
    url: "https://net1-cope-rrcast.flumotion.com/cope/net1-low.mp3"
  },

  // ====== INTERNACIONAL / OTROS PAÍSES ======
  {
    name: "Radio Internacional La Florida",
    country: "Internacional",
    region: "Norteamérica",
    url: "http://s8.myradiostream.com:56524/"
  },
  {
    name: "Radio Internacional La Hondureña",
    country: "Honduras",
    region: "Centroamérica",
    url: "https://s2.mkservers.space/rih"
  },
  {
    name: "Radio Vallenato Internacional",
    country: "Internacional",
    region: "Sudamérica",
    url: "http://server7.servistreaming.com:10010/stream"
  }
];

// ====== REFERENCIAS DEL DOM ======
const regionSelect = document.getElementById("regionSelect");
const countrySelect = document.getElementById("countrySelect");
const stationList = document.getElementById("stationList");
const player = document.getElementById("radioPlayer");
const currentStation = document.getElementById("currentStation");

// ====== INICIO ======
function init() {
  cargarRegiones();
  actualizarPaises();
  renderStations();

  regionSelect.addEventListener("change", () => {
    actualizarPaises();
    renderStations();
  });

  countrySelect.addEventListener("change", () => {
    renderStations();
  });
}

// ====== CARGAR REGIONES ======
function cargarRegiones() {
  const regiones = ["Todas"];
  stations.forEach((st) => {
    if (!regiones.includes(st.region)) {
      regiones.push(st.region);
    }
  });

  regionSelect.innerHTML = "";
  regiones.forEach((region) => {
    const opt = document.createElement("option");
    opt.value = region;
    opt.textContent = region;
    regionSelect.appendChild(opt);
  });
}

// ====== ACTUALIZAR PAÍSES SEGÚN REGIÓN ======
function actualizarPaises() {
  const regionSeleccionada = regionSelect.value;
  const paises = ["Todos"];

  stations.forEach((st) => {
    if (regionSeleccionada === "Todas" || st.region === regionSeleccionada) {
      if (!paises.includes(st.country)) {
        paises.push(st.country);
      }
    }
  });

  countrySelect.innerHTML = "";
  paises.forEach((pais) => {
    const opt = document.createElement("option");
    opt.value = pais;
    opt.textContent = pais;
    countrySelect.appendChild(opt);
  });
}

// ====== RENDERIZAR EMISORAS ======
function renderStations() {
  const regionSeleccionada = regionSelect.value;
  const paisSeleccionado = countrySelect.value;

  stationList.innerHTML = "";

  const filtradas = stations.filter((st) => {
    const coincideRegion =
      regionSeleccionada === "Todas" || st.region === regionSeleccionada;
    const coincidePais =
      paisSeleccionado === "Todos" || st.country === paisSeleccionado;
    return coincideRegion && coincidePais;
  });

  if (filtradas.length === 0) {
    stationList.textContent = "No hay emisoras para este filtro.";
    return;
  }

  filtradas.forEach((st) => {
    const btn = document.createElement("button");
    btn.className = "station-btn";

    const title = document.createElement("div");
    title.textContent = st.name;

    const meta = document.createElement("div");
    meta.className = "station-meta";
    meta.textContent = `${st.country} · ${st.region}`;

    btn.appendChild(title);
    btn.appendChild(meta);

    btn.addEventListener("click", () => playRadio(st));

    stationList.appendChild(btn);
  });
}

// ====== REPRODUCIR EMISORA ======
function playRadio(station) {
  player.src = station.url;
  player.play();
  currentStation.textContent = `Reproduciendo: ${station.name} (${station.country} · ${station.region})`;
}

// ====== INICIAR CUANDO CARGUE EL DOM ======
document.addEventListener("DOMContentLoaded", init);
