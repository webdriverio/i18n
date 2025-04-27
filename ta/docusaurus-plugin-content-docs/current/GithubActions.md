---
id: githubactions
title: கிட்ஹப் ஆக்ஷன்ஸ்
---

உங்கள் ரெபோசிட்டரி கிட்ஹப்பில் ஹோஸ்ட் செய்யப்பட்டிருந்தால், உங்கள் சோதனைகளை கிட்ஹப்பின் உள்கட்டமைப்பில் இயக்க [Github Actions](https://docs.github.com/en/actions) பயன்படுத்தலாம்.

1. நீங்கள் மாற்றங்களை புஷ் செய்யும் ஒவ்வொரு முறையும்
2. ஒவ்வொரு புல் கோரிக்கை உருவாக்கத்தின் போதும்
3. திட்டமிடப்பட்ட நேரத்தில்
4. கைமுறை தூண்டுதல் மூலம்

உங்கள் ரெபோசிட்டரியின் ரூட்டில், `.github/workflows` டைரக்டரியை உருவாக்கவும். ஒரு Yaml ஃபைலைச் சேர்க்கவும், எடுத்துக்காட்டாக `.github/workflows/ci.yaml`. அங்கே உங்கள் சோதனைகளை எவ்வாறு இயக்குவது என்பதை நீங்கள் கட்டமைப்பீர்கள்.

குறிப்பு அமலாக்கத்திற்கு [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) பார்க்கவும், மற்றும் [மாதிரி சோதனை ரன்கள்](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI).

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

வேர்க்ஃப்ளோ ஃபைல்களை உருவாக்குவது பற்றிய மேலும் தகவலுக்கு [Github Docs](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) இல் அறியவும்.