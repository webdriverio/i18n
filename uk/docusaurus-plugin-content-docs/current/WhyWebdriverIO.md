---
id: why-webdriverio
title: Чому Webdriver.IO?
---

WebdriverIO - це прогресивний фреймворк автоматизації, створений для автоматизації сучасних веб- та мобільних додатків. Він спрощує взаємодію з вашим додатком і надає набір плагінів, які допомагають створити масштабований, надійний і стабільний набір тестів.

Він розроблений, щоб бути:

- __Розширюваним__ - Додавання допоміжних функцій або більш складних наборів і комбінацій існуючих команд є __простим__ і __дуже корисним__
- __Сумісним__ - WebdriverIO можна запускати за допомогою [WebDriver Protocol](https://w3c.github.io/webdriver/) для __справжнього кросбраузерного тестування__, а також [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) для автоматизації на основі Chromium за допомогою [Puppeteer](https://pptr.dev/).
- __Багатим на функції__ - Велика різноманітність вбудованих та спільнотних плагінів дозволяє __легко інтегрувати__ та __розширювати__ ваше налаштування для виконання ваших вимог.

Ви можете використовувати WebdriverIO для автоматизації:

- 🌐 <span>&nbsp;</span> __сучасних веб-додатків__, написаних на React, Vue, Angular, Svelte або інших фронтенд-фреймворках
- 📱 <span>&nbsp;</span> __гібридних__ або __нативних мобільних додатків__, що працюють в емуляторі/симуляторі або на реальному пристрої
- 💻 <span>&nbsp;</span> __нативних настільних додатків__ (наприклад, написаних з Electron.js)
- 📦 <span>&nbsp;</span> __модульного тестування або тестування компонентів__ веб-компонентів у браузері

## Базується на веб-стандартах

WebdriverIO використовує можливості протоколів [WebDriver](https://w3c.github.io/webdriver/) та [WebDriver-BiDi](https://github.com/w3c/webdriver-bidi), які розробляються та підтримуються всіма виробниками браузерів і гарантують справжнє кросбраузерне тестування. У той час як інші інструменти автоматизації вимагають від вас завантаження модифікованих браузерних двигунів, які не використовуються реальними користувачами, або емулюють поведінку користувача шляхом ін'єкції JavaScript, WebdriverIO покладається на узгоджений стандарт автоматизації, який [належним чином протестований](https://wpt.fyi/results/webdriver/tests?label=experimental&label=master&aligned) і забезпечує сумісність на десятиліття вперед.

Крім того, WebdriverIO також підтримує альтернативні, пропрієтарні протоколи автоматизації, такі як [Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/) для цілей налагодження та інтроспекції. Це дозволяє користувачу плавно перемикатися між звичайними командами на основі WebDriver та потужними взаємодіями з браузером через [Puppeteer](https://pptr.dev/).

Дізнайтеся більше про відмінності цих стандартів автоматизації в розділі [Протоколи автоматизації](automationProtocols).

## Справді відкритий код

На відміну від багатьох інструментів автоматизації в екосистемі, WebdriverIO є справді проектом з відкритим кодом, який керується відкритим управлінням і належить некомерційній організації під назвою [OpenJS Foundation](https://openjsf.org/). Це юридично зобов'язує проект розвиватися та керуватися в інтересах усіх учасників. Команда проекту цінує відкритість і співпрацю та не керується грошовими інтересами.

Це робить проект незалежним у тому, як він розробляється і куди він повинен рухатися. Це дозволяє нам надавати безкоштовну цілодобову підтримку в нашому [каналі спільноти](https://discord.webdriver.io), оскільки ми створюємо стійку спільноту, яка підтримує та вчиться один у одного. Нарешті, це дає багато можливостей людям, які сприяють проекту та беруть участь у ньому завдяки його [відкритому управлінню](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md).