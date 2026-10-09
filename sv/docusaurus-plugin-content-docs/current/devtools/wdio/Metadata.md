---
id: metadata
title: Metadata
description: "Granska funktionerna, miljön och tidsåtgången för varje webbläsarsession i DevTools-fliken Metadata för att diagnostisera miljöspecifika fel."
---

Granska hela kontexten för varje webbläsarsession som ditt test öppnar. Fliken Metadata visar funktionerna (capabilities), miljön och tidsåtgången bakom varje körning, så att du kan bekräfta exakt vad som testades utan att behöva gräva igenom loggar.

**Vad som fångas:**
- **Sessionens capabilities** - Webbläsarens namn och version, plattform samt de förhandlade WebDriver-capabilities
- **Sessionsdetaljer** - Sessions-ID, bas-URL och viewport-storlek
- **Körningstider** - Testets varaktighet, status samt tidsstämplar för start och slut
- **Vy per session** - Varje webbläsarsession (inklusive sessioner som skapats av `browser.reloadSession()`) bevaras separat och kan väljas från en rullgardinsmeny

Detta är ovärderligt för att diagnostisera miljöspecifika fel, verifiera att rätt capabilities tillämpades och förstå hur tester med flera sessioner betedde sig.

## Demo

### 📋 Metadata
![Metadata Demo](/img/devtools/metadata.gif)