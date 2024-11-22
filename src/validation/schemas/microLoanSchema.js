// src/validation/schemas/microLoanSchema.js
import * as Yup from 'yup';

// Pattern for regular legal IDs (Creator, Borrower, Lender)
const legalIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}@legal\.mateo\.lab\.tagroot\.io$/;

// Pattern for TrustProvider legal ID
const trustProviderPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}@legal\.lab\.tagroot\.io$/;

// Regular legal ID schema for Creator, Borrower, and Lender
const regularLegalIdSchema = Yup.string()
    .transform((value, originalValue) => {
        return originalValue?.trim() === '' ? '' : originalValue;
    })
    .test('legal-id-format',
        'Must be a valid legal ID in format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx@legal.mateo.lab.tagroot.io',
        (value) => {
            return value === '' || legalIdPattern.test(value);
        }
    );

// Trust Provider legal ID schema
const trustProviderIdSchema = Yup.string()
    .transform((value, originalValue) => {
        return originalValue?.trim() === '' ? '' : originalValue;
    })
    .test('trust-provider-id-format',
        'Must be a valid legal ID in format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx@legal.lab.tagroot.io',
        (value) => {
            return value === '' || trustProviderPattern.test(value);
        }
    );

const microLoanSchema = Yup.object().shape({
    amount: Yup.number()
        .required('Loan amount is required')
        .positive('Amount must be greater than 0'),
    currency: Yup.string()
        .required('Currency is required')
        .matches(/^\w{3}$/, 'Currency must be 3 characters (e.g. USD)'),
        installmentInterval: Yup.string()
        .required('Installment interval is required')
        .matches(
            /^P(?:1M|[12]W)$/, // Updated pattern to only allow P1M, P1W, or P2W
            'Invalid duration format. Must be P1M, P1W, or P2W'
        ),
    interestPerInstallment: Yup.number()
        .required('Interest rate is required')
        .positive('Interest rate must be greater than 0'),
    installmentAmount: Yup.number()
        .required('Installment amount is required')
        .positive('Installment amount must be greater than 0'),
    debtLimit: Yup.number()
        .required('Debt limit is required')
        .positive('Debt limit must be greater than 0')
        .test('is-greater-than-amount', 'Debt limit must be greater than loan amount',
            function(value) {
                return value > this.parent.amount;
            }
        ),
    commissionPercent: Yup.number()
        .required('Commission percentage is required')
        .min(0, 'Commission cannot be negative')
        .max(100, 'Commission cannot exceed 100%'),
    creatorId: regularLegalIdSchema,
    borrowerId: regularLegalIdSchema,
    lenderId: regularLegalIdSchema,
    trustProviderId: trustProviderIdSchema
}).test(
    'all-ids-filled-or-empty',
    'All Legal IDs must either be filled in or all must be empty',
    function(values) {
        const { creatorId, borrowerId, lenderId, trustProviderId } = values;
        
        // Check if all IDs are empty strings
        const allEmpty = [creatorId, borrowerId, lenderId, trustProviderId]
            .every(id => id === '');
        
        // Check if all IDs match their respective patterns
        const regularIdsValid = [creatorId, borrowerId, lenderId]
            .every(id => legalIdPattern.test(id));
        const trustProviderValid = trustProviderPattern.test(trustProviderId);
        
        // Return true if either all are empty or all are properly filled
        return allEmpty || (regularIdsValid && trustProviderValid);
    }
);

export default microLoanSchema;