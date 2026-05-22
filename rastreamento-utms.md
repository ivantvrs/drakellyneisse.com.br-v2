# Rastreamento — UTMs e Links Rastreáveis

Referência central de rastreamento do site **Dra. Kelly Neisse — Médica Perita Judicial**.
WhatsApp de atendimento: **(34) 99687-8758** · Landing page: **https://www.drakellyneisse.com.br/**

---

## 1. UTMs — Google Ads (Pesquisa)

### Campanha: `[PESQUISA] Assistente Técnico Médico — Advogados`

- **Slug usado nos UTMs:** `pesquisa-assistente-tecnico-medico-advogados`
- **Destino:** landing page (`https://www.drakellyneisse.com.br/`)
- **Onde colar:** campo **"URL final"** de cada anúncio no Google Ads.
- **Regra:** só o final (`utm_content`) muda por anúncio. O resto é sempre igual.

**Parte fixa (igual em todos):**
```
utm_source=google&utm_medium=cpc&utm_campaign=pesquisa-assistente-tecnico-medico-advogados&utm_term={keyword}
```

### URLs por anúncio

**Grupo — Assistente Técnico Médico**
```
https://www.drakellyneisse.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=pesquisa-assistente-tecnico-medico-advogados&utm_term={keyword}&utm_content=assistente-tecnico-medico-a1
```
```
https://www.drakellyneisse.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=pesquisa-assistente-tecnico-medico-advogados&utm_term={keyword}&utm_content=assistente-tecnico-medico-a2
```

**Grupo — Impugnação de Laudo**
```
https://www.drakellyneisse.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=pesquisa-assistente-tecnico-medico-advogados&utm_term={keyword}&utm_content=impugnacao-laudo-a1
```
```
https://www.drakellyneisse.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=pesquisa-assistente-tecnico-medico-advogados&utm_term={keyword}&utm_content=impugnacao-laudo-a2
```

**Grupo — Parecer e Quesitos Médicos**
```
https://www.drakellyneisse.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=pesquisa-assistente-tecnico-medico-advogados&utm_term={keyword}&utm_content=parecer-quesitos-a1
```
```
https://www.drakellyneisse.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=pesquisa-assistente-tecnico-medico-advogados&utm_term={keyword}&utm_content=parecer-quesitos-a2
```

**Grupo — Perícia Médica Trabalhista**
```
https://www.drakellyneisse.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=pesquisa-assistente-tecnico-medico-advogados&utm_term={keyword}&utm_content=pericia-medica-trabalhista-a1
```
```
https://www.drakellyneisse.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=pesquisa-assistente-tecnico-medico-advogados&utm_term={keyword}&utm_content=pericia-medica-trabalhista-a2
```

### Template em branco (para qualquer anúncio extra)
Troque apenas o que vem depois de `utm_content=`:
```
https://www.drakellyneisse.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=pesquisa-assistente-tecnico-medico-advogados&utm_term={keyword}&utm_content=NOME-DO-ANUNCIO
```
Padrão do `utm_content`: `tema-do-grupo` + `-a1`, `-a2`, `-a3`... (um número por anúncio).

### Glossário dos parâmetros
| Parâmetro | Valor | Para quê |
|---|---|---|
| `utm_source` | `google` | De onde veio (Google) |
| `utm_medium` | `cpc` | Tipo de tráfego (pago/pesquisa) |
| `utm_campaign` | `pesquisa-assistente-tecnico-medico-advogados` | Qual campanha |
| `utm_term` | `{keyword}` | Palavra-chave que disparou (ValueTrack, preenche sozinho) |
| `utm_content` | ex.: `impugnacao-laudo-a1` | Qual anúncio foi clicado |

> Alternativa de baixa manutenção: usar `utm_content={creative}` uma vez no **Sufixo do URL final** da campanha — o Google preenche um ID único por anúncio automaticamente (desvantagem: aparece um ID em vez do nome legível).

---

## 2. Links Rastreáveis — Tintim (cliques de WhatsApp no site)

São **7 pontos de clique de WhatsApp** no site. Criar **1 link rastreável por ponto** no Tintim,
diferenciando pelo **nome** (a mensagem inicial é a mesma em todos).

| # | Nome do Link Rastreável | Ponto de clique no site |
|---|---|---|
| 1 | `Site \| Menu (topo fixo)` | Botão "Falar no WhatsApp" do menu |
| 2 | `Site \| Hero (1ª dobra)` | Botão principal do topo |
| 3 | `Site \| Serviços` | Botão na seção de serviços |
| 4 | `Site \| FAQ` | Link "Tem outra dúvida?" |
| 5 | `Site \| CTA Final` | Botão antes do rodapé |
| 6 | `Site \| Botão Flutuante` | Botão verde fixo no canto |
| 7 | `Site \| Barra Mobile` | Barra fixa de WhatsApp no celular |

**Mensagem inicial (igual nos 7 links):**
```
Olá, Dra. Kelly! Gostaria de enviar um caso para análise técnica.

(Envie essa mensagem *sem apagá-la* para ser atendido).
```

**Demais campos do Tintim (iguais nos 7):**
- WhatsApp de destino: (34) 99687-8758
- Redirecionamento via computador: WhatsApp Web (recomendado)
- Título da página de redirecionamento: `Quase lá! Conectando você à Dra. Kelly…`
- Mensagem da página de redirecionamento: `Aguarde alguns segundos enquanto preparamos o seu atendimento.`

> Para botões internos do site, preferir o **link instantâneo** (sem os 5s de espera), se o Tintim oferecer.

### Concluído
- [x] Criar os 7 links no Tintim e substituir os `wa.me` no código pelos links gerados (2026-05-22).

**Container do Tintim:** `9032d846-c29e-46d1-a300-01417d56fcb0`

| # | Ponto / Componente | ID do link Tintim |
|---|---|---|
| 1 | Menu (topo fixo) — `Header.tsx` (desktop + mobile) | `9d031432-69b6-4ecb-866b-31b68ccd766f` |
| 2 | Hero (1ª dobra) — `Hero.tsx` | `da16a3e0-467d-43f7-8bb6-3a76bb87ded3` |
| 3 | Serviços — `Services.tsx` | `5aee426e-4379-4a3c-ada4-ee117bf7133f` |
| 4 | FAQ — `FAQ.tsx` | `77da2716-be21-4957-ac7d-338e5dbd1e6c` |
| 5 | CTA Final — `CTAFinal.tsx` | `1048d0d3-67de-4823-be97-b5ad93a44820` |
| 6 | Botão Flutuante — `WhatsAppButton.tsx` (desktop + mobile) | `5582657c-bbef-4294-b920-7b643b273303` |
| 7 | Barra Mobile — `MobileStickyBar.tsx` | `4342e64e-304b-40eb-8abc-1d0c4a6a1b1a` |

> Formato do link: `https://tintim.link/whatsapp/<container>/<id-do-link>`.
> O beacon GA4 `whatsapp_click` ([index.html](index.html)) continua disparando: o listener detecta o clique por `href` conter `whatsapp`, presente no caminho `/whatsapp/` dos links Tintim.
