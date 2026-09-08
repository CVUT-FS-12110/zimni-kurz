# Interaktivní úlohy: cesta balíku distribučním centrem

Společným objektem všech úloh je jeden balík nebo proud balíků procházející distribučním centrem. Úlohy sledují jeho pohyb po dopravníku, měření rozměrů a hmotnosti, detekci polohy, identifikaci a směrování. Každá ukázka má umožnit měnit několik fyzikálních nebo algoritmických parametrů a bezprostředně pozorovat výpočet, animaci a případný chybný stav.

## Navrhovaná stavba hodiny

Každá hodina má čtyři navazující části:

1. **Představení problému** — krátká situace z praxe a názorný obrázek, na kterém je vidět, co se hledá nebo rozhoduje.
2. **Interaktivní úloha** — animace, ve které lze měnit parametry, postupovat po krocích a zkoušet vlastní řešení.
3. **Teoretické vysvětlení** — pojmenování použitých pojmů, ukázka zápisu a vysvětlení principu algoritmu na stejném příkladu.
4. **Kde se to učí** — samostatný blok pro doplnění návazných vysokoškolských předmětů. Zatím zůstane prázdný.

## Mechanika

### M1 — Rozjezd balíku na dopravníku

Balík leží na pásu, který se začne rozjíždět. Uživatel mění hmotnost balíku, zrychlení pásu a součinitele statického a smykového tření. Animace ukáže, zda se balík pohybuje spolu s pásem, nebo po něm prokluzuje; graf porovná rychlost pásu a balíku a výpočet určí mezní zrychlení bez prokluzu.

### M2 — Balík na nakloněném dopravníku

Balík je dopravován vzhůru nebo dolů po šikmém pásu. Lze měnit sklon, rychlost pásu, tření a polohu těžiště. Ukázka rozloží tíhovou sílu do směrů rovnoběžného a kolmého s pásem a vyhodnotí, zda balík drží, klouže, nebo se převrátí.

### M3 — Náraz balíku do dorazu

Balík přijede k mechanickému dorazu nebo odpruženému nárazníku. Uživatel nastaví hmotnost, rychlost, tuhost a tlumení nárazníku. Animace zobrazí stlačení nárazníku a odskok; grafy ukážou sílu, zrychlení a deformaci v čase a umožní porovnat tvrdý a tlumený doraz.

### M4 — Dynamické vážení balíku

Balík přejíždí přes krátkou vážicí část dopravníku. Lze měnit jeho hmotnost, délku, rychlost, tuhost uložení váhy a tlumení. Ukázka animuje průjezd balíku a vykreslí časový signál síly, ze kterého se odhaduje hmotnost; je vidět, proč příliš rychlý průjezd nebo kmitání zhoršují měření.

## Elektrotechnika a senzory

### E1 — Optická závora a přítomnost balíku

Balík přeruší světelný paprsek mezi vysílačem a přijímačem. Uživatel mění velikost a rychlost balíku, šířku paprsku, citlivost přijímače a množství okolního světla. Animace ukáže paprsek a průjezd balíku, zatímco graf zobrazí napětí fotodetektoru a okamžik sepnutí digitálního výstupu.

### E2 — Difuzní optický snímač

Snímač vysílá světlo a vyhodnocuje odraz od povrchu balíku. Lze měnit vzdálenost, barvu a odrazivost obalu, úhel natočení i rozhodovací práh. Ukázka znázorní šíření a zeslabení světla a ukáže, proč může stejný snímač spolehlivě najít světlý karton, ale přehlédnout tmavý nebo lesklý obal.

### E3 — Měření hmotnosti tenzometrickým můstkem

Balík zatíží nosník opatřený tenzometry zapojenými do Wheatstoneova můstku. Uživatel mění hmotnost, citlivost tenzometru, napájecí napětí, zesílení a elektrický šum. Animace zvětšeně ukáže deformaci nosníku; vedle ní se mění odpory můstku, diferenční napětí a výsledný odhad hmotnosti.

### E4 — Měření délky balíku enkodérem

Optická závora určí začátek a konec balíku a inkrementální enkodér měří posun pásu mezi těmito událostmi. Uživatel nastavuje skutečnou délku, rychlost pásu, průměr měřicího kola, počet impulzů na otáčku a prokluz. Animace ukáže otáčení kódového kotouče a čítání impulzů; výstup porovná skutečnou a naměřenou délku i kvantizační chybu.

## Automatické řízení

### A1 — Udržování rozestupů mezi balíky

Dva navazující dopravníky upravují mezery mezi přijíždějícími balíky. Uživatel mění nepravidelnost vstupního proudu, požadovaný rozestup, rychlosti pásů a parametry regulátoru. Animace ukáže zrychlování jednotlivých balíků a graf sleduje skutečné rozestupy, regulační odchylku a zásah pohonu.

### A2 — Zastavení balíku v přesné poloze

Balík má zastavit pod kamerou nebo měřicí bránou. Polohu poskytuje enkodér a přítomnost potvrdí optický snímač. Uživatel mění rychlost, hmotnost balíku, brzdění a zpoždění měření. Ukázka porovná jednoduché vypnutí motoru s řízeným dojezdem a změří konečnou chybu polohy.

### A3 — Časování třídicí klapky

Po načtení identifikátoru pokračuje balík určitou vzdálenost k pneumatické klapce. Lze měnit rychlost pásu, vzdálenost snímače, zpoždění ventilu, dobu vysunutí a rozestupy balíků. Animace ukáže pohyb balíku i klapky a vyhodnotí správné odklonění, minutí balíku nebo zásah sousedního balíku.

### A4 — Slučování dvou proudů balíků

Dvě dopravníkové větve se spojují do jedné. Uživatel mění intervaly příchodů, délky balíků, rychlosti pásů a pravidlo přednosti. Řízení využívá senzory přítomnosti před místem spojení; simulace ukazuje fronty, propustnost, čekací dobu a situace, ve kterých vznikne kolize nebo zablokování.

## Programování a algoritmy

### P1 — Sledování balíku podle událostí ze senzorů

Podél dopravníku je několik optických závor. Uživatel pouští balíky různých délek a rychlostí a může přidat zpoždění, šum nebo vynechaný impulz. Stavový automat z hran signálů odhaduje, kde se každý balík nachází; časová osa ukáže události, změny stavů a okamžik, kdy už identitu balíků nelze jednoznačně určit.

### P2 — Čtení čárového kódu za pohybu

Přes čárový kód na balíku se pohybuje skenovací paprsek. Uživatel mění rychlost, šířku čar, rozlišení snímače, rozostření, kontrast a šum. Animace převádí světlé a tmavé pruhy na jednorozměrný signál a následně na posloupnost bitů; lze sledovat prahování, detekci hran a kontrolní součet.

### P4 — Volba trasy balíku sítí dopravníků

#### 1. Představení problému

Balík přijede na vstup distribučního centra a má se dostat na určenou výstupní linku. Mezi vstupem a cílem leží zastávky — třídicí uzly — propojené dopravníky. Některé spojení může být zavřené. Otázka zní: jak systematicky projít síť, cíl skutečně najít a pokud možno zvolit trasu s nejmenším počtem úseků?

Úvodní obrázek použije malou síť, která se později objeví i v animaci a teorii. Uzel `A` je vstup, `G` cílová expedice a čáry jsou možné přesuny balíku:

```text
        C ───── F
       /         \
A ─── B ─── D ─── G
       \     
        E ─────────┘
```

Na obrázku bude balík u `A`, cíl zvýrazněný terčem u `G` a na hranách malé šipky dopravníků. Pro první variantu budou všechny hrany průjezdné oběma směry; tím se nezavádí orientované grafy dříve, než jsou potřeba.

#### 2. Interaktivní úloha a animace

Hlavní vizualizace rozdělí plochu na dvě stejné kopie jedné sítě. Vlevo poběží **hledání do šířky (BFS)**, vpravo **hledání do hloubky (DFS)**. Obě začnou ve stejném uzlu a sousedy budou procházet ve stejném, viditelně uvedeném pořadí. To je nutné, protože výsledek DFS na pořadí sousedů výrazně závisí.

Stavy prvků během jednoho kroku:

- aktuální uzel pulzuje a nese číslo kroku,
- navštívené uzly jsou vyplněné, ale mají stále čitelné pořadové číslo,
- objevené, dosud nezpracované uzly mají přerušovaný obrys,
- hrana, přes kterou byl uzel poprvé objeven, je silnější a postupně vytváří strom hledání,
- nalezená trasa se po dosažení cíle zvýrazní souvislou čarou a balík po ní nakonec projede.

Pod každou sítí bude živý zápis datové struktury. BFS ukáže **frontu** (první dovnitř, první ven), DFS **zásobník** (poslední dovnitř, první ven). Při kroku se animuje odebrání aktuálního uzlu a přidání jeho dosud nenavštívených sousedů. Vedle budou dvě oddělené hodnoty:

- **kroky hledání** — počet uzlů vyjmutých z fronty nebo zásobníku,
- **délka nalezené trasy** — počet hran od startu k cíli.

Ovládání: výběr startu a cíle kliknutím do grafu, volba BFS / DFS / porovnání vedle sebe, tlačítka `Spustit`, `Krok`, `Zpět` a `Reset`, rychlost animace a přepínač pro uzavření jednotlivých hran. Změna grafu vždy vrátí hledání na začátek, aby stav algoritmu neodpovídal staré síti.

První úloha nechá pouze spustit oba algoritmy a předem tipnout, který dříve najde cíl. Druhá úloha vyzve k uzavření jedné nebo dvou hran tak, aby DFS našlo delší cestu než BFS. Volitelná třetí úloha dovolí změnit pořadí sousedů a sledovat, že BFS stále vrátí stejně dlouhou nejkratší cestu, zatímco DFS může skončit jinak.

V základním grafu musí být krátká cesta k cíli i delší slepá větev. Při výchozím pořadí sousedů tak BFS názorně prohledává síť ve „vlnách“, zatímco DFS se nejprve vydá hluboko jednou větví. Počítadla umožní přesně říct například: „BFS zpracoval 6 uzlů a našel trasu o 3 hranách; DFS zpracoval 5 uzlů, ale jeho první nalezená trasa má 4 hrany.“ Konkrétní čísla se odvodí z finálního grafu a pevného pořadí sousedů, nebudou vložena napevno.

#### 3. Teoretické vysvětlení

Nejdřív se stejná síť pojmenuje jako **graf**. Zastávka je **uzel** (také vrchol), dopravník mezi dvěma zastávkami je **hrana** a posloupnost navazujících hran je **cesta**. Délkou cesty se v této úloze rozumí počet hran, nikoli vzdálenost v metrech. Proto zde hledáme nejkratší cestu v neohodnoceném grafu.

Jednu síť lze zapsat několika rovnocennými způsoby. Pro obrázek výše například:

```text
Množina uzlů:
V = {A, B, C, D, E, F, G}

Množina hran:
E = {{A,B}, {B,C}, {B,D}, {B,E}, {C,F}, {D,G}, {E,G}, {F,G}}

Seznam sousedů:
A: B
B: A, C, D, E
C: B, F
D: B, G
E: B, G
F: C, G
G: D, E, F

Jedna cesta z A do G:
A → B → D → G
délka = 3 hrany
```

Složené závorky u hrany `{A,B}` říkají, že spojení nemá určený směr. U jednosměrného dopravníku by se použila šipka, například `(A → B)`. Seznam sousedů je pro program praktický: u každého uzlu rovnou říká, kam lze pokračovat. Krátce lze ukázat i matici sousednosti — tabulku nul a jedniček — ale nebude hlavním zápisem, protože u malé řídké sítě je seznam sousedů čitelnější.

**Hledání do šířky (BFS)** zpracuje nejprve start, potom všechny uzly vzdálené jednu hranu, potom dvě hrany a tak dále. Používá frontu. Jakmile poprvé objeví cíl, má v neohodnoceném grafu zaručenou cestu s nejmenším počtem hran. Nalezenou cestu získá zpětným sledováním údaje „odkud jsem sem přišel“.

```text
fronta na začátku: [A]
zpracuj A, přidej B: [B]
zpracuj B, přidej C, D, E: [C, D, E]
zpracuj C, přidej F: [D, E, F]
zpracuj D, objev G: [E, F, G]

předchůdci: B←A, C←B, D←B, E←B, F←C, G←D
cesta zpět: G←D←B←A
cesta vpřed: A→B→D→G
```

**Hledání do hloubky (DFS)** pokračuje z aktuálního uzlu co nejdál a vrací se až ve chvíli, kdy už nemá kam jít. Používá zásobník, případně stejnou myšlenku zapíše program pomocí rekurze. DFS cíl najde, pokud je dosažitelný, ale první nalezená cesta nemusí být nejkratší. Hodí se například k procházení celé sítě, hledání slepých větví nebo ověření, zda cesta vůbec existuje.

```text
zásobník na začátku: [A]
vezmi A, pokračuj do B: [A, B]
vezmi B, pokračuj do C: [A, B, C]
vezmi C, pokračuj do F: [A, B, C, F]
vezmi F, pokračuj do G: [A, B, C, F, G]

první nalezená cesta: A→B→C→F→G
délka = 4 hrany
```

Na závěr se výslovně oddělí tři různé otázky: kolik kroků algoritmus provedl, kolik uzlů navštívil a kolik hran má výsledná cesta. Menší počet kroků hledání sám o sobě neznamená kratší nalezenou trasu. Pokud hrany později dostanou různé časy průjezdu, BFS už nejrychlejší trasu nezaručí; to je přirozený most k Dijkstrovu algoritmu, nikoli součást první úlohy.

#### 4. Kde se to učí

<!-- Bude doplněno autorem kurzu. -->

### P5 — Řazení proudu balíků do výstupních linek

Na vstupu vzniká posloupnost balíků s různými cíli a termíny expedice. Uživatel mění pořadí příchodů, kapacitu meziskladů a pravidlo výběru dalšího balíku. Simulace zobrazuje fronty a pohyb každého balíku a porovnává strategie FIFO, nejbližší termín a seskupování podle cílové linky podle čekací doby, počtu přestavení a zpožděných zásilek.

## Společné zásady demonstrací

- Balík nebo proud balíků zůstává viditelným objektem, jehož stav lze v průběhu simulace sledovat.
- Měřicí úlohy zobrazují fyzikální princip senzoru, surový signál, jeho zpracování i výslednou měřenou veličinu.
- Výpočet probíhá celý v prohlížeči a reaguje průběžně na změnu parametrů.
- Každá veličina má uvedenou jednotku a realistickou výchozí hodnotu.
- Vedle správného provozu lze parametry nastavit tak, aby vznikl prokluz, chybná detekce, kolize, špatné měření nebo nestabilní řízení.
- Animace doplňuje graf, časovou osu nebo konstrukci výpočtu; neslouží pouze jako ilustrace.
- U náhodných dějů musí být možné simulaci zopakovat se stejným počátečním stavem.
