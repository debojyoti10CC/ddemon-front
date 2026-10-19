import { useState } from 'react';
import { siteConfig } from './site.config.js';
import './styles.css';

function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.4" />
      <path d="M20 8v3m12 9h-3M20 32v-3M8 20h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M20 14v7l5 3" stroke="#d7c8a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="21" r="1.6" fill="#d7c8a0" />
    </svg>
  );
}

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function ProgressDial() {
  return (
    <div className="dial" role="meter" aria-label="Illustrative reported task progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="65">
      <svg className="dial-svg" viewBox="0 0 320 320" aria-hidden="true">
        <circle className="dial-track" cx="160" cy="160" r="128" />
        <circle className="dial-progress" cx="160" cy="160" r="128" />
        {Array.from({ length: 12 }, (_, index) => (
          <line key={index} className="dial-tick" x1="160" y1="12" x2="160" y2="25" transform={`rotate(${index * 30} 160 160)`} />
        ))}
        <circle className="dial-tip" cx="56.4" cy="239" r="4.2" />
      </svg>
      <div className="dial-reading">
        <span className="dial-label">REPORTED PROGRESS</span>
        <div className="dial-value">65<span>%</span></div>
        <span className="dial-note">A little closer.</span>
      </div>
    </div>
  );
}

function ProgressArtwork() {
  if (siteConfig.heroImage) {
    return <img className="artwork-image" src={siteConfig.heroImage} alt={siteConfig.heroImageAlt} />;
  }

  return (
    <>
      <div className="artwork-heading"><span>ONE TASK. ONE FINISH LINE.</span><span className="index">01 / 01</span></div>
      <ProgressDial />
      <div className="example-task">
        <div className="task-summary"><span className="task-label">ILLUSTRATIVE TASK</span><span className="time-left">2h left</span></div>
        <p>The first cut</p>
        <span className="task-due">Due today · 4:00 PM</span>
      </div>
      <div className="alert-scale" aria-label="Deadline alerts at two hours, one hour, 30 minutes and 15 minutes remaining">
        <span className="scale-title">DEADLINE ALERTS</span>
        <div className="scale-line"><span className="scale-track" /><span className="scale-points"><i /><i /><i /><i /></span></div>
        <div className="scale-labels"><span>2h</span><span>1h</span><span>30m</span><span>15m</span><span>Due</span></div>
      </div>
    </>
  );
}

export default function App() {
  const [copyStatus, setCopyStatus] = useState('');
  const messageUrl = `sms:${siteConfig.phoneNumber.replace(/[^\d+]/g, '')}`;

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(siteConfig.phoneNumber);
      setCopyStatus('Copied');
    } catch {
      setCopyStatus('Select the number to copy.');
    }
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="/" aria-label={`${siteConfig.name} home`}>
          <BrandMark />
          <span className="brand-name">DEADLINE <b>DEMON</b></span>
        </a>
        <span className="header-note"><span className="status-dot" /> ACCOUNTABILITY, BY IMESSAGE</span>
      </header>

      <main id="main" className="hero">
        <section className="hero-copy" aria-labelledby="hero-title">
          <div className="eyebrow"><span className="eyebrow-rule" />DEADLINES WITH FOLLOW-THROUGH</div>
          <h1 id="hero-title">A little pressure.<br /><em>A better finish.</em></h1>
          <p className="intro">A steady nudge in the iMessage thread you already use. Set the task, track your progress, and get the next deadline in sight.</p>
          <div className="contact-action">
            <a className="primary-link" href={messageUrl} aria-label={`Open a message to Deadline Demon at ${siteConfig.phoneNumber}`}>
              Text Deadline Demon <ArrowIcon />
            </a>
            <div className="number-row">
              <a className="phone-number" href={messageUrl}>{siteConfig.phoneNumber}</a>
              <button className="copy-button" type="button" onClick={copyNumber} aria-label="Copy Deadline Demon phone number">{copyStatus === 'Copied' ? 'COPIED' : 'COPY'}</button>
            </div>
            <span className="copy-status" aria-live="polite">{copyStatus}</span>
            <p className="device-note">Opens Messages on iPhone. Copy the number on other devices.</p>
          </div>
          <p className="command-note">QUICK COMMAND <kbd>TASKS</kbd> SHOWS YOUR BOARD.</p>
        </section>

        <figure className="progress-artwork" aria-label="An example task with a self-reported progress meter and approaching deadline alerts">
          <ProgressArtwork />
        </figure>
      </main>

      <footer className="site-footer">
        <span>SET A DEADLINE. KEEP YOUR WORD.</span>
        <a href={siteConfig.githubUrl}>VIEW THE SOURCE <span aria-hidden="true">↗</span></a>
      </footer>
    </div>
  );
}
