import { useState } from 'react';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/jetbrains-mono/latin-500.css';
import { siteConfig } from './site.config.js';
import './styles.css';

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function App() {
  const [sceneReady, setSceneReady] = useState(false);
  const messageUrl = `sms:${siteConfig.phoneNumber.replace(/[^\d+]/g, '')}`;

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <main id="main" className="hero">
        <img className={`hero-image${sceneReady ? ' is-ready' : ''}`} src={siteConfig.heroImage} alt={siteConfig.heroImageAlt} fetchPriority="high" onLoad={() => setSceneReady(true)} />
        <div className="hero-overlay" aria-hidden="true" />

        <header className="site-header">
          <a className="profile-link" href={siteConfig.xUrl} target="_blank" rel="noopener noreferrer" aria-label="Debojyoti on X (opens in a new tab)">
            <img className="profile-image" src={siteConfig.profileImage} alt="" width="36" height="36" />
          </a>
        </header>

        <section className="hero-copy" aria-labelledby="hero-title">
          <figure className="hero-quote">
            <blockquote>
              <h1 id="hero-title">“Life is like riding a bicycle. To keep your balance, you must keep moving.”</h1>
            </blockquote>
            <figcaption>— <cite>Albert Einstein</cite></figcaption>
          </figure>

          <div className="contact-action">
            <a className="primary-link" href={messageUrl} aria-label={`Text TASKS to Deadline Demon at ${siteConfig.phoneNumber} to see your board`}>
              Text TASKS <ArrowIcon />
            </a>
            <a className="phone-number" href={messageUrl}>{siteConfig.phoneNumber}</a>
          </div>
        </section>
      </main>
    </div>
  );
}
