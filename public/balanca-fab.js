/*
 * Balança flutuante — botão de contato (estilo WhatsApp)
 * ------------------------------------------------------
 * Como usar em qualquer página:
 *   1. Suba este arquivo no projeto.
 *   2. Antes de </body>, adicione:
 *        <script>
 *          window.BALANCA_FAB = { phone: "5599999999999" }; // nº real da Dra. Kelly
 *        </script>
 *        <script src="balanca-fab.js"></script>
 *
 * Opções (window.BALANCA_FAB, todas opcionais):
 *   phone       "5599999999999"  (DDI + DDD + número, só dígitos)
 *   tooltip     texto que aparece ao passar o mouse
 *   greeting    mensagem dentro do balão
 *   name        nome no cabeçalho do balão
 *   subtitle    subtítulo no cabeçalho
 *   accent      cor de destaque (hex)
 *   size        diâmetro do botão em px
 *   scrollReact true/false — reagir à rolagem
 */
(function () {
  var CFG = Object.assign({
    phone: "5500000000000",
    tooltip: "Desejo enviar um caso para a Dra. Kelly",
    greeting: "Olá! Deseja enviar um caso para análise? Será um prazer ajudar.",
    name: "Dra. Kelly",
    subtitle: "Direito médico & saúde · responde em breve",
    accent: "#c9a36b",
    size: 90,
    scrollReact: true
  }, window.BALANCA_FAB || {});

  var EMBLEM = "/fab-emblem.webp", EMBLEM_AV = "/fab-emblem.avif";
  var PANL = "/fab-pan-l.webp", PANL_AV = "/fab-pan-l.avif";
  var PANR = "/fab-pan-r.webp", PANR_AV = "/fab-pan-r.avif";

  var STAGE_W = 950, STAGE_H = 1080;
  var PIVL = { x: 128, y: 207 }, PIVR = { x: 825, y: 207 };
  var D = CFG.size, fit = (D * 0.92) / STAGE_H;
  var accent = CFG.accent;
  var green = CFG.greenAccent || "#25d366";   // verde estilo WhatsApp (hover/clique)

  function waLink() {
    return "https://wa.me/" + String(CFG.phone).replace(/\D/g, "") +
      "?text=" + encodeURIComponent(CFG.greeting);
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ── styles ──────────────────────────────────────────────────────
  var css = ""
    + ".bfab-wrap{position:fixed;right:clamp(16px,3vw,26px);bottom:clamp(16px,3vw,26px);"
    + "z-index:2147483000;display:flex;flex-direction:column;align-items:flex-end;gap:14px;"
    + "font-family:'Helvetica Neue',Helvetica,Arial,sans-serif}"
    + ".bfab-btn{position:relative;border-radius:50%;padding:0;cursor:pointer;flex-shrink:0;"
    + "border:1px solid " + accent + "66;background:radial-gradient(circle at 50% 36%,#2a2218 0%,#16110c 60%,#0d0a08 100%);"
    + "box-shadow:0 10px 26px rgba(0,0,0,.5);transition:transform .18s ease,box-shadow .18s ease}"
    + ".bfab-btn:hover{transform:translateY(-2px);box-shadow:0 16px 34px rgba(0,0,0,.6);border-color:" + green + "}"
    + ".bfab-btn:hover .bfab-ring{border-color:" + green + " !important}"
    + ".bfab-btn:active{transform:translateY(0)}"
    + ".bfab-clip{position:absolute;inset:0;border-radius:50%;overflow:hidden}"
    + ".bfab-stage{position:absolute;left:50%;top:50%;width:" + STAGE_W + "px;height:" + STAGE_H + "px;"
    + "transform-origin:center center}"
    + ".bfab-stage img{position:absolute;inset:0;width:" + STAGE_W + "px;height:" + STAGE_H + "px;"
    + "filter:drop-shadow(0 4px 5px rgba(0,0,0,.45));will-change:transform}"
    + ".bfab-ring{position:absolute;inset:-1px;border-radius:50%;border:1.5px solid " + accent + ";"
    + "pointer-events:none;animation:bfabRing 2.8s ease-in-out infinite}"
    + "@keyframes bfabRing{"
    + "0%{border-color:" + accent + ";transform:scale(1);opacity:0}"
    + "14%{border-color:" + accent + ";transform:scale(1);opacity:.6}"
    + "52%{border-color:" + green + ";transform:scale(1);opacity:.9}"
    + "60%{border-color:" + green + ";transform:scale(1.04);opacity:.9}"
    + "100%{border-color:" + green + ";transform:scale(1.7);opacity:0}}"
    + ".bfab-tip{position:absolute;right:calc(100% + 14px);top:50%;transform:translateY(-50%) translateX(6px);"
    + "white-space:nowrap;pointer-events:none;opacity:0;font-size:12px;color:" + green + ";padding:9px 14px;"
    + "border-radius:10px;background:#0c1a12;border:1px solid " + green + ";box-shadow:0 10px 24px rgba(0,0,0,.45);"
    + "transition:opacity .2s ease,transform .2s ease}"
    + ".bfab-tip::after{content:'';position:absolute;left:100%;top:50%;transform:translateY(-50%);"
    + "border:6px solid transparent;border-left-color:#0c1a12}"
    + ".bfab-btn:hover .bfab-tip{opacity:1;transform:translateY(-50%) translateX(0)}"
    + ".bfab-pop{width:min(310px,calc(100vw - 32px));background:#0d130f;border:1px solid " + green + "66;"
    + "border-radius:18px;box-shadow:0 22px 60px rgba(0,0,0,.55);overflow:hidden;"
    + "animation:bfabPop .22s cubic-bezier(.2,.9,.3,1.2) both}"
    + "@keyframes bfabPop{from{opacity:0;transform:translateY(10px) scale(.96)}to{opacity:1;transform:none}}"
    + ".bfab-hd{display:flex;align-items:center;gap:12px;padding:15px 16px;border-bottom:1px solid " + green + "33;"
    + "background:linear-gradient(180deg," + green + "1f," + green + "00)}"
    + ".bfab-av{width:40px;height:40px;border-radius:50%;flex-shrink:0;position:relative;overflow:hidden;"
    + "background:radial-gradient(circle at 50% 38%,#15301f,#0a160e);border:1px solid " + green + "77}"
    + ".bfab-av img{position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);"
    + "width:" + (40 * 0.92 * (STAGE_W / STAGE_H)).toFixed(1) + "px}"
    + ".bfab-nm{font-family:'Cormorant Garamond',Georgia,serif;font-size:19px;font-weight:600;color:#eafbef;line-height:1.1}"
    + ".bfab-sb{font-size:11px;color:#7fae91;margin-top:2px}"
    + ".bfab-x{background:none;border:none;color:#7fae91;font-size:16px;cursor:pointer;line-height:1;padding:4px;margin-right:-4px}"
    + ".bfab-msg{margin:16px 16px 8px;background:#103d28;color:#dcf8c6;font-size:13.5px;line-height:1.55;"
    + "padding:11px 13px;border-radius:4px 14px 14px 14px;max-width:92%}"
    + ".bfab-cta{display:flex;align-items:center;justify-content:center;gap:9px;margin:8px 16px 18px;"
    + "background:" + green + ";color:#06231a;text-decoration:none;font-size:12.5px;font-weight:700;"
    + "letter-spacing:.1em;text-transform:uppercase;padding:13px 16px;border-radius:999px}"
    + "@media(max-width:600px){.bfab-tip{display:none}}"
    + "@media(prefers-reduced-motion:reduce){.bfab-ring{animation:none;opacity:0}}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // ── markup ──────────────────────────────────────────────────────
  var wrap = document.createElement("div");
  wrap.className = "bfab-wrap";

  var waSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="#06231a" aria-hidden="true">'
    + '<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.06c-.25.69-1.45 1.32-1.99 1.36-.53.05-1.02.24-3.44-.72-2.9-1.14-4.74-4.13-4.88-4.32-.14-.19-1.16-1.55-1.16-2.96 0-1.41.74-2.1 1-2.39.25-.29.55-.36.73-.36.18 0 .37 0 .53.01.17.01.4-.06.62.48.25.59.85 2.04.92 2.19.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.17.29.74 1.22 1.59 1.98 1.09.98 2.01 1.28 2.3 1.42.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.65-.14.27.09 1.71.81 2 .95.29.14.49.21.56.33.07.12.07.66-.18 1.35Z"/></svg>';

  var pop = document.createElement("div");
  pop.className = "bfab-pop";
  pop.style.display = "none";
  pop.innerHTML =
    '<div class="bfab-hd">'
    + '<div class="bfab-av"><picture><source srcset="' + EMBLEM_AV + '" type="image/avif"><img src="' + EMBLEM + '" alt=""></picture></div>'
    + '<div style="flex:1;min-width:0">'
    + '<div class="bfab-nm">' + esc(CFG.name) + '</div>'
    + '<div class="bfab-sb">' + esc(CFG.subtitle) + '</div></div>'
    + '<button class="bfab-x" aria-label="Fechar">✕</button></div>'
    + '<div class="bfab-msg">' + esc(CFG.greeting) + '</div>'
    + '<a class="bfab-cta" href="' + waLink() + '" target="_blank" rel="noopener">'
    + waSvg + 'Enviar caso pelo WhatsApp</a>';

  var btn = document.createElement("button");
  btn.className = "bfab-btn";
  btn.setAttribute("aria-label", CFG.tooltip);
  btn.style.width = D + "px";
  btn.style.height = D + "px";
  btn.innerHTML =
    '<span class="bfab-ring"></span>'
    + '<span class="bfab-clip"><span class="bfab-stage" style="transform:translate(-50%,-50%) scale(' + fit + ')">'
    + '<picture><source srcset="' + PANL_AV + '" type="image/avif"><img class="bfab-pl" src="' + PANL + '" draggable="false" style="transform-origin:' + PIVL.x + 'px ' + PIVL.y + 'px"></picture>'
    + '<picture><source srcset="' + PANR_AV + '" type="image/avif"><img class="bfab-pr" src="' + PANR + '" draggable="false" style="transform-origin:' + PIVR.x + 'px ' + PIVR.y + 'px"></picture>'
    + '<picture><source srcset="' + EMBLEM_AV + '" type="image/avif"><img src="' + EMBLEM + '" draggable="false"></picture></span></span>'
    + '<span class="bfab-tip">' + esc(CFG.tooltip) + '</span>';

  wrap.appendChild(pop);
  wrap.appendChild(btn);

  function mount() {
    document.body.appendChild(wrap);
    var ring = btn.querySelector(".bfab-ring");
    var open = false;
    function setOpen(v) {
      open = v;
      pop.style.display = v ? "" : "none";
      if (ring) ring.style.display = v ? "none" : "";
    }
    btn.addEventListener("click", function () { setOpen(!open); });
    pop.querySelector(".bfab-x").addEventListener("click", function () { setOpen(false); });

    // ── physics ──
    var leftEl = btn.querySelector(".bfab-pl");
    var rightEl = btn.querySelector(".bfab-pr");
    var pl = { th: 0.05, w: 0 }, pr = { th: -0.04, w: 0 };
    var last = performance.now(), t0 = last, lastY = window.scrollY || 0, smoothV = 0;
    function clamp(v, m) { return Math.max(-m, Math.min(m, v)); }
    function frame(now) {
      var time = (now - t0) / 1000;
      var dt = Math.min(0.034, (now - last) / 1000) || 0.016; last = now;
      var y = window.scrollY || document.documentElement.scrollTop || 0;
      var inst = (y - lastY) / dt; lastY = y;
      smoothV = smoothV * 0.72 + inst * 0.28;
      var w0 = 2 * Math.PI / 2.0, damp = 1.0;
      if (CFG.scrollReact) {
        var kick = clamp(smoothV * 0.00010, 2.2);
        pl.w += kick * dt * 60; pr.w += kick * 0.9 * dt * 60;
      }
      pl.w += Math.sin(time * 1.7) * 0.05 * dt;
      pr.w += Math.sin(time * 1.43 + 1.1) * 0.05 * dt;
      [[pl, 1.0], [pr, 0.93]].forEach(function (pair) {
        var p = pair[0], wn = w0 * pair[1];
        p.w += (-wn * wn * Math.sin(p.th) - damp * p.w) * dt;
        p.w = clamp(p.w, 3.0); p.th += p.w * dt; p.th = clamp(p.th, 0.34);
      });
      if (leftEl) leftEl.style.transform = "rotate(" + pl.th + "rad)";
      if (rightEl) rightEl.style.transform = "rotate(" + pr.th + "rad)";
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
