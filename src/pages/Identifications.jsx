import React from 'react';
import { IdList } from '../components/IdList';
import { Plus } from 'iconoir-react';

const Identifications = () => {
  return (
    <>
      <h2>Identifications</h2>
      <div className="dash-cta-menu">
        <button className="btn__cta">
          <span>New Identity</span>
          <Plus />
        </button>
      </div>
      <IdList />
    </>
  );
};

export default Identifications;
