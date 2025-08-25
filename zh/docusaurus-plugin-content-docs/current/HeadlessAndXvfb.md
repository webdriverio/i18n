---
id: headless-and-xvfb
title: 测试运行器的无头模式和 Xvfb
description: WebdriverIO 如何使用 Xvfb 在 Linux 上进行无头测试，配置选项，CI 配方以及故障排除。
---

本页解释了 WebdriverIO 测试运行器如何使用 Xvfb（X 虚拟帧缓冲区）支持在 Linux 上的无头执行。它涵盖了何时使用 Xvfb，如何配置它，以及它在 CI 和 Docker 中的行为。

## 何时使用 Xvfb 与原生无头模式

- 尽可能使用原生无头模式（例如，Chrome `--headless=...`）以减少开销。
- 在以下情况使用 Xvfb：
  - 测试 Electron 或需要窗口管理器或桌面环境的应用程序
  - 你依赖 GLX 或依赖窗口管理器的行为
  - 你的工具需要显示服务器（`DISPLAY`）
  - 你遇到 Chromium 错误，例如：
    - `session not created: probably user data directory is already in use ...`
    - `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`
    用户数据目录冲突错误可能具有误导性，因为它通常是浏览器崩溃并立即重启导致的，重启时会重用上一个实例的配置文件目录。确保稳定的显示（例如通过 Xvfb）通常可以解决它 - 如果不行，你应该为每个工作进程传递一个唯一的 `--user-data-dir`。

## 配置

四个运行器选项控制 Xvfb 行为：

- `autoXvfb`（布尔值，默认：true）
  - 使用的权威开关。如果为 `false`，运行器永不使用 Xvfb。
  - 如果为 `true`，运行器在需要时可能使用 Xvfb。

- `xvfbAutoInstall`（布尔值，默认：false）
  - 如果缺少 `xvfb-run` 则启用自动安装
  - 当为 false 时，运行器将警告并继续而不安装

- `xvfbAutoInstallMode`（'root' | 'sudo'，默认：'sudo'）
  - 'root'：仅在以 root 身份运行时安装（无 sudo）
  - 'sudo'：如果不是 root，则允许非交互式 sudo（`sudo -n`）；如果缺少 sudo 则跳过

- `xvfbAutoInstallCommand`（字符串 | 字符串[]，可选）
  - 用于安装的自定义命令，而不是内置的包管理器检测
  - 提供时，此命令按原样执行并覆盖内置安装逻辑

- `xvfbMaxRetries`（数字，默认：3）
  - xvfb 进程失败的重试尝试次数。
  - 对于不稳定的 CI 环境（Xvfb 启动可能偶尔失败）很有用。

- `xvfbRetryDelay`（数字，默认：1000）
  - xvfb 进程失败重试之间的基本延迟（毫秒）。
  - 使用渐进延迟：延迟 × 尝试次数（例如，1000ms、2000ms、3000ms 等）。

示例：

```ts
export const config: WebdriverIO.Config = {
  // 在需要时使用 Xvfb
  autoXvfb: true,

  // 使用 sudo 自动安装 Xvfb 包
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
  // 在需要时使用 Xvfb
  autoXvfb: true,

  // 使用自定义命令和 sudo 自动安装 Xvfb 包
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
  // 在需要时使用 Xvfb
  autoXvfb: true,

  // 使用 sudo 自动安装 Xvfb 包
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  // 为不稳定的 CI 环境配置重试行为
  xvfbMaxRetries: 5,
  xvfbRetryDelay: 1500,

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

## 检测逻辑

- 运行器在以下情况下考虑使用 Xvfb：

  - 在 Linux 上运行
  - 未设置 `DISPLAY`（无头环境），或传递了无头浏览器标志

- 如果设置了 `DISPLAY`，运行器默认不会强制使用 Xvfb，并会尊重你现有的 X 服务器/窗口管理器。

注意：
- `autoXvfb: false` 完全禁用 Xvfb 使用（不使用 `xvfb-run` 包装）。
- `xvfbAutoInstall` 仅在缺少 `xvfb-run` 时影响安装；它不会打开/关闭使用。
- `xvfbAutoInstallMode` 控制安装方法：'root' 仅限 root 安装，'sudo' 用于基于 sudo 的安装（默认：'sudo'）。
- 内置包安装始终是非交互式的。除非你选择 'sudo' 模式，否则仅限 root。
- 重试机制使用渐进延迟：`xvfbRetryDelay × 尝试次数`（例如，1000ms、2000ms、3000ms 等）。

## 在 CI 中使用现有的 DISPLAY

如果你的 CI 设置了自己的 X 服务器/窗口管理器（例如，使用 `Xvfb :99` 和 WM），可以：

- 保留 `autoXvfb: true` 并确保导出 `DISPLAY`；运行器会尊重它并避免包装。
- 或设置 `autoXvfb: false` 以显式禁用来自运行器的任何 Xvfb 行为。

## CI 和 Docker 配方

GitHub Actions（使用原生无头模式）：

```yaml
- name: Run tests
  run: npx wdio run ./wdio.conf.ts
```

GitHub Actions（如果缺少并选择使用虚拟显示通过 Xvfb）：

```ts
// wdio.conf.ts
export const config = {
  autoXvfb: true,
  xvfbAutoInstall: true
}
```

Docker（Ubuntu/Debian 示例 – 预安装 xvfb）：

```Dockerfile
RUN apt-get update -qq && apt-get install -y xvfb
```

对于其他发行版，相应调整包管理器和包名（例如，在 Fedora/RHEL 系列上使用 `dnf install xorg-x11-server-Xvfb`，在 openSUSE/SLE 上使用 `zypper install xvfb-run`）。

## 自动安装支持（xvfbAutoInstall）

当启用 `xvfbAutoInstall` 时，WebdriverIO 尝试使用你的系统包管理器安装 `xvfb`。支持以下包管理器和包：

| 包管理器 | 命令 | 发行版（示例） | 包名 |
|-----------------|-----------------|-------------------------------------------------------------|----------------------------------|
| apt             | `apt-get`       | Ubuntu, Debian, Pop!_OS, Mint, Elementary, Zorin, 等      | `xvfb`                           |
| dnf             | `dnf`           | Fedora, Rocky Linux, AlmaLinux, Nobara, Bazzite, 等       | `xorg-x11-server-Xvfb`           |
| yum             | `yum`           | CentOS, RHEL (legacy)                                       | `xorg-x11-server-Xvfb`           |
| zypper          | `zypper`        | openSUSE, SUSE Linux Enterprise                             | `xvfb-run`                       |
| pacman          | `pacman`        | Arch Linux, Manjaro, EndeavourOS, CachyOS, 等             | `xorg-server-xvfb`               |
| apk             | `apk`           | Alpine Linux, PostmarketOS                                  | `xvfb-run`                       |
| xbps-install    | `xbps-install`  | Void Linux                                                  | `xvfb`                           |

注意：
- 如果你的环境使用不同的包管理器，安装将失败并显示错误；请手动安装 `xvfb`。
- 包名是特定于发行版的；表格反映了每个系列的常见名称。

## 故障排除

- "xvfb-run 启动失败"
  - 运行器自动使用渐进退避重试与 Xvfb 相关的失败。如果失败持续存在，请为不稳定的环境增加 `xvfbMaxRetries` 和 `xvfbRetryDelay`。

- CI 中意外包装了 Xvfb
  - 如果你有自定义的 `DISPLAY` / WM 设置，请设置 `autoXvfb: false` 或确保在运行器启动前导出 `DISPLAY`。

- 缺少 `xvfb-run`
  - 保持 `xvfbAutoInstall: false` 以避免修改环境；通过你的基础镜像安装或设置 `xvfbAutoInstall: true` 以选择加入。

- CI 中频繁的 Xvfb 启动失败
  - 增加 `xvfbMaxRetries`（例如，到 5-10）和 `xvfbRetryDelay`（例如，到 2000ms）以在不稳定环境中获得更具弹性的行为。

## 高级

- 运行器通过一个工厂创建进程，如果需要并且可用 Xvfb，该工厂将 node worker 与 `xvfb-run` 包装。
- 无头浏览器标志（Chrome/Edge/Firefox）表示无头使用，并可能在没有 `DISPLAY` 的环境中触发 Xvfb。