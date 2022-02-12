const numToPhrase = require('./numToPhrase')

test("Returns number converted to words", () => {
    expect(numToPhrase(7)).toBe("seven");
    expect(numToPhrase(42)).toBe("forty-two");
    expect(numToPhrase(1999)).toBe("one thousand nine hundred and ninety-nine");
    expect(numToPhrase(2001)).toBe("two thousand and one");
    expect(numToPhrase(17999)).toBe("seventeen thousand nine hundred and ninety-nine");
    expect(numToPhrase(342251)).toBe("three hundred and forty-two thousand two hundred and fifty-one");
    expect(numToPhrase(1300420)).toBe("one million three hundred thousand four hundred and twenty");
})