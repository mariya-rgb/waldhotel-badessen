/*
 * Waldhotel Bad Essen – Datenschutzerklärung
 * DSGVO-konform, verständliche Sprache
 */
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

export default function Datenschutz() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="h-20" />

      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {lang === 'en' && (
              <div className="bg-[#F7F5F0] p-6 rounded-[3px] mb-10">
                <p className="text-sm text-[#253541]/70">
                  Legal information is provided in German as required by law.
                </p>
              </div>
            )}

            <p className="subtitle-caps mb-4">Rechtliches</p>
            <h1 className="font-heading text-[34px] md:text-[42px] text-[#253541] font-light leading-tight mb-6">
              Datenschutzerklärung
            </h1>
            <div className="gold-line mb-10" />

            <div className="prose prose-slate max-w-none space-y-8 text-[#253541]/80 text-base leading-[1.75]">

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">1. Verantwortliche Stelle</h2>
                <p>
                  Verantwortlich für die Datenverarbeitung auf dieser Website ist:
                </p>
                <p className="mt-3">
                  Waldhotel Bad Essen UG (haftungsbeschränkt)<br />
                  Geschäftsführerin: Mariya Düselder<br />
                  Bergstraße 51<br />
                  49152 Bad Essen<br />
                  Telefon: 05472 – 95 84 303<br />
                  E-Mail: kontakt@waldhotel-badessen.de
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">2. Hosting und Server-Logs</h2>
                <p>
                  Diese Website wird bei einem externen Hosting-Anbieter gehostet. Beim Besuch unserer Website werden automatisch Informationen in sogenannten Server-Log-Dateien gespeichert, die Ihr Browser automatisch übermittelt. Dazu gehören: Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.
                </p>
                <p className="mt-3">
                  Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und Optimierung seiner Website.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">3. SSL-Verschlüsselung</h2>
                <p>
                  Diese Seite nutzt aus Sicherheitsgründen eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">4. Cookies</h2>
                <p>
                  Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden und die Ihr Browser speichert.
                </p>
                <p className="mt-3">
                  <strong>Essenzielle Cookies:</strong> Diese sind für den Betrieb der Website notwendig und können nicht deaktiviert werden. Sie werden in der Regel nur als Reaktion auf von Ihnen getätigte Aktionen gesetzt (z.B. Cookie-Einstellungen speichern).
                </p>
                <p className="mt-3">
                  <strong>Funktionale Cookies:</strong> Diese ermöglichen erweiterte Funktionen wie die Einbindung von Google Maps. Sie werden nur mit Ihrer ausdrücklichen Einwilligung gesetzt.
                </p>
                <p className="mt-3">
                  <strong>Analyse-/Marketing-Cookies:</strong> Diese helfen uns, die Nutzung unserer Website zu verstehen und zu verbessern. Sie werden nur mit Ihrer ausdrücklichen Einwilligung gesetzt.
                </p>
                <p className="mt-3">
                  Sie können Ihre Cookie-Einstellungen jederzeit über den Link „Cookie-Einstellungen" im Footer unserer Website ändern.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">5. Kontaktaufnahme per E-Mail</h2>
                <p>
                  Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben einschließlich der von Ihnen angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">6. Beds24 Buchungssystem</h2>
                <p>
                  Für die Online-Buchung nutzen wir das Buchungssystem Beds24 (beds24.com). Wenn Sie eine Buchung über unser eingebettetes Buchungsformular vornehmen, werden Ihre eingegebenen Daten (Name, E-Mail, Reisedaten etc.) an Beds24 übermittelt und dort verarbeitet. Beds24 agiert als Auftragsverarbeiter gemäß Art. 28 DSGVO. Weitere Informationen finden Sie in der Datenschutzerklärung von Beds24.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">7. Google Maps</h2>
                <p>
                  Wir nutzen den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Die Karte wird erst geladen, wenn Sie aktiv zustimmen (Klick auf „Karte laden"). Erst dann wird eine Verbindung zu den Servern von Google hergestellt. Dabei kann Ihre IP-Adresse an Google übertragen werden. Wenn Sie in Ihrem Google-Konto eingeloggt sind, kann Google Ihr Surfverhalten Ihrem persönlichen Profil zuordnen. Die Nutzung erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">8. Externe Links (Booking.com, Tripadvisor, Agoda)</h2>
                <p>
                  Unsere Website enthält Links zu externen Buchungsplattformen (Booking.com, Tripadvisor, Agoda). Wenn Sie diese Links anklicken, verlassen Sie unsere Website. Für die Datenverarbeitung auf diesen externen Plattformen sind die jeweiligen Betreiber verantwortlich. Bitte informieren Sie sich in den jeweiligen Datenschutzerklärungen dieser Anbieter.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">9. Ihre Rechte als Betroffene/r</h2>
                <p>Sie haben folgende Rechte:</p>
                <ul className="mt-3 space-y-2 list-none">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8A96E] mt-1">—</span>
                    <span><strong>Auskunft</strong> (Art. 15 DSGVO): Sie können Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8A96E] mt-1">—</span>
                    <span><strong>Berichtigung</strong> (Art. 16 DSGVO): Sie können die Berichtigung unrichtiger Daten verlangen.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8A96E] mt-1">—</span>
                    <span><strong>Löschung</strong> (Art. 17 DSGVO): Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8A96E] mt-1">—</span>
                    <span><strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO): Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8A96E] mt-1">—</span>
                    <span><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO): Sie können verlangen, Ihre Daten in einem maschinenlesbaren Format zu erhalten.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8A96E] mt-1">—</span>
                    <span><strong>Widerspruch</strong> (Art. 21 DSGVO): Sie können der Verarbeitung Ihrer Daten widersprechen.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8A96E] mt-1">—</span>
                    <span><strong>Widerruf der Einwilligung</strong>: Sie können eine erteilte Einwilligung jederzeit widerrufen.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">10. Beschwerderecht bei der Aufsichtsbehörde</h2>
                <p>
                  Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt, haben Sie das Recht, sich bei einer Aufsichtsbehörde zu beschweren. Die für uns zuständige Aufsichtsbehörde ist:
                </p>
                <p className="mt-3">
                  Die Landesbeauftragte für den Datenschutz Niedersachsen<br />
                  Prinzenstraße 5<br />
                  30159 Hannover<br />
                  Telefon: 0511 120-4500<br />
                  E-Mail: poststelle@lfd.niedersachsen.de<br />
                  Website:{' '}
                  <a href="https://www.lfd.niedersachsen.de" target="_blank" rel="noopener noreferrer" className="text-[#28863E] underline underline-offset-2 hover:text-[#1f6d32]">
                    www.lfd.niedersachsen.de
                  </a>
                </p>
              </div>

              <div className="pt-4 border-t border-[#F7F5F0]">
                <p className="text-sm text-[#253541]/50">
                  Stand: Februar 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CookieBanner />
    </div>
  );
}
