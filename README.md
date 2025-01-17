# Word Guessing Game - NBAdle

This is a forked and modified version of an open source react-wordle repo (https://github.com/cwackerfuss/react-wordle)

The goal is to guess an NBA player last name in 8 tries.
The answer is less than or equal to 10 letters, so **Antetokounmpo** will never be the answer.
Special characters like " . " and " ' " will be ignored, so **O'Neal** should be **ONeal**.

In addition, there will be hints popping up when your guess is wrong in 3, 5, 7 rounds.
You can check the hints by clicking the lightbulb icon.

[**Try out NBAdle!**](https://kevinwei30.github.io/word-guessing-game/)

## Build and run
### To Run Locally:
Clone the repository and perform the following command line actions:

```bash
$> cd word-guessing-game
$> npm install
$> npm run start
```

### To build/run docker container:

```bash
$> docker build -t game .
$> docker run -d -p 3000:3000 game
```

Open [http://localhost:3000](http://localhost:3000) in browser.

## FAQ

### How can I change the length of a guess?
- Update the `MAX_WORD_LENGTH` variable in [src/constants/settings.ts](src/constants/settings.ts) to the desired length.
- Update the `WORDS` array in [src/constants/wordlist.ts](src/constants/wordlist.ts) to only include words of the new length.
- Update the `VALIDGUESSES` array in [src/constants/validGuesses.ts](src/constants/validGuesses.ts) arrays to only include words of the new length.

### How can I create a version in another language?
- In [public/index.html](public/index.html):
  - Update the title, the description, and the "You need to enable JavaScript" message
  - Update the language attribute in the HTML tag
  - If the language is written right-to-left, add `dir="rtl"` to the HTML tag
- Update the name and short name in [public/manifest.json](public/manifest.json)
- Update the strings in [src/constants/strings.ts](src/constants/strings.ts)
- Add all of the five letter words in the language to [src/constants/validGuesses.ts](src/constants/validGuesses.ts), replacing the English words
- Add a list of goal words in the language to [src/constants/wordlist.ts](src/constants/wordlist.ts), replacing the English words
- Update the "About" modal in [src/components/modals/AboutModel.tsx](src/components/modals/AboutModel.tsx)
- Update the "Info" modal in [src/components/modals/InfoModal.tsx](src/components/modals/InfoModal.tsx)
- If the language has letters that are not present in English, add them to the `CharValue` type in [src/lib/statuses.ts](src/lib/statuses.ts) and update the keyboard in [src/components/keyboard/Keyboard.tsx](src/components/keyboard/Keyboard.tsx)
- If the language's letters are made of multiple unicode characters, use a grapheme splitter at various points throughout the app or normalize the input so that all of the letters are made of a single character
- If the language is written right-to-left, prepend `\u202E` (the unicode right-to-left override character) to the return statement of the inner function in `generateEmojiGrid` in [src/lib/share.ts](src/lib/share.ts)
