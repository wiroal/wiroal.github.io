/* Utilidades compartidas: carga de PeerJS con respaldo, almacenamiento seguro, escape HTML */
function cargarScript(urls){
  return new Promise((ok, mal) => {
    const probar = i => {
      if (i >= urls.length) return mal(new Error('No se pudo cargar ' + urls[0]));
      const s = document.createElement('script');
      s.src = urls[i]; s.async = true;
      s.onload = () => ok();
      s.onerror = () => { s.remove(); probar(i + 1); };
      document.head.appendChild(s);
    };
    probar(0);
  });
}
const URLS_PEERJS = [
  'https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js',
  'https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js'
];
const URLS_QR = [
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
  'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js'
];
const guardado = {
  leer(k){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch(e){ return null; } },
  escribir(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} },
  borrar(k){ try { localStorage.removeItem(k); } catch(e){} }
};
function esc(s){ return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function codigoSala(){
  const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = ''; for (let i = 0; i < 4; i++) s += abc[Math.floor(Math.random() * abc.length)];
  return s;
}
function nuevoToken(){ return Math.random().toString(36).slice(2) + Date.now().toString(36); }
const LETRAS = ['A','B','C','D'];
