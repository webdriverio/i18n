---
id: wdio-roku-service
title: Usługa Roku
custom_edit_url: https://github.com/theREDspace/wdio-roku-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-roku-service to pakiet zewnętrzny, więcej informacji znajdziesz na [GitHub](https://github.com/theREDspace/wdio-roku-service) | [npm](https://www.npmjs.com/package/wdio-roku-service)
Ta usługa nadpisuje wiele części WebdriverIO, aby umożliwić ich użycie z aplikacjami Roku, oraz zapewnia dostęp do [Roku ECP](https://developer.roku.com/en-ca/docs/developer-program/dev-tools/external-control-api.md) do sterowania urządzeniem Roku podczas testowania.

## Wymagania

### Roku
Kanał testowy/channel.zip i urządzenie Roku (z włączonym trybem deweloperskim) w tej samej sieci co twój komputer Mac.

### WebdriverIO
To nie jest samodzielny produkt -- jest używany jako wtyczka do frameworka testowego WebdriverIO (lub Usługa, w ich nomenklaturze). Przed użyciem należy przejść przez konfigurację WDIO, uruchamiając `npm init wdio@latest`.

Podczas konfiguracji, aby nie musieć przechodzić przez wszystkie pytania/opcje, możesz wybrać następujące opcje podczas fazy inicjalizacji:
- Roku Testing (UWAGA: Użyj tego, jeśli Twoje repozytorium będzie używane tylko do testowania Roku, ponieważ stanie się domyślną i jedyną zainstalowaną usługą. W przeciwnym razie użyj E2E Testing, aby móc zainstalować wiele usług.)
- On my local machine (tylko E2E)
- Web (tylko E2E)
- Chrome (tylko E2E)
- Mocha
- Typescript [moduły działają zarówno dla TS i JS, więc wybierz dowolny]
- autogenerate some test files (Y)
-- domyślna lokalizacja
- page objects (Y)
-- domyślna lokalizacja
- spec reporter
- additional plugins (N)
- Visual Testing (N)
- services (roku)
- npm install (Y)

### Konfiguracja Typescript
Jeśli chcesz używać Typescript do pisania testów, musisz upewnić się, że następujące opcje są ustawione w pliku tsconfig.json wygenerowanym przez Webdriverio.
```
"moduleResolution": "nodenext",
"module": "NodeNext",
```
Następnie możesz używać usługi importując ją do swoich testów, jak opisano poniżej.

### Konfiguracja WDIO
Obecnie testowanie jest obsługiwane tylko dla jednego urządzenia Roku. Wymagane są następujące aktualizacje konfiguracji:
* `maxInstances` i `maxInstancesPerCapability` powinny wynosić 1. Automatyczne testowanie na wielu urządzeniach nie jest obsługiwane i spowoduje powielanie poleceń wysyłanych do Roku. Powinna być tylko jedna możliwość.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {

maxInstances: 1,

    capabilities: [{
        browserName: 'chrome'
        // lub jeśli chcesz tryb headless:
        browserName: 'chrome',
        'goog:chromeOptions': { 
            args: ['--headless', '--disable-gpu']
        }
    }],
    //...
}
```

* Zaleca się zwiększenie `waitforInterval` i `waitforTimeout`, ponieważ każdy interwał wymaga pobrania xml z Roku. Aby lepiej wykorzystać funkcję `browser.debug()`, możesz również wydłużyć limit czasu testrunner mocha do 5+ minut na potrzeby rozwoju.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {
    waitforTimeout: 30000,
    
    //opcjonalne:
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000
    },
    //...
}
```

Jesteś gotowy do napisania swojego pierwszego testu!

```js
import { installFromZip } from 'wdio-roku-service/install'
import { exitChannel } from 'wdio-roku-service/channel'
import { Buttons, keyPress, keySequence } from 'wdio-roku-service/controller'

describe('first test', () => {
    before('On the landing screen of the test channel', async () => {
        await installFromZip(process.env.ROKU_APP_PATH)
    })

    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
    })

    after('should return to home', async () => {
        await exitChannel()
    })
})

```

Zachęca się również do korzystania z funkcji `browser.debug()` w wdio, aby zatrzymać test w celu debugowania i tworzenia testów:

```js
// ...
    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
        await browser.debug()
        // test zatrzymuje się, dostępny staje się REPL do poleceń

```
Jeśli chrome nie jest w trybie headless, możesz zobaczyć ostatni raz, gdy wywołano `openRokuXML()` (prawdopodobnie przez `waitForX` lub `expect`). Używając REPL w terminalu, możesz korzystać z dowolnych prawidłowych poleceń `$` i kilku niestandardowych (`browser.openRokuXML()` i `browser.saveScreenshot('path/to/ss.jpg')`) -- klasa `controller` nie jest dołączona do obiektu `browser`, więc obecnie nie możesz ich używać. Na szczęście prawdopodobnie siedzisz obok Roku i masz pilota, którego możesz użyć do nawigacji i od czasu do czasu wywołać `browser.openRokuXML()`, aby zobaczyć, co stało się ze stanem strony! Pamiętaj, że XML działa natywnie z xpathing w przeglądarce chrome, więc możesz oceniać/rozwijać swoje selektory bezpośrednio w konsoli chrome podczas debugowania.

### .env
Zobacz plik `.env.example`. Skopiuj go i zmień nazwę na `.env` w swoim projekcie WebdriverIO, który korzysta z tej usługi. Prawdopodobnie będziesz chciał dodać go również do .gitignore.

* `ROKU_IP` powinien być adresem IP twojego Roku. Polecenia będą używać tego IP do komunikacji z nim. Jest to wymagane.
* `ROKU_USER` i `ROKU_PW`: Dane logowania są potrzebne do instalacji archiwum, a także do robienia zrzutów ekranu.
* `ROKU_APP_PATH` powinien być bezwzględną ścieżką do pliku zip kanału Roku.
* `ROKU_CHANNEL_ID` powinien być identyfikatorem kanału twojego kanału Roku (zwykle jest to "dev").
* `DEBUG=wdio-roku-service` włączy komunikaty debugowania. Usuń '#' na początku wiersza, jeśli ich potrzebujesz.

## Zmienione funkcje
### Browser
* `waitUntil` będzie pobierać xml z Roku przy każdej iteracji, aby sprawdzić zmiany.
* `saveScreenshot` pobierze zrzut ekranu bieżącego ekranu z Roku. Warto zauważyć, że te zrzuty ekranu są w formacie .jpg, a nie .png, którego zwykle używa WebdriverIO.
* `openRokuXML` pobierze xml z Roku, jeśli musisz to zrobić ręcznie, a nie za pomocą waits.

### Elements
* Wszystkie oczekiwania są obsługiwane w ten sam sposób jak Browser. `waitForClickable` jest mapowane na `waitForDisplayed`, a `waitForStable` jest mapowane na `waitForExist`.
* `click`, `doubleClick` i `moveTo` nie są obsługiwane. Musisz ręcznie nawigować po aplikacji.
* `isFocused` sprawdzi, czy atrybut `focused` na elemencie ma wartość true.
* `isDisplayed` sprawdzi atrybut `bounds` na elemencie i czy `visible` nie jest ustawione na false. Jeśli `withinViewport` jest ustawione, granice zostaną porównane z rozmiarem ekranu Roku.
* `getSize` i `getLocation` pobierają wartości z atrybutu `bounds`, zwracając 0 dla rozmiaru i -Infinity dla pozycji, jeśli atrybut nie istnieje.

Inne funkcje nie zostały zmienione, ale wiele z nich nadal działa zgodnie z oczekiwaniami.

### Matchers
Większość matcherów została zaktualizowana, aby pobierać xml podczas oczekiwania. Niektóre mają nieco inną funkcjonalność.
* `toBeDisplayed`, `toBeDisplayedInViewport`, `toBeFocused`, `toBeExisting`, `toBePresent`, `toExist`, `toHaveSize`, `toHaveWidth`, `toHaveHeight` i `toHaveAttribute` działają zgodnie z oczekiwaniami, z uwzględnieniem zmian w Element.
* `toHaveElementProperty` jest mapowane na `toHaveAttribute`.
* `toHaveElementClass` sprawdza atrybut `name` elementu.
* `toHaveId` jest mapowane na `toHaveElementClass`.
* `toHaveText` sprawdza atrybut `text` elementu.
* `toHaveChildren` sprawdza atrybut `children` elementu.
* `toHaveHTML` będzie traktować xml tak, jakby był HTML, choć prawdopodobnie nie jest zbyt przydatny.

Następujące nie są obecnie obsługiwane:
* `toBeSelected` - Może być obsługiwane wkrótce po określeniu, jak wygląda xml dla wybranych przycisków, jeśli jest różnica.
* `toBeChecked` - Może być obsługiwane wkrótce po określeniu, jak wygląda xml dla zaznaczonych pól wyboru, jeśli jest różnica.
* `toHaveComputedLabel` - Jeśli masz odpowiednik tego na elementach Roku, sprawdź atrybut za pomocą `toHaveAttribute`.
* `toHaveComputedRole` - Jeśli masz odpowiednik tego na elementach Roku, sprawdź atrybut za pomocą `toHaveAttribute`.
* `toHaveHref` - Jeśli masz URL-e na elementach Roku, sprawdź atrybut za pomocą `toHaveAttribute`.
* `toHaveStyle` - Elementy xml nie mają stylów.
* `toHaveClipboardText` - To nie jest znane.
* `toHaveTitle` - Tytuł będzie losowo wygenerowaną tymczasową nazwą pliku xml.
* `toHaveUrl` - URL będzie ścieżką do pliku xml na twoim komputerze.

## Użycie
### Instalacja kanału

Wymaga to, aby kanał miał przypisany identyfikator.
```js
import { installByID } from 'wdio-roku-service/install';

async before() {
    await installByID(process.env.ROKU_CHANNEL_ID);
}
```

Instalacja z archiwum

Zaleca się przechowywanie ścieżki w pliku .env, szczególnie jeśli masz wielu programistów, którzy mogą mieć różne lokalizacje i/lub nazwy plików.
```js
import { installFromZip } from 'wdio-roku-service/install';

async before() {
    await installFromZip(process.env.ROKU_ARCHIVE_PATH);
}
```

Kanał preinstalowany

Jeśli zainstalowałeś kanał samodzielnie przed testowaniem, możesz po prostu go uruchomić.
```js
import { launchChannel, exitChannel } from 'wdio-roku-service/channel';

async before() {
    // Zamknij kanał, jeśli jest już otwarty. Jeśli kanał obsługuje natychmiastowe wznawianie, zostanie tylko przeniesiony w tło
    await exitChannel();
    // Użycie identyfikatora kanału 'dev' uruchomi sideloadowaną aplikację.
    await launchChannel('dev');
}
```

### Testowanie
`wdio-roku-service/controller` zapewnia możliwość wysyłania naciśnięć przycisków do Roku. `keySequence` jest główną funkcją, wysyłającą kilka naciśnięć przycisków w sekwencji.
```js
import { Buttons, keySequence } from 'wdio-roku-service/controller';

// Nawigacja przez aplikację
await keySequence(Buttons.LEFT, Buttons.LEFT, Buttons.SELECT, Buttons.DOWN, Buttons.SELECT);
// Pobierz aktualny interfejs aplikacji z Roku i załaduj go do przeglądarki
await browser.openRokuXML();
// Lub użyj oczekiwań, które będą wielokrotnie ładować XML, aż upłynie limit czasu lub warunek zostanie spełniony
await browser.waitUntil(condition);
await element.waitForDisplayed();
// używaj matcherów WDIO na XML Roku, jakby to była strona internetowa
await expect(element).toHaveAttr('focused');
```

`wdio-roku-service/controller` ma również funkcje do przytrzymywania lub zwalniania przycisków oraz wprowadzania tekstu za pomocą klawiatury.
```js
import { Buttons, keyboardInput, keyPress, keySequence } from 'wdio-roku-service/controller';

await keySequence(Buttons.DOWN, Buttons.DOWN, Buttons.SELECT);
await keyboardInput('example');
await keyPress(Buttons.ENTER);
await browser.openRokuXML();
```

### Deeplinking
`wdio-roku-service/channel` zapewnia funkcjonalność związaną z kanałem. `inputChannel` pozwala wysyłać dowolne informacje do aplikacji.
```js
import { exitChannel, launchChannel, MediaType } from 'wdio-roku-service/channel';
await exitChannel();
await launchChannel(process.env.ROKU_CHANNEL_ID, myContent, MediaType.MOVIE, {myExtraParameter:true});
await expect(MyContent.header).toBeDisplayed();
```

### Inne funkcje
`wdio-roku-service/info` zapewnia różne funkcje, takie jak pobieranie ikony aplikacji lub osieroconych węzłów.
```js
import { getAppIcon } from 'wdio-roku-service/info';
const response = await getAppIcon(process.env.ROKU_CHANNEL_ID);
expect(response.headers.get('Content-Type')).toBe('image/jpg');
```
`wdio-roku-service/ecp` to bezpośredni interfejs z ECP, jeśli potrzebujesz zrobić coś bardzo specyficznego.
```js
import { ECP } from 'wdio-roku-service/ecp';
await ECP('search/browse?keyword=voyage&type=movie&tmsid=MV000058030000', 'POST');
```

## Typowe pułapki
* Elementy Roku mają swój tekst w atrybucie 'text', a nie między tagami. Podczas korzystania z selektorów, `$('element=Text')` nie zadziała dla prawie każdego elementu. Zamiast tego, musisz użyć `$('element[text=Text]')`.

## Plan rozwoju funkcji
* Wkrótce zostanie złożony PR, który umożliwi instalację tej usługi podczas ankiety `npm init wdio@latest`.
* Obecnie oceniana jest komunikacja Socket z Roku, dzięki czemu można będzie narzędziować więcej funkcji, takich jak środki do wybudzania śpiącego Roku.
* Funkcja(-e) proxy sieciowego, które pozwalają na kluczowanie aktywności sieciowej.

## Wykorzystanie raportowania Allure z dołączonymi zrzutami ekranu i plikami XML

Domyślnie, raportowanie Allure nie ma konfiguracji umożliwiającej generowanie zrzutów ekranu aplikacji lub kopii kodu XML reprezentującego aktualny stan aplikacji Roku w dowolnym momencie wykonywania testu. Poniższa dokumentacja wyjaśnia, jak rozwiązać ten problem, aby zrzut ekranu bieżącego stanu aplikacji był generowany i dołączany do raportu Allure za każdym razem, gdy test `it` kończy swoje wykonanie. Pozwala również uzyskać migawkę źródłową XML reprezentującego aktualny stan aplikacji Roku za każdym razem, gdy wykonanie testu `it` kończy się niepowodzeniem.

Pełna dokumentacja dotycząca Allure Reporter znajduje się na stronie @wdio/allure-reporter https://webdriver.io/docs/allure-reporter/

### Zależność Utils.js
Dodaj następujący kod do pliku o nazwie `Utils.js`. Ten plik może znajdować się w folderze `/helpers` lub podobnym.
```js
/**
 * Returns a string representation of the 'now' timestamp in milliseconds for the epoch.
 */
export const getEpochTimestamp = async () => {
    return Date.now().toString()
}

/**
 * Returns a string representation of the 'now' timestamp following the pattern: {YYYY}-{MM}-{DD}_{hour in 24H}-{Minute}-{Second}-{Milliseconds}
 */
export const getLongFormatTimestamp = async () => {
    const now = new Date(Date.now())
    const result = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}`
    return result
}

/**
 * An object containing the string representations of possible file extensions used for reporting purposes.
 */
export const FILE_EXTENSIONS = {
    JPG: '.jpg',
    XML: '.xml'
}

/**
 * An object containing the string representations of possible MIME types used for reporting purposes.
 */
export const FILE_MIME_TYPES = {
    JPG: 'image/jpeg',
    XML: 'application/xml'
}

/**
 * A function to generate a filename with a possible prefix, a timestamp and one of the possible extensions provided.
 * @param {string} fileExtension Use one of the values from the FILE_EXTENSIONS object defined previously.
 * @param {string} [fileNamePrefix] A prefix to be appended at the beginning of the filename if provided.  Defaults to an empty string.
 */
export const getFileNameWithTimestamp = async (fileExtension, fileNamePrefix = '') => {
    return (fileNamePrefix !== '')
        ? `${fileNamePrefix}_${await getLongFormatTimestamp()}${fileExtension}`
        : `${await getLongFormatTimestamp()}${fileExtension}`
}

```

### Kod wdio.conf.js
Dodaj następujące instrukcje importu do pliku `wdio.conf.js`:
```js
import { readFile, rm } from 'node:fs/promises'
import { addAttachment } from '@wdio/allure-reporter'
import { FILE_EXTENSIONS, FILE_MIME_TYPES, getFileNameWithTimestamp } from './<Utils.js file path>/Utils.js'  // Zamień <Utils.js file path> na rzeczywistą względną ścieżkę do pliku Utils.js

```

Zdefiniuj następujący hook `afterTest` w pliku `wdio.conf.js`. Jeśli masz już działający kod w tym hooku, dołącz poniższy kod.
```js
afterTest: async function (test, context, result) {
        // Screenshot saving and attaching logic regardless of test outcome.
        const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.JPG)
        try {
            const tempScreenshotPath = `./allure-results/${fileName}`
            await browser.saveScreenshot(tempScreenshotPath)
            const screenShotData = await readFile(tempScreenshotPath)
            addAttachment(`${fileName}`, screenShotData, FILE_MIME_TYPES.JPG)
            await rm(tempScreenshotPath).catch((rmError) => {
                console.error(`Failed to remove file: ${tempScreenshotPath}`, rmError)
            })
        } catch (error) {
            console.error('Error handling screenshot or attachment: ', error)
        }

        // XML attaching logic on test failure.
        if (result.passed === false) {
            const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.XML, 'AppStateAfterTestFail')
            const rawSourceString = String(await browser.getPageSource())
            const extractedXMLSubstring = '<?xml version="1.0" encoding="UTF-8" ?>\n'.concat(rawSourceString.substring(rawSourceString.search('<app-ui xmlns="">'), rawSourceString.search('</app-ui>')).concat('</app-ui>')).replace('<app-ui xmlns="">', '<app-ui>')
            try {
                addAttachment(`${fileName}`, extractedXMLSubstring, FILE_MIME_TYPES.XML)
            } catch (error) {
                console.log(error)
            }
        }
    },
```

### Oczekiwane zachowanie
Dzięki temu kodowi w konfiguracji projektu, oczekuje się, że za każdym razem, gdy test `it` jest uruchamiany, niezależnie od wyniku testu, zrzut ekranu zostanie wykonany na końcu przebiegu i dołączony do odpowiedniej sekcji w raporcie Allure. W konkretnym przypadku, gdy test nie powiedzie się, migawka źródłowa stanu aplikacji w formacie XML zostanie również dołączona do sekcji testu w raporcie Allure.

### Uwagi
* Raporty Allure domyślnie obsługują zrzuty ekranu w formacie `.png`. Nadpisane metody w tej usłudze obsługują obrazy w formacie `.jpg`.
* Załączniki XML można przeglądać w samym raporcie Allure lub otworzyć w osobnej karcie przeglądarki.