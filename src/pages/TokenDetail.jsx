import React, { useState } from 'react';
import tokenData from '../data/tokenData'; 
import ManageToken from '../components/ManageToken';

const TokenDetail = () => {
  const [tokens, setTokens] = useState(tokenData);
  const[editingTokenId, setEditingTokenId] = useState(null);
  const [expandedTokenId, setExpandedTokenId] = useState(null);

  //Toggle the token details visibility, if open close it and vice versa
  const toggleDetails = (tokenId) => {
    setExpandedTokenId(expandedTokenId === tokenId ? null : tokenId );
  };

  const handleSave = (updatedToken) => {
    console.log("updatedToken:", updatedToken);
    
    setTokens(
      tokens.map((token) =>
        token.tokenId === updatedToken.tokenId ? updatedToken : token
      )
    );
    console.log("tokens:", tokens);
    
    setEditingTokenId(null);
  };

  return (
    <div className="tokenList">
      {tokens.map((token) => (
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
              <p>Quantity: {token.quantity}</p>
              <p>Price: {token.price}</p>
              <p>Currency: {token.currency}</p>
              <p>Quantity For Sale: {token.listedForSale}</p>
              <p>Unlisted Quantity: {token.remainingQuanity}</p>
              <button onClick={() => setEditingTokenId(token.tokenId)}>
                Edit
              </button>
              {editingTokenId === token.tokenId && (
                <ManageToken
                  token={token}
                  onSave={handleSave}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TokenDetail;

