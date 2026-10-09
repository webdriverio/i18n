---
id: selectors
title: सेलेक्टर्स
description: "WebdriverIO MCP सर्वर के साथ ऑटोमेशन करते समय वेब पेजों और मोबाइल ऐप्स पर एलिमेंट्स खोजने के लिए सेलेक्टर्स चुनें।"
---

WebdriverIO MCP सर्वर वेब पेजों और मोबाइल ऐप्स पर एलिमेंट्स खोजने के लिए कई सेलेक्टर रणनीतियों का समर्थन करता है।

:::info

सभी WebdriverIO सेलेक्टर रणनीतियों सहित विस्तृत सेलेक्टर दस्तावेज़ीकरण के लिए, मुख्य [Selectors](/docs/selectors) गाइड देखें। यह पेज MCP सर्वर के साथ आमतौर पर उपयोग किए जाने वाले सेलेक्टर्स पर केंद्रित है।

:::

## वेब सेलेक्टर्स

ब्राउज़र ऑटोमेशन के लिए, MCP सर्वर सभी मानक WebdriverIO सेलेक्टर्स का समर्थन करता है। सबसे अधिक उपयोग किए जाने वाले सेलेक्टर्स में शामिल हैं:

| सेलेक्टर | उदाहरण                        | विवरण                  |
| -------- | ------------------------------ | ---------------------------- |
| CSS      | `#login-button`, `.submit-btn` | मानक CSS सेलेक्टर्स       |
| XPath    | `//button[@id='submit']`       | XPath एक्सप्रेशन्स            |
| Text     | `button=Submit`, `a*=Click`    | WebdriverIO टेक्स्ट सेलेक्टर्स   |
| ARIA     | `aria/Submit Button`           | एक्सेसिबिलिटी नाम सेलेक्टर्स |
| Test ID  | `[data-testid="submit"]`       | टेस्टिंग के लिए अनुशंसित      |

विस्तृत उदाहरणों और सर्वोत्तम प्रथाओं के लिए, [Selectors](/docs/selectors) दस्तावेज़ीकरण देखें।

## मोबाइल सेलेक्टर्स

मोबाइल सेलेक्टर्स Appium के माध्यम से iOS और Android दोनों प्लेटफ़ॉर्म पर काम करते हैं।

### Accessibility ID (अनुशंसित)

Accessibility IDs **सबसे विश्वसनीय क्रॉस-प्लेटफ़ॉर्म सेलेक्टर** हैं। ये iOS और Android दोनों पर काम करते हैं और ऐप अपडेट के दौरान भी स्थिर रहते हैं।

```text
# सिंटैक्स
~accessibilityId

# उदाहरण
~loginButton
~submitForm
~usernameField
```

:::tip सर्वोत्तम प्रथा
उपलब्ध होने पर हमेशा accessibility IDs को प्राथमिकता दें। ये प्रदान करते हैं:
- क्रॉस-प्लेटफ़ॉर्म संगतता (iOS + Android)
- UI परिवर्तनों के दौरान स्थिरता
- बेहतर टेस्ट रखरखाव
- आपके ऐप की बेहतर एक्सेसिबिलिटी
:::

### Android सेलेक्टर्स

#### UiAutomator

UiAutomator सेलेक्टर्स Android के लिए शक्तिशाली और तेज़ हैं।

```text
# टेक्स्ट द्वारा
android=new UiSelector().text("Login")

# आंशिक टेक्स्ट द्वारा
android=new UiSelector().textContains("Log")

# Resource ID द्वारा
android=new UiSelector().resourceId("com.example:id/login_button")

# Class Name द्वारा
android=new UiSelector().className("android.widget.Button")

# Description द्वारा (Accessibility)
android=new UiSelector().description("Login button")

# संयुक्त शर्तें
android=new UiSelector().className("android.widget.Button").text("Login")

# स्क्रॉल करने योग्य कंटेनर
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

Resource IDs Android पर स्थिर एलिमेंट पहचान प्रदान करते हैं।

```text
# पूर्ण Resource ID
id=com.example.app:id/login_button

# आंशिक ID (ऐप पैकेज अनुमानित)
id=login_button
```

#### XPath (Android)

XPath Android पर काम करता है लेकिन UiAutomator की तुलना में धीमा है।

```text
# Class और Text द्वारा
//android.widget.Button[@text='Login']

# Resource ID द्वारा
//android.widget.EditText[@resource-id='com.example:id/username']

# Content Description द्वारा
//android.widget.ImageButton[@content-desc='Menu']

# पदानुक्रमित
//android.widget.LinearLayout/android.widget.Button[1]
```

### iOS सेलेक्टर्स

#### Predicate String

iOS Predicate Strings iOS ऑटोमेशन के लिए तेज़ और शक्तिशाली हैं।

```text
# Label द्वारा
-ios predicate string:label == "Login"

# आंशिक Label द्वारा
-ios predicate string:label CONTAINS "Log"

# Name द्वारा
-ios predicate string:name == "loginButton"

# Type द्वारा
-ios predicate string:type == "XCUIElementTypeButton"

# Value द्वारा
-ios predicate string:value == "ON"

# संयुक्त शर्तें
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# दृश्यता
-ios predicate string:label == "Login" AND visible == 1

# केस असंवेदनशील
-ios predicate string:label ==[c] "login"
```

**Predicate ऑपरेटर्स:**

| ऑपरेटर     | विवरण        |
| ------------ | ------------------ |
| `==`         | बराबर             |
| `!=`         | बराबर नहीं         |
| `CONTAINS`   | सबस्ट्रिंग शामिल है |
| `BEGINSWITH` | से शुरू होता है        |
| `ENDSWITH`   | पर समाप्त होता है          |
| `LIKE`       | वाइल्डकार्ड मिलान     |
| `MATCHES`    | Regex मिलान        |
| `AND`        | लॉजिकल AND        |
| `OR`         | लॉजिकल OR         |

#### Class Chain

iOS Class Chains अच्छे प्रदर्शन के साथ पदानुक्रमित एलिमेंट लोकेशन प्रदान करते हैं।

```text
# प्रत्यक्ष चाइल्ड
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# कोई भी वंशज
-ios class chain:**/XCUIElementTypeButton

# इंडेक्स द्वारा
-ios class chain:**/XCUIElementTypeCell[3]

# Predicate के साथ संयुक्त
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# पदानुक्रमित
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# अंतिम एलिमेंट
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath iOS पर काम करता है लेकिन predicate strings की तुलना में धीमा है।

```text
# Type और Label द्वारा
//XCUIElementTypeButton[@label='Login']

# Name द्वारा
//XCUIElementTypeTextField[@name='username']

# Value द्वारा
//XCUIElementTypeSwitch[@value='1']

# पदानुक्रमित
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

## क्रॉस-प्लेटफ़ॉर्म सेलेक्टर रणनीति

ऐसे टेस्ट लिखते समय जिन्हें iOS और Android दोनों पर काम करना हो, इस प्राथमिकता क्रम का उपयोग करें:

### 1. Accessibility ID (सर्वोत्तम)

```text
# दोनों प्लेटफ़ॉर्म पर काम करता है
~loginButton
```

### 2. कंडीशनल लॉजिक के साथ प्लेटफ़ॉर्म-विशिष्ट

जब accessibility IDs उपलब्ध न हों, तो प्लेटफ़ॉर्म-विशिष्ट सेलेक्टर्स का उपयोग करें:

**Android:**
```text
android=new UiSelector().text("Login")
```

**iOS:**
```text
-ios predicate string:label == "Login"
```

### 3. XPath (अंतिम विकल्प)

XPath दोनों प्लेटफ़ॉर्म पर काम करता है लेकिन अलग-अलग एलिमेंट प्रकारों के साथ:

**Android:**
```text
//android.widget.Button[@text='Login']
```

**iOS:**
```text
//XCUIElementTypeButton[@label='Login']
```

## एलिमेंट प्रकार संदर्भ

### Android एलिमेंट प्रकार

| प्रकार                          | विवरण      |
| ----------------------------- | ---------------- |
| `android.widget.Button`       | बटन           |
| `android.widget.EditText`     | टेक्स्ट इनपुट       |
| `android.widget.TextView`     | टेक्स्ट लेबल       |
| `android.widget.ImageView`    | इमेज            |
| `android.widget.ImageButton`  | इमेज बटन     |
| `android.widget.CheckBox`     | चेकबॉक्स         |
| `android.widget.RadioButton`  | रेडियो बटन     |
| `android.widget.Switch`       | टॉगल स्विच    |
| `android.widget.Spinner`      | ड्रॉपडाउन         |
| `android.widget.ListView`     | लिस्ट व्यू        |
| `android.widget.RecyclerView` | रीसाइकलर व्यू    |
| `android.widget.ScrollView`   | स्क्रॉल कंटेनर |

### iOS एलिमेंट प्रकार

| प्रकार                             | विवरण     |
| -------------------------------- | --------------- |
| `XCUIElementTypeButton`          | बटन          |
| `XCUIElementTypeTextField`       | टेक्स्ट इनपुट      |
| `XCUIElementTypeSecureTextField` | पासवर्ड इनपुट  |
| `XCUIElementTypeStaticText`      | टेक्स्ट लेबल      |
| `XCUIElementTypeImage`           | इमेज           |
| `XCUIElementTypeSwitch`          | टॉगल स्विच   |
| `XCUIElementTypeSlider`          | स्लाइडर          |
| `XCUIElementTypePicker`          | पिकर व्हील    |
| `XCUIElementTypeTable`           | टेबल व्यू      |
| `XCUIElementTypeCell`            | टेबल सेल      |
| `XCUIElementTypeCollectionView`  | कलेक्शन व्यू |
| `XCUIElementTypeScrollView`      | स्क्रॉल व्यू     |

## सर्वोत्तम प्रथाएँ

### करें

- स्थिर, क्रॉस-प्लेटफ़ॉर्म सेलेक्टर्स के लिए **accessibility IDs का उपयोग करें**
- टेस्टिंग के लिए वेब एलिमेंट्स में **data-testid एट्रिब्यूट्स जोड़ें**
- जब accessibility IDs उपलब्ध न हों, तो Android पर **resource IDs का उपयोग करें**
- iOS पर XPath की बजाय **predicate strings को प्राथमिकता दें**
- **सेलेक्टर्स को सरल** और विशिष्ट रखें

### न करें

- **लंबे XPath एक्सप्रेशन्स से बचें** - वे धीमे और नाज़ुक होते हैं
- डायनामिक सूचियों के लिए **इंडेक्स पर निर्भर न रहें**
- स्थानीयकृत ऐप्स के लिए **टेक्स्ट-आधारित सेलेक्टर्स से बचें**
- **एब्सोल्यूट XPath का उपयोग न करें** (रूट से शुरू होने वाला)

### अच्छे बनाम खराब सेलेक्टर्स के उदाहरण

```text
# अच्छा - स्थिर accessibility ID
~loginButton

# खराब - इंडेक्स के साथ नाज़ुक XPath
//div[3]/form/button[2]

# अच्छा - test ID के साथ विशिष्ट CSS
[data-testid="submit-button"]

# खराब - क्लास जो बदल सकती है
.btn-primary-lg-v2

# अच्छा - resource ID के साथ UiAutomator
android=new UiSelector().resourceId("com.app:id/submit")

# खराब - टेक्स्ट जो स्थानीयकृत हो सकता है
android=new UiSelector().text("Submit")
```

## सेलेक्टर्स की डीबगिंग

### वेब (Chrome DevTools)

1. Chrome DevTools खोलें (F12)
2. एलिमेंट्स का निरीक्षण करने के लिए Elements पैनल का उपयोग करें
3. किसी एलिमेंट पर राइट-क्लिक करें → Copy → Copy selector
4. Console में सेलेक्टर्स का परीक्षण करें: `document.querySelector('your-selector')`

### मोबाइल (Appium Inspector)

1. Appium Inspector शुरू करें
2. अपने चल रहे सेशन से कनेक्ट करें
3. सभी उपलब्ध एट्रिब्यूट्स देखने के लिए एलिमेंट्स पर क्लिक करें
4. सेलेक्टर्स का परीक्षण करने के लिए "Search for element" सुविधा का उपयोग करें

### `get_elements` का उपयोग

MCP सर्वर का `get_elements` टूल प्रत्येक एलिमेंट के लिए कई सेलेक्टर रणनीतियाँ लौटाता है:

```text
Ask: "Get all visible elements on the screen"
```

यह पहले से जेनरेट किए गए सेलेक्टर्स के साथ एलिमेंट्स लौटाता है जिनका आप सीधे उपयोग कर सकते हैं।

#### उन्नत विकल्प

एलिमेंट खोज पर अधिक नियंत्रण के लिए:

```text
# केवल इमेज और विज़ुअल एलिमेंट्स प्राप्त करें
Get visible elements with elementType "visual"

# लेआउट डीबगिंग के लिए एलिमेंट्स को उनके निर्देशांकों के साथ प्राप्त करें
Get visible elements with includeBounds enabled

# अगले 20 एलिमेंट्स प्राप्त करें (पेजिनेशन)
Get visible elements with limit 20 and offset 20

# डीबगिंग के लिए लेआउट कंटेनर्स शामिल करें
Get visible elements with includeContainers enabled
```

टूल एक पेजिनेटेड रिस्पॉन्स लौटाता है:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### `get_accessibility` का उपयोग (केवल ब्राउज़र)

ब्राउज़र ऑटोमेशन के लिए, `get_accessibility` टूल पेज एलिमेंट्स के बारे में सिमेंटिक जानकारी प्रदान करता है:

```text
# सभी नामित accessibility नोड्स प्राप्त करें
Get accessibility tree

# केवल बटन और लिंक तक फ़िल्टर करें
Get accessibility tree filtered to button and link roles

# परिणामों का अगला पेज प्राप्त करें
Get accessibility tree with limit 50 and offset 50
```

यह तब उपयोगी होता है जब `get_elements` अपेक्षित एलिमेंट्स नहीं लौटाता, क्योंकि यह ब्राउज़र के नेटिव accessibility API से क्वेरी करता है।