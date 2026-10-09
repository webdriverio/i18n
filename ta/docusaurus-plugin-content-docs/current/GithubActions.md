---
id: githubactions
title: Github Actions
description: "உங்கள் repository-இல் ஒரு workflow கோப்பைச் சேர்ப்பதன் மூலம் உங்கள் WebdriverIO சோதனைகளை GitHub Actions-இல் இயக்குங்கள்."
---

உங்கள் repository Github-இல் hosting செய்யப்பட்டிருந்தால், Github-இன் உள்கட்டமைப்பில் உங்கள் சோதனைகளை இயக்க [Github Actions](https://docs.github.com/en/actions)-ஐப் பயன்படுத்தலாம். பின்வரும் சந்தர்ப்பங்களில் சோதனைகளை இயக்கலாம்:

1. ஒவ்வொரு முறையும் நீங்கள் மாற்றங்களை push செய்யும்போது
2. ஒவ்வொரு pull request உருவாக்கத்தின்போதும்
3. திட்டமிடப்பட்ட நேரத்தில்
4. கைமுறை தூண்டுதல் (manual trigger) மூலம்

உங்கள் repository-இன் root-இல், `.github/workflows` என்ற directory-ஐ உருவாக்கவும். ஒரு Yaml கோப்பைச் சேர்க்கவும், எடுத்துக்காட்டாக `.github/workflows/ci.yaml`. அதில் உங்கள் சோதனைகளை எவ்வாறு இயக்குவது என்பதை நீங்கள் கட்டமைப்பீர்கள்.

மாதிரி செயல்படுத்தலுக்கு [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml)-ஐயும், [மாதிரி சோதனை இயக்கங்களையும்](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI) பார்க்கவும்.

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

workflow கோப்புகளை உருவாக்குவது பற்றிய கூடுதல் தகவல்களை [Github Docs](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli)-இல் அறிந்து கொள்ளுங்கள்.