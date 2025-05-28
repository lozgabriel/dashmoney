import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentHeader from "../components/ContentHeader";
import Tabs from "../components/Tabs/Tabs";
import TabsHeader from "../components/Tabs/TabsHeader";
import TabHeader from "../components/Tabs/TabHeader";
import TabsContent from "../components/Tabs/TabsContent";
import TabContent from "../components/Tabs/TabContent";
import BillingCycleList from './BillingCycleList';
import BillingCycleForm from './BillingCycleForm';
import { setActiveTab } from '../redux/tabReducer';
import { setVisibleTabs } from '../redux/showTabReducer';
import { createBillingCycle, getList } from '../redux/billingCycleActions';
import './BillingCycle.css'

function BillingCycle() {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector(state => state.billingCycle);

    useEffect(() => {
        dispatch(setActiveTab('tabList'));
        dispatch(setVisibleTabs(['tabList', 'tabCreate']));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (data) => {
        try {
            await dispatch(createBillingCycle(data)).unwrap();
            await dispatch(getList());
            dispatch(setActiveTab('tabList'));
        } catch (err) {
            console.error('Failed to create billing cycle:', err);
        }
    };

    return (
        <div className='billing-cycle'>
            <ContentHeader title="Ciclos de Pagamentos" subtitle="Cadastro" />
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">Ciclo criado com sucesso!</div>}
            <Tabs>
                <TabsHeader>
                    <TabHeader target="tabList" icon="list" label="Listar" />
                    <TabHeader target="tabCreate" icon="add" label="Incluir" />
                    <TabHeader target="tabUpdate" icon="edit" label="Alterar" />
                    <TabHeader target="tabDelete" icon="delete" label="Excluir" />
                </TabsHeader>
                <TabsContent>
                    <TabContent id="tabList">
                        <BillingCycleList />
                    </TabContent>
                    <TabContent id="tabCreate">
                        <BillingCycleForm onSubmit={handleSubmit} disabled={loading} />
                    </TabContent>
                    <TabContent id="tabUpdate">
                        <h1>Alterar</h1>
                    </TabContent>
                    <TabContent id="tabDelete">
                        <h1>Excluir</h1>
                    </TabContent>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default BillingCycle 