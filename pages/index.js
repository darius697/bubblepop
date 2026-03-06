import Head from 'next/head'
import { useState, useEffect } from 'react'
import t from '../locales/translations'

// ─── MENU DATA ────────────────────────────────────────────────────────────────
const drinks = [
  { id: 1,  name_ro: '5 CITRUS',       name_ru: '5 ЦИТРУСОВ',    vibe_ro: 'Răcoritor · Citrus combo',    vibe_ru: 'Освежающий · Цитрус',       cat: 'fruity',  bg: 'linear-gradient(135deg,#AADC00,#f7c430)', emoji: '🍊' },
  { id: 2,  name_ro: 'ALL IN',         name_ru: 'ALL IN',         vibe_ro: 'Răcoritor · Citrus combo',    vibe_ru: 'Освежающий · Цитрус',       cat: 'fruity',  bg: 'linear-gradient(135deg,#f7a820,#AADC00)', emoji: '🍍' },
  { id: 3,  name_ro: 'KIWI ALOE',      name_ru: 'КИВИ АЛОЕ',      vibe_ro: 'Răcoritor · Fresh burst',     vibe_ru: 'Освежающий · Свежий',       cat: 'fruity',  bg: 'linear-gradient(135deg,#4fc83c,#AADC00)', emoji: '🥝' },
  { id: 4,  name_ro: 'PINEAPPLE ALOE', name_ru: 'АНАНАС АЛОЕ',    vibe_ro: 'Răcoritor · Fresh pineapple', vibe_ru: 'Освежающий · Ананас',       cat: 'fruity',  bg: 'linear-gradient(135deg,#f7c430,#5ec43c)', emoji: '🍍' },
  { id: 5,  name_ro: 'BROWN SUGAR',    name_ru: 'БРАУН ШУГАР',    vibe_ro: 'Moale · Dulce',               vibe_ru: 'Нежный · Сладкий',          cat: 'boba',    bg: 'linear-gradient(135deg,#1B4FD8,#0d1b2a)', emoji: '🧋' },
  { id: 6,  name_ro: 'CLASSIC BOBA',   name_ru: 'КЛАССИК БОБА',   vibe_ro: 'Clasic · Plin',               vibe_ru: 'Классика · Насыщенный',     cat: 'boba',    bg: 'linear-gradient(135deg,#2356E8,#4F7DFF)', emoji: '🫧' },
  { id: 7,  name_ro: 'MATCHA LATTE',   name_ru: 'МАТЧА ЛАТТЕ',    vibe_ro: 'Relaxant · Cremoso',          vibe_ru: 'Расслабляющий · Кремовый',  cat: 'milky',   bg: 'linear-gradient(135deg,#4fc83c,#1B4FD8)', emoji: '🍵' },
  { id: 8,  name_ro: 'TARO MILK TEA',  name_ru: 'ТАРО МИЛ ТИ',   vibe_ro: 'Dulce · Exotic',              vibe_ru: 'Сладкий · Экзотика',        cat: 'milky',   bg: 'linear-gradient(135deg,#b57bee,#FF3FA4)', emoji: '🟣' },
  { id: 9,  name_ro: 'OREO CRUNCH',    name_ru: 'ОРЕО КРАНЧ',     vibe_ro: 'Crocant · Indulgent',         vibe_ru: 'Хрустящий · Сытный',        cat: 'waffles', bg: 'linear-gradient(135deg,#1a1a2e,#555)',    emoji: '🍫' },
  { id: 10, name_ro: 'BERRY BLISS',    name_ru: 'БЕРРИ БЛИСС',    vibe_ro: 'Fructat · Colorat',           vibe_ru: 'Ягодный · Яркий',           cat: 'waffles', bg: 'linear-gradient(135deg,#FF3FA4,#f7c430)', emoji: '🍓' },
]

export default function Home() {
  const [lang, setLang]             = useState('ro')
  const [menuFilter, setMenuFilter] = useState('all')
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const tx       = t[lang]
  const filtered = menuFilter === 'all' ? drinks : drinks.filter(d => d.cat === menuFilter)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Head>
        <title>Bubblepop — Bubble Tea & More</title>
        <meta name="description" content="Descoperă magia în fiecare înghițitură cu BUBBLEPOP!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Unbounded:wght@400;700;900&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html  { scroll-behavior: smooth; }
        body  { font-family: 'Space Grotesk', sans-serif; background: #1B4FD8; color: #fff; overflow-x: hidden; }

        /* LANG TOGGLE */
        .lang-toggle { position: fixed; top: 22px; right: 22px; z-index: 200; display: flex; border: 2px solid rgba(255,255,255,.5); border-radius: 100px; overflow: hidden; font-family: 'Unbounded', sans-serif; font-size: 11px; }
        .lang-btn { padding: 7px 15px; background: transparent; color: #fff; border: none; cursor: pointer; transition: background .2s, color .2s; text-transform: uppercase; font-family: inherit; font-size: inherit; }
        .lang-btn.active { background: #fff; color: #1B4FD8; }

        /* NAV */
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 14px 48px; display: flex; align-items: center; justify-content: space-between; transition: background .3s; }
        nav.scrolled { background: rgba(27,79,216,.97); backdrop-filter: blur(12px); }
        .nav-logo { display: flex; align-items: center; text-decoration: none; }
        .nav-logo img { height: 52px; width: auto; object-fit: contain; filter: brightness(0) invert(1); }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-links a { color: rgba(255,255,255,.8); text-decoration: none; font-size: 12px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; transition: color .2s; }
        .nav-links a:hover { color: #AADC00; }
        .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
        .hamburger span { display: block; width: 24px; height: 2px; background: #fff; border-radius: 2px; }
        .mobile-menu { display: none; position: fixed; inset: 0; background: #1B4FD8; z-index: 150; flex-direction: column; align-items: center; justify-content: center; gap: 36px; }
        .mobile-menu.open { display: flex; }
        .mobile-menu a { font-family: 'Unbounded', sans-serif; font-size: 32px; font-weight: 700; color: #fff; text-decoration: none; }
        .mobile-menu a:hover { color: #AADC00; }
        .mobile-close { position: absolute; top: 20px; right: 24px; background: none; border: none; color: #fff; font-size: 36px; cursor: pointer; }

        /* HERO */
        .hero { min-height: 100vh; background: #1B4FD8; display: grid; grid-template-columns: 1fr 1fr; align-items: center; padding: 120px 48px 80px; position: relative; overflow: hidden; gap: 60px; }
        .hero-bg-word { position: absolute; bottom: -40px; left: -10px; font-family: 'Unbounded', sans-serif; font-size: clamp(100px,20vw,300px); font-weight: 900; color: rgba(255,255,255,.04); white-space: nowrap; pointer-events: none; user-select: none; line-height: 1; }
        .hero-glow { position: absolute; border-radius: 50%; pointer-events: none; animation: floatY 8s ease-in-out infinite; }
        .hero-glow-1 { width: 500px; height: 500px; right: -60px; top: -80px; background: radial-gradient(circle, rgba(170,220,0,.18), transparent 70%); }
        .hero-glow-2 { width: 280px; height: 280px; left: 28%; bottom: 8%; background: radial-gradient(circle, rgba(255,63,164,.12), transparent 70%); animation-direction: reverse; animation-duration: 6s; }
        @keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-28px); } }

        .hero-content { position: relative; z-index: 2; }
        .hero-pill { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); padding: 6px 16px; border-radius: 100px; font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 28px; animation: fadeUp .7s ease both; }
        .hero-pill-dot { width: 7px; height: 7px; background: #AADC00; border-radius: 50%; animation: pulse 2s infinite; flex-shrink: 0; }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.4; transform:scale(.6); } }
        .hero-title { font-family: 'Unbounded', sans-serif; font-size: clamp(44px,6.5vw,88px); font-weight: 900; line-height: .95; letter-spacing: -0.03em; margin-bottom: 24px; animation: fadeUp .7s .1s ease both; }
        .hero-title .accent  { color: #AADC00; }
        .hero-title .outline { -webkit-text-stroke: 2px #fff; color: transparent; }
        .hero-desc { font-size: 16px; line-height: 1.7; opacity: .75; max-width: 420px; margin-bottom: 40px; animation: fadeUp .7s .2s ease both; }
        .hero-cta { display: flex; gap: 14px; flex-wrap: wrap; animation: fadeUp .7s .3s ease both; }
        .btn-primary { display: inline-flex; align-items: center; gap: 10px; background: #AADC00; color: #0D1B2A; padding: 15px 30px; border-radius: 100px; font-family: 'Unbounded', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: .04em; text-decoration: none; transition: transform .2s, box-shadow .2s; border: none; cursor: pointer; }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(170,220,0,.4); }
        .btn-outline { display: inline-flex; align-items: center; gap: 10px; background: transparent; color: #fff; padding: 15px 30px; border-radius: 100px; font-family: 'Unbounded', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: .04em; text-decoration: none; border: 2px solid rgba(255,255,255,.35); transition: border-color .2s, background .2s; cursor: pointer; }
        .btn-outline:hover { border-color: #fff; background: rgba(255,255,255,.07); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }

        /* HERO VISUAL */
        .hero-visual { position: relative; z-index: 2; display: flex; justify-content: center; align-items: center; animation: fadeUp .7s .35s ease both; }
        .hero-logo-wrap { display: flex; flex-direction: column; align-items: center; gap: 36px; }
        .hero-logo-img { width: clamp(180px,26vw,320px); height: auto; object-fit: contain; filter: brightness(0) invert(1); animation: floatY 6s ease-in-out infinite; }
        .hero-cards-row { display: flex; gap: 12px; justify-content: center; }
        .hcard { border-radius: 16px; border: 2px solid rgba(255,255,255,.12); transition: transform .3s, border-color .3s; display: flex; flex-direction: column; align-items: center; padding: 18px 14px 14px; gap: 8px; min-width: 96px; cursor: default; }
        .hcard:hover { transform: translateY(-5px); border-color: #AADC00; }
        .hcard-emoji { font-size: 34px; line-height: 1; }
        .hcard-label { font-size: 9px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; opacity: .85; text-align: center; }

        /* MARQUEE */
        .marquee-wrap { background: #AADC00; padding: 14px 0; overflow: hidden; }
        .marquee-track { display: flex; animation: marquee 20s linear infinite; white-space: nowrap; }
        .marquee-track span { display: inline-flex; align-items: center; gap: 20px; font-family: 'Unbounded', sans-serif; font-size: 12px; font-weight: 700; color: #0D1B2A; letter-spacing: .05em; text-transform: uppercase; padding-right: 44px; }
        .marquee-track span::after { content: '●'; color: #1B4FD8; font-size: 8px; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* SHARED */
        .section-tag { font-family: 'Unbounded', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: #AADC00; margin-bottom: 14px; }
        .section-title { font-family: 'Unbounded', sans-serif; font-size: clamp(28px,4vw,56px); font-weight: 900; line-height: 1.0; letter-spacing: -0.03em; margin-bottom: 20px; }

        /* ABOUT */
        .about { background: #0D1B2A; display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; padding: 100px 48px; }
        .about-text { font-size: 15px; line-height: 1.75; opacity: .7; margin-bottom: 14px; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-top: 44px; }
        .stat-box { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); padding: 24px; transition: background .2s; }
        .stat-box:hover { background: rgba(170,220,0,.07); }
        .stat-num { font-family: 'Unbounded', sans-serif; font-size: 42px; font-weight: 900; color: #AADC00; letter-spacing: -0.03em; line-height: 1; margin-bottom: 5px; }
        .stat-label { font-size: 12px; opacity: .6; }
        .about-visual { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .av-card { border-radius: 14px; overflow: hidden; border: 2px solid rgba(255,255,255,.07); }
        .av-card:nth-child(1) { grid-column: span 2; }
        .av-inner { display: flex; align-items: center; justify-content: center; font-size: 64px; }

        /* CATEGORIES */
        .categories { background: #AADC00; display: grid; grid-template-columns: repeat(4,1fr); gap: 2px; }
        .cat-item { background: #0D1B2A; padding: 40px 28px; display: flex; flex-direction: column; gap: 12px; transition: background .2s; }
        .cat-item:hover { background: #162240; }
        .cat-icon { font-size: 34px; line-height: 1; }
        .cat-name { font-family: 'Unbounded', sans-serif; font-size: 14px; font-weight: 700; color: #AADC00; }
        .cat-desc { font-size: 13px; color: rgba(255,255,255,.6); line-height: 1.55; }

        /* MENU */
        .menu-section { background: #1B4FD8; padding: 100px 48px; }
        .menu-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 52px; gap: 24px; flex-wrap: wrap; }
        .menu-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
        .tab-btn { padding: 9px 20px; border-radius: 100px; border: 2px solid rgba(255,255,255,.2); background: transparent; color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .2s; opacity: .7; }
        .tab-btn.active { background: #fff; color: #1B4FD8; border-color: #fff; opacity: 1; }
        .tab-btn:hover:not(.active) { opacity: 1; border-color: #fff; }
        .menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px,1fr)); gap: 18px; }
        .drink-card { background: rgba(255,255,255,.06); border: 2px solid rgba(255,255,255,.08); border-radius: 18px; overflow: hidden; transition: transform .3s, border-color .3s, box-shadow .3s; cursor: pointer; }
        .drink-card:hover { transform: translateY(-6px); border-color: #AADC00; box-shadow: 0 20px 56px rgba(0,0,0,.3); }
        .drink-visual { aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; font-size: 64px; }
        .drink-emoji { animation: wobble 3s ease-in-out infinite; display: block; }
        @keyframes wobble { 0%,100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        .drink-info { padding: 18px; }
        .drink-name { font-family: 'Unbounded', sans-serif; font-size: 15px; font-weight: 700; margin-bottom: 5px; }
        .drink-vibe { font-size: 11px; opacity: .55; text-transform: uppercase; letter-spacing: .08em; }

        /* WAFFLES */
        .waffles-section { background: #0D1B2A; display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; padding: 100px 48px; }
        .waffles-visual { position: relative; display: flex; justify-content: center; align-items: center; }
        .waffle-emoji { font-size: 160px; animation: floatY 5s ease-in-out infinite; filter: drop-shadow(0 24px 48px rgba(0,0,0,.5)); }
        .w-badge { position: absolute; font-family: 'Unbounded', sans-serif; font-size: 11px; font-weight: 700; padding: 8px 16px; border-radius: 100px; letter-spacing: .05em; text-transform: uppercase; }
        .w-badge-1 { background: #FF3FA4; color: #fff; top: 18%; right: 0; animation: floatY 4s ease-in-out infinite; }
        .w-badge-2 { background: #AADC00; color: #0D1B2A; bottom: 18%; left: 0; animation: floatY 5.5s ease-in-out infinite reverse; }
        .waffle-chips { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 28px; }
        .waffle-chip { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 600; transition: background .2s; }
        .waffle-chip:hover { background: rgba(170,220,0,.12); border-color: rgba(170,220,0,.4); }

        /* LOCATIONS */
        .locations-section { background: #1B4FD8; padding: 100px 48px; text-align: center; }
        .locations-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-top: 52px; text-align: left; }
        .loc-card { background: rgba(255,255,255,.06); border: 2px solid rgba(255,255,255,.08); border-radius: 18px; padding: 32px 24px; transition: border-color .3s, background .3s, transform .3s; }
        .loc-card:hover { border-color: #AADC00; background: rgba(170,220,0,.07); transform: translateY(-4px); }
        .loc-num { font-family: 'Unbounded', sans-serif; font-size: 10px; font-weight: 700; color: #AADC00; letter-spacing: .18em; margin-bottom: 14px; }
        .loc-icon { font-size: 26px; margin-bottom: 10px; }
        .loc-name { font-family: 'Unbounded', sans-serif; font-size: 19px; font-weight: 700; margin-bottom: 6px; }
        .loc-addr { font-size: 13px; opacity: .58; line-height: 1.55; }

        /* FOOTER */
        footer { background: #0D1B2A; padding: 64px 48px 32px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 56px; padding-bottom: 44px; border-bottom: 1px solid rgba(255,255,255,.08); margin-bottom: 32px; }
        .footer-logo { margin-bottom: 16px; }
        .footer-logo img { height: 86px; width: auto; object-fit: contain; filter: brightness(0) invert(1); }
        .footer-tagline { font-size: 13px; opacity: .5; line-height: 1.65; max-width: 260px; }
        .footer-col h4 { font-family: 'Unbounded', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #AADC00; margin-bottom: 18px; }
        .footer-col ul { list-style: none; }
        .footer-col ul li { margin-bottom: 9px; }
        .footer-col ul a { color: rgba(255,255,255,.55); text-decoration: none; font-size: 14px; transition: color .2s; }
        .footer-col ul a:hover { color: #fff; }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; font-size: 11px; opacity: .38; flex-wrap: wrap; gap: 10px; }

        /* REVEAL */
        .reveal { opacity: 0; transform: translateY(36px); transition: opacity .7s ease, transform .7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* RESPONSIVE */
        @media (max-width: 1100px) { .locations-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 900px) {
          nav { padding: 14px 20px; }
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .hero { grid-template-columns: 1fr; padding: 100px 24px 60px; gap: 48px; text-align: center; }
          .hero-visual { order: -1; }
          .hero-cta { justify-content: center; }
          .hero-desc { margin: 0 auto 40px; }
          .hero-pill { margin: 0 auto 28px; }
          .about, .waffles-section { grid-template-columns: 1fr; gap: 48px; padding: 72px 24px; }
          .about-visual { display: none; }
          .categories { grid-template-columns: 1fr 1fr; }
          .menu-section, .locations-section { padding: 72px 24px; }
          footer { padding: 48px 24px 24px; }
          .footer-grid { grid-template-columns: 1fr; gap: 32px; }
          .lang-toggle { top: 14px; right: 14px; }
        }
        @media (max-width: 600px) {
          .hero-title { font-size: 40px; }
          .categories { grid-template-columns: 1fr; }
          .locations-grid { grid-template-columns: 1fr; }
          .menu-header { flex-direction: column; align-items: flex-start; }
          .hero-cards-row { flex-wrap: wrap; justify-content: center; }
        }
      `}</style>

      {/* LANG TOGGLE */}
      <div className="lang-toggle">
        <button className={`lang-btn${lang === 'ro' ? ' active' : ''}`} onClick={() => setLang('ro')}>RO</button>
        <button className={`lang-btn${lang === 'ru' ? ' active' : ''}`} onClick={() => setLang('ru')}>RU</button>
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)}>✕</button>
        {[['#about', tx.nav.about], ['#menu', tx.nav.menu], ['#waffles', tx.nav.waffles], ['#locations', tx.nav.locations]].map(([href, label]) => (
          <a key={href} href={href} onClick={() => setMobileOpen(false)}>{label}</a>
        ))}
      </div>

      {/* NAV */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="#" className="nav-logo">
          <img src="/logo.png" alt="Bubblepop" />
        </a>
        <ul className="nav-links">
          <li><a href="#about">{tx.nav.about}</a></li>
          <li><a href="#menu">{tx.nav.menu}</a></li>
          <li><a href="#waffles">{tx.nav.waffles}</a></li>
          <li><a href="#locations">{tx.nav.locations}</a></li>
        </ul>
        <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-word">BOBA</div>
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />

        <div className="hero-content">
          <div className="hero-pill">
            <span className="hero-pill-dot" />
            {tx.hero.tag}
          </div>
          <h1 className="hero-title">
            {tx.hero.line1}<br />
            <span className="accent">{tx.hero.line2}</span><br />
            {tx.hero.line3}<br />
            <span className="outline">{tx.hero.line4}</span>
          </h1>
          <p className="hero-desc">{tx.hero.desc}</p>
          <div className="hero-cta">
            <a href="#menu" className="btn-primary">{tx.hero.cta} →</a>
            <a href="#locations" className="btn-outline">{tx.hero.ctaAlt}</a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-logo-wrap">
            <img src="/logo.png" alt="Bubblepop" className="hero-logo-img" />
            <div className="hero-cards-row">
              {[
                { emoji: '🍓', label: tx.hero.card1, bg: 'linear-gradient(135deg,#AADC00,#5ec43c)' },
                { emoji: '🧋', label: tx.hero.card2, bg: 'linear-gradient(135deg,#1B4FD8,#4F7DFF)' },
                { emoji: '🧇', label: tx.hero.card3, bg: 'linear-gradient(135deg,#FF3FA4,#f7c430)' },
              ].map((c, i) => (
                <div className="hcard" key={i} style={{ background: c.bg }}>
                  <span className="hcard-emoji">{c.emoji}</span>
                  <span className="hcard-label">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...tx.marquee, ...tx.marquee].map((item, i) => <span key={i}>{item}</span>)}
        </div>
      </div>

      {/* ABOUT */}
      <section className="about reveal" id="about">
        <div>
          <div className="section-tag">{tx.about.tag}</div>
          <h2 className="section-title">{tx.about.title}</h2>
          <p className="about-text">{tx.about.p1}</p>
          <p className="about-text">{tx.about.p2}</p>
          <div className="stats-grid">
            {[tx.about.stat1, tx.about.stat2, tx.about.stat3, tx.about.stat4].map((s, i) => (
              <div className="stat-box" key={i}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="about-visual">
          <div className="av-card"><div className="av-inner" style={{ background: 'linear-gradient(135deg,#AADC00,#4fc83c)', height: '200px' }}>🍊🍋🥝</div></div>
          <div className="av-card"><div className="av-inner" style={{ background: 'linear-gradient(135deg,#1B4FD8,#0d1b2a)', height: '160px' }}>🧋</div></div>
          <div className="av-card"><div className="av-inner" style={{ background: 'linear-gradient(135deg,#FF3FA4,#cc2080)', height: '160px' }}>🧇</div></div>
        </div>
      </section>

      {/* CATEGORIES */}
      <div className="categories reveal">
        {tx.categories.map((c, i) => (
          <div className="cat-item" key={i}>
            <div className="cat-icon">{c.icon}</div>
            <div className="cat-name">{c.name}</div>
            <div className="cat-desc">{c.desc}</div>
          </div>
        ))}
      </div>

      {/* MENU */}
      <section className="menu-section reveal" id="menu">
        <div className="menu-header">
          <div>
            <div className="section-tag">{tx.menu.tag}</div>
            <h2 className="section-title">{tx.menu.title}</h2>
          </div>
          <div className="menu-tabs">
            {Object.entries(tx.menu.tabs).map(([key, label]) => (
              <button key={key} className={`tab-btn${menuFilter === key ? ' active' : ''}`} onClick={() => setMenuFilter(key)}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="menu-grid">
          {filtered.map(d => (
            <div className="drink-card" key={d.id}>
              <div className="drink-visual" style={{ background: d.bg }}>
                <span className="drink-emoji">{d.emoji}</span>
              </div>
              <div className="drink-info">
                <div className="drink-name">{lang === 'ro' ? d.name_ro : d.name_ru}</div>
                <div className="drink-vibe">{lang === 'ro' ? d.vibe_ro : d.vibe_ru}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WAFFLES */}
      <section className="waffles-section reveal" id="waffles">
        <div className="waffles-visual">
          <div className="waffle-emoji">🧇</div>
          <div className="w-badge w-badge-1">{tx.waffles.badge1}</div>
          <div className="w-badge w-badge-2">{tx.waffles.badge2}</div>
        </div>
        <div>
          <div className="section-tag">{tx.waffles.tag}</div>
          <h2 className="section-title">{tx.waffles.title}</h2>
          <p style={{ opacity: .7, lineHeight: 1.75, fontSize: '15px' }}>{tx.waffles.desc}</p>
          <div className="waffle-chips">
            {tx.waffles.items.map((item, i) => <div className="waffle-chip" key={i}>{item}</div>)}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="locations-section reveal" id="locations">
        <div className="section-tag">{tx.locations.tag}</div>
        <h2 className="section-title">{tx.locations.title}</h2>
        <p style={{ opacity: .6, fontSize: '15px', maxWidth: '480px', margin: '0 auto' }}>{tx.locations.desc}</p>
        <div className="locations-grid">
          {tx.locations.list.map(loc => (
            <div className="loc-card" key={loc.num}>
              <div className="loc-num">{loc.num}</div>
              <div className="loc-icon">📍</div>
              <div className="loc-name">{loc.name}</div>
              <div className="loc-addr">{loc.addr}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <img src="/logo.png" alt="Bubblepop" style={{ width: 'clamp(80px, 12vw, 160px)', height: 'auto' }} />
            </div>
            <div className="footer-tagline">{tx.footer.tagline}</div>
          </div>
          <div className="footer-col">
            <h4>{tx.footer.menuTitle}</h4>
            <ul>
              {tx.footer.menuItems.map(item => <li key={item}><a href="#menu">{item}</a></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h4>{tx.footer.contactTitle}</h4>
            <ul>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a></li>
              <li><a href="mailto:hello@bubblepop.md">hello@bubblepop.md</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Bubblepop. {tx.footer.copyright}</span>
          <span>{tx.footer.city}</span>
        </div>
      </footer>
    </>
  )
}
