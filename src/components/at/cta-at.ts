// CTAs da LP /at (nacional) — single source. Todos os botões de WhatsApp da página importam daqui.
//
// Deeplink Tintim da /at (mensagem de triagem das 3 perguntas configurada no Tintim).
// O handler inline de at.html reescreve este link com gclid/sid/utm antes da navegação,
// preservando a atribuição do Google Ads.
//
// Deeplink Tintim da /at (conta 9032d846…, mensagem de triagem das 3 perguntas).
// DEVE casar com o TINTIM hardcoded no rewrite do FAB em at.html.
import { createContext, useContext } from "react";
import { AT_SP_WHATSAPP_URL } from "./geo-sp";

export const AT_WHATSAPP_URL =
  "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/b40002a5-951b-4014-a30a-17af3f592141";

// Porta geo da página (undefined = home nacional; "sp" = /assistente-tecnico-medico/sp).
// Provido por AtIndex; resolve o deeplink Tintim certo por porta em TODOS os botões via hook.
export const AtGeoContext = createContext<"sp" | undefined>(undefined);

export function useAtWhatsappUrl(): string {
  return useContext(AtGeoContext) === "sp" ? AT_SP_WHATSAPP_URL : AT_WHATSAPP_URL;
}
