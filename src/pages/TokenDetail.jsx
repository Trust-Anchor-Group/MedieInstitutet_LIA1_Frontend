import React, { useState } from 'react';
import tokenData from '../data/tokenData'; 

const TokenDetail = () => {
  const [expandedTokenId, setExpandedTokenId] = useState(null);

  const toggleDetails = (tokenId) => {
    setExpandedTokenId(expandedTokenId === tokenId ? null : tokenId );
  };

  return (
    <div className="tokenList">
      {tokenData.map((token) => (
        <div
          key={token.tokenId}
          className="tokenContainer"
        >
          <h2 onClick={() => toggleDetails(token.tokenId)}>{token.name}</h2>
          {expandedTokenId === token.tokenId && (
            <div className="tokenDetails">
              <div className="tokenImgContent">
                <img
                  src={token.image}
                  alt={token.name}
                />
              </div>
              <p>Token_Id: {token.tokenId}</p>
              <p>Name: {token.name}</p>
              <p>Symbol: {token.symbol}</p>
              <p>Total Supply: {token.totalSupply}</p>
              <p>Price: {token.price}</p>
              <p>Currency: {token.currency}</p>
              <p>Amount For Sale: {token.listedForSale}</p>
              <p>Unlisted Supply: {token.remainingSupply}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TokenDetail;

