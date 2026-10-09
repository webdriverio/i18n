---
id: exec
title: Uruchamianie kodu w sesji
description: Uruchamiaj kod WebdriverIO i asercje w aktywnej sesji wdio za pomocą exec.
---

`exec` uruchamia kod WebdriverIO w otwartej sesji. Używaj go, gdy krok to coś więcej niż pojedyncze `click` lub `fill`, oraz do każdej asercji.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

Zawsze używaj `await` przed komendami. `$` zwraca jeden element i rzuca wyjątek, gdy go brakuje. `$$` zwraca listę. Nie ma trybu synchronicznego ani `browser.element`.

Zadeklarowane nazwy pozostają dostępne w kolejnym `exec`. `import` na najwyższym poziomie jest ładowany z katalogu projektu.

## Asercje

Umieszczaj asercje w `exec`, korzystając z `expect-webdriverio`. Zainstaluj go w swoim projekcie. Bez niego `expect(...)` kończy się błędem ze wskazówką dotyczącą instalacji.

```sh
npx wdio session exec -e "await expect($('h1')).toHaveText('Cart')"
```

Użyj `visual check <tag>`, gdy chodzi o to, jak wygląda ekran. Ta komenda wymaga `@wdio/visual-service`:

```sh
npx wdio session visual check cart
```

`visual accept cart` kopiuje najnowszy rzeczywisty obraz dla tego tagu w miejsce obrazu bazowego. Nie kopiuje starszych obrazów, które mają ten sam prefiks tagu.

## Kiedy zamiast tego użyć skrótu

`click`, `fill`, `type`, `press` i `tap` są krótsze niż `exec` w przypadku pojedynczej interakcji i wypisują wykonaną linię WebdriverIO. Preferuj je, używając referencji z najnowszego [snapshotu](/docs/session/snapshots). Używaj `exec` do oczekiwania, asercji i wszystkiego, co wymaga więcej niż jednej komendy.

## Następne kroki

- [Eksport testu](/docs/session/export) — zapisz kroki, w tym `exec`
- [Komendy](/docs/session-commands) — flagi `exec` i `visual`