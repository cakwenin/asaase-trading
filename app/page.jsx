"use client";
import { useState, useEffect, useRef } from "react";

const COLORS = {
  darkGreen: "#1B4332",
  midGreen: "#2D6A4F",
  lightGreen: "#40916C",
  gold: "#D4A017",
  darkGold: "#B8860B",
  cream: "#FDF8F0",
  offWhite: "#FAF6F1",
  darkText: "#1A1A1A",
  medText: "#3D3D3D",
  lightText: "#6B6B6B",
  white: "#FFFFFF",
  paleGreen: "#D8F3DC",
  softGreen: "#E8F5E9",
};

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const GlobeIcon = ({ size = 48, color = COLORS.gold }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="2" fill="none" />
    <ellipse cx="24" cy="24" rx="10" ry="22" stroke={color} strokeWidth="1.5" fill="none" />
    <path d="M4 18h40M4 30h40" stroke={color} strokeWidth="1.2" />
    <path d="M18 6c-4 6-5 14-3 20s6 14 12 16" stroke={color} strokeWidth="1.2" fill="none" opacity="0.5" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill={COLORS.gold} />
    <path d="M6 10.5l2.5 2.5 5.5-5.5" stroke={COLORS.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowDown = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14m-6-6l6 6 6-6" stroke={COLORS.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14m-6-6l6 6-6 6" stroke={COLORS.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function AsaaseWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Products", id: "products" },
    { label: "How It Works", id: "process" },
    { label: "Contact", id: "contact" },
  ];

  const categories = [
    { title: "Sugar", desc: "ICUMSA 45, 150, VHP — Bulk & container options. 12,500–200,000 MT.", emoji: "🍬" },
    { title: "Grains & Oilseeds", desc: "Soybean, corn, wheat, soybean meal, popcorn. 12,500–200,000 MT.", emoji: "🌾" },
    { title: "Edible Oils", desc: "Refined & crude sunflower and soybean oil. CIF pricing available.", emoji: "🫒" },
    { title: "Rice", desc: "Parboiled, white, brown — Type 1 & premium grades. 25kg/50kg/retail.", emoji: "🍚" },
    { title: "Beans & Legumes", desc: "Black beans, cowpea varieties, chickpeas, lentils, peas. FOB & CIF.", emoji: "🫘" },
    { title: "Nuts & Seeds", desc: "Cashew W320 & W240, peanuts, pecans, sesame, cloves.", emoji: "🥜" },
    { title: "Oats & Oat Products", desc: "Rolled oats, oat flour, oat bran, hulled oats. Multiple grades.", emoji: "🥣" },
    { title: "Fertilisers", desc: "Urea, MAP, DAP, KCL, triple & single superphosphate, protected urea.", emoji: "🧪" },
  ];

  const steps = [
    { num: "01", title: "Buyer Request", desc: "A Ghanaian buyer submits a requirement — commodity, volume, specs, and terms." },
    { num: "02", title: "Supplier Match", desc: "We identify the best-fit supplier from our Brazilian network." },
    { num: "03", title: "Negotiate & Contract", desc: "We coordinate pricing, Incoterms, packaging, and contract execution." },
    { num: "04", title: "Ship & Deliver", desc: "Logistics arranged from Brazilian port to Ghana, tracked through to delivery." },
    { num: "05", title: "Deal Complete", desc: "Goods delivered, buyer satisfied, Asaase earns its commission." },
  ];

  const whyItems = [
    { title: "Deep Local Knowledge", desc: "Over a decade of experience in Ghana's agro-commodity market." },
    { title: "Established Supplier Network", desc: "Direct relationships with Brazilian exporters across 8 product categories." },
    { title: "Zero-Risk Model", desc: "Pure brokerage — we only earn when a deal closes. No upfront fees." },
    { title: "End-to-End Facilitation", desc: "From sourcing to delivery, we manage the complexity." },
  ];

  return (
    <div style={{ fontFamily: "'Libre Baskerville', 'Georgia', serif", color: COLORS.darkText, background: COLORS.cream, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${COLORS.cream}; }
        ::selection { background: ${COLORS.gold}; color: ${COLORS.white}; }
        .sans { font-family: 'DM Sans', sans-serif; }
        .nav-link { cursor: pointer; position: relative; padding: 4px 0; font-size: 14px; letter-spacing: 0.5px; font-family: 'DM Sans', sans-serif; color: ${COLORS.paleGreen}; text-transform: uppercase; font-weight: 500; transition: color 0.3s; border: none; background: none; }
        .nav-link:hover { color: ${COLORS.gold}; }
        .hero-pattern { position: absolute; inset: 0; opacity: 0.04; background-image: radial-gradient(${COLORS.gold} 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
        .product-card { background: ${COLORS.white}; border-radius: 12px; padding: 28px 24px; transition: transform 0.3s, box-shadow 0.3s; cursor: default; border: 1px solid rgba(27,67,50,0.06); }
        .product-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(27,67,50,0.1); }
        .gold-btn { display: inline-flex; align-items: center; gap: 8px; background: ${COLORS.gold}; color: ${COLORS.white}; border: none; padding: 14px 32px; border-radius: 6px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.3s, transform 0.15s; letter-spacing: 0.3px; }
        .gold-btn:hover { background: ${COLORS.darkGold}; transform: translateY(-1px); }
        .outline-btn { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: ${COLORS.gold}; border: 2px solid ${COLORS.gold}; padding: 12px 30px; border-radius: 6px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s; letter-spacing: 0.3px; }
        .outline-btn:hover { background: ${COLORS.gold}; color: ${COLORS.white}; }
        .stat-card { text-align: center; padding: 24px 16px; }
        .section-label { font-family: 'DM Sans', sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 3px; font-weight: 600; color: ${COLORS.gold}; margin-bottom: 12px; }
        .section-title { font-size: clamp(26px, 4vw, 42px); font-weight: 700; color: ${COLORS.darkGreen}; line-height: 1.2; margin-bottom: 16px; }
        .section-title-white { font-size: clamp(26px, 4vw, 42px); font-weight: 700; color: ${COLORS.white}; line-height: 1.2; margin-bottom: 16px; }
        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; }
        .hamburger span { display: block; width: 24px; height: 2px; background: ${COLORS.paleGreen}; margin: 5px 0; transition: 0.3s; }
        .mobile-menu { display: none; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .steps-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 24px; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
        .hero-stats { display: flex; }
        .footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }

        @media (max-width: 768px) {
          .hamburger { display: block; }
          .desktop-nav { display: none !important; }
          .mobile-menu {
            display: flex; flex-direction: column;
            position: fixed; top: 0; right: 0; width: 280px; height: 100vh;
            background: ${COLORS.darkGreen}; padding: 80px 32px 32px; gap: 24px; z-index: 999;
            transform: translateX(100%); transition: transform 0.35s cubic-bezier(.22,1,.36,1);
          }
          .mobile-menu.open { transform: translateX(0); }
          .mobile-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 998;
            opacity: 0; pointer-events: none; transition: opacity 0.3s;
          }
          .mobile-overlay.open { opacity: 1; pointer-events: all; }
          .hero-stats { flex-direction: column; }
          .stat-card { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .stat-card:last-child { border-bottom: none; }
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .product-grid { grid-template-columns: 1fr; gap: 16px; }
          .product-card { padding: 24px 20px; }
          .steps-grid { grid-template-columns: 1fr; gap: 32px; }
          .section-label { font-size: 11px; letter-spacing: 2px; }
          .gold-btn, .outline-btn { width: 100%; justify-content: center; }
          .hero-buttons { flex-direction: column; }
          .footer-inner { flex-direction: column; text-align: center; }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .steps-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
          .product-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* ─── NAV ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? COLORS.darkGreen : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.4s, box-shadow 0.4s",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.15)" : "none",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => scrollTo("hero")}>
            <GlobeIcon size={28} />
            <span className="sans" style={{ color: COLORS.white, fontWeight: 700, fontSize: isMobile ? 13 : 16, letterSpacing: 1.5, textTransform: "uppercase" }}>Asaase Trading Co.</span>
          </div>
          <div className="desktop-nav" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {navLinks.map((l) => (
              <button key={l.id} className="nav-link" onClick={() => scrollTo(l.id)}>{l.label}</button>
            ))}
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ zIndex: 1001 }}>
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>
      </nav>

      <div className={`mobile-overlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map((l) => (
          <button key={l.id} className="nav-link" style={{ fontSize: 18, textAlign: "left" }} onClick={() => scrollTo(l.id)}>{l.label}</button>
        ))}
      </div>

      {/* ─── HERO ─── */}
      <section id="hero" style={{ background: `linear-gradient(165deg, ${COLORS.darkGreen} 0%, #163728 50%, ${COLORS.midGreen} 100%)`, position: "relative", overflow: "hidden", paddingTop: isMobile ? 100 : 120, paddingBottom: isMobile ? 60 : 80 }}>
        <div className="hero-pattern" />
        <div style={{ position: "absolute", top: -120, right: -120, width: 400, height: 400, borderRadius: "50%", background: COLORS.gold, opacity: 0.04 }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: COLORS.gold, opacity: 0.03 }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ maxWidth: 720 }}>
              <div className="sans section-label" style={{ color: COLORS.gold, marginBottom: 20 }}>Trade Facilitation Platform</div>
              <h1 style={{ fontSize: "clamp(32px, 5.5vw, 64px)", fontWeight: 700, color: COLORS.white, lineHeight: 1.1, marginBottom: 24 }}>
                Your gateway to Ghana's commodity market
              </h1>
              <p className="sans" style={{ fontSize: isMobile ? 16 : 18, color: COLORS.paleGreen, lineHeight: 1.7, marginBottom: 36, maxWidth: 560 }}>
                Asaase Trading Co. connects Brazilian commodity suppliers with buyers in Ghana — facilitating deals across sugar, grains, rice, and more.
              </p>
              <div className="hero-buttons" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button className="gold-btn" onClick={() => scrollTo("contact")}>Get in Touch</button>
                <button className="outline-btn" onClick={() => scrollTo("products")}>View Products</button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="hero-stats" style={{ marginTop: isMobile ? 40 : 64, borderRadius: 12, overflow: "hidden", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {[
                { num: "GH₵38.95B", label: "Ghana food imports (2024)" },
                { num: "8", label: "Product categories" },
                { num: "200,000 MT", label: "Max order volume" },
              ].map((s, i) => (
                <div key={i} className="stat-card" style={{ flex: isMobile ? undefined : 1, borderRight: (!isMobile && i < 2) ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                  <div style={{ fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 700, color: COLORS.gold, marginBottom: 6 }}>{s.num}</div>
                  <div className="sans" style={{ fontSize: 13, color: COLORS.paleGreen, letterSpacing: 0.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.darkGold}, ${COLORS.gold})` }} />
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" style={{ padding: isMobile ? "64px 20px" : "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="about-grid">
          <FadeIn>
            <div>
              <div className="section-label">About Us</div>
              <h2 className="section-title">Bridging global supply to local demand</h2>
              <p className="sans" style={{ fontSize: isMobile ? 15 : 16, color: COLORS.medText, lineHeight: 1.8, marginBottom: 24 }}>
                Ghana imports over half its food supply. Buyers face fragmented supply chains, trust gaps, and complex logistics when sourcing internationally. Asaase Trading Co. solves this.
              </p>
              <p className="sans" style={{ fontSize: isMobile ? 15 : 16, color: COLORS.medText, lineHeight: 1.8, marginBottom: 32 }}>
                We are a trade facilitation platform that connects vetted Brazilian commodity exporters with Ghanaian buyers. As a pure broker, we coordinate the full deal — sourcing, negotiation, contracts, and logistics — earning a commission only when the trade is completed.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {whyItems.map((w, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ marginTop: 2, flexShrink: 0 }}><CheckIcon /></div>
                    <div>
                      <div className="sans" style={{ fontWeight: 600, fontSize: 15, color: COLORS.darkGreen }}>{w.title}</div>
                      <div className="sans" style={{ fontSize: 14, color: COLORS.lightText, marginTop: 2 }}>{w.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ background: `linear-gradient(145deg, ${COLORS.darkGreen}, ${COLORS.midGreen})`, borderRadius: 16, padding: isMobile ? 32 : 48, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: COLORS.gold, opacity: 0.08 }} />
              <div style={{ position: "absolute", bottom: -30, left: -30, width: 150, height: 150, borderRadius: "50%", background: COLORS.gold, opacity: 0.05 }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <GlobeIcon size={isMobile ? 48 : 64} color={COLORS.gold} />
                <div style={{ marginTop: 24, fontSize: isMobile ? 40 : 48, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>10+</div>
                <div className="sans" style={{ fontSize: 15, color: COLORS.paleGreen, marginTop: 8 }}>Years of commodity trading experience in Ghana</div>
                <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "28px 0" }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.white }}>8</div>
                    <div className="sans" style={{ fontSize: 13, color: COLORS.paleGreen }}>Product categories</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.white }}>Brazil</div>
                    <div className="sans" style={{ fontSize: 13, color: COLORS.paleGreen }}>Primary source market</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── PRODUCTS ─── */}
      <section id="products" style={{ background: COLORS.white, padding: isMobile ? "64px 20px" : "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 56 }}>
              <div className="section-label">Product Catalogue</div>
              <h2 className="section-title">Brazilian export commodities</h2>
              <p className="sans" style={{ fontSize: isMobile ? 15 : 16, color: COLORS.lightText, maxWidth: 560, margin: "0 auto" }}>
                All products available on monthly contract or spot purchase. FOB and CIF terms available.
              </p>
            </div>
          </FadeIn>
          <div className="product-grid">
            {categories.map((c, i) => (
              <FadeIn key={i} delay={isMobile ? 0 : i * 0.06}>
                <div className="product-card">
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{c.emoji}</div>
                  <h3 className="sans" style={{ fontSize: 17, fontWeight: 700, color: COLORS.darkGreen, marginBottom: 8 }}>{c.title}</h3>
                  <p className="sans" style={{ fontSize: 14, color: COLORS.lightText, lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.1}>
            <div className="sans" style={{ textAlign: "center", marginTop: isMobile ? 24 : 40, padding: "16px 20px", background: COLORS.softGreen, borderRadius: 10, fontSize: isMobile ? 13 : 14, color: COLORS.midGreen }}>
              Quantities range from 5 containers to 200,000 metric tonnes · All products sourced from Brazil
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="process" style={{ background: `linear-gradient(165deg, ${COLORS.darkGreen}, ${COLORS.midGreen})`, padding: isMobile ? "64px 20px" : "100px 24px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 64 }}>
              <div className="section-label">Process</div>
              <h2 className="section-title-white">How it works</h2>
              <p className="sans" style={{ fontSize: isMobile ? 15 : 16, color: COLORS.paleGreen, maxWidth: 500, margin: "0 auto" }}>
                From request to delivery, we manage every step of the trade.
              </p>
            </div>
          </FadeIn>

          <div className="steps-grid">
            {steps.map((s, i) => (
              <FadeIn key={i} delay={isMobile ? 0 : i * 0.1}>
                <div style={{ textAlign: "center", position: "relative" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%", background: COLORS.gold,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px", position: "relative", zIndex: 1,
                    boxShadow: "0 4px 16px rgba(212,160,23,0.3)"
                  }}>
                    <span className="sans" style={{ color: COLORS.white, fontWeight: 700, fontSize: 16 }}>{s.num}</span>
                  </div>
                  <h4 style={{ fontSize: 17, color: COLORS.white, fontWeight: 700, marginBottom: 10 }}>{s.title}</h4>
                  <p className="sans" style={{ fontSize: 13, color: COLORS.paleGreen, lineHeight: 1.6, maxWidth: isMobile ? 300 : "none", margin: isMobile ? "0 auto" : undefined }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? 12 : 20, marginTop: isMobile ? 48 : 64, flexDirection: isMobile ? "column" : "row" }}>
              <div style={{ background: COLORS.softGreen, borderRadius: 12, padding: isMobile ? "20px 24px" : "24px 32px", textAlign: "center", minWidth: isMobile ? "unset" : 180, width: isMobile ? "100%" : "auto" }}>
                <div className="sans" style={{ fontWeight: 700, fontSize: 13, color: COLORS.darkGreen, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Brazilian Suppliers</div>
                <div className="sans" style={{ fontSize: 12, color: COLORS.lightText }}>Sugar · Grains · Rice · Oils</div>
              </div>
              {isMobile ? <ArrowDown /> : <ArrowRight />}
              <div style={{ background: COLORS.gold, borderRadius: 12, padding: isMobile ? "20px 24px" : "24px 32px", textAlign: "center", minWidth: isMobile ? "unset" : 200, width: isMobile ? "100%" : "auto", boxShadow: "0 8px 32px rgba(212,160,23,0.3)" }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.white, marginBottom: 4 }}>Asaase Trading Co.</div>
                <div className="sans" style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontStyle: "italic" }}>Broker & Facilitator</div>
              </div>
              {isMobile ? <ArrowDown /> : <ArrowRight />}
              <div style={{ background: "#FFF8E1", borderRadius: 12, padding: isMobile ? "20px 24px" : "24px 32px", textAlign: "center", minWidth: isMobile ? "unset" : 180, width: isMobile ? "100%" : "auto" }}>
                <div className="sans" style={{ fontWeight: 700, fontSize: 13, color: COLORS.darkGold, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Ghanaian Buyers</div>
                <div className="sans" style={{ fontSize: 12, color: COLORS.lightText }}>Distributors · Processors</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" style={{ background: `linear-gradient(165deg, ${COLORS.darkGreen}, #163728)`, padding: isMobile ? "64px 20px" : "100px 24px", position: "relative" }}>
        <div className="hero-pattern" />
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <GlobeIcon size={isMobile ? 44 : 56} color={COLORS.gold} />
            <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 700, color: COLORS.white, marginTop: 24, marginBottom: 12 }}>Let's talk</h2>
            <p className="sans" style={{ fontSize: isMobile ? 15 : 17, color: COLORS.paleGreen, marginBottom: isMobile ? 32 : 48, lineHeight: 1.7 }}>
              Whether you're a buyer looking for reliable commodity supply into Ghana, or a supplier seeking access to the Ghanaian market — we'd love to hear from you.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: isMobile ? "28px 20px" : "40px 32px", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: "Email", value: "info@asaasetrading.com", icon: "✉" },
                  { label: "Phone", value: "+233 508 997 104", icon: "☎" },
                  { label: "Location", value: "Accra, Ghana", icon: "📍" },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center" }}>
                    <span style={{ fontSize: 20 }}>{c.icon}</span>
                    <div style={{ textAlign: "left" }}>
                      <div className="sans" style={{ fontSize: 12, color: COLORS.gold, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{c.label}</div>
                      <div className="sans" style={{ fontSize: isMobile ? 14 : 16, color: COLORS.white, wordBreak: "break-word" }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: "#0F2B1E", padding: isMobile ? "24px 20px" : "32px 24px", borderTop: `3px solid ${COLORS.gold}` }}>
        <div className="footer-inner" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <GlobeIcon size={24} />
            <span className="sans" style={{ color: COLORS.paleGreen, fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>ASAASE TRADING CO.</span>
          </div>
          <div className="sans" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            © 2026 Asaase Trading Co. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}