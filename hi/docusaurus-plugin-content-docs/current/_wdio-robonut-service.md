---
id: wdio-robonut-service
title: रोबोनट सेवा
custom_edit_url: https://github.com/udarrr/wdio-robonut-service/edit/main/README.md
---


> wdio-robonut-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/udarrr/wdio-robonut-service) | [npm](https://www.npmjs.com/package/wdio-robonut-service)

![Tested](https://github.com/udarrr/wdio-robonut-service/workflows/Tests/badge.svg)
![Released](https://github.com/udarrr/wdio-robonut-service/workflows/Create%20tagged%20release/badge.svg)

![image](https://raw.githubusercontent.com/udarrr/wdio-robonut-service/HEAD/READMELOGO.png)

### विवरण

wdio-robonut-service एक क्रॉस प्लेटफॉर्म (windows, darwin, linux) सेवा है जिसमें [nutjs](https://nutjs.dev/) के माध्यम से सिस्टम माउस, कीबोर्ड, क्लिपबोर्ड, स्क्रीन और दृश्य स्क्रीन पर छवि टेम्पलेट्स ढूंढने की क्षमता होती है। इस सेवा के साथ सिस्टम मूव, क्लिक, कॉपी, पेस्ट, टाइप आदि कार्य किए जा सकते हैं। छवि टेम्पलेट्स के मौजूद होने की जांच करना और उनके निर्देशांक प्राप्त करना, उन्हें ड्रैग और ड्रॉप करना आदि संभव है।

### स्थापना

```nodejs
npm install wdio-robonut-service
```

##### कॉन्फ़िग

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

##### wdio.conf.ts में wdio सेवा के रूप में

```typescript
import RobotService from 'wdio-robonut-service';

const robotConfig: RobotConfig = {};

export const config: Options.Testrunner = {
//-
services: [[RobotService, robotConfig]],
//-
}
```

##### wdio स्टैंडअलोन/रिमोट के लिए

ब्राउज़र इनिशियलाइज़ेशन के बाद कहीं भी एक बार इसे निष्पादित करें

```typescript
import RobotCommands from 'wdio-robonut-service';

const robotConfig: RobotConfig = {};

new RobotCommands(browser, robotConfig).addCommands()
```

##### स्टैंडअलोन

```typescript
const robotConfig: RobotConfig = {};

new RobotDirect(robotConfig).instance()
```

### उपयोग

##### मुख्य एक्सेस पॉइंट

```typescript
browser.robot
```

##### उदाहरण

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

### विशेषताएँ

- [x] रोबोट इंटरफेस
- [x] इमेज रोबोट
- [ ] डॉम एलिमेंट रोबोट (लोकेटर्स द्वारा)

### सीमाएँ

- दृश्य डिस्प्ले के साथ काम करता है (हेडलेस नहीं)
- एक थ्रेड/इंस्टेंस में काम करता है;