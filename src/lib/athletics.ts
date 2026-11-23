import results from "../../public/data/track-results.json";

export type TrackEventId = keyof typeof results;
export type TrackResult = {
  mark: number;
  date: string | null;
  meet: string | null;
  venue: string | null;
  sourceUrl: string | null;
};
export type TrackEvent = {
  label: string;
  unit: string;
  notes: string;
  results: TrackResult[];
};

export const trackEvents: Record<TrackEventId, TrackEvent> = results;
export const trackEventIds = Object.keys(results) as TrackEventId[];

export function bestResult(event: TrackEvent): TrackResult | undefined {
  return event.results.reduce<TrackResult | undefined>((best, result) => {
    if (!Number.isFinite(result.mark) || result.mark <= 0) return best;
    if (!best) return result;
    return (event.unit === "s" ? result.mark < best.mark : result.mark > best.mark) ? result : best;
  }, undefined);
}

export function formatMark(event: TrackEvent, result = bestResult(event)) {
  return result ? `${result.mark} ${event.unit}` : "No mark yet";
}
