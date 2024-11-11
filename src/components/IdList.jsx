import React, { useEffect, useState } from 'react';
import { getIds } from '../api/base-api.mjs';
import { FingerprintLockCircle, NavArrowRight } from 'iconoir-react';
import { NavLink } from 'react-router-dom';

export const IdList = () => {
  const [ids, setIds] = useState([]);

  const renderLabel = (state) => {
    switch (state.toLowerCase()) {
      case 'approved':
        return 'Approved';
      case 'created':
        return 'Pending';
      default:
        return 'Canceled';
    }
  };

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
      {ids.map((userId, index) => {
        return (
          <NavLink
            to="/dashboard/id/details"
            state={{ id: userId.id }}
            className="btn__list id-action-btn shadow__general"
            key={index}
          >
            <span>
              <FingerprintLockCircle />
            </span>
            <span className="id-action-btn__content">{userId.id}</span>
            <div className="id-action-btn__info">
              <span className="id-action-btn__status">
                {renderLabel(userId.status.state)}
              </span>
              <NavArrowRight />
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};
