---
id: headless-and-xvfb
title: Headless y Xvfb con el Testrunner
description: Cómo WebdriverIO utiliza Xvfb para pruebas sin interfaz gráfica en Linux, opciones de configuración, recetas para CI y solución de problemas.
---

Esta página explica cómo el testrunner de WebdriverIO admite la ejecución sin interfaz gráfica en Linux utilizando Xvfb (X Virtual Framebuffer). Cubre cuándo es útil Xvfb, cómo configurarlo y cómo se comporta en CI y Docker.

## Cuándo usar Xvfb vs headless nativo

- Use headless nativo (por ejemplo, Chrome `--headless=...`) cuando sea posible para una sobrecarga mínima.
- Use Xvfb cuando:
  - Pruebe Electron o aplicaciones que requieran un administrador de ventanas o entorno de escritorio
  - Dependa de GLX o comportamientos dependientes del administrador de ventanas
  - Sus herramientas esperen un servidor de visualización (`DISPLAY`)
  - Se encuentre con errores de Chromium como:
    - `session not created: probably user data directory is already in use ...`
    - `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`
    El error de colisión del directorio de datos de usuario puede ser engañoso, ya que a menudo es el resultado de un bloqueo del navegador y un reinicio inmediato que reutiliza el mismo directorio de perfil de la instancia anterior. Asegurar una visualización estable (por ejemplo, a través de Xvfb) a menudo lo resuelve - si no, debe pasar un único `--user-data-dir` por trabajador.

## Configuración

Cuatro opciones del runner controlan el comportamiento de Xvfb:

- `autoXvfb` (booleano, predeterminado: true)
  - Conmutador autoritativo para el uso. Si es `false`, el runner nunca usa Xvfb.
  - Si es `true`, el runner puede usar Xvfb cuando sea necesario.

- `xvfbAutoInstall` (booleano, predeterminado: false)
  - Habilita la instalación automática de `xvfb-run` si falta
  - Cuando es false, el runner advertirá y continuará sin instalar

- `xvfbAutoInstallMode` ('root' | 'sudo', predeterminado: 'sudo')
  - 'root': instalar solo si se ejecuta como root (sin sudo)
  - 'sudo': permitir sudo no interactivo (`sudo -n`) si no es root; omitir si falta sudo

- `xvfbAutoInstallCommand` (string | string[], opcional)
  - Comando personalizado para usar en la instalación en lugar de la detección del gestor de paquetes incorporado
  - Cuando se proporciona, este comando se ejecuta tal cual y anula la lógica de instalación incorporada

- `xvfbMaxRetries` (número, predeterminado: 3)
  - Número de intentos de reintento para fallos del proceso xvfb.
  - Útil para entornos de CI inestables donde el inicio de Xvfb puede fallar ocasionalmente.

- `xvfbRetryDelay` (número, predeterminado: 1000)
  - Retraso base entre reintentos en milisegundos para fallos del proceso xvfb.
  - Utiliza retraso progresivo: retraso × número de intento (por ejemplo, 1000ms, 2000ms, 3000ms, etc.).

Ejemplos:

```ts
export const config: WebdriverIO.Config = {
  // Usar Xvfb cuando sea necesario
  autoXvfb: true,

  // Auto-instalar paquetes Xvfb usando sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // Usar Xvfb cuando sea necesario
  autoXvfb: true,

  // Auto-instalar paquetes Xvfb usando un comando personalizado y sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',
  xvfbAutoInstallCommand: 'curl -L https://github.com/X11/xvfb/releases/download/v1.20.14/xvfb-linux-x64.tar.gz | tar -xz -C /usr/local/bin/',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // Usar Xvfb cuando sea necesario
  autoXvfb: true,

  // Auto-instalar paquetes Xvfb usando sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  // Configurar comportamiento de reintento para entornos CI inestables
  xvfbMaxRetries: 5,
  xvfbRetryDelay: 1500,

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

## Lógica de detección

- El runner considera Xvfb cuando:

  - Se ejecuta en Linux
  - No hay `DISPLAY` configurado (entorno sin interfaz gráfica), o se pasan flags de navegador headless

- Si `DISPLAY` está configurado, el runner no forzará Xvfb por defecto y respetará su servidor X/administrador de ventanas existente.

Notas:
- `autoXvfb: false` desactiva completamente el uso de Xvfb (sin envoltura con `xvfb-run`).
- `xvfbAutoInstall` solo afecta a la instalación si falta `xvfb-run`; no activa/desactiva el uso.
- `xvfbAutoInstallMode` controla el método de instalación: 'root' para instalaciones solo root, 'sudo' para instalaciones basadas en sudo (predeterminado: 'sudo').
- Las instalaciones de paquetes incorporadas son siempre no interactivas. Solo root a menos que opte por el modo 'sudo'.
- El mecanismo de reintento utiliza retrasos progresivos: `xvfbRetryDelay × número de intento` (por ejemplo, 1000ms, 2000ms, 3000ms, etc.).

## Uso de un DISPLAY existente en CI

Si su CI configura su propio servidor X/administrador de ventanas (por ejemplo, con `Xvfb :99` y un WM), puede:

- Dejar `autoXvfb: true` y asegurarse de que `DISPLAY` esté exportado; el runner lo respetará y evitará envolverlo.
- O establecer `autoXvfb: false` para desactivar explícitamente cualquier comportamiento de Xvfb del runner.

## Recetas para CI y Docker

GitHub Actions (usando headless nativo):

```yaml
- name: Run tests
  run: npx wdio run ./wdio.conf.ts
```

GitHub Actions (pantalla virtual mediante Xvfb si falta y se ha optado por ella):

```ts
// wdio.conf.ts
export const config = {
  autoXvfb: true,
  xvfbAutoInstall: true
}
```

Docker (ejemplo de Ubuntu/Debian – preinstalación de xvfb):

```Dockerfile
RUN apt-get update -qq && apt-get install -y xvfb
```

Para otras distribuciones, ajuste el gestor de paquetes y el nombre del paquete en consecuencia (por ejemplo, `dnf install xorg-x11-server-Xvfb` en Fedora/basadas en RHEL, `zypper install xvfb-run` en openSUSE/SLE).

## Soporte de instalación automática (xvfbAutoInstall)

Cuando `xvfbAutoInstall` está habilitado, WebdriverIO intenta instalar `xvfb` usando el gestor de paquetes de su sistema. Se admiten los siguientes gestores y paquetes:

| Gestor de Paquetes | Comando        | Distribuciones (ejemplos)                                | Nombre(s) de Paquete(s)         |
|-------------------|----------------|----------------------------------------------------------|----------------------------------|
| apt               | `apt-get`      | Ubuntu, Debian, Pop!_OS, Mint, Elementary, Zorin, etc.   | `xvfb`                           |
| dnf               | `dnf`          | Fedora, Rocky Linux, AlmaLinux, Nobara, Bazzite, etc.    | `xorg-x11-server-Xvfb`           |
| yum               | `yum`          | CentOS, RHEL (legacy)                                    | `xorg-x11-server-Xvfb`           |
| zypper            | `zypper`       | openSUSE, SUSE Linux Enterprise                          | `xvfb-run`                       |
| pacman            | `pacman`       | Arch Linux, Manjaro, EndeavourOS, CachyOS, etc.          | `xorg-server-xvfb`               |
| apk               | `apk`          | Alpine Linux, PostmarketOS                               | `xvfb-run`                       |
| xbps-install      | `xbps-install` | Void Linux                                               | `xvfb`                           |

Notas:
- Si su entorno utiliza un gestor de paquetes diferente, la instalación fallará con un error; instale `xvfb` manualmente.
- Los nombres de los paquetes son específicos de la distribución; la tabla refleja los nombres comunes por familia.

## Solución de problemas

- "xvfb-run failed to start"
  - El runner reintenta automáticamente los fallos relacionados con Xvfb con retroceso progresivo. Si los fallos persisten, aumente `xvfbMaxRetries` y `xvfbRetryDelay` para entornos inestables.

- Xvfb envuelto inesperadamente en CI
  - Si tiene una configuración personalizada de `DISPLAY` / WM, establezca `autoXvfb: false` o asegúrese de que `DISPLAY` esté exportado antes de que se inicie el runner.

- Falta `xvfb-run`
  - Mantenga `xvfbAutoInstall: false` para evitar modificar el entorno; instálelo a través de su imagen base o establezca `xvfbAutoInstall: true` para optar por ello.

- Fallos frecuentes de inicio de Xvfb en CI
  - Aumente `xvfbMaxRetries` (por ejemplo, a 5-10) y `xvfbRetryDelay` (por ejemplo, a 2000ms) para un comportamiento más resistente en entornos inestables.

## Avanzado

- El runner crea procesos a través de una fábrica que envuelve el worker de node con `xvfb-run` si se necesita Xvfb y está disponible.
- Los flags de navegador headless (Chrome/Edge/Firefox) indican el uso de headless y pueden activar Xvfb en entornos sin un `DISPLAY`.