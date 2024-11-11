import React, { useEffect, useState } from 'react';
import { getId } from '../api/base-api.mjs';
import labelMapping from '../utilities/labelMapping';
import { formatDate } from '../utilities/formatDate';
import { Stamp } from './Stamp';

export const IdCard = ({ id }) => {
  const [identification, setIdentification] = useState({});

  useEffect(() => {
    const fetchId = async () => {
      try {
        const response = await getId({ legalId: id });
        if (response.success) {
          setIdentification(response.data.Identity);
        }
      } catch (error) {}
    };
    fetchId();
  }, []);

  const renderStamp = (state) => {
    switch (state.toLowerCase()) {
      case 'approved':
        return <Stamp status="Approved" state="active" />;
      case 'created':
        return <Stamp status="Pending" state="pending" />;
      default:
        return <Stamp status="Canceled" state="inactive" />;
    }
  };

  return (
    <div className="id-card shadow__general">
      {identification?.status?.state &&
        renderStamp(identification?.status?.state)}
      <ul>
        {identification.status && (
          <li>
            <span className="id-card__label">Created</span>
            <span className="id-card__value">
              {formatDate(identification.status.created)}
            </span>
          </li>
        )}
        {identification.id && (
          <li>
            <span className="id-card__label">Identification</span>
            <span className="id-card__value">{identification.id}</span>
          </li>
        )}
        {identification.property &&
          identification.property.map((property, index) => {
            return (
              <li key={index}>
                <span className="id-card__label">
                  {labelMapping[property.name] || property.name}
                </span>
                <span className="id-card__value">{property.value}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
