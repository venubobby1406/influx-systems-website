import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';

export function HeroCameraStage({ hero = true }: { hero?: boolean }) {
  const [eye, setEye] = useState({ x: 0, y: 0 });
  const [camLine, setCamLine] = useState('I see you.');
  const [camPop, setCamPop] = useState(false);
  const [irBoost, setIrBoost] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const camLines = [
    'I see you.',
    '4K sharp!',
    'IR online!',
    'Zero blind spots.',
    'Shop front clear!',
  ];

  function move(e: MouseEvent<HTMLDivElement>) {
    if (!hero || window.matchMedia('(pointer: coarse)').matches) return;
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setEye({
      x: Math.max(-9, Math.min(9, ((e.clientX - r.left) / r.width - 0.5) * 22)),
      y: Math.max(-9, Math.min(9, ((e.clientY - r.top) / r.height - 0.5) * 22)),
    });
  }

  function pokeCam() {
    const next = camLines[Math.floor(Math.random() * camLines.length)];
    setCamLine(next);
    setIrBoost((v) => !v);
    setCamPop(true);
    window.setTimeout(() => setCamPop(false), 420);
  }

  return (
    <div
      ref={box}
      className={`camera-panel ${hero ? 'camera-hero' : ''} ${irBoost ? 'ir-boost' : ''}`}
      onMouseMove={move}
      onMouseLeave={() => setEye({ x: 0, y: 0 })}
    >
      <div className="blueprint-grid" />
      <div className="manga-speedlines" aria-hidden="true" />

      <div className="camera-top">
        <span>
          <b className="live-dot">●</b> LIVE FEED // {irBoost ? 'NIGHT IR BOOST' : 'OPTICS ACTIVE'}
        </span>
        <span>CAM_01 / SHOP FRONT</span>
      </div>

      <div className="halftone camera-circle" />
      <span className="cross c1">+</span>
      <span className="cross c2">+</span>
      <span className="cross c3">+</span>

      {/* Floating live mini-nodes in blueprint background: Wi-Fi & PC fan telemetry */}
      <svg className="hero-ambient-nodes" viewBox="0 0 700 520" fill="none" aria-hidden="true">
        {/* Top-left mini Wi-Fi signal beacon */}
        <g transform="translate(86, 96)">
          <rect x="0" y="22" width="44" height="16" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="2.5" />
          <line x1="12" y1="22" x2="8" y2="6" stroke="#0A0A0A" strokeWidth="2.5" />
          <line x1="32" y1="22" x2="36" y2="6" stroke="#0A0A0A" strokeWidth="2.5" />
          <circle cx="8" cy="5" r="2.5" fill="#D7261E" />
          <circle cx="36" cy="5" r="2.5" fill="#D7261E" />
          <circle className="led-blink" cx="11" cy="30" r="2" fill="#D7261E" />
          <circle className="led-blink-delay" cx="19" cy="30" r="2" fill="#0A0A0A" />
          <path className="wifi-wave w1" d="M12 -2 Q22 -10 32 -2" stroke="#D7261E" strokeWidth="2" strokeLinecap="round" />
          <path className="wifi-wave w2" d="M6 -9 Q22 -21 38 -9" stroke="#D7261E" strokeWidth="2" strokeLinecap="round" />
          <path className="wifi-wave w3" d="M0 -16 Q22 -32 44 -16" stroke="#0A0A0A" strokeWidth="1.8" strokeLinecap="round" />
          <text x="0" y="50" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="8" fontWeight="700">
            WIFI_LINK // 98%
          </text>
        </g>

        {/* Top-right spinning CPU cooling fan node */}
        <g transform="translate(592, 68)">
          <rect x="-24" y="-24" width="48" height="48" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="18" stroke="#0A0A0A" strokeWidth="2" />
          <g className="spin-fan">
            <path d="M0 -3 C5 -14 14 -12 12 -2 C10 1 4 1 0 -3Z" fill="#0A0A0A" />
            <path d="M3 0 C14 5 12 14 2 12 C-1 10 -1 4 3 0Z" fill="#D7261E" />
            <path d="M0 3 C-5 14 -14 12 -12 2 C-10 -1 -4 -1 0 3Z" fill="#0A0A0A" />
            <path d="M-3 0 C-14 -5 -12 -14 -2 -12 C1 -10 1 -4 -3 0Z" fill="#0A0A0A" />
            <circle cx="0" cy="0" r="4.5" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="2" />
          </g>
          <text x="-24" y="36" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="8" fontWeight="700">
            RPM // 1840
          </text>
        </g>

        {/* Animated data packet line linking nodes to main CCTV unit */}
        <path
          className="packet-flow"
          d="M132 118 L220 155 M568 92 L495 148"
          stroke="#D7261E"
          strokeWidth="2"
          strokeDasharray="5 6"
        />
      </svg>

      {/* Main Anime-Mecha Cel-Shaded CCTV Illustration */}
      <svg className="camera-svg" viewBox="0 0 700 520" fill="none" aria-hidden="true">
        <ellipse cx="351" cy="448" rx="235" ry="18" fill="#0A0A0A" opacity=".1" />
        {/* Articulated Wall/Bench Mount */}
        <path d="M344 338L364 427H410L436 326" fill="#B9B6AD" stroke="#0A0A0A" strokeWidth="5" />
        <path d="M339 423H444L466 440H316Z" fill="#D8D4CA" stroke="#0A0A0A" strokeWidth="5" />
        <path d="M278 318L405 345L476 305V333L406 369L279 344Z" fill="#98958C" stroke="#0A0A0A" strokeWidth="5" />

        {/* Coiled power/PoE cable with live signal pulse */}
        <path d="M210 288 C195 352 258 398 338 418" stroke="#0A0A0A" strokeWidth="7" strokeLinecap="round" />
        <path
          className="packet-flow"
          d="M210 288 C195 352 258 398 338 418"
          stroke="#D7261E"
          strokeWidth="2.5"
          strokeDasharray="6 8"
          strokeLinecap="round"
        />

        {/* Main Armored Hood & Chassis */}
        <path d="M123 159L400 129L552 184L279 226Z" fill="#F6F3EC" stroke="#0A0A0A" strokeWidth="6" strokeLinejoin="round" />
        <path d="M123 159L279 226V324L123 252Z" fill="#B8B5AB" stroke="#0A0A0A" strokeWidth="6" strokeLinejoin="round" />
        <path d="M279 226L552 184V279L279 324Z" fill="#E3E0D7" stroke="#0A0A0A" strokeWidth="6" strokeLinejoin="round" />

        {/* Anime Mecha Panel Seams & Cooling Louvers */}
        <path
          d="M142 182L261 236M142 207L261 261M142 232L261 286M322 243L510 213M322 270L510 241M322 295L510 267"
          stroke="#0A0A0A"
          strokeWidth="2"
          opacity=".3"
        />
        {/* Signal-red Sunshield Stripe */}
        <path d="M398 129L515 174L482 180L363 137Z" fill="#D7261E" stroke="#0A0A0A" strokeWidth="3" />
        <path d="M144 143L392 115L429 131L123 159Z" fill="#D5D1C7" stroke="#0A0A0A" strokeWidth="5" />

        {/* Wireless Telemetry Antenna on Camera Rear */}
        <path d="M168 140L154 78" stroke="#0A0A0A" strokeWidth="5" strokeLinecap="round" />
        <circle cx="153" cy="74" r="6" fill="#D7261E" stroke="#0A0A0A" strokeWidth="2.5" />
        <path className="wifi-wave w1" d="M138 60 Q153 46 168 60" stroke="#D7261E" strokeWidth="2.5" strokeLinecap="round" />
        <path className="wifi-wave w2" d="M128 49 Q153 29 178 49" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />

        {/* Front Lens Barrel Housing */}
        <path d="M550 189L589 201L592 270L553 281Z" fill="#D4D0C6" stroke="#0A0A0A" strokeWidth="5" />
        <ellipse cx="568" cy="235" rx="57" ry="72" fill="#0A0A0A" />
        <ellipse cx="568" cy="235" rx="47" ry="61" fill="#C9C7BF" stroke="#F2EFE8" strokeWidth="3" />
        <ellipse cx="568" cy="235" rx="37" ry="50" fill="#171717" />

        {/* Ring of Night-Vision IR Emitters around the Optic */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 568 + Math.cos(rad) * 32;
          const cy = 235 + Math.sin(rad) * 43;
          return (
            <circle
              key={deg}
              className="ir-led"
              cx={cx}
              cy={cy}
              r="2.6"
              fill={irBoost ? '#D7261E' : '#6E6B63'}
            />
          );
        })}

        <ellipse cx="568" cy="235" rx="26" ry="36" fill="#2F302C" stroke="#898A82" strokeWidth="2" />

        {/* Cursor-linked Anime Optic Iris with Gleaming Catchlights */}
        <g className="lens-iris" style={{ transform: `translate(${eye.x}px, ${eye.y}px)` }}>
          <ellipse cx="568" cy="235" rx="18" ry="26" fill="#0A0A0A" />
          <ellipse cx="568" cy="235" rx="11" ry="16" fill="#D7261E" opacity="0.88" />
          <ellipse cx="568" cy="235" rx="6" ry="9" fill="#0A0A0A" />
          {/* Anime specular catchlights */}
          <ellipse cx="561" cy="223" rx="4.5" ry="6.5" fill="#F2EFE8" />
          <circle cx="575" cy="244" r="2.4" fill="#F2EFE8" />
        </g>

        {/* Chassis Typography & Blinking Activity LEDs */}
        <text x="325" y="258" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="18" fontWeight="700" letterSpacing="2">
          INFLUX
        </text>
        <text x="326" y="281" fill="#5D5B54" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="600" letterSpacing="3">
          OPTICS // UNIT-01
        </text>
        <circle className="led-blink" cx="173" cy="207" r="4.5" fill="#D7261E" />
        <circle className="led-blink-delay" cx="173" cy="227" r="4.5" fill="#0A0A0A" />

        {/* Corner HUD Framing Brackets */}
        <path d="M82 112V86H168M614 120H640V165M80 351V382H132M643 334V360H598" stroke="#0A0A0A" strokeWidth="2" opacity=".45" />
      </svg>

      <div className="camera-data">
        <span>
          REC <b className="live-dot">●</b>
        </span>
        <span>4K / IR 30M</span>
        <span>SIGNAL 98%</span>
        <span>UPTIME 99.9%</span>
      </div>

      <div className="camera-bottom">
        <span>NODE 05 / SHAPUR NAGAR, JEEDIMETLA</span>
        <span>INFLUX // SURVEILLANCE // 01</span>
      </div>

      {hero && (
        <>
          <span className="cursor-hint">[ CURSOR-LINKED OPTICS · CLICK CAM-01 ]</span>
          <button
            type="button"
            className={`cam-friend ${camPop ? 'mascot-hop' : ''}`}
            onClick={pokeCam}
            aria-label="Interact with CAM-01 mascot"
          >
            <span className="speech">{camLine}</span>
            <svg viewBox="0 0 136 112" fill="none" aria-hidden="true">
              {/* Cute Anime Chibi CCTV Buddy */}
              <path d="M26 42L92 31L112 45L45 57Z" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="4" strokeLinejoin="round" />
              <path d="M26 42L45 57V81L26 68Z" fill="#AAA79D" stroke="#0A0A0A" strokeWidth="4" strokeLinejoin="round" />
              <path d="M45 57L112 45V72L45 81Z" fill="#E3DFD5" stroke="#0A0A0A" strokeWidth="4" strokeLinejoin="round" />
              {/* Expressive Blush & Side Smile */}
              <circle cx="66" cy="69" r="3.5" fill="#D7261E" opacity=".6" />
              <path d="M72 68 Q78 73 84 67" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
              {/* Big Anime Optic Eye */}
              <ellipse cx="110" cy="58" rx="18" ry="23" fill="#0A0A0A" />
              <ellipse cx="110" cy="58" rx="13" ry="17" fill="#EAE6DC" />
              <g className="lens-iris" style={{ transform: `translate(${eye.x * 0.5}px, ${eye.y * 0.5}px)` }}>
                <ellipse cx="110" cy="58" rx="7.5" ry="10.5" fill="#0A0A0A" />
                <ellipse cx="110" cy="59" rx="4" ry="5.5" fill="#D7261E" />
                <circle cx="107" cy="53" r="2.6" fill="#F2EFE8" />
                <circle cx="113" cy="62" r="1.3" fill="#F2EFE8" />
              </g>
              {/* Little Tripod Legs */}
              <path d="M60 80L65 96H83L90 76M55 96H95" stroke="#0A0A0A" strokeWidth="4" strokeLinecap="round" />
              <path d="M55 39L90 33" stroke="#D7261E" strokeWidth="4" />
              {/* Little Antenna */}
              <path d="M38 39L33 22" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" />
              <circle className="led-blink" cx="32" cy="20" r="3.5" fill="#D7261E" />
            </svg>
            <span className="friend-id">CAM-01</span>
          </button>
        </>
      )}
      <div className="scanline" />
    </div>
  );
}

/** Animated mini hardware vignettes inside each of the 4 Service cards */
export function ServiceLiveIcon({ kind }: { kind: 'computer' | 'cctv' | 'network' | 'printer' }) {
  if (kind === 'computer') {
    return (
      <svg className="service-live-svg" viewBox="0 0 96 72" fill="none" aria-hidden="true">
        {/* Mini Monitor with anime face + open PC tower with spinning fan */}
        <rect x="6" y="12" width="48" height="36" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3" />
        <rect x="11" y="17" width="38" height="24" fill="#0A0A0A" />
        <circle cx="23" cy="27" r="2.2" fill="#F2EFE8" />
        <circle cx="37" cy="27" r="2.2" fill="#F2EFE8" />
        <path d="M25 34 Q30 38 35 34" stroke="#D7261E" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M25 48V56M35 48V56M18 56H42" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" />
        {/* PC Tower with live spinning fan */}
        <rect x="60" y="10" width="28" height="46" fill="#EAE6DC" stroke="#0A0A0A" strokeWidth="3" />
        <circle cx="74" cy="31" r="9.5" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="2" />
        <g className="spin-fan" style={{ transformOrigin: '74px 31px' }}>
          <path d="M74 22 L77 31 L74 40 L71 31 Z" fill="#0A0A0A" />
          <path d="M65 31 L74 28 L83 31 L74 34 Z" fill="#D7261E" />
        </g>
        <circle className="led-blink" cx="67" cy="16" r="2" fill="#D7261E" />
        <rect x="72" y="15" width="10" height="2.5" fill="#0A0A0A" />
      </svg>
    );
  }
  if (kind === 'cctv') {
    return (
      <svg className="service-live-svg" viewBox="0 0 96 72" fill="none" aria-hidden="true">
        {/* Wall bracket */}
        <path d="M10 22V52M10 38H24L28 30" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" />
        {/* Panning CCTV head + IR scan beam */}
        <g className="cctv-pan" style={{ transformOrigin: '28px 30px' }}>
          <path d="M64 26L92 14V48L64 36Z" fill="#D7261E" opacity="0.18" />
          <path d="M22 18L62 15L66 36L24 39Z" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3" />
          <path d="M22 18L58 12L65 15L22 18Z" fill="#D7261E" stroke="#0A0A0A" strokeWidth="2" />
          <ellipse cx="65" cy="26" rx="5.5" ry="9.5" fill="#0A0A0A" />
          <ellipse cx="65" cy="26" rx="2.5" ry="4.5" fill="#D7261E" />
          <circle className="led-blink" cx="31" cy="27" r="2.2" fill="#D7261E" />
        </g>
      </svg>
    );
  }
  if (kind === 'network') {
    return (
      <svg className="service-live-svg" viewBox="0 0 96 72" fill="none" aria-hidden="true">
        {/* Pulsing Wi-Fi waves */}
        <path className="wifi-wave w1" d="M36 24 Q48 14 60 24" stroke="#D7261E" strokeWidth="2.5" strokeLinecap="round" />
        <path className="wifi-wave w2" d="M28 17 Q48 3 68 17" stroke="#D7261E" strokeWidth="2.5" strokeLinecap="round" />
        <path className="wifi-wave w3" d="M20 10 Q48 -8 76 10" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
        {/* Router antennae & body */}
        <path d="M28 40L22 18M68 40L74 18" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="16" y="40" width="64" height="18" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3" />
        <circle className="led-blink" cx="27" cy="49" r="2.3" fill="#D7261E" />
        <circle className="led-blink-delay" cx="36" cy="49" r="2.3" fill="#0A0A0A" />
        <circle className="led-blink" cx="45" cy="49" r="2.3" fill="#D7261E" />
        <path d="M58 49H70" stroke="#0A0A0A" strokeWidth="2.5" />
      </svg>
    );
  }
  return (
    <svg className="service-live-svg" viewBox="0 0 96 72" fill="none" aria-hidden="true">
      {/* Input tray */}
      <rect x="24" y="10" width="48" height="16" fill="#EAE6DC" stroke="#0A0A0A" strokeWidth="2.5" />
      {/* Printer body */}
      <rect x="12" y="24" width="72" height="26" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3" />
      <rect x="20" y="31" width="34" height="5" fill="#0A0A0A" />
      <circle className="led-blink" cx="72" cy="34" r="2.5" fill="#D7261E" />
      {/* Animated paper sheet sliding out */}
      <g className="paper-feed">
        <rect x="25" y="43" width="46" height="22" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" />
        <path d="M32 50H62M32 55H54M32 60H46" stroke="#D7261E" strokeWidth="2" />
      </g>
    </svg>
  );
}

/** 4 Live Animated Anime-Blueprint Diagrams for Work / Scopes */
export function WorkLiveDiagram({ type }: { type: string }) {
  const kind =
    type === 'cctv' || type === 'network' || type === 'computer' || type === 'office'
      ? type
      : 'cctv';

  const figNo = { cctv: '01', network: '02', computer: '03', office: '04' }[kind];

  return (
    <div className={`work-visual visual-${kind}`}>
      <div className="blueprint-grid" />
      <span className="visual-top">FIG. {figNo} // LIVE SYSTEM TELEMETRY</span>

      {kind === 'cctv' && (
        <svg className="work-diagram-svg" viewBox="0 0 460 280" fill="none" aria-hidden="true">
          {/* Shop floorplan walls */}
          <rect x="34" y="42" width="392" height="196" stroke="#0A0A0A" strokeWidth="2" strokeDasharray="6 4" fill="rgba(242,239,232,0.45)" />
          <path d="M210 42V140M210 185V238M315 130H426" stroke="#0A0A0A" strokeWidth="2" />
          {/* DVR Recorder Box */}
          <rect x="52" y="176" width="84" height="44" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3" />
          <text x="62" y="195" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700">
            NVR_4CH
          </text>
          <circle className="led-blink" cx="65" cy="208" r="3" fill="#D7261E" />
          <circle className="led-blink-delay" cx="76" cy="208" r="3" fill="#0A0A0A" />
          <path className="packet-flow" d="M94 176 V76 H112" stroke="#D7261E" strokeWidth="2.5" strokeDasharray="5 5" />

          {/* Sweeping Anime CCTV Camera + Radar Cone */}
          <g className="cctv-pan-wide" style={{ transformOrigin: '115px 76px' }}>
            <path d="M135 76 L378 48 L392 198 Z" fill="#D7261E" opacity="0.15" />
            <path d="M135 76 L378 48 M135 76 L392 198" stroke="#D7261E" strokeWidth="1.8" strokeDasharray="4 4" />
            <rect x="96" y="64" width="44" height="24" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3" />
            <rect x="138" y="67" width="8" height="18" fill="#0A0A0A" />
            <circle className="led-blink" cx="106" cy="76" r="2.5" fill="#D7261E" />
          </g>

          {/* Tracked motion target lock */}
          <g className="target-drift">
            <rect x="292" y="80" width="44" height="44" stroke="#D7261E" strokeWidth="2" fill="none" />
            <path d="M314 74V130M286 102H342" stroke="#D7261E" strokeWidth="1.5" />
            <text x="288" y="138" fill="#D7261E" fontFamily="IBM Plex Mono, monospace" fontSize="8" fontWeight="700">
              LOCK // 4K
            </text>
          </g>
        </svg>
      )}

      {kind === 'network' && (
        <svg className="work-diagram-svg" viewBox="0 0 460 280" fill="none" aria-hidden="true">
          {/* Animated CAT6 packet paths */}
          <path className="packet-flow" d="M230 140L95 68M230 140L365 68M230 140L95 212M230 140L365 212" stroke="#0A0A0A" strokeWidth="2.5" strokeDasharray="6 6" />
          <path className="packet-flow-fast" d="M230 140L95 68M230 140L365 68M230 140L95 212M230 140L365 212" stroke="#D7261E" strokeWidth="3" strokeDasharray="4 22" />

          {/* Concentric Wi-Fi coverage ripples */}
          <circle className="wifi-ring r1" cx="230" cy="140" r="46" stroke="#D7261E" strokeWidth="1.5" />
          <circle className="wifi-ring r2" cx="230" cy="140" r="82" stroke="#D7261E" strokeWidth="1.2" />

          {/* Central Router Hub */}
          <g transform="translate(192, 112)">
            <path d="M16 14L10 -6M60 14L66 -6" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="10" cy="-7" r="3" fill="#D7261E" />
            <circle cx="66" cy="-7" r="3" fill="#D7261E" />
            <rect x="4" y="14" width="68" height="34" fill="#D7261E" stroke="#0A0A0A" strokeWidth="3" />
            <text x="17" y="35" fill="#F2EFE8" fontFamily="IBM Plex Mono, monospace" fontSize="12" fontWeight="700">
              ROUTER
            </text>
          </g>

          {/* 4 Connected Desk / Access Nodes */}
          {[
            [62, 46, 'DESK_01'],
            [332, 46, 'DESK_02'],
            [62, 190, 'PRINTER'],
            [332, 190, 'AP_NODE'],
          ].map(([x, y, label]) => (
            <g key={String(label)} transform={`translate(${x}, ${y})`}>
              <rect width="68" height="42" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3" />
              <circle className="led-blink" cx="11" cy="12" r="2.5" fill="#D7261E" />
              <text x="10" y="30" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700">
                {label}
              </text>
            </g>
          ))}
        </svg>
      )}

      {kind === 'computer' && (
        <svg className="work-diagram-svg" viewBox="0 0 460 280" fill="none" aria-hidden="true">
          {/* Open Motherboard Repair Diagnostic Schematic */}
          <rect x="70" y="38" width="200" height="204" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3.5" />
          {/* Motherboard PCB circuit traces */}
          <path className="packet-flow" d="M150 112 H248 M150 132 H248 M125 162 V222" stroke="#D7261E" strokeWidth="2" strokeDasharray="5 5" />
          {/* CPU Cooler with live spinning fan */}
          <rect x="94" y="62" width="76" height="76" fill="#EAE6DC" stroke="#0A0A0A" strokeWidth="3" />
          <circle cx="132" cy="100" r="28" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="2.5" />
          <g className="spin-fan" style={{ transformOrigin: '132px 100px' }}>
            <path d="M132 75 C140 75 142 92 132 100 C122 92 124 75 132 75Z" fill="#0A0A0A" />
            <path d="M157 100 C157 108 140 110 132 100 C140 90 157 92 157 100Z" fill="#D7261E" />
            <path d="M132 125 C124 125 122 108 132 100 C142 108 140 125 132 125Z" fill="#0A0A0A" />
            <path d="M107 100 C107 92 124 90 132 100 C124 110 107 108 107 100Z" fill="#0A0A0A" />
            <circle cx="132" cy="100" r="6" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="2" />
          </g>
          {/* Dual RAM Slots */}
          <rect x="190" y="60" width="14" height="82" fill="#0A0A0A" />
          <rect x="212" y="60" width="14" height="82" fill="#D7261E" stroke="#0A0A0A" strokeWidth="2" />
          {/* NVMe M.2 SSD Slot */}
          <rect x="94" y="160" width="136" height="28" fill="#0A0A0A" />
          <text x="106" y="178" fill="#F2EFE8" fontFamily="IBM Plex Mono, monospace" fontSize="11" fontWeight="700">
            NVMe SSD // OK
          </text>
          {/* Diagnostic Telemetry Panel on Right */}
          <rect x="296" y="54" width="118" height="172" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3" />
          <text x="308" y="76" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700">
            DIAGNOSTIC
          </text>
          <text x="308" y="102" fill="#D7261E" fontFamily="IBM Plex Mono, monospace" fontSize="11" fontWeight="700">
            TEMP: 41°C
          </text>
          <rect x="308" y="114" width="90" height="8" fill="#DEDAD0" />
          <rect className="meter-pulse" x="308" y="114" width="76" height="8" fill="#D7261E" />
          <text x="308" y="146" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700">
            MEM TEST: PASS
          </text>
          <text x="308" y="166" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700">
            BOOT: FAST
          </text>
          <circle className="led-blink" cx="315" cy="196" r="4" fill="#D7261E" />
          <text x="326" y="200" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700">
            BENCH READY
          </text>
        </svg>
      )}

      {kind === 'office' && (
        <svg className="work-diagram-svg" viewBox="0 0 460 280" fill="none" aria-hidden="true">
          {/* Complete Office Ecosystem: Router + 2 PCs + Printer + CCTV */}
          <path className="packet-flow" d="M230 74 L110 175 M230 74 L230 175 M230 74 L352 175" stroke="#D7261E" strokeWidth="2.5" strokeDasharray="5 5" />
          <rect x="178" y="42" width="104" height="36" fill="#0A0A0A" />
          <text x="192" y="64" fill="#F2EFE8" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="700">
            OFFICE SWITCH
          </text>
          {/* Workstation 1 */}
          <rect x="58" y="175" width="96" height="58" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3" />
          <text x="70" y="200" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700">
            PC_DESK 01
          </text>
          <circle className="led-blink" cx="74" cy="216" r="3" fill="#D7261E" />
          {/* Network Printer */}
          <rect x="182" y="175" width="96" height="58" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3" />
          <g className="paper-feed">
            <rect x="206" y="158" width="48" height="20" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2" />
          </g>
          <text x="196" y="206" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700">
            LAN PRINTER
          </text>
          {/* CCTV Gate Node */}
          <rect x="306" y="175" width="96" height="58" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3" />
          <text x="320" y="200" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700">
            ENTRY CCTV
          </text>
          <circle className="led-blink" cx="322" cy="216" r="3" fill="#D7261E" />
        </svg>
      )}

      <span className="visual-bottom">INFLUX SYSTEMS // LIVE HARDWARE SCHEMATIC</span>
    </div>
  );
}

/** 6 Animated Anime-Technical Shop Product Visuals */
export function ProductLiveVisual({ icon, badge }: { icon: string; badge?: boolean }) {
  return (
    <div className="product-visual">
      <div className="blueprint-grid" />
      {badge && <span className="holo-badge">BENCH PICK ✳</span>}
      <div className={`product-object object-${icon}`}>
        {icon === 'camera' && (
          <svg viewBox="0 0 220 180" fill="none" aria-hidden="true">
            {/* Scanning red IR cone */}
            <path className="ir-cone-pulse" d="M188 80 L220 52 V108 Z" fill="#D7261E" opacity="0.22" />
            <path d="M33 50L143 35L188 60L80 79Z" fill="#F2EFE8" stroke="currentColor" strokeWidth="4" />
            <path d="M33 50L80 79V117L33 91Z" fill="#AAA79D" stroke="currentColor" strokeWidth="4" />
            <path d="M80 79L188 60V100L80 117Z" fill="#D8D4CB" stroke="currentColor" strokeWidth="4" />
            <path d="M126 39L176 58L160 61L111 42Z" fill="#D7261E" />
            <ellipse cx="185" cy="80" rx="22" ry="29" fill="#0A0A0A" />
            <ellipse className="optic-breathe" cx="185" cy="80" rx="13" ry="19" fill="#D7261E" />
            <ellipse cx="185" cy="80" rx="7" ry="11" fill="#0A0A0A" />
            <circle cx="181" cy="73" r="3" fill="#F2EFE8" />
            <circle className="led-blink" cx="54" cy="79" r="3.5" fill="#D7261E" />
            <path d="M109 113L121 146H147L158 105M108 148H160" stroke="currentColor" strokeWidth="4" />
          </svg>
        )}

        {icon === 'desktop' && (
          <svg viewBox="0 0 220 180" fill="none" aria-hidden="true">
            {/* Monitor with live diagnostic waveform */}
            <path d="M18 32H148V122H18Z" fill="#D8D4CB" stroke="currentColor" strokeWidth="4.5" />
            <path d="M27 41H139V108H27Z" fill="#0A0A0A" />
            <path
              className="packet-flow"
              d="M34 86 L58 64 L76 80 L102 50 L128 66"
              stroke="#D7261E"
              strokeWidth="3"
              strokeDasharray="6 4"
            />
            <circle cx="40" cy="53" r="2.5" fill="#F2EFE8" />
            <text x="48" y="56" fill="#F2EFE8" fontFamily="monospace" fontSize="9">
              SYS_OK
            </text>
            <path d="M83 122V146M55 147H112" stroke="currentColor" strokeWidth="4.5" />
            {/* Tempered-glass PC Tower with TWO spinning anime cooling fans */}
            <rect x="158" y="28" width="46" height="120" fill="#EAE6DC" stroke="currentColor" strokeWidth="4" />
            <circle cx="181" cy="62" r="14" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="2.5" />
            <g className="spin-fan" style={{ transformOrigin: '181px 62px' }}>
              <path d="M181 50V74M169 62H193" stroke="#D7261E" strokeWidth="4" />
            </g>
            <circle cx="181" cy="100" r="14" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="2.5" />
            <g className="spin-fan" style={{ transformOrigin: '181px 100px' }}>
              <path d="M181 88V112M169 100H193" stroke="#0A0A0A" strokeWidth="4" />
            </g>
            <circle className="led-blink" cx="181" cy="134" r="3.5" fill="#D7261E" />
          </svg>
        )}

        {icon === 'drive' && (
          <svg viewBox="0 0 220 180" fill="none" aria-hidden="true">
            <path d="M36 46L161 29L190 49V129L64 150L36 129Z" fill="#BDB9AF" stroke="currentColor" strokeWidth="4" />
            <path d="M64 67L190 49V129L64 150Z" fill="#EAE6DC" stroke="currentColor" strokeWidth="4" />
            <path d="M36 46L64 67V150L36 129Z" fill="#9D9A91" stroke="currentColor" strokeWidth="4" />
            <path d="M83 80L169 67V117L83 131Z" fill="#0A0A0A" />
            <text x="95" y="103" fill="#F2EFE8" fontFamily="IBM Plex Mono, monospace" fontSize="21" fontWeight="700">
              NVMe
            </text>
            {/* Animated high-speed red read/write data bar */}
            <path className="packet-flow-fast" d="M92 114 L160 104" stroke="#D7261E" strokeWidth="4" strokeDasharray="8 6" />
            <circle className="led-blink" cx="176" cy="62" r="3.5" fill="#D7261E" />
            <path d="M81 144V155M94 142V153M107 140V151M120 138V149M133 136V147M146 134V145" stroke="currentColor" strokeWidth="3" />
          </svg>
        )}

        {icon === 'router' && (
          <svg viewBox="0 0 220 180" fill="none" aria-hidden="true">
            {/* Live Wi-Fi radio waves */}
            <path className="wifi-wave w1" d="M82 54 Q110 34 138 54" stroke="#D7261E" strokeWidth="3" strokeLinecap="round" />
            <path className="wifi-wave w2" d="M68 40 Q110 12 152 40" stroke="#D7261E" strokeWidth="2.8" strokeLinecap="round" />
            <path className="wifi-wave w3" d="M54 26 Q110 -8 166 26" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M50 104L40 28M168 103L180 27" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            <circle cx="40" cy="26" r="4.5" fill="#D7261E" />
            <circle cx="180" cy="25" r="4.5" fill="#D7261E" />
            <path d="M34 106H176L195 124V148H25V124Z" fill="#D8D4CB" stroke="currentColor" strokeWidth="4" />
            <path d="M25 124H195" stroke="currentColor" strokeWidth="3" />
            <circle className="led-blink" cx="55" cy="136" r="4" fill="#D7261E" />
            <circle className="led-blink-delay" cx="74" cy="136" r="4" fill="#0A0A0A" />
            <circle className="led-blink" cx="93" cy="136" r="4" fill="#D7261E" />
            <circle className="led-blink-delay" cx="112" cy="136" r="4" fill="#0A0A0A" />
          </svg>
        )}

        {icon === 'printer' && (
          <svg viewBox="0 0 220 180" fill="none" aria-hidden="true">
            <path d="M56 26H164V80H56Z" fill="#F2EFE8" stroke="currentColor" strokeWidth="4" />
            <path d="M29 74H190V134H29Z" fill="#AAA79D" stroke="currentColor" strokeWidth="4" />
            <rect x="46" y="88" width="90" height="8" fill="#0A0A0A" />
            <circle className="led-blink" cx="170" cy="92" r="4.5" fill="#D7261E" />
            {/* Animated fresh test sheet sliding out */}
            <g className="paper-feed">
              <path d="M49 108H169V158H49Z" fill="#FFFFFF" stroke="currentColor" strokeWidth="4" />
              <path d="M67 124H150M67 136H135M67 146H112" stroke="#D7261E" strokeWidth="2.5" />
            </g>
          </svg>
        )}

        {icon !== 'camera' && icon !== 'desktop' && icon !== 'drive' && icon !== 'router' && icon !== 'printer' && (
          <svg viewBox="0 0 220 180" fill="none" aria-hidden="true">
            {/* Mechanical Keyboard + Optical Mouse with animated key press */}
            <path d="M16 80H162V134H16Z" fill="#D8D4CB" stroke="currentColor" strokeWidth="4" />
            {Array.from({ length: 7 }, (_, i) => (
              <rect
                key={i}
                className={i === 2 || i === 5 ? 'key-press' : ''}
                x={25 + i * 18}
                y="92"
                width="13"
                height="14"
                fill={i === 2 ? '#D7261E' : '#F2EFE8'}
                stroke="#0A0A0A"
                strokeWidth="2"
              />
            ))}
            <rect x="44" y="112" width="90" height="12" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="2" />
            {/* Mouse with live sensor pulse */}
            <rect x="174" y="84" width="32" height="50" rx="14" fill="#EAE6DC" stroke="currentColor" strokeWidth="4" />
            <line x1="190" y1="86" x2="190" y2="104" stroke="#0A0A0A" strokeWidth="2.5" />
            <circle className="led-blink" cx="190" cy="98" r="3" fill="#D7261E" />
          </svg>
        )}
      </div>
      <span className="product-visual-label">INFLUX // LIVE HARDWARE FILE</span>
    </div>
  );
}

/** Interactive Anime Section Mascots: MONO (Services) & ROUTER (Shop) */
export function AnimeMascot({ kind }: { kind: 'mono' | 'router' }) {
  const monoLines = ['Need a fix?', 'SSD = Zoom!', 'Fans clean!', 'Bring it in!'];
  const routerLines = ['Pick me.', 'Full Wi-Fi bars!', 'Zero dead zones!', 'CAT6 ready!'];
  const list = kind === 'mono' ? monoLines : routerLines;

  const [idx, setIdx] = useState(0);
  const [pop, setPop] = useState(false);

  function cycle() {
    setIdx((i) => (i + 1) % list.length);
    setPop(true);
    window.setTimeout(() => setPop(false), 380);
  }

  return (
    <button
      type="button"
      onClick={cycle}
      className={`section-mascot mascot-${kind} ${pop ? 'mascot-hop' : ''}`}
      aria-label={`Interact with ${kind === 'mono' ? 'MONO computer' : 'ROUTER network'} mascot`}
    >
      <span className="speech">{list[idx]}</span>
      {kind === 'mono' ? (
        <svg viewBox="0 0 112 104" fill="none" aria-hidden="true">
          {/* Anime Monitor Character holding a tiny red screwdriver */}
          <path d="M14 14H84L92 22V72H14Z" fill="#EAE6DC" stroke="#0A0A0A" strokeWidth="4" />
          <rect x="22" y="23" width="60" height="40" fill="#0A0A0A" />
          {/* Shiny Anime Eyes */}
          <ellipse className="pet-eye" cx="39" cy="40" rx="4" ry="5.5" fill="#F2EFE8" />
          <circle cx="38" cy="38" r="1.6" fill="#D7261E" />
          <ellipse className="pet-eye" cx="65" cy="40" rx="4" ry="5.5" fill="#F2EFE8" />
          <circle cx="64" cy="38" r="1.6" fill="#D7261E" />
          {/* Blush + Happy Cat-Mouth Smile */}
          <circle cx="31" cy="49" r="3" fill="#D7261E" opacity="0.7" />
          <circle cx="73" cy="49" r="3" fill="#D7261E" opacity="0.7" />
          <path d="M43 49 Q52 58 61 49" stroke="#D7261E" strokeWidth="3" strokeLinecap="round" />
          {/* Stand & Tiny Screwdriver Prop */}
          <path d="M46 73V84M62 73V84M33 85H75" stroke="#0A0A0A" strokeWidth="4" strokeLinecap="round" />
          <path d="M93 58 L106 42" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="90" y="55" width="9" height="14" rx="2" transform="rotate(38 90 55)" fill="#D7261E" stroke="#0A0A0A" strokeWidth="2.5" />
          <circle className="led-blink" cx="80" cy="67" r="2.2" fill="#D7261E" />
        </svg>
      ) : (
        <svg viewBox="0 0 116 106" fill="none" aria-hidden="true">
          {/* Live Wi-Fi rings above ROUTER-KUN */}
          <path className="wifi-wave w1" d="M42 22 Q58 10 74 22" stroke="#D7261E" strokeWidth="2.5" strokeLinecap="round" />
          <path className="wifi-wave w2" d="M33 13 Q58 -2 83 13" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
          <path d="M25 51L18 16M88 49L97 14" stroke="#0A0A0A" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="17" cy="14" r="5" fill="#D7261E" stroke="#0A0A0A" strokeWidth="2" />
          <circle cx="98" cy="12" r="5" fill="#D7261E" stroke="#0A0A0A" strokeWidth="2" />
          <path d="M16 49H92L102 58V80H12V58Z" fill="#EAE6DC" stroke="#0A0A0A" strokeWidth="4" />
          <path d="M12 59H102" stroke="#0A0A0A" strokeWidth="3" />
          <ellipse className="pet-eye" cx="43" cy="69" rx="3.2" ry="4.5" fill="#0A0A0A" />
          <circle cx="42" cy="67.5" r="1.2" fill="#F2EFE8" />
          <ellipse className="pet-eye" cx="69" cy="69" rx="3.2" ry="4.5" fill="#0A0A0A" />
          <circle cx="68" cy="67.5" r="1.2" fill="#F2EFE8" />
          <circle cx="34" cy="73" r="3.2" fill="#D7261E" opacity="0.6" />
          <circle cx="78" cy="73" r="3.2" fill="#D7261E" opacity="0.6" />
          <path d="M49 74 Q56 80 63 74" stroke="#D7261E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M26 81V90M86 81V90" stroke="#0A0A0A" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )}
      <span className="friend-id">{kind === 'mono' ? 'MONO' : 'ROUTER'}</span>
    </button>
  );
}

/** PLUG-01 Footer Pet — wanders safely in footer, follows cursor horizontally, hops & sparks on click */
export function PlugPet() {
  const [line, setLine] = useState('Plug me in.');
  const [x, setX] = useState(52);
  const [dir, setDir] = useState<1 | -1>(1);
  const [hover, setHover] = useState(false);
  const [hop, setHop] = useState(false);
  const area = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const phrases = ['Plug me in.', 'Hi.', 'Boop.', 'Pet me?', 'I live here.', 'Follow me?'];
    const id = window.setInterval(() => {
      if (!hover) {
        setX((prev) => {
          const next = 15 + Math.random() * 70;
          setDir(next >= prev ? 1 : -1);
          return next;
        });
        setLine(phrases[Math.floor(Math.random() * phrases.length)]);
      }
    }, 4000);
    return () => window.clearInterval(id);
  }, [hover]);

  function move(e: MouseEvent<HTMLDivElement>) {
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const r = area.current?.getBoundingClientRect();
    if (r && !hover) {
      const target = Math.max(14, Math.min(86, ((e.clientX - r.left) / r.width) * 100));
      setDir(target >= x ? 1 : -1);
      setX(target);
    }
  }

  function pet() {
    const reactions = ['Boop.', 'Hi!', 'Plug me in.'];
    setLine(reactions[Math.floor(Math.random() * reactions.length)]);
    setHop(true);
    window.setTimeout(() => setHop(false), 460);
  }

  return (
    <div ref={area} className="pet-area" onMouseMove={move}>
      <button
        className={`plug ${hop ? 'hop' : ''}`}
        type="button"
        style={{ left: `${x}%` }}
        aria-label="Pet Plug-01, the shop mascot"
        onMouseEnter={() => {
          setHover(true);
          setLine('Hi.');
        }}
        onMouseLeave={() => setHover(false)}
        onClick={pet}
      >
        <span className="speech">{line}</span>
        <svg
          viewBox="0 0 140 130"
          fill="none"
          aria-hidden="true"
          style={{ transform: dir === -1 ? 'scaleX(-1)' : undefined }}
        >
          {/* Electric spark burst when booped */}
          {hop && (
            <g stroke="#D7261E" strokeWidth="3" strokeLinecap="round">
              <path d="M22 20L12 10M96 20L106 10M59 4V-4" />
            </g>
          )}
          {/* Wagging cable tail */}
          <path
            className="cable-tail"
            d="M73 105C91 102 94 127 121 118"
            stroke="#EAE6DC"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Prongs */}
          <path d="M43 35V12M75 35V12" stroke="#EAE6DC" strokeWidth="8" strokeLinecap="round" />
          {/* Plug body */}
          <path
            d="M27 40Q27 33 35 33H82Q89 33 89 41V74Q89 100 59 101Q27 99 27 73Z"
            fill="#EAE6DC"
            stroke="#0A0A0A"
            strokeWidth="5"
          />
          <path d="M33 46H84" stroke="#FFFFFF" strokeWidth="4" />
          {/* Anime Eyes with shine */}
          <ellipse className="pet-eye" cx="47" cy="65" rx="3.8" ry="5.5" fill="#0A0A0A" />
          <circle cx="46" cy="63" r="1.5" fill="#F2EFE8" />
          <ellipse className="pet-eye" cx="69" cy="65" rx="3.8" ry="5.5" fill="#0A0A0A" />
          <circle cx="68" cy="63" r="1.5" fill="#F2EFE8" />
          {/* Blush cheeks */}
          <circle cx="36" cy="76" r="5" fill="#D7261E" opacity=".68" />
          <circle cx="80" cy="76" r="5" fill="#D7261E" opacity=".68" />
          <path d="M51 79Q59 86 67 79" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" />
          <path d="M40 98L36 108M76 97L80 108" stroke="#EAE6DC" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <span className="friend-id">PLUG-01</span>
      </button>
    </div>
  );
}
