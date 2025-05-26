import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ContentHeader from "../components/ContentHeader";
import Tabs from "../components/Tabs/Tabs";
import TabsHeader from "../components/Tabs/TabsHeader";
import TabHeader from "../components/Tabs/TabHeader";
import TabsContent from "../components/Tabs/TabsContent";
import TabContent from "../components/Tabs/TabContent";
import { setActiveTab } from '../redux/tabReducer';
import './BillingCycle.css'

function BillingCycle() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveTab('tabList'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                        <h1>Lista</h1>
                    </TabContent>
                    <TabContent id="tabCreate">
                        <h1>Incluir</h1>
                    </TabContent>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default BillingCycle 