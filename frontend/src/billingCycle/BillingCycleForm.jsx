import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from "./BillingCycleForm.module.css";

function BillingCycleForm({ onSubmit, disabled, initialData }) {
    const { register, handleSubmit, formState: { errors }, reset} = useForm({
        defaultValues: {
            name: initialData?.name || '',
            date: initialData?.date ? initialData.date.substring(0, 10) : ''
        }
    });

    const onFormSubmit = (data) => {
        onSubmit({
            name: data.name,
            date: data.date,
            credits: initialData?.credits || [],
            debts: initialData?.debts || []
        }); 
        reset();
    };

    useEffect(() => {
        reset({
            name: initialData?.name || '',
            date: initialData?.date ? initialData.date.substring(0, 10) : ''
        });
    }, [initialData, reset]);

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

            <div className={styles.boxFooter}>
                <button type="submit" className="btn btn-primary" disabled={disabled}>{disabled ? 'Salvando...' : 'Salvar'}</button>
            </div>
            
        </form>
    )
}

export default BillingCycleForm;