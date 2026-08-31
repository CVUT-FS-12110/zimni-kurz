/* Seznam lekcí a úloh. Rozcestník (index.html) se vykresluje z tohoto pole.
   Novou úlohu přidejte sem — jinak se na rozcestníku neobjeví. */

window.LEKCE = [
  {
    nazev: 'Lekce 1 — Třídění neznámých dat',
    popis: 'Máme naměřená data, ale nikdo nám neřekl, do jakých skupin patří. ' +
           'Jak je rozdělit — a jak poznáme, že jsme se netrefili?',
    ulohy: [
      {
        soubor: 'ulohy/01-kmeans.html',
        nazev: 'k-means: hledání shluků',
        popis: 'Rozdělte body do skupin. Algoritmus vždy nějaké rozdělení najde — otázka je, jestli to správné.',
        okruh: 'strojové učení'
      },
      {
        soubor: 'ulohy/02-posterizace.html',
        nazev: 'Posterizace: kolik barev stačí',
        popis: 'Stejný algoritmus na fotce. Osm barev místo statisíců — a obrázek osmkrát menší.',
        okruh: 'strojové učení'
      }
    ]
  }
];
