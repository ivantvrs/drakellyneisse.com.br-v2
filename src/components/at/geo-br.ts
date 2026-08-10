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

// Deeplink Tintim DEDICADO da campanha [BR] (mesma conta 9032d846… da home e da SP, fluxo
// próprio — separa o rastreio no Tintim por porta). Criado pelo Ivan em 10/08/2026.
// A mensagem ("Olá, Dra. Kelly! Gostaria de enviar os documentos do meu processo para análise.")
// e o número (34) 99687-8758 vêm do Tintim no 302 — NÃO são montados aqui e não devem ser
// duplicados no código. DEVE casar com o patch do FAB em scripts/gen-at-br.mjs.
export const AT_BR_WHATSAPP_URL =
  "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/59de1b8b-00ba-4bfd-a87b-d7f30b9a9472";
