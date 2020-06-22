import React, { useEffect } from 'react';
import { Tabs, Layout } from 'antd';

import Users from './components/Users';
import Todos from './components/Todos';
import users from './data/userData.json';
import todos from './data/todoData.json';

const { TabPane } = Tabs;
const { Content } = Layout;


function callback(key) {
  console.log(key);
}

function App() {

  useEffect(() => {
   
    if (localStorage.getItem('users') === null && localStorage.getItem('todos') === null) {
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  })

  return (
    <Content style={{ padding: '20px 300px' }}>
      <h3>Todos Users</h3>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Todos" key="1">
          <Todos />
        </TabPane>
        <TabPane tab="Users" key="2">
          <Users />
        </TabPane>
      </Tabs>
    </Content>
  );
}

export default App;
