// src/components/MicroLoanForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import microLoanSchema from '../validation/schemas/microLoanSchema';
import { WarningCircle } from 'iconoir-react';
import { TailSpin } from 'react-loader-spinner';

const MicroLoanForm = ({ onSubmit, onCancel }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(microLoanSchema),
        mode: 'onBlur',
        defaultValues: {
          currency: 'USD',
          installmentInterval: 'P1M',
          commissionPercent: 5
      }
    });

      // ! logging function
      const onSubmitForm = async (data) => {
        console.log('Form submitted with data:', data);
        await onSubmit(data);
      };

    const amount = watch('amount', 0);
    const commissionPercent = watch('commissionPercent', 0);
    const estimatedCost = (amount * commissionPercent / 100).toFixed(2);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form__medium shadow__general">
            <div className="form__header">
                <h2>Create Micro Loan</h2>
            </div>

            <div className="form__grid">
                <label className="form__field">
                    <span>Loan Amount:</span>
                    <input
                        type="number"
                        step="0.01"
                        className={errors.amount ? 'error' : ''}
                        {...register('amount')}
                    />
                    {errors.amount && (
                        <span className="form__msg form__msg-error">
                            <WarningCircle />
                            <span>{errors.amount.message}</span>
                        </span>
                    )}
                </label>

                <label className="form__field">
                    <span>Currency:</span>
                    <input
                        type="text"
                        maxLength="3"
                        placeholder="USD"
                        className={errors.currency ? 'error' : ''}
                        {...register('currency')}
                    />
                    {errors.currency && (
                        <span className="form__msg form__msg-error">
                            <WarningCircle />
                            <span>{errors.currency.message}</span>
                        </span>
                    )}
                </label>

                <label className="form__field">
                    <span>Installment Interval:</span>
                    <select {...register('installmentInterval')} className={errors.installmentInterval ? 'error' : ''}>
                        <option value="">Select interval</option>
                        <option value="P1M">Monthly (P1M)</option>
                        <option value="P2W">Bi-weekly (P2W)</option>
                        <option value="P1W">Weekly (P1W)</option>
                    </select>
                    {errors.installmentInterval && (
                        <span className="form__msg form__msg-error">
                            <WarningCircle />
                            <span>{errors.installmentInterval.message}</span>
                        </span>
                    )}
                </label>

                <label className="form__field">
                    <span>Interest Per Installment (%):</span>
                    <input
                        type="number"
                        step="0.01"
                        className={errors.interestPerInstallment ? 'error' : ''}
                        {...register('interestPerInstallment')}
                    />
                    {errors.interestPerInstallment && (
                        <span className="form__msg form__msg-error">
                            <WarningCircle />
                            <span>{errors.interestPerInstallment.message}</span>
                        </span>
                    )}
                </label>

                <label className="form__field">
                    <span>Installment Amount:</span>
                    <input
                        type="number"
                        step="0.01"
                        className={errors.installmentAmount ? 'error' : ''}
                        {...register('installmentAmount')}
                    />
                    {errors.installmentAmount && (
                        <span className="form__msg form__msg-error">
                            <WarningCircle />
                            <span>{errors.installmentAmount.message}</span>
                        </span>
                    )}
                </label>

                <label className="form__field">
                    <span>Debt Limit:</span>
                    <input
                        type="number"
                        step="0.01"
                        className={errors.debtLimit ? 'error' : ''}
                        {...register('debtLimit')}
                    />
                    {errors.debtLimit && (
                        <span className="form__msg form__msg-error">
                            <WarningCircle />
                            <span>{errors.debtLimit.message}</span>
                        </span>
                    )}
                </label>

                <label className="form__field">
                    <span>Commission (%):</span>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        className={errors.commissionPercent ? 'error' : ''}
                        {...register('commissionPercent')}
                    />
                    {errors.commissionPercent && (
                        <span className="form__msg form__msg-error">
                            <WarningCircle />
                            <span>{errors.commissionPercent.message}</span>
                        </span>
                    )}
                </label>

                <label className="form__field">
                    <span>Borrower Username:</span>
                    <input
                        type="text"
                        className={errors.borrower ? 'error' : ''}
                        {...register('borrower')}
                    />
                    {errors.borrower && (
                        <span className="form__msg form__msg-error">
                            <WarningCircle />
                            <span>{errors.borrower.message}</span>
                        </span>
                    )}
                </label>

                <label className="form__field">
                    <span>Lender Username (optional):</span>
                    <input
                        type="text"
                        className={errors.lender ? 'error' : ''}
                        {...register('lender')}
                    />
                    {errors.lender && (
                        <span className="form__msg form__msg-error">
                            <WarningCircle />
                            <span>{errors.lender.message}</span>
                        </span>
                    )}
                </label>
            </div>

            <div className="form__summary">
                <p>Estimated Cost: {estimatedCost}</p>
            </div>

            <div className="form__actions">
                <button 
                    type="button" 
                    onClick={onCancel}
                    className="btn-secondary"
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <TailSpin height={20} width={20} /> : 'Create Loan'}
                </button>
            </div>
        </form>
    );
};

export default MicroLoanForm;