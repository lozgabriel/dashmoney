import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import ItemList from './ItemList';
import ValueBox from '../widget/ValueBox';
import styles from "./BillingCycleForm.module.css";

function BillingCycleForm({ onSubmit, onCancel, disabled, initialData, activeTab }) {
    const { register, handleSubmit, formState: { errors }, reset, control} = useForm({
        defaultValues: {
            name: initialData?.name || '',
            date: initialData?.date ? initialData.date.substring(0, 10) : '',
            credits: initialData?.credits && initialData.credits.length > 0
            ? initialData.credits
            : [{ name: '', value: '' }],
            debts: initialData?.debts && initialData.debts.length > 0
            ? initialData.debts
            : [{ name: '', value: '' }]
        }
    });

    const { fields: creditFields, append: appendCredit, remove: removeCredit } = useFieldArray({
        control,
        name: "credits"
    });

    const { fields: debtFields, append: appendDebt, remove: removeDebt } = useFieldArray({
        control,
        name: "debts"
    });

    const onFormSubmit = (data) => {
        onSubmit({
            name: data.name,
            date: data.date,
            credits: data.credits || [],
            debts: data.debts || []
        }); 
        reset();
    };

    useEffect(() => {
        reset({
            name: initialData?.name || '',
            date: initialData?.date ? initialData.date.substring(0, 10) : '',
            credits: initialData?.credits && initialData.credits.length > 0
                ? initialData.credits
                : [{ name: '', value: '' }],
            debts: initialData?.debts && initialData.debts.length > 0
                ? initialData.debts
                : [{ name: '', value: '' }]
        });
    }, [initialData, reset]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const calculateCreditValues = () => {
        return creditFields.reduce((sum, item, index) => {
            const value = parseFloat(control._formValues.credits?.[index]?.value) || 0;
            return sum + value;
        }, 0);
    };

    const calculateDebtValues = () => {
        return debtFields.reduce((sum, item, index) => {
            const value = parseFloat(control._formValues.debts?.[index]?.value) || 0;
            return sum + value;
        }, 0);
    };

    const consolidatedValues = calculateCreditValues() - calculateDebtValues();

    return (
        <form className={styles.formContent} onSubmit={handleSubmit(onFormSubmit)}>
            <div className={styles.formGroup}>
                <label htmlFor="name">Nome</label>
                <input 
                    type="text" 
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    disabled={disabled}
                    {...register('name', { 
                        required: 'O nome é obrigatório',
                        minLength: { value: 3, message: 'Mínimo de 3 caracteres' }
                    })} 
                />
                {errors.name && <span className="text-danger">{errors.name.message}</span>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="date">Data</label>
                <input
                    type="date"
                    className="form-control"
                    id="date"
                    disabled={disabled}
                    {...register('date', { required: 'A data é obrigatória' })}
                />
                {errors.date && <span className="text-danger">{errors.date.message}</span>}
            </div>

            <div className={styles.infoBalance}>
                <h2 className={styles.title}>Balanço</h2>
                <div className={styles.infoBalanceBox}>
                    <ValueBox value={formatCurrency(calculateCreditValues())} text="Total de Créditos" icon="account_balance"/>   
                    <ValueBox value={formatCurrency(calculateDebtValues())} text="Total de Débitos" icon="credit_card"/>   
                    <ValueBox value={formatCurrency(consolidatedValues)} text="Valor Consolidado" icon="payments"/>   
                </div>
            </div>

            <div className={styles.ItemListContent}>
                <ItemList 
                    title="Créditos" 
                    type="credits" 
                    register={register} 
                    errors={errors} 
                    disabled={disabled} 
                    fields={creditFields} 
                    append={appendCredit} 
                    remove={removeCredit} 
                />

                <ItemList 
                    title="Débitos" 
                    type="debts" 
                    register={register} 
                    errors={errors} 
                    disabled={disabled} 
                    fields={debtFields} 
                    append={appendDebt} 
                    remove={removeDebt} 
                />
            </div>

            <div className={styles.boxFooter}>
                <button type="submit" className="btn btn-primary" disabled={disabled}>{disabled ? 'Salvando...' : 'Salvar'}</button>
                
                {activeTab === 'tabUpdate' && (
                    <button type="button" className="btn btn-secondary ml-1" onClick={onCancel}>Cancelar</button>
                )}
            </div>
            
        </form>
    )
}

export default BillingCycleForm;