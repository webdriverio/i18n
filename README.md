# i18n

Translation files for the WebdriverIO documentation, including a script that pulls the latest docs from the main repository and runs through a Large Language Model (LLM) to translate them.

> [!NOTE]
> This is the `v9` branch: it translates the docs of the `v9` branch of [webdriverio/webdriverio](https://github.com/webdriverio/webdriverio), for the v9 website. The default branch translates `main` (v10).
>
> - The nightly "Translation Process" runs only on the default branch. To update the v9 translations, run it by hand on this branch: Actions → Translation Process → Run workflow → `v9`.
> - When you run it locally with `WEBDRIVERIO_DOCS`, it must point to a checkout of the `v9` branch of webdriverio/webdriverio.

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
