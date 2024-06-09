import { useState } from 'react';

function useSearchQuery() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return [searchQuery, handleSearchInputChange];
}

export default useSearchQuery;
