/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.Instant;
import java.time.ZoneId;
import java.time.zone.ZoneRules;
import java.time.zone.ZoneRulesProvider;
import java.util.HashMap;
import java.util.Map;

/**
 * Answers the queries of standard-offsets.js with java.time. Reads lines
 * "zone TAB epochMilli TAB expectedStandardOffsetSeconds" from stdin and prints
 * "tzdb TAB version" first, then "unknown TAB zone" once per zone that java.time doesn't know and
 * "diff TAB zone TAB epochMilli TAB javaSeconds TAB expectedSeconds" for every difference.
 *
 * Usage: java StandardOffsetCheck.java < queries
 */
public class StandardOffsetCheck {
    public static void main(String[] args) throws Exception {
        System.out.println("tzdb\t" + ZoneRulesProvider.getVersions("UTC").lastEntry().getKey());
        Map<String, ZoneRules> rules = new HashMap<>();
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in, "UTF-8"));
        String line;
        while ((line = in.readLine()) != null) {
            String[] fields = line.split("\t");
            String zone = fields[0];
            if (!rules.containsKey(zone)) {
                ZoneRules zoneRules = null;
                if (ZoneId.getAvailableZoneIds().contains(zone)) {
                    zoneRules = ZoneId.of(zone).getRules();
                } else {
                    System.out.println("unknown\t" + zone);
                }
                rules.put(zone, zoneRules);
            }
            ZoneRules zoneRules = rules.get(zone);
            if (zoneRules == null) {
                continue;
            }
            long epochMilli = Long.parseLong(fields[1]);
            int expected = Integer.parseInt(fields[2]);
            int actual = zoneRules.getStandardOffset(Instant.ofEpochMilli(epochMilli)).getTotalSeconds();
            if (actual != expected) {
                System.out.println("diff\t" + zone + "\t" + epochMilli + "\t" + actual + "\t" + expected);
            }
        }
    }
}
