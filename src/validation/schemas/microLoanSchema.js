// src/validation/schemas/microLoanSchema.js
import * as Yup from 'yup';

const legalIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}@legal\.mateo\.lab\.tagroot\.io$/;

const legalIdSchema = Yup.string()
    .transform((value, originalValue) => {
        // If the value is empty string or only whitespace, return empty string
        return originalValue?.trim() === '' ? '' : originalValue;
    })
    .test('legal-id-format', 
        'Must be a valid legal ID in format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx@legal.mateo.lab.tagroot.io',
        (value) => {
            // Allow empty string or matching pattern
            return value === '' || legalIdPattern.test(value);
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
            /^P(?:\d+Y)?(?:\d+M)?(?:\d+D)?(?:T(?:\d+H)?(?:\d+M)?(?:\d+S)?)?$/,
            'Invalid duration format (e.g. P1M for 1 month)'
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
    creatorId: legalIdSchema,
    borrowerId: legalIdSchema,
    lenderId: legalIdSchema,
    trustProviderId: legalIdSchema
}).test(
    'all-ids-filled-or-empty',
    'All Legal IDs must either be filled in or all must be empty',
    function(values) {
        const legalIds = [
            values.creatorId,
            values.borrowerId,
            values.lenderId,
            values.trustProviderId
        ];

        // Check if all IDs are empty strings
        const allEmpty = legalIds.every(id => id === '');
        
        // Check if all IDs match the pattern
        const allFilled = legalIds.every(id => 
            legalIdPattern.test(id)
        );

        // Return true if either all are empty or all are properly filled
        return allEmpty || allFilled;
    }
);

export default microLoanSchema;