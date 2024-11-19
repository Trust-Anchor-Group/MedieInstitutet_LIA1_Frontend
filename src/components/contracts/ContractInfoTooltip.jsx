// src/components/contracts/tooltips/ContractInfoTooltip.jsx
import React from 'react';
import { Info, Copy, Check } from 'lucide-react';

// Displays detailed contract information in a hover tooltip using the Info icon
// info prop expects an object with id, duration, archiveReq, archiveOpt and visibility fields
// copiedId tracks which contract ID is currently copied for copy button state
// onCopyId callback handles copying contract ID to clipboard
const ContractInfoTooltip = ({ info, copiedId, onCopyId }) => {
 return (
   // Container div uses .info-icon class for positioning and hover behavior
   <div className="info-icon" title="Contract Details">
     {/* Info icon serves as the tooltip trigger */}
     <Info size={20} />
     {/* Tooltip content renders on hover via CSS - see associated styles */}
     <div className="info-tooltip">
       <h2>Contract Details</h2>
       {/* Contract ID with copy functionality - toggles icon on copy */}
       <p>
         <strong>ID:</strong>
         <span
           onClick={() => onCopyId(info.id)}
           className="contract-id-copy"
           title="Click to copy"
         >
           {info.id}
           {copiedId === info.id ? (
             <Check size={14} className="copy-icon" />
           ) : (
             <Copy size={14} className="copy-icon" />
           )}
         </span>
       </p>
       {/* Display contract metadata fields */}
       <p><strong>Duration:</strong> {info.duration}</p>
       <p><strong>Archive Required:</strong> {info.archiveReq}</p>
       <p><strong>Archive Optional:</strong> {info.archiveOpt}</p>
       <p><strong>Visibility:</strong> {info.visibility}</p>
     </div>
   </div>
 );
};

export default ContractInfoTooltip;