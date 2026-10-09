---
id: typescript
title: TypeScript-Einrichtung
description: "Schreiben Sie WebdriverIO-Tests in TypeScript mit tsx, richten Sie die tsconfig.json ein und fügen Sie Typdefinitionen für Frameworks, Services und benutzerdefinierte Befehle hinzu."
---

Sie können Tests mit [TypeScript](http://www.typescriptlang.org) schreiben, um Autovervollständigung und Typsicherheit zu erhalten.

Sie müssen [`tsx`](https://github.com/privatenumber/tsx) in den `devDependencies` installiert haben, und zwar über:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO erkennt automatisch, ob diese Abhängigkeiten installiert sind, und kompiliert Ihre Konfiguration und Tests für Sie. Stellen Sie sicher, dass sich eine `tsconfig.json` im selben Verzeichnis wie Ihre WDIO-Konfiguration befindet.

#### Benutzerdefinierte TSConfig

Wenn Sie einen anderen Pfad für die `tsconfig.json` festlegen müssen, setzen Sie bitte die Umgebungsvariable TSCONFIG_PATH auf den gewünschten Pfad oder verwenden Sie die [tsConfigPath-Einstellung](/docs/configurationfile) der wdio-Konfiguration.

Alternativ können Sie die [Umgebungsvariable](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) für `tsx` verwenden.


#### Typprüfung

Beachten Sie, dass `tsx` keine Typprüfung unterstützt – wenn Sie Ihre Typen prüfen möchten, müssen Sie dies in einem separaten Schritt mit `tsc` tun.

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
Die Typen `WebdriverIO` und `WebDriver` sind von überall aus zugänglich, sobald sie zu `types` in der `tsconfig.json` hinzugefügt wurden. Wenn Sie zusätzliche WebdriverIO-Services, Plugins oder das `devtools`-Automatisierungspaket verwenden, fügen Sie diese bitte ebenfalls zur `types`-Liste hinzu, da viele zusätzliche Typisierungen bereitstellen.

## Framework-Typen

Je nach verwendetem Framework müssen Sie die Typen für dieses Framework zur `types`-Eigenschaft Ihrer `tsconfig.json` hinzufügen sowie dessen Typdefinitionen installieren. Dies ist besonders wichtig, wenn Sie Typunterstützung für die integrierte Assertion-Bibliothek [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio) haben möchten.

Wenn Sie sich beispielsweise für das Mocha-Framework entscheiden, müssen Sie `@types/mocha` installieren und es wie folgt hinzufügen, damit alle Typen global verfügbar sind:

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
        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

`jasmine` lädt `@types/jasmine`, wodurch `jasmine`, `spyOn` und `expectAsync` verfügbar werden. Mit `@wdio/jasmine-framework` gibt das globale `expect` für synchrone Jasmine-Matcher `void` und für WebdriverIO-Matcher sowie asynchrone Jasmine-Matcher ein `Promise` zurück. `expectAsync` verfügt ebenfalls über die WebdriverIO-Matcher. Der `expect`-Export von `expect-webdriverio` behält seine Jest-Matcher.

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

Wenn Sie Services verwenden, die Befehle zum Browser-Scope hinzufügen, müssen Sie diese ebenfalls in Ihre `tsconfig.json` aufnehmen. Wenn Sie beispielsweise den `@wdio/lighthouse-service` verwenden, stellen Sie sicher, dass Sie ihn ebenfalls zu den `types` hinzufügen, z. B.:

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

Beim Ausführen von WebdriverIO-Befehlen sind normalerweise alle Eigenschaften typisiert, sodass Sie sich nicht um den Import zusätzlicher Typen kümmern müssen. Es gibt jedoch Fälle, in denen Sie Variablen im Voraus definieren möchten. Um sicherzustellen, dass diese typsicher sind, können Sie alle im Paket [`@wdio/types`](https://www.npmjs.com/package/@wdio/types) definierten Typen verwenden. Wenn Sie beispielsweise die Remote-Option für `webdriverio` definieren möchten, können Sie Folgendes tun:

```ts
import type { Options } from '@wdio/types'

// Hier ist ein Beispiel, bei dem Sie die Typen möglicherweise direkt importieren möchten
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// In anderen Fällen können Sie den `WebdriverIO`-Namespace verwenden
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Weitere Konfigurationsoptionen
}
```

## Tipps und Hinweise

### Kompilieren & Linten

Um auf der sicheren Seite zu sein, sollten Sie die Best Practices befolgen: Kompilieren Sie Ihren Code mit dem TypeScript-Compiler (führen Sie `tsc` oder `npx tsc` aus) und lassen Sie [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) in einem [Pre-Commit-Hook](https://github.com/typicode/husky) laufen.