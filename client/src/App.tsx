/**
 * TLCG design note: New Luxury Editorialism — a dark, deliberate shell that
 * lets the Verdant Ledger layout move between cinematic depth and paper warmth.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import CookiePolicy from "./pages/CookiePolicy";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function Router() {
  return (
    <Switch>
      <Route path="/capabilities" component={Home} />
      <Route path="/experience" component={Home} />
      <Route path="/approach" component={Home} />
      <Route path="/why-tlcg" component={Home} />
      <Route path="/insights" component={Home} />
      <Route path="/lets-talk" component={Home} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route path="/404" component={NotFound} />
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
