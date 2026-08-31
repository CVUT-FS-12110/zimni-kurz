/* Zimní kurz — sdílené utility pro stránky úloh.
   Obyčejný skript (ne ES modul), aby stránky fungovaly i po otevření přes file://.
   Vše je pod globálním objektem `Kurz`. */

window.Kurz = (function () {
  'use strict';

  /* ---------- deterministická náhoda ----------
     Stejný seed = stejná data. Bez toho by nešlo pozorování zopakovat. */

  function generator(seed) {
    let s = (seed >>> 0) || 1;
    function r() {
      s |= 0; s = (s + 0x6D2B79F5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    return {
      r,
      rozsah: (a, b) => a + r() * (b - a),
      cele: (a, b) => a + Math.floor(r() * (b - a + 1)),
      /* Box–Muller, standardní normální rozdělení */
      gauss() {
        let u = 0, v = 0;
        while (u === 0) u = r();
        while (v === 0) v = r();
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
      }
    };
  }

  /* ---------- plátno ----------
     Škálování podle devicePixelRatio, jinak je kresba na noteboocích rozmazaná.
     `prekresli` se volá při každé změně velikosti. */

  function platno(el, prekresli) {
    const ctx = el.getContext('2d');
    const stav = { ctx, sirka: 0, vyska: 0, dpr: 1 };
    let prvniUprava = true;

    function uprav() {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      stav.dpr = dpr;
      stav.sirka = Math.round(r.width);
      stav.vyska = Math.round(r.height);
      el.width = Math.round(r.width * dpr);
      el.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Při prvním nastavení velikosti se `prekresli` nevolá: běží uvnitř volání
      // Kurz.platno(), takže proměnná, do které si stránka výsledek ukládá,
      // ještě neexistuje. První vykreslení si stránka zařídí sama.
      if (prvniUprava) { prvniUprava = false; return; }
      if (prekresli) prekresli();
    }

    new ResizeObserver(uprav).observe(el);
    uprav();
    return stav;
  }

  /* ---------- animační smyčka ----------
     Sama se zastaví, když je záložka skrytá. */

  function smycka(krok) {
    let id = null, posledni = 0;
    function tik(t) {
      id = requestAnimationFrame(tik);
      const dt = posledni ? (t - posledni) / 1000 : 0;
      posledni = t;
      krok(Math.min(dt, 0.05));
    }
    const api = {
      bezi: false,
      start() { if (!api.bezi) { api.bezi = true; posledni = 0; id = requestAnimationFrame(tik); } },
      stop() { if (api.bezi) { api.bezi = false; cancelAnimationFrame(id); } }
    };
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && api.bezi) { cancelAnimationFrame(id); posledni = 0; }
      else if (!document.hidden && api.bezi) { id = requestAnimationFrame(tik); }
    });
    return api;
  }

  /* ---------- ovládací prvky ---------- */

  /* Sváže posuvník s výpisem hodnoty a zavolá `zmena` při každém posunu. */
  function posuvnik(id, zmena, format) {
    const vstup = document.getElementById(id);
    const vypis = document.getElementById(id + '-hodnota');
    function obnov() {
      if (vypis) vypis.textContent = format ? format(Number(vstup.value)) : vstup.value;
    }
    vstup.addEventListener('input', () => { obnov(); if (zmena) zmena(Number(vstup.value)); });
    obnov();
    return vstup;
  }

  function prvek(id, udalost, zmena) {
    const el = document.getElementById(id);
    if (zmena) el.addEventListener(udalost, () => zmena(el));
    return el;
  }

  /* Přepínání záložek v panelu. */
  function zalozky(korenId) {
    const koren = document.getElementById(korenId);
    const tlacitka = [...koren.querySelectorAll('.zalozky button')];
    function vyber(cil) {
      tlacitka.forEach(t => {
        const aktivni = t.dataset.zalozka === cil;
        t.setAttribute('aria-selected', String(aktivni));
        document.getElementById(t.dataset.zalozka).hidden = !aktivni;
      });
    }
    tlacitka.forEach(t => t.addEventListener('click', () => vyber(t.dataset.zalozka)));
    vyber(tlacitka[0].dataset.zalozka);
  }

  /* ---------- barvy ---------- */

  const barvy = [
    '#1145cf', '#cc1233', '#0a7d38', '#d97000', '#7622d6',
    '#007c86', '#ad0072', '#6a6a00', '#8a4413', '#2a3a4d'
  ];

  function rozlozBarvu(hex) {
    return [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16)
    ];
  }

  /* Zesvětlení směrem k bílé; `mira` 0 = původní barva, 1 = bílá. */
  function svetlejsi(hex, mira) {
    const [r, g, b] = rozlozBarvu(hex);
    const m = v => Math.round(v + (255 - v) * mira);
    return `rgb(${m(r)}, ${m(g)}, ${m(b)})`;
  }

  return { generator, platno, smycka, posuvnik, prvek, zalozky, barvy, rozlozBarvu, svetlejsi };
})();
