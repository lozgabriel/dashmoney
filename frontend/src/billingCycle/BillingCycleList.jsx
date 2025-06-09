// useSelector: Hook do Redux para ler dados do store.
// useDispatch: Hook do Redux para enviar ações ao store.
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getList, deleteBillingCycle } from '../redux/billingCycleActions';
import { toast } from 'react-toastify';
import { setActiveTab } from '../redux/tabReducer';
import { setVisibleTabs } from '../redux/showTabReducer';

import styles from './BillingCycleList.module.css';

function BillingCycleList({ onEdit }) {
    const dispatch = useDispatch();
    const list = useSelector((state) => state.billingCycle.list) || [];
    const error = useSelector((state) => state.billingCycle.error);
    const total = useSelector((state) => state.billingCycle.total);
    const limit = useSelector((state) => state.billingCycle.limit) || 10;

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(total / limit);

    useEffect(() => {
        dispatch(getList({ page: currentPage, limit }));
    }, [dispatch, currentPage, limit]);

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Não foi possível carregar a lista"); 
        }
    }, [error]);

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

    const handlePageUpdate = (item) => {
        dispatch(setActiveTab('tabUpdate'));
        dispatch(setVisibleTabs(['tabUpdate']));
        onEdit(item)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este ciclo?')) {
            try {
                await dispatch(deleteBillingCycle(id)).unwrap();
                toast.success('Ciclo excluído com sucesso!');
                dispatch(getList({ page: currentPage, limit }));
            } catch (err) {
                const msg = err.response?.data || err.message || 'Erro desconhecido!';
                toast.error(msg);
                console.error('Erro ao excluir ciclo:', err);
            }
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
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Data</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
            {list.length === 0 ? (
                <tr>
                    <td colSpan="3" className="text-center">Nenhum registro encontrado</td>
                </tr>
            ) : (
                list.map((item, index) => (
                    <tr key={item._id || index} className={`${index % 2 === 0 ? styles.striped : ''}`}>
                        <td>{item.name}</td>
                        <td>{item.date ? item.date.substring(0, 10).split('-').reverse().join('/') : 'Sem data'}</td>
                        <td className={styles.btnActions}>
                            <button className="btn btn-primary offset-btn mr-1" onClick={() => handlePageUpdate(item)}>
                                <i className="material-symbols-outlined">edit</i>
                            </button>
                            <button className="btn btn-delete offset-btn" onClick={() => handleDelete(item._id)}>
                                <i className="material-symbols-outlined">delete</i>
                            </button>
                        </td>
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