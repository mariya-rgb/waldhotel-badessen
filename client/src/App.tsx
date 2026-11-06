import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CookieProvider } from "./contexts/CookieContext";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Location from "./pages/Location";
import Booking from "./pages/Booking";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Experiences from "./pages/Experiences";
import ExperienceDetail from "./pages/ExperienceDetail";

// Wrapper for English routes that sets language to 'en'
function EnHome() { return <Home />; }
function EnRooms() { return <Rooms />; }
function EnLocation() { return <Location />; }
function EnBooking() { return <Booking />; }
function EnImprint() { return <Impressum />; }
function EnPrivacy() { return <Datenschutz />; }
function EnExperiences() { return <Experiences />; }
function EnExperienceDetail() { return <ExperienceDetail />; }

function DeRouter() {
  return (
    <LanguageProvider initialLang="de">
      <CookieProvider>
        <ScrollToTop />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/zimmer" component={Rooms} />
          <Route path="/bad-essen" component={Location} />
          <Route path="/buchen" component={Booking} />
          <Route path="/erlebnisse" component={Experiences} />
          <Route path="/erlebnisse/:slug" component={ExperienceDetail} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/datenschutz" component={Datenschutz} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </CookieProvider>
    </LanguageProvider>
  );
}

function EnRouter() {
  return (
    <LanguageProvider initialLang="en">
      <CookieProvider>
        <ScrollToTop />
        <Switch>
          <Route path="/en" component={EnHome} />
          <Route path="/en/rooms" component={EnRooms} />
          <Route path="/en/location" component={EnLocation} />
          <Route path="/en/book" component={EnBooking} />
          <Route path="/en/experiences" component={EnExperiences} />
          <Route path="/en/experiences/:slug" component={EnExperienceDetail} />
          <Route path="/en/imprint" component={EnImprint} />
          <Route path="/en/privacy" component={EnPrivacy} />
          <Route component={NotFound} />
        </Switch>
      </CookieProvider>
    </LanguageProvider>
  );
}

function Router() {
  const isEnglish = window.location.pathname.startsWith('/en');
  
  if (isEnglish) {
    return <EnRouter />;
  }
  return <DeRouter />;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
