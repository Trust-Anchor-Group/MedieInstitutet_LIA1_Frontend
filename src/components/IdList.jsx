import React, { useEffect, useState } from 'react';
import { getIds } from '../api/base-api.mjs';
import { FingerprintLockCircle, NavArrowRight } from 'iconoir-react';

export const IdList = () => {
  const [ids, setIds] = useState([]);

  useEffect(() => {
    const fetchIds = async () => {
      try {
        const response = await getIds();
        setIds(response.data.Identities);
      } catch (error) {
        throw new Error(error.message || 'Error fetching IDs');
      }
    };

    fetchIds();
  }, []);

  return (
    <div className="id-list">
      {console.log('the state ids', ids)}
      {ids.map((userId) => {
        return (
          <button className="id-action-btn shadow__general">
            <span>
              <FingerprintLockCircle />
            </span>
            <span className="id-action-btn__content">{userId.id}</span>
            <NavArrowRight />
          </button>
        );
      })}
    </div>
  );
};

{
  /* <button
onClick={async () => {
  console.log('Get ids');
  try {
    const response = await getIds();
    console.log('The IDs', response);
  } catch (error) {
    throw new Error(error.message || 'Error fetching IDs');
  }
}}
>
Get ids
</button> */
}
