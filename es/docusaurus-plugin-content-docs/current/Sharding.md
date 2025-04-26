---
id: sharding
title: Fragmentación
---

Por defecto, WebdriverIO ejecuta pruebas en paralelo y se esfuerza por lograr una utilización óptima de los núcleos de CPU en tu máquina. Para lograr una paralelización aún mayor, puedes escalar aún más la ejecución de pruebas de WebdriverIO ejecutando pruebas en múltiples máquinas simultáneamente. Llamamos a este modo de operación "fragmentación" (sharding).

## Fragmentación de pruebas entre múltiples máquinas

Para fragmentar el conjunto de pruebas, pasa `--shard=x/y` a la línea de comandos. Por ejemplo, para dividir el conjunto en cuatro fragmentos, cada uno ejecutando un cuarto de las pruebas:

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

Ahora, si ejecutas estos fragmentos en paralelo en diferentes computadoras, tu conjunto de pruebas se completa cuatro veces más rápido.

## Ejemplo de GitHub Actions

GitHub Actions admite [fragmentar pruebas entre múltiples trabajos](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) utilizando la opción [`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix). La opción matrix ejecutará un trabajo separado para cada posible combinación de las opciones proporcionadas.

El siguiente ejemplo muestra cómo configurar un trabajo para ejecutar tus pruebas en cuatro máquinas en paralelo. Puedes encontrar toda la configuración del pipeline en el proyecto [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml).

-   Primero, agregamos una opción matrix a nuestra configuración de trabajo con la opción shard que contiene el número de fragmentos que queremos crear. `shard: [1, 2, 3, 4]` creará cuatro fragmentos, cada uno con un número de fragmento diferente.
-   Luego ejecutamos nuestras pruebas WebdriverIO con la opción `--shard ${{ matrix.shard }}/${{ strategy.job-total }}`. Este será nuestro comando de prueba para cada fragmento.
-   Finalmente, subimos nuestro informe de registro wdio a los Artefactos de GitHub Actions. Esto hará que los registros estén disponibles en caso de que el fragmento falle.

El pipeline de prueba se define de la siguiente manera:

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

Esto ejecutará todos los fragmentos en paralelo, reduciendo el tiempo de ejecución de las pruebas por 4:

![GitHub Actions example](/img/sharding.png "GitHub Actions example")

Consulta el commit [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8) del proyecto [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) que introdujo la fragmentación en su pipeline de pruebas, lo que ayudó a reducir el tiempo total de ejecución de `2:23 min` a `1:30 min`, una reducción del __37%__ 🎉.