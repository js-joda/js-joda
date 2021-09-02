export class Locale {
    public static getAvailableLocales(): string[];

    public constructor(language: string, country?: string, localeString?: string);

    public language(): string;
    public country(): string;
    public localeString(): string;
    public toString(): string;
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
}

import * as core from '@js-joda/core';

declare module '@js-joda/core' {
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
