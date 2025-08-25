---
id: headless-and-xvfb
title: Headless i Xvfb z Testrunnerem
description: Jak WebdriverIO używa Xvfb do testów bezinterfejsowych na Linuksie, opcje konfiguracji, recepty CI i rozwiązywanie problemów.
---

Ta strona wyjaśnia, jak testrunner WebdriverIO obsługuje wykonywanie testów w trybie headless na Linuksie za pomocą Xvfb (X Virtual Framebuffer). Opisuje, kiedy Xvfb jest przydatny, jak go skonfigurować i jak zachowuje się w CI i Dockerze.

## Kiedy używać Xvfb vs natywny headless

- Używaj natywnego trybu headless (np. Chrome `--headless=...`) gdy to możliwe, aby zminimalizować obciążenie.
- Używaj Xvfb, gdy:
  - Testujesz Electron lub aplikacje wymagające menedżera okien lub środowiska pulpitu
  - Polegasz na GLX lub zachowaniach zależnych od menedżera okien
  - Twoje narzędzia oczekują serwera wyświetlania (`DISPLAY`)
  - Napotykasz błędy Chromium, takie jak:
    - `session not created: probably user data directory is already in use ...`
    - `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`
    Błąd kolizji katalogu danych użytkownika może być mylący, ponieważ często jest wynikiem awarii przeglądarki i natychmiastowego restartu, który ponownie używa tego samego katalogu profilu z poprzedniej instancji. Zapewnienie stabilnego wyświetlacza (np. za pomocą Xvfb) często rozwiązuje ten problem - jeśli nie, powinieneś przekazać unikalne `--user-data-dir` dla każdego workera.

## Konfiguracja

Cztery opcje runnera kontrolują zachowanie Xvfb:

- `autoXvfb` (boolean, domyślnie: true)
  - Autorytatywny przełącznik używania. Jeśli `false`, runner nigdy nie używa Xvfb.
  - Jeśli `true`, runner może używać Xvfb, gdy jest to potrzebne.

- `xvfbAutoInstall` (boolean, domyślnie: false)
  - Włącza automatyczną instalację `xvfb-run`, jeśli brakuje
  - Gdy false, runner ostrzeże i będzie kontynuować bez instalacji

- `xvfbAutoInstallMode` ('root' | 'sudo', domyślnie: 'sudo')
  - 'root': instalacja tylko jeśli działa jako root (bez sudo)
  - 'sudo': pozwala na nieinteraktywne sudo (`sudo -n`), jeśli nie jest rootem; pomija, jeśli brakuje sudo

- `xvfbAutoInstallCommand` (string | string[], opcjonalne)
  - Niestandardowe polecenie do użycia podczas instalacji zamiast wbudowanej detekcji menedżera pakietów
  - Po podaniu, to polecenie jest wykonywane bez zmian i zastępuje wbudowaną logikę instalacji

- `xvfbMaxRetries` (number, domyślnie: 3)
  - Liczba prób ponowienia dla awarii procesu xvfb.
  - Przydatne w niestabilnych środowiskach CI, gdzie uruchomienie Xvfb może czasami się nie powieść.

- `xvfbRetryDelay` (number, domyślnie: 1000)
  - Podstawowe opóźnienie między ponownymi próbami w milisekundach dla awarii procesu xvfb.
  - Używa progresywnego opóźnienia: opóźnienie × numer próby (np. 1000ms, 2000ms, 3000ms, itd.).

Przykłady:

```ts
export const config: WebdriverIO.Config = {
  // Użyj Xvfb, gdy potrzebne
  autoXvfb: true,

  // Automatycznie zainstaluj pakiety Xvfb używając sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // Użyj Xvfb, gdy potrzebne
  autoXvfb: true,

  // Automatycznie zainstaluj pakiety Xvfb używając niestandardowego polecenia i sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',
  xvfbAutoInstallCommand: 'curl -L https://github.com/X11/xvfb/releases/download/v1.20.14/xvfb-linux-x64.tar.gz | tar -xz -C /usr/local/bin/',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // Użyj Xvfb, gdy potrzebne
  autoXvfb: true,

  // Automatycznie zainstaluj pakiety Xvfb używając sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  // Skonfiguruj zachowanie ponownych prób dla niestabilnych środowisk CI
  xvfbMaxRetries: 5,
  xvfbRetryDelay: 1500,

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

## Logika wykrywania

- Runner rozważa użycie Xvfb, gdy:

  - Działa na Linuksie
  - Nie jest ustawiony `DISPLAY` (środowisko headless), lub przekazano flagi przeglądarki headless

- Jeśli `DISPLAY` jest ustawiony, runner domyślnie nie wymusza Xvfb i będzie honorował istniejący serwer X/menedżer okien.

Uwagi:
- `autoXvfb: false` całkowicie wyłącza użycie Xvfb (brak opakowywania za pomocą `xvfb-run`).
- `xvfbAutoInstall` wpływa tylko na instalację, jeśli brakuje `xvfb-run`; nie włącza/wyłącza używania.
- `xvfbAutoInstallMode` kontroluje metodę instalacji: 'root' dla instalacji tylko jako root, 'sudo' dla instalacji opartych na sudo (domyślnie: 'sudo').
- Wbudowane instalacje pakietów są zawsze nieinteraktywne. Tylko jako root, chyba że zdecydujesz się na tryb 'sudo'.
- Mechanizm ponownych prób używa progresywnych opóźnień: `xvfbRetryDelay × numer próby` (np. 1000ms, 2000ms, 3000ms, itd.).

## Używanie istniejącego DISPLAY w CI

Jeśli twoje CI konfiguruje własny serwer X/menedżer okien (np. z `Xvfb :99` i WM), możesz:

- Pozostawić `autoXvfb: true` i upewnić się, że `DISPLAY` jest wyeksportowany; runner będzie go honorował i unikał opakowywania.
- Albo ustawić `autoXvfb: false`, aby jawnie wyłączyć jakiekolwiek zachowanie Xvfb ze strony runnera.

## Recepty CI i Docker

GitHub Actions (używając natywnego headless):

```yaml
- name: Run tests
  run: npx wdio run ./wdio.conf.ts
```

GitHub Actions (wirtualny wyświetlacz przez Xvfb, jeśli brakuje i opcja jest włączona):

```ts
// wdio.conf.ts
export const config = {
  autoXvfb: true,
  xvfbAutoInstall: true
}
```

Docker (przykład Ubuntu/Debian – preinstalacja xvfb):

```Dockerfile
RUN apt-get update -qq && apt-get install -y xvfb
```

Dla innych dystrybucji dostosuj menedżera pakietów i nazwę pakietu odpowiednio (np. `dnf install xorg-x11-server-Xvfb` na Fedora/RHEL, `zypper install xvfb-run` na openSUSE/SLE).

## Wsparcie automatycznej instalacji (xvfbAutoInstall)

Gdy włączona jest opcja `xvfbAutoInstall`, WebdriverIO próbuje zainstalować `xvfb` przy użyciu menedżera pakietów twojego systemu. Obsługiwane są następujące menedżery i pakiety:

| Menedżer pakietów | Polecenie        | Dystrybucje (przykłady)                                   | Nazwa pakietu/ów                 |
|-----------------|-----------------|-------------------------------------------------------------|----------------------------------|
| apt             | `apt-get`       | Ubuntu, Debian, Pop!_OS, Mint, Elementary, Zorin, etc.      | `xvfb`                           |
| dnf             | `dnf`           | Fedora, Rocky Linux, AlmaLinux, Nobara, Bazzite, etc.       | `xorg-x11-server-Xvfb`           |
| yum             | `yum`           | CentOS, RHEL (legacy)                                       | `xorg-x11-server-Xvfb`           |
| zypper          | `zypper`        | openSUSE, SUSE Linux Enterprise                             | `xvfb-run`                       |
| pacman          | `pacman`        | Arch Linux, Manjaro, EndeavourOS, CachyOS, etc.             | `xorg-server-xvfb`               |
| apk             | `apk`           | Alpine Linux, PostmarketOS                                  | `xvfb-run`                       |
| xbps-install    | `xbps-install`  | Void Linux                                                  | `xvfb`                           |

Uwagi:
- Jeśli twoje środowisko używa innego menedżera pakietów, instalacja nie powiedzie się z błędem; zainstaluj `xvfb` ręcznie.
- Nazwy pakietów są specyficzne dla dystrybucji; tabela odzwierciedla powszechne nazwy w każdej rodzinie.

## Rozwiązywanie problemów

- "xvfb-run nie uruchomił się"
  - Runner automatycznie ponawia próby w przypadku awarii związanych z Xvfb z progresywnym opóźnieniem. Jeśli awarie utrzymują się, zwiększ `xvfbMaxRetries` i `xvfbRetryDelay` dla niestabilnych środowisk.

- Xvfb został nieoczekiwanie opakowany w CI
  - Jeśli masz niestandardową konfigurację `DISPLAY` / WM, ustaw `autoXvfb: false` lub upewnij się, że `DISPLAY` jest wyeksportowany przed uruchomieniem runnera.

- Brakujący `xvfb-run`
  - Pozostaw `xvfbAutoInstall: false`, aby uniknąć modyfikowania środowiska; zainstaluj przez swój obraz bazowy lub ustaw `xvfbAutoInstall: true`, aby się włączyć.

- Częste awarie uruchamiania Xvfb w CI
  - Zwiększ `xvfbMaxRetries` (np. do 5-10) i `xvfbRetryDelay` (np. do 2000ms), aby uzyskać bardziej odporną pracę w niestabilnych środowiskach.

## Zaawansowane

- Runner tworzy procesy za pomocą fabryki, która opakowuje worker node za pomocą `xvfb-run`, jeśli Xvfb jest potrzebny i dostępny.
- Flagi przeglądarki headless (Chrome/Edge/Firefox) sygnalizują używanie trybu headless i mogą wywołać Xvfb w środowiskach bez `DISPLAY`.