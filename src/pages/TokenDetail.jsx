import React, { useState } from 'react';
import tokenData from '../data/tokenData'; 
import EditTokenData from '../components/EditTokenData';
import SearchTokenBar from '../components/SearchTokenBar';
import { getContractData } from '../api/base-api.mjs';


const TokenDetail = () => {
  const [tokens, setTokens] = useState(tokenData);
  const[editingTokenId, setEditingTokenId] = useState(null);
  const [expandedTokenId, setExpandedTokenId] = useState(null);
  const [hideTokenId, setHideTokenId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [contractId, setContractId] = useState("");
  const [contractDataResponse, setContractDataResponse] = useState("");

  //Toggle the token details visibility, if open close it and vice versa
  const toggleDetails = (tokenId) => {
    setExpandedTokenId(expandedTokenId === tokenId ? null : tokenId );
  };

  const handleSave = (updatedToken) => {
    setTokens(
      tokens.map((token) =>
        token.tokenId === updatedToken.tokenId ? updatedToken : token
      )
    );

    setEditingTokenId(null);
  };

  //Remove the token from the list based on the tokenId
  const hideHandler =(tokenId) => {
    const hideConfirm = window.confirm("Are you sure you want to hide this token?");
    if(hideConfirm){
      setHideTokenId(tokenId);
      setTokens(tokens.filter((token) => token.tokenId !== tokenId));
    }
   
  }

   const filteredTokens = tokens.filter((token) =>
     token.name.toLowerCase().includes(searchQuery.toLowerCase())
   );


   

   const contractData = async () => {
     try {
       const response = await getContractData({contractId});
       setContractDataResponse(response);
       console.log(response);
     } catch (error) {
       console.log(error);
     }
   };

  return (
    <>
      <SearchTokenBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="tokenList">
        {filteredTokens.map((token) => (
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
                  <EditTokenData
                    token={token}
                    onSave={handleSave}
                  />
                )}
                <button onClick={() => hideHandler(token.tokenId)}>
                  Hide token
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <h3>Provide contract id</h3>
          <input 
          type="text"
          value={contractId}
          onChange={(e) => setContractId(e.target.value)}
          />
          <button onClick={contractData}>Get contract data</button>
      </div>
      {contractDataResponse && (
        <div>
          <h4>Contract Data</h4>
          <span>{JSON.stringify(contractDataResponse.data)}</span>
        </div>
      )}
    </>
  );
};

export default TokenDetail;

