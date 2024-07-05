import React from 'react';
import { countRepairsForDate } from './utils';

const RenderTileContent = ({ repairs, date, onClickRepair }) => {
  const repairCount = countRepairsForDate(repairs, date);
  let repairString = 'napraw';

  if (repairCount === 1) {
    repairString = 'naprawa';
  } else if ([0, 5, 6, 7, 8, 9].includes(repairCount)) {
    repairString = 'napraw';
  } else if ([2, 3, 4].includes(repairCount)) {
    repairString = 'naprawy';
  }

  const handleClick = () => {
    onClickRepair();
  };

  return (
    <p
      className={`repair-count ${
        repairCount === 0 ? 'grey-text' : 'pink-text'
      }`}
      onClick={handleClick}
    >
      {repairCount} {repairString}
    </p>
  );
};

export default RenderTileContent;
