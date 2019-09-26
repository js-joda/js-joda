/**
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {DateTimeException} from '../../../src/errors';
import {Temporal} from '../../../src/temporal/Temporal';

export class EMPTY extends Temporal{
    isSupported() {
        return true;
    }

    getLong() {
        throw new DateTimeException('Mock');
    }
}
