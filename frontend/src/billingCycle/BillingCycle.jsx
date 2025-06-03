import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
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
import { createBillingCycle, getList, updateBillingCycle } from '../redux/billingCycleActions';
import './BillingCycle.css'

function BillingCycle() {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.billingCycle);
    const [selectedCycle, setSelectedCycle] = useState(null);
    const activeTab = useSelector(state => state.tab.activeTab);

    useEffect(() => {
        dispatch(setActiveTab('tabList'));
        dispatch(setVisibleTabs(['tabList', 'tabCreate']));
    }, [dispatch]);

    const handleSubmit = async (data) => {
        try {
            await dispatch(createBillingCycle(data)).unwrap();
            await dispatch(getList());
            dispatch(setActiveTab('tabList'));
            toast.success('Ciclo criado com sucesso!');
        } catch (err) {
            const msg = err.response?.data || err.message || 'Erro desconhecido!';
            toast.error(msg);
            console.error('Failed to create billing cycle:', err);
        }
    };

    const handleUpdate = async (data) => {
        try {
            await dispatch(updateBillingCycle({ id: selectedCycle?._id, data })).unwrap();
            await dispatch(getList());
            dispatch(setActiveTab('tabList'));
            dispatch(setVisibleTabs(['tabList', 'tabCreate']));
            toast.success('Ciclo atualizado com sucesso!');
            setSelectedCycle(null);
            
        } catch (err) {
            const msg = err.response?.data || err.message || 'Erro desconhecido!';
            toast.error(msg);
            console.error('Failed to update billing cycle:', err);
        }
    };

    const handleCancel = () => {
        setSelectedCycle(null);
        dispatch(setActiveTab('tabList'));
        dispatch(setVisibleTabs(['tabList', 'tabCreate']));
    };
    
    return (
        <div className='billing-cycle'>
            <ContentHeader title="Ciclos de Pagamentos" subtitle="Cadastro" />
            <Tabs>
                <TabsHeader>
                    <TabHeader target="tabList" icon="list" label="Listar" />
                    <TabHeader target="tabCreate" icon="add" label="Incluir" />
                    <TabHeader target="tabUpdate" icon="edit" label="Alterar" />
                    <TabHeader target="tabDelete" icon="delete" label="Excluir" />
                </TabsHeader>
                <TabsContent>
                    <TabContent id="tabList">
                        <BillingCycleList onEdit={setSelectedCycle} />
                    </TabContent>
                    <TabContent id="tabCreate">
                        <BillingCycleForm 
                            onSubmit={handleSubmit} 
                            activeTab={activeTab}
                            disabled={loading} 
                        />
                    </TabContent>
                    <TabContent id="tabUpdate">
                        {selectedCycle ? (
                            <BillingCycleForm 
                                onSubmit={handleUpdate} 
                                initialData={selectedCycle} 
                                disabled={loading} 
                                activeTab={activeTab}
                                onCancel={handleCancel}
                            />
                        ) : (
                            <p>Selecione um ciclo para editar.</p>
                        )}
                    </TabContent>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default BillingCycle 