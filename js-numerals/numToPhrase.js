const numToPhrase = (num) => {
    numLength = num.toString().length
    
    if (numLength > 11) return 'The number is too long';

    let x = ('00000000000' + num).substring(numLength).match(/^(\(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})$/);

    const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fiveteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen ']
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    let str = '';

    console.log(x)
   
    return str;
}