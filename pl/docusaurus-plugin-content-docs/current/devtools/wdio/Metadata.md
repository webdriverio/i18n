---
id: metadata
title: Metadane
description: "Sprawdzaj możliwości (capabilities), środowisko i czas wykonania każdej sesji przeglądarki w zakładce Metadata w DevTools, aby diagnozować błędy specyficzne dla danego środowiska."
---

Sprawdzaj pełny kontekst każdej sesji przeglądarki otwieranej przez Twój test. Zakładka Metadata prezentuje możliwości (capabilities), środowisko i czas wykonania każdego uruchomienia, dzięki czemu możesz dokładnie potwierdzić, co było testowane, bez przekopywania się przez logi.

**Co jest rejestrowane:**
- **Capabilities sesji** - Nazwa i wersja przeglądarki, platforma oraz wynegocjowane capabilities WebDriver
- **Szczegóły sesji** - ID sesji, bazowy URL i rozmiar viewportu
- **Czas wykonania** - Czas trwania testu, status oraz znaczniki czasu rozpoczęcia i zakończenia
- **Widok dla każdej sesji** - Każda sesja przeglądarki (w tym sesje utworzone przez `browser.reloadSession()`) jest przechowywana niezależnie i można ją wybrać z listy rozwijanej

Jest to nieocenione przy diagnozowaniu błędów specyficznych dla danego środowiska, weryfikowaniu, czy zastosowano właściwe capabilities, oraz zrozumieniu, jak zachowywały się testy wykorzystujące wiele sesji.

## Demo

### 📋 Metadane
![Metadata Demo](/img/devtools/metadata.gif)