function toUpper(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(function(Word) {
            return Word[0].toUpperCase() + Word.substr(1);
        })
        .join(' ');
     }
export default {
    toUpper
}