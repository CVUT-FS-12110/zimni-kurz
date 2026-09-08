# Zimní kurz

Vytváříme kurz pro SŠ studenty představující VŠ úlohy.

Kurz má podobu statického webu (na GitHub Pages), který:
- obsahuje hlavní rozcestník se seznamem lekcí
- obsahuje pro každou lekci právě jednu samostatnou stránku

Každá lekce je jedna podstránka s vlastním odkazem (soubor). Může obsahovat několik
navazujících interaktivních úloh, ale na rozcestníku se zobrazuje jako jediná karta.
Změna parametrů má překreslit vizualizaci hned, nebo na daný pokyn (tlačítko).

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
index.html                  # rozcestník — seznam lekcí
ulohy/
  _sablona.html             # vzor k okopírování při zakládání nové lekce
  01-nazev-lekce.html       # jedna lekce = jeden soubor
assets/
  css/styl.css              # společný vzhled celého kurzu
  js/spolecne.js            # sdílené utility (ovládací panel, kreslení, RNG)
  js/ulohy.js               # seznam lekcí, ze kterého se generuje rozcestník
  vendor/                   # stažené knihovny + PUVOD.md
  obrazky/
```

Pojmenování souborů lekcí: `<poradi>-<slug>.html`, slug česky **bez diakritiky**,
malá písmena, pomlčky (`03-obchodni-cestujici.html`).

## Cesty a odkazy

Cílová URL na GitHub Pages zatím není známá a web může běžet v podadresáři
(`.../zimni-kurz/`). Proto:

- **Všechny odkazy a cesty k assetům jsou relativní.** Nikdy nezačínají `/`.
- Ze stránky lekce: `../assets/css/styl.css`, zpět na rozcestník `../index.html`.
- Žádný kód nesmí předpokládat konkrétní doménu ani kořenovou cestu.

## Anatomie stránky lekce

Za nadpisem lekce a odkazem zpět na rozcestník následují vždy čtyři části v tomto
pořadí:

### 1. Představení problému

- Začni konkrétní situací z praxe a 2–4 větami motivace.
- Vysvětli, co se řeší, běžným jazykem a zatím bez formalismu.
- Přidej názorný obrázek nebo jednoduché schéma se všemi objekty, o kterých text
  mluví. Obrázek nemá být jen dekorace; musí z něj být zřejmý problém, vstup a cíl.
- Pokud to pomůže porozumění, použij stejný příklad i v interaktivní a teoretické
  části. Student pak nemusí pokaždé poznávat nové prostředí.

### 2. Interaktivní úloha

- Hlavním obsahem je animace nebo jiná interaktivní vizualizace s ovládáním.
- Student musí mít možnost měnit smysluplné parametry a pozorovat bezprostřední
  zpětnou vazbu. Použij podle povahy úlohy tlačítka `Spustit`, `Krok`, `Zpět`
  a `Reset`; ne všechna jsou povinná, ale `Reset` musí vždy vrátit výchozí stav.
- U postupných algoritmů ukaž nejen výsledek, ale také vnitřní stav důležitý pro
  pochopení postupu (například frontu, zásobník, aktuální krok nebo mezivýsledky).
- Výsledky a počítadla přesně pojmenuj. Nezaměňuj například počet kroků výpočtu,
  počet navštívených prvků a délku výsledného řešení.
- Jedna stránka může obsahovat více navazujících interaktivních úloh, pokud druhá
  rozšiřuje první o podstatnou myšlenku. Každá musí mít jasně uvedeno, co ukazuje.
- Za každou ukázkou nebo společně za jejich blokem přidej 2–4 konkrétní pokyny
  **Co si zkuste**. Mají vést k pozorování jevu, ne jen k náhodnému posouvání prvků.

### 3. Teoretické vysvětlení

- Pojmenuj pojmy, které student právě viděl, a vysvětli princip použitého postupu.
- Ukaž, jak se problém zapisuje. Zápis může obsahovat například vstupní data,
  struktury, značky, jednotky, mezikroky nebo krátký pseudokód. Každý symbol vysvětli.
- Navaž zápis na konkrétní příklad z předchozích částí a ukaž alespoň jeden celý
  postup od vstupu k výsledku.
- Porovnávané metody vysvětli odděleně a nakonec shrň, co která zaručuje, na čem
  závisí a kdy selhává. Rozlišuj vlastnost algoritmu od náhody konkrétního pokusu.
- Součástí této části je blok **Proč je to těžké**. Ten vysvětluje hlavní pointu,
  omezení jednoduchého řešení a případně naznačí navazující složitější metodu.
  Nejde jen o zopakování výsledku animace.

### 4. Kde se to učí

- Vytvoř samostatný blok s přesně tímto nadpisem.
- Obsah nech prázdný, dokud jej nedoplní autor kurzu. Nevymýšlej názvy předmětů
  ani škol bez výslovného požadavku.

Lekce je **soběstačná**: jeden HTML soubor, veškerý její JS a CSS uvnitř něj
(`<script>`, `<style>`). Do sdílených souborů se přesouvá jen to, co používají
alespoň dvě úlohy.

## Jazyk a tón

- Česky. **Vykání**, ale studenty není nutné přímo oslovovat — preferuj neosobní
  formulace („Zkuste zvýšit…" / „Při zvýšení parametru se…").
- Středoškolská úroveň: bez integrálů, bez formální matematické notace,
  bez žargonu. Pojmy se vysvětlují při prvním použití.
- Krátké odstavce. Představení problému se má dát přečíst do dvou minut;
  teoretická část může být delší, ale má zůstat členěná a konkrétní.
- Názvy navazujících VŠ předmětů patří pouze do bloku „Kde se to učí“ a nechávají
  se na autorovi úlohy.

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

## Přidání nové lekce

1. Zkopíruj `ulohy/_sablona.html` na `ulohy/<nn>-<slug>.html`.
2. Vyplň čtyři části kostry: představení problému, interaktivní úlohu, teoretické
   vysvětlení a prázdný blok „Kde se to učí“.
3. Přidej jednu položku do pole `LEKCE` v `assets/js/ulohy.js`. Položka obsahuje
   `nazev`, `popis`, `soubor`, `tema` a `okruh`. Nevkládej do ní vnořené pole úloh:
   jedna položka registru vždy odkazuje na jednu stránku lekce.
4. Ověř lokálně přes `python -m http.server`.

### Hotovo, když

- [ ] Stránka funguje po otevření přes lokální HTTP server bez chyb v konzoli.
- [ ] Všechny cesty jsou relativní, odkaz zpět na rozcestník funguje.
- [ ] Ovládací prvky mění vizualizaci a `Reset` vrátí výchozí stav.
- [ ] Stránka obsahuje všechny čtyři části ve správném pořadí.
- [ ] Úvodní obrázek skutečně vysvětluje problém a souvisí s dalšími částmi.
- [ ] U postupného výpočtu jsou vidět důležité mezikroky a jednoznačná počítadla.
- [ ] Teoretická část vysvětluje pojmy, zápis i celý postup na konkrétním příkladu.
- [ ] Lekce je v `ulohy.js` a je vidět na rozcestníku jako jedna karta.
- [ ] Nové knihovny mají záznam v `assets/vendor/PUVOD.md`.
- [ ] Sekce „Proč je to těžké" skutečně vysvětluje pointu.
- [ ] Blok „Kde se to učí“ existuje a bez pokynu autora zůstává prázdný.

## Pro agenty

- Needituj cizí lekce při práci na jedné konkrétní — lekce jsou nezávislé.
- Nezaváděj build krok, bundler ani transpilaci; pokud se to zdá nutné,
  nejdřív se zeptej.
- Nepřidávej analytiku, tracking ani cokoli, co posílá data mimo stránku.
- Ke commitům přistupuj po jednotlivých lekcích (jedna lekce = jeden commit).
