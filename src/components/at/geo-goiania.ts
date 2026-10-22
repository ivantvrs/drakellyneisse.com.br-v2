// Porta geo /assistente-tecnico-medico/goiania — campanha Google Ads [GO] Goiânia 60 km (clone
// técnico da porta /sp; briefing de 22/10/2026).
// Single source do que MUDA em relação à home "/": textos do hero, das dobras (O que é, Para quem,
// Públicos, Autoridade, Sobre, FAQ, Atuação, CTA final), linha do rodapé e deeplink Tintim
// (copy v2 aprovada pelo Ivan em 22/10/2026; Ax = item do briefing). O resto da copy é o da home.
// Cada troca só vale com AtGeoContext === "goiania": home, /sp e /br não mudam.
// NÃO existe sala, endereço nem sede em Goiânia: nenhum texto desta porta pode sugerir isso
// (nada de "sede", "escritório", "consultório", endereço ou mapa). O registro profissional
// segue CRM/MG 109153. Sem travessão nos textos abaixo. Nada sobre preço, valor, proposta,
// contrato ou quem vai à perícia, e nenhum nome de outro médico.

// ── Hero ──
// A1: selo (pílula acima do H1, mobile e desktop); "e região" fica porque a campanha cobre 60 km.
export const GO_HERO_SELO = "Assistente técnico · Goiânia e região";
// A3: linha logo ACIMA do botão de WhatsApp (mobile e desktop).
export const GO_HERO_MOMENTO = "Perícia marcada, prazo de quesitos ou laudo desfavorável?";
// A2: linha logo abaixo do botão de WhatsApp (mobile e desktop).
export const GO_HERO_PRESENCIAL = "Acompanhamento presencial em perícias em Goiânia e região.";
// A4: 2ª microprova (no lugar de "Seus dados estão protegidos").
export const GO_HERO_SIGILO = "Sigilo do seu processo";

// ── O que é ──
// A5: acrescentado ao fim do parágrafo que termina em "…assistente técnico no processo.".
export const GO_OQUEE_ANTES_DA_PERICIA =
  "E depois do exame só dá para questionar o que foi perguntado e registrado. Por isso o assistente técnico entra antes da perícia, e não só quando o laudo sai.";

// ── Para quem (card Pessoa física) ──
// A6: troca só o começo do teaser; o resto segue o da home.
export const GO_PARAQUEM_PF_INICIO =
  "Você vai passar por uma perícia e quer um médico do seu lado? O laudo pode pesar na decisão.";

// ── Públicos ──
// A7: item da lista da empresa (no lugar de "Acompanhamento presencial da perícia").
export const GO_EMPRESA_PRESENCIAL = "Acompanhamento presencial de perícias em Goiânia e região";
// A8: prova da empresa.
export const GO_EMPRESA_PROVA =
  "Perita cadastrada no TJGO, TJMG, TJSP, TJMT e TRT-3, com foco exclusivo em perícia médica judicial. CRM/MG 109.153.";
// A10: item da lista do advogado (no lugar de "Resposta no prazo apertado, …").
export const GO_ADVOGADO_PRAZO = "Quesitos dentro do prazo, mesmo quando ele é de poucos dias";
// A11: parte em destaque do Diferencial do advogado (antes de ": trabalhista e cível, …").
export const GO_ADVOGADO_DIFERENCIAL = "Assistência técnica pericial com foco exclusivo em perícia médica judicial";
// A12: prova do advogado.
export const GO_ADVOGADO_PROVA =
  "Perita cadastrada no TJGO, TJMG, TJSP, TJMT e TRT-3 · CRM/MG 109.153 · foco exclusivo em perícia médica judicial.";
// A13: reforço do advogado.
export const GO_ADVOGADO_REFORCO = "Atendo em conjunto com o seu escritório · Trabalhista e cível · Goiânia e região";
// A14: pessoa física, logo depois de "O perito é nomeado pelo juiz e não representa nenhum dos lados.".
export const GO_PF_PERITO_PARTICULAR =
  "Por isso não existe médico perito particular. O que você pode ter é um médico assistente técnico, do seu lado na perícia.";
// A9: laudo de exemplo do dossiê da empresa (no lugar de "Reclamatória · TRT-3").
export const GO_DOSSIE_RECLAMADA = "Reclamatória trabalhista";

// ── Autoridade e Sobre ──
// A15 (sub do card "5 tribunais") e A17 (régua de credenciais do Sobre): TJGO primeiro.
export const GO_TRIBUNAIS = "TJGO · TJMG · TJSP · TJMT · TRT-3";
// A16: card "Brasil" vira o card da região (ícone MapPin).
export const GO_AUTORIDADE_REGIAO_STAT = "Goiânia e região";
export const GO_AUTORIDADE_REGIAO_SUB = "Acompanhamento presencial de perícias";

// ── FAQ ── (o JSON-LD FAQPage do <head> recebe as MESMAS trocas em scripts/gen-at-goiania.mjs,
// que confere que estes textos casam com os dele)
// A18: acrescentado ao fim da resposta da 01.
export const GO_FAQ_01_COMPLEMENTO = "E depois do exame só dá para questionar o que foi perguntado e registrado.";
// A19: pergunta e resposta da 06 (no lugar de "Quanto custa?").
export const GO_FAQ_06_PERGUNTA = "Procurei um médico perito particular. É isso?";
export const GO_FAQ_06_RESPOSTA =
  "O perito é nomeado pelo juiz e não pode ser contratado por nenhum dos lados. O que você contrata é o médico assistente técnico, que acompanha a perícia do seu lado, formula os quesitos e analisa o laudo.";

// ── Atuação ──
export const GO_ATUACAO_TITULO = "Acompanhamento presencial em Goiânia e em todo o Brasil";
// A20: frase inteira = INICIO + <strong>CIDADES</strong> + FIM (destaque dourado nas cidades).
export const GO_ATUACAO_INICIO = "Acompanhamento presencial da perícia onde ela acontecer: em";
export const GO_ATUACAO_CIDADES = "Goiânia, Aparecida de Goiânia, Anápolis";
export const GO_ATUACAO_FIM = ", nas cidades da região e em qualquer outra cidade do país.";

// ── CTA final ──
// A21: linha abaixo do botão (no lugar de "Resposta rápida · …").
export const GO_CTAFINAL_LINHA = "Goiânia e região · Cível e trabalhista · CRM/MG 109.153";

// ── Grupo B: NÃO renderizar ainda (esperam confirmação da Dra. Kelly) ──
// B1 (empresa, logo depois do highlight "Sem um médico acompanhando tecnicamente, …"):
// export const GO_EMPRESA_RECLAMANTE =
//   "Muitas vezes o reclamante chega à perícia com médico assistente e quesitos próprios. Sem um médico pela empresa, só um lado é ouvido tecnicamente.";
// B2 (empresa, trecho de prazo da faixa "O prazo é curto."):
// export const GO_EMPRESA_PRAZO_TRECHO =
//   "o prazo para indicar o assistente técnico e entregar os quesitos costuma ser de 5 a 15 dias, conforme o juízo";
// B3 (FAQ 04, ao fim da resposta: "…é curto, muitas vezes de poucos dias."):
// export const GO_FAQ_04_FIM = "é curto, muitas vezes de poucos dias.";
// B4 (Sobre, depois de "…não uma atividade paralela."):
// export const GO_SOBRE_PERITA_E_ASSISTENTE =
//   "Como perita nomeada pelo juízo, conhece a perícia do lado de quem examina. Como assistente técnica, coloca essa experiência ao lado de quem a contrata.";
// B5 (hero, 1ª microprova "Resposta rápida", e destaque "24h / Análise inicial" do advogado):
//   número a definir pelo Ivan (2h úteis ou 24h), o MESMO nos dois lugares.
// B6 (laudo de exemplo, VisualEmpresaDossie): conferir se o nº "5056271-20.2025" é fictício.

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
