---
id: network-logs
title: Nätverksloggar
---

Övervaka och inspektera all nätverksaktivitet under dina tester. DevTools fångar varje HTTP-förfrågan och svar, vilket ger dig fullständig insyn i API-anrop, resursinläsning och nätverkstiming - precis som i webbläsarens DevTools.

**Vad som fångas:**
- **Förfrågningsdetaljer** - URL, metod, headers, frågevariabler, förfrågans innehåll
- **Svarsdata** - Statuskod, svarshuvuden, svarsinnehåll, tidtagning
- **Resurstyper** - XHR/Fetch-förfrågningar, skript, stilmallar, bilder, och mer
- **Prestandamått** - Förfrågningarnas tidtagning, varaktighet och nätverksvattenfall

Detta är ovärderligt för att felsöka API-problem, identifiera långsamma förfrågningar, validera datanyttolaster och förstå din applikations nätverksbeteende under tester.

## Demo

### 🌐 Nätverksloggar
![Network Logs Overview](./demo/network-logs-1.gif)

![Network Logs Details](./demo/network-logs-2.gif)