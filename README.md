# Anna Borowski – Website-Konzept

Designkonzept für die Neugestaltung von anna-borowski.art. Reines statisches HTML/CSS/JS ohne Build-Schritt,
direkt auf GitHub Pages lauffähig.

## Seiten

| Datei                | Inhalt                                                                 |
|----------------------|------------------------------------------------------------------------|
| `index.html`         | Startseite: Hero-Bild, Auswahl, Zitat, nächste Ausstellung, Kontakt-CTA |
| `galerie.html`       | Galerie mit Filter (Alle/Verfügbar/Verkauft) und 3 Darstellungen       |
| `ausstellungen.html` | Bevorstehende Termine (mit .ics-Kalenderdownload) und Archiv           |
| `ueber-mich.html`    | About-Seite (Platzhaltertexte)                                         |
| `kontakt.html`       | Kontaktformular (Demo, sendet nichts); `kontakt.html?werk=<id>` belegt die Kaufanfrage vor |

## Wichtige Dateien

- `assets/js/data.js` – **Werkverzeichnis**: Titel, Technik, Maße, Status (`available`/`sold`). Neue Bilder hier eintragen
  und die Dateien in `assets/img/works/thumb/` (≈640 px breit) und `assets/img/works/large/` (≈2048 px) ablegen.
- `assets/js/main.js` – Interaktionen; oben im `CONFIG`-Block den Instagram-Link eintragen.
- `assets/css/style.css` – Design; Farben als Variablen am Dateianfang (`:root` = hell, `[data-theme="dark"]` = dunkel).

## Lokal ansehen

```sh
python -m http.server 8000
# dann http://localhost:8000 öffnen
```

## Auf GitHub Pages veröffentlichen

1. Neues Repository auf github.com anlegen (z. B. `anna-borowski-konzept`).
2. In diesem Ordner:
   ```sh
   git init
   git add .
   git commit -m "Website-Konzept"
   git branch -M main
   git remote add origin https://github.com/<benutzername>/anna-borowski-konzept.git
   git push -u origin main
   ```
3. Im Repository: **Settings → Pages → Source: „Deploy from a branch“, Branch `main`, Ordner `/ (root)`**.
4. Nach 1–2 Minuten ist die Seite unter `https://<benutzername>.github.io/anna-borowski-konzept/` erreichbar.

Hinweis: Bei kostenlosen GitHub-Konten muss das Repository dafür **öffentlich** sein – die Bilder sind dann
für jeden abrufbar. Vorher Annas Einverständnis einholen. Die Seiten tragen `noindex`, damit Suchmaschinen
das Konzept nicht aufnehmen.

## Offene Punkte für die echte Website

- Echte Texte (Über mich, Zitat), Porträtfoto, Ausstellungstermine, E-Mail-Adresse, Instagram-Link
- Verkauft-Status und Preise der Werke (aktuell Beispiel: „Der AusWeg“ und „Innere Ferne“ als verkauft markiert)
- Formularversand (z. B. Formspree, Netlify Forms oder eigener Server)
- Impressum und Datenschutzerklärung (in Deutschland Pflicht)
- Bilderschutz ist nur eine Hürde (Rechtsklick/Ziehen/Long-Press gesperrt) – Screenshots lassen sich technisch
  nie verhindern. Ein dezentes Wasserzeichen in den großen Bilddateien bleibt der wirksamste Schutz.
