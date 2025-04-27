---
id: typescript
title: டைப்ஸ்கிரிப்ட் அமைப்பு
---

நீங்கள் [TypeScript](http://www.typescriptlang.org) பயன்படுத்தி சோதனைகளை எழுதி தானியங்கி முடிவுகள் மற்றும் வகை பாதுகாப்பைப் பெறலாம்.

நீங்கள் [`tsx`](https://github.com/privatenumber/tsx) ஐ `devDependencies` இல் நிறுவ வேண்டும், இதன் மூலம்:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO தானாகவே இந்த சார்புகள் நிறுவப்பட்டுள்ளதைக் கண்டறிந்து, உங்கள் கட்டமைப்பு மற்றும் சோதனைகளை உங்களுக்காக தொகுக்கும். WDIO கட்டமைப்புடன் அதே கோப்பகத்தில் `tsconfig.json` இருப்பதை உறுதிசெய்யவும்.

#### தனிப்பயன் TSConfig

நீங்கள் `tsconfig.json` க்கு வேறுபட்ட பாதையை அமைக்க வேண்டுமானால், தயவுசெய்து TSCONFIG_PATH சூழல் மாறியை உங்கள் விரும்பிய பாதையுடன் அமைக்கவும், அல்லது wdio config இன் [tsConfigPath setting](/docs/configurationfile) ஐப் பயன்படுத்தவும்.

மாற்றாக, நீங்கள் `tsx` க்கான [environment variable](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) ஐப் பயன்படுத்தலாம்.

#### வகை சரிபார்ப்பு

`tsx` வகை-சரிபார்ப்பை ஆதரிக்காது என்பதை கவனிக்கவும் - உங்கள் வகைகளை சரிபார்க்க விரும்பினால், நீங்கள் இதை `tsc` உடன் தனி படியாக செய்ய வேண்டும்.

## கட்டமைப்பு அமைப்பு

உங்கள் `tsconfig.json` க்கு பின்வரும் தேவை:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

`webdriverio` அல்லது `@wdio/sync` ஐ வெளிப்படையாக இறக்குமதி செய்வதைத் தவிர்க்கவும்.
`WebdriverIO` மற்றும் `WebDriver` வகைகள் `tsconfig.json` இல் `types` க்கு சேர்க்கப்பட்ட பிறகு எங்கிருந்தும் அணுகக்கூடியதாக உள்ளன. நீங்கள் கூடுதல் WebdriverIO சேவைகள், செருகுநிரல்கள் அல்லது `devtools` ஆட்டோமேஷன் தொகுப்பைப் பயன்படுத்தினால், தயவுசெய்து அவற்றையும் `types` பட்டியலில் சேர்க்கவும், ஏனெனில் பல கூடுதல் வகைகளை வழங்குகின்றன.

## கட்டமைப்பு வகைகள்

நீங்கள் பயன்படுத்தும் கட்டமைப்பைப் பொறுத்து, நீங்கள் அந்த கட்டமைப்பின் வகைகளை உங்கள் `tsconfig.json` வகைகள் பண்புக்கு சேர்க்க வேண்டும், மேலும் அதன் வகை விளக்கங்களை நிறுவ வேண்டும். உள்ளமைக்கப்பட்ட உறுதிப்படுத்தல் நூலகமான [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio) க்கு வகை ஆதரவு வேண்டும் என்றால் இது முக்கியமானது.

எடுத்துக்காட்டாக, நீங்கள் Mocha கட்டமைப்பைப் பயன்படுத்த முடிவு செய்தால், நீங்கள் `@types/mocha` ஐ நிறுவி, அனைத்து வகைகளையும் உலகளாவிய அளவில் கிடைக்கச் செய்ய இதைப் போல சேர்க்க வேண்டும்:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'},
  ]
}>
<TabItem value="mocha">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

</TabItem>
<TabItem value="jasmine">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

</TabItem>
<TabItem value="cucumber">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/cucumber-framework"]
    }
}
```

</TabItem>
</Tabs>

## சேவைகள்

உலாவி நோக்கில் கட்டளைகளைச் சேர்க்கும் சேவைகளைப் பயன்படுத்தினால், அவற்றை உங்கள் `tsconfig.json` இல் சேர்க்க வேண்டும். எடுத்துக்காட்டாக நீங்கள் `@wdio/lighthouse-service` ஐப் பயன்படுத்தினால், அதை `types` இலும் சேர்ப்பதை உறுதிசெய்யவும், எ.கா:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework",
            "@wdio/lighthouse-service"
        ]
    }
}
```

உங்கள் TypeScript கட்டமைப்பில் சேவைகள் மற்றும் அறிக்கையாளர்களைச் சேர்ப்பது உங்கள் WebdriverIO கட்டமைப்பு கோப்பின் வகை பாதுகாப்பையும் வலுப்படுத்துகிறது.

## வகை விளக்கங்கள்

WebdriverIO கட்டளைகளை இயக்கும்போது, எல்லா பண்புகளும் பொதுவாக தட்டச்சு செய்யப்படுகின்றன, எனவே நீங்கள் கூடுதல் வகைகளை இறக்குமதி செய்வதில் சிரமப்பட வேண்டியதில்லை. இருப்பினும், நீங்கள் முன்கூட்டியே மாறிகளை வரையறுக்க விரும்பும் சந்தர்ப்பங்கள் உள்ளன. இவை வகை பாதுகாப்பானவை என்பதை உறுதிசெய்ய, [`@wdio/types`](https://www.npmjs.com/package/@wdio/types) தொகுப்பில் வரையறுக்கப்பட்ட அனைத்து வகைகளையும் நீங்கள் பயன்படுத்தலாம். எடுத்துக்காட்டாக `webdriverio`க்கான தொலைநிலை விருப்பத்தை வரையறுக்க விரும்பினால், நீங்கள் செய்யலாம்:

```ts
import type { Options } from '@wdio/types'

// Here is an example where you might want to import the types directly
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// For other cases, you can use the `WebdriverIO` namespace
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Other configs options
}
```

## உதவிக்குறிப்புகள்

### தொகுத்தல் & லின்ட்

முழுமையாக பாதுகாப்பாக இருக்க, நீங்கள் சிறந்த நடைமுறைகளைப் பின்பற்றலாம்: TypeScript கம்பைலர் (run `tsc` அல்லது `npx tsc`) மூலம் உங்கள் குறியீட்டைத் தொகுக்கவும், [pre-commit hook](https://github.com/typicode/husky) இல் [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) இயக்கவும்.