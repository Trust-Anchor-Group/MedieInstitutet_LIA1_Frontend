// src/components/microloan/MicroLoanHero.jsx

import React from 'react';
import { Banner } from '../Banner';
import moneyImage from '../../assets/images/money.jpg';

// Hero section component for the micro loan landing page
// Uses Banner component for consistent hero section styling across the app
const MicroLoanHero = ({ onStartLoan }) => {
    return (
        // Banner component provides layout and image handling
        // 'full' type ensures hero spans viewport width
        // Blur effect enhances text readability over background image
        <Banner
            imageSource={moneyImage}
            type="full"
            contentPosition="center"
            blur={true}
            textPosition="center"
        >
            {/* Main marketing message and call-to-action
                Centered layout emphasizes primary user action */}
            <h1>Micro Loan Service</h1>
            <p>Create and manage micro loans with ease and transparency</p>
            
            {/* Primary CTA triggers loan creation flow
                Uses standardized button styling for consistency */}
            <button onClick={onStartLoan} className="btn__cta">
                Start a Micro Loan
            </button>
        </Banner>
    );
};

export default MicroLoanHero;