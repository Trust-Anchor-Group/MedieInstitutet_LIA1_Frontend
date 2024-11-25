// src/validation/schemas/microLoanSchema.js

import * as Yup from 'yup';

// Regular legal ID pattern for standard participants (Creator, Borrower, Lender)
// Format: UUID@legal.mateo.lab.tagroot.io
// This domain suffix indicates standard participant access level
const legalIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}@legal\.mateo\.lab\.tagroot\.io$/;

// Special legal ID pattern for Trust Providers
// Format: UUID@legal.lab.tagroot.io
// Different domain indicates elevated privileges and special access rights
const trustProviderPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}@legal\.lab\.tagroot\.io$/;

// Schema for validating regular participant legal IDs
// Handles empty strings and performs format validation
const regularLegalIdSchema = Yup.string()
  .transform((value, originalValue) => {
    // Convert empty or whitespace-only strings to empty string for consistent validation
    return originalValue?.trim() === '' ? '' : originalValue;
  })
  .test('legal-id-format',
    'Must be a valid legal ID in format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx@legal.mateo.lab.tagroot.io',
    (value) => {
      // Allow either empty string or properly formatted ID
      return value === '' || legalIdPattern.test(value);
    }
  );

// Schema for validating Trust Provider IDs with their special format
const trustProviderIdSchema = Yup.string()
  .transform((value, originalValue) => {
    // Consistent empty string handling for Trust Provider IDs
    return originalValue?.trim() === '' ? '' : originalValue;
  })
  .test('trust-provider-id-format',
    'Must be a valid legal ID in format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx@legal.lab.tagroot.io',
    (value) => {
      // Allow either empty string or properly formatted Trust Provider ID
      return value === '' || trustProviderPattern.test(value);
    }
  );

const microLoanSchema = Yup.object().shape({
  // Basic loan parameters
  amount: Yup.number()
    .required('Loan amount is required')
    .positive('Amount must be greater than 0'),

  // Currency validation using ISO 4217 format (3-letter codes)
  currency: Yup.string()
    .required('Currency is required')
    .matches(/^\w{3}$/, 'Currency must be 3 characters (e.g. USD)'),

  // Payment schedule definition using ISO 8601 duration format
  // Restricted to monthly (P1M) or weekly (P1W, P2W) installments
  installmentInterval: Yup.string()
    .required('Installment interval is required')
    .matches(
      /^P(?:1M|[12]W)$/,  //! These are wrong formats and need to be changed to comply with contract set parameters
      'Invalid duration format. Must be P1M, P1W, or P2W'
    ),

  // Financial terms validation
  interestPerInstallment: Yup.number()
    .required('Interest rate is required')
    .positive('Interest rate must be greater than 0'),

  installmentAmount: Yup.number()
    .required('Installment amount is required')
    .positive('Installment amount must be greater than 0'),

  // Debt limit must exceed loan amount to account for interest and fees
  debtLimit: Yup.number()
    .required('Debt limit is required')
    .positive('Debt limit must be greater than 0')
    .test('is-greater-than-amount', 'Debt limit must be greater than loan amount',
      function(value) {
        return value > this.parent.amount;
      }
    ),

  // Commission validation with percentage bounds
  commissionPercent: Yup.number()
    .required('Commission percentage is required')
    .min(0, 'Commission cannot be negative')
    .max(100, 'Commission cannot exceed 100%'),

  // Participant identifiers using their respective schemas
  creatorId: regularLegalIdSchema,
  borrowerId: regularLegalIdSchema,
  lenderId: regularLegalIdSchema,
  trustProviderId: trustProviderIdSchema
}).test(
  // Cross-field validation to ensure consistent ID presence
  // All participant IDs must either be present or absent together
  'all-ids-filled-or-empty',
  'All Legal IDs must either be filled in or all must be empty',
  function(values) {
    const { creatorId, borrowerId, lenderId, trustProviderId } = values;
    
    // Check if all IDs are empty (draft state)
    const allEmpty = [creatorId, borrowerId, lenderId, trustProviderId]
      .every(id => id === '');
    
    // Validate format compliance for all regular participants
    const regularIdsValid = [creatorId, borrowerId, lenderId]
      .every(id => legalIdPattern.test(id));
    
    // Validate Trust Provider ID separately due to different format
    const trustProviderValid = trustProviderPattern.test(trustProviderId);
    
    // Contract must be either completely unsigned (draft) or properly signed by all
    return allEmpty || (regularIdsValid && trustProviderValid);
  }
);

export default microLoanSchema;