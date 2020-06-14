import React, { useState, useEffect } from 'react';

export default function Results() {

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults([
      {
        name: 'Doctor 1',
        employer: 'Employer',
        rating: 3,
        bio: `Here's a brief bio about this healthcare practitioner. They mostly do this type of work.`,
        tags: ['transgender', 'POC', 'women']
      },
      {
        name: 'Doctor 2',
        employer: 'Employer',
        rating: 6,
        bio: `Here's a brief bio about this healthcare practitioner. They mostly do this type of work.`,
        tags: ['transgender', 'POC', 'women']
      }
  ])
  }, []);

  return(
    <div className="main-container">
      <h1>Practitioners in Your Area</h1>
      <div>
        {searchResults.map((item, i) => 
          <div key={i}>
            <h3>{item.name}</h3>
            <p><i>{item.employer}</i></p>
            <p>{item.rating}</p>
            <p>{item.bio}</p>
            <p>Tags: {item.tags.map((tag, j) => <span key={j}>{tag}</span>)}</p>
          </div>
        )}
      </div>
    </div>
  );
}