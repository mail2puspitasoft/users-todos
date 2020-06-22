import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Modal, Input, DatePicker } from 'antd';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import { getTodoList, saveOrUpdateTodo, deleteTodo } from '../actions/todoAction';

function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}

function disabledDateTime() {
    return {
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
    };
}

function Todos() {

    const columns = [
        {
            title: 'To Do',
            dataIndex: 'todo',
            key: 'todo',
            render: text => <div>{text}</div>,
        },
        {
            title: 'Date Added',
            dataIndex: 'dateAdded',
            key: 'dateAdded',
            render: text => <div>{text}</div>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => handleEditTodo(record)}>Edit</a>
                    <div class="action-separator"></div>
                    <a onClick={() => { if (window.confirm('Delete the user?')) { handleDeleteTodo(record) }; }}>Delete</a>
                </Space>
            ),
        },
    ];

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [todoForm, setTodoForm] = useState({ "key": "", "todo": "", "dateAdded": "" });

    const todoStore = useSelector(state => state.todoReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodoList());
    }, [])

    const showModal = (addOrEdit) => {
        if (addOrEdit === 'add') {
            setTodoForm({ "key": "", "todo": "", "dateAdded": new Date() });
        }
        setVisible(true);
    };

    const handleSaveBtnClick = () => {
        console.log("Todo Form:=>", todoForm)
        setLoading(true);
        dispatch(saveOrUpdateTodo(todoForm));
        setTimeout(() => {
            setLoading(false);
            setVisible(false);
        }, 2000);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const updateForm = (e, attr) => {
        if (e !== null) {
            setTodoForm({
                ...todoForm,
                [attr]: attr === 'dateAdded' ? new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "long", day: "2-digit", hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(e._d)) : e.target.value
            })
        }
    }

    const handleEditTodo = (todo) => {
        console.log(todo.dateAdded)
        setTodoForm(todo)
        showModal();
    }

    const handleDeleteTodo = (todo) => {
        dispatch(deleteTodo(todo));
    }

    return (

        <>
            <p><Button onClick={() => showModal('add')}>Add To Do</Button></p>
            <Table columns={columns} dataSource={todoStore.todoList} />
            <Modal
                visible={visible}
                title="Add New To Do"
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
                <label>To Do</label>
                <p><Input placeholder="Name" onChange={(e) => updateForm(e, 'todo')} value={todoForm.todo} /></p>
                <label>Date Added</label>
                <p>
                    <DatePicker
                        format="DD MMM YYYY, HH:mm:ss"
                        disabledDate={disabledDate}
                        disabledTime={disabledDateTime}
                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        onChange={(e) => updateForm(e, 'dateAdded')}
                        value={moment(new Date(todoForm.dateAdded.toString()))}
                    />
                </p>
            </Modal>
        </>
    )
}

export default Todos;