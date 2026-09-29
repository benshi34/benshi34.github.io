import data from '../data/situation-heatmap.json';

// Heatmap of how the assistant's replies changed with training, by kind of
// situation (rows) and reply feature (columns). Length is the % change in
// median words per reply; every other column is the change, in percentage
// points, in the share of replies with that feature. Computed over every
// assistant reply in the untrained and trained evaluation runs. Diverging
// scale:
// orange-red = less/shorter, blue = more/longer, neutral gray = no change.

const CAP = 40;
const NEG = '#b83a36';
const MID = '#f0efec';
const POS = '#256abf';

// sRGB <-> OKLab, so both arms of the ramp lighten evenly toward the midpoint
const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toSrgb = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
function hexToOklab(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => toLin(parseInt(hex.slice(i, i + 2), 16) / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}
function oklabToHex([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const rgb = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  return `#${rgb
    .map((c) => Math.round(Math.min(1, Math.max(0, toSrgb(c))) * 255).toString(16).padStart(2, '0'))
    .join('')}`;
}
const LAB = { neg: hexToOklab(NEG), mid: hexToOklab(MID), pos: hexToOklab(POS) };
function color(delta) {
  const t = Math.min(1, Math.abs(delta) / CAP);
  const end = delta < 0 ? LAB.neg : LAB.pos;
  return oklabToHex(LAB.mid.map((v, i) => v + (end[i] - v) * t));
}
const inkFor = (delta) => (Math.abs(delta) / CAP > 0.55 ? '#ffffff' : '#333333');

const signed = (v) => (v > 0 ? `+${v}` : v < 0 ? `\u2212${-v}` : '0');

const fmt = (c, unit) =>
  unit === '%'
    ? `${c.before} → ${c.after} words (${c.delta > 0 ? '+' : ''}${c.delta}%)`
    : `${c.before}% → ${c.after}% of replies (${c.delta > 0 ? '+' : ''}${c.delta} pts)`;

function SituationHeatmap() {
  const { cols, rows } = data;

  return (
    <figure className="ev-figure hm-figure">
      <div className="hm-top">
        <div className="hm-legend" aria-hidden="true">
          <span>less / shorter</span>
          <i
            style={{
              background: `linear-gradient(90deg, ${NEG}, ${color(-CAP / 2)}, ${MID}, ${color(CAP / 2)}, ${POS})`,
            }}
          />
          <span>more / longer</span>
        </div>
      </div>

      <div className="hm-scroll">
        <div
          className="hm-grid"
          style={{ gridTemplateColumns: `minmax(118px, 1.3fr) repeat(${cols.length}, minmax(52px, 1fr))` }}
          role="table"
          aria-label="Change in assistant reply features after training, by situation"
        >
          <div className="hm-corner" role="columnheader" />
          {cols.map((c) => (
            <div className="hm-colhead" role="columnheader" key={c.key}>
              {c.label}
            </div>
          ))}
          {rows.map((r) => (
            <div className="hm-row" role="row" key={r.key}>
              <div className="hm-rowhead" role="rowheader">
                {r.label}
              </div>
              {r.cells.map((cell, j) => (
                <div
                  key={cols[j].key}
                  role="cell"
                  className="hm-cell"
                  style={{ backgroundColor: color(cell.delta), color: inkFor(cell.delta) }}
                  title={`${r.label} · ${cols[j].label}: ${fmt(cell, cols[j].unit)}`}
                  aria-label={`${r.label}, ${cols[j].label}: ${fmt(cell, cols[j].unit)}`}
                >
                  {signed(cell.delta)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <figcaption className="ev-caption">
        How each feature of the assistant's replies changed with training, by
        kind of situation. Length is the change in median reply length (%);
        every other column is the change in the share of replies with that
        feature (percentage points). Hover a cell for the before and after
        values.
      </figcaption>
    </figure>
  );
}

export default SituationHeatmap;
