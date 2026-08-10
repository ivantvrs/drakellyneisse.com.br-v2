// Porta geo /assistente-tecnico-medico/br — campanha Google Ads nacional (clone da porta /sp
// com a copy geográfica ampliada para o Brasil inteiro; decisão do Ivan 10/08).
// Single source do que MUDA em relação à /sp: a linha do rodapé e a seção Atuação. O escritório
// continua sendo o de São Paulo (a mensagem é "escritório em SP, atuação nacional") e o registro
// profissional segue CRM/MG 109153 — nenhum texto desta porta pode sugerir outro registro.

import { SP_ENDERECO_SEDE } from "./geo-sp";

// Mesmo endereço da porta SP — importado (e não copiado) para que uma eventual correção do
// endereço da sede valha para as duas portas de uma vez.
export const BR_ENDERECO_SEDE = SP_ENDERECO_SEDE;

// Linha de sede/atendimento do rodapé: preserva o endereço da sede paulista da /sp e amplia a
// abrangência ("Atuação nacional · Atendimento em todo o Brasil"), conforme o item 5 do briefing.
export const BR_FOOTER_SEDE_LINE =
  `Sede: ${BR_ENDERECO_SEDE} · Atuação nacional · Atendimento em todo o Brasil (presencial e remoto)`;

// WhatsApp: esta porta usa o MESMO deeplink Tintim da home (AT_WHATSAPP_URL em cta-at.ts) —
// mesmo número, mesma mensagem de triagem, mesmo comportamento. A /sp tem fluxo Tintim próprio
// porque a campanha dela é regional; a /br é nacional como a home, então herdar o fluxo da mãe é
// o menor desvio de rastreio possível enquanto não existir um fluxo dedicado da campanha [BR].
// QUANDO o fluxo dedicado for criado no Tintim: exportar AT_BR_WHATSAPP_URL aqui, resolvê-la em
// useAtWhatsappUrl() e trocar o deeplink do FAB em scripts/gen-at-br.mjs (espelhando gen-at-sp).
