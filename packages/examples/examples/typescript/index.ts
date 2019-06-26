import { ZonedDateTime } from 'js-joda'
import 'js-joda-timezone'

const zdt = ZonedDateTime.now()
console.log(zdt.toString())

console.log('typescript sample done');
