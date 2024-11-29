// src/validation/schemas/contractSigningSchema.js

import * as Yup from 'yup';

// Regular expression for validating legal identifiers in the format: 
// UUID@legal.mateo.lab.tagroot.io
// This is used for contract and legal entity identification in the system
const legalIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}@legal\.mateo\.lab\.tagroot\.io$/;

// Regular expression for validating basic UUIDs
// Used for internal system identifiers that don't require domain qualification
const basicIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const contractSigningSchema = Yup.object().shape({
  // Key ID: Internal identifier for the signing key
  // Must be a valid UUID to ensure uniqueness and standardization
  keyId: Yup.string()
    .required('Key ID is required')
    .matches(basicIdPattern, 'Key ID must be in UUID format'),

  // Legal ID: Identifier for the legal entity performing the signing
  // Must include domain suffix to ensure proper routing in the legal system
  legalId: Yup.string()
    .required('Legal ID is required')
    .matches(legalIdPattern, 'Legal ID must be in format: UUID@legal.mateo.lab.tagroot.io'),

  // Contract ID: Unique identifier for the contract being signed
  // Uses same format as Legal ID to maintain consistency in legal document tracking
  contractId: Yup.string()
    .required('Contract ID is required')
    .matches(legalIdPattern, 'Contract ID must be in format: UUID@legal.mateo.lab.tagroot.io'),

  // Role: Defines the capacity in which the entity is signing
  // Limited to specific roles to ensure proper access control and signature validity
  role: Yup.string()
    .required('Role is required')
    .oneOf(
      ['Creator', 'Borrower', 'Lender', 'TrustProvider'],
      'Invalid role selection. Must be Creator, Borrower, Lender, or TrustProvider'
    ),

  // Local Name and Namespace: Used for key algorithm identification
  // These fields help in selecting the appropriate cryptographic algorithm
  localName: Yup.string()
    .required('Local Name is required'),
  namespace: Yup.string()
    .required('Namespace is required'),

  // Security credentials for key and account access
  // Minimum length of 4 characters provides basic security while maintaining usability
  keyPassword: Yup.string()
    .required('Key password is required')
    .min(4, 'Key password must be at least 4 characters long'),
  accountPassword: Yup.string()
    .required('Account password is required')
    .min(4, 'Account password must be at least 4 characters long')
}).test(
  // Custom validation to prevent password reuse
  // This reduces security risks associated with credential sharing between key and account
  'passwords-different',
  'Key password and account password must be different',
  function(values) {
    if (!values.keyPassword || !values.accountPassword) return true;
    return values.keyPassword !== values.accountPassword;
  }
);

export default contractSigningSchema;