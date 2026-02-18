# Footer-Logo Analyse

Das Logo im Footer erscheint als weißes/graues Rechteck. Das Logo-PNG hat einen weißen Hintergrund (nicht transparent), daher wird mit brightness-0 invert das gesamte Bild invertiert – der weiße Hintergrund wird schwarz und das grüne Logo wird hell. Aber auf dem Screenshot sieht es wie ein helles Rechteck aus.

Das Problem ist wahrscheinlich, dass das Logo-Bild einen weißen Hintergrund hat. Mit brightness-0 invert wird der weiße Hintergrund zu schwarz, was auf dem dunklen Footer-Hintergrund (#253541) fast unsichtbar wäre, und das Logo selbst wird weiß.

Tatsächlich sehe ich auf dem Screenshot ein helles Rechteck – das ist der invertierte Hintergrund (weiß → schwarz passt nicht, aber das Logo-Bild scheint einen weißen Hintergrund zu haben, der mit invert schwarz wird, aber der Logo-Text wird weiß).

Lösung: Das Logo-Bild hat vermutlich einen nicht-transparenten weißen Hintergrund. Ich muss entweder:
1. mix-blend-mode verwenden
2. Das Logo mit einem transparenten Hintergrund neu erstellen
3. Einen anderen CSS-Filter verwenden
