import { useEffect, useState } from 'react';
import type { FormEvent, MouseEvent, ReactNode } from 'react';
import './index.css';
import {
  AnimeMascot,
  HeroCameraStage,
  PlugPet,
  ProductLiveVisual,
  ServiceLiveIcon,
  WorkLiveDiagram,
} from './components/AnimeHardwareVisuals';
import { AnimeWorkshopBench } from './components/AnimeWorkshopBench';

// GitHub Pages serves the site from /<repo>/, so strip that prefix when routing.
const BASE_PATH = __BASE_PATH__;
const currentPath = () => {
  const { pathname } = window.location;
  const path = BASE_PATH && pathname.startsWith(BASE_PATH) ? pathname.slice(BASE_PATH.length) : pathname;
  return path.replace(/\/$/, '') || '/';
};

const PHONE = 'tel:+918686272266';
// Launch check: confirm with the owner that 086862 72266 is WhatsApp-enabled before publishing.
const WA_NUMBER = '918686272266';
const wa = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

const ADDRESS =
  'Shop 21, Market Road, near Saibaba Temple, Shapur Nagar, Chinthal, Jeedimetla, Hyderabad, Telangana 500055';
const MAP =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(
    'INFLUX SYSTEMS Shop 21 Market Road near Saibaba Temple Shapur Nagar Jeedimetla Hyderabad 500055'
  );

const links: [string, string][] = [
  ['/services', 'Services'],
  ['/work', 'Work'],
  ['/shop', 'Shop'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
];

const serviceNames = [
  'Computer repair',
  'New PC build',
  'Laptop repair',
  'CCTV installation',
  'CCTV repair',
  'Networking',
  'Printer',
  'AMC',
  'Other',
];

const services: {
  no: string;
  name: string;
  desc: string;
  included: string;
  audience: string;
  booking: string;
  liveKind: 'computer' | 'cctv' | 'network' | 'printer';
}[] = [
  {
    no: '01',
    name: 'Computer sales & service',
    desc: 'New setups, repairs and upgrades that make sense for you.',
    included:
      'Desktop & laptop repair / PC builds / SSD & RAM upgrades / Data recovery enquiries',
    audience: 'Homes, students, shops and offices',
    booking: 'Computer repair',
    liveKind: 'computer',
  },
  {
    no: '02',
    name: 'CCTV & surveillance',
    desc: 'See what matters. Installations, repairs and ongoing care.',
    included:
      'Camera installation / DVR & NVR setup / Fault finding / AMC enquiries',
    audience: 'Homes, shops, offices and small factories',
    booking: 'CCTV installation',
    liveKind: 'cctv',
  },
  {
    no: '03',
    name: 'Networks & office',
    desc: 'Dependable connections from the first desk to the back room.',
    included:
      'Wi-Fi setup / Cabling / Router configuration / Office tech setup',
    audience: 'Shops, offices and small factories',
    booking: 'Networking',
    liveKind: 'network',
  },
  {
    no: '04',
    name: 'Printers & accessories',
    desc: 'The practical bits that keep the working day moving.',
    included: 'Printer help / Peripherals / Components / Accessories',
    audience: 'Anyone who needs the right part or a second opinion',
    booking: 'Printer',
    liveKind: 'printer',
  },
];

const products = [
  {
    slug: 'cctv-camera',
    name: 'CCTV camera',
    category: 'CCTV',
    tag: 'SURVEILLANCE',
    detail: 'Indoor / outdoor options',
    specs: [
      'Indoor and outdoor options',
      'Night-vision IR choices',
      'Wired BNC & IP system options',
      'Installation help available',
    ],
    icon: 'camera',
    featured: false,
  },
  {
    slug: 'desktop-pc',
    name: 'Desktop PC',
    category: 'Computers',
    tag: 'COMPUTING',
    detail: 'Built around your needs',
    specs: [
      'Home and office configurations',
      'Storage and memory options',
      'Monitor and peripheral advice',
      'Setup support available',
    ],
    icon: 'desktop',
    featured: false,
  },
  {
    slug: 'ssd-upgrade',
    name: 'SSD upgrade',
    category: 'Components',
    tag: 'COMPONENTS',
    detail: 'A faster everyday machine',
    specs: [
      'Laptop and desktop NVMe / SATA options',
      'Capacity options to discuss',
      'Compatibility check before purchase',
      'Installation & OS setup enquiry available',
    ],
    icon: 'drive',
    featured: true,
  },
  {
    slug: 'wifi-router',
    name: 'Wi-Fi router',
    category: 'Networking',
    tag: 'CONNECTIVITY',
    detail: 'For home or office',
    specs: [
      'Single and dual-band options',
      'Room & office coverage advice',
      'Setup and cabling enquiry',
      'Compatibility check available',
    ],
    icon: 'router',
    featured: false,
  },
  {
    slug: 'keyboard-mouse',
    name: 'Keyboard & mouse',
    category: 'Accessories',
    tag: 'ACCESSORIES',
    detail: 'Everyday essentials',
    specs: [
      'Wired and wireless combos',
      'Home and office durability',
      'Compatibility advice',
      'Ask for current models in stock',
    ],
    icon: 'keyboard',
    featured: false,
  },
  {
    slug: 'printer',
    name: 'Printer',
    category: 'Printers',
    tag: 'PRINTING',
    detail: 'Print, scan & office needs',
    specs: [
      'Ink-tank and laser options to discuss',
      'Print and scan choices',
      'USB and Wi-Fi connectivity advice',
      'Setup help available',
    ],
    icon: 'printer',
    featured: false,
  },
];

function serviceToLiveKind(service: string): 'computer' | 'cctv' | 'network' | 'printer' {
  const s = service.toLowerCase();
  if (s.includes('cctv')) return 'cctv';
  if (s.includes('network')) return 'network';
  if (s.includes('printer')) return 'printer';
  return 'computer';
}

function Link({
  href,
  children,
  className = '',
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const url = href.startsWith('/') ? `${BASE_PATH}${href}` : href;

  function click(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.();
    if (href.startsWith('/') && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      window.history.pushState({}, '', url);
      window.dispatchEvent(new Event('navigate'));
      window.scrollTo(0, 0);
    }
  }
  return (
    <a href={url} className={className} onClick={click}>
      {children}
    </a>
  );
}

const Arrow = () => (
  <span className="arrow" aria-hidden="true">
    ↗
  </span>
);

function Button({
  href,
  children,
  kind = 'dark',
}: {
  href: string;
  children: ReactNode;
  kind?: 'dark' | 'red' | 'outline';
}) {
  const cls = `btn btn-${kind}`;
  return href.startsWith('/') ? (
    <Link href={href} className={cls}>
      {children}
      <Arrow />
    </Link>
  ) : (
    <a
      href={href}
      className={cls}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
      <Arrow />
    </a>
  );
}

const Label = ({ children }: { children: ReactNode }) => (
  <span className="label">{children}</span>
);

function SectionHeading({
  no,
  kicker,
  title,
  desc,
  href,
  action,
}: {
  no: string;
  kicker: string;
  title: string;
  desc?: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <Label>
          [{no}] {kicker}
        </Label>
        <h2>{title}</h2>
        {desc && <p>{desc}</p>}
      </div>
      {href && (
        <Link href={href} className="text-link">
          {action} <Arrow />
        </Link>
      )}
    </div>
  );
}

function Intro({
  no,
  kicker,
  title,
  desc,
}: {
  no: string;
  kicker: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="page-intro">
      <Label>
        [{no}] {kicker}
      </Label>
      <h1>{title}</h1>
      <p>{desc}</p>
      <span className="intro-plus">+</span>
    </div>
  );
}

function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="brand">
          <span className="brand-icon">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>
            INFLUX<span className="brand-light"> SYSTEMS</span>
            <small>TECH THAT SHOWS UP.</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([href, text]) => (
            <Link
              href={href}
              key={href}
              className={path === href || path.startsWith(href + '/') ? 'active' : ''}
            >
              {text}
            </Link>
          ))}
        </nav>

        <div className="header-right">
          <a href={PHONE} className="header-phone">
            086862 72266 <Arrow />
          </a>
          <Button href="/book" kind="red">
            Book a service
          </Button>
        </div>

        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {links.map(([href, text]) => (
            <Link href={href} key={href} onClick={() => setOpen(false)}>
              {text}
              <Arrow />
            </Link>
          ))}
          <Link href="/book" onClick={() => setOpen(false)}>
            Book a service
            <Arrow />
          </Link>
        </nav>
      )}
    </header>
  );
}

function MobileBar() {
  return (
    <div className="mobile-bar">
      <Button href="/book" kind="red">
        Book a service
      </Button>
      <a href={PHONE}>
        Call now <Arrow />
      </a>
    </div>
  );
}

function ClockStatus() {
  const [time, setTime] = useState('--:--');
  const [dayWindow, setDayWindow] = useState(true);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(now);
      setTime(formatted);
      const hr = Number(formatted.split(':')[0]);
      // Provisional daytime service window indicator (10:00–20:00 IST); hours note instructs callers to confirm.
      setDayWindow(hr >= 10 && hr < 20);
    };
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="hero-console">
      <span>
        <i /> {dayWindow ? 'SERVICE CONSOLE / DAY BENCH ACTIVE' : 'AFTER HOURS / WHATSAPP QUEUE OPEN'}
      </span>
      <span>{time} IST</span>
    </div>
  );
}

function WorkCard({
  no,
  title,
  category,
  desc,
  type,
  area,
}: {
  no: string;
  title: string;
  category: string;
  desc: string;
  type: string;
  area?: string;
}) {
  return (
    <Link href="/work/representative-job" className="work-card">
      <WorkLiveDiagram type={type} />
      <div className="work-info">
        <span className="label">
          {no} / {category} {area ? `/ ${area}` : ''}
        </span>
        <Arrow />
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </Link>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[number];
  index: number;
}) {
  return (
    <Link href={`/shop/${product.slug}`} className="product-card">
      <ProductLiveVisual icon={product.icon} badge={product.featured} />
      <div className="product-info">
        <Label>
          0{index + 1} / {product.tag}
        </Label>
        <h3>{product.name}</h3>
        <p>{product.detail}</p>
        <span>
          Enquire <Arrow />
        </span>
      </div>
    </Link>
  );
}

function MapPanel() {
  return (
    <div className="map-panel">
      <div className="blueprint-grid" />
      <div className="road road-a" />
      <div className="road road-b" />
      {/* Live pulsing signal radar ring around shop pin */}
      <span className="map-ping" aria-hidden="true" />
      <span className="map-marker">
        <i>✳</i>
        <b>
          INFLUX
          <br />
          SYSTEMS
        </b>
      </span>
      <span className="map-road-label">MARKET ROAD · NEAR SAIBABA TEMPLE</span>
      <span className="map-area-label">SHAPUR NAGAR / JEEDIMETLA 500055</span>
      <span className="map-coordinate">[ LOCAL NODE / HYDERABAD ]</span>
    </div>
  );
}

function Home() {
  return (
    <>
      <div className="hero">
        <div className="hero-copy">
          <Label>[NODE.01] &nbsp; COMPUTER SERVICES · CCTV · NETWORKS</Label>
          <h1>
            <span>SYSTEMS</span>
            <span className="outline">THAT</span>
            <span className="red">WORK.</span>
          </h1>
          <p>
            Computer sales &amp; service, CCTV, networking and office setups. Human support. Machine
            precision.
          </p>
          <div className="hero-actions">
            <Button href="/book" kind="red">
              Book a service
            </Button>
            <Button href={PHONE} kind="outline">
              Call now
            </Button>
          </div>
          <div className="hero-rating">
            <div className="split-flap">
              <span>4</span>
              <span>.</span>
              <span>8</span>
            </div>
            <div>
              <strong>★★★★★</strong>
              <small>
                43 Google reviews
                <br />
                Reasonable price · Polite staff
              </small>
            </div>
          </div>
          <ClockStatus />
        </div>
        <HeroCameraStage hero />
      </div>

      {/* Terminal Ticker */}
      <div className="ticker">
        <div>
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i}>
              &gt; SYSTEM CHECK / PASS <b>✳</b> &gt; CCTV / NETWORK / ONLINE <b>✳</b> &gt; PC &amp;
              LAPTOP REPAIR BENCH / READY <b>✳</b> &gt; SHAPUR NAGAR · JEEDIMETLA · CHINTHAL <b>✳</b>{' '}
            </span>
          ))}
        </div>
      </div>

      {/* Services with Live Animated Hardware Scenes */}
      <section className="section services-home">
        <SectionHeading
          no="02"
          kicker="WHAT WE DO"
          title={'The right fix.\nNo runaround.'}
          desc="From a noisy laptop fan to cameras and Wi-Fi across a whole shop or factory, bring us the problem."
          href="/services"
          action="Explore all services"
        />
        <div className="service-grid">
          {services.map((s) => (
            <Link
              href={`/book?service=${encodeURIComponent(s.booking)}`}
              className="service-tile"
              key={s.no}
            >
              <div>
                <span className="label">{s.no} / 04</span>
                <ServiceLiveIcon kind={s.liveKind} />
              </div>
              <div>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
              </div>
              <Arrow />
            </Link>
          ))}
        </div>
        <AnimeMascot kind="mono" />
      </section>

      {/* Interactive Live Anime Repair Workbench Section */}
      <AnimeWorkshopBench
        renderBookingButton={(service, label) => (
          <Button href={`/book?service=${encodeURIComponent(service)}`} kind="red">
            {label}
          </Button>
        )}
      />

      {/* Selected Work Scopes with Live Diagrams */}
      <section className="section work-home">
        <SectionHeading
          no="03"
          kicker="THE WORK"
          title="Built to keep going."
          desc="A look at the kinds of problems we take on, from a single slow PC to full premises surveillance and cabling."
          href="/work"
          action="See work scopes"
        />
        <div className="work-grid">
          <WorkCard
            no="01"
            category="CCTV / SURVEILLANCE"
            title="Eyes on the whole place."
            desc="Camera placement, night-IR coverage, DVR/NVR recording setup and mobile viewing you can actually use."
            type="cctv"
          />
          <WorkCard
            no="02"
            category="NETWORK / OFFICE"
            title="An office that connects."
            desc="Wi-Fi, CAT6 cabling, routers and office PCs working together instead of dropping out mid-day."
            type="network"
          />
        </div>
        <p className="disclosure">
          Illustrative service scopes shown on blueprint panels. Actual job photography will be
          added as owner-confirmed photos arrive.
        </p>
      </section>

      {/* Shop Preview with Animated Hardware Files */}
      <section className="section shop-home">
        <SectionHeading
          no="04"
          kicker="FROM THE SHOP"
          title={'Good gear.\nGood advice.'}
          desc="Not sure what fits your motherboard or office? Ask a real technician before you buy."
          href="/shop"
          action="Browse the shop"
        />
        <div className="product-grid">
          {products.slice(0, 3).map((p, i) => (
            <ProductCard product={p} index={i} key={p.slug} />
          ))}
        </div>
        <AnimeMascot kind="router" />
      </section>

      {/* Google Reputation & Real Customer Signal */}
      <section className="review-band">
        <div>
          <Label>[05] THE LOCAL SIGNAL</Label>
          <h2>
            A shop you can
            <br />
            <em>actually reach.</em>
          </h2>
          <div className="review-quotes">
            <blockquote>
              “Reasonable price · Polite staff”
              <cite>Google review summary · INFLUX SYSTEMS</cite>
            </blockquote>
          </div>
        </div>
        <div className="review-right">
          <div className="split-flap">
            <span>4</span>
            <span>.</span>
            <span>8</span>
          </div>
          <strong>★★★★★</strong>
          <p>
            Rated 4.8★ across 43 Google reviews in Shapur Nagar. Need help with a computer, CCTV
            setup or office network? Start with a quick call or WhatsApp.
          </p>
          <Button href={PHONE} kind="outline">
            Talk to us
          </Button>
        </div>
      </section>

      {/* Visit / Location */}
      <section className="section location-home">
        <SectionHeading
          no="06"
          kicker="FIND THE SHOP"
          title={'Right here in\nShapur Nagar.'}
          desc="A real neighbourhood tech shop near Saibaba Temple, Market Road—not a distant call centre."
        />
        <div className="location-grid">
          <MapPanel />
          <div className="location-copy">
            <Label>VISIT / 01</Label>
            <h3>
              Come by.
              <br />
              We&apos;ll take a look.
            </h3>
            <p>{ADDRESS}</p>
            <Button href={MAP}>Get directions</Button>
            <a href={PHONE} className="text-link">
              Call before you visit <Arrow />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Filter({
  options,
  value,
  change,
  label,
}: {
  options: string[];
  value: string;
  change: (s: string) => void;
  label: string;
}) {
  return (
    <div className="filter">
      <Label>FILTER / {label}</Label>
      <div>
        {options.map((o) => (
          <button
            key={o}
            onClick={() => change(o)}
            className={value === o ? 'selected' : ''}
            aria-pressed={value === o}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Work() {
  const [filter, setFilter] = useState('All');
  // Sample/representative service scopes marked clearly in code and disclosed in copy—no invented client names.
  const cases = [
    {
      no: '01',
      category: 'CCTV',
      title: 'Eyes on the whole place.',
      desc: 'Camera placement, night-IR coverage, DVR/NVR recording and phone viewing setup.',
      type: 'cctv',
      area: 'SHAPUR NAGAR',
    },
    {
      no: '02',
      category: 'Network',
      title: 'An office that connects.',
      desc: 'Structured CAT6 cabling, router placement and steady Wi-Fi across working rooms.',
      type: 'network',
      area: 'JEEDIMETLA',
    },
    {
      no: '03',
      category: 'Computer',
      title: 'A machine worth keeping.',
      desc: 'Board diagnosis, thermal cleaning, fan replacement and NVMe SSD speed upgrades.',
      type: 'computer',
      area: 'CHINTHAL',
    },
    {
      no: '04',
      category: 'Office',
      title: 'Ready for the workday.',
      desc: 'Desktops, shared printers, UPS backup and entry CCTV planned together.',
      type: 'office',
      area: 'LB NAGAR & NEARBY',
    },
  ];

  return (
    <>
      <Intro
        no="03"
        kicker="WORK / INDEX"
        title={'Work that\nstays working.'}
        desc="Every setup starts with a real problem. Explore the kinds of computer, CCTV, network and office jobs we handle."
      />
      <section className="section">
        <Filter
          options={['All', 'Computer', 'CCTV', 'Network', 'Office']}
          value={filter}
          change={setFilter}
          label="SCOPE"
        />
        <div className="work-grid">
          {cases
            .filter((c) => filter === 'All' || c.category === filter)
            .map((c) => (
              <WorkCard key={c.no} {...c} />
            ))}
        </div>
        <p className="disclosure">
          Representative job scopes shown with live system blueprints. Confirmed client installations
          and site photos are published only with owner verification.
        </p>
      </section>
      <Cta
        title="Have a job in mind?"
        desc="Tell us what's going on at your home, shop or office. We'll work out the next step together."
      />
    </>
  );
}

function CaseStudy() {
  return (
    <>
      <div className="case-hero">
        <div>
          <Label>[REPRESENTATIVE JOB // WORKFLOW]</Label>
          <h1>
            A setup that
            <br />
            <span>just works.</span>
          </h1>
          <p>
            A representative look at how INFLUX SYSTEMS approaches a shop/office CCTV, computer and
            networking job around Jeedimetla and Shapur Nagar—without invented claims.
          </p>
        </div>
        <WorkLiveDiagram type="cctv" />
      </div>

      <section className="section case-layout">
        <aside className="label">
          REPRESENTATIVE JOB / 001
          <br />
          SHAPUR NAGAR &amp; JEEDIMETLA
          <br />
          SCOPE / CCTV + LAN + PC
        </aside>
        <div>
          {[
            [
              '01 / THE CHALLENGE',
              'Understand the space.',
              'We start by listening: blind spots at the entrance, Wi-Fi dead zones in the back room, or slow billing PCs holding up the counter.',
            ],
            [
              '02 / SITE & BENCH CHECK',
              'Look before we quote.',
              'Cable paths, power backup, lighting conditions and existing hardware are checked first so you get a clear, fair recommendation.',
            ],
            [
              '03 / CLEAN INSTALLATION',
              'Neat wiring, tested hardware.',
              'Cameras, DVR/NVR storage, crimped CAT6 lines and desktop upgrades are installed cleanly and pin-tested one by one.',
            ],
            [
              '04 / HANDOVER & SUPPORT',
              'Test it together.',
              'We verify live camera playback, network stability and print/PC speed with you—and stay reachable on the phone afterwards.',
            ],
          ].map(([l, t, p]) => (
            <article className="case-step" key={l}>
              <Label>{l}</Label>
              <h2>{t}</h2>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section case-diagrams-pair">
        <WorkLiveDiagram type="computer" />
        <WorkLiveDiagram type="network" />
      </section>

      <Cta
        title="Make it your setup."
        desc="Your premises is unique. Tell us what you need and we'll plan the right setup."
      />
    </>
  );
}

function Services() {
  const [active, setActive] = useState<number | null>(0);
  const faq = [
    [
      'Do you visit homes and offices?',
      'Yes—tell us your locality (Shapur Nagar, Jeedimetla, Chinthal, LB Nagar or nearby) and what needs attention, and we will confirm a visit slot or shop drop-off.',
    ],
    [
      'Do you repair laptops as well as desktops?',
      'Yes. Share your laptop brand/model and symptoms (slow boot, fan noise, broken hinge, no display, battery/charger issue) so we can guide you right away.',
    ],
    [
      'Do you provide CCTV installation and AMC?',
      'Yes. We install new CCTV systems, troubleshoot existing cameras/DVRs, and offer ongoing maintenance (AMC) discussions for shops, offices and small factories.',
    ],
    [
      'Do you build or sell new computers?',
      'Yes. Tell us what software or daily work the PC is for—billing, study, office multitasking or custom setups—and we will suggest practical configurations.',
    ],
    [
      'Can you fix Wi-Fi dead zones and LAN cabling?',
      'Yes. We handle router setup, access points, CAT6 cabling, RJ45 crimping, network switches and shared office printers.',
    ],
  ];

  return (
    <>
      <Intro
        no="02"
        kicker="SERVICE DIRECTORY"
        title={"Whatever's not\nworking. Start here."}
        desc="One neighbourhood shop for the computers, CCTV cameras, networks and printers you rely on every day."
      />

      <section className="section service-details">
        {services.map((s) => (
          <article className="service-row" key={s.no}>
            <div className="service-row-no">
              <Label>{s.no} / 04</Label>
              <ServiceLiveIcon kind={s.liveKind} />
            </div>
            <div>
              <h2>{s.name}</h2>
              <p>{s.desc}</p>
              <div className="service-meta">
                <div>
                  <Label>WHAT&apos;S INCLUDED</Label>
                  <span>{s.included}</span>
                </div>
                <div>
                  <Label>WHO IT&apos;S FOR</Label>
                  <span>{s.audience}</span>
                </div>
                <div>
                  <Label>RESPONSE</Label>
                  <span>Call or WhatsApp to confirm same/next-day slot</span>
                </div>
              </div>
            </div>
            <Button href={`/book?service=${encodeURIComponent(s.booking)}`} kind="outline">
              Book this service
            </Button>
          </article>
        ))}
      </section>

      {/* Interactive Repair Workbench also accessible on Services */}
      <AnimeWorkshopBench
        compact
        renderBookingButton={(service, label) => (
          <Button href={`/book?service=${encodeURIComponent(service)}`} kind="red">
            {label}
          </Button>
        )}
      />

      {/* Animated 6-Step Repair Pipeline */}
      <section className="section process">
        <SectionHeading no="02.A" kicker="HOW IT WORKS" title="Simple from the first call." />
        <div className="process-track">
          {[
            ['Call / WhatsApp', 'Tell us the symptom'],
            ['Diagnose', 'Bench or site check'],
            ['Clear quote', 'Approve before work'],
            ['Fix / install', 'Clean parts & wiring'],
            ['Stress-test', 'Verified with you'],
            ['Support', 'Someone picks up'],
          ].map(([t, sub], i) => (
            <article key={t}>
              <Label>
                0{i + 1} <i className="step-pulse" />
              </Label>
              <strong>{t}</strong>
              <small>{sub}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="section amc">
        <div>
          <Label>[ FOR SHOPS, OFFICES &amp; SMALL FACTORIES ]</Label>
          <h2>
            Stay ahead of
            <br />
            the next fault.
          </h2>
        </div>
        <div>
          <p>
            Need dependable upkeep for your CCTV cameras, NVR storage, office PCs and network? Ask
            us about an Annual Maintenance (AMC) arrangement tailored to your premises.
          </p>
          <Button href="/book?service=AMC" kind="red">
            Ask about AMC
          </Button>
        </div>
      </section>

      <section className="section faq">
        <SectionHeading no="02.B" kicker="GOOD TO KNOW" title="Questions, answered." />
        <div className="faq-list">
          {faq.map(([q, a], i) => (
            <div key={q}>
              <button
                onClick={() => setActive(active === i ? null : i)}
                aria-expanded={active === i}
              >
                {q}
                <span>{active === i ? '−' : '+'}</span>
              </button>
              {active === i && <p>{a}</p>}
            </div>
          ))}
        </div>
        <p className="service-area">
          <Label>SERVICE AREA /</Label> Shapur Nagar, Jeedimetla, Chinthal, LB Nagar and nearby
          Hyderabad localities. Call to check availability for your area.
        </p>
      </section>
    </>
  );
}

function Shop() {
  const [filter, setFilter] = useState('All');

  return (
    <>
      <Intro
        no="04"
        kicker="THE SHOP"
        title={'The right gear.\nThe right advice.'}
        desc="Browse hardware categories we supply and install. Call or WhatsApp to check exact models and live stock—no guesswork checkout."
      />
      <section className="section shop-page">
        <div className="shop-note">
          <Label>[ IN-STORE PICKUP / SHAPUR NAGAR ]</Label>
          <p>
            Not sure which RAM, SSD, router or camera matches your setup? Send a photo of your
            device label or bring it to Shop 21.
          </p>
          <a href={PHONE} className="text-link">
            Call to check stock <Arrow />
          </a>
        </div>

        <Filter
          options={[
            'All',
            'CCTV',
            'Computers',
            'Components',
            'Networking',
            'Accessories',
            'Printers',
          ]}
          value={filter}
          change={setFilter}
          label="CATEGORY"
        />

        <div className="product-grid">
          {products
            .filter((p) => filter === 'All' || p.category === filter)
            .map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
        </div>

        <p className="disclosure">
          Hardware files represent in-store enquiry categories. Exact brands, specifications,
          warranties and current pricing are confirmed directly by INFLUX SYSTEMS.
        </p>
      </section>
      <Cta
        title="Need a hand choosing?"
        desc="Tell us what you're connecting, upgrading or building. We'll help you pick the right part."
      />
    </>
  );
}

function Product({ slug }: { slug: string }) {
  const p = products.find((v) => v.slug === slug);
  if (!p) return <NotFound />;

  return (
    <>
      <section className="section product-detail">
        <div className="product-detail-visual">
          <ProductLiveVisual icon={p.icon} badge={p.featured} />
        </div>
        <div className="product-detail-copy">
          <Link href="/shop" className="text-link">
            ← Back to shop
          </Link>
          <Label>[ SHOP / {p.category.toUpperCase()} ]</Label>
          <h1>
            {p.name}
            <span>.</span>
          </h1>
          <p>
            {p.detail}. Enquire directly with our Shapur Nagar shop for current models, stock status
            and setup guidance.
          </p>
          <div className="specs">
            <Label>SELECTION GUIDE / 01</Label>
            {p.specs.map((s, i) => (
              <div key={s}>
                <Label>0{i + 1}</Label>
                <span>{s}</span>
              </div>
            ))}
          </div>
          <p className="availability">
            <i /> In-store pickup &amp; current stock: call or WhatsApp to confirm
          </p>
          <div className="product-actions">
            <Button
              href={wa(
                `Hi INFLUX SYSTEMS, I'd like to enquire about ${p.name}. Please share current options and availability.`
              )}
              kind="red"
            >
              Enquire on WhatsApp
            </Button>
            <Button href={PHONE} kind="outline">
              Call now
            </Button>
          </div>
          <small>
            Not sure about compatibility? Send us your motherboard or laptop model on WhatsApp
            before buying.
          </small>
        </div>
      </section>

      <section className="section">
        <SectionHeading no="04.A" kicker="KEEP LOOKING" title="Related gear." />
        <div className="product-grid">
          {products
            .filter((v) => v.slug !== slug)
            .slice(0, 3)
            .map((v, i) => (
              <ProductCard key={v.slug} product={v} index={i} />
            ))}
        </div>
      </section>
    </>
  );
}

type Booking = {
  service: string;
  device: string;
  model: string;
  issue: string;
  urgency: string;
  date: string;
  time: string;
  visit: string;
  area: string;
  name: string;
  phone: string;
  notes: string;
};

const blank: Booking = {
  service: '',
  device: '',
  model: '',
  issue: '',
  urgency: 'This week',
  date: '',
  time: 'Morning',
  visit: 'At shop',
  area: '',
  name: '',
  phone: '',
  notes: '',
};

function BookingPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Booking>(() => ({
    ...blank,
    service: new URLSearchParams(window.location.search).get('service') || '',
  }));
  const [error, setError] = useState('');

  const stages = ['Service', 'Device / issue', 'Visit', 'Contact', 'Review'];
  const set = (key: keyof Booking, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setError('');
  };

  function next(e: FormEvent) {
    e.preventDefault();
    if (step === 0 && !form.service) return setError('Choose a service to continue.');
    if (step === 1 && !form.issue.trim()) return setError('Tell us briefly what needs attention.');
    if (step === 2 && !form.area.trim()) return setError('Please enter your area or locality.');
    if (step === 3) {
      if (!form.name.trim()) return setError('Please enter your name.');
      if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ''))) {
        return setError('Enter a valid 10-digit Indian mobile number.');
      }
      if (!form.area.trim()) return setError('Please enter your area or locality.');
    }
    setStep(Math.min(step + 1, 4));
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const deviceSummary = [form.device, form.model, form.issue].filter(Boolean).join(' — ');
  const dateWindow = `${form.date || 'Flexible date'} (${form.time})`;
  const msg = `Hi INFLUX SYSTEMS, I'd like to book a service.\n\nService: ${form.service}\nDevice/issue: ${deviceSummary}\nName: ${form.name}\nPhone: ${form.phone}\nArea: ${form.area}\nPreferred date/time: ${dateWindow}\nVisit type: ${form.visit} (Urgency: ${form.urgency})\nNotes: ${form.notes || 'None'}`;

  return (
    <div className="booking-page">
      <div className="booking-intro">
        <Label>[ SERVICE REQUEST / 001 ]</Label>
        <h1>
          Let&apos;s get it
          <br />
          <span>working.</span>
        </h1>
        <p>
          Tell us what needs fixing or setting up. No payment now—we confirm everything directly on
          WhatsApp.
        </p>
        <a href={PHONE} className="text-link">
          Call now: 086862 72266 <Arrow />
        </a>

        {/* Live Animated Hardware Unit matching the chosen service */}
        <div className="booking-live-preview">
          <ServiceLiveIcon kind={serviceToLiveKind(form.service || 'Computer repair')} />
          <div>
            <Label>BENCH UNIT PREVIEW</Label>
            <strong>{form.service || 'Select a service'}</strong>
          </div>
        </div>
      </div>

      <div className="booking-console">
        <div className="booking-progress">
          <Label>STEP 0{step + 1} / 05</Label>
          <div>
            <span style={{ width: `${(step + 1) * 20}%` }} />
          </div>
          <Label>{stages[step].toUpperCase()}</Label>
        </div>

        <form onSubmit={next} noValidate>
          <div className="booking-fields" key={step}>
            <Label>
              [ 0{step + 1} / {stages[step].toUpperCase()} ]
            </Label>
            <h2>
              {
                [
                  'What can we help with?',
                  'Tell us what happened.',
                  'Where and when?',
                  'How do we reach you?',
                  'Check your details.',
                ][step]
              }
            </h2>

            {step === 0 && (
              <div className="choices">
                {serviceNames.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => set('service', s)}
                    className={form.service === s ? 'selected' : ''}
                    aria-pressed={form.service === s}
                  >
                    {s}
                    <span>{form.service === s ? '●' : '↗'}</span>
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="field-stack">
                <label>
                  Device type
                  <input
                    value={form.device}
                    onChange={(e) => set('device', e.target.value)}
                    placeholder="e.g. Desktop PC, laptop, 4-camera CCTV, Wi-Fi router"
                  />
                </label>
                <label>
                  Brand / model <small>OPTIONAL</small>
                  <input
                    value={form.model}
                    onChange={(e) => set('model', e.target.value)}
                    placeholder="If you know it (e.g. Dell Inspiron, Hikvision, TP-Link)"
                  />
                </label>
                <label>
                  Issue description *
                  <textarea
                    rows={4}
                    value={form.issue}
                    onChange={(e) => set('issue', e.target.value)}
                    placeholder="Describe the problem or setup requirement in your own words..."
                  />
                </label>
                <label>
                  Urgency
                  <select value={form.urgency} onChange={(e) => set('urgency', e.target.value)}>
                    <option>Today</option>
                    <option>This week</option>
                    <option>Flexible</option>
                  </select>
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="field-stack">
                <label>
                  Preferred date <small>OPTIONAL</small>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={form.date}
                    onChange={(e) => set('date', e.target.value)}
                  />
                </label>
                <label>
                  Preferred time window
                  <select value={form.time} onChange={(e) => set('time', e.target.value)}>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                    <option>Flexible</option>
                  </select>
                </label>
                <div>
                  <span className="field-label">Service type</span>
                  <div className="segments">
                    {['At shop', 'At home', 'At office'].map((s) => (
                      <button
                        type="button"
                        key={s}
                        className={form.visit === s ? 'selected' : ''}
                        onClick={() => set('visit', s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <label>
                  Area / locality *
                  <input
                    value={form.area}
                    onChange={(e) => set('area', e.target.value)}
                    placeholder="e.g. Shapur Nagar, Jeedimetla, Chinthal, LB Nagar"
                  />
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="field-stack">
                <label>
                  Your name *
                  <input
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="Your name"
                  />
                </label>
                <label>
                  Phone (10 digits) *
                  <input
                    autoComplete="tel"
                    inputMode="numeric"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    placeholder="10-digit mobile number"
                  />
                </label>
                <label>
                  Area / locality *
                  <input
                    value={form.area}
                    onChange={(e) => set('area', e.target.value)}
                    placeholder="Your locality"
                  />
                </label>
                <label>
                  Notes <small>OPTIONAL</small>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => set('notes', e.target.value)}
                    placeholder="Landmark, floor, timing preference or questions..."
                  />
                </label>
              </div>
            )}

            {step === 4 && (
              <div className="booking-review">
                {[
                  ['Service', form.service],
                  ['Device / issue', deviceSummary],
                  ['Urgency', form.urgency],
                  ['Date / time', dateWindow],
                  ['Visit type', form.visit],
                  ['Name', form.name],
                  ['Phone', form.phone],
                  ['Area', form.area],
                  ['Notes', form.notes || 'None'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <Label>{k}</Label>
                    <strong>{v}</strong>
                  </div>
                ))}
                <div className="review-edit-actions">
                  <button type="button" className="text-link" onClick={() => setStep(0)}>
                    Edit details ↗
                  </button>
                  <a href={PHONE} className="text-link">
                    Call now: 086862 72266 ↗
                  </a>
                </div>
              </div>
            )}

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
          </div>

          <div className="booking-bottom">
            <span>No payment now — we confirm on WhatsApp.</span>
            <div>
              {step > 0 && (
                <button
                  type="button"
                  className="back-btn"
                  onClick={() => {
                    setStep(step - 1);
                    setError('');
                  }}
                >
                  ← Back
                </button>
              )}
              {step < 4 ? (
                <button type="submit" className="btn btn-red">
                  Continue <Arrow />
                </button>
              ) : (
                <a
                  href={wa(msg)}
                  className="btn btn-red"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Send on WhatsApp <Arrow />
                </a>
              )}
            </div>
          </div>
        </form>
      </div>

      <aside className="booking-aside">
        <Label>
          INFLUX SYSTEMS / SERVICE CONSOLE
          <br />
          SHAPUR NAGAR, HYDERABAD
          <br />
          <br />
          PREFER A QUICK CALL?
        </Label>
        <a href={PHONE}>CALL NOW · 086862 72266 ↗</a>
      </aside>
    </div>
  );
}

function About() {
  return (
    <>
      <Intro
        no="05"
        kicker="ABOUT THE SHOP"
        title={'Real people.\nReal answers.'}
        desc="INFLUX SYSTEMS is a neighbourhood computer, CCTV and networking shop at Shop 21, Market Road, Shapur Nagar. Bring us the problem—leave with a clear answer."
      />

      <section className="section about-intro">
        <div>
          <Label>[ FROM THE SHOP FLOOR ]</Label>
          <h2>Tech support should sound like a neighbour who knows hardware, not a script.</h2>
        </div>
        <div>
          <p>
            We handle the practical jobs homes, shops, offices and small factories around
            Jeedimetla, Shapur Nagar and Chinthal run into every week: computers that refuse to
            boot, noisy fans, SSD upgrades, CCTV installations, DVR faults, Wi-Fi dead spots and
            office printers.
          </p>
          <p>
            Rated 4.8★ across 43 Google reviews, our approach is straightforward—check the machine
            properly, give a fair quote, do neat work, and pick up the phone when you call.
          </p>
          <Button href="/contact" kind="outline">
            Visit or call us
          </Button>
        </div>
      </section>

      {/* Live Animated Workshop Bench Strip */}
      <section className="section about-bench-strip">
        <SectionHeading
          no="05.A"
          kicker="WHAT WE ACTUALLY DO"
          title="Four benches under one roof."
          desc="Every system in your shop or home connects—so we service the computer, the cameras, the network and the printer together."
        />
        <div className="service-grid">
          {services.map((s) => (
            <Link
              href={`/book?service=${encodeURIComponent(s.booking)}`}
              className="service-tile"
              key={s.no}
            >
              <div>
                <span className="label">{s.no} / 04</span>
                <ServiceLiveIcon kind={s.liveKind} />
              </div>
              <div>
                <h3>{s.name}</h3>
                <p>{s.included}</p>
              </div>
              <Arrow />
            </Link>
          ))}
        </div>
      </section>

      <section className="section about-place">
        <div className="blueprint-grid" />
        <Label>[ SHOP 21 / MARKET ROAD · SHAPUR NAGAR ]</Label>
        <h2>
          Find us near
          <br />
          Saibaba Temple.
        </h2>
        <p>{ADDRESS}</p>
        <Button href={MAP} kind="red">
          Get directions
        </Button>
      </section>

      <Cta
        title="Let's talk it through."
        desc="Tell us what's acting up. A reliable fix starts with an honest checkup."
      />
    </>
  );
}

function Contact() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function send(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      return setError('Please add your name and a short message.');
    }
    window.open(
      wa(`Hi INFLUX SYSTEMS, I'm ${name.trim()}. ${message.trim()}`),
      '_blank',
      'noopener,noreferrer'
    );
    setError('');
  }

  return (
    <>
      <Intro
        no="06"
        kicker="CONTACT / VISIT"
        title={'Get in touch.\nGet it sorted.'}
        desc="Call, WhatsApp or drop by Shop 21 on Market Road in Shapur Nagar, Jeedimetla."
      />

      <section className="section contact-layout">
        <div>
          <Label>[ DIRECT LINE ]</Label>
          <a href={PHONE} className="big-phone">
            086862
            <br />
            72266 <Arrow />
          </a>
          <div className="contact-links">
            <a href={PHONE}>
              Call now <Arrow />
            </a>
            <a
              href={wa('Hi INFLUX SYSTEMS, I need help with a service.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on WhatsApp <Arrow />
            </a>
          </div>
          <div className="contact-address">
            <Label>[ VISIT THE SHOP ]</Label>
            <p>{ADDRESS}</p>
            <a
              href={MAP}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Open in Google Maps <Arrow />
            </a>
            <small>
              Hours note: typical daytime counter hours are 10:00–20:00 IST (provisional—please call
              086862 72266 to confirm before late visits).
            </small>
          </div>
        </div>

        <div className="contact-form">
          <Label>[ SEND A WHATSAPP MESSAGE ]</Label>
          <h2>What&apos;s on your mind?</h2>
          <p>
            Opens WhatsApp prefilled with your message so our shop bench can reply directly. No
            backend tracking.
          </p>
          <form onSubmit={send} className="field-stack">
            <label>
              Your name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </label>
            <label>
              How can we help?
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Laptop issue, CCTV camera count, Wi-Fi problem or part enquiry..."
              />
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="btn btn-red">
              Continue to WhatsApp <Arrow />
            </button>
          </form>
        </div>
      </section>

      <section className="section contact-map">
        <MapPanel />
      </section>
    </>
  );
}

function NotFound() {
  return (
    <div className="not-found">
      <div className="vhs" />
      <Label>[ ERROR / 404 // ARCHIVE SIGNAL ]</Label>

      {/* Anime Broken-Cable Spark Illustration */}
      <svg className="not-found-svg" viewBox="0 0 260 90" fill="none" aria-hidden="true">
        <path d="M10 48H92" stroke="#0A0A0A" strokeWidth="7" strokeLinecap="round" />
        <rect x="82" y="34" width="22" height="28" fill="#EAE6DC" stroke="#0A0A0A" strokeWidth="3.5" />
        <path d="M104 41H114M104 55H114" stroke="#0A0A0A" strokeWidth="4" />
        <g className="spark-pop" style={{ transformOrigin: '130px 48px' }}>
          <path
            d="M130 22V10M130 86V74M116 32L108 22M144 32L152 22M116 64L108 74M144 64L152 74"
            stroke="#D7261E"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
        <rect x="156" y="34" width="22" height="28" fill="#EAE6DC" stroke="#0A0A0A" strokeWidth="3.5" />
        <path d="M178 48H250" stroke="#0A0A0A" strokeWidth="7" strokeLinecap="round" />
      </svg>

      <h1>
        SIGNAL
        <br />
        <span>LOST.</span>
      </h1>
      <p>Looks like this cable is unplugged. Let&apos;s reconnect you to the shop console.</p>
      <div>
        <Button href="/" kind="red">
          Home
        </Button>
        <Button href="/services" kind="outline">
          Services
        </Button>
        <Button href="/book" kind="outline">
          Book a service
        </Button>
      </div>
      <a href={PHONE} className="text-link">
        Call 086862 72266 <Arrow />
      </a>
    </div>
  );
}

function Cta({ title, desc }: { title: string; desc: string }) {
  return (
    <section className="cta-band">
      <div>
        <Label>[ NEXT STEP / LET&apos;S TALK ]</Label>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
      <div className="cta-actions">
        <Button href="/book" kind="red">
          Book a service
        </Button>
        <Button href={PHONE} kind="outline">
          Call now
        </Button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-lead">
        <div>
          <Label>[ INFLUX SYSTEMS / SHAPUR NAGAR, HYDERABAD ]</Label>
          <h2>
            Something not
            <br />
            working? <em>We are.</em>
          </h2>
          <div>
            <Button href="/book" kind="red">
              Book a service
            </Button>
            <Button href={PHONE} kind="outline">
              Call now
            </Button>
          </div>
        </div>
        <PlugPet />
      </div>

      <div className="footer-cols">
        <div>
          <Label>CONTACT / 01</Label>
          <a href={PHONE}>086862 72266</a>
          <a
            href={wa('Hi INFLUX SYSTEMS, I need help with a service.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us ↗
          </a>
        </div>
        <div>
          <Label>FIND US / 02</Label>
          <p>{ADDRESS}</p>
          <a href={MAP} target="_blank" rel="noopener noreferrer">
            Get directions ↗
          </a>
        </div>
        <div>
          <Label>EXPLORE / 03</Label>
          {links.map(([href, text]) => (
            <Link href={href} key={href}>
              {text}
            </Link>
          ))}
          <Link href="/book">Book a service</Link>
        </div>
        <div>
          <Label>SERVICES / 04</Label>
          <p>
            Computer sales &amp; repair
            <br />
            CCTV installation &amp; AMC
            <br />
            Wi-Fi, cabling &amp; office setup
            <br />
            Printers, upgrades &amp; recovery
          </p>
          <small>Call 086862 72266 to confirm shop hours.</small>
        </div>
      </div>

      <div className="footer-wordmark">
        INFLUX<span>SYSTEMS</span>
        <i>✳</i>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} INFLUX SYSTEMS. SHAPUR NAGAR, HYDERABAD.</span>
        <span>HUMAN SUPPORT · MACHINE PRECISION</span>
        <Link href="/">BACK TO TOP ↑</Link>
      </div>
    </footer>
  );
}

export default function App() {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const update = () => setPath(currentPath());
    window.addEventListener('popstate', update);
    window.addEventListener('navigate', update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('navigate', update);
    };
  }, []);

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Computer Service, CCTV & Networking',
      '/services': 'Services',
      '/work': 'Work',
      '/work/representative-job': 'How We Work',
      '/shop': 'Shop',
      '/book': 'Book a Service',
      '/about': 'About',
      '/contact': 'Contact',
    };
    document.title = `${
      path.startsWith('/shop/') ? 'Product Enquiry' : titles[path] || 'Signal Lost (404)'
    } | INFLUX SYSTEMS Hyderabad`;

    const descriptions: Record<string, string> = {
      '/': 'Computer sales and service, CCTV, networking and office setups in Shapur Nagar, Hyderabad. Call INFLUX SYSTEMS on 086862 72266.',
      '/services':
        'Explore computer repair, CCTV installation, networking, printers and office setup services from INFLUX SYSTEMS in Shapur Nagar.',
      '/work':
        'Explore representative computer, CCTV, networking and office work scopes from INFLUX SYSTEMS in Hyderabad.',
      '/work/representative-job':
        'See how INFLUX SYSTEMS approaches a CCTV and networking job, from understanding the space to testing the setup.',
      '/shop':
        'Browse computer, CCTV, network, printer and accessory categories. Call INFLUX SYSTEMS in Shapur Nagar to check current models.',
      '/book':
        'Request a computer, CCTV or networking service from INFLUX SYSTEMS. Share the details on WhatsApp. No payment now.',
      '/about':
        'Get to know INFLUX SYSTEMS, a neighbourhood computer and security systems shop on Market Road in Shapur Nagar, Hyderabad.',
      '/contact':
        'Call, WhatsApp or visit INFLUX SYSTEMS at Shop 21, Market Road, Shapur Nagar, Hyderabad.',
    };
    const desc =
      descriptions[path] ||
      'INFLUX SYSTEMS in Shapur Nagar, Hyderabad. Call 086862 72266 for computer, CCTV and networking help.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', desc);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', desc);
  }, [path]);

  let page: ReactNode;
  if (path === '/') page = <Home />;
  else if (path === '/services') page = <Services />;
  else if (path === '/work') page = <Work />;
  else if (path === '/work/representative-job') page = <CaseStudy />;
  else if (path === '/shop') page = <Shop />;
  else if (path.startsWith('/shop/')) page = <Product slug={path.split('/')[2]} />;
  else if (path === '/book') page = <BookingPage key={window.location.search} />;
  else if (path === '/about') page = <About />;
  else if (path === '/contact') page = <Contact />;
  else page = <NotFound />;

  return (
    <>
      <Header path={path} />
      <main>{page}</main>
      <Footer />
      <MobileBar />
    </>
  );
}
