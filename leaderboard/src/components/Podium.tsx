import type { PersonRanked } from '../types';
import { fullName } from '../format';
import { StarIcon } from '../icons';

type Props = { top3: PersonRanked[] };

function PodiumFace({
  row,
  place,
}: {
  row: PersonRanked;
  place: 1 | 2 | 3;
}) {
  const p = row.person;
  const isFirst = place === 1;
  const starSize = isFirst ? 22 : 16;
  const name = fullName(p);
  const sub = `${p.jobTitle} (${p.groupName})`;
  return (
    <div className="lb-podium-face">
      <div
        className={`lb-podium-av lb-podium-av--${place} ${isFirst ? 'lb-podium-av--king' : ''}`}
      >
        <img className="lb-podium-av__img" src={p.avatarUrl} alt="" />
        <span className={`lb-podium-badge lb-podium-badge--${place}`}>
          {place}
        </span>
      </div>
      <div className="lb-podium-name">{name}</div>
      <div className="lb-podium-sub">{sub}</div>
      <div
        className={
          isFirst
            ? 'lb-podium-score lb-podium-score--gold lb-podium-score--podiumrow'
            : 'lb-podium-score lb-podium-score--blue lb-podium-score--podiumrow'
        }
      >
        <StarIcon variant={isFirst ? 'gold' : 'blue'} size={starSize} />
        <span>{row.totalPoints}</span>
      </div>
    </div>
  );
}

function PodiumSlabBlock({ place }: { place: 1 | 2 | 3 }) {
  return (
    <div className={`lb-podium-slab lb-podium-slab--${place}`}>
      <span className="lb-podium-slab__num">{place}</span>
    </div>
  );
}

/**
 * Top row: 2nd | 1st | 3rd. Bottom: matching slabs.
 * All score→slab vertical gaps = grid row-gap; slab bottoms share one baseline.
 */
function PodiumGrid3({
  first,
  second,
  third,
}: {
  first: PersonRanked;
  second: PersonRanked;
  third: PersonRanked;
}) {
  return (
    <div className="lb-podium__grid lb-podium__grid--3">
      <div className="lb-podium__facecell">
        <PodiumFace row={second} place={2} />
      </div>
      <div className="lb-podium__facecell">
        <PodiumFace row={first} place={1} />
      </div>
      <div className="lb-podium__facecell">
        <PodiumFace row={third} place={3} />
      </div>
      <div className="lb-podium__slabcell">
        <PodiumSlabBlock place={2} />
      </div>
      <div className="lb-podium__slabcell">
        <PodiumSlabBlock place={1} />
      </div>
      <div className="lb-podium__slabcell">
        <PodiumSlabBlock place={3} />
      </div>
    </div>
  );
}

function PodiumCardMobile({
  row,
  place,
}: {
  row: PersonRanked;
  place: 1 | 2 | 3;
}) {
  const p = row.person;
  const isFirst = place === 1;
  const starSize = isFirst ? 22 : 16;
  const name = fullName(p);
  const sub = `${p.jobTitle} (${p.groupName})`;
  return (
    <div className="lb-podium-card lb-podium-card--mobile">
      <div
        className={`lb-podium-av lb-podium-av--${place} ${isFirst ? 'lb-podium-av--king' : ''}`}
      >
        <img className="lb-podium-av__img" src={p.avatarUrl} alt="" />
        <span className={`lb-podium-badge lb-podium-badge--${place}`}>
          {place}
        </span>
      </div>
      <div className="lb-podium-name">{name}</div>
      <div className="lb-podium-sub">{sub}</div>
      <div
        className={
          isFirst
            ? 'lb-podium-score lb-podium-score--gold'
            : 'lb-podium-score lb-podium-score--blue'
        }
      >
        <StarIcon variant={isFirst ? 'gold' : 'blue'} size={starSize} />
        <span>{row.totalPoints}</span>
      </div>
      <PodiumSlabBlock place={place} />
    </div>
  );
}

export function Podium({ top3 }: Props) {
  if (top3.length === 0) {
    return <div className="lb-podium lb-podium--empty">No results</div>;
  }
  const r1 = top3[0]!;
  const r2 = top3[1];
  const r3 = top3[2];

  return (
    <>
      <div className="lb-podium lb-podium--desktop">
        {top3.length === 1 && (
          <div className="lb-podium__row lb-podium__row--outer">
            <div className="lb-podium__slot" />
            <div className="lb-podium__grid lb-podium__grid--1">
              <div className="lb-podium__facecell">
                <PodiumFace row={r1} place={1} />
              </div>
              <div className="lb-podium__slabcell">
                <PodiumSlabBlock place={1} />
              </div>
            </div>
            <div className="lb-podium__slot" />
          </div>
        )}
        {top3.length === 2 && r2 && (
          <div className="lb-podium__row lb-podium__row--outer">
            <div className="lb-podium__grid lb-podium__grid--2">
              <div className="lb-podium__facecell">
                <PodiumFace row={r2} place={2} />
              </div>
              <div className="lb-podium__facecell">
                <PodiumFace row={r1} place={1} />
              </div>
              <div className="lb-podium__slabcell">
                <PodiumSlabBlock place={2} />
              </div>
              <div className="lb-podium__slabcell">
                <PodiumSlabBlock place={1} />
              </div>
            </div>
            <div className="lb-podium__slot" />
          </div>
        )}
        {top3.length >= 3 && r2 && r3 && (
          <div className="lb-podium__row lb-podium__row--outer">
            <PodiumGrid3 first={r1} second={r2} third={r3} />
          </div>
        )}
      </div>
      <div className="lb-podium lb-podium--mobile">
        <div className="lb-podium__stack">
          <PodiumCardMobile row={r1} place={1} />
          {r2 && <PodiumCardMobile row={r2} place={2} />}
          {r3 && <PodiumCardMobile row={r3} place={3} />}
        </div>
      </div>
    </>
  );
}
