// Porta geo /assistente-tecnico-medico/sp — campanha Google Ads dedicada ao estado de São Paulo.
// Single source do que MUDA em relação à home "/": SÓ a sede do rodapé e o deeplink Tintim
// (decisão do Ivan 10/07: a copy da página — hero incluso — fica idêntica à da mãe).
// O registro profissional segue sendo CRM/MG 109153 (registro verdadeiro da Dra. Kelly) —
// nenhum texto desta porta pode sugerir registro em SP.

// Endereço da sede paulista (CNPJ SP) — informado pelo Ivan em 10/07/2026.
export const SP_ENDERECO_SEDE = "Rua Paim, 189 — Bela Vista, São Paulo/SP";

// Linha de sede/atendimento do rodapé (substitui a linha "Sede em Uberlândia/MG · …" da home).
export const SP_FOOTER_SEDE_LINE =
  `Sede: ${SP_ENDERECO_SEDE} · Atendimento em todo o estado de São Paulo e no Brasil (presencial e remoto)`;

// Deeplink Tintim DEDICADO da campanha SP (mesma conta 9032d846… da home, fluxo próprio —
// separa o rastreio no Tintim por porta). A home continua com o dela (AT_WHATSAPP_URL).
// DEVE casar com o patch do FAB em scripts/gen-at-sp.mjs.
export const AT_SP_WHATSAPP_URL =
  "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/f42174e7-24cc-4583-a56b-9a6161434a15";
