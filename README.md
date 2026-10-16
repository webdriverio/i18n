# i18n

Translation files for the WebdriverIO documentation, including a script that pulls the latest docs from the main repository and runs through a Large Language Model (LLM) to translate them.

> [!NOTE]
> The `v9` branch translates the `v9` docs of webdriverio/webdriverio (v9.webdriver.io). The nightly run updates only the default branch: run "Translation Process" on `v9` by hand. The workflow does not update the generated API pages: run it locally with `WEBDRIVERIO_DOCS` on a `v9` checkout (the script checks the version).

## Usage

After cloning this repository, create a `.env` file with the following secret keys required for pulling the source translation and translating them:

```
ANTHROPIC_API_KEY=...
GITHUB_TOKEN=...
```

Then kick off the translation script:

```sh
npm start
```

Note: the script is [caching](/src/cache.json) the translations per language, running it without cache may cost you a lot of LLM usage.

## Supported Languages

As noted in [`constants.ts`](/src/constants.ts), we currently translate into the following languages:

- 🇸🇦 Arabic
- 🇩🇪 German
- 🇪🇸 Spanish
- 🇮🇷 Persian
- 🇫🇷 French
- 🇬🇷 Greek
- 🇮🇳 Hindi
- 🇮🇹 Italian
- 🇯🇵 Japanese
- 🇵🇱 Polish
- 🇵🇹 Portuguese
- 🇷🇺 Russian
- 🇸🇪 Swedish
- 🇮🇳 Tamil
- 🇺🇦 Ukrainian
- 🇨🇳 Chinese!
- 🇻🇳 Vietnamese
- KO Korean

If you like your language supported as well, please raise a PR and add it to [`constants.ts`](/src/constants.ts#L35-L51).
