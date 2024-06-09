// NotFound.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import PreviousPageButton from '../common/PreviousPageButton';
import { ROUTES } from '../../utils/routes';

const NotFound = () => {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div className="container">
      <div>
        <h2 className="not-found-header">Strona nie znaleziona</h2>
        <p className="not-found-text">
          {message ||
            'Przepraszamy, strona której szukasz nie istnieje. Możliwe, że została usunięta lub przeniesiona. Prosimy sprawdzić adres URL.'}
        </p>
      </div>
      <PreviousPageButton
        buttonColor={'pink'}
        pageDestination={ROUTES.DASHBOARD}
        iconClassName="prev-page-icon"
      />
    </div>
  );
};

export default NotFound;
