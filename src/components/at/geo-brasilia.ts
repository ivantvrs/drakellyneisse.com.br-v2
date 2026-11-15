// Porta geo /assistente-tecnico-medico/brasilia — campanha Google Ads [DF] Brasília 80 km (clone
// técnico da porta /goiania; briefing de 15/11/2026).
// Single source do que MUDA em relação à home "/": selo e uma linha do hero, a seção Atuação, a
// linha do rodapé e o deeplink Tintim. TODO o resto da copy é o da home (inclusive a FAQ com as 9
// perguntas e o JSON-LD FAQPage: a porta NÃO usa a FAQ de 7 da Goiânia).
// Cada troca só vale com AtGeoContext === "brasilia": home, /sp, /br e /goiania não mudam.
// NÃO existe sala, endereço nem sede em Brasília: nenhum texto desta porta pode sugerir isso
// (nada de "sede", "escritório", "consultório", endereço, mapa ou LocalBusiness). Nenhum tribunal
// do DF (TRT-10, TJDFT: cadastros não confirmados); os tribunais herdados da home ficam. O registro
// segue CRM/MG 109153. Sem travessão nos textos abaixo. Nada sobre preço, valor, proposta,
// contrato ou quem vai à perícia, e nenhum nome de outro médico.

// ── Hero ──
// Selo (pílula acima do H1, mobile e desktop). 39 caracteres: 1 linha no desktop e até 2 no
// celular de 412 px (Pixel 7). "e entorno" porque a campanha cobre 80 km.
export const BSB_HERO_SELO = "Assistente técnico · Brasília e entorno";
// Linha logo abaixo do botão de WhatsApp do hero (mobile e desktop), no mesmo estilo da linha
// que a porta Goiânia tem ali. Fala só do acompanhamento presencial, sem dizer quem vai.
export const BSB_HERO_PRESENCIAL = "Acompanhamento presencial na perícia em Brasília e entorno.";

// ── Atuação ──
export const BSB_ATUACAO_TITULO = "Acompanhamento presencial em Brasília e em todo o Brasil";
// Frase inteira = INICIO + <strong>CIDADES</strong> + FIM (destaque dourado nas cidades). O começo
// é o da porta Goiânia, e não o da home ("A Dra. Kelly acompanha a perícia presencialmente…"):
// a regra 3 do briefing proíbe dizer quem vai à perícia nos textos da porta. A lista de cidades e
// o fim ("e em qualquer outra cidade do país") são os do briefing.
export const BSB_ATUACAO_INICIO = "Acompanhamento presencial da perícia onde ela acontecer: em";
export const BSB_ATUACAO_CIDADES = "Brasília, Taguatinga, Águas Claras, Luziânia, Valparaíso de Goiás, Formosa";
export const BSB_ATUACAO_FIM = " e em qualquer outra cidade do país.";

// Linha de atendimento do rodapé (substitui "Sede em Uberlândia/MG · …" da home).
export const BSB_FOOTER_SEDE_LINE =
  "Atendimento presencial em Brasília e entorno · Atuação em todo o Brasil (presencial e remoto)";

// Deeplink Tintim DEDICADO da campanha [DF] (mesma conta 9032d846… da home, fluxo próprio —
// separa o rastreio no Tintim por porta). Criado pelo Ivan em 14/11/2026. A mensagem ("Olá,
// Dra. Kelly! Tenho um processo em Brasília e gostaria de enviar os documentos para análise.") e o
// número (34) 99687-8758 vêm do Tintim no 302 — não são montados aqui e não devem ser duplicados
// no código. Não usar o link "redirect-to-whatsapp" (é a versão para Meta Ads). DEVE casar com
// TINTIM_BRASILIA em scripts/gen-at-brasilia.mjs (o gerador confere).
export const AT_BRASILIA_WHATSAPP_URL =
  "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/8d7669f3-ce94-42c3-bb70-ae9d6578c692";
