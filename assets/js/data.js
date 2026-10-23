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
  { id: "rueckhalt",     title: "Rückhalt",      technique: "Öl auf Leinwand", size: "80 × 130 cm",  w: 2649, h: 4355, status: "available" },
  // Platzhalter aus Screenshots (neue-bilder/Bild7–17): Titel, Technik und Maße noch offen, Fotos geringer Auflösung
  { id: "ohne-titel-07", title: "Ohne Titel (7)",  technique: "Öl auf Leinwand", size: "Maße folgen", w: 826, h: 610, status: "available" },
  { id: "ohne-titel-08", title: "Ohne Titel (8)",  technique: "Öl auf Leinwand", size: "Maße folgen", w: 828, h: 687, status: "available" },
  { id: "ohne-titel-09", title: "Ohne Titel (9)",  technique: "Öl auf Leinwand", size: "Maße folgen", w: 826, h: 414, status: "available" },
  { id: "ohne-titel-10", title: "Ohne Titel (10)", technique: "Öl auf Leinwand", size: "Maße folgen", w: 609, h: 814, status: "available" },
  { id: "ohne-titel-11", title: "Ohne Titel (11)", technique: "Öl auf Leinwand", size: "Maße folgen", w: 610, h: 811, status: "available" },
  { id: "ohne-titel-12", title: "Ohne Titel (12)", technique: "Öl auf Leinwand", size: "Maße folgen", w: 616, h: 815, status: "available" },
  { id: "ohne-titel-13", title: "Ohne Titel (13)", technique: "Öl auf Leinwand", size: "Maße folgen", w: 821, h: 675, status: "available" },
  { id: "ohne-titel-14", title: "Ohne Titel (14)", technique: "Öl auf Leinwand", size: "Maße folgen", w: 605, h: 815, status: "available" },
  { id: "ohne-titel-15", title: "Ohne Titel (15)", technique: "Öl auf Leinwand", size: "Maße folgen", w: 616, h: 821, status: "available" },
  { id: "ohne-titel-16", title: "Ohne Titel (16)", technique: "Öl auf Leinwand", size: "Maße folgen", w: 815, h: 751, status: "available" },
  { id: "ohne-titel-17", title: "Ohne Titel (17)", technique: "Öl auf Leinwand", size: "Maße folgen", w: 656, h: 820, status: "available" }
];
