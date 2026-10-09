---
id: network-logs
title: Logi sieciowe
description: "Sprawdzaj każde żądanie i odpowiedź HTTP przechwycone przez DevTools podczas testu, aby debugować wywołania API, payloady i wolne żądania."
---

Monitoruj i sprawdzaj całą aktywność sieciową podczas testów. DevTools przechwytuje każde żądanie i odpowiedź HTTP, zapewniając pełny wgląd w wywołania API, ładowanie zasobów i czasy sieciowe - tak jak narzędzia DevTools w przeglądarce.

**Co jest przechwytywane:**
- **Szczegóły żądania** - URL, metoda, nagłówki, parametry zapytania, treść żądania
- **Dane odpowiedzi** - kod statusu, nagłówki odpowiedzi, treść odpowiedzi, czas
- **Typy zasobów** - żądania XHR/Fetch, skrypty, arkusze stylów, obrazy i inne
- **Metryki wydajności** - czasy żądań, czas trwania i wykres kaskadowy sieci (waterfall)

Jest to nieocenione przy debugowaniu problemów z API, identyfikowaniu wolnych żądań, weryfikowaniu payloadów danych oraz zrozumieniu zachowania sieciowego aplikacji podczas testów.

## Demo

### 🌐 Logi sieciowe
![Network Logs](/img/devtools/network-logs.gif)