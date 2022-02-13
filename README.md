# Sutom Solver

This project is a solver for [Sutom](https://sutom.nocle.fr/), the french
wordle.

This solver is based on Sutom dictionary a simple word weighting algorithm.

## How to use it

Launch the solver for today's word by doing :

```
npm start
```

## How it works

### Sutom rules

The goal of Sutom (inspired of Motus TV Game), is to find a word by suggesting
word and have hint about the difference between the suggested word and the word
to be found.

The hint is given by suggested word's letters. For exemple, if I have to find
the word 'BANANE' and I suggest 'ANANAS', Sutom will answer me that :

- The first letter is in the final word but not at the good place
- Same for the second and third letter
- The S and the last A are not in the final word

If after that I suggest 'BANDIT', then Sutom will answer me that the first three
letters are at a good position.

In Motus as in Sutom, you have 6 guess to find the word.

To help us, at the begining of the game, we have 2 hints :

- The length of the word
- The first letter of the word

### word weighting algorithm

To find the word as faster as it can, the solver use a word weighting algorithm.

To do so, it first has to evaluate the probability of a letter to appear in a
word of my dictionary. For example, in the Sutom dictionary, a 'A' has a weight
of 0.106584911361805, that's mean that you have a probability of 10,66% that a
random letter pick in the dictionary is an 'A'.

I done this for every letter in the dictionary in order to have an weighted
alphabet.

After that, I need to weighted the word. Because hint are given by letter, I
consider that it was more interesting to suggest word with as many different
letters with high probability as possible. So for each word of the dictionary, I
sum each letter's first occurrence weight.

### Solver algorithm

The solver use the hint given by the game to filter the dictionary and get only
matching hint words. And then it pick the weightiest word in the list.

## Conclusion

This solver is far to be perfect. The codebase need to be refactored and the
algorithm improved. But for me, the goal was to get an simple algorithm in
Typescript that can resolve Sutom riddles without human interaction and this
goal is achieve.

Thanks for reading.
