import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { getSummary } from '../redux/dashboardActions';
import ContentHeader from "../components/ContentHeader"
import Content from "../components/Content"
import ValueBox from "../widget/ValueBox"
import './Dashboard.css'

function Dashboard() {
    const credit = useSelector((state) => state.dashboard.summary.credit) || 0;
    const debt = useSelector((state) => state.dashboard.summary.debt) || 0;
    const loading = useSelector((state) => state.dashboard.loading);
    const error = useSelector((state) => state.dashboard.error);
    const dispatch = useDispatch();

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    // Com useMemo: O cálculo só é refeito se credit ou debit mudarem
    const consolidatedValue = useMemo(() => credit - debt, [credit, debt]);
    
    // Dispara a busca de dados ao montar o componente
    useEffect(() => {
        dispatch(getSummary());
    }, [dispatch]);

    return (
        <div className='dashboard'>
            <ContentHeader title="Dashboard" subtitle="Versão 1.0" />
            <Content>
                {loading && <p>Carregando dados...</p>}
                {error && <p>Erro: {error}</p>}
                <div className="row-cards">
                    <ValueBox value={formatCurrency(credit)} text="Total de Créditos" icon="account_balance"/>   
                    <ValueBox value={formatCurrency(debt)} text="Total de Débitos" icon="credit_card"/>   
                    <ValueBox value={formatCurrency(consolidatedValue)} text="Valor Consolidado" icon="payments"/>   
                </div>
            </Content>
        </div>
    )
}

export default Dashboard 