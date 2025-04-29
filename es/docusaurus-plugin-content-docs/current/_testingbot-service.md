---
id: testingbot-service
title: Servicio Testingbot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-testingbot-service/README.md
---


> Servicio de WebdriverIO que proporciona una mejor integración con TestingBot. Actualiza los metadatos del trabajo ('name', 'passed', 'tags', 'public', 'build', 'extra') y ejecuta TestingBot Tunnel si se desea.

## Instalación

La forma más sencilla es mantener `@wdio/testingbot-service` como una devDependency en tu archivo `package.json`, mediante:

```sh
npm install @wdio/testingbot-service --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí.](https://webdriver.io/docs/gettingstarted)

## Configuración

Para utilizar el servicio necesitas configurar `user` y `key` en tu archivo `wdio.conf.js`, y establecer la opción `hostname` como `hub.testingbot.com`. Si quieres usar [TestingBot Tunnel](https://testingbot.com/support/other/tunnel)
necesitas establecer `tbTunnel: true`.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.TB_KEY,
    key: process.env.TB_SECRET,
    services: [
        ['testingbot', {
            tbTunnel: true
        }]
    ],
    // ...
};
```

## Opciones

Para autorizar el servicio TestingBot, tu configuración debe contener las opciones [`user`](https://webdriver.io/docs/options#user) y [`key`](https://webdriver.io/docs/options#key).

### tbTunnel
Si es verdadero, ejecuta el TestingBot Tunnel y abre una conexión segura entre una Máquina Virtual de TestingBot que ejecuta tus pruebas de navegador.

Tipo: `Boolean`<br />
Predeterminado: `false`

### tbTunnelOpts
Aplica opciones de TestingBot Tunnel (p. ej. para cambiar la configuración del número de puerto o archivo de registro). Consulta [esta lista](https://github.com/testingbot/testingbot-tunnel-launcher) para más información.

Tipo: `Object`<br />
Predeterminado: `{}`