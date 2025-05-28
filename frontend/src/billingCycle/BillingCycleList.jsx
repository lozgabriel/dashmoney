import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getList } from '../redux/billingCycleActions';

import styles from './BillingCycleList.module.css';

function BillingCycleList() {
    const dispatch = useDispatch();
    const list = useSelector((state) => state.billingCycle.list) || [];
    const loading = useSelector((state) => state.billingCycle.loading);
    const error = useSelector((state) => state.billingCycle.error);

    useEffect(() => {
        dispatch(getList());
    }, [dispatch]);

    return (
    <div>
        {loading && <p>Carregando dados...</p>}
        {error && <p>Erro: {error}</p>}
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
            {list.length === 0 ? (
                <tr>
                    <td colSpan="3" className="text-center">Nenhum registro encontrado</td>
                </tr>
            ) : (
                list.map((item, index) => (
                    <tr key={item._id} className={`${index % 2 === 0 ? styles.striped : ''}`}>
                        <td>{item.name}</td>
                        <td>{item.date ? item.date.substring(0, 10).split('-').reverse().join('/') : 'Sem data'}</td>
                    </tr>
                ))
            )}

            </tbody>
        </table>
    </div>
    );
}   
export default BillingCycleList