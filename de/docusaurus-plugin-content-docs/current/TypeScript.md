---
id: typescript
title: TypeScript-Einrichtung
---

Sie können Tests mit [TypeScript](http://www.typescriptlang.org) schreiben, um Autovervollständigung und Typsicherheit zu erhalten.

Sie benötigen [`tsx`](https://github.com/privatenumber/tsx) in den `devDependencies`, installierbar über:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO erkennt automatisch, ob diese Abhängigkeiten installiert sind, und kompiliert Ihre Konfiguration und Tests für Sie. Stellen Sie sicher, dass sich eine `tsconfig.json` im selben Verzeichnis wie Ihre WDIO-Konfiguration befindet.

#### Benutzerdefinierte TSConfig

Wenn Sie einen anderen Pfad für `tsconfig.json` festlegen müssen, setzen Sie bitte die Umgebungsvariable TSCONFIG_PATH mit Ihrem gewünschten Pfad oder verwenden Sie die [tsConfigPath-Einstellung](/docs/configurationfile) in der WDIO-Konfiguration.

Alternativ können Sie die [Umgebungsvariable](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) für `tsx` verwenden.

#### Typ-Überprüfung

Beachten Sie, dass `tsx` keine Typ-Überprüfung unterstützt - wenn Sie Ihre Typen überprüfen möchten, müssen Sie dies in einem separaten Schritt mit `tsc` tun.

## Framework-Einrichtung

Ihre `tsconfig.json` benötigt Folgendes:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

Bitte vermeiden Sie es, `webdriverio` oder `@wdio/sync` explizit zu importieren.
`WebdriverIO` und `WebDriver` Typen sind überall zugänglich, sobald sie zu `types` in `tsconfig.json` hinzugefügt wurden. Wenn Sie zusätzliche WebdriverIO-Dienste, Plugins oder das `devtools`-Automatisierungspaket verwenden, fügen Sie diese bitte ebenfalls zur `types`-Liste hinzu, da viele zusätzliche Typdefinitionen bereitstellen.

## Framework-Typen

Abhängig vom verwendeten Framework müssen Sie die Typen für dieses Framework zur `types`-Eigenschaft Ihrer `tsconfig.json` hinzufügen und auch dessen Typdefinitionen installieren. Dies ist besonders wichtig, wenn Sie Typunterstützung für die integrierte Assertion-Bibliothek [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio) haben möchten.

Wenn Sie sich beispielsweise für das Mocha-Framework entscheiden, müssen Sie `@types/mocha` installieren und es wie folgt hinzufügen, um alle Typen global verfügbar zu haben:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'},
  ]
}>
<TabItem value="mocha">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

</TabItem>
<TabItem value="jasmine">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

</TabItem>
<TabItem value="cucumber">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/cucumber-framework"]
    }
}
```

</TabItem>
</Tabs>

## Services

Wenn Sie Services verwenden, die Befehle zum Browser-Scope hinzufügen, müssen Sie diese auch in Ihre `tsconfig.json` aufnehmen. Wenn Sie beispielsweise den `@wdio/lighthouse-service` verwenden, stellen Sie sicher, dass Sie ihn ebenfalls zu den `types` hinzufügen, z.B.:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework",
            "@wdio/lighthouse-service"
        ]
    }
}
```

Das Hinzufügen von Services und Reportern zu Ihrer TypeScript-Konfiguration stärkt auch die Typsicherheit Ihrer WebdriverIO-Konfigurationsdatei.

## Typdefinitionen

Bei der Ausführung von WebdriverIO-Befehlen sind alle Eigenschaften in der Regel typisiert, sodass Sie sich nicht mit dem Import zusätzlicher Typen befassen müssen. Es gibt jedoch Fälle, in denen Sie Variablen im Voraus definieren möchten. Um sicherzustellen, dass diese typsicher sind, können Sie alle im Paket [`@wdio/types`](https://www.npmjs.com/package/@wdio/types) definierten Typen verwenden. Wenn Sie beispielsweise die Remote-Option für `webdriverio` definieren möchten, können Sie Folgendes tun:

```ts
import type { Options } from '@wdio/types'

// Here is an example where you might want to import the types directly
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// For other cases, you can use the `WebdriverIO` namespace
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Other configs options
}
```

## Tipps und Hinweise

### Kompilieren & Lint

Um vollständig sicher zu sein, sollten Sie die Best Practices befolgen: Kompilieren Sie Ihren Code mit dem TypeScript-Compiler (führen Sie `tsc` oder `npx tsc` aus) und verwenden Sie [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) mit einem [Pre-Commit-Hook](https://github.com/typicode/husky).