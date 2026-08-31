# Zimní kurz

Vytváříme kurz pro SŠ studenty představující VŠ úlohy.

Kurz má podobu statického webu (na GitHub Pages), který:
- obsahuje hlavní rozcestník (list úloh s pořadím)
- stránky s úlohama

Každá úloha je jedna podstránka s vlastním odkazem (soubor), ve které je interaktivní
vizualizace, ve které studenti mohou nastavovat parametry úlohy. Změna parametrů má
překreslit vizualizaci hned, nebo na daný pokyn (tlačítko).

Smyslem úloh je ukázat studentům, že zdánlivě jednoduché problémy často nemají snadno
nalezitelné řešení. Případně řešení jde nastavit při pozorování zpětné vazby, ale je
těžké vysvětlit proč to tak je.

## Stav projektu

Aktuálně stavíme **šablonu a společnou infrastrukturu**. Konkrétní úlohy se vymýšlejí
později — nevymýšlej je sám, pokud o to nikdo nepožádá.

Tematické okruhy budoucích úloh (pro kontext, ne jako zadání):
algoritmy · strojové učení · mechanické soustavy · elektrické obvody ·
řízení a regulace · měření

## Technologie

- **Čisté HTML + CSS + JS. Žádný build krok, žádné npm, žádný framework.**
  Soubor v repozitáři = soubor na webu.
- Moderní prohlížeč se předpokládá (CSS grid, `<dialog>`, ResizeObserver).
  Netranspilujeme, nepolyfillujeme.
- Sdílený kód je obyčejný skript pod globálním objektem `Kurz`, ne ES modul —
  stránky pak fungují i po otevření přes `file://`.
- Lokální náhled: `python -m http.server 8000` v kořeni repozitáře.

### Knihovny

Knihovny používat lze, ale střídmě — většina vizualizací se dá napsat na Canvas 2D
nebo v SVG bez závislostí. Než sáhneš po knihovně, zvaž, jestli to není 50 řádků kódu.

Pravidlo pro volbu způsobu načtení:

- **Do ~500 kB → stáhnout do `assets/vendor/<nazev>-<verze>.min.js`.**
  Výchozí volba. Web pak funguje i bez internetu (školní síť bývá nespolehlivá),
  nezávisí na cizí službě a neposílá data studentů třetí straně.
- **Nad ~500 kB → CDN**, ale jen `cdn.jsdelivr.net` nebo `cdnjs.cloudflare.com`,
  vždy s **pevnou verzí** (nikdy `@latest`) a s atributem `integrity` (SRI).
- Ke každé vendorované knihovně patří řádek v `assets/vendor/PUVOD.md`:
  název, verze, licence, URL odkud byla stažena.
- Licence musí být kompatibilní s licencí projektu (viz `LICENSE`).

## Struktura repozitáře

```
index.html                  # rozcestník — seznam úloh
ulohy/
  _sablona.html             # vzor k okopírování při zakládání nové úlohy
  01-nazev-ulohy.html       # jedna úloha = jeden soubor
assets/
  css/styl.css              # společný vzhled celého kurzu
  js/spolecne.js            # sdílené utility (ovládací panel, kreslení, RNG)
  js/ulohy.js               # seznam lekcí a úloh, ze kterého se generuje rozcestník
  vendor/                   # stažené knihovny + PUVOD.md
  obrazky/
```

Pojmenování souborů úloh: `<poradi>-<slug>.html`, slug česky **bez diakritiky**,
malá písmena, pomlčky (`03-obchodni-cestujici.html`).

## Cesty a odkazy

Cílová URL na GitHub Pages zatím není známá a web může běžet v podadresáři
(`.../zimni-kurz/`). Proto:

- **Všechny odkazy a cesty k assetům jsou relativní.** Nikdy nezačínají `/`.
- Ze stránky úlohy: `../assets/css/styl.css`, zpět na rozcestník `../index.html`.
- Žádný kód nesmí předpokládat konkrétní doménu ani kořenovou cestu.

## Anatomie stránky úlohy

Každá úloha dodržuje stejnou kostru (viz `ulohy/_sablona.html`), v tomto pořadí:

1. **Nadpis** úlohy + odkaz zpět na rozcestník.
2. **Motivace** — 2–4 věty, proč je problém zajímavý / kde se v praxi vyskytuje.
3. **Zadání** — co se řeší, co znamenají parametry. Bez formalismu.
4. **Vizualizace** — plátno/graf, hlavní obsah stránky.
5. **Ovládání** — parametry (slidery, přepínače) + tlačítka (Spustit / Krok / Reset).
6. **Co si zkuste** — 2–4 konkrétní pokyny k experimentování.
7. **Proč je to těžké** — pointa úlohy. Tohle je smysl celého kurzu, nevynechávat.

Úloha je **soběstačná**: jeden HTML soubor, veškerý její JS a CSS uvnitř něj
(`<script>`, `<style>`). Do sdílených souborů se přesouvá jen to, co používají
alespoň dvě úlohy.

## Jazyk a tón

- Česky. **Vykání**, ale studenty není nutné přímo oslovovat — preferuj neosobní
  formulace („Zkuste zvýšit…" / „Při zvýšení parametru se…").
- Středoškolská úroveň: bez integrálů, bez formální matematické notace,
  bez žargonu. Pojmy se vysvětlují při prvním použití.
- Krátké odstavce. Text stránky bez vizualizace se má dát přečíst do dvou minut.
- Zmínka o navazujícím VŠ předmětu je volitelná — nechává se na autorovi úlohy.

## Konvence vizualizací

- **Canvas 2D** pro simulace, částice, animace a cokoli s mnoha prvky.
  **SVG/DOM** pro grafy a schémata s málo prvky (ostré na všech displejích,
  jde na ně navěsit interakce).
- Canvas škáluj podle `devicePixelRatio`, jinak je na noteboocích rozmazaný.
- **Náhoda je vždy seedovaná** (deterministický generátor ve `spolecne.js`).
  Stejný seed = stejný výsledek, aby šlo pozorování zopakovat a předvést.
- Animace přes `requestAnimationFrame`, zastavit při skrytí záložky.
- Vizualizace se přizpůsobí šířce rodiče (responzivně), použitelná i na tabletu.
- Ovládací prvky mají `<label>`, aktuální hodnotu vypsanou vedle sebe
  a ovládají se i klávesnicí.
- Barvy se berou z CSS proměnných v `styl.css` — jednotná paleta napříč kurzem,
  rozlišitelná i při barvosleposti (nespoléhat jen na barvu, přidat tvar/popisek).
- Žádný stav v `localStorage`, pokud si o to nikdo neřekne — stránka se má
  po načtení chovat vždy stejně.
- `Kurz.platno()` první vykreslení nevolá (proměnná, do které si stránka výsledek
  ukládá, v tu chvíli ještě neexistuje) — o první kresbu se stránka postará sama
  na konci svého skriptu.
- Výpočet, který trvá déle než pár milisekund, se z posuvníku nespouští přímo:
  odloží se na nejbližší snímek, aby se mezilehlé hodnoty zahodily
  (viz `naplanuj()` v `ulohy/01-kmeans.html`).

## Přidání nové úlohy

1. Zkopíruj `ulohy/_sablona.html` na `ulohy/<nn>-<slug>.html`.
2. Vyplň všech sedm sekcí kostry.
3. Přidej záznam do příslušné lekce v `assets/js/ulohy.js` (soubor, název, krátký
   popis, okruh) — rozcestník se z něj vykresluje. Novou lekci přidej jako další
   položku pole `LEKCE`; úlohy se v ní číslují průběžně napříč celým kurzem.
4. Ověř lokálně přes `python -m http.server`.

### Hotovo, když

- [ ] Stránka funguje po otevření přes lokální HTTP server bez chyb v konzoli.
- [ ] Všechny cesty jsou relativní, odkaz zpět na rozcestník funguje.
- [ ] Ovládací prvky mění vizualizaci a `Reset` vrátí výchozí stav.
- [ ] Úloha je v `ulohy.js` a je vidět na rozcestníku.
- [ ] Nové knihovny mají záznam v `assets/vendor/PUVOD.md`.
- [ ] Sekce „Proč je to těžké" skutečně vysvětluje pointu.

## Pro agenty

- Needituj cizí úlohy při práci na jedné konkrétní — úlohy jsou nezávislé.
- Nezaváděj build krok, bundler ani transpilaci; pokud se to zdá nutné,
  nejdřív se zeptej.
- Nepřidávej analytiku, tracking ani cokoli, co posílá data mimo stránku.
- Ke commitům přistupuj po jednotlivých úlohách (jedna úloha = jeden commit).
