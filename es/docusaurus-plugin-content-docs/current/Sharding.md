---
id: sharding
title: Fragmentación (Sharding)
description: "Divide tu conjunto de pruebas entre varias máquinas con la opción --shard para ejecutar las pruebas más rápido, por ejemplo en GitHub Actions."
---

Por defecto, WebdriverIO ejecuta las pruebas en paralelo y se esfuerza por lograr una utilización óptima de los núcleos de CPU de tu máquina. Para lograr una paralelización aún mayor, puedes escalar aún más la ejecución de pruebas de WebdriverIO ejecutando pruebas en varias máquinas simultáneamente. Llamamos a este modo de operación "sharding" (fragmentación).

## Fragmentación de pruebas entre varias máquinas

Para fragmentar el conjunto de pruebas, pasa `--shard=x/y` a la línea de comandos. Por ejemplo, para dividir el conjunto en cuatro fragmentos, cada uno ejecutando una cuarta parte de las pruebas:

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

Ahora, si ejecutas estos fragmentos en paralelo en diferentes computadoras, tu conjunto de pruebas se completará cuatro veces más rápido.

## Ejemplo de GitHub Actions

GitHub Actions admite la [fragmentación de pruebas entre varios jobs](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) mediante la opción [`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix). La opción matrix ejecutará un job independiente para cada combinación posible de las opciones proporcionadas.

El siguiente ejemplo muestra cómo configurar un job para ejecutar tus pruebas en cuatro máquinas en paralelo. Puedes encontrar la configuración completa del pipeline en el proyecto [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml).

-   Primero agregamos una opción matrix a la configuración de nuestro job con la opción shard que contiene el número de fragmentos que queremos crear. `shard: [1, 2, 3, 4]` creará cuatro fragmentos, cada uno con un número de fragmento diferente.
-   Luego ejecutamos nuestras pruebas de WebdriverIO con la opción `--shard ${{ matrix.shard }}/${{ strategy.job-total }}`. Este será nuestro comando de prueba para cada fragmento.
-   Finalmente, subimos nuestro informe de logs de wdio a los Artifacts de GitHub Actions. Esto hará que los logs estén disponibles en caso de que el fragmento falle.

El pipeline de pruebas se define de la siguiente manera:

```yaml title=.github/workflows/test.yaml
name: Test

on: [push, pull_request]

jobs:
    lint:
        # ...
    unit:
        # ...
    e2e:
        name: 🧪 Test (${{ matrix.shard }}/${{ strategy.job-total }})
        runs-on: ubuntu-latest
        needs: [lint, unit]
        strategy:
            matrix:
                shard: [1, 2, 3, 4]
        steps:
            - uses: actions/checkout@v4
            - uses: ./.github/workflows/actions/setup
            - name: E2E Test
              run: npm run test:features -- --shard ${{ matrix.shard }}/${{ strategy.job-total }}
            - uses: actions/upload-artifact@v1
              if: failure()
              with:
                  name: logs-${{ matrix.shard }}
                  path: logs
```

Esto ejecutará todos los fragmentos en paralelo, reduciendo el tiempo de ejecución de las pruebas a una cuarta parte:

![GitHub Actions example](/img/sharding.png "GitHub Actions example")

Consulta el commit [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8) del proyecto [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) que introdujo la fragmentación en su pipeline de pruebas, lo que ayudó a reducir el tiempo total de ejecución de `2:23 min` a `1:30 min`, una reducción del __37%__ 🎉.