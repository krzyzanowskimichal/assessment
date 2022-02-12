let isBritish = false;

const numToPhrase = (num) => {
    numLength = num.toString().length
    if (numLength > 15) return 'The number is too long';
    let x = ('000000000000000' + num).substring(numLength).match(/^(\d{1})(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})(\d{1})(\d{2})$/);

    const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fiveteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen ']
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    let str = '';

    str += (x[1] != 0) ? (a[x[1]] || b[x[1][0]] + ' ' + a[x[1][1]]) + `hundred${x[2] != 0 ? ' and ' : ''}` : '';
    str += (x[2] != 0 || x[1] != 0) ? (a[Number(x[2])] || b[x[2][0]] + `${x[2][1] != 0 ? '-' : ' '}` + a[x[2][1]]) + 'trillion ' : '';
    str += (x[3] != 0) ? (a[x[3]] || b[x[3][0]] + ' ' + a[x[3][1]]) + `hundred${x[4] != 0 ? ' and ' : ''}` : '';
    str += (x[4] != 0 || x[3] != 0) ? (a[Number(x[4])] || b[x[4][0]] + `${x[4][1] != 0 ? '-' : ' '}` + a[x[4][1]]) + 'billion ' : '';
    str += (x[5] != 0) ? (a[x[5]] || b[x[5][0]] + ' ' + a[x[5][1]]) + `hundred${x[6] != 0 ? ' and ' : ''}` : '';
    str += (x[6] != 0 || x[5] != 0) ? (a[Number(x[6])] || b[x[6][0]] + `${x[6][1] != 0 ? '-' : ' '}` + a[x[6][1]]) + 'million ' : '';
    str += (x[7] != 0) ? (a[x[7]] || b[x[7][0]] + ' ' + a[x[7][1]]) + `hundred${x[8] != 0 ? ' and ' : ''}` : '';

    if (isBritish && x[8] === '01' && x[9][0] != 0) {
            str += a[Number('1' + x[9][0])] + 'hundred '
    }
    else {
        str += (x[8] != 0 || x[7] != 0) ? (a[Number(x[8])] || b[x[8][0]] + `${x[8][1] != 0 ? '-' : ' '}` + a[x[8][1]]) + 'thousand ' : '';
        str += (x[9] != 0) ? (a[x[9]] || b[x[9][0]] + ' ' + a[x[9][1]]) + `hundred ` : '';
    }

    str += (x[10] != 0) ? `${str.length > 0 ? 'and' : ''} ${(a[Number(x[10])] || b[x[10][0]] + `${x[10][1] != 0 ? '-' : ' '}` + a[x[10][1]])}` : '';

    return str.trim();
}