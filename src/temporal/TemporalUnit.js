/*
 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

/**
 * A unit of date-time, such as Days or Hours.
 * <p>
 * Measurement of time is built on units, such as years, months, days, hours, minutes and seconds.
 * Implementations of this interface represent those units.
 * <p>
 * An instance of this interface represents the unit itself, rather than an amount of the unit.
 * See {@link Period} for a class that represents an amount in terms of the common units.
 * <p>
 * The most commonly used units are defined in {@link ChronoUnit}.
 * Further units are supplied in {@link IsoFields}.
 * Units can also be written by application code by implementing this interface.
 * <p>
 * The unit works using double dispatch. Client code calls methods on a date-time like
 * {@code LocalDateTime} which check if the unit is a {@code ChronoUnit}.
 * If it is, then the date-time must handle it.
 * Otherwise, the method call is re-dispatched to the matching method in this interface.
 *
 * @interface
 */
export class TemporalUnit {}