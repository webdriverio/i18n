---
id: network-logs
title: Nätverksloggar
description: "Inspektera varje HTTP-förfrågan och -svar som DevTools fångar under ett test för att felsöka API-anrop, nyttolaster och långsamma förfrågningar."
---

Övervaka och inspektera all nätverksaktivitet under dina tester. DevTools fångar varje HTTP-förfrågan och -svar, vilket ger dig fullständig insyn i API-anrop, resursinläsning och nätverkstider – precis som webbläsarens DevTools.

**Vad som fångas:**
- **Förfrågningsdetaljer** - URL, metod, headers, frågeparametrar, förfrågningens body
- **Svarsdata** - Statuskod, svarets headers, svarets body, tidtagning
- **Resurstyper** - XHR/Fetch-förfrågningar, skript, stilmallar, bilder med mera
- **Prestandamått** - Förfrågningstider, varaktighet och nätverksvattenfall

Detta är ovärderligt för att felsöka API-problem, identifiera långsamma förfrågningar, validera datanyttolaster och förstå din applikations nätverksbeteende under tester.

## Demo

### 🌐 Nätverksloggar
![Network Logs](/img/devtools/network-logs.gif)