---
id: testrunner
title: منصة الاختبارات
---

يأتي WebdriverIO مع منصة اختبارات خاصة به لمساعدتك على بدء الاختبار بأسرع ما يمكن. من المفترض أن يقوم بكل العمل نيابة عنك، ويسمح بالتكامل مع خدمات الطرف الثالث، ويساعدك على تشغيل اختباراتك بأكثر الطرق كفاءة ممكنة.

منصة اختبارات WebdriverIO مُضمّنة بشكل منفصل في حزمة NPM `@wdio/cli`.

قم بتثبيتها كالتالي:

```sh npm2yarn
npm install @wdio/cli
```

لرؤية مساعدة واجهة سطر الأوامر، اكتب الأمر التالي في الطرفية الخاصة بك:

```sh
$ npx wdio --help

wdio <command>

Commands:
  wdio config                           Initialize WebdriverIO and setup configuration in
                                        your current project.
  wdio install <type> <name>            Add a `reporter`, `service`, or `framework` to
                                        your WebdriverIO project
  wdio repl <option> [capabilities]     Run WebDriver session in command line
  wdio run <configPath>                 Run your WDIO configuration file to initialize
                                        your tests.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

رائع! الآن تحتاج إلى تحديد ملف تكوين حيث يتم تعيين جميع المعلومات حول اختباراتك وقدراتك وإعداداتك. انتقل إلى قسم [ملف التكوين](/docs/configuration) لمعرفة كيف يجب أن يبدو هذا الملف.

باستخدام أداة تكوين `wdio` المساعدة، من السهل جداً إنشاء ملف التكوين الخاص بك. ما عليك سوى تشغيل:

```sh
$ npx wdio config
```

...وسيتم تشغيل الأداة المساعدة.

ستطرح عليك أسئلة وتقوم بإنشاء ملف تكوين لك في أقل من دقيقة.

![أداة تكوين WDIO](/img/config-utility.gif)

بمجرد إعداد ملف التكوين الخاص بك، يمكنك بدء الاختبارات عن طريق تشغيل:

```sh
npx wdio run wdio.conf.js
```

يمكنك أيضاً تهيئة اختبارك بدون أمر `run`:

```sh
npx wdio wdio.conf.js
```

هذا كل شيء! الآن، يمكنك الوصول إلى نسخة selenium عبر المتغير العالمي `browser`.

## الأوامر

### `wdio config`

أمر `config` يشغل مساعد تكوين WebdriverIO. سيطرح هذا المساعد عليك بعض الأسئلة حول مشروع WebdriverIO الخاص بك وإنشاء ملف `wdio.conf.js` بناءً على إجاباتك.

مثال:

```sh
wdio config
```

الخيارات:

```
--help            prints WebdriverIO help menu                                [boolean]
--npm             Wether to install the packages using NPM instead of yarn    [boolean]
```

### `wdio run`

> هذا هو الأمر الافتراضي لتشغيل التكوين الخاص بك.

أمر `run` يقوم بتهيئة ملف تكوين WebdriverIO ويشغل اختباراتك.

مثال:

```sh
wdio run ./wdio.conf.js --watch
```

الخيارات:

```
--help                prints WebdriverIO help menu                   [boolean]
--version             prints WebdriverIO version                     [boolean]
--hostname, -h        automation driver host address                  [string]
--port, -p            automation driver port                          [number]
--user, -u            username if using a cloud service as automation backend
                                                                        [string]
--key, -k             corresponding access key to the user            [string]
--watch               watch specs for changes                        [boolean]
--logLevel, -l        level of logging verbosity
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                stop test runner after specific amount of tests have
                        failed                                          [number]
--baseUrl             shorten url command calls by setting a base url [string]
--waitforTimeout, -w  timeout for all waitForXXX commands             [number]
--framework, -f       defines the framework (Mocha, Jasmine or Cucumber) to
                        run the specs                                   [string]
--reporters, -r       reporters to print out the results on stdout      [array]
--suite               overwrites the specs attribute and runs the defined
                        suite                                            [array]
--spec                run a certain spec file or wildcards - overrides specs piped
                        from stdin                                       [array]
--exclude             exclude spec file(s) from a run - overrides specs piped
                        from stdin                                       [array]
--repeat              Repeat specific specs and/or suites N times        [number]
--mochaOpts           Mocha options
--jasmineOpts         Jasmine options
--cucumberOpts        Cucumber options
--tsConfigPath        Custom path for `tsconfig.json` or use wdio config's [tsConfigPath setting](/docs/configurationfile)
```

> ملاحظة: يمكن التحكم في التجميع التلقائي بسهولة مع متغيرات بيئة `tsx`. راجع أيضًا [وثائق TypeScript](/docs/typescript).

### `wdio install`
يتيح لك أمر `install` إضافة تقارير وخدمات إلى مشاريع WebdriverIO الخاصة بك عبر واجهة سطر الأوامر.

مثال:

```sh
wdio install service sauce # installs @wdio/sauce-service
wdio install reporter dot # installs @wdio/dot-reporter
wdio install framework mocha # installs @wdio/mocha-framework
```

إذا كنت ترغب في تثبيت الحزم باستخدام `yarn` بدلاً من ذلك، يمكنك تمرير العلامة `--yarn` إلى الأمر:

```sh
wdio install service sauce --yarn
```

يمكنك أيضًا تمرير مسار تكوين مخصص إذا كان ملف تكوين WDIO الخاص بك ليس في نفس المجلد الذي تعمل عليه:

```sh
wdio install service sauce --config="./path/to/wdio.conf.js"
```

#### قائمة الخدمات المدعومة

```
sauce
testingbot
firefox-profile
devtools
browserstack
appium
intercept
zafira-listener
reportportal
docker
wiremock
lambdatest
vite
nuxt
```

#### قائمة المراسلين المدعومين

```
dot
spec
junit
allure
sumologic
concise
reportportal
video
html
json
mochawesome
timeline
```

#### قائمة الأطر المدعومة

```
mocha
jasmine
cucumber
```

### `wdio repl`

يتيح أمر repl بدء واجهة سطر أوامر تفاعلية لتشغيل أوامر WebdriverIO. يمكن استخدامه لأغراض الاختبار أو لمجرد إطلاق جلسة WebdriverIO بسرعة.

تشغيل الاختبارات في Chrome المحلي:

```sh
wdio repl chrome
```

أو تشغيل الاختبارات على Sauce Labs:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

يمكنك تطبيق نفس الوسائط التي يمكنك استخدامها في [أمر run](#wdio-run).