/*
 * Werkverzeichnis – zentrale Datenquelle für Galerie, Startseite und Kontaktformular.
 * Neues Bild hinzufügen: Dateien in assets/img/works/thumb und /large ablegen
 * und hier einen Eintrag ergänzen. w/h = Pixelmaße des Originalfotos (nur das Seitenverhältnis zählt).
 * status: "available" (verfügbar) | "sold" (verkauft)
 * Hinweis: Der Status "sold" bei zwei Werken ist nur ein Beispiel für die Demo.
 */
window.WORKS = [
  { id: "von-der-tiefe", title: "Von der Tiefe", technique: "Öl auf Leinwand", size: "120 × 100 cm", w: 4662, h: 3897, status: "available" },
  { id: "begegnung",     title: "Begegnung",     technique: "Öl auf Leinwand", size: "80 × 100 cm",  w: 3103, h: 3900, status: "available" },
  { id: "der-ausweg",    title: "Der AusWeg",    technique: "Öl auf Leinwand", size: "120 × 100 cm", w: 1347, h: 1130, status: "sold" },
  { id: "reflektion",    title: "Reflektion",    technique: "Öl auf Leinwand", size: "120 × 100 cm", w: 4216, h: 3498, status: "available" },
  { id: "dazwischen",    title: "Dazwischen",    technique: "Öl auf Leinwand", size: "80 × 100 cm",  w: 2558, h: 3213, status: "available" },
  { id: "ein-gedanke",   title: "Ein Gedanke",   technique: "Öl auf Leinwand", size: "120 × 100 cm", w: 4016, h: 3305, status: "available" },
  { id: "innere-ferne",  title: "Innere Ferne",  technique: "Öl auf Leinwand", size: "70 × 70 cm",   w: 1774, h: 1770, status: "sold" },
  { id: "rueckhalt",     title: "Rückhalt",      technique: "Öl auf Leinwand", size: "80 × 130 cm",  w: 2649, h: 4355, status: "available" }
];
