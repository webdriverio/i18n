---
id: introduction
title: Wprowadzenie
description: "Poznaj ogólny zarys testowania end-to-end aplikacji Flutter na Androidzie i iOS z użyciem WebdriverIO, Appium oraz Appium Flutter Driver."
---

Ten przewodnik omawia konfigurowanie, strukturyzowanie i uruchamianie testów End-to-End (E2E) dla aplikacji **Flutter** przy użyciu **WebdriverIO** i **Appium**.

WebdriverIO udostępnia framework testowy oparty na Node.js z natywnym wsparciem dla protokołów WebDriver i Appium, co pozwala automatyzować aplikacje Flutter zarówno na Androidzie, jak i na iOS.

---

### Wyzwanie architektoniczne: dlaczego Flutter jest inny

Podczas automatyzacji standardowych natywnych aplikacji mobilnych (Kotlin/Java na Androidzie lub Swift/Objective-C na iOS) sterowniki Appium (`UiAutomator2` dla Androida, `XCUITest` dla iOS) pełnią rolę punktu dostępu do inspekcji aplikacji i interakcji z nią, odpytując natywne drzewo dostępności systemu operacyjnego. Sterowniki te odczytują komponenty interfejsu na poziomie systemu (przyciski, pola wprowadzania, etykiety) i udostępniają je narzędziom inspekcyjnym oraz skryptom testowym za pomocą standardowych strategii lokalizowania, takich jak ID, Accessibility ID czy XPath.

Flutter działa inaczej:

Flutter nie korzysta z natywnych komponentów interfejsu systemu operacyjnego. Zamiast tego renderuje swój interfejs bezpośrednio na kanwie za pomocą wbudowanego silnika graficznego. Framework rysuje własne widżety piksel po pikselu.

#### Wpływ na tradycyjną automatyzację
Dla standardowych natywnych sterowników i inspektorów aplikacja Flutter często wygląda jak pojedyncza powierzchnia graficzna. Wewnętrzne widżety (takie jak przyciski czy pola tekstowe) domyślnie nie istnieją w drzewie dostępności systemu. W rezultacie standardowe natywne strategie lokalizowania nie mogą bezpośrednio wchodzić w interakcję z wewnętrznymi widżetami Fluttera.

---

### Jak WebdriverIO i Appium obsługują Fluttera

WebdriverIO i Appium dostarczają narzędzi niezbędnych do interakcji z wewnętrznym drzewem widżetów Fluttera, jednak musisz zainstalować i skonfigurować odpowiedni sterownik oraz rozszerzenia lokatorów dla swojego projektu.

Dzięki [Appium Flutter Driver](https://github.com/appium/appium-flutter-driver) Appium łączy się z rozszerzeniem testowym Fluttera (`flutter_driver`). Zapewnia to dostęp do specyficznych dla Fluttera strategii lokalizowania (Finders), w tym:

* `byValueKey`: Lokalizuje widżety na podstawie ich jawnie określonego `Key` w kodzie Fluttera.
* `byText`: Lokalizuje widżety na podstawie widocznej treści tekstowej.
* `byTooltip`: Lokalizuje widżety na podstawie tekstu ich podpowiedzi (tooltip).

Kolejne sekcje omawiają wymagania wstępne, konfigurację środowiska oraz pisanie pierwszego zestawu testów.