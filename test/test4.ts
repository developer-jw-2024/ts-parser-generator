import { toRegularExpressionChars } from "../src/LexicalAnalyzer/RegularExpression"

// toRegularExpressionChars('🌟')
// toRegularExpressionChars('我')

const GraphemeSplitter = require('grapheme-splitter');
const splitter = new GraphemeSplitter();

// Example string with emojis
const stringWithEmoji = 'Hello 👋🌍';

// Correctly split string into array of graphemes (characters as we see them)
const graphemes = splitter.splitGraphemes(stringWithEmoji);

console.log(graphemes); // Output will be an array of characters including emojis

// You can now iterate over each grapheme as if it were a separate character
graphemes.forEach(char => {
    console.log(char);
});

console.log('length = ', graphemes.length)