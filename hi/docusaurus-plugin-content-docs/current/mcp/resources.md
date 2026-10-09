---
id: resources
title: रिसोर्सेज़
description: "WebdriverIO MCP सर्वर के रीड-ओनली wdio:// रिसोर्सेज़ के माध्यम से लाइव सेशन स्टेट, सेशन हिस्ट्री और क्लाउड प्रोवाइडर सेटअप विवरण पढ़ें।"
---

MCP रिसोर्सेज़ लाइव सेशन स्टेट तक रीड-ओनली एक्सेस प्रदान करते हैं। टूल्स के विपरीत, रिसोर्सेज़ को AI मॉडल अपनी इच्छा से प्राप्त करता है; वे कोई एक्शन निष्पादित नहीं करते। सभी रिसोर्सेज़ `wdio://` URI स्कीम का उपयोग करते हैं।

## रिसोर्सेज़ बनाम टूल्स का उपयोग कब करें

- **रिसोर्सेज़** — परिवेशी स्टेट जो आपके इंटरैक्ट करने के साथ बदलती है: वर्तमान एलिमेंट्स, स्क्रीनशॉट, कुकीज़, एक्सेसिबिलिटी ट्री। स्क्रीन पर क्या है यह समझने के लिए कोई एक्शन करने से पहले इन्हें पढ़ें।
- **टूल्स** — एक्शन जो स्टेट बदलते हैं: क्लिक करना, नेविगेट करना, वैल्यू सेट करना।

एलिमेंट खोजने के लिए `get_screenshot` के बजाय `wdio://session/current/elements` को प्राथमिकता दें; यह उपयोग के लिए तैयार सेलेक्टर्स लौटाता है और इसमें बहुत कम टोकन खर्च होते हैं।

## सेशन हिस्ट्री

### `wdio://sessions`

मेटाडेटा और स्टेप काउंट के साथ सभी ब्राउज़र और ऐप सेशन्स का इंडेक्स।

```json
{
  "sessions": [
    {
      "sessionId": "abc-123",
      "type": "browser",
      "startedAt": "2024-01-15T10:00:00.000Z",
      "endedAt": "2024-01-15T10:05:00.000Z",
      "stepCount": 12,
      "isCurrent": false
    }
  ]
}
```

---

### `wdio://session/current/steps`

वर्तमान में सक्रिय सेशन के लिए JSON स्टेप लॉग। इसमें टूल नाम, पैरामीटर्स और टाइमस्टैम्प के साथ सभी रिकॉर्ड किए गए ऑटोमेशन स्टेप्स शामिल होते हैं।

---

### `wdio://session/current/code`

वर्तमान में सक्रिय सेशन के लिए जनरेट किया गया WebdriverIO JavaScript। रिकॉर्ड किए गए स्टेप्स से स्वचालित रूप से जनरेट होता है। सेशन को दोबारा चलाने के लिए इसे किसी WebdriverIO टेस्ट फ़ाइल में पेस्ट करें।

---

### `wdio://session/{sessionId}/steps`

ID द्वारा किसी विशिष्ट सेशन का स्टेप लॉग। URI टेम्पलेट — `{sessionId}` को `wdio://sessions` से प्राप्त ID से बदलें।

---

### `wdio://session/{sessionId}/code`

ID द्वारा किसी विशिष्ट सेशन के लिए जनरेट किया गया WebdriverIO JavaScript। URI टेम्पलेट — `{sessionId}` को `wdio://sessions` से प्राप्त ID से बदलें।

## लाइव पेज स्टेट (वर्तमान सेशन)

### `wdio://session/current/elements`

वर्तमान पेज पर इंटरैक्ट करने योग्य एलिमेंट्स। उपयोग के लिए तैयार सेलेक्टर्स, एलिमेंट टेक्स्ट और विज़िबिलिटी जानकारी लौटाता है।

**स्क्रीन पर क्या है यह समझने के लिए यह प्राथमिक रिसोर्स है।** क्लिक करने या टाइप करने से पहले इसे पढ़ें। यह स्क्रीनशॉट की तुलना में बहुत तेज़ और सस्ता है।

उन्नत फ़िल्टरिंग (केवल व्यूपोर्ट, कंटेनर्स, बाउंडिंग बॉक्स, पेजिनेशन) के लिए, इसके बजाय `get_elements` टूल का उपयोग करें।

---

### `wdio://session/current/accessibility`

वर्तमान पेज का एक्सेसिबिलिटी ट्री। डिफ़ॉल्ट रूप से role, name, selector और state एट्रिब्यूट्स के साथ सभी नोड्स लौटाता है। केवल ब्राउज़र के लिए। मोबाइल पर, `wdio://session/current/elements` का उपयोग करें।

```json
{
  "total": 84,
  "showing": 84,
  "hasMore": false,
  "nodes": [
    {
      "role": "button",
      "name": "Submit",
      "selector": "button.submit-btn",
      "disabled": false
    }
  ]
}
```

फ़िल्टर किए गए परिणामों (role के अनुसार, पेजिनेटेड) के लिए, `get_accessibility_tree` टूल का उपयोग करें।

---

### `wdio://session/current/screenshot`

वर्तमान पेज या स्क्रीन का base64-एन्कोडेड इमेज के रूप में स्क्रीनशॉट। स्वचालित रूप से रीसाइज़ (अधिकतम 2000px) और कंप्रेस (अधिकतम 1 MB) किया जाता है।

विज़ुअल सत्यापन या लेआउट डीबगिंग के लिए उपयोग करें। एलिमेंट खोजने के लिए, `wdio://session/current/elements` को प्राथमिकता दें।

---

### `wdio://session/current/cookies`

वर्तमान ब्राउज़र सेशन की सभी कुकीज़।

```json
[
  {
    "name": "session_token",
    "value": "abc123",
    "domain": "example.com",
    "path": "/",
    "httpOnly": true,
    "secure": true
  }
]
```

---

### `wdio://session/current/tabs`

वर्तमान सेशन में सभी खुले ब्राउज़र टैब्स। केवल ब्राउज़र के लिए।

```json
[
  {
    "handle": "CDwindow-ABC",
    "title": "My App",
    "url": "https://example.com/dashboard",
    "isActive": true
  }
]
```

लक्षित हैंडल या इंडेक्स खोजने के लिए `switch_tab` से पहले इसका उपयोग करें।

---

### `wdio://session/current/contexts`

उपलब्ध ऑटोमेशन कॉन्टेक्स्ट्स (NATIVE_APP, WEBVIEW)। केवल मोबाइल के लिए।

```json
["NATIVE_APP", "WEBVIEW_com.example.app"]
```

---

### `wdio://session/current/context`

वर्तमान में सक्रिय ऑटोमेशन कॉन्टेक्स्ट। केवल मोबाइल के लिए।

```json
"NATIVE_APP"
```

---

### `wdio://session/current/app-state/{bundleId}`

दिए गए bundle ID के लिए ऐप लाइफ़साइकल स्टेट। केवल मोबाइल के लिए। URI टेम्पलेट — `{bundleId}` को iOS bundle ID या Android package name से बदलें।

इनमें से एक लौटाता है:
- `0` — इंस्टॉल नहीं है
- `1` — नहीं चल रहा है
- `2` — बैकग्राउंड में चल रहा है (सस्पेंडेड)
- `3` — बैकग्राउंड में चल रहा है
- `4` — फ़ोरग्राउंड में चल रहा है

नामित आउटपुट के लिए, इसके बजाय `get_app_state` टूल का उपयोग करें।

---

### `wdio://session/current/geolocation`

`set_geolocation` द्वारा सेट किया गया वर्तमान डिवाइस जियोलोकेशन ओवरराइड।

```json
{
  "latitude": 51.5074,
  "longitude": -0.1278,
  "altitude": 0
}
```

---

### `wdio://session/current/logs`

वर्तमान सेशन के सेशन लॉग्स। ब्राउज़र कंसोल संदेश और JavaScript एक्सेप्शन्स (Chromium सेशन्स), logcat आउटपुट (Android), या crash/syslog (iOS) लौटाता है।

```json
{
  "type": "browser",
  "logs": [
    { "level": "SEVERE", "message": "Uncaught TypeError: ...", "source": "javascript" },
    { "level": "INFO", "message": "Page loaded", "source": "console" }
  ]
}
```

---

### `wdio://session/current/capabilities`

वर्तमान सेशन के लिए WebDriver या Appium सर्वर द्वारा लौटाई गई रॉ capabilities। डीबगिंग के लिए उपयोग करें; यह ड्राइवर द्वारा स्वीकार की गई वास्तविक वैल्यूज़ दिखाता है, जिसमें क्लाउड प्रोवाइडर या Appium द्वारा लागू किए गए डिफ़ॉल्ट भी शामिल हैं।

## क्लाउड प्रोवाइडर्स

### `wdio://browserstack/local-binary`

BrowserStack Local बाइनरी के लिए प्लेटफ़ॉर्म-विशिष्ट डाउनलोड URL और डेमन सेटअप निर्देश। `provider: "browserstack"` के साथ `tunnel: true` या `tunnel: "external"` का उपयोग करने से पहले इसे पढ़ें; इसमें आपके OS और आर्किटेक्चर के लिए सटीक कमांड्स शामिल हैं।

```json
{
  "platform": "macOS",
  "arch": "arm64",
  "downloadUrl": "https://...",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./BrowserStackLocal --key YOUR_KEY",
    "stop": "...",
    "status": "..."
  }
}
```

---

### `wdio://saucelabs/local-binary`

Sauce Connect Proxy के लिए प्लेटफ़ॉर्म-विशिष्ट डाउनलोड URL और डेमन सेटअप निर्देश। `provider: "saucelabs"` के साथ `tunnel: "external"` का उपयोग करने से पहले इसे पढ़ें; `tunnel: true` के लिए SDK स्वचालित रूप से Sauce Connect को मैनेज करता है।

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://saucelabs.com/downloads/sc-4.9.2-linux.tar.gz",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./sc -u YOUR_USERNAME -k YOUR_ACCESS_KEY --region eu-central-1",
    "stop": "./sc --stop",
    "status": "./sc --status"
  }
}
```

---

### `wdio://testmu/local-binary`

TestMu Tunnel के लिए प्लेटफ़ॉर्म-विशिष्ट डाउनलोड URL और डेमन सेटअप निर्देश। केवल `provider: "testmu"` के साथ `tunnel: "external"` के लिए आवश्यक — `tunnel: true` के लिए SDK `@lambdatest/node-tunnel` के माध्यम से टनल को स्वचालित रूप से मैनेज करता है।

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://downloads.lambdatest.com/tunnel/v4/linux/64bit/LT_Linux.zip",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY",
    "stop": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY --stop",
    "status": "./LT --status"
  }
}
```

---

### `wdio://testingbot/local-binary`

TestingBot Tunnel के लिए डाउनलोड URL और डेमन सेटअप निर्देश। यह टनल एक क्रॉस-प्लेटफ़ॉर्म Java JAR है (Java 11+ आवश्यक)। केवल `provider: "testingbot"` के साथ `tunnel: "external"` के लिए आवश्यक — `tunnel: true` के लिए SDK `testingbot-tunnel-launcher` के माध्यम से टनल को स्वचालित रूप से मैनेज करता है।

```json
{
  "requirement": "MUST start the TestingBot Tunnel BEFORE calling start_session with tunnel: \"external\".",
  "runtime": "Java 11+ (17 LTS recommended)",
  "downloadUrl": "https://testingbot.com/downloads/testingbot-tunnel.zip",
  "setup": [
    "1. Download: curl -O https://testingbot.com/downloads/testingbot-tunnel.zip",
    "2. Unzip: unzip testingbot-tunnel.zip",
    "3. Start: java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET"
  ],
  "commands": {
    "start": "java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET",
    "stop": "Press Ctrl+C in the tunnel terminal, or kill the java process."
  }
}
```