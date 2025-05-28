// useSelector: Hook do Redux para ler dados do store.
// useDispatch: Hook do Redux para enviar ações ao store.
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getList } from '../redux/billingCycleActions';

import styles from './BillingCycleList.module.css';

function BillingCycleList() {
    const dispatch = useDispatch();
    const list = useSelector((state) => state.billingCycle.list) || [];
    const loading = useSelector((state) => state.billingCycle.loading);
    const error = useSelector((state) => state.billingCycle.error);
    const total = useSelector((state) => state.billingCycle.total);
    const limit = useSelector((state) => state.billingCycle.limit) || 5;

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(total / limit);

    useEffect(() => {
        dispatch(getList({ page: currentPage, limit }));
    }, [dispatch, currentPage, limit]);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const renderPagination = () => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={currentPage === i ? styles.activePage : ''}
                >
                    {i}
                </button>
            );
        }

        return (
            <>  
                <div className={styles.paginationControls}>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Anterior
                    </button>
                    {pages}
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Próxima
                    </button>
                </div>
                <span>Página {currentPage} de {totalPages}</span>
            </>
        );
    };

    return (
    <div className={styles.billingCycleList}>
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
        <div className={styles.pagination}>
            {renderPagination()}
        </div>
    </div>
    );
}   
export default BillingCycleList