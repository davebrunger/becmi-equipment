import React from 'react';
import { EquipmentItem } from '../models/EquipmentItem';
import { fetchEquipmentItems } from '../services/EquipmentService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { EquipmentList } from './EquipmentList';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { EquipmentLoadout } from './EquipmentLoadout';

function App() {

    const [equipmentList, setEquipmentList] = React.useState<EquipmentItem[]>([]);
    const [activeTab, setActiveTab] = React.useState(1);

    React.useEffect(() => {
        (async () => {
            const equipmentList = await fetchEquipmentItems();
            setEquipmentList(equipmentList);
        })();
    }, []);

    return (
        <div className="app container">
            <h1>
                BECMI Equipment Utility
            </h1>
            <Nav tabs>
                <NavItem>
                    <NavLink onClick={() => {setActiveTab(1)}} active={activeTab === 1}>Create Equipment Loadout</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={() => {setActiveTab(2)}} active={activeTab === 2}>Full Equipment List</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId={1}>
                    <EquipmentLoadout equipmentList={equipmentList} />
                </TabPane>
                <TabPane tabId={2}>
                    <EquipmentList equipmentList={equipmentList} />
                </TabPane>
            </TabContent>
        </div>
    );
}

export default App;
