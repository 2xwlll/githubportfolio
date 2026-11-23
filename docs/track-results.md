# Updating track and field marks

Edit `public/data/track-results.json`. It is the shared source for the interactive track, the selected-event panel, and the full results list on `/athletics`.

Each event has a label, unit (`s` or `ft`), optional notes, and a `results` array. Add a result to the array to keep a history, or correct an existing result. Sprint times use seconds, and jumps use decimal feet: `22.1` means **22.1 feet**, not 22 feet 1 inch.

```json
{
  "mark": 10.8,
  "date": null,
  "meet": null,
  "venue": null,
  "sourceUrl": null
}
```

- `mark`: a positive number, without the unit.
- `date`: an ISO date such as `2026-11-22`, or `null` when unknown.
- `meet`, `venue`: text, or `null` when unknown.
- `sourceUrl`: an HTTPS results link, or `null` when unavailable.
- `notes`: context for an event, such as how often you run it.

The diagram automatically shows the lowest sprint time or the longest jump. The full list retains all entries. Dates without a time are displayed without timezone conversion.

The current marks are self-reported; no meet, date, venue, wind reading, or timing method has been inferred. Leave unknown fields as `null`.

After updating the file, run `npm run check`, then commit and deploy the changes through the normal website workflow. No database or separate service is needed. The raw repository is also readable at `/data/track-results.json`.
