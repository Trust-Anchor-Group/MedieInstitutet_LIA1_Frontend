import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import contractSigningSchema from '../validation/schemas/contractSigningSchema';
import { signContract } from '../api/base-api.mjs';
import { WarningCircle } from 'iconoir-react';
import { TailSpin } from 'react-loader-spinner';

const ContractSigning = () => {
  const { contractId } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);

  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue
  } = useForm({
      resolver: yupResolver(contractSigningSchema),
      mode: 'onBlur'
  });

  // Set contract ID from URL params when component mounts
  useEffect(() => {
      if (contractId) {
          setValue('contractId', contractId);
      }
  }, [contractId, setValue]);

    const onSubmit = async (data) => {
        try {
            const response = await signContract(data);
            
            if (response.success) {
                setFeedback({
                    type: 'success',
                    message: 'Contract signed successfully'
                });

                // Navigate back to contracts page after success
                setTimeout(() => {
                    navigate('/contracts');
                }, 2000);
            }
        } catch (error) {
            setFeedback({
                type: 'error',
                message: error.message || 'Failed to sign contract'
            });
        }
    };

    return (
        <div className="page__container">
            <section className="contract-signing__section">
                <form onSubmit={handleSubmit(onSubmit)} className="form__medium shadow__general">
                    <div className="form__header">
                        <h2>Sign Contract</h2>
                        {feedback && (
                            <div className={`form__feedback form__feedback-${feedback.type}`}>
                                {feedback.message}
                            </div>
                        )}
                    </div>

                    <div className="form__grid">
                        <label className="form__field">
                            <span>Contract ID:</span>
                            <input
                                type="text"
                                className={errors.contractId ? 'error' : ''}
                                {...register('contractId')}
                            />
                            {errors.contractId && (
                                <span className="form__msg form__msg-error">
                                    <WarningCircle />
                                    <span>{errors.contractId.message}</span>
                                </span>
                            )}
                        </label>

                        <label className="form__field">
                            <span>Legal ID:</span>
                            <input
                                type="text"
                                className={errors.legalId ? 'error' : ''}
                                {...register('legalId')}
                            />
                            {errors.legalId && (
                                <span className="form__msg form__msg-error">
                                    <WarningCircle />
                                    <span>{errors.legalId.message}</span>
                                </span>
                            )}
                        </label>

                        <label className="form__field">
                            <span>Role:</span>
                            <select
                                className={errors.role ? 'error' : ''}
                                {...register('role')}
                            >
                                <option value="">Select a role</option>
                                <option value="Creator">Creator</option>
                                <option value="Borrower">Borrower</option>
                                <option value="Lender">Lender</option>
                                <option value="TrustProvider">Trust Provider</option>
                            </select>
                            {errors.role && (
                                <span className="form__msg form__msg-error">
                                    <WarningCircle />
                                    <span>{errors.role.message}</span>
                                </span>
                            )}
                        </label>

                        <label className="form__field">
                            <span>Key ID:</span>
                            <input
                                type="text"
                                className={errors.keyId ? 'error' : ''}
                                {...register('keyId')}
                            />
                            {errors.keyId && (
                                <span className="form__msg form__msg-error">
                                    <WarningCircle />
                                    <span>{errors.keyId.message}</span>
                                </span>
                            )}
                        </label>

                        <label className="form__field">
                            <span>Key Password:</span>
                            <input
                                type="password"
                                className={errors.keyPassword ? 'error' : ''}
                                {...register('keyPassword')}
                            />
                            {errors.keyPassword && (
                                <span className="form__msg form__msg-error">
                                    <WarningCircle />
                                    <span>{errors.keyPassword.message}</span>
                                </span>
                            )}
                        </label>

                        <label className="form__field">
                            <span>Account Password:</span>
                            <input
                                type="password"
                                className={errors.accountPassword ? 'error' : ''}
                                {...register('accountPassword')}
                            />
                            {errors.accountPassword && (
                                <span className="form__msg form__msg-error">
                                    <WarningCircle />
                                    <span>{errors.accountPassword.message}</span>
                                </span>
                            )}
                        </label>
                    </div>

                    <div className="form__actions">
                        <button
                            type="button"
                            onClick={() => navigate('/contracts')}
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
                            {isSubmitting ? <TailSpin height={20} width={20} /> : 'Sign Contract'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default ContractSigning;