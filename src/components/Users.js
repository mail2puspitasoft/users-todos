import React, { useState, useEffect, useRef } from 'react';
import { Table, Space, Button, Modal, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { getUserList, saveOrUpdateUser, deleteUser } from '../actions/userAction';

function Users() {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <div>{text}</div>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: text => <div>{text}</div>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => handleEditUser(record)}>Edit</a>
                    <div class="action-separator"></div>
                    <a onClick={() => { if (window.confirm('Delete the user?')) { handleDeleteUser(record) }; }}>Delete</a>
                </Space>
            ),
        },
    ];

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [userForm, setUserForm] = useState({ "key": "", "name": "", "email": "" });

    const userStore = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserList());
    }, [])

    const showModal = (addOrEdit) => {
        if (addOrEdit === 'add') {
            setUserForm({ "key": "", "name": "", "email": "" });
        }
        setVisible(true);
    };

    const handleSaveBtnClick = () => {
        console.log("User Form:=>", userForm)
        setLoading(true);
        dispatch(saveOrUpdateUser(userForm));
        setTimeout(() => {
            setLoading(false);
            setVisible(false);
        }, 2000);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const updateForm = (e, attr) => {
        setUserForm({
            ...userForm,
            [attr]: e.target.value
        })
    }

    const handleEditUser = (user) => {
        setUserForm(user)
        showModal();
    }

    const handleDeleteUser = (user) => {
        dispatch(deleteUser(user));
    }

    return (
        <>
            <p><Button onClick={() => showModal('add')}>Create User</Button></p>
            <Table columns={columns} dataSource={userStore.userList} />
            <Modal
                visible={visible}
                title="Add New User"
                // onOk={() => handleOk()}
                onCancel={() => handleCancel()}
                footer={[
                    <Button key="back" onClick={() => handleCancel()}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={() => handleSaveBtnClick()}>
                        Save
                    </Button>,
                ]}
            >
                <label>Name</label>
                <p><Input placeholder="Name" onChange={(e) => updateForm(e, 'name')} value={userForm.name} /></p>
                <label>Email</label>
                <p><Input placeholder="Email" onChange={(e) => updateForm(e, 'email')} value={userForm.email} /></p>
            </Modal>
        </>
    )
}

export default Users;