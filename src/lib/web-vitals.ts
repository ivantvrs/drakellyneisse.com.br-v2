import { onLCP, onINP, onCLS, onFCP, onTTFB, type Metric } from "web-vitals";

// Medição PASSIVA de Core Web Vitals de campo (usuário real) -> GA4 (G-N6G6FSD34E).
//
// Reusa o MESMO beacon direto que já manda whatsapp_click_at: window.__tvrs, definido inline
// no <head> de index/trabalhista/empresa.html. Ele monta o payload no formato Measurement
// Protocol (/g/collect) e envia via navigator.sendBeacon — que é à prova de unload, exatamente
// o que LCP/CLS/INP precisam (essas métricas só finalizam quando a aba é escondida, `hidden`).
//
// NÃO carrega gtag/GTM (continuam só na interação). Convenção MP: `ep.` = parâmetro de string
// (vira dimensão), `epn.` = parâmetro numérico (vira métrica) — igual ao resto do tracking.

type TvrsBeacon = {
  base?: () => Record<string, string>;
  send?: (params: Record<string, string>) => void;
};

// CLS é decimal (ex.: 0.03); guardamos x1000 como inteiro no GA4. LCP/INP/FCP/TTFB já são ms.
// ATENÇÃO na leitura do GA4: dividir metric_value/metric_delta de CLS por 1000.
const toInt = (m: Metric, v: number): string =>
  String(Math.round(m.name === "CLS" ? v * 1000 : v));

function send(metric: Metric): void {
  try {
    const T = (window as unknown as { __tvrs?: TvrsBeacon }).__tvrs;
    if (!T?.base || !T?.send) return; // sem o helper, no-op silencioso (nunca quebra UX)

    const p = T.base();
    p.en = "web_vitals";
    // Engajamento mínimo de propósito: NÃO usar performance.now() aqui. LCP/CLS/INP finalizam
    // no `hidden` (às vezes minutos depois) e um _et grande inflaria o tempo de engajamento.
    p._et = "1";
    p["ep.metric_name"] = metric.name; // LCP | INP | CLS | FCP | TTFB  (dimensão)
    p["epn.metric_value"] = toInt(metric, metric.value); // (métrica numérica)
    p["ep.metric_rating"] = metric.rating; // good | needs-improvement | poor  (dimensão)
    p["ep.metric_id"] = metric.id; // dedup: 1 valor final por métrica/pageview
    p["epn.metric_delta"] = toInt(metric, metric.delta);
    p["ep.nav_type"] = metric.navigationType; // navigate | reload | back-forward | prerender | restore
    p["ep.page_path"] = location.pathname; // /, /trabalhista, /empresa
    p["ep.transport"] = "beacon_direct";
    p.dl = location.href;
    p.dt = document.title;
    T.send(p);
  } catch {
    // nunca quebrar UX
  }
}

export function initWebVitals(): void {
  onLCP(send);
  onINP(send);
  onCLS(send);
  onFCP(send);
  onTTFB(send);
}
