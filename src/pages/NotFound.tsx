import { Asterisk } from "lucide-react";
import "@/portfolio.css";

export default function NotFound() {
  return <main className="portfolio not-found">
    <a href="/" className="wordmark">atharva<Asterisk size={27} />
    </a>
    <div>
      <span className="micro">404 / A LITTLE OFF THE MAP</span>
      <h1>This path is<br />
        <em>still unexplored.</em>
      </h1>
      <p>The page you're looking for isn't here. There's plenty of work to explore back at the start.</p>
      <a href="/" className="button button-lime">Back to the portfolio <Asterisk size={19} />
      </a>
    </div>
    <span className="micro">THINK IN SYSTEMS. BUILD FOR PEOPLE.</span>
  </main>;
}
