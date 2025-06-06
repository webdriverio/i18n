---
index: 1
id: considerations
title: Міркування
---

# Ключові міркування для оптимального використання

Перед зануренням у потужні функції `@wdio/visual-service`, критично важливо зрозуміти деякі ключові моменти, які забезпечують максимальну ефективність використання цього інструменту. Наступні пункти призначені для того, щоб провести вас через найкращі практики та поширені підводні камені, допомагаючи досягти точних і ефективних результатів візуального тестування. Ці міркування не просто рекомендації, а важливі аспекти, які слід враховувати для ефективного використання сервісу в реальних сценаріях.

## Природа порівняння

-   **Порівняння по пікселях:** Модуль виконує порівняння зображень піксель за пікселем. Хоча певні аспекти можуть бути налаштовані (див. Параметри порівняння), основний підхід залишається базовим порівнянням пікселів.
-   **Вплив оновлень браузера:** Майте на увазі, що оновлення браузерів, наприклад Chrome, можуть вплинути на рендеринг шрифтів, потенційно вимагаючи оновлення ваших базових зображень.

## Послідовність платформ

-   **Порівняння ідентичних платформ:** Переконайтеся, що скріншоти порівнюються в межах однієї платформи. Наприклад, скріншот з Chrome на Mac не слід використовувати для порівняння зі скріншотом з Chrome на Ubuntu або Windows.
-   **Аналогія:** Простіше кажучи, порівнюйте _'Яблука з Яблуками, а не Яблука з Андроїдами'_.

## Обережність з відсотком розбіжностей

-   **Ризик прийняття розбіжностей:** Будьте обережні, приймаючи відсоток розбіжностей. Це особливо стосується великих скріншотів, де прийняття невідповідності може ненавмисно пропустити значні розбіжності, такі як відсутні кнопки або елементи.

## Симуляція мобільних екранів

-   **Уникайте зміни розміру браузера для симуляції мобільних пристроїв:** Не намагайтеся симулювати розміри мобільних екранів шляхом зміни розміру настільних браузерів і трактування їх як мобільні браузери. Навіть при зміні розміру, настільні браузери не відтворюють точно рендеринг справжніх мобільних браузерів.
-   **Автентичність у порівнянні:** Цей інструмент призначений для порівняння візуальних елементів так, як вони б виглядали для кінцевого користувача. Браузер настільного комп'ютера зі зміненим розміром не відображає справжнього досвіду на мобільному пристрої.

## Позиція щодо браузерів у безголовому режимі

-   **Не рекомендується для браузерів у безголовому режимі:** Використання цього модуля з браузерами в безголовому режимі не рекомендується. Обґрунтування полягає в тому, що кінцеві користувачі не взаємодіють з браузерами в безголовому режимі, тому проблеми, що виникають при такому використанні, не будуть підтримуватися.