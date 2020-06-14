import React, { useState } from 'react';
import './Searchbar.css';

export default function Searchbar() {
  const [GP, setGP] = useState(false);
  const [therapist, setTherapist] = useState(false);
  const [POC, setPOC] = useState(false);
  const [trans, setTrans] = useState(false);
  const [women, setWomen] = useState(false);

  return(
    <div>
      {/* add icon to searchbar */}
      <input
        id="searchbar"
        type="text"
        placeholder="enter zipcode or city"
      />
      <button>SEARCH</button>
      <div>
        <label>
          <input type="checkbox" onChange={e => setGP(e.target.checked)} />
          General Practitioner
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" onChange={e => setTherapist(e.target.checked)} />
          Therapist
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" onChange={e => setPOC(e.target.checked)} />
          POC
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" onChange={e => setTrans(e.target.checked)} />
          Transgender
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" onChange={e => setWomen(e.target.checked)} />
          Women
        </label>
      </div>
    </div>
  );
}