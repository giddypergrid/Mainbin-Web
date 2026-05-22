import { useState, useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import emergencyImg from './assets/emergency.png';
import emergencySleepyImg from './assets/emergency-sleepy.png';
import infoImg from './assets/info-bin.png';
import infoSleepyImg from './assets/info-bin-sleepy.png';
import maybeImg from './assets/maybe-bin.png';
import maybeSleepyImg from './assets/maybe-bin-sleepy.png';
import { bins, fakeEmails, type BinId, type FakeEmail } from './data';
import './index.css';

const binImages: Record<BinId, { awake: string; sleepy: string }> = {
  emergency: { awake: emergencyImg, sleepy: emergencySleepyImg },
  info: { awake: infoImg, sleepy: infoSleepyImg },
  maybe: { awake: maybeImg, sleepy: maybeSleepyImg },
};

const DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=1bkf6H6lixfEtbdwpCKNFiPp_f86sOhhD';
const CONTACT_EMAIL = 'sunziyuan000@gmail.com';

export default function App() {
  return (
    <div className="page">
      <Hero />
      <BinsSection />
      <SwipeDemoSection />
      <TeachSection />
      <ClosingCTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <header className="hero">
      <div className="hero-date">2026-05-21 · Mailbin</div>
      <h1 className="hero-title">your inbox, but tiny.</h1>
      <p className="hero-tag">
        Your truly intelligent Gmail assistant. Sorts everything in your Primary tab into three friendly bins so you can clear 50 emails in 2 minutes — by swiping.
      </p>
    </header>
  );
}

function BinsSection() {
  return (
    <section className="bins-section">
      <div className="bins-row">
        {bins.map((bin) => (
          <BinCard key={bin.id} binId={bin.id} title={bin.title} pitch={bin.pitch} longer={bin.longer} />
        ))}
      </div>
    </section>
  );
}

function BinCard({ binId, title, pitch, longer }: { binId: BinId; title: string; pitch: string; longer: string }) {
  const [hover, setHover] = useState(false);
  const src = hover ? binImages[binId].sleepy : binImages[binId].awake;
  return (
    <div className="bin-card" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="bin-img-wrap">
        <img src={src} alt={title} />
      </div>
      <div className="bin-card-text">
        <div className="bin-pitch">{pitch}</div>
        <h3 className="bin-title">{title}</h3>
        <p className="bin-longer">{longer}</p>
      </div>
    </div>
  );
}

const SWIPE_THRESHOLD = 140;

function SwipeDemoSection() {
  const [emails, setEmails] = useState<FakeEmail[]>(fakeEmails);
  const [swiped, setSwiped] = useState<{ id: string; dir: 'right' | 'left' } | null>(null);

  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const swipeLocked = useRef(false);
  const activeId = useRef<string | null>(null);
  const cardEls = useRef<Map<string, HTMLDivElement>>(new Map());

  function handleSwipe(id: string, dir: 'right' | 'left') {
    setSwiped({ id, dir });
    setTimeout(() => {
      setEmails((prev) => prev.filter((e) => e.id !== id));
      setSwiped(null);
    }, 320);
  }

  function reset() {
    setEmails(fakeEmails);
  }

  function setRevealColor(card: HTMLElement | null, color: string | null) {
    const reveal = card?.parentElement?.querySelector('.swipe-reveal') as HTMLElement | null;
    if (reveal) reveal.style.background = color ?? '';
  }

  function resetCard(card: HTMLElement | null) {
    if (!card) return;
    card.style.transition = 'transform 260ms ease';
    card.style.transform = '';
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>, id: string) {
    if (activeId.current) return;
    const card = e.currentTarget;
    card.style.transition = 'none';
    activeId.current = id;
    swipeLocked.current = false;
    cardEls.current.set(id, card);
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const id = activeId.current;
    if (!id) return;
    const card = cardEls.current.get(id);
    if (!card) return;
    const dx = e.clientX - dragStartX.current;
    const dy = e.clientY - dragStartY.current;

    if (!swipeLocked.current) {
      if (Math.abs(dy) > Math.abs(dx) + 4) {
        activeId.current = null;
        card.style.transition = '';
        return;
      }
      if (Math.abs(dx) > 8) {
        swipeLocked.current = true;
        card.setPointerCapture(e.pointerId);
      } else {
        return;
      }
    }

    card.style.transform = `translateX(${dx}px) rotate(${dx * 0.03}deg)`;
    const progress = Math.min(Math.abs(dx) / SWIPE_THRESHOLD, 1);
    if (dx > 0) setRevealColor(card, `rgba(139, 115, 85, ${progress})`);
    else if (dx < 0) setRevealColor(card, `rgba(192, 57, 43, ${progress})`);
    else setRevealColor(card, null);
  }

  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    const id = activeId.current;
    if (!id) return;
    const dx = e.clientX - dragStartX.current;
    const card = cardEls.current.get(id);
    cardEls.current.delete(id);
    activeId.current = null;

    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      handleSwipe(id, dx > 0 ? 'right' : 'left');
    } else {
      resetCard(card ?? null);
      setRevealColor(card ?? null, null);
    }
  }

  return (
    <section className="swipe-section">
      <h2 className="swipe-title">Only 2 minutes for 50 emails?</h2>
      <p className="swipe-sub">No problem — just drag.</p>

      <div className="swipe-legend">
        <span><span className="swipe-pill right">drag right →</span> bin it, you're done</span>
        <span><span className="swipe-pill left">← drag left</span> tell us why it should go elsewhere</span>
      </div>

      <div className="swipe-stage">
        {emails.length === 0 ? (
          <div className="swipe-empty">
            <img src={infoSleepyImg} alt="" />
            <div>
              <p className="swipe-empty-msg">Zzz... inbox zero.</p>
              <button className="swipe-reset" onClick={reset}>Bring them back</button>
            </div>
          </div>
        ) : (
          <ul className="swipe-list">
            {emails.map((e) => (
              <li
                key={e.id}
                className={`mail-card-wrap ${swiped?.id === e.id ? `is-swiped-${swiped.dir}` : ''}`}
              >
                <div className="swipe-reveal" />
                <div
                  className={`mail-card bin-${e.bin}`}
                  onPointerDown={(ev) => onPointerDown(ev, e.id)}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                >
                  <div className="mail-card-head">
                    <span className="mail-theme">{e.theme}</span>
                    <span className="mail-time">{e.time}</span>
                  </div>
                  <div className="mail-from">{e.fromWho}</div>
                  <p className="mail-summary">{e.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function TeachSection() {
  return (
    <section className="teach-section">
      <h2 className="teach-title">Teach us how to bin your emails.</h2>
      <p className="teach-sub">Mailbin learns from you — fast. Set rules up front, or just swipe-left to correct a mistake and it remembers.</p>

      <div className="teach-grid">
        <div className="teach-card">
          <span className="teach-tag">Settings · my rules</span>
          <ul className="teach-rules">
            <li>Mum &amp; dad → Emergency, always</li>
            <li>Anything with "boarding pass" → Info</li>
            <li>Substack newsletters → Maybe</li>
            <li>Visa / immigration → Emergency</li>
          </ul>
        </div>

        <div className="teach-card">
          <span className="teach-tag">Got it wrong? Tell us.</span>
          <div className="teach-summary-box">"Your Uniqlo order has shipped — tracking 8492XX"</div>
          <textarea className="teach-input" defaultValue="this is actually Info, I want the tracking number" readOnly />
          <button className="teach-submit">Submit feedback</button>
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="closing">
      <div className="closing-row">
        <div>
          <div className="footer-line">Want testing access? Email me.</div>
          <a href={`mailto:${CONTACT_EMAIL}`} className="footer-email">{CONTACT_EMAIL}</a>
        </div>
        <div className="closing-right">
          <a href={DOWNLOAD_URL} className="download-btn">Download APK ↓</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-credit">
          Made with beige &amp; caffeine · {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
