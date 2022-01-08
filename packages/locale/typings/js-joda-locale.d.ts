import * as core from '@js-joda/core';

export class Locale {
    public static getAvailableLocales(): string[];

    public constructor(language: string, country?: string, localeString?: string);

    public language(): string;
    public country(): string;
    public localeString(): string;
    public toString(): string;
    public equals(other: any): boolean;
}

export class WeekFields {
    public static ISO: WeekFields;
    public static SUNDAY_START: WeekFields;
    public static of(locale: Locale): WeekFields;
    public static of(firstDayOfWeek: core.DayOfWeek, minDays: number): WeekFields;
    public firstDayOfWeek(): core.DayOfWeek;
    public minimalDaysInFirstWeek(): number;
    public dayOfWeek(): core.TemporalField;
    public weekOfMonth(): core.TemporalField;
    public weekOfYear(): core.TemporalField;
    public weekOfWeekBasedYear(): core.TemporalField;
    public weekBasedYear(): core.TemporalField;
    public equals(other: any): boolean;
    public hashCode(): number;
    public toString(): string;
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

}

export const __esModule: true;
export as namespace JSJodaLocale;
