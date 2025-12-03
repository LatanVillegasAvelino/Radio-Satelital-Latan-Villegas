// js/stations.js
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
  { name: "RFI Internacional", country: "Francia", region: "Europa", url: "https://rfienespagnol64k.ice.infomaniak.ch/rfienespagnol-64.mp3" },
  { name: "RFI Español (96k)", country: "Francia", region: "Europa", url: "https://rfiespagnol96k.ice.infomaniak.ch/rfiespagnol-96k.mp3" },
  { name: "DW Español", country: "Alemania", region: "Europa", url: "https://dwstream6-lh.akamaihd.net/i/dwstream6_live@123544/master.m3u8" },
  { name: "RNE 5 (España)", country: "España", region: "Europa", url: "https://dispatcher.rndfnk.com/crtve/rne5/main/mp3/high?aggregator=tunein" },
  { name: "Radio Tele Taxi", country: "España", region: "Europa", url: "https://radiott-web.streaming-pro.com:6103/radiott.mp3" },
  { name: "Radio ES", country: "España", region: "Europa", url: "https://libertaddigital-radio-live1.flumotion.com/libertaddigital/ld-live1-low.mp3" },
  { name: "Cadena COPE", country: "España", region: "Europa", url: "https://net1-cope-rrcast.flumotion.com/cope/net1-low.mp3" },
  { name: "Radio La Hondureña", country: "Honduras", region: "Centroamérica", url: "https://s2.mkservers.space/rih" }
];
