# Waldhotel Bad Essen – Datenbank-Upgrade

## Phase 1: Full-Stack Upgrade
- [x] webdev_add_feature mit "web-db-user" ausführen
- [x] README und Upgrade-Anleitung lesen

## Phase 2: Datenbankschema
- [x] Tabellen entwerfen: rooms, extras, wellness_offerings, wellness_hours, wellness_prices, location_sections, hotel_info, pages_meta
- [x] SQL-Migrationen erstellen und ausführen

## Phase 3: Daten einfügen
- [x] Alle Zimmer-Daten (DE + EN) einfügen
- [x] Extras/Zusatzleistungen einfügen
- [x] Wellness-Daten einfügen
- [x] Lage-Daten einfügen
- [x] Hotel-Stammdaten einfügen

## Phase 4: Backend-API
- [x] API-Routen für alle Datentypen erstellen
- [x] Sprachfilter (DE/EN) implementieren

## Phase 5: Frontend-Anbindung
- [x] Seiten auf API-Daten umstellen
- [x] Loading-States und Fehlerbehandlung

## Phase 6: Testen & Checkpoint
- [x] Alle Seiten testen
- [x] Checkpoint speichern

## Echte Bilder einbinden
- [x] 5 Zimmerbilder auf CDN hochladen
- [x] KI-generierte Zimmerbilder in images.ts durch echte ersetzen
- [x] Datenbank-Einträge (rooms.imageUrl) aktualisieren
- [x] Website testen und Checkpoint erstellen

## Echte Außenbilder einbinden
- [x] 5 Außenbilder auf CDN hochladen
- [x] Hero-Bild der Startseite durch echtes Außenfoto ersetzen
- [x] Hotel-Sektion Bild aktualisieren
- [x] Lage-Seite Natur-Bild aktualisieren
- [x] Website testen und Checkpoint erstellen

## Bugfixes
- [x] Scroll-to-top beim Seitenwechsel implementieren (Seite lädt von unten nach oben)
- [x] Telefonnummer überall auf +4917632419623 ändern (Header, Footer, Buchungsseite, i18n, Impressum, Datenschutz, JsonLd, Seed-Script, Datenbank)

## Kontaktformular & Footer-Logo-Fix
- [x] Footer-Logo sichtbar machen (eigene weiße Logo-Version mit transparentem Hintergrund erstellt)
- [x] Backend: tRPC-Prozedur für Kontaktformular mit Benachrichtigung erstellen
- [x] Datenbank: contact_messages Tabelle erstellen
- [x] Frontend: Kontaktformular-Komponente erstellen
- [x] Kontaktformular auf Buchungsseite einbinden
- [x] i18n-Übersetzungen für Kontaktformular (DE + EN)
- [x] Vitest-Tests schreiben (alle 20 Tests bestanden)
- [x] Testen und Checkpoint erstellen

## USt-IdNr. aktualisieren
- [x] USt-IdNr. DE457980375 im Impressum eingetragen
## Wellness-Seite überarbeiten
- [x] 3 echte Wellness-Fotos auf CDN hochladen (Sauna, Lounge, Tauchbecken)
- [x] Dampfbad aus Wellness-Angeboten entfernen (DB + i18n + Frontend)
- [x] Öffnungszeiten korrigieren: Fr 16-21 Uhr, So 13-20 Uhr, Damensauna/Gruppen auf Anfrage
- [x] Falsche Sauna-Kontaktdaten durch Hotel-Kontaktdaten ersetzen
- [x] KI-generierte Wellness-Bilder durch echte ersetzen
- [x] Testen und Checkpoint erstellen (alle 20 Tests bestanden)

## Erlebnisse-Seite erstellen
- [x] Datenbank-Tabelle für Arrangements/Erlebnisse entwerfen und migrieren
- [x] Seed-Daten für "Wald-Auszeit Bad Essen" einfügen (DE + EN)
- [x] tRPC-API-Routen für Erlebnisse erstellen (Liste + Detail)
- [x] Content texten: Überschrift, Unterüberschrift, Beschreibung, Leistungen, CTA, SEO-Text
- [x] Frontend: Erlebnisse-Übersichtsseite erstellen
- [x] Frontend: Arrangement-Detailseite erstellen
- [x] Navigation um "Erlebnisse" erweitern (Header + Footer)
- [x] i18n-Übersetzungen (DE + EN) für statische Texte
- [x] Routing in App.tsx einrichten (/erlebnisse, /en/experiences)
- [x] Vitest-Tests schreiben und ausführen (28/28 bestanden)
- [x] Testen und Checkpoint erstellen

## Erlebnisse-Seiten optimieren + Picknick im Wald
- [x] Alle Rechtschreibfehler auf Erlebnisse-Seiten korrigieren
- [x] Social-Media Meta-Tags (Open Graph, Twitter Cards, Pinterest) für jede Erlebnis-Landingpage
- [x] Erlebnis-Detailseite als vollwertige Landingpage umbauen (starke Überschriften, 3-4 Hochkant-Fotos)
- [x] Hochkant-Fotos für Picknick-Erlebnis generieren und hochladen (4 Stück)
- [x] Neues Erlebnis "Picknick im Wald" in DB einfügen (DE + EN, 54€ für 2 Personen)
- [x] Wald-Auszeit Landingpage ebenfalls mit Hochkant-Fotos und starken Überschriften aufwerten
- [x] Tests aktualisieren und alle Tests bestehen lassen (32/32 bestanden)
- [x] Checkpoint speichern
