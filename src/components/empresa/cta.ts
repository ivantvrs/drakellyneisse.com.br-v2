// CTAs da LP /empresa — single source. Todos os botões de WhatsApp da página importam daqui.
//
// Deeplink Tintim da /empresa (mensagem de triagem das 3 perguntas configurada no Tintim).
// O handler inline de empresa.html reescreve este link com gclid/sid/utm antes da navegação,
// preservando a atribuição do Google Ads (não quebra o fix de 20/05).
export const EMPRESA_WHATSAPP_URL =
  "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/97d0dfa8-386f-4229-b6bc-9791576888f0";

// Telefone (CTA "Ligar") — conversão de ligação rastreada via handler tel: em empresa.html.
export const TEL_HREF = "tel:+5534996878758";
export const TEL_DISPLAY = "(34) 9 9687-8758";
