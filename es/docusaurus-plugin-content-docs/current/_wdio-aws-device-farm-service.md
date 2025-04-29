---
id: wdio-aws-device-farm-service
title: Servicio AWS Device Farm
custom_edit_url: https://github.com/awslabs/wdio-aws-device-farm-service/edit/main/README.md
---


> wdio-aws-device-farm-service es un paquete de terceros, para más información por favor visita [GitHub](https://github.com/awslabs/wdio-aws-device-farm-service) | [npm](https://www.npmjs.com/package/wdio-aws-device-farm-service)
## Servicio AWS Device Farm para WebdriverIO

[AWS Device Farm](https://aws.amazon.com/device-farm/) servicio para WebdriverIO.

Este servicio solo admite pruebas de navegadores de escritorio.

## Actualización a WebDriverIO v8

El paquete ahora proporciona soporte para [WebDriverIO v8](https://webdriver.io/blog/2022/12/01/webdriverio-v8-released/) a partir de la versión v8.0.0. Sin embargo, tenga en cuenta que WebDriverIO v7 seguirá siendo compatible hasta el final de su [soporte LTS](https://webdriver.io/versions/) en octubre de 2023.

Con la actualización de la versión principal a v8, este paquete ha pasado al sistema de módulos ES. Y ahora emite módulos compatibles tanto con CommonJS (CJS-) como con ECMAScript Modules (ESM-).

## Instalación

```
npm install --save-dev wdio-aws-device-farm-service
```

## Ejemplo

Puede ejecutar el ejemplo proporcionado con `npm run example`. Requiere:

1. Un ARN de proyecto AWS Device Farm como variable de entorno `PROJECT_ARN`
2. Credenciales de AWS ([ver documentación](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html)). Tenga en cuenta que AWS Device Farm solo admite `us-west-2`. Puede forzar una región de AWS con la variable de entorno `AWS_REGION`.

Por ejemplo, así es como se vería usando credenciales temporales de AWS:

```sh
export PROJECT_ARN="<your project arn>"
export AWS_ACCESS_KEY_ID="<aws access key id>"
export AWS_SECRET_ACCESS_KEY="<aws secret access key>"
export AWS_SESSION_TOKEN="<aws session token>"
export AWS_REGION="us-west-2"

npm run example
```

## Seguridad

Consulte [CONTRIBUTING](https://github.com/awslabs/wdio-aws-device-farm-service/blob/main/CONTRIBUTING.md#security-issue-notifications) para obtener más información.

## Obtener ayuda

La mejor manera de interactuar con nuestro equipo es a través de GitHub. Puede [abrir un issue](https://github.com/awslabs/wdio-aws-device-farm-service/issues/new) para obtener ayuda o informar sobre cualquier problema que experimente.

## Licencia

Este proyecto está licenciado bajo la Licencia Apache-2.0.