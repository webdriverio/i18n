---
id: wdio-ui5-service
title: Сервіс UI5
custom_edit_url: https://github.com/js-soft/wdi5/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-ui5-service є пакетом сторонніх розробників, для отримання додаткової інформації перегляньте [GitHub](https://github.com/js-soft/wdi5) | [npm](https://www.npmjs.com/package/wdio-ui5-service)

`wdi5` (/vdif5/) є сервісом (тобто розширенням) [`Webdriver.IO`](https://webdriver.io), що використовує [`API для тестування UI5`](https://ui5.sap.com/#/api/sap.ui.test).
Він використовується для наскрізного тестування веб-застосунків UI5.

:notebook: Документація знаходиться на [https://ui5-community.github.io/wdi5/](https://ui5-community.github.io/wdi5/)  
:bicyclist: [Дорожня карта](https://github.com/orgs/ui5-community/projects/2/views/1)  
:raising_hand: Будь ласка, використовуйте [Issues](https://github.com/ui5-community/wdi5/issues) на GitHub для підтримки спільноти та запитань  
:raised_hand: Отримайте [комерційну підтримку від експертів wdi5](https://github.com/ui5-community/wdi5/blob/main/SUPPORT.md#commercial-support)      
:speech_balloon: [Канал #wdi5 в slack](https://openui5.slack.com/) - місце для дружніх обговорень про `wdi5` ([посилання для реєстрації](https://ui5-slack-invite.cfapps.eu10.hana.ondemand.com/))  
:mega: слідкуйте за [Дискусіями](https://github.com/ui5-community/wdi5/discussions), [@\_wdi5\_ у Twitter](https://twitter.com/_wdi5_) та [@\_wdi5\_ FOSStodon](https://fosstodon.org/@_wdi5_) для оголошень  

## Керівний комітет

`wdi5` управляється чудовою групою людей, які приймають рішення щодо стратегії та наступних кроків для інструменту (в алфавітному порядку за прізвищем):

- Simon Coen [@Siolto](https://github.com/Siolto)
- Dominik Feininger [@dominikfeininger](https://github.com/dominikfeininger)
- Constantin Lebrecht [@monavari-lebrecht](https://github.com/monavari-lebrecht)
- Hristo Manchev [@hmanchev](https://github.com/hmanchev)
- Nicolai Schoenteich [@nicoschoenteich](https://github.com/nicoschoenteich)
- Sebastian Wolf [@SebastianWolf-SAP](https://github.com/SebastianWolf-SAP)
- Marian Zeis [@marianfoo](https://github.com/marianfoo)

### Колишні члени комітету

Дякуємо, що супроводжували нас у нашій подорожі! 🏅

- Arnaud Buchholz [@ArnaudBuchholz](https://github.com/ArnaudBuchholz) - липень 2022..серпень 2024
- Peder Hveem Alsvik [@ph-alsvik](https://github.com/ph-alsvik) - липень 2022..жовтень 2022
- Nicholas O'Malley [@aiopa](https://github.com/aiopa) - жовтень 2022..жовтень 2023

## Подяки

:raised_hands: за надання нам інфраструктури:

[![BrowserStack Logo](https://d98b8t1nnulk5.cloudfront.net/production/images/layout/logo-header.png?1469004780)](https://browserstack.com)   
[![Testing Powered By SauceLabs](https://opensource.saucelabs.com/images/opensauce/powered-by-saucelabs-badge-white.png?sanitize=true "Testing Powered By SauceLabs")](https://saucelabs.com)

(пінг назад до <a rel="me" href="https://fosstodon.org/@_wdi5_">Mastodon</a>)

## Ліцензія

Ця робота має подвійне ліцензування Apache 2.0 та похідну ліцензію Beer-ware 🍺. Офіційною ліцензією буде Apache 2.0, але ви можете вибрати одну з них, якщо використовуєте цю роботу.

Таким чином, якщо вам подобається ця робота, купіть [будь-якому (або всім 😆) з учасників](https://github.com/ui5-community/wdi5/graphs/contributors) пиво, коли ви їх зустрінете.