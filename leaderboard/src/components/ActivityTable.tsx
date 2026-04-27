import type { PersonRanked } from '../types';
import { formatTableDate } from '../format';
import { categoryPillLabel } from './CategoryStrip';

type Props = { row: PersonRanked };

export function ActivityTable({ row }: Props) {
  return (
    <div className="lb-activity">
      <div className="lb-activity__title">RECENT ACTIVITY</div>
      <div className="lb-activity__tablewrap">
        <table className="lb-table">
          <thead>
            <tr>
              <th>ACTIVITY</th>
              <th>CATEGORY</th>
              <th>DATE</th>
              <th>POINTS</th>
            </tr>
          </thead>
          <tbody>
            {row.visibleActivities.map((a) => (
              <tr key={a.id}>
                <td className="lb-table__act">{a.displayLine}</td>
                <td>
                  <span className="lb-pill">{categoryPillLabel(a.category)}</span>
                </td>
                <td className="lb-table__date">{formatTableDate(a)}</td>
                <td className="lb-table__pts">+{a.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
