// Porta geo /assistente-tecnico-medico/goiania — campanha Google Ads [GO] Goiânia 60 km (clone
// técnico da porta /sp; briefing de 22/10/2026).
// Single source do que MUDA em relação à home "/": selo e linha nova do hero, seção Atuação,
// linha do rodapé e deeplink Tintim. O resto da copy é o da home.
// NÃO existe sala, endereço nem sede em Goiânia: nenhum texto desta porta pode sugerir isso
// (nada de "sede", "escritório", "consultório", endereço ou mapa). O registro profissional
// segue CRM/MG 109153. Sem travessão nos textos abaixo (regra do briefing).

// Selo do hero (pílula acima do H1, mobile e desktop) — substitui "… · Perícia Médica".
export const GO_HERO_SELO = "Assistência técnica médica · Goiânia e região";

// Linha nova logo abaixo do botão de WhatsApp do hero (mobile e desktop), só nesta porta.
export const GO_HERO_PRESENCIAL = "Acompanhamento presencial na perícia em Goiânia, com médico da equipe.";

// Seção Atuação: título e cidades do trecho "… presencialmente onde ela acontecer, em …".
export const GO_ATUACAO_TITULO = "Acompanhamento presencial em Goiânia e em todo o Brasil";
export const GO_ATUACAO_CIDADES = "Goiânia, Aparecida de Goiânia, Anápolis";

// Linha de atendimento do rodapé (substitui "Sede em Uberlândia/MG · …" da home).
export const GO_FOOTER_SEDE_LINE =
  "Atendimento presencial em Goiânia e região · Atuação em todo o Brasil (presencial e remoto)";

// Deeplink Tintim DEDICADO da campanha [GO] (mesma conta 9032d846… da home, fluxo próprio —
// separa o rastreio no Tintim por porta). Criado pelo Ivan em 22/10/2026. A mensagem ("Olá,
// Dra. Kelly! Tenho um processo em Goiânia e gostaria de enviar os documentos para análise.") e o
// número (34) 99687-8758 vêm do Tintim no 302 — não são montados aqui e não devem ser duplicados
// no código. DEVE casar com TINTIM_GOIANIA em scripts/gen-at-goiania.mjs (o gerador confere).
export const AT_GOIANIA_WHATSAPP_URL =
  "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/1fdae0e4-bc5c-4ca6-b902-637cee0d58f0";
