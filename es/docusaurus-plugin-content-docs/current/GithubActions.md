---
id: githubactions
title: Github Actions
description: "Ejecuta tus pruebas de WebdriverIO en GitHub Actions añadiendo un archivo de workflow a tu repositorio."
---

Si tu repositorio está alojado en Github, puedes usar [Github Actions](https://docs.github.com/en/actions) para ejecutar tus pruebas en la infraestructura de Github.

1. cada vez que envíes cambios
2. en cada creación de pull request
3. en un horario programado
4. mediante activación manual

En la raíz de tu repositorio, crea un directorio `.github/workflows`. Añade un archivo Yaml, por ejemplo `.github/workflows/ci.yaml`. Allí configurarás cómo ejecutar tus pruebas.

Consulta [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) para ver una implementación de referencia, y [ejecuciones de prueba de ejemplo](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI).

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

Encuentra más información sobre la creación de archivos de workflow en la [documentación de Github](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli).