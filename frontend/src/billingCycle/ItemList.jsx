import styles from './ItemList.module.css';

function ItemList({ register, errors, disabled, fields, append, remove, title, type }) {
    const getButtonLabel = () => {
        return `Adicionar ${type === 'credits' ? 'Crédito' : 'Débito'}`;
    };
    return (
        <div className={styles.itemList}>
            <h2>{title}</h2>
            <button type="button" className='btn btn-primary' onClick={() => append({ name: '', value: '' })}>
                {getButtonLabel()}
            </button>
            {fields.map((item, index) => (
                <div key={item.id} className={styles.itemListContent}>
                    <div className={styles.formGroup}>
                        <label htmlFor={`${type}.${index}.name`}>Nome</label>
                        <input 
                            id={`${type}.${index}.name`}
                            type="text"
                            disabled={disabled}
                            {...register(`${type}.${index}.name`, { 
                                required: 'O nome é obrigatório',
                                minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                            })}
                            className={`form-control ${errors?.[type]?.[index]?.name ? 'is-invalid' : ''}`}
                        />
                        {errors?.[type]?.[index]?.name && (
                            <span className="text-danger">{errors[type][index].name.message}</span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor={`${type}.${index}.valor`}>Valor</label>
                        <input 
                            id={`${type}.${index}.value`}
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0,00"
                            disabled={disabled}
                            {...register(`${type}.${index}.value`, { 
                                required: 'O valor é obrigatório',
                                validate: {
                                    isNumber: value => !isNaN(value) || 'Digite um número válido',
                                    isPositive: value => parseFloat(value) >= 0 || 'O valor não pode ser negativo'
                                }
                            })}
                            className={`form-control ${errors?.[type]?.[index]?.value ? 'is-invalid' : ''}`}
                        />
                        {errors?.[type]?.[index]?.value && (
                            <span className="text-danger">{errors[type][index].value.message}</span>
                        )}
                    </div>

                    <button type="button" className='btn btn-secondary offset-btn-remove' onClick={() => remove(index)} disabled={disabled}>Remover</button>
                </div>
            ))}

            
        </div>
    )
}

export default ItemList;