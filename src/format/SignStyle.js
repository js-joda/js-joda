/**
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

export class SignStyle {
    /**
     * Parse helper.
     *
     * @param positive  true if positive sign parsed, false for negative sign
     * @param strict  true if strict, false if lenient
     * @param fixedWidth  true if fixed width, false if not
     * @return true if valid
     */
    parse(positive, strict, fixedWidth){
        switch (this) {
            case SignStyle.NORMAL: // NORMAL
                // valid if negative or (positive and lenient)
                return !positive || !strict;
            case SignStyle.ALWAYS: // ALWAYS
            case SignStyle.EXCEEDS_PAD: // EXCEEDS_PAD
                return true;
            default:
                // valid if lenient and not fixed width
                return !strict && !fixedWidth;
        }

    }

}

SignStyle.NORMAL = new SignStyle();
SignStyle.ALWAYS = new SignStyle();
SignStyle.EXCEEDS_PAD = new SignStyle();
SignStyle.NOT_NEGATIVE = new SignStyle();
