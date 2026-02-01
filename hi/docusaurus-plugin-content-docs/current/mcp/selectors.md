---
id: selectors
title: सेलेक्टर्स
---

WebdriverIO MCP सर्वर वेब पेजेज और मोबाइल ऐप्स पर तत्वों का पता लगाने के लिए कई सेलेक्टर रणनीतियों का समर्थन करता है।

:::info

सभी WebdriverIO सेलेक्टर रणनीतियों सहित व्यापक सेलेक्टर प्रलेखन के लिए, मुख्य [Selectors](/docs/selectors) गाइड देखें। यह पृष्ठ MCP सर्वर के साथ आमतौर पर उपयोग किए जाने वाले सेलेक्टर्स पर केंद्रित है।

:::

## वेब सेलेक्टर्स

ब्राउज़र ऑटोमेशन के लिए, MCP सर्वर सभी मानक WebdriverIO सेलेक्टर्स का समर्थन करता है। सबसे आमतौर पर उपयोग किए जाने वाले सेलेक्टर्स में शामिल हैं:

| सेलेक्टर | उदाहरण | विवरण |
|----------|---------|-------------|
| CSS | `#login-button`, `.submit-btn` | मानक CSS सेलेक्टर्स |
| XPath | `//button[@id='submit']` | XPath एक्सप्रेशन्स |
| टेक्स्ट | `button=Submit`, `a*=Click` | WebdriverIO टेक्स्ट सेलेक्टर्स |
| ARIA | `aria/Submit Button` | एक्सेसिबिलिटी नाम सेलेक्टर्स |
| टेस्ट ID | `[data-testid="submit"]` | टेस्टिंग के लिए अनुशंसित |

विस्तृत उदाहरणों और सर्वोत्तम प्रथाओं के लिए, [Selectors](/docs/selectors) प्रलेखन देखें।

---

## मोबाइल सेलेक्टर्स

मोबाइल सेलेक्टर्स Appium के माध्यम से iOS और Android प्लेटफॉर्म दोनों के साथ काम करते हैं।

### एक्सेसिबिलिटी ID (अनुशंसित)

एक्सेसिबिलिटी IDs **सबसे विश्वसनीय क्रॉस-प्लेटफॉर्म सेलेक्टर** हैं। वे iOS और Android दोनों पर काम करते हैं और ऐप अपडेट्स के बीच स्थिर रहते हैं।

```
# सिंटैक्स
~accessibilityId

# उदाहरण
~loginButton
~submitForm
~usernameField
```

:::tip सर्वोत्तम प्रथा
जब उपलब्ध हों तो हमेशा एक्सेसिबिलिटी IDs को प्राथमिकता दें। वे प्रदान करते हैं:
- क्रॉस-प्लेटफॉर्म संगतता (iOS + Android)
- UI परिवर्तनों के बीच स्थिरता
- बेहतर टेस्ट मेंटेनेबिलिटी
- आपके ऐप की बेहतर एक्सेसिबिलिटी
:::

### Android सेलेक्टर्स

#### UiAutomator

UiAutomator सेलेक्टर्स Android के लिए शक्तिशाली और तेज़ हैं।

```
# टेक्स्ट द्वारा
android=new UiSelector().text("Login")

# आंशिक टेक्स्ट द्वारा
android=new UiSelector().textContains("Log")

# रिसोर्स ID द्वारा
android=new UiSelector().resourceId("com.example:id/login_button")

# क्लास नाम द्वारा
android=new UiSelector().className("android.widget.Button")

# विवरण द्वारा (एक्सेसिबिलिटी)
android=new UiSelector().description("Login button")

# संयुक्त शर्तें
android=new UiSelector().className("android.widget.Button").text("Login")

# स्क्रॉल योग्य कंटेनर
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### रिसोर्स ID

रिसोर्स IDs Android पर स्थिर तत्व पहचान प्रदान करते हैं।

```
# पूर्ण रिसोर्स ID
id=com.example.app:id/login_button

# आंशिक ID (ऐप पैकेज अनुमानित)
id=login_button
```

#### XPath (Android)

XPath Android पर काम करता है लेकिन UiAutomator से धीमा है।

```
# क्लास और टेक्स्ट द्वारा
//android.widget.Button[@text='Login']

# रिसोर्स ID द्वारा
//android.widget.EditText[@resource-id='com.example:id/username']

# सामग्री विवरण द्वारा
//android.widget.ImageButton[@content-desc='Menu']

# अनुक्रमिक
//android.widget.LinearLayout/android.widget.Button[1]
```

### iOS सेलेक्टर्स

#### प्रेडिकेट स्ट्रिंग

iOS प्रेडिकेट स्ट्रिंग्स iOS ऑटोमेशन के लिए तेज़ और शक्तिशाली हैं।

```
# लेबल द्वारा
-ios predicate string:label == "Login"

# आंशिक लेबल द्वारा
-ios predicate string:label CONTAINS "Log"

# नाम द्वारा
-ios predicate string:name == "loginButton"

# टाइप द्वारा
-ios predicate string:type == "XCUIElementTypeButton"

# मान द्वारा
-ios predicate string:value == "ON"

# संयुक्त शर्तें
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# दृश्यता
-ios predicate string:label == "Login" AND visible == 1

# केस इनसेंसिटिव
-ios predicate string:label ==[c] "login"
```

**प्रेडिकेट ऑपरेटर्स:**

| ऑपरेटर | विवरण |
|----------|-------------|
| `==` | बराबर |
| `!=` | बराबर नहीं |
| `CONTAINS` | सबस्ट्रिंग शामिल करता है |
| `BEGINSWITH` | से शुरू होता है |
| `ENDSWITH` | से समाप्त होता है |
| `LIKE` | वाइल्डकार्ड मैच |
| `MATCHES` | रेजेक्स मैच |
| `AND` | लॉजिकल AND |
| `OR` | लॉजिकल OR |

#### क्लास चेन

iOS क्लास चेन्स अच्छे प्रदर्शन के साथ अनुक्रमिक तत्व स्थान प्रदान करते हैं।

```
# प्रत्यक्ष संतान
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# कोई भी वंशज
-ios class chain:**/XCUIElementTypeButton

# इंडेक्स द्वारा
-ios class chain:**/XCUIElementTypeCell[3]

# प्रेडिकेट के साथ संयुक्त
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# अनुक्रमिक
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# अंतिम तत्व
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath iOS पर काम करता है लेकिन प्रेडिकेट स्ट्रिंग्स से धीमा है।

```
# टाइप और लेबल द्वारा
//XCUIElementTypeButton[@label='Login']

# नाम द्वारा
//XCUIElementTypeTextField[@name='username']

# मान द्वारा
//XCUIElementTypeSwitch[@value='1']

# अनुक्रमिक
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

---

## क्रॉस-प्लेटफॉर्म सेलेक्टर रणनीति

जब ऐसे टेस्ट लिख रहे हों जिन्हें iOS और Android दोनों पर काम करना है, तो इस प्राथमिकता क्रम का उपयोग करें:

### 1. एक्सेसिबिलिटी ID (सर्वोत्तम)

```
# दोनों प्लेटफॉर्म पर काम करता है
~loginButton
```

### 2. प्लेटफॉर्म-विशिष्ट सशर्त लॉजिक के साथ

जब एक्सेसिबिलिटी IDs उपलब्ध नहीं हों, प्लेटफॉर्म-विशिष्ट सेलेक्टर्स का उपयोग करें:

**Android:**
```
android=new UiSelector().text("Login")
```

**iOS:**
```
-ios predicate string:label == "Login"
```

### 3. XPath (अंतिम विकल्प)

XPath दोनों प्लेटफॉर्म पर काम करता है लेकिन अलग-अलग तत्व प्रकारों के साथ:

**Android:**
```
//android.widget.Button[@text='Login']
```

**iOS:**
```
//XCUIElementTypeButton[@label='Login']
```

---

## तत्व प्रकार संदर्भ

### Android तत्व प्रकार

| प्रकार | विवरण |
|------|-------------|
| `android.widget.Button` | बटन |
| `android.widget.EditText` | टेक्स्ट इनपुट |
| `android.widget.TextView` | टेक्स्ट लेबल |
| `android.widget.ImageView` | इमेज |
| `android.widget.ImageButton` | इमेज बटन |
| `android.widget.CheckBox` | चेकबॉक्स |
| `android.widget.RadioButton` | रेडियो बटन |
| `android.widget.Switch` | टॉगल स्विच |
| `android.widget.Spinner` | ड्रॉपडाउन |
| `android.widget.ListView` | लिस्ट व्यू |
| `android.widget.RecyclerView` | रिसाइक्लर व्यू |
| `android.widget.ScrollView` | स्क्रॉल कंटेनर |

### iOS तत्व प्रकार

| प्रकार | विवरण |
|------|-------------|
| `XCUIElementTypeButton` | बटन |
| `XCUIElementTypeTextField` | टेक्स्ट इनपुट |
| `XCUIElementTypeSecureTextField` | पासवर्ड इनपुट |
| `XCUIElementTypeStaticText` | टेक्स्ट लेबल |
| `XCUIElementTypeImage` | इमेज |
| `XCUIElementTypeSwitch` | टॉगल स्विच |
| `XCUIElementTypeSlider` | स्लाइडर |
| `XCUIElementTypePicker` | पिकर व्हील |
| `XCUIElementTypeTable` | टेबल व्यू |
| `XCUIElementTypeCell` | टेबल सेल |
| `XCUIElementTypeCollectionView` | कलेक्शन व्यू |
| `XCUIElementTypeScrollView` | स्क्रॉल व्यू |

---

## सर्वोत्तम प्रथाएँ

### करें

- **स्थिर, क्रॉस-प्लेटफॉर्म सेलेक्टर्स के लिए एक्सेसिबिलिटी IDs का उपयोग करें**
- **वेब तत्वों के लिए data-testid विशेषताएँ जोड़ें** टेस्टिंग के लिए
- **Android पर रिसोर्स IDs का उपयोग करें** जब एक्सेसिबिलिटी IDs उपलब्ध न हों
- **iOS पर XPath के बजाय प्रेडिकेट स्ट्रिंग्स को प्राथमिकता दें**
- **सेलेक्टर्स को सरल और विशिष्ट रखें**

### न करें

- **लंबे XPath एक्सप्रेशन्स से बचें** - वे धीमे और नाजुक होते हैं
- **डायनामिक सूचियों के लिए इंडेक्स पर निर्भर न रहें**
- **स्थानीयकृत ऐप्स के लिए टेक्स्ट-आधारित सेलेक्टर्स से बचें**
- **एब्सोल्यूट XPath का उपयोग न करें** (रूट से शुरू होने वाला)

### अच्छे बनाम बुरे सेलेक्टर्स के उदाहरण

```
# अच्छा - स्थिर एक्सेसिबिलिटी ID
~loginButton

# बुरा - इंडेक्स के साथ नाजुक XPath
//div[3]/form/button[2]

# अच्छा - टेस्ट ID के साथ विशिष्ट CSS
[data-testid="submit-button"]

# बुरा - क्लास जो बदल सकती है
.btn-primary-lg-v2

# अच्छा - रिसोर्स ID के साथ UiAutomator
android=new UiSelector().resourceId("com.app:id/submit")

# बुरा - टेक्स्ट जो स्थानीयकृत हो सकता है
android=new UiSelector().text("Submit")
```

---

## सेलेक्टर्स डीबगिंग

### वेब (Chrome DevTools)

1. Chrome DevTools खोलें (F12)
2. तत्वों का निरीक्षण करने के लिए Elements पैनल का उपयोग करें
3. किसी तत्व पर राइट-क्लिक करें → Copy → Copy selector
4. कंसोल में सेलेक्टर्स का परीक्षण करें: `document.querySelector('your-selector')`

### मोबाइल (Appium Inspector)

1. Appium Inspector शुरू करें
2. अपने चल रहे सेशन से कनेक्ट करें
3. सभी उपलब्ध विशेषताएँ देखने के लिए तत्वों पर क्लिक करें
4. सेलेक्टर्स का परीक्षण करने के लिए "Search for element" सुविधा का उपयोग करें

### `get_visible_elements` का उपयोग

MCP सर्वर का `get_visible_elements` टूल प्रत्येक तत्व के लिए कई सेलेक्टर रणनीतियाँ लौटाता है:

```
Ask Claude: "Get all visible elements on the screen"
```

यह तत्वों को पहले से जनरेट किए गए सेलेक्टर्स के साथ लौटाता है जिन्हें आप सीधे उपयोग कर सकते हैं।

#### उन्नत विकल्प

तत्व खोज पर अधिक नियंत्रण के लिए:

```
# केवल छवियाँ और दृश्य तत्व प्राप्त करें
Get visible elements with elementType "visual"

# लेआउट डीबगिंग के लिए उनके निर्देशांक के साथ तत्व प्राप्त करें
Get visible elements with includeBounds enabled

# अगले 20 तत्व प्राप्त करें (पेजिनेशन)
Get visible elements with limit 20 and offset 20

# डीबगिंग के लिए लेआउट कंटेनर शामिल करें
Get visible elements with includeContainers enabled
```

टूल एक पेजिनेटेड रिस्पांस लौटाता है:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### `get_accessibility` का उपयोग (केवल ब्राउज़र)

ब्राउज़र ऑटोमेशन के लिए, `get_accessibility` टूल पृष्ठ तत्वों के बारे में सिमेंटिक जानकारी प्रदान करता है:

```
# सभी नामित एक्सेसिबिलिटी नोड्स प्राप्त करें
Get accessibility tree

# केवल बटन और लिंक तक फ़िल्टर करें
Get accessibility tree filtered to button and link roles

# परिणामों का अगला पृष्ठ प्राप्त करें
Get accessibility tree with limit 50 and offset 50
```

यह उपयोगी है जब `get_visible_elements` अपेक्षित तत्व नहीं लौटाता है, क्योंकि यह ब्राउज़र के नेटिव एक्सेसिबिलिटी API को क्वेरी करता है।