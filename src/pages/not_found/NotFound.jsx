import React from 'react';
import PreviousPageButton from '../../components/PreviousPageButton';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="container">
      <div>
        <h2 className="not-found-header">Strona nie znaleziona</h2>
        <p className="not-found-text">
          Przepraszamy, strona, której szukasz, nie istnieje.
        </p>
      </div>
      <PreviousPageButton
        buttonColor={'pink'}
        pageDestination={'/dashboard'}
        iconClassName="prev-page-icon"
      />
    </div>
  );
};

export default NotFound;
