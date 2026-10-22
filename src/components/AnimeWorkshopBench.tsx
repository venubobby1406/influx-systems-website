import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type BenchStation = {
  id: 'pc' | 'cctv' | 'wifi' | 'printer';
  code: string;
  tab: string;
  title: string;
  subtitle: string;
  actionLabel: string;
  activeActionLabel: string;
  bookingService: string;
  steps: [string, string, string];
  telemetry: [string, string, string];
};

const STATIONS: BenchStation[] = [
  {
    id: 'pc',
    code: 'BENCH_01 // PC & LAPTOP SURGERY',
    tab: '01 / Computer repair',
    title: 'Inside a real machine checkup.',
    subtitle:
      'Dusty fans, dead power rails, sluggish hard drives or broken hinges—we open it on an ESD mat, test before replacing, and keep every tiny screw accounted for.',
    actionLabel: '⚡ Run thermal & SSD check',
    activeActionLabel: '✓ Boost active: Fan 2400 RPM · Rails OK',
    bookingService: 'Computer repair',
    steps: [
      'Multimeter power-rail & port check',
      'Fan cleaning, fresh thermal paste & hinge care',
      'NVMe SSD / RAM upgrade & boot stress-test',
    ],
    telemetry: ['CPU: 41°C COOL', 'RAILS: 5.0V / 3.3V PASS', 'SCREW TRAY: 6/6 SAFE'],
  },
  {
    id: 'cctv',
    code: 'BENCH_02 // CCTV & DVR TEST RIG',
    tab: '02 / CCTV & night IR',
    title: 'Tested on the bench before it goes on your wall.',
    subtitle:
      'We pair cameras with the DVR/NVR, check night-vision IR throw, test storage recording and set up phone viewing clearly so you are never left guessing.',
    actionLabel: '◎ Toggle night-vision IR test',
    activeActionLabel: '✓ Night IR locked: 30m beam · 4CH recording',
    bookingService: 'CCTV installation',
    steps: [
      'Camera angle & blind-spot planning',
      'Clean BNC / PoE cabling & power supply check',
      'DVR/NVR hard-drive recording & mobile view test',
    ],
    telemetry: ['OPTICS: 4K / IR 30M', 'STORAGE: NVR REC ●', 'CHANNELS: 04/04 LIVE'],
  },
  {
    id: 'wifi',
    code: 'BENCH_03 // WI-FI & RJ45 CABLE LAB',
    tab: '03 / Wi-Fi & networking',
    title: 'Every pin crimped. Every corner connected.',
    subtitle:
      'Weak Wi-Fi and random office disconnects usually come down to bad cabling or router placement. We crimp, pin-test all 8 wires and map clean coverage.',
    actionLabel: '⌁ Crimp & ping all 8 LAN pins',
    activeActionLabel: '✓ Pins 1–8 verified · Full signal wave',
    bookingService: 'Networking',
    steps: [
      'Router & access-point placement for real walls',
      'CAT6 routing, RJ45 crimping & 8-pin continuity test',
      'Switch, office PCs & shared printer linking',
    ],
    telemetry: ['LAN PINS: 1-2-3-4-5-6-7-8', 'SIGNAL: FULL BARS', 'PACKET LOSS: 0.0%'],
  },
  {
    id: 'printer',
    code: 'BENCH_04 // PRINTER & OFFICE TUNE-UP',
    tab: '04 / Printers & UPS',
    title: 'The everyday gear that keeps billing moving.',
    subtitle:
      'Paper jams, faded prints, scanner setup or a beeping office UPS—we clean rollers, check pickup gears and get your desk peripherals talking properly.',
    actionLabel: '▣ Feed fresh test page',
    activeActionLabel: '✓ Rollers clean · Test sheet sharp',
    bookingService: 'Printer',
    steps: [
      'Pickup roller cleaning & paper-path inspection',
      'USB / Wi-Fi print & scan driver setup',
      'UPS backup check, keyboard, mouse & cables',
    ],
    telemetry: ['ROLLERS: CLEANED', 'PRINT QUEUE: READY', 'UPS BACKUP: STEADY'],
  },
];

export function AnimeWorkshopBench({
  renderBookingButton,
  compact = false,
}: {
  renderBookingButton: (service: string, label: string) => ReactNode;
  compact?: boolean;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [boosted, setBoosted] = useState(false);
  const [pinStep, setPinStep] = useState(1);

  const station = STATIONS[activeIdx];

  // Animate the 8-pin RJ45 cable tester LEDs continuously
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const speed = boosted ? 180 : 420;
    const id = window.setInterval(() => {
      setPinStep((p) => (p % 8) + 1);
    }, speed);
    return () => window.clearInterval(id);
  }, [boosted]);

  function selectStation(idx: number) {
    setActiveIdx(idx);
    setBoosted(false);
  }

  function triggerBenchAction() {
    setBoosted((prev) => !prev);
  }

  return (
    <section className={`section bench-section ${compact ? 'bench-compact' : ''}`}>
      <div className="section-heading">
        <div>
          <span className="label">[LIVE BENCH.01] DAY IN THE LIFE OF A REPAIR</span>
          <h2>{'Inside the repair bench.\nWatch the gear work.'}</h2>
          <p>
            Peek inside how we diagnose computers, align CCTV cameras, pin-test Wi-Fi cabling and
            tune up office printers at our Shapur Nagar workshop.
          </p>
        </div>
        <div className="bench-live-pill">
          <i className="live-dot-badge" /> INTERACTIVE ANIME SCHEMATIC
        </div>
      </div>

      {/* Workbench Station Selector Tabs */}
      <div className="bench-tabs" role="tablist" aria-label="Repair workbench stations">
        {STATIONS.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={activeIdx === idx}
            className={`bench-tab ${activeIdx === idx ? 'is-active' : ''}`}
            onClick={() => selectStation(idx)}
          >
            <span className="label">{s.tab}</span>
            <strong>{idx === activeIdx ? '● ON BENCH' : 'INSPECT ↗'}</strong>
          </button>
        ))}
      </div>

      {/* Main Split Workbench Console */}
      <div className={`bench-console ${boosted ? 'is-boosted' : ''}`} role="tabpanel">
        {/* Left: Live Animated Anime-Technical SVG Diorama */}
        <div className="bench-stage">
          <div className="blueprint-grid" />
          <div className="bench-stage-top">
            <span>
              <b className="live-dot">●</b> {station.code}
            </span>
            <span>{boosted ? 'MODE // TURBO TEST' : 'MODE // LIVE BENCH'}</span>
          </div>

          {/* STATION 01: PC & LAPTOP REPAIR MAT */}
          {station.id === 'pc' && (
            <svg className="bench-svg" viewBox="0 0 640 400" fill="none" aria-hidden="true">
              {/* ESD Anti-static Repair Mat */}
              <rect x="28" y="48" width="584" height="304" fill="#EAE6DC" stroke="#0A0A0A" strokeWidth="3.5" />
              <rect x="38" y="58" width="564" height="284" stroke="#0A0A0A" strokeWidth="1" strokeDasharray="5 5" />

              {/* Open Motherboard Assembly */}
              <rect x="64" y="80" width="318" height="236" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="4" />
              {/* Glowing red copper circuit traces */}
              <path
                className={boosted ? 'packet-flow-fast' : 'packet-flow'}
                d="M198 140 H352 M198 164 H352 M146 218 V292 H288"
                stroke="#D7261E"
                strokeWidth="2.8"
                strokeDasharray="6 6"
              />

              {/* Heatsink + Spinning Anime Cooling Fan */}
              <rect x="86" y="100" width="106" height="106" fill="#DEDAD0" stroke="#0A0A0A" strokeWidth="3.5" />
              <circle cx="139" cy="153" r="40" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3" />
              <g
                className={boosted ? 'spin-fan-turbo' : 'spin-fan'}
                style={{ transformOrigin: '139px 153px' }}
              >
                <path d="M139 116 C152 118 154 140 139 153 C124 140 126 118 139 116Z" fill="#0A0A0A" />
                <path d="M176 153 C174 166 152 168 139 153 C152 138 174 140 176 153Z" fill="#D7261E" />
                <path d="M139 190 C126 188 124 166 139 153 C154 166 152 188 139 190Z" fill="#0A0A0A" />
                <path d="M102 153 C104 140 126 138 139 153 C126 168 104 166 102 153Z" fill="#D7261E" />
                <circle cx="139" cy="153" r="9" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="2.5" />
              </g>
              {/* Manga wind swirl ticks around fan */}
              <path d="M92 94 Q139 82 184 94" stroke="#D7261E" strokeWidth="2" strokeDasharray="4 4" />

              {/* Dual DDR4/DDR5 RAM Sticks */}
              <rect x="216" y="98" width="20" height="110" fill="#0A0A0A" />
              <rect x="246" y="98" width="20" height="110" fill="#D7261E" stroke="#0A0A0A" strokeWidth="2.5" />
              <text x="276" y="122" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700">
                DUAL RAM
              </text>
              <text x="276" y="136" fill="#D7261E" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700">
                16GB OK
              </text>

              {/* NVMe M.2 SSD Module with animated read/write bar */}
              <g className={boosted ? 'ssd-seat-pop' : ''}>
                <rect x="86" y="226" width="184" height="42" fill="#0A0A0A" stroke="#0A0A0A" strokeWidth="2" />
                <rect x="92" y="232" width="8" height="30" fill="#EAE6DC" />
                <text x="110" y="251" fill="#F2EFE8" fontFamily="IBM Plex Mono, monospace" fontSize="13" fontWeight="700">
                  NVMe M.2 SSD
                </text>
                <path
                  className="packet-flow-fast"
                  d="M214 247 H260"
                  stroke="#D7261E"
                  strokeWidth="5"
                  strokeDasharray="6 4"
                />
              </g>

              {/* Multimeter + Red Test Probe touching motherboard pad */}
              <rect x="414" y="78" width="108" height="142" rx="4" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3.5" />
              <rect x="426" y="92" width="84" height="40" fill="#0A0A0A" />
              <text x="434" y="118" fill="#F2EFE8" fontFamily="IBM Plex Mono, monospace" fontSize="16" fontWeight="700">
                {boosted ? '05.02V' : '05.00V'}
              </text>
              <circle cx="468" cy="168" r="20" fill="#DEDAD0" stroke="#0A0A0A" strokeWidth="3" />
              <path d="M468 168 L480 156" stroke="#D7261E" strokeWidth="3.5" strokeLinecap="round" />
              {/* Probe cable + Manga spark at contact point */}
              <path d="M446 220 C430 268 370 250 326 196" stroke="#D7261E" strokeWidth="3.5" fill="none" />
              <path d="M342 212 L318 188" stroke="#0A0A0A" strokeWidth="4" strokeLinecap="round" />
              <g className="spark-pop" style={{ transformOrigin: '318px 188px' }}>
                <path d="M318 174V164M304 188H294M328 178L336 170M308 178L300 170" stroke="#D7261E" strokeWidth="2.5" strokeLinecap="round" />
              </g>

              {/* Cute Anime Mini-Monitor Buddy on Right */}
              <g transform="translate(534, 92)">
                <rect x="0" y="0" width="60" height="50" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3" />
                <rect x="6" y="6" width="48" height="34" fill="#0A0A0A" />
                <circle cx="20" cy="20" r="2.6" fill="#F2EFE8" />
                <circle cx="40" cy="20" r="2.6" fill="#F2EFE8" />
                <path
                  d={boosted ? 'M19 28 Q30 37 41 28' : 'M22 29 Q30 34 38 29'}
                  stroke="#D7261E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <text x="2" y="64" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="8" fontWeight="700">
                  {boosted ? 'HAPPY!' : 'DIAG_OK'}
                </text>
              </g>

              {/* Magnetic Screw Tray (6/6 Screws Kept Safe!) */}
              <rect x="414" y="244" width="178" height="72" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3" />
              <text x="426" y="262" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700">
                MAGNETIC SCREW TRAY
              </text>
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <g key={n} transform={`translate(${434 + n * 26}, 288)`}>
                  <circle cx="0" cy="0" r="7" fill="#DEDAD0" stroke="#0A0A0A" strokeWidth="2" />
                  <path d="M-3 0H3M0 -3V3" stroke="#0A0A0A" strokeWidth="1.6" />
                </g>
              ))}
            </svg>
          )}

          {/* STATION 02: CCTV & NVR LIVE TEST RIG */}
          {station.id === 'cctv' && (
            <svg className="bench-svg" viewBox="0 0 640 400" fill="none" aria-hidden="true">
              <rect x="28" y="48" width="584" height="304" fill="#EAE6DC" stroke="#0A0A0A" strokeWidth="3.5" />

              {/* Left: Panning Anime Bullet Camera + IR Cone */}
              <g transform="translate(56, 86)">
                <path d="M12 96V156H44" stroke="#0A0A0A" strokeWidth="5" strokeLinecap="round" />
                <g className="cctv-pan-wide" style={{ transformOrigin: '36px 76px' }}>
                  {/* Night-vision IR beam */}
                  <path
                    d="M150 66 L300 18 V138 Z"
                    fill="#D7261E"
                    opacity={boosted ? '0.32' : '0.14'}
                  />
                  <path d="M22 46L134 34L154 52L42 66Z" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3.5" />
                  <path d="M42 66L154 52V90L42 102Z" fill="#DEDAD0" stroke="#0A0A0A" strokeWidth="3.5" />
                  <path d="M104 37L146 50L132 53L90 40Z" fill="#D7261E" />
                  <ellipse cx="154" cy="71" rx="16" ry="22" fill="#0A0A0A" />
                  <ellipse
                    cx="154"
                    cy="71"
                    rx="9"
                    ry="13"
                    fill={boosted ? '#D7261E' : '#4A4B46'}
                  />
                  <circle cx="151" cy="65" r="3" fill="#F2EFE8" />
                  <circle className="led-blink" cx="56" cy="82" r="3.5" fill="#D7261E" />
                </g>
                <text x="12" y="182" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700">
                  CAM_A // {boosted ? 'IR NIGHT ON' : 'DAY OPTICS'}
                </text>
              </g>

              {/* PoE Cable feeding NVR & 4-Channel Monitor */}
              <path
                className={boosted ? 'packet-flow-fast' : 'packet-flow'}
                d="M100 242 H310 V272"
                stroke="#D7261E"
                strokeWidth="3"
                strokeDasharray="6 6"
              />

              {/* Right: 4-Channel Surveillance Test Monitor */}
              <rect x="318" y="74" width="262" height="176" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="4" />
              <rect x="330" y="86" width="238" height="142" fill="#0A0A0A" />
              <path d="M449 86V228M330 157H568" stroke="#EAE6DC" strokeWidth="1.5" opacity="0.5" />

              {/* 4 Live Camera Feed Quadrants */}
              {[
                [338, 94, 'CH01 // GATE'],
                [457, 94, 'CH02 // SHOP'],
                [338, 165, 'CH03 // DESK'],
                [457, 165, 'CH04 // STORE'],
              ].map(([x, y, ch], idx) => (
                <g key={String(ch)} transform={`translate(${x}, ${y})`}>
                  <text x="4" y="11" fill={boosted ? '#D7261E' : '#F2EFE8'} fontFamily="IBM Plex Mono, monospace" fontSize="8" fontWeight="700">
                    {ch}
                  </text>
                  <path
                    d="M8 46 L34 26 L72 26 L96 46"
                    stroke={boosted ? '#D7261E' : '#9E9B93'}
                    strokeWidth="1.5"
                  />
                  {idx === 0 && (
                    <rect className="target-drift" x="42" y="20" width="22" height="22" stroke="#D7261E" strokeWidth="1.8" />
                  )}
                </g>
              ))}

              {/* 4CH NVR Recorder Unit underneath Monitor */}
              <rect x="318" y="268" width="262" height="58" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3.5" />
              <text x="334" y="294" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="11" fontWeight="700">
                INFLUX NVR // 2TB SURVEILLANCE HDD
              </text>
              <circle className="led-blink" cx="338" cy="310" r="3.5" fill="#D7261E" />
              <circle className="led-blink-delay" cx="352" cy="310" r="3.5" fill="#0A0A0A" />
              <text x="368" y="313" fill="#D7261E" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700">
                REC STREAM STABLE
              </text>
            </svg>
          )}

          {/* STATION 03: WI-FI ROUTER & 8-PIN RJ45 CABLE LAB */}
          {station.id === 'wifi' && (
            <svg className="bench-svg" viewBox="0 0 640 400" fill="none" aria-hidden="true">
              <rect x="28" y="48" width="584" height="304" fill="#EAE6DC" stroke="#0A0A0A" strokeWidth="3.5" />

              {/* Left: Expressive Anime Dual-Band Router */}
              <g transform="translate(68, 128)">
                <path className="wifi-wave w1" d="M62 -12 Q105 -42 148 -12" stroke="#D7261E" strokeWidth="3.5" strokeLinecap="round" />
                <path className="wifi-wave w2" d="M42 -28 Q105 -68 168 -28" stroke="#D7261E" strokeWidth="3" strokeLinecap="round" />
                <path className="wifi-wave w3" d="M22 -44 Q105 -94 188 -44" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />

                <path d="M40 76L26 6M170 76L184 6" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
                <circle cx="26" cy="4" r="6" fill="#D7261E" stroke="#0A0A0A" strokeWidth="2.5" />
                <circle cx="184" cy="4" r="6" fill="#D7261E" stroke="#0A0A0A" strokeWidth="2.5" />

                <rect x="18" y="76" width="174" height="62" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="4" />
                {/* Cute anime router face */}
                <circle cx="78" cy="104" r="4" fill="#0A0A0A" />
                <circle cx="132" cy="104" r="4" fill="#0A0A0A" />
                <circle cx="66" cy="112" r="4" fill="#D7261E" opacity="0.6" />
                <circle cx="144" cy="112" r="4" fill="#D7261E" opacity="0.6" />
                <path d="M95 112 Q105 121 115 112" stroke="#D7261E" strokeWidth="3" strokeLinecap="round" />
                <text x="20" y="162" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="700">
                  DUAL-BAND ROUTER // {boosted ? '5GHz TURBO' : 'ONLINE'}
                </text>
              </g>

              {/* CAT6 Patch Cable with live packets */}
              <path
                className={boosted ? 'packet-flow-fast' : 'packet-flow'}
                d="M260 235 C312 235 312 165 362 165"
                stroke="#D7261E"
                strokeWidth="4"
                strokeDasharray="7 6"
              />

              {/* Right: Live 8-Pin RJ45 LAN Cable Continuity Tester */}
              <g transform="translate(362, 82)">
                <rect x="0" y="0" width="128" height="222" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="4" />
                <rect x="142" y="28" width="76" height="194" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="4" />
                <text x="14" y="26" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="700">
                  LAN TESTER
                </text>
                <text x="154" y="52" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700">
                  REMOTE
                </text>

                {[1, 2, 3, 4, 5, 6, 7, 8].map((pin) => {
                  const lit = boosted || pin === pinStep;
                  return (
                    <g key={pin} transform={`translate(16, ${34 + pin * 20})`}>
                      <text x="0" y="9" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="700">
                        PIN {pin}
                      </text>
                      <rect
                        x="54"
                        y="0"
                        width="36"
                        height="11"
                        fill={lit ? '#D7261E' : '#DEDAD0'}
                        stroke="#0A0A0A"
                        strokeWidth="1.8"
                      />
                      <rect
                        x="146"
                        y="0"
                        width="28"
                        height="11"
                        fill={lit ? '#D7261E' : '#DEDAD0'}
                        stroke="#0A0A0A"
                        strokeWidth="1.8"
                      />
                    </g>
                  );
                })}
              </g>
            </svg>
          )}

          {/* STATION 04: PRINTER, GEARS & OFFICE UPS */}
          {station.id === 'printer' && (
            <svg className="bench-svg" viewBox="0 0 640 400" fill="none" aria-hidden="true">
              <rect x="28" y="48" width="584" height="304" fill="#EAE6DC" stroke="#0A0A0A" strokeWidth="3.5" />

              {/* Left: Anime Office Printer ejecting crisp test sheet */}
              <g transform="translate(68, 76)">
                <rect x="48" y="0" width="154" height="54" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3.5" />
                <rect x="14" y="48" width="222" height="108" fill="#DEDAD0" stroke="#0A0A0A" strokeWidth="4" />
                <rect x="34" y="68" width="118" height="18" fill="#0A0A0A" />
                <text x="42" y="80" fill="#F2EFE8" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700">
                  {boosted ? 'PRINTING TEST...' : 'READY // NO JAM'}
                </text>
                <circle className="led-blink" cx="204" cy="76" r="5" fill="#D7261E" />

                {/* Visible Mechanical Pickup Roller Gear */}
                <g className={boosted ? 'spin-fan-turbo' : 'spin-fan'} style={{ transformOrigin: '204px 120px' }}>
                  <circle cx="204" cy="120" r="16" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="3" />
                  <path d="M204 99V141M183 120H225M189 105L219 135M219 105L189 135" stroke="#0A0A0A" strokeWidth="3" />
                  <circle cx="204" cy="120" r="6" fill="#D7261E" />
                </g>

                {/* Animated Ejecting Test Page */}
                <g className={boosted ? 'paper-feed-fast' : 'paper-feed'}>
                  <rect x="52" y="132" width="146" height="114" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="3.5" />
                  <text x="68" y="158" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="11" fontWeight="700">
                    INFLUX TEST OK
                  </text>
                  <path d="M68 174H180M68 190H168M68 206H144" stroke="#D7261E" strokeWidth="3" />
                  <rect x="68" y="218" width="38" height="14" fill="#0A0A0A" />
                </g>
              </g>

              {/* Right: Office UPS Battery Backup + Mechanical Key Tester */}
              <g transform="translate(388, 86)">
                <rect x="0" y="0" width="182" height="144" fill="#F2EFE8" stroke="#0A0A0A" strokeWidth="4" />
                <text x="18" y="28" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="700">
                  OFFICE UPS // 230V
                </text>
                {[0, 1, 2, 3].map((bar) => (
                  <rect
                    key={bar}
                    x={18 + bar * 38}
                    y="46"
                    width="30"
                    height="22"
                    fill={bar < 3 || boosted ? '#D7261E' : '#DEDAD0'}
                    stroke="#0A0A0A"
                    strokeWidth="2.5"
                  />
                ))}
                <text x="18" y="96" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700">
                  BATTERY BACKUP: HEALTHY
                </text>
                <circle className="led-blink" cx="24" cy="118" r="4" fill="#D7261E" />
                <text x="36" y="122" fill="#0A0A0A" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="700">
                  SURGE PROTECTED
                </text>

                {/* Peripheral Keycap Row */}
                <rect x="0" y="168" width="182" height="64" fill="#DEDAD0" stroke="#0A0A0A" strokeWidth="3.5" />
                {['ESC', 'CTRL', 'DEL', 'OK'].map((k, i) => (
                  <g key={k} className={i === 3 ? 'key-press' : ''} transform={`translate(${14 + i * 41}, 182)`}>
                    <rect
                      width="35"
                      height="34"
                      fill={i === 3 ? '#D7261E' : '#F2EFE8'}
                      stroke="#0A0A0A"
                      strokeWidth="2.5"
                    />
                    <text
                      x="5"
                      y="21"
                      fill={i === 3 ? '#FFFFFF' : '#0A0A0A'}
                      fontFamily="IBM Plex Mono, monospace"
                      fontSize="9"
                      fontWeight="700"
                    >
                      {k}
                    </text>
                  </g>
                ))}
              </g>
            </svg>
          )}

          {/* Bottom Telemetry Readout Bar */}
          <div className="bench-telemetry">
            {station.telemetry.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        {/* Right: Human Explanation + Interactive Bench Trigger + Book CTA */}
        <div className="bench-details">
          <span className="label">[{station.code}]</span>
          <h3>{station.title}</h3>
          <p>{station.subtitle}</p>

          <div className="bench-checklist">
            <span className="label">ON THIS BENCH</span>
            {station.steps.map((step, i) => (
              <div key={step}>
                <span className="label">0{i + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>

          <div className="bench-controls">
            <button
              type="button"
              className={`bench-trigger ${boosted ? 'is-triggered' : ''}`}
              onClick={triggerBenchAction}
            >
              {boosted ? station.activeActionLabel : station.actionLabel}
            </button>
            {renderBookingButton(station.bookingService, `Book ${station.bookingService.toLowerCase()}`)}
          </div>
        </div>
      </div>
    </section>
  );
}
