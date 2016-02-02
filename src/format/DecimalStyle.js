export class DecimalStyle {
    constructor(zeroChar, positiveSignChar, negativeSignChar, decimalPointChar) {
        this._zeroDigit = zeroChar;
        this._positiveSign = positiveSignChar;
        this._negativeSign = negativeSignChar;
        this._decimalSeparator = decimalPointChar;
    }

    positiveSign(){
        return this._positiveSign;
    }

    negativeSign(){
        return this._negativeSign;
    }

    zeroDigit(){
        return this._zeroDigit;
    }

    decimalSeparator(){
        return this._decimalSeparator;
    }

    convertToDigit(char){
        var val = char * 1;
        return (val >= 0 && val <= 9) ? val : -1;
    }
}

DecimalStyle.STANDARD = new DecimalStyle('0', '+', '-', '.');