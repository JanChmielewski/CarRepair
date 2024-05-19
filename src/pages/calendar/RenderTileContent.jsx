import React from 'react';
import { countRepairsForDate } from './utils';

const RenderTileContent = ({ repairs, date }) => {
  const repairCount = countRepairsForDate(repairs, date);
  let repairString = 'napraw';

  if (repairCount === 1) {
    repairString = 'naprawa';
  } else if ([0, 5, 6, 7, 8, 9].includes(repairCount)) {
    repairString = 'napraw';
  } else if ([2, 3, 4].includes(repairCount)) {
    repairString = 'naprawy';
  }

  return (
    <p
      className={`repair-count ${
        repairCount === 0 ? 'grey-text' : 'pink-text'
      }`}
    >
      {repairCount} {repairString}
    </p>
  );
};

export default RenderTileContent;
