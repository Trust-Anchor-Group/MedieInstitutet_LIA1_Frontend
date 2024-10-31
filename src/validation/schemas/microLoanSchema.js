// src/validation/schemas/microLoanSchema.js
import * as Yup from 'yup';

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
    borrower: Yup.string()
        .required('Borrower username is required')
        .min(4, 'Borrower username must be at least 4 characters'),
    lender: Yup.string()
        .min(4, 'Lender username must be at least 4 characters')
});

export default microLoanSchema;