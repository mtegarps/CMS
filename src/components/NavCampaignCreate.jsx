import React from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const NavCampaignCreate = ({ children, tabPanes, changeTab, state }) => (
  <Tabs
    type="card"
    tabBarStyle={{
      fontWeight: "bold",
      fontSize: "14px",
    }}
    activeKey={state.activeKey}
    onChange={changeTab}>
    {tabPanes.map((pane) => (
      <TabPane tab={pane.label} key={pane.key}>
        {pane.content}
      </TabPane>
    ))}
  </Tabs>
);
export default NavCampaignCreate;