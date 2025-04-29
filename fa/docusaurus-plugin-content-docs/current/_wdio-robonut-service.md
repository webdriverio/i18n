---
id: wdio-robonut-service
title: سرویس Robonut
custom_edit_url: https://github.com/udarrr/wdio-robonut-service/edit/main/README.md
---


> wdio-robonut-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفا به [GitHub](https://github.com/udarrr/wdio-robonut-service) | [npm](https://www.npmjs.com/package/wdio-robonut-service) مراجعه کنید

![Tested](https://github.com/udarrr/wdio-robonut-service/workflows/Tests/badge.svg)
![Released](https://github.com/udarrr/wdio-robonut-service/workflows/Create%20tagged%20release/badge.svg)

![image](https://raw.githubusercontent.com/udarrr/wdio-robonut-service/HEAD/READMELOGO.png)

### توضیحات

wdio-robonut-service یک سرویس چند سکویی (ویندوز، داروین، لینوکس) با دسترسی به ماوس سیستم، صفحه کلید، کلیپ‌بورد، صفحه نمایش و جستجوی الگوهای تصویری در صفحه نمایش قابل مشاهده با استفاده از [nutjs](https://nutjs.dev/) است. با این سرویس می‌توان عملیات سیستمی مانند حرکت، کلیک، کپی، پیست، تایپ و غیره را انجام داد. همچنین امکان بررسی وجود و به دست آوردن مختصات الگوی تصویری، کشیدن و رها کردن آن و غیره وجود دارد.

### نصب

```nodejs
npm install wdio-robonut-service
```

##### پیکربندی

```typescript
interface RobotConfig {
  mouseConfig?: { autoDelayMs: number; mouseSpeed: number };
  screenConfig?: { confidence: number; autoHighlight: boolean; highlightDurationMs: number; highlightOpacity: number; resourceDirectory: string };
  keyboardConfig?: { autoDelayMs: number };
  imageFinder?: {
    confidence?: number;
    providerData?: {
      methodType?: MethodNameType;
      scaleSteps?: Array<number>;
      searchMultipleScales?: boolean;
      isRotation: boolean,
      rotationOption?: { range?: number; overLap?: number; minDstLength?: number };
      debug?: boolean;
      roi?: Region;
    };
  };
}
```

##### به عنوان سرویس wdio در wdio.conf.ts

```typescript
import RobotService from 'wdio-robonut-service';

const robotConfig: RobotConfig = {};

export const config: Options.Testrunner = {
//-
services: [[RobotService, robotConfig]],
//-
}
```

##### برای wdio standalone/remote

آن را یک بار پس از راه‌اندازی مرورگر اجرا کنید

```typescript
import RobotCommands from 'wdio-robonut-service';

const robotConfig: RobotConfig = {};

new RobotCommands(browser, robotConfig).addCommands()
```

##### استقلالی

```typescript
const robotConfig: RobotConfig = {};

new RobotDirect(robotConfig).instance()
```

### استفاده

##### نقطه دسترسی اصلی

```typescript
browser.robot
```

##### مثال‌ها

```typescript
async function dragAndDropImage(imageDrag: ImageElement,imageDrop: ImageElement, timeout: number = 10000) {
await browser.robot.image.dragAndDrop(
{ pathToImage: imageDrag.pathToImage},
{ pathToImage: imageDrop.pathToImage}, 
{ highLight: timeout/10 , waitTimeout:timeout });
}

async function dragAndDropImageWithNestedImage(imageDrag: ImageElement,imageDrop: ImageElement, timeout: number = 10000 ) {
await browser.robot.image.dragAndDrop(
      { pathToImage: imageDrag.pathToImage, pathToNestedImage: imageDrag.pathToNestedImage },
      { pathToImage: imageDrop.pathToImage, pathToNestedImage: imageDrop.pathToNestedImage },
      { highLight: timeout/10 , waitTimeout:timeout },
    );
}

async function clickImage(image: ImageElement,  
options: WaitUntilOptions = { interval: 2500, timeout: 10000 }) {
    await browser.robot.image.waitForImageDisplayed(image, options);
    const location = await browser.robot.image.finder.findMatch({ needle: image.pathToImage });
    const point = await browser.robot.rect.centerOf(location.location);
    await browser.robot.mouse.move(await browser.robot.rect.straightTo(point));
    await browser.robot.mouse.click(Button.LEFT);
}

async function isWaitForImageDisplayed(image: ImageElement, 
options: WaitUntilOptions = { interval: 2500, timeout: 10000 }) {
    try {
      return (await browser.waitUntil(
        async () => {
          return !!(await browser.robot.image.finder.findMatch({ needle: image.pathToImage })).location;
        }, options
      )) as true;
    } catch {
      return false;
    }
}
```

### API

```typescript
    interface Browser {
      robot: {
        rect: {
          straightTo: (target: Point | Promise<Point>) => Promise<Point[]>;
          centerOf: (target: Region | Promise<Region>) => Promise<Point>;
          randomPointIn: (target: Region | Promise<Region>) => Promise<Point>;
        };
        image: {
          finder: TemplateMatchingFinder;
          reader: { imageResource: (fileName: string) => Promise<Image>; loadImage: (parameters: string) => Promise<Image>; saveImage: (parameters: ImageWriterParameters) => Promise<void> };
          clickImage: (image: ImageElement, options: WaitUntilOptions) => Promise<void>;
          isWaitForImageDisplayed: (image: ImageElement, options?: WaitUntilOptions) => Promise<boolean>;
          waitForImageDisplayed: (image: ImageElement, options?: WaitUntilOptions) => Promise<true | void>;
          highlightDisplayedImage: (image: ImageElement, options?: WaitUntilOptions & { highLight?: number }) => Promise<void>;
          dragAndDrop: (dragImage: ImageElement, dropImage: ImageElement, options?: RobotDragAndDropType) => Promise<void>;
        };
        mouse: MouseClass;
        screen: ScreenClass;
        keyboard: KeyboardClass;
        windowApiProvider: WindowProviderInterface;
        clipboard: { sys: SysClipboard; virt: ClipboardClass };
      };
    }
```

### ویژگی‌ها

- [x] رابط‌های ربات
- [x] ربات تصویر
- [ ] ربات عنصر DOM (توسط یابنده‌ها)

### محدودیت‌ها

- کار با نمایشگر قابل مشاهده (نه headless)
- کار در یک نخ/نمونه