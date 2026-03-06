---
id: network-logs
title: Logi sieciowe
---

Monitoruj i sprawdzaj całą aktywność sieciową podczas testów. DevTools przechwytuje każde żądanie HTTP i odpowiedź, zapewniając pełną widoczność wywołań API, ładowania zasobów i czasu sieciowego - dokładnie tak jak narzędzia deweloperskie przeglądarki.

**Co jest przechwytywane:**
- **Szczegóły żądań** - URL, metoda, nagłówki, parametry zapytania, treść żądania
- **Dane odpowiedzi** - Kod statusu, nagłówki odpowiedzi, treść odpowiedzi, czas
- **Typy zasobów** - Żądania XHR/Fetch, skrypty, arkusze stylów, obrazy i więcej
- **Metryki wydajności** - Czas żądania, czas trwania i wodospad sieciowy

Jest to nieocenione przy debugowaniu problemów z API, identyfikacji wolnych żądań, walidacji przesyłanych danych i zrozumieniu zachowania sieciowego aplikacji podczas testów.

## Demo

### 🌐 Logi sieciowe
![Przegląd logów sieciowych](pathname://./demo/network-logs-1.gif)

![Szczegóły logów sieciowych](pathname://./demo/network-logs-2.gif)