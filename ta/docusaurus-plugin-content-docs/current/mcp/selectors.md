---
id: selectors
title: செலெக்டர்கள்
---

WebdriverIO MCP சர்வர் வலைப் பக்கங்கள் மற்றும் மொபைல் பயன்பாடுகளில் உள்ள கூறுகளைக் கண்டறிவதற்கு பல செலெக்டர் உத்திகளை ஆதரிக்கிறது.

:::info

அனைத்து WebdriverIO செலெக்டர் உத்திகளையும் உள்ளடக்கிய விரிவான செலெக்டர் ஆவணங்களுக்கு, முக்கிய [Selectors](/docs/selectors) வழிகாட்டியைப் பார்க்கவும். இந்தப் பக்கம் MCP சர்வருடன் பொதுவாகப் பயன்படுத்தப்படும் செலெக்டர்களை மையமாகக் கொண்டுள்ளது.

:::

## வலை செலெக்டர்கள்

உலாவி தானியக்கமாக்கலுக்கு, MCP சர்வர் அனைத்து நிலையான WebdriverIO செலெக்டர்களையும் ஆதரிக்கிறது. அதிகம் பயன்படுத்தப்படும் சிலவற்றில்:

| செலெக்டர் | உதாரணம் | விளக்கம் |
|----------|---------|-------------|
| CSS | `#login-button`, `.submit-btn` | நிலையான CSS செலெக்டர்கள் |
| XPath | `//button[@id='submit']` | XPath தொடர்கள் |
| Text | `button=Submit`, `a*=Click` | WebdriverIO உரை செலெக்டர்கள் |
| ARIA | `aria/Submit Button` | அணுகல்தன்மை பெயர் செலெக்டர்கள் |
| Test ID | `[data-testid="submit"]` | சோதனைக்கு பரிந்துரைக்கப்படுகிறது |

விரிவான உதாரணங்கள் மற்றும் சிறந்த நடைமுறைகளுக்கு, [Selectors](/docs/selectors) ஆவணத்தைப் பார்க்கவும்.

---

## மொபைல் செலெக்டர்கள்

மொபைல் செலெக்டர்கள் Appium மூலம் iOS மற்றும் Android இரண்டு தளங்களிலும் செயல்படுகின்றன.

### Accessibility ID (பரிந்துரைக்கப்படுகிறது)

Accessibility ID கள் **மிகவும் நம்பகமான பிளாட்ஃபார்ம் குறுக்கு செலெக்டர்** ஆகும். அவை iOS மற்றும் Android ஆகிய இரண்டிலும் செயல்படுகின்றன மற்றும் ஆப் புதுப்பிப்புகளின் போது நிலையாக இருக்கின்றன.

```
# வாக்கியமைப்பு
~accessibilityId

# உதாரணங்கள்
~loginButton
~submitForm
~usernameField
```

:::tip சிறந்த நடைமுறை
கிடைக்கும்போது எப்போதும் accessibility ID களை விரும்பவும். அவை வழங்குவது:
- பிளாட்ஃபார்ம் குறுக்கு இணக்கத்தன்மை (iOS + Android)
- UI மாற்றங்களின் போது நிலைத்தன்மை
- சிறந்த சோதனை பராமரிப்பு
- உங்கள் ஆப்பின் மேம்படுத்தப்பட்ட அணுகல்தன்மை
:::

### Android செலெக்டர்கள்

#### UiAutomator

UiAutomator செலெக்டர்கள் Android-க்கு சக்திவாய்ந்தவை மற்றும் வேகமானவை.

```
# உரை மூலம்
android=new UiSelector().text("Login")

# பகுதி உரை மூலம்
android=new UiSelector().textContains("Log")

# வள ID மூலம்
android=new UiSelector().resourceId("com.example:id/login_button")

# வகுப்பு பெயர் மூலம்
android=new UiSelector().className("android.widget.Button")

# விளக்கம் மூலம் (அணுகல்தன்மை)
android=new UiSelector().description("Login button")

# இணைந்த நிபந்தனைகள்
android=new UiSelector().className("android.widget.Button").text("Login")

# ஸ்க்ரோலல் கொள்கலன்
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

Resource ID கள் Android-இல் நிலையான கூறு அடையாளத்தை வழங்குகின்றன.

```
# முழு Resource ID
id=com.example.app:id/login_button

# பகுதி ID (ஆப் பேக்கேஜ் ஊகித்து)
id=login_button
```

#### XPath (Android)

XPath Android-இல் செயல்படுகிறது ஆனால் UiAutomator விட மெதுவானது.

```
# வகுப்பு மற்றும் உரை மூலம்
//android.widget.Button[@text='Login']

# வள ID மூலம்
//android.widget.EditText[@resource-id='com.example:id/username']

# உள்ளடக்க விளக்கம் மூலம்
//android.widget.ImageButton[@content-desc='Menu']

# படிநிலை
//android.widget.LinearLayout/android.widget.Button[1]
```

### iOS செலெக்டர்கள்

#### Predicate String

iOS Predicate String-கள் iOS தானியக்கமாக்கலுக்கு வேகமானவை மற்றும் சக்திவாய்ந்தவை.

```
# லேபிள் மூலம்
-ios predicate string:label == "Login"

# பகுதி லேபிள் மூலம்
-ios predicate string:label CONTAINS "Log"

# பெயர் மூலம்
-ios predicate string:name == "loginButton"

# வகை மூலம்
-ios predicate string:type == "XCUIElementTypeButton"

# மதிப்பு மூலம்
-ios predicate string:value == "ON"

# இணைந்த நிபந்தனைகள்
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# காட்சித்தன்மை
-ios predicate string:label == "Login" AND visible == 1

# பெரிய-சிறிய எழுத்து உணர்தல் இல்லை
-ios predicate string:label ==[c] "login"
```

**Predicate ஆபரேட்டர்கள்:**

| ஆபரேட்டர் | விளக்கம் |
|----------|-------------|
| `==` | சமமானது |
| `!=` | சமமற்றது |
| `CONTAINS` | துணை சரம் கொண்டுள்ளது |
| `BEGINSWITH` | தொடங்குகிறது |
| `ENDSWITH` | முடிகிறது |
| `LIKE` | வைல்ட்கார்டு பொருத்தம் |
| `MATCHES` | Regex பொருத்தம் |
| `AND` | லாஜிக்கல் AND |
| `OR` | லாஜிக்கல் OR |

#### Class Chain

iOS Class Chain-கள் நல்ல செயல்திறனுடன் படிநிலை கூறு இருப்பிடத்தை வழங்குகின்றன.

```
# நேரடி குழந்தை
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# எந்த வாரிசும்
-ios class chain:**/XCUIElementTypeButton

# குறியீடு மூலம்
-ios class chain:**/XCUIElementTypeCell[3]

# Predicate உடன் இணைந்தது
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# படிநிலை
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# கடைசி கூறு
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath iOS-இல் செயல்படுகிறது ஆனால் predicate string-களை விட மெதுவானது.

```
# வகை மற்றும் லேபிள் மூலம்
//XCUIElementTypeButton[@label='Login']

# பெயர் மூலம்
//XCUIElementTypeTextField[@name='username']

# மதிப்பு மூலம்
//XCUIElementTypeSwitch[@value='1']

# படிநிலை
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

---

## பிளாட்ஃபார்ம்-குறுக்கு செலெக்டர் உத்தி

iOS மற்றும் Android ஆகிய இரண்டிலும் செயல்பட வேண்டிய சோதனைகளை எழுதும்போது, இந்த முன்னுரிமை வரிசையைப் பயன்படுத்தவும்:

### 1. Accessibility ID (சிறந்தது)

```
# இரண்டு தளங்களிலும் செயல்படுகிறது
~loginButton
```

### 2. பிளாட்ஃபார்ம்-குறிப்பிட்ட நிபந்தனை தர்க்கத்துடன்

Accessibility ID கள் கிடைக்காதபோது, பிளாட்ஃபார்ம்-குறிப்பிட்ட செலெக்டர்களைப் பயன்படுத்தவும்:

**Android:**
```
android=new UiSelector().text("Login")
```

**iOS:**
```
-ios predicate string:label == "Login"
```

### 3. XPath (கடைசி தீர்வு)

XPath இரண்டு தளங்களிலும் செயல்படுகிறது, ஆனால் வெவ்வேறு கூறு வகைகளுடன்:

**Android:**
```
//android.widget.Button[@text='Login']
```

**iOS:**
```
//XCUIElementTypeButton[@label='Login']
```

---

## கூறு வகைகள் குறிப்பு

### Android கூறு வகைகள்

| வகை | விளக்கம் |
|------|-------------|
| `android.widget.Button` | பொத்தான் |
| `android.widget.EditText` | உரை உள்ளீடு |
| `android.widget.TextView` | உரை லேபிள் |
| `android.widget.ImageView` | படம் |
| `android.widget.ImageButton` | படப் பொத்தான் |
| `android.widget.CheckBox` | சரிபார்ப்புப் பெட்டி |
| `android.widget.RadioButton` | ரேடியோ பொத்தான் |
| `android.widget.Switch` | டாகிள் சுவிட்ச் |
| `android.widget.Spinner` | கீழ்தோன்றல் |
| `android.widget.ListView` | பட்டியல் காட்சி |
| `android.widget.RecyclerView` | மறுசுழற்சி காட்சி |
| `android.widget.ScrollView` | ஸ்க்ரோல் கொள்கலன் |

### iOS கூறு வகைகள்

| வகை | விளக்கம் |
|------|-------------|
| `XCUIElementTypeButton` | பொத்தான் |
| `XCUIElementTypeTextField` | உரை உள்ளீடு |
| `XCUIElementTypeSecureTextField` | கடவுச்சொல் உள்ளீடு |
| `XCUIElementTypeStaticText` | உரை லேபிள் |
| `XCUIElementTypeImage` | படம் |
| `XCUIElementTypeSwitch` | டாகிள் சுவிட்ச் |
| `XCUIElementTypeSlider` | ஸ்லைடர் |
| `XCUIElementTypePicker` | தேர்வாளர் சக்கரம் |
| `XCUIElementTypeTable` | அட்டவணை காட்சி |
| `XCUIElementTypeCell` | அட்டவணை செல் |
| `XCUIElementTypeCollectionView` | சேகரிப்பு காட்சி |
| `XCUIElementTypeScrollView` | ஸ்க்ரோல் காட்சி |

---

## சிறந்த நடைமுறைகள்

### செய்யவேண்டியவை

- **நிலையான, பிளாட்ஃபார்ம்-குறுக்கு செலெக்டர்களுக்கு accessibility ID களைப் பயன்படுத்தவும்**
- **வலை கூறுகளுக்கு data-testid பண்புகளைச் சேர்க்கவும்**
- **Android-இல் accessibility ID கள் இல்லாதபோது resource ID களைப் பயன்படுத்தவும்**
- **iOS-இல் XPath-ஐ விட predicate string களை விரும்பவும்**
- **செலெக்டர்களை எளிமையாகவும் குறிப்பிட்டதாகவும் வைக்கவும்**

### செய்யக்கூடாதவை

- **நீண்ட XPath தொடர்களைத் தவிர்க்கவும்** - அவை மெதுவானவை மற்றும் எளிதில் உடையக்கூடியவை
- **மாறும் பட்டியல்களுக்கு குறியீடுகளை நம்பாதீர்கள்**
- **மொழிபெயர்க்கப்பட்ட ஆப்களுக்கு உரை-அடிப்படையிலான செலெக்டர்களைத் தவிர்க்கவும்**
- **முழுமையான XPath ஐப் பயன்படுத்தாதீர்கள்** (ரூட்டிலிருந்து தொடங்குகிறது)

### நல்ல மற்றும் மோசமான செலெக்டர்களின் உதாரணங்கள்

```
# நல்லது - நிலையான accessibility ID
~loginButton

# மோசமானது - குறியீடுகளுடன் எளிதில் உடையக்கூடிய XPath
//div[3]/form/button[2]

# நல்லது - சோதனை ID உடன் குறிப்பிட்ட CSS
[data-testid="submit-button"]

# மோசமானது - மாறக்கூடிய வகுப்பு
.btn-primary-lg-v2

# நல்லது - வள ID உடன் UiAutomator
android=new UiSelector().resourceId("com.app:id/submit")

# மோசமானது - மொழிபெயர்க்கப்படக்கூடிய உரை
android=new UiSelector().text("Submit")
```

---

## செலெக்டர்களை பிழைத்திருத்துதல்

### வலை (Chrome DevTools)

1. Chrome DevTools ஐத் திறக்கவும் (F12)
2. கூறுகளை ஆய்வு செய்ய Elements பேனலைப் பயன்படுத்தவும்
3. ஒரு கூறை வலது-கிளிக் செய்து → Copy → Copy selector
4. Console-இல் செலெக்டர்களை சோதிக்கவும்: `document.querySelector('your-selector')`

### மொபைல் (Appium Inspector)

1. Appium Inspector ஐத் தொடங்கவும்
2. உங்கள் இயங்கும் அமர்வுடன் இணைக்கவும்
3. கிடைக்கக்கூடிய அனைத்து பண்புகளையும் பார்க்க கூறுகளைக் கிளிக் செய்யவும்
4. செலெக்டர்களை சோதிக்க "Search for element" அம்சத்தைப் பயன்படுத்தவும்

### `get_visible_elements` பயன்படுத்துதல்

MCP சர்வரின் `get_visible_elements` கருவி ஒவ்வொரு கூறுக்கும் பல செலெக்டர் உத்திகளை வழங்குகிறது:

```
Ask Claude: "Get all visible elements on the screen"
```

இது நீங்கள் நேரடியாகப் பயன்படுத்தக்கூடிய முன் உருவாக்கப்பட்ட செலெக்டர்களுடன் கூறுகளை வழங்குகிறது.

#### மேம்பட்ட விருப்பங்கள்

கூறு கண்டுபிடிப்பின் மீது அதிக கட்டுப்பாட்டிற்கு:

```
# படங்கள் மற்றும் காட்சி கூறுகளை மட்டும் பெறவும்
Get visible elements with elementType "visual"

# லேஅவுட் பிழைத்திருத்தலுக்கான ஆயத்துடன் கூறுகளைப் பெறவும்
Get visible elements with includeBounds enabled

# அடுத்த 20 கூறுகளைப் பெறவும் (பக்கமாக்கல்)
Get visible elements with limit 20 and offset 20

# பிழைத்திருத்தலுக்கான லேஅவுட் கொள்கலன்களைச் சேர்க்கவும்
Get visible elements with includeContainers enabled
```

கருவி ஒரு பக்கமாக்கப்பட்ட பதிலை வழங்குகிறது:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### `get_accessibility` பயன்படுத்துதல் (உலாவி மட்டும்)

உலாவி தானியக்கமாக்கலுக்கு, `get_accessibility` கருவி பக்க கூறுகளைப் பற்றிய சொல்லடக்க தகவலை வழங்குகிறது:

```
# அனைத்து பெயரிடப்பட்ட அணுகல்தன்மை முனைகளைப் பெறவும்
Get accessibility tree

# பொத்தான்கள் மற்றும் இணைப்புகளுக்கு மட்டும் வடிகட்டவும்
Get accessibility tree filtered to button and link roles

# முடிவுகளின் அடுத்த பக்கத்தைப் பெறவும்
Get accessibility tree with limit 50 and offset 50
```

இது `get_visible_elements` எதிர்பார்க்கப்படும் கூறுகளை வழங்காதபோது பயனுள்ளதாக இருக்கும், ஏனெனில் இது உலாவியின் உள்ளார்ந்த அணுகல்தன்மை API-ஐ வினவுகிறது.