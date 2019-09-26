
function getResolvedZoneId(ZoneId) {
    try {
        const resolvedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return ZoneId.of(resolvedTimeZone);
    } catch (err) {
        // ignore
    }
    return null;
}

export default function extendSystemDefaultZoneId(ZoneId) {
    const resolvedZoneId = getResolvedZoneId(ZoneId);

    if (resolvedZoneId == null) {
        return;
    }

    ZoneId.systemDefault = function () {
        return resolvedZoneId;
    };
}