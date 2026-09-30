import React, { useEffect, useState } from "react";

const pageCss = String.raw`
/* React theme fix: headings/titles must remain visible in both themes */
:root {
  --heading-color: #ffffff;
  --text-color: #ffffff;
}

html[data-theme="light"] {
  --heading-color: #111827;
  --text-color: #1f2937;
}

html[data-theme="dark"] {
  --heading-color: #ffffff;
  --text-color: #f8fafc;
}

html[data-theme="light"] h1,
html[data-theme="light"] h2,
html[data-theme="light"] h3,
html[data-theme="light"] h4,
html[data-theme="light"] h5,
html[data-theme="light"] h6,
html[data-theme="light"] .hero-title,
html[data-theme="light"] .hero h1,
html[data-theme="light"] .section-title,
html[data-theme="light"] .title,
html[data-theme="light"] .heading {
  color: var(--heading-color) !important;
}

html[data-theme="light"] .hero-title *,
html[data-theme="light"] .hero h1 *,
html[data-theme="light"] .section-title *,
html[data-theme="light"] .title *,
html[data-theme="light"] .heading * {
  color: inherit !important;
}

html[data-theme="light"] [class*="title"],
html[data-theme="light"] [class*="Title"] {
  color: var(--heading-color) !important;
}

:root{
  color-scheme:light;
  box-sizing:border-box;
  padding-top:env(safe-area-inset-top,0px);
  padding-bottom:env(safe-area-inset-bottom,0px);
  --ground:#EEF1EE;
  --surface:#FBFCFA;
  --surface-2:#E2E8E4;
  --ink:#13181A;
  --ink-2:#36403D;
  --muted:#58655F;
  --rule:#D0D8D3;
  --rule-strong:#AEBAB4;
  --accent:#0A6B6A;
  --accent-soft:#D5E8E4;
  --on-accent:#FFFFFF;
  --amber:#D48B22;
  --amber-soft:#F5E4C3;
  --on-amber:#1E1606;
  --reject:#AC3318;
  --reject-soft:#F5DFD8;
  --on-reject:#FFFFFF;
  --rec:#C23A1C;
  --screen:#243331;
  --on-screen:#F4F6F1;
  --screen-ink:#1A2322;
  --device:#1A2221;
  --crowd:#0E1514;
  --hair:#3A2B22;
  --board:#1B2524;
  --on-board:#ECEFE9;
  --board-muted:#A3B3AE;
  --board-accent:#7FD3C8;
  --f-display:"Archivo","Helvetica Neue",Arial,sans-serif;
  --f-body:"Source Serif 4",Georgia,"Times New Roman",serif;
  --f-mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    color-scheme:dark;
    --ground:#0C1011;--surface:#141A1B;--surface-2:#1E2627;--ink:#E5EAE7;--ink-2:#BAC5C1;--muted:#8E9A96;
    --rule:#273130;--rule-strong:#3B4644;--accent:#58BFB6;--accent-soft:#12302E;--on-accent:#08201F;
    --amber:#E7AE55;--amber-soft:#3A2C14;--reject:#E4886F;--reject-soft:#34201A;--on-reject:#2A120C;
    --rec:#C9401F;--screen:#2B3937;--device:#34403E;--crowd:#101817;--board:#18201F;
  }
}
:root[data-theme="dark"]{
  color-scheme:dark;
  --ground:#0C1011;--surface:#141A1B;--surface-2:#1E2627;--ink:#E5EAE7;--ink-2:#BAC5C1;--muted:#8E9A96;
  --rule:#273130;--rule-strong:#3B4644;--accent:#58BFB6;--accent-soft:#12302E;--on-accent:#08201F;
  --amber:#E7AE55;--amber-soft:#3A2C14;--reject:#E4886F;--reject-soft:#34201A;--on-reject:#2A120C;
  --rec:#C9401F;--screen:#2B3937;--device:#34403E;--crowd:#101817;--board:#18201F;
}
html{scroll-padding-top:env(safe-area-inset-top,0px);-webkit-text-size-adjust:100%}
@media (prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--f-body);font-size:1.0625rem;line-height:1.7;-webkit-font-smoothing:antialiased}
img,svg{max-width:100%}
a{color:var(--accent);text-decoration-thickness:1px;text-underline-offset:3px}
a:hover{text-decoration-thickness:2px}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:4px}
code{font-family:var(--f-mono);font-size:.84em;font-weight:500;background:var(--surface-2);padding:.08em .38em;border-radius:5px;white-space:nowrap}
.wrap{max-width:1120px;margin-inline:auto;padding-inline:clamp(18px,4.5vw,40px)}

/* ---------- ilustrasi (SVG) ---------- */
.ill{display:block;width:100%;height:auto}
.ill text{font-family:var(--f-display);fill:var(--ink)}
.ill .mono{font-family:var(--f-mono)}
.ill .t9{font-size:9.5px}.ill .t10{font-size:10.5px}.ill .t11{font-size:11.5px}.ill .t12{font-size:12.5px}
.ill .t13{font-size:13.5px}.ill .t14{font-size:14.5px}.ill .t16{font-size:17px}.ill .t30{font-size:34px}
.ill .b6{font-weight:600}.ill .b7{font-weight:700}.ill .b8{font-weight:800}
.ill .f-none{fill:none}
.ill .f-ink{fill:var(--ink)}.ill .f-mut{fill:var(--muted)}
.ill .f-paper{fill:var(--surface)}.ill .f-paper2{fill:var(--surface-2)}
.ill .f-teal{fill:var(--accent)}.ill .f-tealS{fill:var(--accent-soft)}
.ill .f-amb{fill:var(--amber)}.ill .f-ambS{fill:var(--amber-soft)}
.ill .f-red{fill:var(--reject)}.ill .f-redS{fill:var(--reject-soft)}.ill .f-rec{fill:var(--rec)}
.ill .f-scr{fill:var(--screen)}.ill .f-onscr{fill:var(--on-screen)}.ill .f-scrInk{fill:var(--screen-ink)}
.ill .f-onacc{fill:var(--on-accent)}.ill .f-onamb{fill:var(--on-amber)}
.ill .f-dev{fill:var(--device)}.ill .f-crowd{fill:var(--crowd)}.ill .f-hair{fill:var(--hair)}
.ill .s-ink{stroke:var(--ink)}.ill .s-mut{stroke:var(--muted)}.ill .s-rule{stroke:var(--rule-strong)}
.ill .s-teal{stroke:var(--accent)}.ill .s-amb{stroke:var(--amber)}.ill .s-red{stroke:var(--reject)}
.ill .s-rec{stroke:var(--rec)}.ill .s-onscr{stroke:var(--on-screen)}.ill .s-onacc{stroke:var(--on-accent)}
.ill .s-crowd{stroke:var(--crowd)}
.ill .w1{stroke-width:1}.ill .w15{stroke-width:1.5}.ill .w2{stroke-width:2}.ill .w25{stroke-width:2.5}
.ill .w3{stroke-width:3}.ill .w4{stroke-width:4}.ill .w12{stroke-width:12}
.ill .rnd{stroke-linecap:round;stroke-linejoin:round}
.ill .dsh{stroke-dasharray:5 4}
.ill .o15{opacity:.15}.ill .o2{opacity:.2}.ill .o3{opacity:.3}.ill .o4{opacity:.4}.ill .o5{opacity:.5}
.ill .o6{opacity:.6}.ill .o7{opacity:.7}.ill .o8{opacity:.8}.ill .o9{opacity:.9}
.cap-520{max-width:520px;margin-inline:auto}.cap-600{max-width:600px;margin-inline:auto}.cap-860{max-width:860px;margin-inline:auto}
.nw{white-space:nowrap}
.ico{width:24px;height:24px;flex:none;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}

/* ---------- hero ---------- */
.hero{display:grid;gap:clamp(26px,4vw,40px);padding-top:clamp(30px,6vw,76px)}
h1{font-family:var(--f-display);font-weight:800;font-size:clamp(2.6rem,9vw,4.9rem);line-height:.94;letter-spacing:-.037em;margin:0;max-width:11ch;text-wrap:balance}
.sub{font-family:var(--f-display);font-weight:600;font-size:clamp(1.15rem,2.8vw,1.5rem);line-height:1.3;color:var(--accent);margin:.7rem 0 0}
.deck{font-size:clamp(1.08rem,2.2vw,1.25rem);line-height:1.58;color:var(--ink-2);margin:1.1rem 0 0;max-width:42ch;text-wrap:pretty}
.hero-art{margin:0;width:100%;max-width:320px;justify-self:center}
.hero-art figcaption{font-family:var(--f-display);font-size:.86rem;line-height:1.45;color:var(--muted);text-align:center;margin-top:.7rem}
@media (min-width:900px){
  .hero{grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);grid-template-areas:"text art" "clap art";column-gap:clamp(40px,5vw,80px);align-items:start}
  .hero-text{grid-area:text}.hero-art{grid-area:art;align-self:center;max-width:340px}.clap{grid-area:clap}
}

/* papan klip: identitas proyek */
.clap{max-width:640px;margin-top:10px}

/* logo penyelenggara */
.partners{display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;margin:0 0 clamp(20px,3.4vw,30px)}
.partners-t{font-family:var(--f-display);font-size:.84rem;font-weight:600;line-height:1.35;color:var(--muted);margin:0}
.logos{display:flex;flex-wrap:wrap;gap:8px}
.logo-chip{display:inline-flex;align-items:center;justify-content:center;background:#FFFFFF;border:1px solid var(--rule);border-radius:10px;padding:8px 12px}
.logo-chip img{display:block;height:24px;width:auto;max-width:100%;object-fit:contain}
.infra-logos{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px}
.il{display:flex;flex-direction:column;align-items:center;gap:7px;font-family:var(--f-display);font-size:.88rem;font-weight:600;color:var(--ink-2);text-align:center}
.il .logo-chip{width:100%;padding:14px 10px}
.il .logo-chip img{height:28px}
.clap-top{position:relative;height:52px}
.clap-arm,.clap-base{position:absolute;left:0;right:0;height:22px;box-shadow:inset 0 0 0 1.5px #1B2524}
.clap-arm{top:2px;border-radius:5px 5px 0 0;transform-origin:0 100%;background:repeating-linear-gradient(58deg,#F2F4EF 0 17px,#1B2524 17px 34px)}
.clap-base{bottom:0;background:repeating-linear-gradient(-58deg,#F2F4EF 0 17px,#1B2524 17px 34px)}
.clap-pin{position:absolute;left:5px;top:19px;width:13px;height:13px;border-radius:50%;background:#A3B3AE;border:3px solid #1B2524;z-index:2}
.clap-board{background:var(--board);color:var(--on-board);border-radius:0 0 12px 12px;padding:4px clamp(16px,3vw,24px) 10px;box-shadow:0 0 0 1px var(--rule)}
.clap-board dl{margin:0}
.clap-board dl>div{display:grid;grid-template-columns:7.6rem 1fr;gap:14px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.12)}
.clap-board dl>div:last-child{border-bottom:0}
.clap-board dt{font-family:var(--f-display);font-weight:600;font-size:.8rem;line-height:1.5;color:var(--board-muted);padding-top:.12em}
.clap-board dd{margin:0;font-family:var(--f-display);font-weight:500;font-size:.95rem;line-height:1.45}
.clap-board .prod dd{font-weight:800;font-size:1.3rem;letter-spacing:-.01em;line-height:1.2}
@media (max-width:440px){.clap-board dl>div{grid-template-columns:1fr;gap:1px}}
@media (prefers-reduced-motion:no-preference){
  .js .clap-arm{transform:rotate(-5deg);transition:transform .36s cubic-bezier(.72,0,.9,.5) .3s}
  .js .clap.go .clap-arm{transform:rotate(0deg)}
}

/* ---------- ringkasan & daftar isi ---------- */
.intro{display:grid;gap:18px;max-width:1000px;margin:clamp(44px,7vw,84px) auto 0}
@media (min-width:880px){.intro{grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);align-items:start}}
.ringkas{background:var(--surface);border:1px solid var(--rule);border-radius:18px;padding:clamp(20px,3.4vw,32px)}
.ringkas h2,.toc h2{font-family:var(--f-display);font-weight:800;font-size:1.15rem;letter-spacing:-.01em;margin:0 0 .8rem}
.ringkas p{font-size:1rem;line-height:1.65;margin:0 0 .9em;text-wrap:pretty}
.ringkas .kw{font-family:var(--f-display);font-size:.85rem;line-height:1.5;color:var(--muted);border-top:1px solid var(--rule);padding-top:.9rem;margin:1.1rem 0 0}
.toc{background:var(--board);color:var(--on-board);border-radius:18px;padding:clamp(20px,3.4vw,30px)}
.toc ol{list-style:none;margin:0;padding:0;counter-reset:s}
.toc li{counter-increment:s;display:grid;grid-template-columns:2em 1fr;padding:7px 0;border-top:1px solid rgba(255,255,255,.12);font-family:var(--f-display);font-size:.95rem;line-height:1.35}
.toc li::before{content:counter(s);color:var(--board-accent);font-weight:800}
.toc a{color:var(--on-board);text-decoration:none}
.toc a:hover{text-decoration:underline}

/* ---------- artikel ---------- */
.sec{padding-top:clamp(60px,9vw,104px)}
.sec>*{max-width:700px;margin-left:auto;margin-right:auto}
.sec>.wide{max-width:1000px}
.sec h2{font-family:var(--f-display);font-weight:800;font-size:clamp(1.65rem,4.6vw,2.45rem);line-height:1.08;letter-spacing:-.024em;margin-top:0;margin-bottom:1.4rem;padding-top:16px;border-top:3px solid var(--ink);display:flex;gap:.42em;align-items:baseline;text-wrap:balance}
.sec-n{color:var(--accent);flex:none;font-variant-numeric:tabular-nums}
.sec h3{font-family:var(--f-display);font-weight:700;font-size:1.24rem;line-height:1.3;letter-spacing:-.012em;margin-top:2.6rem;margin-bottom:.7rem}
.sec p{margin-top:0;margin-bottom:1.05em;text-wrap:pretty}
.sec .lead{font-size:1.14rem;line-height:1.66}
figure{margin-top:2.2rem;margin-bottom:2.2rem}
figcaption{font-family:var(--f-display);font-size:.9rem;line-height:1.5;color:var(--muted);margin-top:.8rem}
.panel{background:var(--surface);border:1px solid var(--rule);border-radius:18px;padding:clamp(12px,3.2vw,30px)}

/* insiden */
.incident{display:grid;gap:26px;align-items:center}
.incident .ill{max-width:200px;margin-inline:auto}
@media (min-width:620px){.incident{grid-template-columns:200px 1fr;gap:38px}}
ol.chain{list-style:none;margin:0;padding:0;counter-reset:c}
ol.chain li{position:relative;counter-increment:c;padding:0 0 18px 46px;font-family:var(--f-display);font-size:.97rem;line-height:1.45;color:var(--ink-2)}
ol.chain li b{display:block;color:var(--ink);font-size:1.02rem}
ol.chain li::before{content:counter(c);position:absolute;left:0;top:-3px;width:32px;height:32px;border-radius:50%;background:var(--amber-soft);color:var(--ink);display:grid;place-items:center;font-weight:800;font-size:.9rem}
ol.chain li::after{content:"";position:absolute;left:15px;top:33px;bottom:3px;width:2px;background:var(--rule-strong)}
ol.chain li:last-child{padding-bottom:0}
ol.chain li:last-child::after{display:none}
ol.chain li.bad::before{background:var(--reject);color:var(--on-reject)}
ol.chain li.bad b{color:var(--reject)}

/* kartu aturan */
.rulecard{margin-top:2.2rem;margin-bottom:2.2rem;background:var(--board);color:var(--on-board);border-radius:20px;padding:clamp(22px,4vw,40px)}
.rulecard blockquote{margin:0}
.rulecard blockquote p{font-family:var(--f-display);font-weight:700;font-size:clamp(1.22rem,3vw,1.62rem);line-height:1.32;letter-spacing:-.012em;margin:0;max-width:32ch}
.rulecard .src{font-family:var(--f-display);font-size:.86rem;color:var(--board-muted);margin:.9rem 0 0}
.duo{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.rulecard .duo{margin-top:24px}
.duo .cell{background:var(--surface);color:var(--ink);border:1px solid var(--rule);border-radius:14px;padding:14px 14px 16px}
.duo .cell .ill{max-width:180px;margin-inline:auto}
.duo .cell-t{font-family:var(--f-display);font-weight:700;font-size:1rem;line-height:1.3;color:var(--ink);margin:.55rem 0 .25rem}
.duo p{font-family:var(--f-display);font-size:.88rem;line-height:1.45;margin:0;color:var(--ink-2)}
.duo .cell.amb{border-top:5px solid var(--amber)}
.duo .cell.teal{border-top:5px solid var(--accent)}
.duo .cell.red{border-top:5px solid var(--reject)}
@media (max-width:359px){.duo{grid-template-columns:1fr}}

/* keterangan dua kolom */
.cap2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:14px}
.cap2 p{font-family:var(--f-display);font-size:.9rem;line-height:1.45;margin:0;color:var(--ink-2)}
.cap2 b{display:block;color:var(--ink);font-size:1rem;margin-bottom:3px}

/* demo */
.demo{display:flex;gap:16px;align-items:center;border:2px dashed var(--rule-strong);border-radius:16px;padding:18px 20px;background:var(--surface)}
.demo .ill{width:54px;flex:none}
.demo p{margin:0}
.demo-t{font-family:var(--f-display);font-weight:700;margin-bottom:.35rem!important}
.isi{font-family:var(--f-display);font-weight:700;font-size:.95rem;background:var(--amber-soft);border:1.5px dashed var(--amber);border-radius:7px;padding:.12em .5em}

/* alur */
ol.flow{list-style:none;padding:0;margin-top:2rem;margin-bottom:2rem}
ol.flow>li{position:relative;display:grid;grid-template-columns:46px 1fr;column-gap:16px;padding-bottom:24px}
ol.flow>li::before{content:"";position:absolute;left:22px;top:48px;bottom:2px;width:2px;background:var(--rule-strong)}
ol.flow>li:last-child{padding-bottom:0}
ol.flow>li:last-child::before{display:none}
.flow .node{width:46px;height:46px;border-radius:50%;background:var(--surface);border:2px solid var(--ink);display:grid;place-items:center;color:var(--ink)}
.flow li.human .node{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
.flow li.human b{color:var(--accent)}
.flow b{display:block;font-family:var(--f-display);font-size:1.04rem;line-height:1.3;padding-top:.6em}
.flow p{margin:.2rem 0 0;font-size:.98rem;line-height:1.55;color:var(--ink-2)}
.flow .gate{display:flex;gap:8px;align-items:flex-start;margin-top:.55rem;font-family:var(--f-display);font-size:.86rem;line-height:1.4;color:var(--reject);background:var(--reject-soft);border-radius:9px;padding:7px 11px;width:fit-content;max-width:100%}
.flow .gate .ico{width:16px;height:16px;margin-top:.1em}

/* tahapan */
.stages{list-style:none;padding:0;display:grid;gap:14px;margin-top:1rem;margin-bottom:1.6rem}
@media (min-width:640px){.stages{grid-template-columns:repeat(2,1fr)}}
.stage{background:var(--surface);border:1px solid var(--rule);border-top:6px solid var(--c);border-radius:6px 6px 16px 16px;padding:16px 18px 18px}
.stage .st-top{display:flex;gap:10px;align-items:center;color:var(--c)}
.stage .st-top .ico{width:26px;height:26px}
.stage .st-k{font-family:var(--f-display);font-size:.82rem;font-weight:600;color:var(--muted)}
.stage h4{font-family:var(--f-display);font-size:1.03rem;line-height:1.3;margin:.6rem 0 .35rem}
.stage p{font-size:.95rem;line-height:1.55;margin:0;color:var(--ink-2)}

/* menu */
ol.trio{list-style:none;padding:0;margin:18px 0 0;display:grid;gap:10px;counter-reset:t}
@media (min-width:680px){ol.trio{grid-template-columns:repeat(3,1fr);gap:20px}}
ol.trio li{counter-increment:t;position:relative;padding-left:34px;font-family:var(--f-display);font-size:.92rem;line-height:1.45;color:var(--ink-2)}
ol.trio li::before{content:counter(t);position:absolute;left:0;top:-1px;width:24px;height:24px;border-radius:50%;background:var(--accent-soft);color:var(--accent);font-weight:800;font-size:.8rem;display:grid;place-items:center}

/* tabel wewenang */
.split-wrap{background:var(--surface);border:1px solid var(--rule);border-radius:18px;overflow-x:auto}
table.split{width:100%;border-collapse:collapse;font-family:var(--f-display);font-size:.93rem;line-height:1.45}
.split caption{caption-side:bottom;text-align:left;padding:12px 16px 16px;font-size:.86rem;color:var(--muted);border-top:1px solid var(--rule)}
.split th{text-align:left;vertical-align:bottom;padding:14px 16px;font-size:.95rem;background:var(--surface-2)}
.split th span{display:flex;gap:8px;align-items:center}
.split th .ico{width:20px;height:20px}
.split th:first-child{color:var(--ink-2)}
.split th:last-child{color:var(--accent)}
.split td{padding:12px 16px;border-top:1px solid var(--rule);vertical-align:top;width:50%}
.split td:first-child{color:var(--ink-2)}
.split td.none{color:var(--muted);font-style:italic}
.split th,.split td{overflow-wrap:break-word}
@media (max-width:400px){.split th,.split td{padding:10px 11px}.split th .ico{display:none}}

/* daftar penolakan */
ul.stops{list-style:none;padding:0;margin-top:1rem}
ul.stops li{display:grid;grid-template-columns:24px 1fr;gap:12px;padding:12px 0;border-top:1px solid var(--rule);line-height:1.55}
ul.stops li:last-child{border-bottom:1px solid var(--rule)}
ul.stops .ico{color:var(--reject);margin-top:.15em}
ul.stops b{font-family:var(--f-display)}

/* kartu kegagalan */
.fails{display:grid;gap:16px;margin-top:1.8rem;margin-bottom:1.8rem}
.fail{display:grid;grid-template-rows:auto 1fr;background:var(--surface);border:1px solid var(--rule);border-radius:18px;overflow:hidden}
.fail .f-art{background:var(--surface-2);display:grid;place-items:center;padding:18px}
.fail .f-art .ill{max-width:220px}
.fail .f-body{padding:18px 20px 22px}
.fail time{font-family:var(--f-mono);font-size:.8rem;font-weight:500;color:var(--reject)}
.sec .fail h3{font-size:1.1rem;margin:.3rem 0 .85rem}
.fail dl{display:grid;grid-template-columns:auto 1fr;gap:8px 14px;margin:0;font-size:.96rem;line-height:1.5}
.fail dt{font-family:var(--f-display);font-weight:700;font-size:.8rem;color:var(--muted);padding-top:.25em}
.fail dt.fx{color:var(--accent)}
.fail dd{margin:0}
@media (min-width:760px){
  .fails{grid-template-columns:1fr 1fr}
  .fail.big{grid-column:1/-1;grid-template-rows:none;grid-template-columns:minmax(0,300px) 1fr}
  .fail.big .f-body{padding:24px 28px}
}
.note{background:var(--amber-soft);border-left:4px solid var(--amber);border-radius:4px 14px 14px 4px;padding:16px 20px;font-size:.99rem;line-height:1.6}
.note p{margin:0}

/* resep */
.recipes{display:grid;grid-template-columns:repeat(2,1fr);gap:22px 16px;margin-top:1.4rem;margin-bottom:1.6rem}
@media (min-width:760px){.recipes{grid-template-columns:repeat(4,1fr)}}
.recipe .ill{max-width:118px;margin-inline:auto}
.recipe h4{font-family:var(--f-display);font-size:.99rem;line-height:1.3;margin:.8rem 0 .3rem}
.recipe p{font-family:var(--f-display);font-size:.88rem;line-height:1.5;margin:0;color:var(--ink-2)}

/* zona aman */
.safe{display:grid;gap:24px;align-items:center}
.safe .ill{max-width:210px;margin-inline:auto}
@media (min-width:680px){.safe{grid-template-columns:210px 1fr;gap:38px}}
ul.dots{list-style:none;margin:0;padding:0}
ul.dots li{position:relative;padding:9px 0 9px 22px;border-top:1px solid var(--rule);font-size:.98rem;line-height:1.55}
ul.dots li:last-child{border-bottom:1px solid var(--rule)}
ul.dots li::before{content:"";position:absolute;left:2px;top:1.12em;width:9px;height:9px;border-radius:50%;background:var(--accent)}
ul.dots b{font-family:var(--f-display)}

/* batasan */
.limits{border:1.5px dashed var(--rule-strong);border-radius:18px;padding:18px 22px 20px;margin-top:2rem;margin-bottom:2rem}
.sec .limits h3{margin-top:0}
.limits p{font-size:.98rem}
.limits ul{list-style:none;margin:0;padding:0}
.limits li{position:relative;padding:5px 0 5px 28px;line-height:1.55}
.limits li::before,.limits li::after{content:"";position:absolute;left:3px;top:.98em;width:14px;height:2.5px;border-radius:2px;background:var(--reject)}
.limits li::before{transform:rotate(45deg)}.limits li::after{transform:rotate(-45deg)}

/* grafik render */
.race{background:var(--surface);border:1px solid var(--rule);border-radius:18px;padding:clamp(18px,3.4vw,30px)}
.race-row+.race-row{margin-top:14px}
.race-lbl{font-family:var(--f-display);font-size:.9rem;font-weight:600;line-height:1.35;color:var(--ink-2);margin-bottom:6px}
.race-track{display:flex;align-items:center;gap:10px}
.race-bar{display:block;flex:none;height:30px;border-radius:7px;width:calc((100% - 6.8rem) * var(--p));min-width:5px}
.race-bar.was{background:repeating-linear-gradient(135deg,var(--rule-strong) 0 7px,var(--surface-2) 7px 12px)}
.race-bar.now{background:var(--accent)}
.race-val{font-family:var(--f-display);font-weight:800;font-size:1.08rem;white-space:nowrap;color:var(--ink-2)}
.race-val.now{color:var(--accent)}
.race-split{margin-top:22px;padding-top:18px;border-top:1px solid var(--rule)}
.race-split h4{font-family:var(--f-display);font-size:.95rem;margin:0 0 .8rem}
.rs{margin-bottom:12px}
.rs:last-child{margin-bottom:0}
.rs .race-lbl{font-weight:500;font-size:.86rem;margin-bottom:4px}
.rs .race-track{margin-top:3px}
.rs .race-bar{height:12px;border-radius:4px}
.rs .race-val{font-size:.84rem;font-weight:700}
.legend{display:flex;flex-wrap:wrap;gap:6px 18px;font-family:var(--f-display);font-size:.84rem;color:var(--muted);margin-top:14px}
.legend span{display:inline-flex;align-items:center;gap:7px}
.legend i{display:inline-block;width:18px;height:10px;border-radius:3px}
.legend i.was{background:repeating-linear-gradient(135deg,var(--rule-strong) 0 4px,var(--surface-2) 4px 7px)}
.legend i.now{background:var(--accent)}

/* angka kunci */
.stats{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--rule);border:1px solid var(--rule);border-radius:18px;overflow:hidden}
@media (min-width:760px){.stats{grid-template-columns:repeat(4,1fr)}}
.stat{background:var(--surface);padding:18px 18px 20px}
.stat .v{display:block;font-family:var(--f-display);font-weight:800;font-size:clamp(1.8rem,4.2vw,2.4rem);line-height:1;letter-spacing:-.02em;color:var(--accent)}
.stat .k{display:block;font-family:var(--f-display);font-size:.86rem;line-height:1.42;color:var(--ink-2);margin-top:.55rem}

/* hasil uji */
ul.checks{list-style:none;padding:0;margin-top:1.2rem;margin-bottom:1.4rem}
ul.checks li{display:grid;grid-template-columns:28px 1fr;gap:14px;padding:13px 0;border-top:1px solid var(--rule);line-height:1.55}
ul.checks li:last-child{border-bottom:1px solid var(--rule)}
.ck{width:28px;height:28px;border-radius:50%;background:var(--accent);color:var(--on-accent);display:grid;place-items:center;margin-top:.1em}
.ck .ico{width:16px;height:16px;stroke-width:2.6}
ul.checks b{font-family:var(--f-display)}

/* tim */
.team{list-style:none;padding:0;display:grid;gap:14px;margin-top:1.4rem}
@media (min-width:760px){.team{grid-template-columns:repeat(3,1fr)}}
.team li{background:var(--surface);border:1px solid var(--rule);border-radius:18px;padding:20px 20px 22px}
.av{width:54px;height:54px;border-radius:50%;display:grid;place-items:center;margin-bottom:14px}
.av .ico{width:26px;height:26px}
.av.teal{background:var(--accent-soft);color:var(--accent)}
.av.amb{background:var(--amber-soft);color:var(--ink)}
.av.red{background:var(--reject-soft);color:var(--reject)}
.who{display:block;font-family:var(--f-display);font-weight:800;font-size:1.14rem;line-height:1.25}
.role{display:block;font-family:var(--f-display);font-weight:600;font-size:.88rem;line-height:1.35;color:var(--accent);margin-top:3px}
.team .does{font-size:.95rem;line-height:1.55;margin:.75rem 0 0;color:var(--ink-2)}

/* penutup */
.sec .closing{font-family:var(--f-display);font-weight:600;font-size:clamp(1.15rem,2.7vw,1.42rem);line-height:1.45;letter-spacing:-.01em;border-left:4px solid var(--accent);padding-left:20px;margin-top:2.2rem}

/* footer */
footer{margin-top:clamp(70px,10vw,120px);background:var(--board);color:var(--on-board);padding-top:clamp(34px,6vw,58px);padding-bottom:calc(clamp(34px,6vw,58px) + 56px)}
footer .inner{max-width:700px;margin-inline:auto}
footer p{font-size:.96rem;line-height:1.62;margin:0 0 1em}
footer a{color:var(--board-accent)}
footer .tags{font-family:var(--f-display);font-size:.82rem;color:var(--board-muted);margin-top:1.4rem}

/* ---------- skema arsitektur (papan neon) ---------- */
.arch{margin-top:1.4rem;margin-bottom:2.4rem}
.ar{--tx:#E8F1EE;--mu:#9DB2AC;container-type:inline-size;position:relative;color:var(--tx);font-family:var(--f-display);border-radius:22px;padding:clamp(14px,2.8vw,28px);border:1px solid rgba(98,201,255,.28);
  background:radial-gradient(90% 55% at 0% 0%,rgba(63,224,207,.13),transparent 62%),radial-gradient(80% 55% at 100% 100%,rgba(182,156,255,.12),transparent 60%),linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px) 0 0/22px 22px,linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px) 0 0/22px 22px,#071110;
  box-shadow:inset 0 0 60px -30px rgba(63,224,207,.35)}
.ar .k-teal{--c:#3FE0CF;--c1:rgba(63,224,207,.10);--c2:rgba(63,224,207,.30);--c3:rgba(63,224,207,.55)}
.ar .k-violet{--c:#B69CFF;--c1:rgba(182,156,255,.11);--c2:rgba(182,156,255,.32);--c3:rgba(182,156,255,.58)}
.ar .k-amber{--c:#FFB547;--c1:rgba(255,181,71,.10);--c2:rgba(255,181,71,.30);--c3:rgba(255,181,71,.55)}
.ar .k-red{--c:#FF6F5E;--c1:rgba(255,111,94,.10);--c2:rgba(255,111,94,.30);--c3:rgba(255,111,94,.55)}
.ar .k-sky{--c:#62C9FF;--c1:rgba(98,201,255,.10);--c2:rgba(98,201,255,.30);--c3:rgba(98,201,255,.55)}
.ar-n{position:relative;border:1.5px solid var(--c);border-radius:16px;padding:14px 16px 15px;background:linear-gradient(180deg,var(--c1),rgba(7,17,16,.55) 72%);box-shadow:0 0 0 1px var(--c1),0 0 22px -4px var(--c3),inset 0 0 26px -16px var(--c)}
.ar-h{display:flex;gap:12px;align-items:center}
.ar-i{flex:none;width:42px;height:42px;border-radius:12px;display:grid;place-items:center;color:var(--c);border:1.5px solid var(--c2);background:var(--c1);box-shadow:0 0 14px -4px var(--c3)}
.ar-i .ico{width:22px;height:22px}
.ar p.ar-t{font-weight:800;font-size:1.02rem;line-height:1.2;margin:0;color:var(--tx)}
.ar-s{display:block;font-weight:600;font-size:.8rem;line-height:1.3;color:var(--c);margin-top:2px}
.ar-num{display:block;font-weight:800;font-size:.8rem;letter-spacing:.08em;color:var(--c);margin-bottom:1px}
.ar-h2{display:flex;justify-content:space-between;align-items:center;margin-bottom:11px}
.ar-h2 .ar-num{font-size:1.5rem;line-height:1;letter-spacing:.02em;margin:0;text-shadow:0 0 12px var(--c3)}
ul.ar-list{list-style:none;margin:11px 0 0;padding:0}
ul.ar-list li{position:relative;padding:3px 0 3px 15px;font-size:.84rem;line-height:1.42;color:#CFE0DB}
ul.ar-list li::before{content:"";position:absolute;left:2px;top:.74em;width:6px;height:6px;border-radius:50%;background:var(--c);box-shadow:0 0 6px var(--c)}
.ar-cells{display:grid;gap:10px;margin-top:12px}
.ar-c{display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.03);border:1px solid var(--c2)}
.ar-c .ico{width:20px;height:20px;color:var(--c);margin-top:1px}
.ar-c b{display:block;font-size:.88rem;line-height:1.25;color:var(--tx)}
.ar-c span{display:block;font-size:.78rem;line-height:1.38;color:var(--mu);margin-top:2px}
.ar-v{position:relative;height:38px;display:flex;align-items:center;justify-content:center}
.ar-v::before{content:"";position:absolute;left:50%;top:0;bottom:8px;width:2px;transform:translateX(-50%);background:linear-gradient(180deg,rgba(98,201,255,.2),rgba(98,201,255,.85))}
.ar-v::after{content:"";position:absolute;left:50%;bottom:0;transform:translateX(-50%);border:6px solid transparent;border-top:8px solid #62C9FF;border-bottom:0;filter:drop-shadow(0 0 4px rgba(98,201,255,.8))}
.ar-v.tall{height:50px}
.ar-pill{position:relative;z-index:1;font-size:.74rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#D3EEFF;background:#0A1A1F;border:1px solid rgba(98,201,255,.5);border-radius:999px;padding:4px 13px;box-shadow:0 0 16px -4px rgba(98,201,255,.8);margin-bottom:8px}
.ar-mid{display:grid}
.ar-loop{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:10px 8px;text-align:center}
.ar-loop::before{content:"";position:absolute;left:50%;top:0;bottom:0;border-left:2px dashed rgba(255,255,255,.22)}
.ar-loop svg{position:relative;width:54px;height:54px;background:#071110;border-radius:50%}
.ar-loop span{position:relative;background:#071110;font-size:.74rem;font-weight:700;line-height:1.25;color:#F3D6FF;padding:2px 4px;border-radius:6px}
.ar-pipe{list-style:none;margin:0;padding:0;display:grid;gap:30px}
.ar-pipe>li+li::before{content:"";position:absolute;left:50%;top:-25px;width:2px;height:16px;transform:translateX(-50%);background:rgba(255,255,255,.38)}
.ar-pipe>li+li::after{content:"";position:absolute;left:50%;top:-10px;transform:translateX(-50%);border:6px solid transparent;border-top:7px solid rgba(255,255,255,.6);border-bottom:0}
.ar-out{display:flex;gap:10px;align-items:center;justify-content:center;margin-top:16px;padding:9px 14px;border-radius:12px;border:1px dashed rgba(98,201,255,.5);background:rgba(98,201,255,.06);font-size:.84rem;line-height:1.4;color:#D6EEFF}
.ar-out .ico{width:20px;height:20px;color:#62C9FF}
.ar-ext,.ar-base{display:flex;flex-wrap:wrap;gap:8px 10px;align-items:center;margin-top:12px}
.ar-ext{padding:10px 12px;border-radius:12px;border:1px dashed rgba(255,255,255,.22)}
.ar-lbl{font-size:.74rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--mu);margin-right:4px}
.ar-chip{display:inline-flex;gap:7px;align-items:center;font-size:.8rem;font-weight:600;line-height:1.25;color:#DDE8E5;padding:6px 11px;border-radius:999px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.04)}
.ar-chip .ico{width:16px;height:16px;color:#9DB2AC}
.ar-legend{display:flex;flex-wrap:wrap;gap:8px 18px;margin-top:18px;padding-top:14px;border-top:1px solid rgba(255,255,255,.12);font-size:.8rem;line-height:1.3;color:var(--mu)}
.ar-legend span{display:inline-flex;align-items:center;gap:7px}
.ar-legend i{flex:none;width:10px;height:10px;border-radius:50%;background:var(--c);box-shadow:0 0 8px var(--c)}
@container (min-width:600px){
  .ar-cells,.ar-cells5{grid-template-columns:repeat(3,1fr)}
  .ar-mid{grid-template-columns:1fr 124px 1fr}
  .ar-loop::before{left:0;right:0;top:50%;bottom:auto;border-left:0;border-top:2px dashed rgba(255,255,255,.22)}
}
@container (min-width:880px){
  .ar-top{display:grid;grid-template-columns:230px 1fr;gap:18px;align-items:center}
  .ar-top .ar-cells{margin-top:0}
  .ar-cells5{grid-template-columns:repeat(5,1fr)}
  .ar-pipe{grid-template-columns:repeat(5,1fr);gap:18px}
  .ar-pipe>li+li::before{left:-17px;top:50%;width:11px;height:2px;transform:translateY(-50%)}
  .ar-pipe>li+li::after{left:-7px;top:50%;transform:translateY(-50%);border:6px solid transparent;border-left:7px solid rgba(255,255,255,.6);border-right:0}
  .ar-out{justify-content:flex-end}
}
@media (prefers-reduced-motion:no-preference){
  .ar-v::before{background:repeating-linear-gradient(180deg,rgba(98,201,255,.9) 0 6px,transparent 6px 12px);animation:ar-flow 1.6s linear infinite}
  @keyframes ar-flow{from{background-position:0 0}to{background-position:0 12px}}
}

/* tombol tema */
.tt-wrap{position:fixed;right:0;bottom:0;padding:0 16px calc(16px + env(safe-area-inset-bottom,0px)) 0;pointer-events:none;z-index:20}
.tt{pointer-events:auto;font-family:var(--f-display);font-size:.86rem;font-weight:600;background:var(--surface);color:var(--ink);border:1px solid var(--rule-strong);border-radius:999px;padding:9px 15px;cursor:pointer}
.tt:hover{border-color:var(--ink)}
`;

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("cf-theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    document.body.classList.toggle("light-theme", !isDark);
    localStorage.setItem("cf-theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    document.documentElement.classList.add("js");

    const clap = document.querySelector(".clap");
    let observer;

    if (clap) {
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                clap.classList.add("go");
                observer?.disconnect();
              }
            });
          },
          { threshold: 0.5 }
        );
        observer.observe(clap);
      } else {
        clap.classList.add("go");
      }
    }

    return () => {
      observer?.disconnect();
    };
  }, []);

  return (
    <>
      <style>{pageCss}</style>

<title>Content Factory: agent yang dilarang mengarang | AI HackFest 2026</title>
      <meta name="description" content="Content Factory: AI agent yang menyunting foto dan video milik pengguna menjadi konten vertikal lewat Telegram, dan dilarang mengarang. Studi kasus PT Laksamana Muda Bersatu untuk AI HackFest 2026." />
      <meta name="theme-color" content="#EEF1EE" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#0C1011" media="(prefers-color-scheme: dark)" />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:title" content="Forbidden to Fabricate: agent yang dilarang mengarang" />
      <meta property="og:description" content="Content Factory menyunting foto dan video milik pengguna menjadi konten vertikal lewat Telegram, tanpa pernah mengarang isi. Studi kasus PT Laksamana Muda Bersatu untuk AI HackFest 2026." />
      <meta name="twitter:card" content="summary" />
      <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%231B2524'/%3E%3Crect x='5' y='14' width='22' height='13' rx='2' fill='%230A6B6A'/%3E%3Cpath d='M4.5 9.5 24.8 4.2l1.1 4.1L5.6 13.6z' fill='%23F2F4EF'/%3E%3Cpath d='M10 8.2l2.6 3.4M16 6.6l2.6 3.4M22 5.1l2.4 3.1' stroke='%231B2524' stroke-width='2'/%3E%3C/svg%3E" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=IBM+Plex+Mono:wght@500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&display=swap" />


<div className="wrap">

<header className="hero">
  <div className="hero-text">
    <div className="partners">
      <p className="partners-t">AI HackFest 2026, diselenggarakan oleh</p>
      <div className="logos">
        <span className="logo-chip"><img src="data:image/png;base64,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" alt="IDwebhost" width="536" height="100" /></span>
        <span className="logo-chip"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDUwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xNjMuNDUgNTIuNUMxNjMuNDUgNDcuNjkzMyAxNjQuNTIzIDQzLjQgMTY2LjY3IDM5LjYyQzE2OC44NjMgMzUuNzkzMyAxNzEuODI3IDMyLjgzIDE3NS41NiAzMC43M0MxNzkuMzQgMjguNTgzMyAxODMuNTYzIDI3LjUxIDE4OC4yMyAyNy41MUMxOTMuNjkgMjcuNTEgMTk4LjQ3MyAyOC45MSAyMDIuNTggMzEuNzFDMjA2LjY4NyAzNC41MSAyMDkuNTU3IDM4LjM4MzMgMjExLjE5IDQzLjMzSDE5OS45MkMxOTguOCA0MC45OTY3IDE5Ny4yMTMgMzkuMjQ2NyAxOTUuMTYgMzguMDhDMTkzLjE1MyAzNi45MTMzIDE5MC44MiAzNi4zMyAxODguMTYgMzYuMzNDMTg1LjMxMyAzNi4zMyAxODIuNzcgMzcuMDA2NyAxODAuNTMgMzguMzZDMTc4LjMzNyAzOS42NjY3IDE3Ni42MSA0MS41MzMzIDE3NS4zNSA0My45NkMxNzQuMTM3IDQ2LjM4NjcgMTczLjUzIDQ5LjIzMzMgMTczLjUzIDUyLjVDMTczLjUzIDU1LjcyIDE3NC4xMzcgNTguNTY2NyAxNzUuMzUgNjEuMDRDMTc2LjYxIDYzLjQ2NjcgMTc4LjMzNyA2NS4zNTY3IDE4MC41MyA2Ni43MUMxODIuNzcgNjguMDE2NyAxODUuMzEzIDY4LjY3IDE4OC4xNiA2OC42N0MxOTAuODIgNjguNjcgMTkzLjE1MyA2OC4wODY3IDE5NS4xNiA2Ni45MkMxOTcuMjEzIDY1LjcwNjcgMTk4LjggNjMuOTMzMyAxOTkuOTIgNjEuNkgyMTEuMTlDMjA5LjU1NyA2Ni41OTMzIDIwNi42ODcgNzAuNDkgMjAyLjU4IDczLjI5QzE5OC41MiA3Ni4wNDMzIDE5My43MzcgNzcuNDIgMTg4LjIzIDc3LjQyQzE4My41NjMgNzcuNDIgMTc5LjM0IDc2LjM3IDE3NS41NiA3NC4yN0MxNzEuODI3IDcyLjEyMzMgMTY4Ljg2MyA2OS4xNiAxNjYuNjcgNjUuMzhDMTY0LjUyMyA2MS42IDE2My40NSA1Ny4zMDY3IDE2My40NSA1Mi41Wk0yMjUuODYgMjUuMlY3N0gyMTYuMDZWMjUuMkgyMjUuODZaTTI0OS4yNjMgNzcuNjNDMjQ1LjUzIDc3LjYzIDI0Mi4xNyA3Ni44MTMzIDIzOS4xODMgNzUuMThDMjM2LjE5NiA3My41IDIzMy44NCA3MS4xNDMzIDIzMi4xMTMgNjguMTFDMjMwLjQzMyA2NS4wNzY3IDIyOS41OTMgNjEuNTc2NyAyMjkuNTkzIDU3LjYxQzIyOS41OTMgNTMuNjQzMyAyMzAuNDU2IDUwLjE0MzMgMjMyLjE4MyA0Ny4xMUMyMzMuOTU2IDQ0LjA3NjcgMjM2LjM2IDQxLjc0MzMgMjM5LjM5MyA0MC4xMUMyNDIuNDI2IDM4LjQzIDI0NS44MSAzNy41OSAyNDkuNTQzIDM3LjU5QzI1My4yNzYgMzcuNTkgMjU2LjY2IDM4LjQzIDI1OS42OTMgNDAuMTFDMjYyLjcyNiA0MS43NDMzIDI2NS4xMDYgNDQuMDc2NyAyNjYuODMzIDQ3LjExQzI2OC42MDYgNTAuMTQzMyAyNjkuNDkzIDUzLjY0MzMgMjY5LjQ5MyA1Ny42MUMyNjkuNDkzIDYxLjU3NjcgMjY4LjU4MyA2NS4wNzY3IDI2Ni43NjMgNjguMTFDMjY0Ljk5IDcxLjE0MzMgMjYyLjU2MyA3My41IDI1OS40ODMgNzUuMThDMjU2LjQ1IDc2LjgxMzMgMjUzLjA0MyA3Ny42MyAyNDkuMjYzIDc3LjYzWk0yNDkuMjYzIDY5LjA5QzI1MS4wMzYgNjkuMDkgMjUyLjY5MyA2OC42NyAyNTQuMjMzIDY3LjgzQzI1NS44MiA2Ni45NDMzIDI1Ny4wOCA2NS42MzY3IDI1OC4wMTMgNjMuOTFDMjU4Ljk0NiA2Mi4xODMzIDI1OS40MTMgNjAuMDgzMyAyNTkuNDEzIDU3LjYxQzI1OS40MTMgNTMuOTIzMyAyNTguNDMzIDUxLjEgMjU2LjQ3MyA0OS4xNEMyNTQuNTYgNDcuMTMzMyAyNTIuMjAzIDQ2LjEzIDI0OS40MDMgNDYuMTNDMjQ2LjYwMyA0Ni4xMyAyNDQuMjQ2IDQ3LjEzMzMgMjQyLjMzMyA0OS4xNEMyNDAuNDY2IDUxLjEgMjM5LjUzMyA1My45MjMzIDIzOS41MzMgNTcuNjFDMjM5LjUzMyA2MS4yOTY3IDI0MC40NDMgNjQuMTQzMyAyNDIuMjYzIDY2LjE1QzI0NC4xMyA2OC4xMSAyNDYuNDYzIDY5LjA5IDI0OS4yNjMgNjkuMDlaTTMwOS43OTIgMzguMjJWNzdIMjk5LjkyMlY3Mi4xQzI5OC42NjIgNzMuNzggMjk3LjAwNSA3NS4xMSAyOTQuOTUyIDc2LjA5QzI5Mi45NDUgNzcuMDIzMyAyOTAuNzUyIDc3LjQ5IDI4OC4zNzIgNzcuNDlDMjg1LjMzOCA3Ny40OSAyODIuNjU1IDc2Ljg2IDI4MC4zMjIgNzUuNkMyNzcuOTg4IDc0LjI5MzMgMjc2LjE0NSA3Mi40MDMzIDI3NC43OTIgNjkuOTNDMjczLjQ4NSA2Ny40MSAyNzIuODMyIDY0LjQyMzMgMjcyLjgzMiA2MC45N1YzOC4yMkgyODIuNjMyVjU5LjU3QzI4Mi42MzIgNjIuNjUgMjgzLjQwMiA2NS4wMyAyODQuOTQyIDY2LjcxQzI4Ni40ODIgNjguMzQzMyAyODguNTgyIDY5LjE2IDI5MS4yNDIgNjkuMTZDMjkzLjk0OCA2OS4xNiAyOTYuMDcyIDY4LjM0MzMgMjk3LjYxMiA2Ni43MUMyOTkuMTUyIDY1LjAzIDI5OS45MjIgNjIuNjUgMjk5LjkyMiA1OS41N1YzOC4yMkgzMDkuNzkyWk0zMTMuNDQxIDU3LjQ3QzMxMy40NDEgNTMuNTUgMzE0LjIxMSA1MC4wNzMzIDMxNS43NTEgNDcuMDRDMzE3LjMzOCA0NC4wMDY3IDMxOS40ODQgNDEuNjczMyAzMjIuMTkxIDQwLjA0QzMyNC44OTggMzguNDA2NyAzMjcuOTA4IDM3LjU5IDMzMS4yMjEgMzcuNTlDMzMzLjc0MSAzNy41OSAzMzYuMTQ0IDM4LjE1IDMzOC40MzEgMzkuMjdDMzQwLjcxOCA0MC4zNDMzIDM0Mi41MzggNDEuNzkgMzQzLjg5MSA0My42MVYyNS4ySDM1My44MzFWNzdIMzQzLjg5MVY3MS4yNkMzNDIuNjc4IDczLjE3MzMgMzQwLjk3NCA3NC43MTMzIDMzOC43ODEgNzUuODhDMzM2LjU4OCA3Ny4wNDY3IDMzNC4wNDQgNzcuNjMgMzMxLjE1MSA3Ny42M0MzMjcuODg0IDc3LjYzIDMyNC44OTggNzYuNzkgMzIyLjE5MSA3NS4xMUMzMTkuNDg0IDczLjQzIDMxNy4zMzggNzEuMDczMyAzMTUuNzUxIDY4LjA0QzMxNC4yMTEgNjQuOTYgMzEzLjQ0MSA2MS40MzY3IDMxMy40NDEgNTcuNDdaTTM0My45NjEgNTcuNjFDMzQzLjk2MSA1NS4yMyAzNDMuNDk0IDUzLjIgMzQyLjU2MSA1MS41MkMzNDEuNjI4IDQ5Ljc5MzMgMzQwLjM2OCA0OC40ODY3IDMzOC43ODEgNDcuNkMzMzcuMTk0IDQ2LjY2NjcgMzM1LjQ5MSA0Ni4yIDMzMy42NzEgNDYuMkMzMzEuODUxIDQ2LjIgMzMwLjE3MSA0Ni42NDMzIDMyOC42MzEgNDcuNTNDMzI3LjA5MSA0OC40MTY3IDMyNS44MzEgNDkuNzIzMyAzMjQuODUxIDUxLjQ1QzMyMy45MTggNTMuMTMgMzIzLjQ1MSA1NS4xMzY3IDMyMy40NTEgNTcuNDdDMzIzLjQ1MSA1OS44MDMzIDMyMy45MTggNjEuODU2NyAzMjQuODUxIDYzLjYzQzMyNS44MzEgNjUuMzU2NyAzMjcuMDkxIDY2LjY4NjcgMzI4LjYzMSA2Ny42MkMzMzAuMjE4IDY4LjU1MzMgMzMxLjg5OCA2OS4wMiAzMzMuNjcxIDY5LjAyQzMzNS40OTEgNjkuMDIgMzM3LjE5NCA2OC41NzY3IDMzOC43ODEgNjcuNjlDMzQwLjM2OCA2Ni43NTY3IDM0MS42MjggNjUuNDUgMzQyLjU2MSA2My43N0MzNDMuNDk0IDYyLjA0MzMgMzQzLjk2MSA1OS45OSAzNDMuOTYxIDU3LjYxWk0zNjkuNzAyIDQzLjg5QzM3MC45NjIgNDIuMDIzMyAzNzIuNjg5IDQwLjUwNjcgMzc0Ljg4MiAzOS4zNEMzNzcuMTIyIDM4LjE3MzMgMzc5LjY2NiAzNy41OSAzODIuNTEyIDM3LjU5QzM4NS44MjYgMzcuNTkgMzg4LjgxMiAzOC40MDY3IDM5MS40NzIgNDAuMDRDMzk0LjE3OSA0MS42NzMzIDM5Ni4zMDIgNDQuMDA2NyAzOTcuODQyIDQ3LjA0QzM5OS40MjkgNTAuMDI2NyA0MDAuMjIyIDUzLjUwMzMgNDAwLjIyMiA1Ny40N0M0MDAuMjIyIDYxLjQzNjcgMzk5LjQyOSA2NC45NiAzOTcuODQyIDY4LjA0QzM5Ni4zMDIgNzEuMDczMyAzOTQuMTc5IDczLjQzIDM5MS40NzIgNzUuMTFDMzg4LjgxMiA3Ni43OSAzODUuODI2IDc3LjYzIDM4Mi41MTIgNzcuNjNDMzc5LjYxOSA3Ny42MyAzNzcuMDc2IDc3LjA3IDM3NC44ODIgNzUuOTVDMzcyLjczNiA3NC43ODMzIDM3MS4wMDkgNzMuMjkgMzY5LjcwMiA3MS40N1Y3N0gzNTkuOTAyVjI1LjJIMzY5LjcwMlY0My44OVpNMzkwLjIxMiA1Ny40N0MzOTAuMjEyIDU1LjEzNjcgMzg5LjcyMiA1My4xMyAzODguNzQyIDUxLjQ1QzM4Ny44MDkgNDkuNzIzMyAzODYuNTQ5IDQ4LjQxNjcgMzg0Ljk2MiA0Ny41M0MzODMuNDIyIDQ2LjY0MzMgMzgxLjc0MiA0Ni4yIDM3OS45MjIgNDYuMkMzNzguMTQ5IDQ2LjIgMzc2LjQ2OSA0Ni42NjY3IDM3NC44ODIgNDcuNkMzNzMuMzQyIDQ4LjQ4NjcgMzcyLjA4MiA0OS43OTMzIDM3MS4xMDIgNTEuNTJDMzcwLjE2OSA1My4yNDY3IDM2OS43MDIgNTUuMjc2NyAzNjkuNzAyIDU3LjYxQzM2OS43MDIgNTkuOTQzMyAzNzAuMTY5IDYxLjk3MzMgMzcxLjEwMiA2My43QzM3Mi4wODIgNjUuNDI2NyAzNzMuMzQyIDY2Ljc1NjcgMzc0Ljg4MiA2Ny42OUMzNzYuNDY5IDY4LjU3NjcgMzc4LjE0OSA2OS4wMiAzNzkuOTIyIDY5LjAyQzM4MS43NDIgNjkuMDIgMzgzLjQyMiA2OC41NTMzIDM4NC45NjIgNjcuNjJDMzg2LjU0OSA2Ni42ODY3IDM4Ny44MDkgNjUuMzU2NyAzODguNzQyIDYzLjYzQzM4OS43MjIgNjEuOTAzMyAzOTAuMjEyIDU5Ljg1IDM5MC4yMTIgNTcuNDdaTTQwMS4zMjQgNTcuNDdDNDAxLjMyNCA1My41NSA0MDIuMDk0IDUwLjA3MzMgNDAzLjYzNCA0Ny4wNEM0MDUuMjIgNDQuMDA2NyA0MDcuMzQ0IDQxLjY3MzMgNDEwLjAwNCA0MC4wNEM0MTIuNzEgMzguNDA2NyA0MTUuNzIgMzcuNTkgNDE5LjAzNCAzNy41OUM0MjEuOTI3IDM3LjU5IDQyNC40NDcgMzguMTczMyA0MjYuNTk0IDM5LjM0QzQyOC43ODcgNDAuNTA2NyA0MzAuNTM3IDQxLjk3NjcgNDMxLjg0NCA0My43NVYzOC4yMkg0NDEuNzE0Vjc3SDQzMS44NDRWNzEuMzNDNDMwLjU4NCA3My4xNSA0MjguODM0IDc0LjY2NjcgNDI2LjU5NCA3NS44OEM0MjQuNCA3Ny4wNDY3IDQyMS44NTcgNzcuNjMgNDE4Ljk2NCA3Ny42M0M0MTUuNjk3IDc3LjYzIDQxMi43MSA3Ni43OSA0MTAuMDA0IDc1LjExQzQwNy4zNDQgNzMuNDMgNDA1LjIyIDcxLjA3MzMgNDAzLjYzNCA2OC4wNEM0MDIuMDk0IDY0Ljk2IDQwMS4zMjQgNjEuNDM2NyA0MDEuMzI0IDU3LjQ3Wk00MzEuODQ0IDU3LjYxQzQzMS44NDQgNTUuMjMgNDMxLjM3NyA1My4yIDQzMC40NDQgNTEuNTJDNDI5LjUxIDQ5Ljc5MzMgNDI4LjI1IDQ4LjQ4NjcgNDI2LjY2NCA0Ny42QzQyNS4wNzcgNDYuNjY2NyA0MjMuMzc0IDQ2LjIgNDIxLjU1NCA0Ni4yQzQxOS43MzQgNDYuMiA0MTguMDU0IDQ2LjY0MzMgNDE2LjUxNCA0Ny41M0M0MTQuOTc0IDQ4LjQxNjcgNDEzLjcxNCA0OS43MjMzIDQxMi43MzQgNTEuNDVDNDExLjggNTMuMTMgNDExLjMzNCA1NS4xMzY3IDQxMS4zMzQgNTcuNDdDNDExLjMzNCA1OS44MDMzIDQxMS44IDYxLjg1NjcgNDEyLjczNCA2My42M0M0MTMuNzE0IDY1LjM1NjcgNDE0Ljk3NCA2Ni42ODY3IDQxNi41MTQgNjcuNjJDNDE4LjEgNjguNTUzMyA0MTkuNzggNjkuMDIgNDIxLjU1NCA2OS4wMkM0MjMuMzc0IDY5LjAyIDQyNS4wNzcgNjguNTc2NyA0MjYuNjY0IDY3LjY5QzQyOC4yNSA2Ni43NTY3IDQyOS41MSA2NS40NSA0MzAuNDQ0IDYzLjc3QzQzMS4zNzcgNjIuMDQzMyA0MzEuODQ0IDU5Ljk5IDQzMS44NDQgNTcuNjFaTTQ1Mi43NTUgMzMuNkM0NTEuMDI4IDMzLjYgNDQ5LjU4MiAzMy4wNjMzIDQ0OC40MTUgMzEuOTlDNDQ3LjI5NSAzMC44NyA0NDYuNzM1IDI5LjQ5MzMgNDQ2LjczNSAyNy44NkM0NDYuNzM1IDI2LjIyNjcgNDQ3LjI5NSAyNC44NzMzIDQ0OC40MTUgMjMuOEM0NDkuNTgyIDIyLjY4IDQ1MS4wMjggMjIuMTIgNDUyLjc1NSAyMi4xMkM0NTQuNDgyIDIyLjEyIDQ1NS45MDUgMjIuNjggNDU3LjAyNSAyMy44QzQ1OC4xOTIgMjQuODczMyA0NTguNzc1IDI2LjIyNjcgNDU4Ljc3NSAyNy44NkM0NTguNzc1IDI5LjQ5MzMgNDU4LjE5MiAzMC44NyA0NTcuMDI1IDMxLjk5QzQ1NS45MDUgMzMuMDYzMyA0NTQuNDgyIDMzLjYgNDUyLjc1NSAzMy42Wk00NTcuNTg1IDM4LjIyVjc3SDQ0Ny43ODVWMzguMjJINDU3LjU4NVpNNDg2LjcyOCA3N0w0NzMuNTY4IDYwLjQ4Vjc3SDQ2My43NjhWMjUuMkg0NzMuNTY4VjU0LjY3TDQ4Ni41ODggMzguMjJINDk5LjMyOEw0ODIuMjQ4IDU3LjY4TDQ5OS40NjggNzdINDg2LjcyOFoiIGZpbGw9IiMxRjFDM0IiLz4KPHJlY3QgeT0iMjciIHdpZHRoPSI5MSIgaGVpZ2h0PSI2OSIgcng9IjM0LjUiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl80Ml85KSIvPgo8cGF0aCBkPSJNNTQgMjhDNTQgMTQuMTkyOSA2NS4xOTI5IDMgNzkgM0gxMjNDMTM3LjkxMiAzIDE1MCAxNS4wODgzIDE1MCAzMEMxNTAgNDQuOTExNyAxMzcuOTEyIDU3IDEyMyA1N0g1NFYyOFoiIGZpbGw9InVybCgjcGFpbnQxX2xpbmVhcl80Ml85KSIvPgo8cGF0aCBkPSJNNTQgNDJIMTIzQzEzNy45MTIgNDIgMTUwIDU0LjA4ODMgMTUwIDY5QzE1MCA4My45MTE3IDEzNy45MTIgOTYgMTIzIDk2SDU0VjQyWiIgZmlsbD0idXJsKCNwYWludDJfbGluZWFyXzQyXzkpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNDJfOSIgeDE9IjQ1LjUiIHkxPSI0Mi41IiB4Mj0iNDUuNSIgeTI9Ijk2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMwMkRERkUiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDBCM0VCIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl80Ml85IiB4MT0iODYiIHkxPSI2LjUiIHgyPSIxMDIiIHkyPSI1NyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjM0Y1NkZCIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFBOUFGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50Ml9saW5lYXJfNDJfOSIgeDE9Ijg2IiB5MT0iNDUuNSIgeDI9IjEwMiIgeTI9Ijk2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMzRjU2RkIiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMUE5QUZGIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==" alt="CloudBaik" width="500" height="100" /></span>
      </div>
    </div>
    <h1>Forbidden to Fabricate</h1>
    <p className="sub">Agent yang dilarang mengarang</p>
    <p className="deck">Content Factory mengubah foto dan video mentah menjadi konten vertikal siap tayang, cukup lewat chat Telegram. Tantangan terbesarnya bukan membuat videonya, melainkan memastikan agent tidak pernah menambahkan satu pun keterangan yang tidak ada di bahan.</p>
  </div>

  <figure className="hero-art">
    <svg className="ill" viewBox="0 0 300 520" role="img" aria-labelledby="hero-t">
      <title id="hero-t">Ilustrasi chat Telegram dengan bot Content Factory: pengguna mengirim tiga klip, bot menawarkan naskah A dan B, pengguna memilih A, lalu bot mengirim video vertikal yang lolos cek mutu.</title>
      <defs><clipPath id="hero-clip"><rect x="22" y="16" width="256" height="488" rx="30"/></clipPath></defs>
      <rect className="f-dev" x="12" y="6" width="276" height="508" rx="40"/>
      <g clipPath="url(#hero-clip)">
        <rect className="f-paper2" x="22" y="16" width="256" height="488"/>
        <rect className="f-teal" x="22" y="16" width="256" height="62"/>
        <circle className="f-onacc" cx="54" cy="53" r="15"/>
        <path className="f-teal" d="M49 46 L61 53 L49 60 Z"/>
        <text className="f-onacc t13 b7" x="78" y="50">Content Factory</text>
        <text className="f-onacc t11 o8" x="78" y="66">bot aktif</text>
        <rect className="f-dev" x="120" y="22" width="60" height="12" rx="6"/>

        <rect className="f-tealS" x="104" y="92" width="162" height="98" rx="16"/>
        <rect className="f-scr" x="114" y="102" width="44" height="44" rx="7"/>
        <path className="f-onscr" d="M130 115 L144 124 L130 133 Z"/>
        <rect className="f-scr" x="163" y="102" width="44" height="44" rx="7"/>
        <circle className="f-amb o8" cx="196" cy="112" r="6"/>
        <path className="f-onscr" d="M179 115 L193 124 L179 133 Z"/>
        <rect className="f-scr" x="212" y="102" width="44" height="44" rx="7"/>
        <circle className="f-amb" cx="244" cy="113" r="5"/>
        <path className="f-onscr o8" d="M214 144 L228 125 L238 136 L245 129 L254 144 Z"/>
        <text className="t11" x="114" y="166">Tolong bikin reels</text>
        <text className="t11" x="114" y="181">dari acara semalam ya</text>

        <rect className="f-paper" x="34" y="204" width="196" height="122" rx="16"/>
        <text className="t11" x="46" y="226">Sudah kutonton semua.</text>
        <text className="t11" x="46" y="242">Pilih naskahnya:</text>
        <rect className="f-ambS" x="44" y="254" width="176" height="28" rx="9"/>
        <circle className="f-amb" cx="60" cy="268" r="9"/>
        <text className="f-onamb t11 b8" x="60" y="272" textAnchor="middle">A</text>
        <text className="t11 b6" x="76" y="272">Suasana hangat</text>
        <rect className="f-tealS" x="44" y="288" width="176" height="28" rx="9"/>
        <circle className="f-teal" cx="60" cy="302" r="9"/>
        <text className="f-onacc t11 b8" x="60" y="306" textAnchor="middle">B</text>
        <text className="t11 b6" x="76" y="306">Cepat dan padat</text>

        <rect className="f-tealS" x="186" y="338" width="80" height="32" rx="14"/>
        <text className="t12 b7" x="226" y="359" textAnchor="middle">Pakai A</text>

        <rect className="f-paper" x="34" y="382" width="200" height="114" rx="16"/>
        <rect className="f-scr" x="44" y="391" width="54" height="96" rx="8"/>
        <circle className="f-amb o5" cx="84" cy="403" r="9"/>
        <circle className="f-amb" cx="71" cy="425" r="9"/>
        <path className="f-teal" d="M55 487 C55 453 61 439 71 439 C81 439 87 453 87 487 Z"/>
        <rect className="f-onscr o9" x="50" y="463" width="42" height="10" rx="3"/>
        <text className="t12 b7" x="110" y="414">Video siap</text>
        <text className="f-mut t11" x="110" y="431">9:16, bersubtitel</text>
        <path className="f-none s-teal w2 rnd" d="M111 447 l4 4 l8 -9"/>
        <text className="f-teal t11 b6" x="128" y="452">lolos cek mutu</text>
      </g>
    </svg>
    <figcaption>Ilustrasi alur percakapan. Video baru dibuat setelah pengguna memilih naskah.</figcaption>
  </figure>

  <div className="clap" role="group" aria-label="Identitas proyek">
    <div className="clap-top" aria-hidden="true"><span className="clap-arm"></span><span className="clap-base"></span><span className="clap-pin"></span></div>
    <div className="clap-board">
      <dl>
        <div className="prod"><dt>Produksi</dt><dd>Content Factory</dd></div>
        <div><dt>Kompetisi</dt><dd>AI HackFest 2026, Batch 4. Diselenggarakan IDwebhost bersama CloudBaik</dd></div>
        <div><dt>Kategori</dt><dd>Business Automation, subkategori Creative AI</dd></div>
        <div><dt>Tim</dt><dd>Processing: Steven Chandra, Steven, dan Angky Kurniawan</dd></div>
        <div><dt>Studi kasus</dt><dd>PT Laksamana Muda Bersatu, industri F&amp;B pengelola <em>livespace</em> (ruang acara sekaligus kafe)</dd></div>
        <div><dt>Infrastruktur</dt><dd>Cloud VPS Linux, tanpa GPU</dd></div>
        <div><dt>Kerangka kerja</dt><dd>Hermes Agent, kerangka kerja resmi penyelenggara. Pipeline ffmpeg + LLM, bukan model video generatif</dd></div>
        <div><dt>Skala kode</dt><dd>11.274 baris Python dan 52 file uji otomatis</dd></div>
      </dl>
    </div>
  </div>
</header>

<div className="intro">
  <section className="ringkas" aria-labelledby="rk-h">
    <h2 id="rk-h">Ringkasan</h2>
    <p><strong>Content Factory</strong> adalah AI agent yang menyunting foto dan video milik pengguna menjadi konten vertikal siap tayang, atas permintaan lewat Telegram. Masalah yang kami angkat bukan soal bisa atau tidaknya membuat video, melainkan kebiasaan sistem AI yang jarang dibahas: <em>menganggap data yang gagal diambil sebagai data yang kosong</em>, lalu mengisi kekosongan itu dengan keterangan yang terdengar masuk akal padahal tidak berdasar.</p>
    <p>Jawaban kami adalah satu pembagian peran yang ditegakkan di seluruh sistem: <strong>model bahasa hanya boleh mengusulkan, sedangkan kode yang mengukur, memeriksa, dan menolak.</strong> Semua yang berstatus fakta, mulai dari daftar bahan, potongan ucapan, jadwal grafis, sampai biaya, dihasilkan kode dari sumber aslinya.</p>
    <p>Sistem diuji dengan 52 file uji otomatis dan pengujian menyeluruh pada bahan nyata, dengan studi kasus <strong>PT Laksamana Muda Bersatu</strong>. Waktu render turun dari 332,8 menjadi 35,6 detik, dan transkripsi lokal mencapai kecocokan 0,92 dengan <code>whisper-1</code>, semuanya tanpa GPU. Lima kegagalan yang membentuk desain akhirnya juga kami buka apa adanya.</p>
    <p className="kw">Kata kunci: AI agent, anti-halusinasi, fail-closed design, human-in-the-loop, otomasi produksi konten, ffmpeg, Whisper</p>
  </section>
  <nav className="toc" aria-labelledby="toc-h">
    <h2 id="toc-h">Daftar isi</h2>
    <ol>
      <li><a href="#b1">Pendahuluan: ketika AI diam-diam mengarang</a></li>
      <li><a href="#b2">Demonstrasi sistem</a></li>
      <li><a href="#b3">Cara kerja sistem</a></li>
      <li><a href="#b4">Aturan anti-halusinasi</a></li>
      <li><a href="#b5">Lima kegagalan dan pelajarannya</a></li>
      <li><a href="#b6">Apa saja yang bisa dibuat</a></li>
      <li><a href="#b7">Implementasi di Cloud VPS tanpa GPU</a></li>
      <li><a href="#b8">Hasil pengujian</a></li>
      <li><a href="#b9">Dampak yang diharapkan</a></li>
      <li><a href="#b10">Susunan tim</a></li>
      <li><a href="#b11">Keterbatasan dan penutup</a></li>
    </ol>
  </nav>
</div>

<article className="article">

<section id="b1" className="sec" aria-labelledby="h-b1">
  <h2 id="h-b1"><span className="sec-n">1</span> Pendahuluan: ketika AI diam-diam mengarang</h2>
  <p className="lead">Pada 19 September 2026 pukul 20.00 WIB, sistem kami mengirim sebuah video ke pengguna. Secara teknis hasilnya rapi: format 9:16, subtitel bersih, suara narator enak didengar, dan musik latar yang pas. Masalahnya hanya satu, dan itu fatal: naskah yang dibacakan suara AI sepenuhnya karangan, lalu ditempel di atas rekaman seseorang yang sebenarnya sedang berbicara.</p>

  <figure className="panel incident wide">
    <svg className="ill" viewBox="0 0 200 340" role="img" aria-labelledby="inc-t">
      <title id="inc-t">Ilustrasi: seseorang sedang berbicara di video, tetapi subtitel merah di bawahnya berisi kalimat karangan yang dibacakan suara AI.</title>
      <defs><clipPath id="inc-clip"><rect x="10" y="10" width="180" height="320" rx="18"/></clipPath></defs>
      <g clipPath="url(#inc-clip)">
        <rect className="f-scr" x="10" y="10" width="180" height="320"/>
        <circle className="f-amb o3" cx="150" cy="56" r="44"/>
        <circle className="f-amb o7" cx="150" cy="56" r="14"/>
        <rect className="f-amb" x="90" y="150" width="20" height="44"/>
        <path className="f-teal" d="M36 340 C36 236 62 190 100 190 C138 190 164 236 164 340 Z"/>
        <circle className="f-amb" cx="100" cy="126" r="34"/>
        <path className="f-hair" d="M66 124 C64 96 84 88 100 88 C120 88 136 100 134 124 C126 110 112 104 100 104 C88 104 74 110 66 124 Z"/>
        <circle className="f-scr" cx="88" cy="128" r="3.4"/>
        <circle className="f-scr" cx="112" cy="128" r="3.4"/>
        <ellipse className="f-scr" cx="100" cy="146" rx="8" ry="6"/>
        <path className="f-none s-onscr w2 rnd o8" d="M142 136 q8 7 0 14"/>
        <path className="f-none s-onscr w2 rnd o5" d="M152 130 q13 13 0 26"/>
        <rect className="f-rec" x="20" y="246" width="160" height="66" rx="10"/>
        <text className="f-onscr t13 b7" x="100" y="268" textAnchor="middle">“Halo semuanya!</text>
        <text className="f-onscr t13 b7" x="100" y="285" textAnchor="middle">Aku di sini dengan</text>
        <text className="f-onscr t13 b7" x="100" y="302" textAnchor="middle">energi positif…”</text>
        <circle className="f-onscr" cx="170" cy="246" r="15"/>
        <text className="f-rec t11 b8" x="170" y="250" textAnchor="middle">AI</text>
      </g>
    </svg>
    <ol className="chain" aria-label="Urutan kejadian">
      <li><b>Kuota transkripsi habis.</b> Sisa saldo $0,0004, padahal satu permintaan butuh $0,0066.</li>
      <li><b>Nol transkrip kembali.</b> Tidak ada teks sama sekali dari rekaman.</li>
      <li className="bad"><b>Kode menyimpulkan: videonya bisu.</b> Gagal mengambil data disamakan dengan data kosong.</li>
      <li className="bad"><b>Naskah dikarang dari gambar saja.</b> Lalu dibacakan suara AI di atas orang yang sedang berbicara.</li>
    </ol>
  </figure>

  <p>Tidak ada komponen yang rusak. Seluruh sistem berjalan persis seperti yang ditulis. Kesalahannya ada pada satu asumsi: gagal mengambil data diperlakukan sama dengan data yang memang kosong. Asumsi sekecil itu sudah cukup untuk menaruh suara palsu di atas wajah orang sungguhan.</p>

  <div className="rulecard wide">
    <blockquote>
      <p>Kegagalan bukanlah ketiadaan. “Gagal mengambil data” dan “datanya memang kosong” wajib dibedakan dengan tegas, dan hanya yang kedua yang boleh dianggap “tidak ada apa-apa”.</p>
    </blockquote>
    <p className="src">Aturan 7 dalam pedoman proyek, ditulis setelah insiden di atas</p>
    <div className="duo">
      <div className="cell amb">
        <svg className="ill" viewBox="0 0 180 120" aria-hidden="true">
          <path className="f-none s-mut w3 rnd" d="M4 82 H22"/>
          <rect className="f-mut" x="22" y="75" width="9" height="14" rx="2"/>
          <path className="f-none s-red w2 rnd" d="M36 70 l6 -6 M38 82 h8 M36 94 l6 6"/>
          <rect className="f-amb" x="50" y="76" width="7" height="12" rx="1"/>
          <rect className="f-ambS s-amb w2" x="56" y="54" width="92" height="56" rx="4"/>
          <rect className="f-amb" x="50" y="40" width="104" height="18" rx="4"/>
          <rect className="f-paper o6" x="95" y="40" width="14" height="32"/>
          <text className="f-amb t30 b8" x="102" y="105" textAnchor="middle">?</text>
        </svg>
        <p className="cell-t">Gagal diambil</p>
        <p>Isinya tidak diketahui. Sistem berhenti dan memberi tahu pengguna.</p>
      </div>
      <div className="cell teal">
        <svg className="ill" viewBox="0 0 180 120" aria-hidden="true">
          <path className="f-teal o3" d="M42 58 L54 46 L126 46 L138 58 Z"/>
          <path className="f-tealS s-teal w2 rnd" d="M42 58 L22 46 L36 34 L54 46 Z"/>
          <path className="f-tealS s-teal w2 rnd" d="M138 58 L158 46 L144 34 L126 46 Z"/>
          <rect className="f-tealS s-teal w2" x="42" y="58" width="96" height="52" rx="4"/>
          <circle className="f-teal" cx="90" cy="84" r="14"/>
          <path className="f-none s-onacc w3 rnd" d="M83 84 l5 5 l10 -11"/>
          <circle className="f-none s-ink w2" cx="152" cy="90" r="10"/>
          <path className="f-none s-ink w3 rnd" d="M159 97 l9 9"/>
        </svg>
        <p className="cell-t">Memang kosong</p>
        <p>Sudah diperiksa dan terbukti kosong. Hanya kondisi ini yang boleh lanjut.</p>
      </div>
    </div>
  </div>

  <p>Dari sini kami merumuskan masalah yang sebenarnya. Membuat video otomatis bukan hal langka; alat penyunting otomatis sudah banyak. Yang langka adalah <strong>jaminan bahwa agent tidak menyisipkan keterangan yang tidak berasal dari bahan milik pengguna</strong>. Taruhannya tinggi, karena hasilnya memuat wajah, suara, dan nama orang yang bisa dikenali publik. Di wilayah ini, kesalahan bukan lagi soal kualitas, melainkan pemalsuan.</p>

  <h3>Studi kasus: PT Laksamana Muda Bersatu</h3>
  <p>Sistem ini dikembangkan dan diuji untuk kebutuhan nyata <strong>PT Laksamana Muda Bersatu</strong>, pelaku industri makanan dan minuman yang mengelola sebuah <em>livespace</em>: ruang acara yang sekaligus menjadi kafe tempat orang bersantai. Dua fungsi itu melahirkan dua irama konten yang berjalan bersamaan.</p>

  <figure className="wide">
    <svg className="ill cap-860" viewBox="0 0 420 200" role="img" aria-labelledby="ls-t">
      <title id="ls-t">Ilustrasi livespace: di kiri panggung acara dengan lampu sorot dan penonton yang merekam, di kanan kafe dengan meja, kopi, tanaman, dan lampu gantung.</title>
      <defs>
        <clipPath id="ls-a"><rect x="0" y="0" width="204" height="200" rx="16"/></clipPath>
        <clipPath id="ls-b"><rect x="216" y="0" width="204" height="200" rx="16"/></clipPath>
      </defs>
      <g clipPath="url(#ls-a)">
        <rect className="f-scr" x="0" y="0" width="204" height="200"/>
        <path className="f-amb o2" d="M58 0 L24 148 L98 148 Z"/>
        <path className="f-amb o2" d="M146 0 L110 148 L184 148 Z"/>
        <rect className="f-onscr o7" x="50" y="0" width="16" height="10" rx="2"/>
        <rect className="f-onscr o7" x="138" y="0" width="16" height="10" rx="2"/>
        <circle className="f-amb" cx="28" cy="40" r="2.5"/><circle className="f-teal" cx="80" cy="26" r="2.5"/>
        <circle className="f-onscr o7" cx="176" cy="34" r="2.5"/><circle className="f-amb" cx="122" cy="58" r="2"/>
        <circle className="f-teal" cx="18" cy="96" r="2"/><circle className="f-amb" cx="188" cy="84" r="2.5"/>
        <rect className="f-amb o8" x="12" y="146" width="180" height="12" rx="2"/>
        <path className="f-teal" d="M86 146 C86 112 92 98 102 98 C112 98 118 112 118 146 Z"/>
        <circle className="f-amb" cx="102" cy="84" r="12"/>
        <path className="f-none s-amb w3 rnd" d="M113 112 L123 102"/>
        <path className="f-none s-onscr w2 rnd" d="M127 146 V104"/>
        <circle className="f-onscr" cx="126" cy="100" r="4.5"/>
        <path className="f-none s-crowd w4 rnd" d="M150 198 L156 170"/>
        <rect className="f-onscr" x="151" y="150" width="11" height="18" rx="2"/>
        <rect className="f-teal o8" x="153" y="153" width="7" height="11" rx="1"/>
        <g className="f-crowd">
          <circle cx="24" cy="176" r="11"/><ellipse cx="24" cy="203" rx="18" ry="16"/>
          <circle cx="62" cy="181" r="11"/><ellipse cx="62" cy="208" rx="18" ry="16"/>
          <circle cx="100" cy="175" r="11"/><ellipse cx="100" cy="202" rx="18" ry="16"/>
          <circle cx="138" cy="180" r="11"/><ellipse cx="138" cy="207" rx="18" ry="16"/>
          <circle cx="180" cy="176" r="11"/><ellipse cx="180" cy="203" rx="18" ry="16"/>
        </g>
      </g>
      <g clipPath="url(#ls-b)">
        <rect className="f-ambS" x="216" y="0" width="204" height="200"/>
        <rect className="f-paper s-amb w2" x="236" y="22" width="74" height="70" rx="6"/>
        <path className="f-none s-amb w2" d="M273 22 V92 M236 57 H310"/>
        <path className="f-amb o2" d="M348 50 L328 128 L396 128 L376 50 Z"/>
        <path className="f-none s-ink w2" d="M362 0 V28"/>
        <path className="f-teal" d="M344 46 L380 46 L371 28 L353 28 Z"/>
        <circle className="f-amb" cx="362" cy="49" r="5"/>
        <rect className="f-amb" x="232" y="128" width="176" height="9" rx="3"/>
        <rect className="f-amb" x="250" y="137" width="7" height="63"/>
        <rect className="f-amb" x="384" y="137" width="7" height="63"/>
        <rect className="f-paper s-ink w15" x="287" y="124" width="48" height="5" rx="2.5"/>
        <path className="f-paper s-ink w2 rnd" d="M296 102 H326 V114 C326 122 320 125 311 125 C302 125 296 122 296 114 Z"/>
        <path className="f-none s-ink w2 rnd" d="M326 106 C337 106 337 119 326 119"/>
        <path className="f-none s-mut w2 rnd" d="M305 94 C301 88 309 84 305 78 M317 94 C313 88 321 84 317 78"/>
        <path className="f-teal" d="M378 104 C368 92 370 80 380 76 C382 88 384 96 378 104 Z"/>
        <path className="f-teal" d="M386 104 C394 90 404 86 411 90 C405 101 396 106 386 104 Z"/>
        <path className="f-teal o7" d="M382 104 C379 88 386 72 397 69 C395 84 391 96 382 104 Z"/>
        <rect className="f-paper s-ink w15" x="370" y="104" width="26" height="24" rx="3"/>
      </g>
    </svg>
    <div className="cap2 cap-860">
      <p><b>Sisi acara: terikat waktu</b>Pengumuman jadwal, dokumentasi acara yang baru selesai, dan promosi acara berikutnya.</p>
      <p><b>Sisi kafe: berulang</b>Menu baru, suasana di jam yang berbeda, dan sudut tempat yang layak dibagikan.</p>
    </div>
  </figure>

  <p>Menurut tim mereka, kebutuhannya <strong>lima sampai sepuluh video per minggu</strong> dan melonjak setiap ada acara. Formatnya video pendek Instagram berdurasi 15 sampai 30 detik. Semuanya dikerjakan <strong>satu orang</strong> yang merangkap pembuat konten sekaligus editor.</p>

  <figure className="panel">
    <svg className="ill cap-600" viewBox="0 0 420 180" role="img" aria-labelledby="fn-t">
      <title id="fn-t">Ilustrasi hambatan: banyak video menumpuk dan harus melewati satu orang sebelum bisa tayang satu per satu.</title>
      <path className="f-paper2" d="M150 10 L250 74 L250 106 L150 170 Z"/>
      <g transform="rotate(-8 31 44)"><rect className="f-scr" x="18" y="22" width="26" height="44" rx="5"/><path className="f-onscr" d="M28 38 L36 44 L28 50 Z"/></g>
      <g transform="rotate(6 63 34)"><rect className="f-amb" x="50" y="12" width="26" height="44" rx="5"/><path className="f-onamb" d="M60 28 L68 34 L60 40 Z"/></g>
      <g transform="rotate(-4 97 50)"><rect className="f-scr" x="84" y="28" width="26" height="44" rx="5"/><path className="f-onscr" d="M94 44 L102 50 L94 56 Z"/></g>
      <g transform="rotate(9 129 42)"><rect className="f-scr" x="116" y="20" width="26" height="44" rx="5"/><path className="f-onscr" d="M126 36 L134 42 L126 48 Z"/></g>
      <g transform="rotate(5 41 96)"><rect className="f-scr" x="28" y="74" width="26" height="44" rx="5"/><path className="f-onscr" d="M38 90 L46 96 L38 102 Z"/></g>
      <g transform="rotate(-10 77 88)"><rect className="f-scr" x="64" y="66" width="26" height="44" rx="5"/><path className="f-onscr" d="M74 82 L82 88 L74 94 Z"/></g>
      <g transform="rotate(3 111 100)"><rect className="f-amb" x="98" y="78" width="26" height="44" rx="5"/><path className="f-onamb" d="M108 94 L116 100 L108 106 Z"/></g>
      <g transform="rotate(-6 35 146)"><rect className="f-scr" x="22" y="124" width="26" height="44" rx="5"/><path className="f-onscr" d="M32 140 L40 146 L32 152 Z"/></g>
      <g transform="rotate(8 71 142)"><rect className="f-scr" x="58" y="120" width="26" height="44" rx="5"/><path className="f-onscr" d="M68 136 L76 142 L68 148 Z"/></g>
      <g transform="rotate(-3 107 150)"><rect className="f-scr" x="94" y="128" width="26" height="44" rx="5"/><path className="f-onscr" d="M104 144 L112 150 L104 156 Z"/></g>
      <g transform="rotate(6 139 126)"><rect className="f-scr" x="126" y="104" width="26" height="44" rx="5"/><path className="f-onscr" d="M136 120 L144 126 L136 132 Z"/></g>
      <path className="f-none s-mut w2 dsh o6" d="M292 90 H412"/>
      <path className="f-teal" d="M256 124 C256 98 262 88 270 88 C278 88 284 98 284 124 Z"/>
      <circle className="f-amb" cx="270" cy="74" r="11"/>
      <path className="f-teal o6" d="M290 58 q4 6 0 9 q-4 -3 0 -9 Z"/>
      <path className="f-teal o6" d="M250 62 q4 6 0 9 q-4 -3 0 -9 Z"/>
      <rect className="f-scr" x="304" y="73" width="20" height="34" rx="4"/><path className="f-onscr" d="M311 84 L318 90 L311 96 Z"/>
      <g className="o5"><rect className="f-scr" x="344" y="73" width="20" height="34" rx="4"/><path className="f-onscr" d="M351 84 L358 90 L351 96 Z"/></g>
      <g className="o2"><rect className="f-scr" x="384" y="73" width="20" height="34" rx="4"/><path className="f-onscr" d="M391 84 L398 90 L391 96 Z"/></g>
    </svg>
    <figcaption>Kapasitas konten perusahaan sama dengan kapasitas satu orang: semua video harus antre di tangan yang sama.</figcaption>
  </figure>

  <p>Saat orang itu berhalangan, produksi berhenti. Lebih sulit lagi, lonjakan kebutuhan justru datang saat ada acara, yaitu saat orang yang sama sedang paling sibuk mengurus acaranya.</p>
  <p>Kami belum mengukur langsung lama pengerjaan satu video mereka, jadi angka berikut adalah <strong>perkiraan tim penulis, bukan angka dari perusahaan</strong>: untuk video 15–30 detik lengkap dengan pemilihan potongan, subtitel, penyeimbangan suara, dan teks di layar, satu sampai dua jam per video adalah rentang yang wajar. Dengan lima sampai sepuluh video per minggu, bebannya sekitar 5 sampai 20 jam per minggu di pundak satu orang. Angka pastinya akan kami perbarui setelah diukur bersama mereka.</p>
  <p>Ada satu hal lagi yang menentukan arah desain: <strong>nilai konten mereka justru terletak pada keasliannya.</strong> Wajah pengunjung yang benar-benar hadir, hidangan yang benar-benar disajikan, dan suasana yang benar-benar terjadi tidak bisa digantikan gambar buatan AI. Alat yang “membantu” dengan membuat visual sintetis justru menghapus satu-satunya hal yang membuat konten itu layak dipercaya.</p>
</section>

<section id="b2" className="sec" aria-labelledby="h-b2">
  <h2 id="h-b2"><span className="sec-n">2</span> Demonstrasi sistem</h2>
  <p>Alurnya bertahap, bukan sekali tekan. Pengguna mengirim bahan lewat Telegram, agent memeriksa bahan dan bertanya seperlunya, lalu mengirim <strong>dua pilihan naskah beserta papan cerita</strong>. Video baru dibuat setelah pengguna memilih A atau B, atau menulis naskahnya sendiri.</p>

  <figure>
    <svg className="ill cap-600" viewBox="0 0 420 250" role="img" aria-labelledby="fs-t">
      <title id="fs-t">Tiga langkah dalam bentuk pita film: kirim bahan, pilih naskah A, B, atau tulis sendiri, lalu terima video vertikal yang sudah dicek.</title>
      <rect className="f-dev" x="0" y="0" width="420" height="250" rx="12"/>
      <rect className="f-onscr o3" x="10" y="7" width="14" height="11" rx="2"/><rect className="f-onscr o3" x="10" y="232" width="14" height="11" rx="2"/>
      <rect className="f-onscr o3" x="36" y="7" width="14" height="11" rx="2"/><rect className="f-onscr o3" x="36" y="232" width="14" height="11" rx="2"/>
      <rect className="f-onscr o3" x="62" y="7" width="14" height="11" rx="2"/><rect className="f-onscr o3" x="62" y="232" width="14" height="11" rx="2"/>
      <rect className="f-onscr o3" x="88" y="7" width="14" height="11" rx="2"/><rect className="f-onscr o3" x="88" y="232" width="14" height="11" rx="2"/>
      <rect className="f-onscr o3" x="114" y="7" width="14" height="11" rx="2"/><rect className="f-onscr o3" x="114" y="232" width="14" height="11" rx="2"/>
      <rect className="f-onscr o3" x="140" y="7" width="14" height="11" rx="2"/><rect className="f-onscr o3" x="140" y="232" width="14" height="11" rx="2"/>
      <rect className="f-onscr o3" x="166" y="7" width="14" height="11" rx="2"/><rect className="f-onscr o3" x="166" y="232" width="14" height="11" rx="2"/>
      <rect className="f-onscr o3" x="192" y="7" width="14" height="11" rx="2"/><rect className="f-onscr o3" x="192" y="232" width="14" height="11" rx="2"/>
      <rect className="f-onscr o3" x="218" y="7" width="14" height="11" rx="2"/><rect className="f-onscr o3" x="218" y="232" width="14" height="11" rx="2"/>
      <rect className="f-onscr o3" x="244" y="7" width="14" height="11" rx="2"/><rect className="f-onscr o3" x="244" y="232" width="14" height="11" rx="2"/>
      <rect className="f-onscr o3" x="270" y="7" width="14" height="11" rx="2"/><rect className="f-onscr o3" x="270" y="232" width="14" height="11" rx="2"/>
      <rect className="f-onscr o3" x="296" y="7" width="14" height="11" rx="2"/><rect className="f-onscr o3" x="296" y="232" width="14" height="11" rx="2"/>
      <rect className="f-onscr o3" x="322" y="7" width="14" height="11" rx="2"/><rect className="f-onscr o3" x="322" y="232" width="14" height="11" rx="2"/>
      <rect className="f-onscr o3" x="348" y="7" width="14" height="11" rx="2"/><rect className="f-onscr o3" x="348" y="232" width="14" height="11" rx="2"/>
      <rect className="f-onscr o3" x="374" y="7" width="14" height="11" rx="2"/><rect className="f-onscr o3" x="374" y="232" width="14" height="11" rx="2"/>
      <rect className="f-onscr o3" x="400" y="7" width="14" height="11" rx="2"/><rect className="f-onscr o3" x="400" y="232" width="14" height="11" rx="2"/>
      <rect className="f-paper" x="14" y="26" width="124" height="198" rx="6"/>
      <circle className="f-amb" cx="32" cy="44" r="11"/>
      <text className="f-onamb t12 b8" x="32" y="48.5" textAnchor="middle">1</text>
      <rect className="f-tealS" x="38" y="62" width="92" height="62" rx="12"/>
      <rect className="f-scr" x="46" y="70" width="24" height="24" rx="4"/><path className="f-onscr" d="M54 77 L62 82 L54 87 Z"/>
      <rect className="f-scr" x="74" y="70" width="24" height="24" rx="4"/><path className="f-onscr" d="M82 77 L90 82 L82 87 Z"/>
      <rect className="f-scr" x="102" y="70" width="24" height="24" rx="4"/><circle className="f-amb" cx="119" cy="76" r="3"/><path className="f-onscr o8" d="M103 93 L110 83 L115 89 L119 85 L125 93 Z"/>
      <rect className="f-mut o5" x="46" y="102" width="66" height="6" rx="3"/>
      <rect className="f-mut o5" x="46" y="112" width="44" height="6" rx="3"/>
      <rect className="f-paper2" x="24" y="136" width="52" height="26" rx="12"/>
      <circle className="f-mut" cx="38" cy="149" r="3"/><circle className="f-mut" cx="50" cy="149" r="3"/><circle className="f-mut" cx="62" cy="149" r="3"/>
      <text className="t13 b7" x="76" y="210" textAnchor="middle">Kirim bahan</text>

      <rect className="f-paper" x="148" y="26" width="124" height="198" rx="6"/>
      <circle className="f-amb" cx="166" cy="44" r="11"/>
      <text className="f-onamb t12 b8" x="166" y="48.5" textAnchor="middle">2</text>
      <rect className="f-ambS" x="160" y="62" width="100" height="40" rx="10"/>
      <circle className="f-amb" cx="176" cy="82" r="9"/>
      <text className="f-onamb t11 b8" x="176" y="86" textAnchor="middle">A</text>
      <rect className="f-mut o5" x="192" y="76" width="56" height="5" rx="2.5"/><rect className="f-mut o5" x="192" y="86" width="38" height="5" rx="2.5"/>
      <rect className="f-tealS" x="160" y="108" width="100" height="40" rx="10"/>
      <circle className="f-teal" cx="176" cy="128" r="9"/>
      <text className="f-onacc t11 b8" x="176" y="132" textAnchor="middle">B</text>
      <rect className="f-mut o5" x="192" y="122" width="56" height="5" rx="2.5"/><rect className="f-mut o5" x="192" y="132" width="38" height="5" rx="2.5"/>
      <rect className="f-none s-mut w15 dsh" x="160" y="154" width="100" height="30" rx="10"/>
      <path className="f-none s-mut w15 rnd" d="M172 175 l9 -9 l4 4 l-9 9 h-4 z"/>
      <rect className="f-mut o5" x="192" y="166" width="48" height="5" rx="2.5"/>
      <circle className="f-none s-amb w2" cx="250" cy="98" r="11"/>
      <circle className="f-amb" cx="250" cy="98" r="4"/>
      <text className="t13 b7" x="210" y="210" textAnchor="middle">Pilih naskah</text>

      <rect className="f-paper" x="282" y="26" width="124" height="198" rx="6"/>
      <circle className="f-amb" cx="300" cy="44" r="11"/>
      <text className="f-onamb t12 b8" x="300" y="48.5" textAnchor="middle">3</text>
      <defs><clipPath id="fs-v"><rect x="316" y="40" width="56" height="100" rx="8"/></clipPath></defs>
      <g clipPath="url(#fs-v)">
        <rect className="f-scr" x="316" y="40" width="56" height="100"/>
        <circle className="f-amb o5" cx="358" cy="54" r="8"/>
        <circle className="f-amb" cx="344" cy="76" r="10"/>
        <path className="f-teal" d="M326 142 C326 106 334 94 344 94 C354 94 362 106 362 142 Z"/>
        <rect className="f-onscr o9" x="322" y="118" width="44" height="9" rx="3"/>
      </g>
      <circle className="f-teal" cx="372" cy="40" r="11"/>
      <path className="f-none s-onacc w25 rnd" d="M366.5 40 l4 4 l7 -8"/>
      <rect className="f-mut o5" x="304" y="154" width="80" height="6" rx="3"/>
      <rect className="f-mut o3" x="316" y="166" width="56" height="6" rx="3"/>
      <text className="t13 b7" x="344" y="210" textAnchor="middle">Terima video</text>
    </svg>
    <figcaption>Tiga langkah bagi pengguna. Langkah kedua adalah satu-satunya titik keputusan, dan tidak bisa dilewati.</figcaption>
  </figure>

  <div className="demo">
    <svg className="ill" viewBox="0 0 54 54" aria-hidden="true"><circle className="f-teal" cx="27" cy="27" r="26"/><path className="f-onacc" d="M21 16 L38 27 L21 38 Z"/></svg>
    <div>
      <p className="demo-t">Video demo</p>
      <p><span className="isi">ISI: tautan video demo</span></p>
    </div>
  </div>

  <p style={{marginTop: '1.2rem'}}>Rekaman demo memperlihatkan agent yang memahami tiap klip dari isinya (bukan dari nama file), dua gaya naskah yang berbeda, grafis yang muncul tepat saat kata kuncinya diucapkan, sistem yang berjalan di Cloud VPS lewat dasbor dan terminal, serta pemeriksa mutu yang membetulkan volume suara sebelum video dikirim.</p>
</section>

<section id="b3" className="sec" aria-labelledby="h-b3">
  <h2 id="h-b3"><span className="sec-n">3</span> Cara kerja sistem</h2>
  <p>Pipeline dijalankan oleh <strong>Hermes Agent</strong>, kerangka kerja resmi dari penyelenggara, di kanal Telegram. Satu keputusan keamanan kami pegang teguh: <strong>kode pipeline tidak pernah mengirim apa pun ke Telegram sendiri.</strong> Hermes tidak meneruskan identitas percakapan yang terpercaya ke proses di bawahnya, dan menebak tujuan berarti membuka peluang bahan seseorang nyasar ke orang lain. Jadi kode hanya menyerahkan lokasi file hasil, dan Hermes yang mengirimkannya di percakapan yang sama.</p>

  <h3>Skema arsitektur</h3>
  <figure className="arch wide" aria-labelledby="ar-cap">
    <div className="ar">
      <div className="ar-n k-sky ar-top">
        <div className="ar-h"><span className="ar-i"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 3 3 10.5l7 2.5 2.5 7L21 3z"/><path d="m10 13 4.5-4.5"/></svg></span><div><p className="ar-t">Input dari Telegram</p><span className="ar-s">Tiap pengguna di chat-nya sendiri</span></div></div>
        <div className="ar-cells">
          <div className="ar-c"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="8.5" cy="10" r="1.6"/><path d="m21 15-4.5-4.5L8 19"/></svg><div><b>Foto dan video</b><span>Bahan asli yang akan disunting</span></div></div>
          <div className="ar-c"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11h-9l-4 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/></svg><div><b>Permintaan dan naskah</b><span>Instruksi teks, atau naskah tulisan sendiri</span></div></div>
          <div className="ar-c"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="8" height="10" rx="2"/><rect x="13" y="10" width="8" height="10" rx="2"/><path d="m15 15 1.6 1.6 2.9-3.1"/></svg><div><b>Pilihan naskah</b><span>Balasan A atau B setelah draf dikirim</span></div></div>
        </div>
      </div>
      <div className="ar-v" aria-hidden="true"></div>
      <div className="ar-mid">
        <div className="ar-n k-violet">
          <div className="ar-h"><span className="ar-i"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="12" cy="20.5" r="1.8"/><path d="M6.6 6.6 9.8 9.8M17.4 6.6l-3.2 3.2M12 15v3.7"/></svg></span><div><p className="ar-t">Hermes Agent</p><span className="ar-s">Orkestrator, kerangka kerja resmi penyelenggara</span></div></div>
          <ul className="ar-list"><li>Menerima bahan dari chat</li><li>Menjalankan pipeline Content Factory</li><li>Mengirim hasil ke chat yang sama</li></ul>
        </div>
        <div className="ar-loop"><svg viewBox="0 0 56 56" aria-hidden="true"><path d="M12 25 A17 17 0 0 1 44 25" fill="none" stroke="#B69CFF" strokeWidth="2.6" strokeLinecap="round"/><path d="M44.6 31.2 38.4 24.6 47.6 23.4Z" fill="#B69CFF"/><path d="M44 31 A17 17 0 0 1 12 31" fill="none" stroke="#FF6F5E" strokeWidth="2.6" strokeLinecap="round"/><path d="M11.4 24.8 17.6 31.4 8.4 32.6Z" fill="#FF6F5E"/></svg><span>Dicek di setiap langkah</span></div>
        <div className="ar-n k-red">
          <div className="ar-h"><span className="ar-i"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.4 3 8 7 10 4-2 7-5.6 7-10V6l-7-3z"/><path d="M9 12h6"/></svg></span><div><p className="ar-t">Gerbang fail-closed</p><span className="ar-s">Aturan anti-halusinasi</span></div></div>
          <ul className="ar-list"><li>AI mengusulkan, kode mengukur dan menolak</li><li>Ragu berarti tolak, bukan tebak</li><li>Gagal mengambil data tidak sama dengan data kosong</li></ul>
        </div>
      </div>
      <div className="ar-v tall" aria-hidden="true"><span className="ar-pill">Pipeline Content Factory</span></div>
      <ol className="ar-pipe">
        <li className="ar-n k-teal"><div className="ar-h2"><span className="ar-i"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg></span><span className="ar-num">01</span></div><p className="ar-t">Periksa bahan</p><span className="ar-s">Kode, tanpa AI</span><ul className="ar-list"><li>Durasi, suara, dan ucapan diukur</li><li>Transkripsi Whisper lokal</li><li>Gagal berarti berhenti dan lapor</li></ul></li>
        <li className="ar-n k-violet"><div className="ar-h2"><span className="ar-i"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.8 10.6c.6.5.8 1.1.8 1.9V16h6v-.5c0-.8.2-1.4.8-1.9A6 6 0 0 0 12 3z"/></svg></span><span className="ar-num">02</span></div><p className="ar-t">BrainIdea</p><span className="ar-s">AI mengusulkan</span><ul className="ar-list"><li>Membaca transkrip</li><li>“Menonton” empat momen per klip</li><li>Dua naskah, papan cerita, dan rencana grafis</li></ul></li>
        <li className="ar-n k-amber"><div className="ar-h2"><span className="ar-i"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.8 3.6-6 7-6s6.2 2.2 7 6"/></svg></span><span className="ar-num">03</span></div><p className="ar-t">Pilih naskah</p><span className="ar-s">Keputusan manusia</span><ul className="ar-list"><li>A, B, atau tulis sendiri</li><li>Draf berlaku 24 jam, sekali pakai</li><li>Tidak bisa dilewati</li></ul></li>
        <li className="ar-n k-teal"><div className="ar-h2"><span className="ar-i"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M7 5v14M17 5v14M3 9.5h4M3 14.5h4M17 9.5h4M17 14.5h4"/></svg></span><span className="ar-num">04</span></div><p className="ar-t">ffmpeg</p><span className="ar-s">Penyuntingan</span><ul className="ar-list"><li>Potong dan gabung video</li><li>Subtitel karaoke dan grafis</li><li>Narasi, musik, dan sampul</li><li>Satu render dalam satu waktu</li></ul></li>
        <li className="ar-n k-teal"><div className="ar-h2"><span className="ar-i"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.4 3 8 7 10 4-2 7-5.6 7-10V6l-7-3z"/><path d="m9 12 2.2 2.2L15.5 10"/></svg></span><span className="ar-num">05</span></div><p className="ar-t">Cek mutu</p><span className="ar-s">Sebelum dikirim</span><ul className="ar-list"><li>Volume suara</li><li>Bingkai yang membeku</li><li>Teks terpotong atau masuk area tombol</li></ul></li>
      </ol>
      <div className="ar-out"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="m11 9.5 3 2.5-3 2.5z"/></svg><span>Hasil akhir, video vertikal 9:16 dan sampul, dikirim Hermes ke chat yang sama</span></div>
      <div className="ar-ext"><span className="ar-lbl">Layanan luar</span><span className="ar-chip"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 18h10a4 4 0 0 0 .7-7.9A6 6 0 0 0 6.2 9.5 4.3 4.3 0 0 0 7 18z"/></svg>Model bahasa dan vision</span><span className="ar-chip"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>Narasi suara (TTS)</span><span className="ar-chip"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="8.5" cy="10" r="1.6"/><path d="m21 15-4.5-4.5L8 19"/></svg>Klip stok Pexels</span></div>
      <div className="ar-v" aria-hidden="true"></div>
      <div className="ar-n k-sky">
        <div className="ar-h"><span className="ar-i"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5.5" rx="7" ry="2.5"/><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13"/><path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/></svg></span><div><p className="ar-t">Penyimpanan dan jejak audit</p><span className="ar-s">Fakta dicatat kode dari sumber aslinya</span></div></div>
        <div className="ar-cells ar-cells5">
          <div className="ar-c"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg><div><b>Folder masuk</b><span>Hanya bahan dari sini yang diproses</span></div></div>
          <div className="ar-c"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6z"/><circle cx="12" cy="14" r="3.2"/><path d="M12 12.4V14l1 1"/></svg><div><b>Draf naskah</b><span>Terikat chat, 24 jam, sekali pakai</span></div></div>
          <div className="ar-c"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><div><b>Kunci render</b><span>Dua render tidak saling menimpa</span></div></div>
          <div className="ar-c"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/></svg><div><b>Catatan biaya</b><span>Token nyata × tarif resmi; tak dikenal = null</span></div></div>
          <div className="ar-c"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16M7 17v-4M12 17V9M17 17v-6"/></svg><div><b>Laporan performa</b><span>NO_DATA bila tak ada data asli</span></div></div>
        </div>
      </div>
      <div className="ar-base"><span className="ar-lbl">Fondasi</span><span className="ar-chip"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/></svg>Cloud VPS Linux, tanpa GPU</span><span className="ar-chip"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M7 5v14M17 5v14M3 9.5h4M3 14.5h4M17 9.5h4M17 14.5h4"/></svg>ffmpeg native</span><span className="ar-chip"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/></svg>faster-whisper di CPU</span><span className="ar-chip"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 15h9"/></svg>52 file uji otomatis, terisolasi</span></div>
      <div className="ar-legend">
        <span className="k-violet"><i></i>AI mengusulkan</span>
        <span className="k-teal"><i></i>Kode memeriksa dan mengerjakan</span>
        <span className="k-amber"><i></i>Manusia memutuskan</span>
        <span className="k-red"><i></i>Gerbang penolakan</span>
        <span className="k-sky"><i></i>Input, penyimpanan, dan infrastruktur</span>
      </div>
    </div>
    <figcaption id="ar-cap">Skema arsitektur Content Factory. Warna menandai siapa yang berwenang di setiap bagian: ungu untuk AI yang hanya mengusulkan, hijau toska untuk kode yang memeriksa dan mengerjakan, kuning untuk keputusan manusia, dan merah untuk gerbang penolakan.</figcaption>
  </figure>

  <h3>Alur langkah demi langkah</h3>
  <ol className="flow" aria-label="Alur kerja dari bahan masuk sampai video terkirim">
    <li>
      <span className="node"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 3 3 10.5l7 2.5 2.5 7L21 3z"/><path d="m10 13 4.5-4.5"/></svg></span>
      <div><b>Bahan masuk lewat Telegram</b><p>Pengguna mengirim foto atau video, lalu Hermes menerimanya.</p>
      <span className="gate"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/></svg>Ditolak jika file berada di luar folder masuk yang aman.</span></div>
    </li>
    <li>
      <span className="node"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg></span>
      <div><b>Periksa bahan</b><p>Durasi, suara, dan ucapan diukur langsung oleh kode, tanpa AI.</p>
      <span className="gate"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/></svg>Jika transkripsi gagal, sistem berhenti dan melapor.</span></div>
    </li>
    <li>
      <span className="node"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="8" height="14" rx="2"/><rect x="13" y="5" width="8" height="14" rx="2"/><path d="M5.5 9h3M15.5 9h3M5.5 12h3M15.5 12h3"/></svg></span>
      <div><b>Susun draf (BrainIdea)</b><p>Agent “menonton” empat momen dari tiap klip, lalu menyiapkan dua naskah beserta papan cerita.</p></div>
    </li>
    <li className="human">
      <span className="node"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.8 3.6-6 7-6s6.2 2.2 7 6"/></svg></span>
      <div><b>Pengguna memilih</b><p>Naskah A, B, atau naskah tulisan sendiri. Ini satu-satunya titik keputusan manusia.</p>
      <span className="gate"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/></svg>Ditolak jika draf milik chat lain, lebih dari 24 jam, atau sudah pernah dirender.</span></div>
    </li>
    <li>
      <span className="node"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3z"/></svg></span>
      <div><b>Render video (ffmpeg)</b><p>Naskah yang sudah dipilih tidak disusun ulang. Hanya satu render berjalan dalam satu waktu.</p>
      <span className="gate"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/></svg>Jika render lain sedang berjalan, permintaan ditolak dengan pesan “render sibuk”.</span></div>
    </li>
    <li>
      <span className="node"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.4 3 8 7 10 4-2 7-5.6 7-10V6l-7-3z"/><path d="m9 12 2.2 2.2L15.5 10"/></svg></span>
      <div><b>Cek mutu</b><p>Volume suara, bingkai yang membeku, dan teks yang terpotong.</p></div>
    </li>
    <li>
      <span className="node"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11h-9l-4 4v-4H4z"/><path d="m9 10.5 2 2 4-4"/></svg></span>
      <div><b>Dikirim ke chat yang sama</b><p>Kode hanya menyerahkan lokasi file; Hermes yang mengirimkannya ke pengguna.</p></div>
    </li>
  </ol>

  <h3>Dua tahap di balik layar</h3>
  <ol className="stages">
    <li className="stage" style={{'--c': 'var(--accent)'}}>
      <div className="st-top"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.8 10.6c.6.5.8 1.1.8 1.9V16h6v-.5c0-.8.2-1.4.8-1.9A6 6 0 0 0 12 3z"/></svg><span className="st-k">Tahap 1</span></div>
      <h4>BrainIdea</h4>
      <p>Memahami bahan lalu merencanakan video: membaca transkrip, “menonton” empat momen dari tiap klip, lalu menyusun dua pilihan naskah, papan cerita, dan rencana grafis.</p>
    </li>
    <li className="stage" style={{'--c': 'var(--ink)'}}>
      <div className="st-top"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M7 5v14M17 5v14M3 9.5h4M3 14.5h4M17 9.5h4M17 14.5h4"/></svg><span className="st-k">Tahap 2</span></div>
      <h4>ffmpeg</h4>
      <p>Seluruh penyuntingan dikerjakan ffmpeg native: memotong dan menggabung video, memasang subtitel karaoke dan grafis, mencampur narasi suara dengan musik yang otomatis mengecil saat ada suara, lalu membuat sampul.</p>
    </li>
  </ol>
  <p>Kedua tahap berjalan dengan batas waktu yang tegas dan satu kunci bersama, sehingga dua render tidak pernah saling menimpa file kerja yang sama.</p>
</section>

<section id="b4" className="sec" aria-labelledby="h-b4">
  <h2 id="h-b4"><span className="sec-n">4</span> Aturan anti-halusinasi</h2>
  <p>Prinsip “AI mengusulkan, kode mengukur” bukan slogan, melainkan pembagian wewenang yang ditanam langsung di struktur data. Di setiap titik yang bisa menghasilkan <em>fakta</em>, model bahasa hanya boleh <strong>memilih dari daftar yang disusun kode</strong>, biasanya cukup dengan menyebut sebuah nomor. Isi sebenarnya kemudian disalin kode dari sumber aslinya.</p>

  <figure className="panel">
    <svg className="ill cap-600" viewBox="0 0 420 214" role="img" aria-labelledby="mn-t">
      <title id="mn-t">Ilustrasi: kode memecah transkrip menjadi daftar potongan ucapan bernomor, AI hanya menyebut nomor 3, lalu kode memakai potongan nomor 3 apa adanya di rencana edit. Jalur AI menulis ucapannya sendiri dicoret merah.</title>
      <rect className="f-paper s-ink w15" x="14" y="26" width="120" height="152" rx="10"/>
      <path className="f-teal" d="M14 36 a10 10 0 0 1 10 -10 h100 a10 10 0 0 1 10 10 v18 h-120 Z"/>
      <text className="f-onacc t14 b7" x="74" y="46.5" textAnchor="middle">Potongan</text>
      <circle className="f-tealS" cx="34" cy="72" r="10"/><text className="f-teal t14 b8" x="34" y="77" textAnchor="middle">1</text>
      <rect className="f-mut o5" x="52" y="66" width="70" height="6" rx="3"/><rect className="f-mut o3" x="52" y="76" width="48" height="5" rx="2.5"/>
      <circle className="f-tealS" cx="34" cy="106" r="10"/><text className="f-teal t14 b8" x="34" y="111" textAnchor="middle">2</text>
      <rect className="f-mut o5" x="52" y="100" width="70" height="6" rx="3"/><rect className="f-mut o3" x="52" y="110" width="48" height="5" rx="2.5"/>
      <rect className="f-none s-teal w15 dsh" x="21" y="127" width="106" height="27" rx="8"/>
      <circle className="f-tealS" cx="34" cy="140" r="10"/><text className="f-teal t14 b8" x="34" y="145" textAnchor="middle">3</text>
      <rect className="f-mut o5" x="52" y="134" width="70" height="6" rx="3"/><rect className="f-mut o3" x="52" y="144" width="48" height="5" rx="2.5"/>
      <path className="f-none s-mut w2 rnd" d="M142 102 H162"/><path className="f-mut" d="M162 96 L171 102 L162 108 Z"/>
      <path className="f-none s-ink w2 rnd" d="M214 72 V60"/><circle className="f-amb" cx="214" cy="56" r="5"/>
      <rect className="f-paper2 s-ink w2" x="182" y="72" width="64" height="52" rx="14"/>
      <circle className="f-ink" cx="202" cy="96" r="5"/><circle className="f-ink" cx="226" cy="96" r="5"/>
      <rect className="f-ink" x="204" y="108" width="20" height="4" rx="2"/>
      <rect className="f-paper2 s-ink w2" x="190" y="128" width="48" height="34" rx="10"/>
      <path className="f-amb" d="M241 52 L236 67 L253 54 Z"/>
      <rect className="f-amb" x="232" y="22" width="40" height="34" rx="11"/>
      <text className="f-onamb b8" style={{fontSize: '21px'}} x="252" y="46.5" textAnchor="middle">3</text>
      <path className="f-none s-mut w2 rnd" d="M254 102 H274"/><path className="f-mut" d="M274 96 L283 102 L274 108 Z"/>
      <rect className="f-paper s-ink w15" x="290" y="26" width="116" height="152" rx="8"/>
      <rect className="f-ink o7" x="304" y="42" width="58" height="8" rx="4"/>
      <rect className="f-mut o4" x="304" y="60" width="88" height="5" rx="2.5"/>
      <rect className="f-mut o4" x="304" y="72" width="70" height="5" rx="2.5"/>
      <rect className="f-tealS s-teal w15" x="298" y="88" width="100" height="32" rx="7"/>
      <circle className="f-teal" cx="314" cy="104" r="9"/><text className="f-onacc t13 b8" x="314" y="108.5" textAnchor="middle">3</text>
      <rect className="f-mut o5" x="330" y="97" width="58" height="5" rx="2.5"/><rect className="f-mut o3" x="330" y="107" width="40" height="5" rx="2.5"/>
      <rect className="f-mut o4" x="304" y="134" width="88" height="5" rx="2.5"/>
      <rect className="f-mut o4" x="304" y="146" width="76" height="5" rx="2.5"/>
      <rect className="f-mut o3" x="304" y="158" width="60" height="5" rx="2.5"/>
      <path className="f-none s-red w2 dsh rnd" d="M214 164 C214 200 300 206 346 180"/>
      <path className="f-none s-red w3 rnd" d="M255 187 L271 203 M271 187 L255 203"/>
    </svg>
    <ol className="trio">
      <li>Kode mentranskripsi ucapan asli, lalu memecahnya menjadi daftar potongan bernomor lengkap dengan waktunya.</li>
      <li>Model bahasa hanya menyebut nomor potongan yang dipakai. Nomor yang tidak ada di daftar ditolak.</li>
      <li>Kode memakai potongan itu apa adanya, tepat di waktu mulai dan selesainya. Jalur AI menulis ucapannya sendiri diblokir.</li>
    </ol>
    <figcaption>Mirip memesan dari menu: pelanggan cukup menyebut nomor, dapur yang menyajikan hidangan aslinya. Pola yang sama dipakai untuk memilih grafis dari katalog yang sah.</figcaption>
  </figure>

  <div className="split-wrap">
    <table className="split">
      <caption>Pembagian wewenang. Kolom kiri adalah batas maksimal yang diterima dari model; kolom kanan sepenuhnya dikerjakan kode.</caption>
      <thead><tr>
        <th scope="col"><span><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 8V5"/><path d="M9.5 13h.01M14.5 13h.01"/></svg>AI boleh mengusulkan</span></th>
        <th scope="col"><span><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>Kode yang menentukan</span></th>
      </tr></thead>
      <tbody>
        <tr><td>Nomor potongan ucapan</td><td>Menyusun kandidat, memeriksa, dan menjaga batas durasi</td></tr>
        <tr><td className="none">Tidak dilibatkan</td><td>Daftar bahan; nama file karangan langsung memicu kegagalan</td></tr>
        <tr><td>Usulan grafis beserta kata pemicunya</td><td>Katalog grafis yang sah, menolak angka yang tidak pernah diminta pengguna, dan menjadwalkan grafis saat kata itu benar-benar diucapkan</td></tr>
        <tr><td className="none">Tidak dilibatkan</td><td>Biaya: token nyata dari API dikali tarif resmi</td></tr>
        <tr><td className="none">Tidak dilibatkan</td><td>Angka performa: tertulis <code>NO_DATA</code> jika tidak ada data asli</td></tr>
      </tbody>
    </table>
  </div>

  <p style={{marginTop: '1.8rem'}}>Baris terakhir tabel itu punya cerita sendiri. Fungsi pengukur performa dulu memakai angka acak dan melaporkan konten “berkinerja tinggi”, padahal belum satu pun unggahan diterbitkan. Sekarang laporannya menulis <code>NO_DATA</code>. Kami memilih kolom kosong yang jujur daripada angka yang enak dibaca.</p>

  <div className="duo wide" style={{marginBlock: '1.6rem'}}>
    <div className="cell red">
      <svg className="ill" viewBox="0 0 180 124" aria-hidden="true">
        <path className="f-none s-rule w12" d="M30 96 A60 60 0 0 1 150 96"/>
        <path className="f-none s-red w12" d="M30 96 A60 60 0 0 1 143.5 68.8"/>
        <path className="f-none s-ink w3 rnd" d="M90 96 L129 76"/>
        <circle className="f-ink" cx="90" cy="96" r="6"/>
        <rect className="f-paper s-ink w2" x="10" y="8" width="28" height="28" rx="6"/>
        <circle className="f-ink" cx="17.5" cy="15.5" r="2.4"/><circle className="f-ink" cx="30.5" cy="15.5" r="2.4"/><circle className="f-ink" cx="24" cy="22" r="2.4"/><circle className="f-ink" cx="17.5" cy="28.5" r="2.4"/><circle className="f-ink" cx="30.5" cy="28.5" r="2.4"/>
        <text className="f-red t13 b6 mono" x="90" y="117" textAnchor="middle">HIGH_PERFORMING</text>
      </svg>
      <p className="cell-t">Dulu: angka acak</p>
      <p>Laporan menyebut konten berkinerja tinggi, padahal belum ada unggahan.</p>
    </div>
    <div className="cell teal">
      <svg className="ill" viewBox="0 0 180 124" aria-hidden="true">
        <path className="f-none s-rule w12" style={{strokeDasharray: '7 6'}} d="M30 96 A60 60 0 0 1 150 96"/>
        <circle className="f-ink" cx="90" cy="96" r="6"/>
        <text className="f-teal t13 b6 mono" x="90" y="117" textAnchor="middle">NO_DATA</text>
        <circle className="f-teal" cx="156" cy="22" r="12"/>
        <path className="f-none s-onacc w25 rnd" d="M150.5 22 l4 4 l7 -8"/>
      </svg>
      <p className="cell-t">Sekarang: jujur kosong</p>
      <p>Tanpa data asli, laporan menulis NO_DATA, bukan angka karangan.</p>
    </div>
  </div>

  <p>Prinsip yang sama berlaku untuk biaya. Model yang tarifnya tidak terdaftar <strong>tidak akan ditebak</strong>; biayanya dicatat kosong (<code>null</code>), bukan nol. Nol adalah sebuah klaim, sedangkan kosong adalah pengakuan bahwa kami tidak tahu.</p>

  <h3>Kalau ragu, sistem menolak</h3>
  <p>Sistem ini dipakai lebih dari satu orang, dan satu tebakan keliru bisa membuat bahan milik seseorang sampai ke orang lain. Karena itu setiap keraguan berakhir dengan penolakan, bukan tebakan:</p>
  <ul className="stops">
    <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/></svg><span><b>Chat tujuan tidak jelas.</b> Tidak ada chat cadangan.</span></li>
    <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/></svg><span><b>File berada di luar folder masuk.</b> Sistem tidak pernah memindai folder atau asal mengambil “file terbaru”.</span></li>
    <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/></svg><span><b>Bahan tidak disebut dengan jelas.</b> Folder bahan juga berisi milik pengguna lain, jadi memakai semua isinya bukan pilihan.</span></li>
    <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/></svg><span><b>Draf milik chat lain, berumur lebih dari 24 jam, bahannya berbeda, atau sudah pernah dirender.</b> Setiap draf hanya bisa dipakai sekali, dan dilepas kembali jika render gagal.</span></li>
    <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/></svg><span><b>Pengaturan salah ketik.</b> Ditolak di awal, sebelum ada biaya AI yang terpakai.</span></li>
  </ul>
</section>

<section id="b5" className="sec" aria-labelledby="h-b5">
  <h2 id="h-b5"><span className="sec-n">5</span> Lima kegagalan dan pelajarannya</h2>
  <p>Setiap aturan di atas lahir dari kegagalan yang bisa ditunjuk tanggalnya. Kami menuliskannya terbuka, karena aturan tanpa alasan yang jelas akan dilanggar lagi, termasuk oleh kami sendiri seminggu kemudian.</p>

  <div className="fails wide">
    <article className="fail big">
      <div className="f-art">
        <svg className="ill" viewBox="0 0 160 110" aria-hidden="true">
          <rect className="f-scr" x="10" y="6" width="58" height="98" rx="8"/>
          <circle className="f-amb" cx="39" cy="38" r="12"/>
          <path className="f-teal" d="M22 104 C22 72 29 58 39 58 C49 58 56 72 56 104 Z"/>
          <ellipse className="f-scr" cx="39" cy="43" rx="4" ry="3"/>
          <rect className="f-rec" x="14" y="78" width="50" height="14" rx="3"/>
          <rect className="f-onscr o8" x="19" y="83" width="40" height="4" rx="2"/>
          <path className="f-redS s-red w15" d="M92 57 L80 70 L102 57"/>
          <rect className="f-redS s-red w15" x="80" y="16" width="72" height="42" rx="10"/>
          <text className="f-red t10 b7" x="116" y="34" textAnchor="middle">Halo</text>
          <text className="f-red t10 b7" x="116" y="48" textAnchor="middle">semuanya!</text>
          <rect className="f-paper2 s-ink w15" x="102" y="72" width="28" height="22" rx="6"/>
          <path className="f-none s-ink w15" d="M116 72 V66"/><circle className="f-amb" cx="116" cy="64" r="2.5"/>
          <circle className="f-ink" cx="111" cy="83" r="2"/><circle className="f-ink" cx="121" cy="83" r="2"/>
        </svg>
      </div>
      <div className="f-body">
        <time datetime="2026-09-19T20:00+07:00">19 Sep, 20.00 WIB</time>
        <h3>Suara AI ditempel di atas orang yang sedang berbicara</h3>
        <dl>
          <dt>Terjadi</dt><dd>Video draf berisi narasi yang sama sekali tidak berhubungan dengan rekaman.</dd>
          <dt>Penyebab</dt><dd>Kuota transkripsi habis, nol transkrip kembali, dan kode menganggapnya “tidak ada ucapan”.</dd>
          <dt className="fx">Perbaikan</dt><dd>Pemeriksaan kini melaporkan <em>alasan</em> kegagalan untuk tiap bahan. Hanya “memang tanpa ucapan” dan “memang tanpa audio” yang boleh lanjut; selain itu pipeline berhenti dengan pesan yang jelas, sebelum ada biaya AI yang terpakai.</dd>
        </dl>
      </div>
    </article>

    <article className="fail">
      <div className="f-art">
        <svg className="ill" viewBox="0 0 160 110" aria-hidden="true">
          <defs><clipPath id="f2c"><rect x="6" y="6" width="148" height="98" rx="8"/></clipPath></defs>
          <g clipPath="url(#f2c)">
            <rect className="f-scr" x="6" y="6" width="148" height="98"/>
            <circle className="f-amb o3" cx="122" cy="24" r="16"/>
            <circle className="f-amb o7" cx="122" cy="24" r="5"/>
            <g className="f-crowd">
              <circle cx="24" cy="62" r="10"/><ellipse cx="24" cy="86" rx="15" ry="14"/>
              <circle cx="52" cy="57" r="10"/><ellipse cx="52" cy="81" rx="15" ry="14"/>
              <circle cx="80" cy="64" r="10"/><ellipse cx="80" cy="88" rx="15" ry="14"/>
              <circle cx="108" cy="58" r="10"/><ellipse cx="108" cy="82" rx="15" ry="14"/>
              <circle cx="136" cy="63" r="10"/><ellipse cx="136" cy="87" rx="15" ry="14"/>
            </g>
            <rect className="f-onscr" x="12" y="76" width="136" height="21" rx="5"/>
            <text className="f-scrInk t9 b6" x="80" y="90" textAnchor="middle">Thank you for watching!</text>
            <path className="f-none s-rec w2" d="M18 87 H142"/>
          </g>
        </svg>
      </div>
      <div className="f-body">
        <time datetime="2026-09-19T20:27+07:00">19 Sep, 20.27 WIB</time>
        <h3>Keramaian ditranskrip jadi “Thank you for watching!”</h3>
        <dl>
          <dt>Terjadi</dt><dd>Klip keramaian tanpa percakapan menghasilkan teks “You”, “Thank you for watching!”, dan “.”, yang sempat lolos sebagai transkrip sah.</dd>
          <dt>Penyebab</dt><dd>Filter bawaan Whisper tidak cukup ketat untuk kasus seperti ini.</dd>
          <dt className="fx">Perbaikan</dt><dd>Potongan tanpa huruf, atau yang besar kemungkinannya bukan ucapan, kini dibuang. Bahan yang bersuara tetap memakai suara aslinya.</dd>
        </dl>
      </div>
    </article>

    <article className="fail">
      <div className="f-art">
        <svg className="ill" viewBox="0 0 160 110" aria-hidden="true">
          <rect className="f-scr" x="6" y="6" width="80" height="98" rx="8"/>
          <rect className="f-amb" x="12" y="16" width="14" height="16"/><rect className="f-onscr" x="26" y="16" width="14" height="16"/>
          <rect className="f-amb" x="40" y="16" width="14" height="16"/><rect className="f-onscr" x="54" y="16" width="14" height="16"/>
          <rect className="f-amb" x="68" y="16" width="12" height="16"/>
          <rect className="f-onscr o5" x="14" y="32" width="4" height="34"/><rect className="f-onscr o5" x="74" y="32" width="4" height="34"/>
          <rect className="f-amb o7" x="12" y="64" width="68" height="34" rx="3"/>
          <path className="f-onscr" d="M31 64 a15 9 0 0 0 30 0 Z"/>
          <path className="f-none s-onscr w15 rnd o6" d="M40 56 c-3 -4 3 -7 0 -11 M52 56 c-3 -4 3 -7 0 -11"/>
          <path className="f-none s-ink w2 rnd" d="M124 50 V42"/><circle className="f-amb" cx="124" cy="39" r="3.5"/>
          <rect className="f-paper2 s-ink w2" x="100" y="50" width="48" height="38" rx="10"/>
          <rect className="f-red" x="97" y="61" width="54" height="10" rx="3"/>
          <rect className="f-ink" x="116" y="78" width="16" height="3" rx="1.5"/>
          <rect className="f-paper2 s-ink w2" x="106" y="90" width="36" height="18" rx="5"/>
          <circle className="f-paper s-ink w15" cx="140" cy="36" r="2.5"/>
          <circle className="f-paper s-ink w15" cx="138" cy="18" r="13"/>
          <path className="f-teal" d="M135.5 10 h5 v5.5 h5.5 v5 h-5.5 v5.5 h-5 v-5.5 h-5.5 v-5 h5.5 z"/>
        </svg>
      </div>
      <div className="f-body">
        <time datetime="2026-09-25">25 Sep</time>
        <h3>AI mendeskripsikan video yang tidak pernah dilihatnya</h3>
        <dl>
          <dt>Terjadi</dt><dd>Naskah menyebut “petugas medis memeriksa calon pendonor” untuk rekaman pusat jajanan.</dd>
          <dt>Penyebab</dt><dd>Model gratis yang biasa dipakai dicabut penyedianya, dan model cadangan yang tidak bisa melihat gambar malah dipakai lebih dulu.</dd>
          <dt className="fx">Perbaikan</dt><dd>Model tanpa kemampuan melihat ditaruh paling akhir dan diberi tahu terang-terangan bahwa ia tidak melihat video. Pesan draf juga menyampaikannya kepada pengguna.</dd>
        </dl>
      </div>
    </article>

    <article className="fail">
      <div className="f-art">
        <svg className="ill" viewBox="0 0 160 110" aria-hidden="true">
          <rect className="f-ink" x="44" y="14" width="12" height="9" rx="2"/>
          <circle className="f-paper s-ink w2" cx="50" cy="62" r="36"/>
          <path className="f-none s-mut w2 rnd" d="M50 30 v5 M50 89 v5 M18 62 h5 M77 62 h5"/>
          <path className="f-none s-ink w3 rnd" d="M50 62 L50 40 M50 62 L65 70"/>
          <circle className="f-ink" cx="50" cy="62" r="3.5"/>
          <rect className="f-paper s-mut w15" x="96" y="16" width="58" height="84" rx="6"/>
          <rect className="f-mut o4" x="104" y="28" width="42" height="5" rx="2.5"/>
          <rect className="f-mut o4" x="104" y="39" width="30" height="5" rx="2.5"/>
          <circle className="f-redS s-red w2" cx="124" cy="62" r="14"/>
          <text className="f-red t13 b8" x="124" y="67" textAnchor="middle">15</text>
          <text className="f-red t14 b8" x="143" y="52" textAnchor="middle">?</text>
          <rect className="f-mut o4" x="104" y="84" width="40" height="5" rx="2.5"/>
        </svg>
      </div>
      <div className="f-body">
        <time datetime="2026-09-25">25 Sep</time>
        <h3>Naskah menjanjikan “cuma 15 menit” yang tak pernah disebut siapa pun</h3>
        <dl>
          <dt>Terjadi</dt><dd>Angka spesifik muncul di naskah tanpa sumber, tidak ada di permintaan pengguna maupun di ucapan asli.</dd>
          <dt>Penyebab</dt><dd>Pemeriksa naskah hanya mengecek gaya bahasa, bukan klaim fakta.</dd>
          <dt className="fx">Perbaikan</dt><dd>Angka yang tidak ada di sumber kini ditandai dan naskah ditulis ulang. Pengecekan huruf non-Latin juga diperluas ke judul dan caption, setelah aksara Mandarin sempat lolos ke caption varian B.</dd>
        </dl>
      </div>
    </article>

    <article className="fail">
      <div className="f-art">
        <svg className="ill" viewBox="0 0 160 110" aria-hidden="true">
          <rect className="f-rec" x="10" y="10" width="62" height="62" rx="6"/>
          <circle className="f-paper s-red w2" cx="70" cy="12" r="9"/>
          <path className="f-none s-red w2 rnd" d="M66.5 8.5 l7 7 M73.5 8.5 l-7 7"/>
          <text className="f-red t12 b8" x="41" y="91" textAnchor="middle">8,2</text>
          <rect className="f-scr" x="88" y="10" width="62" height="62" rx="6"/>
          <rect className="f-onscr" x="97" y="22" width="44" height="36" rx="4"/>
          <rect className="f-amb" x="97" y="22" width="44" height="8" rx="3"/>
          <path className="f-rec" d="M119 34 L127 48 L111 48 Z"/>
          <rect className="f-onscr o6" x="104" y="62" width="30" height="4" rx="2"/>
          <circle className="f-teal" cx="148" cy="12" r="9"/>
          <path className="f-none s-onacc w2 rnd" d="M143.5 12 l3 3 l6 -7"/>
          <text className="f-teal t12 b8" x="119" y="91" textAnchor="middle">42,9</text>
          <text className="f-mut t10" x="80" y="106" textAnchor="middle">skor detail visual</text>
        </svg>
      </div>
      <div className="f-body">
        <time datetime="2026-09-26">26 Sep</time>
        <h3>Klip stok “error message” ternyata layar merah polos</h3>
        <dl>
          <dt>Terjadi</dt><dd>B-roll yang disisipkan hanya berupa bidang merah tanpa detail apa pun. Sah menurut data, kosong di mata.</dd>
          <dt>Penyebab</dt><dd>Klip stok dipilih hanya dari kecocokan kata kunci, tanpa melihat isi gambarnya.</dd>
          <dt className="fx">Perbaikan</dt><dd>Klip dengan skor detail di bawah 12 kini ditolak. Klip merah itu terukur 8,2, sedangkan kandidat berikutnya terukur 42,9 dan dipakai. Judul klip juga wajib nyambung dengan kata kuncinya.</dd>
        </dl>
      </div>
    </article>
  </div>

  <div className="note">
    <p><strong>Satu insiden operasional juga meninggalkan aturan.</strong> Sebuah render milik pengguna pernah hilang tanpa jejak karena server di-restart saat render masih berjalan. Render berhenti satu langkah sebelum selesai, dan pengguna tidak menerima kabar apa pun. Sejak itu, server wajib dicek bebas dari render yang sedang berjalan sebelum boleh di-restart.</p>
  </div>
</section>

<section id="b6" className="sec" aria-labelledby="h-b6">
  <h2 id="h-b6"><span className="sec-n">6</span> Apa saja yang bisa dibuat</h2>
  <p>Content Factory <strong>menyunting bahan milik pengguna</strong>; ia tidak membuat video sintetis dari nol. Perbedaan ini menentukan seluruh desainnya.</p>

  <h3>Empat resep, lahir dari permintaan pengguna</h3>
  <div className="recipes wide">
    <div className="recipe">
      <svg className="ill" viewBox="0 0 120 200" aria-hidden="true">
        <defs><clipPath id="r1c"><rect x="12" y="10" width="96" height="180" rx="12"/></clipPath></defs>
        <rect className="f-dev" x="6" y="4" width="108" height="192" rx="18"/>
        <g clipPath="url(#r1c)">
          <rect className="f-scr" x="12" y="10" width="96" height="180"/>
          <rect className="f-amb" x="54" y="100" width="12" height="24"/>
          <path className="f-teal" d="M26 190 C26 142 42 120 60 120 C78 120 94 142 94 190 Z"/>
          <circle className="f-amb" cx="60" cy="88" r="20"/>
          <path className="f-hair" d="M40 87 C39 70 50 64 60 64 C72 64 81 72 80 87 C75 79 67 76 60 76 C52 76 45 80 40 87 Z"/>
          <ellipse className="f-scr" cx="60" cy="98" rx="4.5" ry="3.2"/>
          <rect className="f-ambS s-onscr w15" x="60" y="20" width="42" height="32" rx="4"/>
          <path className="f-amb" d="M62 50 L73 37 L81 45 L87 39 L100 50 Z"/>
          <circle className="f-amb" cx="94" cy="28" r="3"/>
          <rect className="f-onscr" x="20" y="150" width="80" height="18" rx="4"/>
          <rect className="f-scrInk o7" x="27" y="157" width="66" height="4" rx="2"/>
        </g>
      </svg>
      <h4>Suara asli, subtitel, dan B-roll</h4>
      <p>Klip stok muncul sesaat di atas video saat kata yang relevan diucapkan. Suara asli dan subtitel tidak bergeser sedikit pun.</p>
    </div>
    <div className="recipe">
      <svg className="ill" viewBox="0 0 120 200" aria-hidden="true">
        <defs><clipPath id="r2c"><rect x="12" y="10" width="96" height="180" rx="12"/></clipPath></defs>
        <rect className="f-dev" x="6" y="4" width="108" height="192" rx="18"/>
        <g clipPath="url(#r2c)">
          <rect className="f-scr" x="12" y="10" width="96" height="180"/>
          <rect className="f-amb o4" x="12" y="118" width="96" height="72"/>
          <path className="f-onscr" d="M45 92 H73 V104 C73 112 67 116 59 116 C51 116 45 112 45 104 Z"/>
          <path className="f-none s-onscr w2 rnd" d="M73 96 C82 96 82 108 73 108"/>
          <path className="f-none s-onscr w15 rnd o6" d="M53 86 c-3 -4 3 -7 0 -11 M64 86 c-3 -4 3 -7 0 -11"/>
          <rect className="f-onscr" x="22" y="24" width="62" height="10" rx="3"/>
          <rect className="f-onscr o7" x="22" y="40" width="42" height="7" rx="3"/>
          <circle className="f-onscr" cx="88" cy="74" r="4"/>
          <path className="f-none s-onscr w2 rnd" d="M92 74 V58 q7 1 8 8"/>
          <rect className="f-amb" x="22" y="128" width="58" height="16" rx="8"/>
          <rect className="f-onamb o6" x="30" y="134" width="42" height="4" rx="2"/>
          <rect className="f-teal" x="24" y="168.0" width="3.2" height="4" rx="1.6"/><rect className="f-teal" x="30" y="165.5" width="3.2" height="9" rx="1.6"/><rect className="f-teal" x="36" y="163.5" width="3.2" height="13" rx="1.6"/><rect className="f-teal" x="42" y="166.5" width="3.2" height="7" rx="1.6"/><rect className="f-teal" x="48" y="162.5" width="3.2" height="15" rx="1.6"/><rect className="f-teal" x="54" y="165.5" width="3.2" height="9" rx="1.6"/><rect className="f-teal" x="60" y="167.5" width="3.2" height="5" rx="1.6"/><rect className="f-teal" x="66" y="164.0" width="3.2" height="12" rx="1.6"/><rect className="f-teal" x="72" y="166.0" width="3.2" height="8" rx="1.6"/><rect className="f-teal" x="78" y="163.0" width="3.2" height="14" rx="1.6"/><rect className="f-teal" x="84" y="167.0" width="3.2" height="6" rx="1.6"/><rect className="f-teal" x="90" y="165.0" width="3.2" height="10" rx="1.6"/><rect className="f-teal" x="96" y="168.0" width="3.2" height="4" rx="1.6"/>
        </g>
      </svg>
      <h4>Narasi AI, teks, grafis, dan musik</h4>
      <p>Klip stok disisipkan di sela bahan pengguna, bukan ditumpuk di atasnya.</p>
    </div>
    <div className="recipe">
      <svg className="ill" viewBox="0 0 120 200" aria-hidden="true">
        <defs><clipPath id="r3c"><rect x="12" y="10" width="96" height="180" rx="12"/></clipPath></defs>
        <rect className="f-dev" x="6" y="4" width="108" height="192" rx="18"/>
        <g clipPath="url(#r3c)">
          <rect className="f-scr" x="12" y="10" width="96" height="180"/>
          <rect className="f-teal" x="20" y="30" width="26" height="22" rx="3"/>
          <rect className="f-amb" x="47" y="30" width="26" height="22" rx="3"/>
          <rect className="f-onscr o7" x="74" y="30" width="26" height="22" rx="3"/>
          <path className="f-none s-rec w2 dsh" d="M46.5 22 V60 M73.5 22 V60"/>
          <circle className="f-none s-onscr w15" cx="54" cy="76" r="4"/>
          <circle className="f-none s-onscr w15" cx="66" cy="76" r="4"/>
          <path className="f-none s-onscr w15 rnd" d="M56.5 73 L68 62 M63.5 73 L52 62"/>
          <path className="f-none s-onscr w15 rnd o6" d="M33 90 V100 M60 90 V100 M87 90 V100"/>
          <path className="f-onscr o6" d="M29 98 L33 104 L37 98 Z M56 98 L60 104 L64 98 Z M83 98 L87 104 L91 98 Z"/>
          <rect className="f-teal" x="20" y="110" width="26" height="46" rx="4"/>
          <rect className="f-amb" x="47" y="110" width="26" height="46" rx="4"/>
          <rect className="f-onscr o7" x="74" y="110" width="26" height="46" rx="4"/>
          <path className="f-onscr" d="M29 127 L37 133 L29 139 Z"/>
          <path className="f-onamb" d="M56 127 L64 133 L56 139 Z"/>
          <path className="f-scrInk" d="M83 127 L91 133 L83 139 Z"/>
          <rect className="f-onscr o4" x="22" y="164" width="22" height="4" rx="2"/>
          <rect className="f-onscr o4" x="49" y="164" width="22" height="4" rx="2"/>
          <rect className="f-onscr o4" x="76" y="164" width="22" height="4" rx="2"/>
        </g>
      </svg>
      <h4>Satu video panjang jadi dua atau tiga</h4>
      <p>Video bicara yang panjang dipecah menjadi dua hingga tiga konten pendek yang masing-masing bisa berdiri sendiri.</p>
    </div>
    <div className="recipe">
      <svg className="ill" viewBox="0 0 120 200" aria-hidden="true">
        <defs><clipPath id="r4c"><rect x="12" y="10" width="96" height="180" rx="12"/></clipPath></defs>
        <rect className="f-dev" x="6" y="4" width="108" height="192" rx="18"/>
        <g clipPath="url(#r4c)">
          <rect className="f-scr" x="12" y="10" width="96" height="180"/>
          <rect className="f-amb" x="18" y="18" width="40" height="56" rx="4"/>
          <rect className="f-teal" x="62" y="18" width="40" height="56" rx="4"/>
          <rect className="f-tealS" x="18" y="78" width="40" height="56" rx="4"/>
          <rect className="f-ambS" x="62" y="78" width="40" height="56" rx="4"/>
          <circle className="f-onamb o5" cx="38" cy="40" r="7"/><path className="f-onamb o5" d="M24 72 L34 56 L42 64 L48 58 L56 72 Z"/>
          <circle className="f-onacc o6" cx="82" cy="40" r="9"/><path className="f-onacc o6" d="M68 74 C68 60 74 54 82 54 C90 54 96 60 96 74 Z"/>
          <path className="f-teal o6" d="M24 128 L36 104 L46 118 L52 110 L56 128 Z"/>
          <path className="f-amb o7" d="M70 132 C72 116 78 104 82 100 C86 104 92 116 94 132 Z"/>
          <path className="f-amb" d="M26 146 L30 152 L34 146 Z M46 146 L50 152 L54 146 Z M66 146 L70 152 L74 146 Z M86 146 L90 152 L94 146 Z"/>
          <rect className="f-onscr o7" x="18" y="165.5" width="3" height="5.0" rx="1.5"/><rect className="f-onscr o7" x="23" y="159.7" width="3" height="16.6" rx="1.5"/><rect className="f-onscr o7" x="28" y="162.4" width="3" height="11.2" rx="1.5"/><rect className="f-onscr o7" x="33" y="161.4" width="3" height="13.3" rx="1.5"/><rect className="f-onscr o7" x="38" y="160.2" width="3" height="15.6" rx="1.5"/><rect className="f-onscr o7" x="43" y="164.2" width="3" height="7.6" rx="1.5"/><rect className="f-onscr o7" x="48" y="159.5" width="3" height="17.0" rx="1.5"/><rect className="f-onscr o7" x="53" y="163.6" width="3" height="8.8" rx="1.5"/><rect className="f-onscr o7" x="58" y="160.5" width="3" height="14.9" rx="1.5"/><rect className="f-onscr o7" x="63" y="160.9" width="3" height="14.1" rx="1.5"/><rect className="f-onscr o7" x="68" y="163.0" width="3" height="10.0" rx="1.5"/><rect className="f-onscr o7" x="73" y="159.6" width="3" height="16.8" rx="1.5"/><rect className="f-onscr o7" x="78" y="164.9" width="3" height="6.3" rx="1.5"/><rect className="f-onscr o7" x="83" y="159.9" width="3" height="16.1" rx="1.5"/><rect className="f-onscr o7" x="88" y="161.9" width="3" height="12.3" rx="1.5"/><rect className="f-onscr o7" x="93" y="161.9" width="3" height="12.3" rx="1.5"/><rect className="f-onscr o7" x="98" y="159.9" width="3" height="16.1" rx="1.5"/>
        </g>
      </svg>
      <h4>Montase mengikuti ketukan lagu</h4>
      <p>Klip tanpa percakapan dipadukan dengan lagu; pergantian gambar jatuh tepat di ketukan.</p>
    </div>
  </div>

  <h3>Detail kecil yang lahir dari pengujian</h3>
  <div className="safe">
    <figure style={{margin: '0'}}>
      <svg className="ill" viewBox="0 0 220 300" role="img" aria-labelledby="sz-t">
        <title id="sz-t">Layar ponsel dengan kolom tombol di sisi kanan. Subtitel dibatasi 74 persen lebar layar agar tidak tertutup tombol.</title>
        <defs><clipPath id="sz-c"><rect x="44" y="14" width="132" height="272" rx="17"/></clipPath></defs>
        <rect className="f-dev" x="36" y="6" width="148" height="288" rx="24"/>
        <g clipPath="url(#sz-c)">
          <rect className="f-scr" x="44" y="14" width="132" height="272"/>
          <circle className="f-amb o2" cx="146" cy="52" r="30"/>
          <rect className="f-amb" x="100" y="138" width="16" height="36"/>
          <path className="f-teal" d="M52 286 C52 206 78 170 108 170 C138 170 164 206 164 286 Z"/>
          <circle className="f-amb" cx="108" cy="116" r="28"/>
          <path className="f-hair" d="M80 114 C78 90 94 82 108 82 C124 82 138 92 136 114 C128 102 118 98 108 98 C96 98 86 104 80 114 Z"/>
          <circle className="f-scr" cx="98" cy="118" r="3"/><circle className="f-scr" cx="118" cy="118" r="3"/>
          <ellipse className="f-scr" cx="108" cy="132" rx="6" ry="4"/>
          <rect className="f-scr o5" x="150" y="100" width="26" height="132"/>
          <g className="f-onscr">
            <circle cx="163" cy="118" r="8"/>
            <path d="M163 158 C154 151 155 142 159.5 142 C161.5 142 163 144 163 145.5 C163 144 164.5 142 166.5 142 C171 142 172 151 163 158 Z"/>
            <path d="M154 174 h18 v12 h-11 l-5 4 v-4 h-2 z"/>
            <path d="M155 214 L171 206 L167 222 L164 216 Z"/>
          </g>
          <rect className="f-none s-rec w2 dsh" x="151" y="102" width="24" height="128" rx="10"/>
          <path className="f-none s-onscr w15" d="M50 226 H148 M50 221 V231 M148 221 V231"/>
          <rect className="f-teal" x="80" y="215" width="38" height="20" rx="10"/>
          <text className="f-onacc t12 b8" x="99" y="229" textAnchor="middle">74%</text>
          <rect className="f-onscr" x="50" y="240" width="98" height="34" rx="7"/>
          <rect className="f-scrInk o7" x="58" y="248" width="82" height="6" rx="3"/>
          <rect className="f-scrInk o7" x="66" y="260" width="66" height="6" rx="3"/>
        </g>
      </svg>
    </figure>
    <ul className="dots">
      <li><b>Subtitel maksimal 74% lebar layar,</b> karena kolom tombol di sisi kanan TikTok menutupi sisanya.</li>
      <li><b>Kecepatan video hanya diubah pada mode narasi AI.</b> Pada mode suara asli, kecepatan tidak disentuh agar subtitel tetap sinkron dengan gerak bibir.</li>
      <li><b>Efek zoom pelan (Ken Burns) hanya untuk foto,</b> tidak untuk video.</li>
      <li><b>Grafis penjelas diletakkan di bawah wajah pembicara</b> dan muncul tepat saat kata kuncinya diucapkan, bukan di posisi tetap.</li>
      <li><b>Volume musik diukur dari kenyaringan video,</b> bukan disetel dengan angka tetap.</li>
    </ul>
  </div>

  <div className="limits">
    <h3>Yang sengaja tidak dijanjikan</h3>
    <p>Deskripsi tool untuk agent menyebut batasan ini secara eksplisit, supaya bot tidak pernah menjanjikan kemampuan yang tidak dimilikinya:</p>
    <ul>
      <li>Color grading profesional atau LUT, stabilisasi, stiker, dan dubbing bahasa.</li>
      <li>Upload otomatis ke Instagram, TikTok, atau YouTube.</li>
      <li>Analitik performa asli. Tanpa data asli, laporan menulis <code>NO_DATA</code>.</li>
    </ul>
  </div>
  <p>Dulu pernah ada versi deskripsi tool tanpa batasan ini, dan akibatnya bot menjanjikan color grading kepada pengguna. Menulis apa yang tidak bisa dilakukan ternyata sama pentingnya dengan menulis apa yang bisa.</p>
</section>

<section id="b7" className="sec" aria-labelledby="h-b7">
  <h2 id="h-b7"><span className="sec-n">7</span> Implementasi di Cloud VPS tanpa GPU</h2>
  <p>Seluruh sistem berjalan di satu server Linux tanpa kartu grafis, memakai layanan <a href="https://cloudbaik.com">Cloud VPS</a> dari CloudBaik yang didukung ekosistem <a href="https://idwebhost.com/ai-hosting">AI Hosting</a> IDwebhost, sebagaimana disediakan penyelenggara. Ini bukan kebetulan: dua keputusan teknis yang memungkinkannya sama-sama lahir dari pengukuran, bukan perkiraan.</p>

  <figure className="panel">
    <svg className="ill cap-520" viewBox="0 0 420 150" role="img" aria-labelledby="sv-t">
      <title id="sv-t">Ilustrasi server di dalam awan, di sebelahnya kartu grafis GPU yang dicoret karena tidak dipakai.</title>
      <g className="f-tealS">
        <circle cx="92" cy="86" r="44"/><circle cx="152" cy="62" r="54"/><circle cx="222" cy="80" r="46"/>
        <rect x="56" y="80" width="204" height="50" rx="25"/>
      </g>
      <rect className="f-dev" x="112" y="54" width="100" height="72" rx="9"/>
      <rect className="f-onscr o15" x="122" y="64" width="80" height="13" rx="3"/>
      <rect className="f-onscr o15" x="122" y="84" width="80" height="13" rx="3"/>
      <rect className="f-onscr o15" x="122" y="104" width="80" height="13" rx="3"/>
      <rect className="f-onscr o5" x="128" y="69" width="36" height="3" rx="1.5"/>
      <rect className="f-onscr o5" x="128" y="89" width="28" height="3" rx="1.5"/>
      <rect className="f-onscr o5" x="128" y="109" width="40" height="3" rx="1.5"/>
      <circle className="f-teal" cx="192" cy="70.5" r="3"/><circle className="f-teal" cx="192" cy="90.5" r="3"/><circle className="f-amb" cx="192" cy="110.5" r="3"/>
      <rect className="f-paper s-mut w2" x="306" y="46" width="86" height="54" rx="7"/>
      <circle className="f-none s-mut w2" cx="334" cy="73" r="15"/>
      <path className="f-none s-mut w15" d="M334 58 V88 M319 73 H349 M323.4 62.4 L344.6 83.6 M344.6 62.4 L323.4 83.6"/>
      <text className="f-mut t12 b8" x="372" y="78" textAnchor="middle">GPU</text>
      <path className="f-none s-mut w2" d="M318 100 v8 M330 100 v8 M342 100 v8 M354 100 v8 M366 100 v8 M378 100 v8"/>
      <path className="f-none s-red w4 rnd" d="M300 40 L398 114 M398 40 L300 114"/>
    </svg>
    <div className="infra-logos">
      <div className="il"><span className="logo-chip"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDUwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xNjMuNDUgNTIuNUMxNjMuNDUgNDcuNjkzMyAxNjQuNTIzIDQzLjQgMTY2LjY3IDM5LjYyQzE2OC44NjMgMzUuNzkzMyAxNzEuODI3IDMyLjgzIDE3NS41NiAzMC43M0MxNzkuMzQgMjguNTgzMyAxODMuNTYzIDI3LjUxIDE4OC4yMyAyNy41MUMxOTMuNjkgMjcuNTEgMTk4LjQ3MyAyOC45MSAyMDIuNTggMzEuNzFDMjA2LjY4NyAzNC41MSAyMDkuNTU3IDM4LjM4MzMgMjExLjE5IDQzLjMzSDE5OS45MkMxOTguOCA0MC45OTY3IDE5Ny4yMTMgMzkuMjQ2NyAxOTUuMTYgMzguMDhDMTkzLjE1MyAzNi45MTMzIDE5MC44MiAzNi4zMyAxODguMTYgMzYuMzNDMTg1LjMxMyAzNi4zMyAxODIuNzcgMzcuMDA2NyAxODAuNTMgMzguMzZDMTc4LjMzNyAzOS42NjY3IDE3Ni42MSA0MS41MzMzIDE3NS4zNSA0My45NkMxNzQuMTM3IDQ2LjM4NjcgMTczLjUzIDQ5LjIzMzMgMTczLjUzIDUyLjVDMTczLjUzIDU1LjcyIDE3NC4xMzcgNTguNTY2NyAxNzUuMzUgNjEuMDRDMTc2LjYxIDYzLjQ2NjcgMTc4LjMzNyA2NS4zNTY3IDE4MC41MyA2Ni43MUMxODIuNzcgNjguMDE2NyAxODUuMzEzIDY4LjY3IDE4OC4xNiA2OC42N0MxOTAuODIgNjguNjcgMTkzLjE1MyA2OC4wODY3IDE5NS4xNiA2Ni45MkMxOTcuMjEzIDY1LjcwNjcgMTk4LjggNjMuOTMzMyAxOTkuOTIgNjEuNkgyMTEuMTlDMjA5LjU1NyA2Ni41OTMzIDIwNi42ODcgNzAuNDkgMjAyLjU4IDczLjI5QzE5OC41MiA3Ni4wNDMzIDE5My43MzcgNzcuNDIgMTg4LjIzIDc3LjQyQzE4My41NjMgNzcuNDIgMTc5LjM0IDc2LjM3IDE3NS41NiA3NC4yN0MxNzEuODI3IDcyLjEyMzMgMTY4Ljg2MyA2OS4xNiAxNjYuNjcgNjUuMzhDMTY0LjUyMyA2MS42IDE2My40NSA1Ny4zMDY3IDE2My40NSA1Mi41Wk0yMjUuODYgMjUuMlY3N0gyMTYuMDZWMjUuMkgyMjUuODZaTTI0OS4yNjMgNzcuNjNDMjQ1LjUzIDc3LjYzIDI0Mi4xNyA3Ni44MTMzIDIzOS4xODMgNzUuMThDMjM2LjE5NiA3My41IDIzMy44NCA3MS4xNDMzIDIzMi4xMTMgNjguMTFDMjMwLjQzMyA2NS4wNzY3IDIyOS41OTMgNjEuNTc2NyAyMjkuNTkzIDU3LjYxQzIyOS41OTMgNTMuNjQzMyAyMzAuNDU2IDUwLjE0MzMgMjMyLjE4MyA0Ny4xMUMyMzMuOTU2IDQ0LjA3NjcgMjM2LjM2IDQxLjc0MzMgMjM5LjM5MyA0MC4xMUMyNDIuNDI2IDM4LjQzIDI0NS44MSAzNy41OSAyNDkuNTQzIDM3LjU5QzI1My4yNzYgMzcuNTkgMjU2LjY2IDM4LjQzIDI1OS42OTMgNDAuMTFDMjYyLjcyNiA0MS43NDMzIDI2NS4xMDYgNDQuMDc2NyAyNjYuODMzIDQ3LjExQzI2OC42MDYgNTAuMTQzMyAyNjkuNDkzIDUzLjY0MzMgMjY5LjQ5MyA1Ny42MUMyNjkuNDkzIDYxLjU3NjcgMjY4LjU4MyA2NS4wNzY3IDI2Ni43NjMgNjguMTFDMjY0Ljk5IDcxLjE0MzMgMjYyLjU2MyA3My41IDI1OS40ODMgNzUuMThDMjU2LjQ1IDc2LjgxMzMgMjUzLjA0MyA3Ny42MyAyNDkuMjYzIDc3LjYzWk0yNDkuMjYzIDY5LjA5QzI1MS4wMzYgNjkuMDkgMjUyLjY5MyA2OC42NyAyNTQuMjMzIDY3LjgzQzI1NS44MiA2Ni45NDMzIDI1Ny4wOCA2NS42MzY3IDI1OC4wMTMgNjMuOTFDMjU4Ljk0NiA2Mi4xODMzIDI1OS40MTMgNjAuMDgzMyAyNTkuNDEzIDU3LjYxQzI1OS40MTMgNTMuOTIzMyAyNTguNDMzIDUxLjEgMjU2LjQ3MyA0OS4xNEMyNTQuNTYgNDcuMTMzMyAyNTIuMjAzIDQ2LjEzIDI0OS40MDMgNDYuMTNDMjQ2LjYwMyA0Ni4xMyAyNDQuMjQ2IDQ3LjEzMzMgMjQyLjMzMyA0OS4xNEMyNDAuNDY2IDUxLjEgMjM5LjUzMyA1My45MjMzIDIzOS41MzMgNTcuNjFDMjM5LjUzMyA2MS4yOTY3IDI0MC40NDMgNjQuMTQzMyAyNDIuMjYzIDY2LjE1QzI0NC4xMyA2OC4xMSAyNDYuNDYzIDY5LjA5IDI0OS4yNjMgNjkuMDlaTTMwOS43OTIgMzguMjJWNzdIMjk5LjkyMlY3Mi4xQzI5OC42NjIgNzMuNzggMjk3LjAwNSA3NS4xMSAyOTQuOTUyIDc2LjA5QzI5Mi45NDUgNzcuMDIzMyAyOTAuNzUyIDc3LjQ5IDI4OC4zNzIgNzcuNDlDMjg1LjMzOCA3Ny40OSAyODIuNjU1IDc2Ljg2IDI4MC4zMjIgNzUuNkMyNzcuOTg4IDc0LjI5MzMgMjc2LjE0NSA3Mi40MDMzIDI3NC43OTIgNjkuOTNDMjczLjQ4NSA2Ny40MSAyNzIuODMyIDY0LjQyMzMgMjcyLjgzMiA2MC45N1YzOC4yMkgyODIuNjMyVjU5LjU3QzI4Mi42MzIgNjIuNjUgMjgzLjQwMiA2NS4wMyAyODQuOTQyIDY2LjcxQzI4Ni40ODIgNjguMzQzMyAyODguNTgyIDY5LjE2IDI5MS4yNDIgNjkuMTZDMjkzLjk0OCA2OS4xNiAyOTYuMDcyIDY4LjM0MzMgMjk3LjYxMiA2Ni43MUMyOTkuMTUyIDY1LjAzIDI5OS45MjIgNjIuNjUgMjk5LjkyMiA1OS41N1YzOC4yMkgzMDkuNzkyWk0zMTMuNDQxIDU3LjQ3QzMxMy40NDEgNTMuNTUgMzE0LjIxMSA1MC4wNzMzIDMxNS43NTEgNDcuMDRDMzE3LjMzOCA0NC4wMDY3IDMxOS40ODQgNDEuNjczMyAzMjIuMTkxIDQwLjA0QzMyNC44OTggMzguNDA2NyAzMjcuOTA4IDM3LjU5IDMzMS4yMjEgMzcuNTlDMzMzLjc0MSAzNy41OSAzMzYuMTQ0IDM4LjE1IDMzOC40MzEgMzkuMjdDMzQwLjcxOCA0MC4zNDMzIDM0Mi41MzggNDEuNzkgMzQzLjg5MSA0My42MVYyNS4ySDM1My44MzFWNzdIMzQzLjg5MVY3MS4yNkMzNDIuNjc4IDczLjE3MzMgMzQwLjk3NCA3NC43MTMzIDMzOC43ODEgNzUuODhDMzM2LjU4OCA3Ny4wNDY3IDMzNC4wNDQgNzcuNjMgMzMxLjE1MSA3Ny42M0MzMjcuODg0IDc3LjYzIDMyNC44OTggNzYuNzkgMzIyLjE5MSA3NS4xMUMzMTkuNDg0IDczLjQzIDMxNy4zMzggNzEuMDczMyAzMTUuNzUxIDY4LjA0QzMxNC4yMTEgNjQuOTYgMzEzLjQ0MSA2MS40MzY3IDMxMy40NDEgNTcuNDdaTTM0My45NjEgNTcuNjFDMzQzLjk2MSA1NS4yMyAzNDMuNDk0IDUzLjIgMzQyLjU2MSA1MS41MkMzNDEuNjI4IDQ5Ljc5MzMgMzQwLjM2OCA0OC40ODY3IDMzOC43ODEgNDcuNkMzMzcuMTk0IDQ2LjY2NjcgMzM1LjQ5MSA0Ni4yIDMzMy42NzEgNDYuMkMzMzEuODUxIDQ2LjIgMzMwLjE3MSA0Ni42NDMzIDMyOC42MzEgNDcuNTNDMzI3LjA5MSA0OC40MTY3IDMyNS44MzEgNDkuNzIzMyAzMjQuODUxIDUxLjQ1QzMyMy45MTggNTMuMTMgMzIzLjQ1MSA1NS4xMzY3IDMyMy40NTEgNTcuNDdDMzIzLjQ1MSA1OS44MDMzIDMyMy45MTggNjEuODU2NyAzMjQuODUxIDYzLjYzQzMyNS44MzEgNjUuMzU2NyAzMjcuMDkxIDY2LjY4NjcgMzI4LjYzMSA2Ny42MkMzMzAuMjE4IDY4LjU1MzMgMzMxLjg5OCA2OS4wMiAzMzMuNjcxIDY5LjAyQzMzNS40OTEgNjkuMDIgMzM3LjE5NCA2OC41NzY3IDMzOC43ODEgNjcuNjlDMzQwLjM2OCA2Ni43NTY3IDM0MS42MjggNjUuNDUgMzQyLjU2MSA2My43N0MzNDMuNDk0IDYyLjA0MzMgMzQzLjk2MSA1OS45OSAzNDMuOTYxIDU3LjYxWk0zNjkuNzAyIDQzLjg5QzM3MC45NjIgNDIuMDIzMyAzNzIuNjg5IDQwLjUwNjcgMzc0Ljg4MiAzOS4zNEMzNzcuMTIyIDM4LjE3MzMgMzc5LjY2NiAzNy41OSAzODIuNTEyIDM3LjU5QzM4NS44MjYgMzcuNTkgMzg4LjgxMiAzOC40MDY3IDM5MS40NzIgNDAuMDRDMzk0LjE3OSA0MS42NzMzIDM5Ni4zMDIgNDQuMDA2NyAzOTcuODQyIDQ3LjA0QzM5OS40MjkgNTAuMDI2NyA0MDAuMjIyIDUzLjUwMzMgNDAwLjIyMiA1Ny40N0M0MDAuMjIyIDYxLjQzNjcgMzk5LjQyOSA2NC45NiAzOTcuODQyIDY4LjA0QzM5Ni4zMDIgNzEuMDczMyAzOTQuMTc5IDczLjQzIDM5MS40NzIgNzUuMTFDMzg4LjgxMiA3Ni43OSAzODUuODI2IDc3LjYzIDM4Mi41MTIgNzcuNjNDMzc5LjYxOSA3Ny42MyAzNzcuMDc2IDc3LjA3IDM3NC44ODIgNzUuOTVDMzcyLjczNiA3NC43ODMzIDM3MS4wMDkgNzMuMjkgMzY5LjcwMiA3MS40N1Y3N0gzNTkuOTAyVjI1LjJIMzY5LjcwMlY0My44OVpNMzkwLjIxMiA1Ny40N0MzOTAuMjEyIDU1LjEzNjcgMzg5LjcyMiA1My4xMyAzODguNzQyIDUxLjQ1QzM4Ny44MDkgNDkuNzIzMyAzODYuNTQ5IDQ4LjQxNjcgMzg0Ljk2MiA0Ny41M0MzODMuNDIyIDQ2LjY0MzMgMzgxLjc0MiA0Ni4yIDM3OS45MjIgNDYuMkMzNzguMTQ5IDQ2LjIgMzc2LjQ2OSA0Ni42NjY3IDM3NC44ODIgNDcuNkMzNzMuMzQyIDQ4LjQ4NjcgMzcyLjA4MiA0OS43OTMzIDM3MS4xMDIgNTEuNTJDMzcwLjE2OSA1My4yNDY3IDM2OS43MDIgNTUuMjc2NyAzNjkuNzAyIDU3LjYxQzM2OS43MDIgNTkuOTQzMyAzNzAuMTY5IDYxLjk3MzMgMzcxLjEwMiA2My43QzM3Mi4wODIgNjUuNDI2NyAzNzMuMzQyIDY2Ljc1NjcgMzc0Ljg4MiA2Ny42OUMzNzYuNDY5IDY4LjU3NjcgMzc4LjE0OSA2OS4wMiAzNzkuOTIyIDY5LjAyQzM4MS43NDIgNjkuMDIgMzgzLjQyMiA2OC41NTMzIDM4NC45NjIgNjcuNjJDMzg2LjU0OSA2Ni42ODY3IDM4Ny44MDkgNjUuMzU2NyAzODguNzQyIDYzLjYzQzM4OS43MjIgNjEuOTAzMyAzOTAuMjEyIDU5Ljg1IDM5MC4yMTIgNTcuNDdaTTQwMS4zMjQgNTcuNDdDNDAxLjMyNCA1My41NSA0MDIuMDk0IDUwLjA3MzMgNDAzLjYzNCA0Ny4wNEM0MDUuMjIgNDQuMDA2NyA0MDcuMzQ0IDQxLjY3MzMgNDEwLjAwNCA0MC4wNEM0MTIuNzEgMzguNDA2NyA0MTUuNzIgMzcuNTkgNDE5LjAzNCAzNy41OUM0MjEuOTI3IDM3LjU5IDQyNC40NDcgMzguMTczMyA0MjYuNTk0IDM5LjM0QzQyOC43ODcgNDAuNTA2NyA0MzAuNTM3IDQxLjk3NjcgNDMxLjg0NCA0My43NVYzOC4yMkg0NDEuNzE0Vjc3SDQzMS44NDRWNzEuMzNDNDMwLjU4NCA3My4xNSA0MjguODM0IDc0LjY2NjcgNDI2LjU5NCA3NS44OEM0MjQuNCA3Ny4wNDY3IDQyMS44NTcgNzcuNjMgNDE4Ljk2NCA3Ny42M0M0MTUuNjk3IDc3LjYzIDQxMi43MSA3Ni43OSA0MTAuMDA0IDc1LjExQzQwNy4zNDQgNzMuNDMgNDA1LjIyIDcxLjA3MzMgNDAzLjYzNCA2OC4wNEM0MDIuMDk0IDY0Ljk2IDQwMS4zMjQgNjEuNDM2NyA0MDEuMzI0IDU3LjQ3Wk00MzEuODQ0IDU3LjYxQzQzMS44NDQgNTUuMjMgNDMxLjM3NyA1My4yIDQzMC40NDQgNTEuNTJDNDI5LjUxIDQ5Ljc5MzMgNDI4LjI1IDQ4LjQ4NjcgNDI2LjY2NCA0Ny42QzQyNS4wNzcgNDYuNjY2NyA0MjMuMzc0IDQ2LjIgNDIxLjU1NCA0Ni4yQzQxOS43MzQgNDYuMiA0MTguMDU0IDQ2LjY0MzMgNDE2LjUxNCA0Ny41M0M0MTQuOTc0IDQ4LjQxNjcgNDEzLjcxNCA0OS43MjMzIDQxMi43MzQgNTEuNDVDNDExLjggNTMuMTMgNDExLjMzNCA1NS4xMzY3IDQxMS4zMzQgNTcuNDdDNDExLjMzNCA1OS44MDMzIDQxMS44IDYxLjg1NjcgNDEyLjczNCA2My42M0M0MTMuNzE0IDY1LjM1NjcgNDE0Ljk3NCA2Ni42ODY3IDQxNi41MTQgNjcuNjJDNDE4LjEgNjguNTUzMyA0MTkuNzggNjkuMDIgNDIxLjU1NCA2OS4wMkM0MjMuMzc0IDY5LjAyIDQyNS4wNzcgNjguNTc2NyA0MjYuNjY0IDY3LjY5QzQyOC4yNSA2Ni43NTY3IDQyOS41MSA2NS40NSA0MzAuNDQ0IDYzLjc3QzQzMS4zNzcgNjIuMDQzMyA0MzEuODQ0IDU5Ljk5IDQzMS44NDQgNTcuNjFaTTQ1Mi43NTUgMzMuNkM0NTEuMDI4IDMzLjYgNDQ5LjU4MiAzMy4wNjMzIDQ0OC40MTUgMzEuOTlDNDQ3LjI5NSAzMC44NyA0NDYuNzM1IDI5LjQ5MzMgNDQ2LjczNSAyNy44NkM0NDYuNzM1IDI2LjIyNjcgNDQ3LjI5NSAyNC44NzMzIDQ0OC40MTUgMjMuOEM0NDkuNTgyIDIyLjY4IDQ1MS4wMjggMjIuMTIgNDUyLjc1NSAyMi4xMkM0NTQuNDgyIDIyLjEyIDQ1NS45MDUgMjIuNjggNDU3LjAyNSAyMy44QzQ1OC4xOTIgMjQuODczMyA0NTguNzc1IDI2LjIyNjcgNDU4Ljc3NSAyNy44NkM0NTguNzc1IDI5LjQ5MzMgNDU4LjE5MiAzMC44NyA0NTcuMDI1IDMxLjk5QzQ1NS45MDUgMzMuMDYzMyA0NTQuNDgyIDMzLjYgNDUyLjc1NSAzMy42Wk00NTcuNTg1IDM4LjIyVjc3SDQ0Ny43ODVWMzguMjJINDU3LjU4NVpNNDg2LjcyOCA3N0w0NzMuNTY4IDYwLjQ4Vjc3SDQ2My43NjhWMjUuMkg0NzMuNTY4VjU0LjY3TDQ4Ni41ODggMzguMjJINDk5LjMyOEw0ODIuMjQ4IDU3LjY4TDQ5OS40NjggNzdINDg2LjcyOFoiIGZpbGw9IiMxRjFDM0IiLz4KPHJlY3QgeT0iMjciIHdpZHRoPSI5MSIgaGVpZ2h0PSI2OSIgcng9IjM0LjUiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl80Ml85KSIvPgo8cGF0aCBkPSJNNTQgMjhDNTQgMTQuMTkyOSA2NS4xOTI5IDMgNzkgM0gxMjNDMTM3LjkxMiAzIDE1MCAxNS4wODgzIDE1MCAzMEMxNTAgNDQuOTExNyAxMzcuOTEyIDU3IDEyMyA1N0g1NFYyOFoiIGZpbGw9InVybCgjcGFpbnQxX2xpbmVhcl80Ml85KSIvPgo8cGF0aCBkPSJNNTQgNDJIMTIzQzEzNy45MTIgNDIgMTUwIDU0LjA4ODMgMTUwIDY5QzE1MCA4My45MTE3IDEzNy45MTIgOTYgMTIzIDk2SDU0VjQyWiIgZmlsbD0idXJsKCNwYWludDJfbGluZWFyXzQyXzkpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNDJfOSIgeDE9IjQ1LjUiIHkxPSI0Mi41IiB4Mj0iNDUuNSIgeTI9Ijk2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMwMkRERkUiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDBCM0VCIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl80Ml85IiB4MT0iODYiIHkxPSI2LjUiIHgyPSIxMDIiIHkyPSI1NyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjM0Y1NkZCIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFBOUFGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50Ml9saW5lYXJfNDJfOSIgeDE9Ijg2IiB5MT0iNDUuNSIgeDI9IjEwMiIgeTI9Ijk2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMzRjU2RkIiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMUE5QUZGIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==" alt="CloudBaik" width="500" height="100" /></span>Cloud VPS</div>
      <div className="il"><span className="logo-chip"><img src="data:image/png;base64,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" alt="IDwebhost" width="536" height="100" /></span>AI Hosting</div>
    </div>
    <figcaption>Satu server Linux tanpa kartu grafis; seluruh proses berjalan di CPU.</figcaption>
  </figure>

  <h3>Render 9× lebih cepat</h3>
  <p>Versi awal memakai moviepy, yang memproses video bingkai demi bingkai di Python. Untuk dua klip pendek, render memakan 332,8 detik. Alih-alih menebak penyebabnya, kami mengukur setiap langkah secara terpisah, lalu memindahkan semuanya ke ffmpeg native. Hasilnya 35,6 detik.</p>

  <figure className="race" aria-labelledby="race-cap">
    <div className="race-row">
      <div className="race-lbl">Sebelum: moviepy (Python)</div>
      <div className="race-track"><span className="race-bar was" style={{'--p': '1'}}></span><span className="race-val">332,8 dtk</span></div>
    </div>
    <div className="race-row">
      <div className="race-lbl">Sesudah: ffmpeg native</div>
      <div className="race-track"><span className="race-bar now" style={{'--p': '.107'}}></span><span className="race-val now">35,6 dtk</span></div>
    </div>
    <div className="race-split">
      <h4>Rincian per langkah</h4>
      <div className="rs">
        <div className="race-lbl">Ubah ukuran dan potong ke 1080×1920 (satu klip)</div>
        <div className="race-track"><span className="race-bar was" style={{'--p': '.324'}}></span><span className="race-val">32,1 dtk</span></div>
        <div className="race-track"><span className="race-bar now" style={{'--p': '.036'}}></span><span className="race-val now">3,6 dtk</span></div>
      </div>
      <div className="rs">
        <div className="race-lbl">Gabung dua klip</div>
        <div className="race-track"><span className="race-bar was" style={{'--p': '1'}}></span><span className="race-val">99,1 dtk</span></div>
        <div className="race-track"><span className="race-bar now" style={{'--p': '.088'}}></span><span className="race-val now">8,7 dtk</span></div>
      </div>
      <div className="rs">
        <div className="race-lbl">Tambah teks di atas video</div>
        <div className="race-track"><span className="race-bar was" style={{'--p': '.454'}}></span><span className="race-val">+45 dtk</span></div>
        <div className="race-track"><span className="race-bar now" style={{'--p': '.06'}}></span><span className="race-val now">+5,9 dtk</span></div>
      </div>
      <div className="legend"><span><i className="was"></i>moviepy (Python)</span><span><i className="now"></i>ffmpeg native</span></div>
    </div>
    <figcaption id="race-cap">Diukur pada kasus uji yang sama. Total waktu turun dari 332,8 menjadi 35,6 detik, sekitar 9× lebih cepat.</figcaption>
  </figure>

  <div className="stats wide">
    <div className="stat"><span className="v">9×</span><span className="k">lebih cepat saat render video</span></div>
    <div className="stat"><span className="v">0,92</span><span className="k">kecocokan Whisper lokal dengan <span className="nw">whisper-1</span></span></div>
    <div className="stat"><span className="v">0,76</span><span className="k"><em>real-time factor</em> di 4 core: lebih cepat dari durasi audionya</span></div>
    <div className="stat"><span className="v">0</span><span className="k">GPU yang dibutuhkan; semua proses berjalan di CPU</span></div>
  </div>

  <h3>Transkripsi pindah ke server sendiri</h3>
  <p>Setelah insiden kuota habis, transkripsi dipindah ke Whisper lokal (faster-whisper, model <em>small</em>). Diuji pada enam klip nyata, hasilnya punya kecocokan <strong>0,92</strong> dengan <code>whisper-1</code> dan <em>real-time factor</em> <strong>0,76</strong> di empat core CPU, artinya transkripsi selesai lebih cepat daripada durasi audionya. Bonus yang tidak kami duga: penanda waktu kata pertama jadi lebih akurat, sehingga kata pertama tidak lagi ikut terbuang, seperti yang sebelumnya terjadi di hampir setiap klip.</p>

  <h3>Biaya yang tercatat, bukan ditebak</h3>
  <p>Setiap pemakaian AI, narasi suara, dan transkripsi dicatat beserta biayanya, dihitung dari token nyata dikali tarif resmi, bukan perkiraan. Sejak transkripsi berjalan di server sendiri, bagian itu juga tidak lagi bergantung pada kuota layanan berbayar.</p>
</section>

<section id="b8" className="sec" aria-labelledby="h-b8">
  <h2 id="h-b8"><span className="sec-n">8</span> Hasil pengujian</h2>
  <p>Pengujian dilakukan dalam dua lapis. Lapis pertama, <strong>52 file uji otomatis</strong>, menjaga agar perbaikan yang sudah dicapai tidak mundur lagi. Uji ini berjalan terisolasi penuh, tanpa internet dan tanpa menyentuh data asli. Aturan itu pun lahir dari kesalahan: sebuah tes pernah tanpa sengaja menimpa data asli sekaligus mengirim permintaan sungguhan ke layanan luar setiap kali dijalankan.</p>
  <p>Lapis kedua adalah uji menyeluruh pada bahan milik pengguna. Semua angka di bawah diambil dari catatan proses, bukan perkiraan.</p>

  <ul className="checks">
    <li><span className="ck"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span><span><b>Menyusun draf dari enam klip: 122 detik.</b> Pemahaman tiap klip akurat, papan cerita A/B terkirim.</span></li>
    <li><span className="ck"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span><span><b>Render varian A: 188 detik.</b> Lengkap dengan dua klip sisipan dari Pexels, empat grafis, dan musik latar.</span></li>
    <li><span className="ck"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span><span><b>Pemeriksa mutu suara: lolos.</b> Volume dinaikkan dari −24,2 ke −17,1 LUFS sebelum video diserahkan.</span></li>
    <li><span className="ck"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span><span><b>Waktu tampil grafis: tepat.</b> Label “DONOR DARAH” tidak muncul di detik 4,2, tetapi baru tampil setelah kata “donor” diucapkan.</span></li>
    <li><span className="ck"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span><span><b>Naskah tulisan pengguna: dibacakan persis apa adanya.</b> Hasilnya diverifikasi ulang dengan Whisper.</span></li>
    <li><span className="ck"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span><span><b>Dipecah jadi konten pendek: dua konten dari enam video.</b> Berdurasi 32 dan 18 detik, masing-masing dengan sisipan dan grafis. Lolos cek mutu.</span></li>
    <li><span className="ck"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span><span><b>Potongan berulang: dari 24 pasang menjadi nol.</b> Renderer lama menghasilkan 24 pasang bingkai kembar; renderer baru tidak ada sama sekali.</span></li>
  </ul>

  <figure className="panel">
    <svg className="ill cap-520" viewBox="0 0 340 186" role="img" aria-labelledby="tm-t">
      <title id="tm-t">Garis waktu ucapan: label DONOR DARAH tidak dipasang di detik 4,2 yang ditebak, tetapi tepat setelah kata donor diucapkan.</title>
      <rect className="f-paper2 s-rule w1" x="14" y="60" width="30" height="20" rx="10"/>
      <rect className="f-paper2 s-rule w1" x="50" y="60" width="36" height="20" rx="10"/>
      <rect className="f-paper2 s-rule w1" x="92" y="60" width="36" height="20" rx="10"/>
      <rect className="f-paper2 s-rule w1" x="134" y="60" width="36" height="20" rx="10"/>
      <rect className="f-teal" x="176" y="60" width="50" height="20" rx="10"/><text className="f-onacc t12 b7" x="201.0" y="74.5" textAnchor="middle">donor</text>
      <rect className="f-paper2 s-rule w1" x="232" y="60" width="36" height="20" rx="10"/>
      <rect className="f-paper2 s-rule w1" x="274" y="60" width="52" height="20" rx="10"/>
      <rect className="f-mut o5" x="14.8" y="107.8" width="2.4" height="12.3" rx="1.2"/>
      <rect className="f-mut o5" x="18.8" y="101.0" width="2.4" height="26.0" rx="1.2"/>
      <rect className="f-mut o5" x="22.8" y="102.4" width="2.4" height="23.2" rx="1.2"/>
      <rect className="f-mut o5" x="26.8" y="97.7" width="2.4" height="32.5" rx="1.2"/>
      <rect className="f-mut o5" x="30.8" y="100.7" width="2.4" height="26.5" rx="1.2"/>
      <rect className="f-mut o5" x="34.8" y="103.2" width="2.4" height="21.5" rx="1.2"/>
      <rect className="f-mut o5" x="38.8" y="106.9" width="2.4" height="14.2" rx="1.2"/>
      <rect className="f-mut o5" x="42.8" y="112.6" width="2.4" height="2.8" rx="1.2"/>
      <rect className="f-mut o5" x="46.8" y="112.6" width="2.4" height="2.8" rx="1.2"/>
      <rect className="f-mut o5" x="50.8" y="104.1" width="2.4" height="19.8" rx="1.2"/>
      <rect className="f-mut o5" x="54.8" y="95.6" width="2.4" height="36.7" rx="1.2"/>
      <rect className="f-mut o5" x="58.8" y="106.4" width="2.4" height="15.1" rx="1.2"/>
      <rect className="f-mut o5" x="62.8" y="100.9" width="2.4" height="26.2" rx="1.2"/>
      <rect className="f-mut o5" x="66.8" y="108.9" width="2.4" height="10.1" rx="1.2"/>
      <rect className="f-mut o5" x="70.8" y="105.1" width="2.4" height="17.8" rx="1.2"/>
      <rect className="f-mut o5" x="74.8" y="107.6" width="2.4" height="12.9" rx="1.2"/>
      <rect className="f-mut o5" x="78.8" y="96.4" width="2.4" height="35.2" rx="1.2"/>
      <rect className="f-mut o5" x="82.8" y="104.4" width="2.4" height="19.2" rx="1.2"/>
      <rect className="f-mut o5" x="86.8" y="112.6" width="2.4" height="2.8" rx="1.2"/>
      <rect className="f-mut o5" x="90.8" y="112.6" width="2.4" height="2.8" rx="1.2"/>
      <rect className="f-mut o5" x="94.8" y="107.3" width="2.4" height="13.4" rx="1.2"/>
      <rect className="f-mut o5" x="98.8" y="106.3" width="2.4" height="15.4" rx="1.2"/>
      <rect className="f-mut o5" x="102.8" y="102.2" width="2.4" height="23.5" rx="1.2"/>
      <rect className="f-mut o5" x="106.8" y="98.9" width="2.4" height="30.2" rx="1.2"/>
      <rect className="f-mut o5" x="110.8" y="101.1" width="2.4" height="25.7" rx="1.2"/>
      <rect className="f-mut o5" x="114.8" y="98.5" width="2.4" height="31.0" rx="1.2"/>
      <rect className="f-mut o5" x="118.8" y="105.9" width="2.4" height="16.2" rx="1.2"/>
      <rect className="f-mut o5" x="122.8" y="107.3" width="2.4" height="13.3" rx="1.2"/>
      <rect className="f-mut o5" x="126.8" y="112.6" width="2.4" height="2.8" rx="1.2"/>
      <rect className="f-mut o5" x="130.8" y="112.6" width="2.4" height="2.8" rx="1.2"/>
      <rect className="f-mut o5" x="134.8" y="108.3" width="2.4" height="11.4" rx="1.2"/>
      <rect className="f-mut o5" x="138.8" y="95.1" width="2.4" height="37.8" rx="1.2"/>
      <rect className="f-mut o5" x="142.8" y="107.5" width="2.4" height="13.0" rx="1.2"/>
      <rect className="f-mut o5" x="146.8" y="101.8" width="2.4" height="24.4" rx="1.2"/>
      <rect className="f-mut o5" x="150.8" y="108.6" width="2.4" height="10.9" rx="1.2"/>
      <rect className="f-mut o5" x="154.8" y="104.6" width="2.4" height="18.8" rx="1.2"/>
      <rect className="f-mut o5" x="158.8" y="104.3" width="2.4" height="19.5" rx="1.2"/>
      <rect className="f-mut o5" x="162.8" y="97.9" width="2.4" height="32.2" rx="1.2"/>
      <rect className="f-mut o5" x="166.8" y="100.4" width="2.4" height="27.3" rx="1.2"/>
      <rect className="f-mut o5" x="170.8" y="112.6" width="2.4" height="2.8" rx="1.2"/>
      <rect className="f-mut o5" x="174.8" y="112.6" width="2.4" height="2.8" rx="1.2"/>
      <rect className="f-teal" x="178.8" y="108.3" width="2.4" height="11.3" rx="1.2"/>
      <rect className="f-teal" x="182.8" y="104.6" width="2.4" height="18.7" rx="1.2"/>
      <rect className="f-teal" x="186.8" y="104.6" width="2.4" height="18.8" rx="1.2"/>
      <rect className="f-teal" x="190.8" y="96.4" width="2.4" height="35.1" rx="1.2"/>
      <rect className="f-teal" x="194.8" y="105.4" width="2.4" height="17.2" rx="1.2"/>
      <rect className="f-teal" x="198.8" y="97.7" width="2.4" height="32.6" rx="1.2"/>
      <rect className="f-teal" x="202.8" y="108.4" width="2.4" height="11.1" rx="1.2"/>
      <rect className="f-teal" x="206.8" y="108.2" width="2.4" height="11.6" rx="1.2"/>
      <rect className="f-teal" x="210.8" y="108.5" width="2.4" height="11.1" rx="1.2"/>
      <rect className="f-teal" x="214.8" y="98.7" width="2.4" height="30.6" rx="1.2"/>
      <rect className="f-teal" x="218.8" y="105.3" width="2.4" height="17.5" rx="1.2"/>
      <rect className="f-teal" x="222.8" y="96.2" width="2.4" height="35.7" rx="1.2"/>
      <rect className="f-mut o5" x="226.8" y="112.6" width="2.4" height="2.8" rx="1.2"/>
      <rect className="f-mut o5" x="230.8" y="112.6" width="2.4" height="2.8" rx="1.2"/>
      <rect className="f-mut o5" x="234.8" y="108.7" width="2.4" height="10.6" rx="1.2"/>
      <rect className="f-mut o5" x="238.8" y="104.8" width="2.4" height="18.4" rx="1.2"/>
      <rect className="f-mut o5" x="242.8" y="101.1" width="2.4" height="25.7" rx="1.2"/>
      <rect className="f-mut o5" x="246.8" y="100.8" width="2.4" height="26.5" rx="1.2"/>
      <rect className="f-mut o5" x="250.8" y="97.4" width="2.4" height="33.2" rx="1.2"/>
      <rect className="f-mut o5" x="254.8" y="103.9" width="2.4" height="20.1" rx="1.2"/>
      <rect className="f-mut o5" x="258.8" y="103.2" width="2.4" height="21.7" rx="1.2"/>
      <rect className="f-mut o5" x="262.8" y="108.9" width="2.4" height="10.1" rx="1.2"/>
      <rect className="f-mut o5" x="266.8" y="112.6" width="2.4" height="2.8" rx="1.2"/>
      <rect className="f-mut o5" x="270.8" y="112.6" width="2.4" height="2.8" rx="1.2"/>
      <rect className="f-mut o5" x="274.8" y="95.4" width="2.4" height="37.3" rx="1.2"/>
      <rect className="f-mut o5" x="278.8" y="108.0" width="2.4" height="12.0" rx="1.2"/>
      <rect className="f-mut o5" x="282.8" y="98.2" width="2.4" height="31.6" rx="1.2"/>
      <rect className="f-mut o5" x="286.8" y="107.5" width="2.4" height="13.0" rx="1.2"/>
      <rect className="f-mut o5" x="290.8" y="108.9" width="2.4" height="10.2" rx="1.2"/>
      <rect className="f-mut o5" x="294.8" y="106.4" width="2.4" height="15.3" rx="1.2"/>
      <rect className="f-mut o5" x="298.8" y="99.4" width="2.4" height="29.2" rx="1.2"/>
      <rect className="f-mut o5" x="302.8" y="101.1" width="2.4" height="25.9" rx="1.2"/>
      <rect className="f-mut o5" x="306.8" y="98.7" width="2.4" height="30.6" rx="1.2"/>
      <rect className="f-mut o5" x="310.8" y="101.3" width="2.4" height="25.4" rx="1.2"/>
      <rect className="f-mut o5" x="314.8" y="105.4" width="2.4" height="17.2" rx="1.2"/>
      <rect className="f-mut o5" x="318.8" y="108.6" width="2.4" height="10.7" rx="1.2"/>
      <rect className="f-mut o5" x="322.8" y="105.9" width="2.4" height="16.2" rx="1.2"/>
      <path className="f-none s-red w15 dsh" d="M110 42 V150"/>
      <path className="f-none s-teal w15 dsh" d="M227 42 V60"/>
      <rect className="f-paper s-red w15 dsh" x="56" y="12" width="108" height="28" rx="14"/>
      <text className="f-red t12 b8 o7" x="110" y="30.5" textAnchor="middle">DONOR DARAH</text>
      <circle className="f-paper s-red w15" cx="164" cy="12" r="8.5"/>
      <path className="f-none s-red w15 rnd" d="M160.7 8.7 l6.6 6.6 M167.3 8.7 l-6.6 6.6"/>
      <rect className="f-teal" x="226" y="12" width="104" height="28" rx="14"/>
      <text className="f-onacc t12 b8" x="278" y="30.5" textAnchor="middle">DONOR DARAH</text>
      <circle className="f-paper s-teal w15" cx="330" cy="12" r="8.5"/>
      <path className="f-none s-teal w2 rnd" d="M325.8 12 l3 3 l5.6 -6.5"/>
      <path className="f-none s-mut w15" d="M14 150 H326"/>
      <text className="f-mut t12" x="14" y="172">0</text>
      <text className="f-red t12 b7" x="110" y="172" textAnchor="middle">4,2 detik</text>
      <text className="f-teal t12 b7" x="201" y="172" textAnchor="middle">kata “donor”</text>
      <text className="f-mut t12" x="326" y="172" textAnchor="end">waktu</text>
    </svg>
    <figcaption>Grafis tidak dipasang di detik yang ditebak (garis merah), melainkan tepat setelah kata “donor” benar-benar diucapkan. Kotak abu-abu adalah kata-kata lain dalam ucapan.</figcaption>
  </figure>

  <p>Sebagian temuan di atas awalnya adalah kegagalan. Misalnya, peringatan bahwa subtitel masuk ke area tombol muncul karena memang begitu kenyataannya, dan batas 74% lebar layar adalah jawabannya. Pola ini berulang sepanjang proyek: pemeriksa mutu justru paling berguna saat ia menolak hasil kami sendiri.</p>

  <div className="rulecard">
    <blockquote>
      <p>Hasil kosong bukanlah bukti. Sebelum menyimpulkan apa pun dari hasil kosong, buktikan dulu bahwa alat ukurnya sanggup mendeteksi kasus yang positif.</p>
    </blockquote>
    <p className="src">Aturan 1 dalam pedoman proyek</p>
  </div>
  <p>Aturan ini lahir saat pengecekan log menghasilkan layar kosong dan kami menyimpulkan “tidak ada error”. Ternyata perintah itu memang tidak punya izin untuk membaca log, sehingga ia tidak akan pernah menampilkan error apa pun. Sejak itu, alat pengecek kunci render diuji dengan benar-benar memegang kuncinya terlebih dahulu, lalu dicek lagi setelah kunci dilepas.</p>
</section>

<section id="b9" className="sec" aria-labelledby="h-b9">
  <h2 id="h-b9"><span className="sec-n">9</span> Dampak yang diharapkan</h2>
  <p>Masalah PT Laksamana Muda Bersatu bukan masalah mereka saja. Usaha mikro, kreator perorangan, dan pengelola media sosial organisasi menghadapi hal serupa: punya bahan rekaman, tetapi tidak punya waktu atau keterampilan menyunting. Jalan pintas yang tersedia saat ini umumnya membuat video sintetis sepenuhnya, yang justru menghapus satu-satunya aset yang mereka punya, yaitu keaslian.</p>
  <p>Content Factory mengambil arah sebaliknya. Wajah, suara, dan tempat yang nyata dipertahankan, lalu bagian yang memakan waktu dikerjakan sistem: memotong jeda, menyusun subtitel, menyeimbangkan suara, dan menaruh grafis penjelas.</p>

  <figure>
    <svg className="ill cap-600" viewBox="0 0 420 210" role="img" aria-labelledby="ba-t">
      <title id="ba-t">Sebelum: satu orang dikelilingi lima tugas penyuntingan. Sesudah: orang yang sama hanya mengirim bahan dan memilih naskah, sisanya dikerjakan server.</title>
      <rect className="f-paper" x="0" y="0" width="204" height="210" rx="16"/>
      <rect className="f-none s-rule w1" x="0.5" y="0.5" width="203" height="209" rx="16"/>
      <path className="f-none s-red w15 dsh o6" d="M102 132 L40 62 M102 132 L102 36 M102 132 L164 62 M102 132 L38 152 M102 132 L166 152"/>
      <rect className="f-amb" x="96" y="118" width="12" height="12"/>
      <path className="f-teal" d="M80 184 C80 146 90 128 102 128 C114 128 124 146 124 184 Z"/>
      <circle className="f-amb" cx="102" cy="110" r="14"/>
      <path className="f-teal o6" d="M124 90 q4 6 0 9 q-4 -3 0 -9 Z"/>
      <path className="f-teal o6" d="M79 94 q4 6 0 9 q-4 -3 0 -9 Z"/>
      <circle className="f-redS s-red w15" cx="40" cy="62" r="18"/>
      <circle className="f-none s-red w15" cx="35" cy="67" r="3.5"/><circle className="f-none s-red w15" cx="45" cy="67" r="3.5"/>
      <path className="f-none s-red w15 rnd" d="M37.5 64 L47 53 M42.5 64 L33 53"/>
      <circle className="f-redS s-red w15" cx="102" cy="36" r="18"/>
      <text className="f-red t11 b8" x="102" y="40" textAnchor="middle">CC</text>
      <circle className="f-redS s-red w15" cx="164" cy="62" r="18"/>
      <path className="f-red" d="M155 58 h5 l6 -5 v18 l-6 -5 h-5 z"/>
      <path className="f-none s-red w15 rnd" d="M169.5 57 q4 5 0 10"/>
      <circle className="f-redS s-red w15" cx="38" cy="152" r="18"/>
      <text className="f-red t14 b8" x="38" y="157" textAnchor="middle">T</text>
      <circle className="f-redS s-red w15" cx="166" cy="152" r="18"/>
      <rect className="f-none s-red w15" x="157" y="145" width="18" height="14" rx="2"/>
      <path className="f-red" d="M163.5 148.5 L169.5 152 L163.5 155.5 Z"/>

      <rect className="f-paper" x="216" y="0" width="204" height="210" rx="16"/>
      <rect className="f-none s-rule w1" x="216.5" y="0.5" width="203" height="209" rx="16"/>
      <circle className="f-tealS s-teal w15" cx="244" cy="54" r="18"/>
      <path className="f-none s-teal w15 rnd" d="M253 45 L235 52.5 L242 55 L244.5 62 Z M242 55 L247.5 49.5"/>
      <circle className="f-ambS s-amb w15" cx="288" cy="54" r="18"/>
      <text className="t11 b8" x="288" y="58" textAnchor="middle">A/B</text>
      <path className="f-none s-mut w15 dsh" d="M252 72 L258 92 M280 72 L272 92"/>
      <rect className="f-amb" x="258" y="118" width="12" height="12"/>
      <path className="f-teal" d="M242 184 C242 146 252 128 264 128 C276 128 286 146 286 184 Z"/>
      <circle className="f-amb" cx="264" cy="110" r="14"/>
      <path className="f-none s-mut w2 rnd" d="M298 140 H326"/><path className="f-mut" d="M326 134 L335 140 L326 146 Z"/>
      <rect className="f-dev" x="342" y="84" width="62" height="96" rx="9"/>
      <rect className="f-onscr o15" x="350" y="94" width="46" height="16" rx="3"/>
      <rect className="f-onscr o15" x="350" y="118" width="46" height="16" rx="3"/>
      <rect className="f-onscr o15" x="350" y="142" width="46" height="16" rx="3"/>
      <circle className="f-teal" cx="388" cy="102" r="3"/><circle className="f-teal" cx="388" cy="126" r="3"/><circle className="f-teal" cx="388" cy="150" r="3"/>
      <rect className="f-onscr o5" x="355" y="100" width="22" height="3" rx="1.5"/>
      <rect className="f-onscr o5" x="355" y="124" width="18" height="3" rx="1.5"/>
      <rect className="f-onscr o5" x="355" y="148" width="24" height="3" rx="1.5"/>
    </svg>
    <div className="cap2 cap-600">
      <p><b>Sebelum</b>Satu orang memilih potongan, menyusun subtitel, menyeimbangkan suara, menata teks, dan merender.</p>
      <p><b>Sesudah</b>Dua tindakan saja: kirim bahan dan pilih naskah. Sisanya dikerjakan server.</p>
    </div>
  </figure>

  <p>Dampak terbesarnya bukan pada berapa jam yang dihemat, melainkan pada <strong>di mana hambatannya berada</strong>. Peran editor menyusut dari mengerjakan semuanya menjadi dua tindakan. Sisanya berjalan di server tanpa menahan siapa pun. Pekerjaan yang dulu harus antre satu per satu tidak lagi menunggu satu orang, dan lonjakan saat acara tidak lagi bertabrakan dengan kesibukan orang yang sama.</p>
  <p>Dari catatan sistem, penyusunan draf sekitar 122 detik dan render sekitar 188 detik, sehingga satu permintaan rampung dalam kisaran lima menit. Untuk lima sampai sepuluh video per minggu, total kerja mesin sekitar 25 sampai 50 menit per minggu. Rentang durasi hasil, 10 sampai 60 detik, juga mencakup format 15–30 detik yang mereka pakai.</p>
  <p>Satu angka sengaja tidak kami tulis: <strong>penghematan waktu dibanding menyunting manual</strong>. Kami belum punya pengukuran pembanding yang bisa dipertanggungjawabkan, dan menulis angka tanpa dasar justru melanggar prinsip artikel ini. Perbandingan itu akan dilaporkan setelah benar-benar diukur.</p>
  <p>Dampak yang paling bernilai justru bersifat metodologis. Pola “AI mengusulkan, kode mengukur” dan pembedaan tegas antara gagal dan kosong tidak terikat pada video. Pola yang sama berlaku untuk agent yang menyusun laporan keuangan, meringkas rekam medis, atau memproses dokumen hukum, yaitu di mana pun hasil AI akan dipercaya orang lain sebagai fakta.</p>
  <p>Secara etika, pendirian kami jelas: alat yang menempelkan kata-kata di wajah seseorang tidak boleh berjalan tanpa persetujuan manusia. Tidak ada publikasi otomatis, dan tahap memilih naskah tidak bisa dilewati.</p>
</section>

<section id="b10" className="sec" aria-labelledby="h-b10">
  <h2 id="h-b10"><span className="sec-n">10</span> Susunan tim</h2>
  <ul className="team wide">
    <li>
      <span className="av teal"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg></span>
      <span className="who">Steven Chandra</span>
      <span className="role">Lead AI Engineer &amp; Arsitek Sistem</span>
      <p className="does">Merancang alur BrainIdea dan ffmpeg serta aturan anti-halusinasi, membangun mesin render ffmpeg beserta optimasinya, menjadwalkan grafis mengikuti kata yang diucapkan, dan mengintegrasikan sistem dengan Hermes.</p>
    </li>
    <li>
      <span className="av amb"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/></svg></span>
      <span className="who">Steven</span>
      <span className="role">Infrastruktur &amp; Operasional</span>
      <p className="does">Menyiapkan dan mengelola Cloud VPS, menjalankan gateway sebagai layanan server, memasang Whisper lokal pengganti layanan berbayar, memantau proses, menangani insiden, dan mengendalikan biaya lewat catatan pemakaian.</p>
    </li>
    <li>
      <span className="av red"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.4 3 8 7 10 4-2 7-5.6 7-10V6l-7-3z"/><path d="m9 12 2.2 2.2L15.5 10"/></svg></span>
      <span className="who">Angky Kurniawan</span>
      <span className="role">Pengujian &amp; Jaminan Mutu</span>
      <p className="does">Menyusun 52 file uji otomatis, menguji sistem dengan bahan asli dari awal sampai akhir, membangun pemeriksa mutu untuk volume, bingkai beku, dan teks terpotong, serta mendokumentasikan studi kasus kegagalan.</p>
    </li>
  </ul>
</section>

<section id="b11" className="sec" aria-labelledby="h-b11">
  <h2 id="h-b11"><span className="sec-n">11</span> Keterbatasan dan penutup</h2>
  <p>Bagian tersulit membangun agent yang menyentuh bahan milik orang lain bukanlah membuatnya pintar; model bahasa saat ini sudah sangat mampu. Yang sulit adalah membuatnya <strong>berhenti</strong>: berhenti menebak saat data tidak lengkap, berhenti mengisi kekosongan dengan hal yang terdengar masuk akal, dan berhenti menganggap kegagalannya sendiri sebagai informasi.</p>
  <p>Setiap kali sistem ini salah, polanya selalu sama: ada satu titik ketika kegagalan diam-diam berubah menjadi kesimpulan. Transkripsi yang gagal menjadi “tidak ada yang berbicara”. Klip merah yang kosong menjadi “ilustrasi error”. Model yang tidak bisa melihat tetap menjawab seolah-olah melihat. Tidak satu pun kesalahan model; semuanya kesalahan kode yang tidak menyediakan cara untuk berkata “saya tidak tahu”.</p>

  <div className="limits">
    <h3>Keterbatasan yang kami akui</h3>
    <ul>
      <li>Publikasi otomatis ke Instagram, TikTok, dan YouTube belum tersedia.</li>
      <li>Analitik performa asli belum tersedia; laporan menulis <code>NO_DATA</code>, bukan angka perkiraan.</li>
      <li>Hanya berjalan di Linux, karena pipeline memakai fitur penguncian dan pengelolaan proses khas Linux.</li>
      <li>Penghematan waktu dibanding menyunting manual belum diukur secara sistematis.</li>
    </ul>
  </div>

  <p>Langkah berikutnya bukan menambah efek, melainkan memperluas prinsip yang sama ke bagian yang belum tercakup, misalnya analitik nyata begitu akses platform tersedia, dengan aturan yang tidak berubah: kolom tanpa data tetap ditulis <code>NO_DATA</code>.</p>
  <p className="closing">Pada akhirnya, sistem ini berisi banyak penolakan dan menyisakan satu titik keputusan manusia yang tidak bisa dilewati. Pengguna membaca dua naskah, memilih, atau menulis sendiri; baru setelah itu video dibuat. Untuk pekerjaan yang menempelkan kata-kata di wajah seseorang, kami tidak menemukan alasan yang cukup kuat untuk melewatkan langkah itu.</p>
</section>

</article>
</div>

<footer>
  <div className="wrap"><div className="inner">
    <p><strong>Ucapan terima kasih.</strong> Terima kasih kepada <strong>PT Laksamana Muda Bersatu</strong>, IDwebhost, dan CloudBaik atas dukungan infrastruktur komputasi selama AI HackFest 2026.</p>
    <p>Layanan <a href="https://idwebhost.com/ai-hosting">AI Hosting</a> IDwebhost dan layanan <a href="https://cloudbaik.com">Cloud VPS</a> CloudBaik.</p>
    <p><strong>Ketersediaan kode.</strong> Repositori bersifat privat. Akses peninjauan dapat diberikan kepada dewan juri AI HackFest 2026 atas permintaan, sehingga semua angka di artikel ini bisa diverifikasi langsung di kode dan catatan prosesnya.</p>
    <p><strong>Keterbukaan penggunaan AI.</strong> Sistem ini memakai model bahasa sebagai komponen saat berjalan (menyusun naskah dan memilih kandidat, dengan batasan seperti di Bagian 4) dan sebagai alat bantu pemrograman selama pengembangan. Seluruh keputusan arsitektur, pengukuran, dan verifikasi hasil dilakukan oleh tim. Semua gambar di halaman ini adalah ilustrasi, bukan foto atau tangkapan layar asli.</p>
    <p className="tags">#AIHackFest2026 #IDwebhost #CloudBaik #ContentFactory #HermesAgent #AIAgent #CreativeAI #VideoAutomation #FFmpeg #Whisper</p>
  </div></div>
</footer>

<div className="tt-wrap"><button className="tt" id="tt" type="button" aria-label="Ganti tema terang atau gelap" onClick={() => setIsDark((prev) => !prev)}>Ganti tema</button></div>



    </>
  );
}
