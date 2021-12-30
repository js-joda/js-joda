export class Locale {
    public static getAvailableLocales(): string[];

    public constructor(language: string, country?: string, localeString?: string);

    public language(): string;
    public country(): string;
    public localeString(): string;
    public toString(): string;
    public equals(other: any): boolean;
}

export class ComputedDayOfField {
    public static ofDayOfWeekField(weekDef: WeekFields);
    public static ofWeekOfMonthField(weekDef: WeekFields);
    public static ofWeekOfYearField(weekDef: WeekFields);
    public static ofWeekOfWeekBasedYearField(weekDef: WeekFields);
    public static ofWeekBasedYearField(weekDef: WeekFields);
    public getFrom(temporal: core.TemporalAccessor);
    public adjustInto(temporal: core.Temporal, newValue: number);
    public resolve(fieldValues: core.EnumMap, partialTemporal: core.TemporalAccessor, resolverStyle: core.ResolverStyle);
    public name(): string;
    public getBaseUnit(): core.TemporalUnit;
    public getRangeUnit(): core.TemporalUnit;
    public range(): core.ValueRange;
    public isDateBased(): boolean;
    public isTimeBased(): boolean;
    public isSupportedBy(temporal: core.TemporalAccessor): boolean;
    public rangeRefinedBy(temporal: core.TemporalAccessor): core.ValueRange;
}

export class WeekFields {
    public static ISO: WeekFields;
    public static SUNDAY_START: WeekFields;
    public static ofLocale(locale: Locale): WeekFields;
    public static of(firstDayOrLocale: core.DayOfWeek | Locale, minDays?: number);
    public static ofFirstDayOfWeekMinDays(firstDayOfWeek, minimalDaysInFirstWeek);
    public firstDayOfWeek(): core.DayOfWeek;
    public minimalDaysInFirstWeek(): number;
    public dayOfWeek(): core.TemporalField;
    public weekOfMonth(): core.TemporalField;
    public weekOfYear(): core.TemporalField;
    public weekOfWeekBasedYear(): core.TemporalField;
    public weekBasedYear(): core.TemporalField;
    public equals(other: any): boolean;
}

export namespace Locale {
    const ENGLISH: Locale;
    const US: Locale;
    const UK: Locale;
    const CANADA: Locale;
    const FRENCH: Locale;
    const FRANCE: Locale;
    const GERMAN: Locale;
    const GERMANY: Locale;
    const KOREAN: Locale;
    const JAPANESE: Locale;
    const JAPAN: Locale;
    const ITALIAN: Locale;
    const ITALY: Locale;
    const CHINESE: Locale;
    const ROMANIAN: Locale;
    const SWEDISH: Locale;
    const SWEDEN: Locale;
    const HINDI: Locale;
    const RUSSIAN: Locale;
}

import * as core from '@js-joda/core';

declare module '@js-joda/core' {
    namespace DateTimeFormatter {
        export const RFC_1123_DATE_TIME: DateTimeFormatter;
    }

    export interface DateTimeFormatter {
        withLocale(locale: Locale): DateTimeFormatter;
        locale(): Locale | null;
    }

    export interface DateTimeFormatterBuilder {
        appendText(field: core.ChronoField, styleOrMap: core.TextStyle | Record<string | number, string>): DateTimeFormatterBuilder;
        appendWeekField(field: string, count: number): DateTimeFormatterBuilder;
        appendZoneText(textStyle: core.TextStyle): DateTimeFormatterBuilder;
        appendLocalizedOffset(textStyle: core.TextStyle): DateTimeFormatterBuilder;
    }

    export interface Nameable {
        name(): string;
    }

    export interface EnumMap {
        putAll(otherMap: EnumMap): EnumMap;
        containsKey(key: Nameable): boolean;
        get(key: Nameable): any;
        put(key: Nameable, val): EnumMap;
        set(key: Nameable, val): EnumMap;
        retainAll(keyList): EnumMap;
        remove(key: Nameable): any;
        keySet(): Record<string, any>;
        clear();
    }
}

export const __esModule: true;
export as namespace JSJodaLocale;
