import React from 'react';
import {
    Button,
    Col,
    Container,
    FloatingLabel,
    Form,
    Row,
} from 'react-bootstrap';
import { MdAdd } from 'react-icons/md';
import { ImBin } from 'react-icons/im';
import { BiCommentEdit } from 'react-icons/bi';
import { useState } from 'react';
import { useReducer } from 'react';
import Time from './Time';

const ACTION = {
    ADD_TODO: 'add-todo',
    TODO_REMOVE: 'todo-remove',
    TODO_EDIT: 'todo-edit',
};

const reduce = (todos, action) => {
    switch (action.type) {
        case ACTION.ADD_TODO:
            return [
                ...todos,
                { id: Date.now(), ...action.payload.note, isComplete: false },
            ];
        case ACTION.TODO_REMOVE:
            return todos.filter(todo => todo.id !== action.payload.id);

        case ACTION.TODO_EDIT:
            const { note } = action.payload;
            return todos.map(todo => (todo.id === note.id ? note : todo));

        default:
            return todos;
    }
};

const initialNotes = { title: '', content: '' };

export default function GoogleKeep() {
    const [todos, dispatch] = useReducer(reduce, []);
    const [expand, setExpand] = useState(false);

    const [note, setNote] = useState(initialNotes);

    const handleChange = e => {
        const { name, value } = e.target;
        setNote(pre => ({ ...pre, [name]: value }));
    };

    const addNote = e => {
        e.preventDefault();

        if (note.id) {
            dispatch({ type: ACTION.TODO_EDIT, payload: { note } });
        } else {
            dispatch({ type: ACTION.ADD_TODO, payload: { note } });
        }

        setNote(initialNotes);
    };

    const remove = id => {
        dispatch({ type: ACTION.TODO_REMOVE, payload: { id } });
    };

    const isAddButtonDisabled = !note.title && !note.content;

    return (
        <div className='d-flex flex-column min-vh-100'>
            <header style={{ background: '#FBBC04' }}>
                <div className='d-flex justify-content-between px-2'>
                    <h4 className='p-3'>Google Keep</h4>
                    <h4 className='p-3'>
                        <Time />
                    </h4>
                </div>
            </header>
            <section className='flex-grow-1'>
                <Container>
                    <div
                        style={{
                            maxWidth: '400px',
                            boxShadow: '0 0 12px rgb(0,0,0,0.25)',
                            borderRadius: '15px',
                        }}
                        className='m-auto p-4 mt-4'>
                        <Form>
                            {expand ? (
                                <Form.Group
                                    className='mb-3'
                                    controlId='formBasicEmail'>
                                    <Form.Control
                                        onChange={handleChange}
                                        type='text'
                                        name='title'
                                        value={note.title}
                                        placeholder='Title'
                                        className='input'
                                    />{' '}
                                </Form.Group>
                            ) : null}

                            <FloatingLabel
                                controlId='floatingTextarea2'
                                label='Write a note....'>
                                <Form.Control
                                    onClick={() => setExpand(true)}
                                    as='textarea'
                                    onChange={handleChange}
                                    name='content'
                                    className='input'
                                    value={note.content}
                                    placeholder='Leave a comment here'
                                />
                            </FloatingLabel>
                            {expand ? (
                                <div className='d-flex flex-row-reverse btndiv'>
                                    <Button
                                        onClick={addNote}
                                        variant='primary'
                                        type='submit'
                                        className='addbtn mt-2'
                                        disabled={isAddButtonDisabled}>
                                        <MdAdd size={25} />
                                    </Button>
                                </div>
                            ) : null}
                        </Form>
                    </div>
                </Container>
            </section>

            <section className='my-4'>
                <Container>
                    <Row>
                        {todos?.map(todo => {
                            return (
                                <Col lg={3} key={todo.id}>
                                    <div
                                        style={{
                                            maxWidth: '400px',
                                            boxShadow:
                                                '0 0 12px rgb(0,0,0,0.25)',
                                            borderRadius: '15px',
                                        }}
                                        className='p-4 my-2'>
                                        <h4>{todo.title}</h4>
                                        <p>{todo.content}</p>
                                        <div className='d-flex flex-row-reverse'>
                                            <Button
                                                variant='primary'
                                                type='submit'
                                                className='addbtn'>
                                                <ImBin
                                                    size={23}
                                                    onClick={() =>
                                                        remove(todo.id)
                                                    }
                                                />
                                            </Button>
                                            <Button
                                                variant='primary'
                                                type='submit'
                                                className='addbtn me-2'>
                                                <BiCommentEdit
                                                    size={23}
                                                    onClick={() =>
                                                        setNote(prev => ({
                                                            ...prev,
                                                            ...todo,
                                                        }))
                                                    }
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </section>
            <footer className={`text-center mt-5`}>
                <Container>
                    <p>Copyright @ 2023</p>
                </Container>
            </footer>
        </div>
    );
}
