import { useState } from 'react';
import { siteConfig } from './site.config.js';
import './styles.css';

const stages = [
  {
    label: 'Make a plan',
    short: 'Draft',
    timestamp: 'The evening before',
    message: 'Finish the launch video by 10 AM tomorrow.',
    title: 'One deadline. A clear next step.',
    status: 'Draft · awaiting confirmation',
    progress: 0,
    detail: 'Reply CONFIRM 3 when you’re ready to start.',
    note: 'Nothing starts until you confirm the plan.',
  },
  {
    label: 'Get a nudge',
    short: 'Alert',
    timestamp: 'Tomorrow · 8:00 AM',
    message: 'CONFIRM 3',
    title: 'Two hours left. Let’s make them count.',
    status: 'Active · 2 hours remaining',
    progress: 0,
    detail: 'What’s the next small step you can finish?',
    note: 'Timely alerts at 2h, 1h, 30m, and 15m before your deadline.',
  },
  {
    label: 'Move it forward',
    short: 'Progress',
    timestamp: 'Tomorrow · 8:45 AM',
    message: 'PROGRESS 3 60',
    title: 'Progress recorded. Keep going.',
    status: 'Active · 1 hour 15 minutes remaining',
    progress: 60,
    detail: 'Progress saved at 60%. Choose the next piece of work and keep going.',
    note: 'Your HP meter reflects the progress you report.',
  },
  {
    label: 'Close the loop',
    short: 'Done',
    timestamp: 'Tomorrow · 9:42 AM',
    message: 'DONE 3',
    title: 'Done. And eighteen minutes early.',
    status: 'Completed · self-reported',
    progress: 100,
    detail: 'Launch video is complete. One less thing on your mind.',
    note: 'A clear finish, with no more reminders for this task.',
  },
];

const tones = [
  {
    name: 'Gentle',
    command: 'MILD',
    description: 'A little encouragement goes a long way.',
    message: 'Two hours to go on your launch video. What’s one small step you can finish now?',
  },
  {
    name: 'Direct',
    command: 'SAVAGE',
    description: 'Clear, practical, and straight to the point.',
    message: 'Your launch video is due in two hours. Pick the next step and move it forward.',
  },
  {
    name: 'Firm',
    command: 'NUCLEAR',
    description: 'A stronger push when you ask for one.',
    message: 'Two hours left. Choose the next concrete step on your launch video and start now.',
  },
];

const questions = [
  {
    title: 'Is this only for coding tasks?',
    answer: 'No. Use it for a video edit, a job application, a study session, or anything with a finish line. GitHub evidence is an optional extra for coding work.',
  },
  {
    title: 'What does the progress meter actually measure?',
    answer: 'The HP meter shows progress you report, from 0 to 100%. It does not watch your screen or guess how productive you are. For connected GitHub tasks, evidence checks are shown separately.',
  },
  {
    title: 'Can I change my mind about a task?',
    answer: 'Yes. You can move a deadline while a task is still a draft, update your progress, pause reminders, or delete a specific task. Each task has a short number, so your update goes to the right place.',
  },
  {
    title: 'How do I get started?',
    answer: 'Deadline Demon is currently a self-hosted project. The setup guide on GitHub walks you through running your own instance and connecting iMessage. Public sign-up is not available yet.',
  },
];

function Arrow({ diagonal = false, className = '' }) {
  return (
    <svg className={`arrow-icon ${className}`} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h16m-6-6 6 6-6 6" />}
    </svg>
  );
}

function Brand({ light = false }) {
  return (
    <a className={`brand${light ? ' brand--light' : ''}`} href="#top" aria-label={`${siteConfig.name} home`}>
      <svg className="brand-mark" width="28" height="30" viewBox="0 0 28 30" fill="none" aria-hidden="true">
        <path d="M3 3h10c8 0 12 4 12 12S21 27 13 27H3V3Z" fill="currentColor" />
        <path d="m10 9 8 6-8 6V9Z" fill={light ? '#1c211d' : '#f6f4ed'} />
      </svg>
      <span>{siteConfig.name.toLowerCase()}<span className="brand-period">.</span></span>
    </a>
  );
}

function ProgressMeter({ value, small = false }) {
  return (
    <div className={`progress-meter${small ? ' progress-meter--small' : ''}`}>
      <div className="progress-meter__label"><span>REPORTED PROGRESS / HP</span><strong>{value}%</strong></div>
      <div className="progress-meter__track" role="progressbar" aria-label="Illustrative task progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
        {Array.from({ length: 10 }, (_, index) => <span key={index} className={index < Math.floor(Math.max(0,Math.min(100,value)) / 10) ? 'is-filled' : ''} />)}
      </div>
    </div>
  );
}

function ConversationPreview({ activeStage, setActiveStage }) {
  const stage = stages[activeStage];
  return (
    <div className="preview-wrap" id="preview">
      <div className="preview-topline"><span><span className="live-dot" /> THE FOLLOW-THROUGH, IN ACTION</span><span>01—04</span></div>
      <div className="conversation">
        <div className="conversation__header">
          <div className="conversation__avatar" aria-hidden="true">d.</div>
          <div><strong>Deadline Demon</strong><span>Your plans, with a little follow-through.</span></div>
          <svg className="conversation__icon" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.4 0-2.7-.3-3.9-.9L3 21l1.9-4.6a8.5 8.5 0 1 1 15.1-4.9Z" /></svg>
        </div>
        <div className="conversation__body" aria-live="polite" aria-atomic="true">
          <p className="conversation__time">{stage.timestamp}</p>
          <div className="outgoing-message" key={`message-${activeStage}`}>{stage.message}</div>
          <div className={`task-message${activeStage === 3 ? ' task-message--done' : ''}`} key={`task-${activeStage}`}>
            <p className="task-message__intro">{stage.title}</p>
            <div className="task-message__title"><span className="task-number">#3</span><h3>Launch video</h3></div>
            <p className="task-message__state"><span className={activeStage === 3 ? 'state-dot state-dot--complete' : 'state-dot'} />{stage.status}</p>
            <div className="task-message__due"><span>DUE</span><strong>Tomorrow, 10:00 AM</strong></div>
            <ProgressMeter value={stage.progress} />
            <p className="task-message__detail">{stage.detail}</p>
          </div>
        </div>
        <div className="preview-controls" role="group" aria-label="Choose a stage of the illustrative conversation">
          {stages.map((item, index) => (
            <button type="button" key={item.short} className={index === activeStage ? 'is-active' : ''} onClick={() => setActiveStage(index)} aria-pressed={index === activeStage} aria-label={`${index + 1}. ${item.label}`}>
              <span className="preview-controls__number">0{index + 1}</span>{item.short}
            </button>
          ))}
        </div>
      </div>
      <div className="preview-caption"><span className="preview-caption__mark" aria-hidden="true">↳</span><p>{stage.note}<span>Interactive example. No messages are sent.</span></p></div>
      <span className="preview-side-label" aria-hidden="true">LESS OVERTHINKING. MORE FINISHING.</span>
    </div>
  );
}

function App() {
  const [activeStage, setActiveStage] = useState(0);
  const [activeTone, setActiveTone] = useState(1);
  const tone = tones[activeTone];

  function showPreview() {
    setActiveStage(1);
    document.getElementById('preview')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="site-shell" id="top">
        <header className="site-header">
          <Brand />
          <nav aria-label="Main navigation">
            <a href="#how-it-works">How it works</a>
            <a href="#your-way">Your way</a>
            <a href="#questions">Questions</a>
          </nav>
          <a className="header-link" href={siteConfig.githubUrl}>View on GitHub <Arrow diagonal /></a>
        </header>

        <main id="main">
          <section className="hero section-width" aria-labelledby="hero-title">
            <div className="hero__copy">
              <p className="eyebrow"><span className="small-cross" aria-hidden="true">+</span> GOOD INTENTIONS NEED A FOLLOW-UP.</p>
              <h1 id="hero-title">A deadline.<br />A little nudge.<br /><em>A done deal.</em></h1>
              <p className="hero__description">Meet the accountability partner already in your messages. Make a plan, see your progress, and finish what you said you would.</p>
              <div className="hero__actions">
                <a className="button button--primary" href={siteConfig.getStartedUrl}>Get started <Arrow /></a>
                <button type="button" className="button button--text" onClick={showPreview}>See it work <span className="play-icon" aria-hidden="true">▶</span></button>
              </div>
              <p className="setup-note">Built for iMessage. Currently available to self-host.</p>
              <div className="hero__footnote"><span className="hero__footnote-line" /><p>Less managing your tasks.<br /><strong>More actually doing them.</strong></p></div>
            </div>
            <ConversationPreview activeStage={activeStage} setActiveStage={setActiveStage} />
          </section>

          <div className="promise-strip section-width" aria-label="Product highlights"><span>One conversation.<br /><strong>All your commitments.</strong></span><span>A home for every kind of task</span><span>Progress you can actually see</span><span>A heads-up before the rush</span></div>

          {siteConfig.heroImage && <figure className="editorial-image section-width"><img src={siteConfig.heroImage} alt={siteConfig.heroImageAlt || 'A closer look at Deadline Demon'} loading="lazy" /></figure>}

          <section className="workflow" id="how-it-works" aria-labelledby="workflow-title">
            <div className="section-width">
              <div className="section-heading section-heading--light">
                <p className="eyebrow">01 / THE SHORT VERSION</p>
                <h2 id="workflow-title">From “I should”<br />to <em>“it’s done.”</em></h2>
                <p>A new system to learn? You have enough on your plate. This one starts with a message.</p>
              </div>
              <div className="workflow-steps">
                <article className="workflow-step"><span className="workflow-step__number">01</span><div><h3>Say what. Say when.</h3><p>A video, a proposal, that thing you keep postponing. Send your task and deadline. Review the draft, then confirm it.</p><span className="workflow-step__example">“Finish the launch video by 10 AM tomorrow.”</span></div></article>
                <article className="workflow-step"><span className="workflow-step__number">02</span><div><h3>Keep a little momentum.</h3><p>Report progress as you go. An hourly overview keeps the whole picture clear; timely alerts bring the next deadline into focus.</p><span className="workflow-step__example">A visible finish line. A useful nudge.</span></div></article>
                <article className="workflow-step"><span className="workflow-step__number">03</span><div><h3>Done means done.</h3><p>Mark it complete and the reminders stop. For code work, optionally connect GitHub to help check the evidence.</p><span className="workflow-step__example">One less thing taking up headspace.</span></div></article>
              </div>
            </div>
          </section>

          <section className="your-way section-width" id="your-way" aria-labelledby="your-way-title">
            <div className="your-way__copy">
              <p className="eyebrow">02 / A NUDGE, ON YOUR TERMS</p>
              <h2 id="your-way-title">Some days, a push.<br />Some days,<br /><em>a softer landing.</em></h2>
              <p>Choose the tone that helps you move. Your goals stay yours. So does the control.</p>
              <div className="control-note"><span aria-hidden="true">↳</span> Change your tone anytime.<br />Pause when you need to.</div>
            </div>
            <div className="tone-demo">
              <div className="tone-selector" role="group" aria-label="Choose the reminder tone">
                {tones.map((item, index) => <button type="button" key={item.name} className={index === activeTone ? 'is-active' : ''} aria-pressed={index === activeTone} onClick={() => setActiveTone(index)}>{item.name}</button>)}
              </div>
              <div className="tone-demo__message" aria-live="polite" aria-atomic="true"><p className="eyebrow">2 HOURS BEFORE YOUR DEADLINE</p><blockquote key={tone.name}>{tone.message}</blockquote><div className="tone-demo__signature"><span className="tone-demo__avatar" aria-hidden="true">d.</span><span>Deadline Demon<strong>{tone.name} mode</strong></span><span className="tone-demo__line" /></div></div>
              <p className="tone-demo__caption">{tone.description}<span>In the app: <code>{tone.command}</code></span></p>
            </div>
            <div className="alert-line"><div><h3>Before the last-minute scramble.</h3><p>Individual alerts for confirmed tasks. One hourly overview of all unfinished work.</p></div><div className="alert-line__timings" aria-label="Deadline alerts at 2 hours, 1 hour, 30 minutes, and 15 minutes remaining"><span><i />2h</span><span><i />1h</span><span><i />30m</span><span><i />15m</span><span className="alert-line__finish"><i />Due</span></div></div>
          </section>

          <section className="questions section-width" id="questions" aria-labelledby="questions-title">
            <div className="questions__heading"><p className="eyebrow">03 / BEFORE YOU ASK</p><h2 id="questions-title">A few things<br /><em>worth knowing.</em></h2><a className="text-link" href={siteConfig.githubUrl}>The details are on GitHub <Arrow diagonal /></a></div>
            <div className="question-list">{questions.map((question) => <details key={question.title}><summary>{question.title}<span className="question-toggle" aria-hidden="true" /></summary><p>{question.answer}</p></details>)}</div>
          </section>

          <section className="closing section-width" aria-labelledby="closing-title"><div><p className="eyebrow">YOU HAVE SOMETHING TO FINISH.</p><h2 id="closing-title">Let’s give it<br /><em>a deadline.</em></h2></div><div className="closing__action"><a className="button button--primary" href={siteConfig.getStartedUrl}>Get started <Arrow /></a><p>Your next step: the local setup guide.<br />No account or payment on this page.</p></div><svg className="closing__asterisk" width="145" height="145" viewBox="0 0 145 145" fill="none" aria-hidden="true"><path d="M72.5 13v119M13 72.5h119M30.4 30.4l84.2 84.2m0-84.2-84.2 84.2" stroke="currentColor" strokeWidth="15" /></svg></section>
        </main>

        <footer className="site-footer section-width"><Brand /><p>A little structure. A lot more follow-through.</p><div><a href={siteConfig.githubUrl}>GitHub <Arrow diagonal /></a><span>© {new Date().getFullYear()} Deadline Demon</span></div></footer>
      </div>
    </>
  );
}

export default App;
