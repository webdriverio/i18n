---
id: wdio-robonut-service
title: خدمة روبونت
custom_edit_url: https://github.com/udarrr/wdio-robonut-service/edit/main/README.md
---


> wdio-robonut-service هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/udarrr/wdio-robonut-service) | [npm](https://www.npmjs.com/package/wdio-robonut-service)

![Tested](https://github.com/udarrr/wdio-robonut-service/workflows/Tests/badge.svg)
![Released](https://github.com/udarrr/wdio-robonut-service/workflows/Create%20tagged%20release/badge.svg)

![image](https://raw.githubusercontent.com/udarrr/wdio-robonut-service/HEAD/READMELOGO.png)

### الوصف

wdio-robonut-service هي خدمة متعددة المنصات (ويندوز، داروين، لينكس) مع إمكانية الوصول إلى ماوس النظام، لوحة المفاتيح، الحافظة، الشاشة والبحث عن قوالب الصور على الشاشة المرئية باستخدام [nutjs](https://nutjs.dev/) تحت الغطاء. مع هذه الخدمة يمكن تنفيذ حركة النظام، النقر، النسخ، اللصق، الكتابة وما إلى ذلك. من الممكن التحقق من وجود والحصول على إحداثيات قالب الصورة، السحب والإفلات وما إلى ذلك.

### التثبيت

```nodejs
npm install wdio-robonut-service
```

##### الإعدادات

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

##### كخدمة wdio في wdio.conf.ts

```typescript
import RobotService from 'wdio-robonut-service';

const robotConfig: RobotConfig = {};

export const config: Options.Testrunner = {
//-
services: [[RobotService, robotConfig]],
//-
}
```

##### لـ wdio standalone/remote

قم بتنفيذه مرة واحدة بعد تهيئة المتصفح

```typescript
import RobotCommands from 'wdio-robonut-service';

const robotConfig: RobotConfig = {};

new RobotCommands(browser, robotConfig).addCommands()
```

##### مستقل

```typescript
const robotConfig: RobotConfig = {};

new RobotDirect(robotConfig).instance()
```

### الاستخدام

##### نقطة الوصول الرئيسية

```typescript
browser.robot
```

##### أمثلة

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

### واجهة برمجة التطبيقات (API)

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

### الميزات

- [x] واجهات الروبوت
- [x] روبوت الصور
- [ ] روبوت عنصر Dom (عن طريق المحددات)

### القيود

- تعمل مع العرض المرئي (ليس بدون واجهة)
- تعمل في مسار/نسخة واحدة