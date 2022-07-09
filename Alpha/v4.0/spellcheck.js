let words = fetch(`Media/en.txt`)
.then(a => a.text())
.then(a => a.split('\n'))
.then(a => {words = a});
function autoCorrect(word, similarityThreshold = 0.5) {
    function getBigram(word) {
        let result = [];
        for (let i = 0; i < word.length - 1; i++) {
            result.push(word[i] + word[i + 1]);
        }
        return result;
    }

    function getSimilarity(word1, word2) {
        word1 = word1.toLowerCase();
        word2 = word2.toLowerCase();
        const bigram1 = getBigram(word1),
            bigram2 = getBigram(word2);
        let similar = [];
        for (let i = 0; i < bigram1.length; i++) {
            if (bigram2.indexOf(bigram1[i]) > -1) {
                similar.push(bigram1[i]);
            }
        }
        return similar.length / Math.max(bigram1.length, bigram2.length);
    }
    let maxSimilarity = 0;
    let mostSimilar = word;
    for (let i = 0; i < words.length; i++) {
        let similarity = getSimilarity(words[i], word);
        if (similarity > maxSimilarity) {
            maxSimilarity = similarity;
            mostSimilar = words[i];
        }
    }
    return maxSimilarity > similarityThreshold ? mostSimilar : word;
}