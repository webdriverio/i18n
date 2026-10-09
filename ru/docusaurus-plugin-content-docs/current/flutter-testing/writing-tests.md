---
id: writing-tests
title: Написание тестов
description: "Пишите тесты WebdriverIO для Flutter-приложений, переключаясь в контекст Flutter и взаимодействуя с виджетами через расширение flutter_driver."
---

В этом разделе описывается практическая структура создания автоматизированных тестовых сценариев и то, как напрямую взаимодействовать с внутренним деревом компонентов Flutter с помощью WebdriverIO.

### Зачем нужно переключение контекста?

При запуске сессии автоматизации с Appium драйвер начинает выполнение с отображения нативного контекста операционной системы, известного как `NATIVE_APP`. В этом контексте видна только нативная оболочка, в которую обёрнуто приложение (например, системная строка состояния или нативные диалоги Android/iOS).

Поскольку Flutter отрисовывает пользовательский интерфейс внутри изолированного Canvas, внутренние элементы невидимы в контексте `NATIVE_APP`. Чтобы отправлять команды напрямую в тестовое расширение Flutter (`flutter_driver`), необходимо явно переключить фокус автоматизации на контекст `FLUTTER`. Без этого переключения любая попытка найти виджет приведёт к ошибке «элемент не найден».

:::tip Лучшая практика: всегда переключайте контекст в `beforeEach`
Рекомендуется добавлять `await driver.switchContext('FLUTTER')` в хук `beforeEach` в каждом тестовом файле. Это гарантирует, что каждый тест начинает выполнение в контексте `FLUTTER`, и позволяет избежать нестабильности или утечки состояния, если предыдущий тест переключился на `NATIVE_APP` (например, для обработки диалогов разрешений ОС) или если сессия сбрасывает активный контекст.
:::

### Зачем нужен `appium-flutter-finder`?

Традиционные селекторы WebdriverIO, такие как `$('~selector')` или `$('#id')`, предназначены для поиска элементов с помощью стратегий, рассчитанных на веб-интерфейсы или нативные мобильные интерфейсы (например, resource ID или XPath).

Flutter управляет собственными внутренними элементами и использует собственные методы поиска (такие как `byValueKey`, `byText`, `byType`). Библиотека `appium-flutter-finder` необходима, поскольку она выступает в роли переводчика: она преобразует эти специфичные для Flutter стратегии поиска в сериализованный формат (Base64/JSON), который `appium-flutter-driver` может интерпретировать и выполнять внутри виртуальной машины Dart (VM).

### Практические примеры тестов

Мы описываем типичные сценарии использования `appium-flutter-finder` для поиска виджетов в сочетании с прямыми командами расширения, выполняемыми через `driver.execute('flutter:<command>')`.

:::info Команды и локаторы расширения Flutter Driver
`appium-flutter-driver` предоставляет специализированные команды для взаимодействия с Flutter-приложениями, в том числе:
- `flutter:waitFor`: ожидает, пока виджет станет видимым.
- `flutter:waitForAbsent`: ожидает исчезновения виджета.
- `flutter:scroll` / `flutter:scrollIntoView` / `flutter:scrollUntilVisible`: обеспечивают прокрутку в прокручиваемых представлениях.
- `flutter:setTextEntryEmulation`: настраивает поведение ввода текста.

Полный список доступных команд, параметров и возвращаемых типов см. в [документации по командам Appium Flutter Driver](https://github.com/appium/appium-flutter-driver#commands), [исходном коде Node.js Finder](https://github.com/appium/appium-flutter-driver/tree/main/finder/nodejs) и на странице [appium-flutter-finder в npm](https://www.npmjs.com/package/appium-flutter-finder).
:::

### Пример A — Простое взаимодействие (сценарий со счётчиком)

```typescript
// counter.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter Counter Flow', () => {

    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The counter should be successfully incremented by clicking the button.', async () => {
        const incrementButton = find.byTooltip('Increment');
        const counterText = find.byValueKey('counter_text');

        const initialValue = await driver.getElementText(counterText);
        expect(initialValue).toBe('0');

        await driver.elementClick(incrementButton);

        const finalValue = await driver.getElementText(counterText);
        expect(finalValue).toBe('1');
    });
});
```

### Пример B — Стабильная навигация (предотвращение тайм-аутов)

```typescript
// redirects.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter Redirects Flow', () => {

    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should be able to navigate between the Redirect Example views and back to the first view.', async () => {
        const buttonGoToRedirectExampleTwoView = find.byValueKey('redirect_example_two_button');
        await driver.elementClick(buttonGoToRedirectExampleTwoView);

        const redirectExampleTwoBody = find.byValueKey('redirect_example_two_body');
        await driver.execute('flutter:waitFor', redirectExampleTwoBody);
        const textRedirectExampleTwoBody = await driver.getElementText(redirectExampleTwoBody);
        expect(textRedirectExampleTwoBody).toBe('This is the Redirect Example Two View');

        const buttonGoBackToRedirectExampleView = find.byValueKey('redirect_example_two_back_button');
        await driver.elementClick(buttonGoBackToRedirectExampleView);

        const redirectExampleBody = find.byValueKey('redirect_example_body');
        await driver.execute('flutter:waitFor', redirectExampleBody);
        const textRedirectExampleBody = await driver.getElementText(redirectExampleBody);
        expect(textRedirectExampleBody).toBe('This is the Redirect Example View');
    });
});
```

### Пример C — Переключение контекстов (нативные диалоги ОС и разрешения)

```typescript
// native_dialog_context.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter & Native Context Switching Flow', () => {
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should trigger a native dialog, interact with OS controls, and return to Flutter context.', async () => {
        // 1. В контексте FLUTTER: нажать на виджет, который вызывает диалог разрешения или предупреждения на уровне ОС
        const buttonRequestPermission = find.byValueKey('request_permission_button');
        await driver.elementClick(buttonRequestPermission);

        // 2. Переключиться на контекст NATIVE_APP для взаимодействия с диалогом ОС
        await driver.switchContext('NATIVE_APP');

        // Найти и нажать нативную кнопку с помощью стандартных селекторов WebdriverIO
        const nativeAllowButton = await $('//*[@text="Allow" or @text="While using the app" or @label="Allow"]');
        await nativeAllowButton.waitForDisplayed();
        await nativeAllowButton.click();

        // 3. Вернуться в контекст FLUTTER, чтобы продолжить проверку виджетов Flutter
        await driver.switchContext('FLUTTER');

        const permissionStatusText = find.byValueKey('permission_status_text');
        await driver.execute('flutter:waitFor', permissionStatusText);
        const status = await driver.getElementText(permissionStatusText);
        expect(status).toBe('Permission Granted');
    });
});
```

## Процесс сборки и запуска

Чтобы последние изменения в коде Dart и ключах (Key) были видны тестам, всегда выполняйте следующие шаги:

```bash
flutter build apk -t lib/main_e2e.dart --debug
npx wdio run wdio.conf.ts
```

Примеры кода можно найти в репозитории: https://github.com/webdriverio/appium-boilerplate