/*
 * Waldhotel Bad Essen – Impressum
 * Rechtssicher nach § 5 TMG / § 5 DDG
 */
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

export default function Impressum() {
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
              Impressum
            </h1>
            <div className="gold-line mb-10" />

            <div className="prose prose-slate max-w-none space-y-8 text-[#253541]/80 text-base leading-[1.75]">
              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">Angaben gemäß § 5 TMG / § 5 DDG</h2>
                <p>
                  Waldhotel Bad Essen UG (haftungsbeschränkt)<br />
                  Bergstraße 51<br />
                  49152 Bad Essen
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">Vertreten durch</h2>
                <p>Geschäftsführerin: Mariya Düselder</p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">Kontakt</h2>
                <p>
                  Telefon: +49 176 3241 9623<br />
                  E-Mail: kontakt@waldhotel-badessen.de
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">Registereintrag</h2>
                <p>
                  Registergericht: Amtsgericht Osnabrück<br />
                  Handelsregisternummer: HRB 222377
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">Umsatzsteuer-ID</h2>
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                  [USt-IdNr. einfügen]
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
                <p>
                  Mariya Düselder<br />
                  Bergstraße 51<br />
                  49152 Bad Essen
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">EU-Streitschlichtung</h2>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                  <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#28863E] underline underline-offset-2 hover:text-[#1f6d32]">
                    https://ec.europa.eu/consumers/odr
                  </a>
                </p>
                <p className="mt-3">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">Haftung für Inhalte</h2>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG / DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG / DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p className="mt-3">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">Haftung für Links</h2>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
                <p className="mt-3">
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-xl text-[#253541] mb-3">Urheberrecht</h2>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
                <p className="mt-3">
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
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
