import { siteConfig } from './site.config.js';
import './styles.css';

function Mark() {
  return (
    <svg className="brand-mark" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M8 9h8.5C24.8 9 29 12.4 29 18s-4.2 9-12.5 9H8V9Z" stroke="currentColor" strokeWidth="3.5" />
      <path d="M15 14v8" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="28.5" cy="7.5" r="3.5" fill="#087aff" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MessageVisual() {
  if (siteConfig.heroImage) {
    return (
      <figure className="message-visual custom-visual">
        <img src={siteConfig.heroImage} alt={siteConfig.heroImageAlt} />
      </figure>
    );
  }

  return (
    <figure className="message-visual" aria-label="Illustrative iMessage conversation with Deadline Demon">
      <div className="phone" aria-hidden="true">
        <div className="phone-island" />
        <div className="phone-contact">
          <span className="contact-icon"><Mark /></span>
          <span>Deadline Demon <span className="contact-chevron">›</span></span>
        </div>
        <span className="phone-time">Today, 3:30 PM</span>
      </div>

      <div className="message sent-message">Finish the first cut<br />by 4 pm today.</div>

      <div className="message reminder-message">
        <span className="reminder-label"><span className="clock-icon" aria-hidden="true" />30 minutes left</span>
        <p>The first cut</p>
        <div className="progress-line">
          <span className="progress-track" role="meter" aria-label="Reported task progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="65"><span /></span>
          <span>65%</span>
        </div>
        <span className="reminder-note">A little more. You’ve got this.</span>
      </div>

      <div className="message final-message">On it.</div>
      <figcaption>Example conversation · Progress you report</figcaption>
    </figure>
  );
}

export default function App() {
  return (
    <div className="page">
      <header className="header">
        <a className="brand" href="/" aria-label={`${siteConfig.name} home`}>
          <Mark />
          <span>deadline<br />demon</span>
        </a>
        <span className="platform"><span aria-hidden="true" />Made for iMessage</span>
      </header>

      <main id="main" className="hero">
        <MessageVisual />
        <h1>Less later. More <span>done.</span></h1>
        <p className="intro">A little accountability. Right in iMessage.</p>
        <div className="action">
          <a className="primary-link" href={siteConfig.getStartedUrl}>Get started <Arrow /></a>
          <span className="setup-note">Self-hosted · Setup on GitHub</span>
        </div>
      </main>

      <footer className="footer">
        <span>Make room for follow-through.</span>
        <a href={siteConfig.githubUrl}>GitHub <span aria-hidden="true">↗</span></a>
      </footer>
    </div>
  );
}
