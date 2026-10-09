---
id: base-appium-configuration
title: Podstawowa konfiguracja Appium
description: "Zainstaluj usługę Appium oraz pakiet Flutter finder i skonfiguruj podstawowe ustawienia Appium do testowania aplikacji Flutter za pomocą WebdriverIO."
---

WebdriverIO wykorzystuje Appium do uruchamiania testów na emulatorach i symulatorach mobilnych oraz na rzeczywistych urządzeniach. `@wdio/appium-service` automatycznie zarządza cyklem życia serwera Appium podczas wykonywania testów.

Informacje na temat ogólnej konfiguracji Appium i opcji capabilities znajdziesz w [dokumentacji usługi Appium](https://webdriver.io/docs/appium-service/).

## Instalowanie zależności

Aby testować aplikacje Flutter, zainstaluj usługę Appium oraz pakiet Flutter finder:

```bash
npm install --save-dev @wdio/appium-service appium appium-flutter-finder
```

### Instalowanie sterownika Appium Flutter Driver

Sterownik Appium Flutter Driver (`appium-flutter-driver`) możesz zainstalować na jeden z dwóch sposobów:

#### Opcja 1: Jako zależność deweloperska (zalecane dla CI/CD)

Dodanie sterownika bezpośrednio do `devDependencies` zapewnia, że wszyscy członkowie zespołu oraz potoki CI/CD będą mieli sterownik zainstalowany automatycznie, bez konieczności wykonywania dodatkowych kroków konfiguracyjnych:

```bash
npm install --save-dev appium-flutter-driver
```

> Możesz również zainstalować wszystkie wymagane pakiety jednocześnie za pomocą jednego polecenia:
> ```bash
> npm install --save-dev @wdio/appium-service appium appium-flutter-finder appium-flutter-driver
> ```

#### Opcja 2: Za pomocą Appium CLI (konfiguracja lokalna)

Alternatywnie możesz zainstalować sterownik lokalnie w swoim środowisku Appium, korzystając z Appium CLI:

```bash
npx appium driver install flutter
```

### Przegląd pakietów

Te pakiety zapewniają:
- **`@wdio/appium-service` i `appium`**: Uruchamiają serwer Appium i zarządzają nim podczas wykonywania testów.
- **`appium-flutter-driver`**: Sterownik Appium odpowiedzialny za komunikację z rozszerzeniem testowym Fluttera.
- **`appium-flutter-finder`**: Biblioteka pomocnicza udostępniająca strategie lokalizowania specyficzne dla Fluttera (`byValueKey`, `byText`, `byTooltip`).