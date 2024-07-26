import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Upload, Button, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps, SelectProps } from 'antd';
import { useBookView, useGenreView, useModalState } from '../../store';
import { genreService } from '../../service/httpServices';
import bookService from '../../service/httpServices/bookService';
import { toast } from 'react-toastify';

const CreateBookModal = () => {
    const { show, toggleShow, status } = useModalState();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { genres, setGenres } = useGenreView((state) => state);
    const { book, setBooks } = useBookView((state) => state);

    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await genreService.index();
                setGenres(response);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (status === 'update' && book) {
            form.setFieldsValue({
                ...book,
                author: book.author?.name,
                genreId: book.genres?.map((genre) => genre.id),
                avatar: [], // Ensure avatar is an empty array initially
            });
        } else {
            form.resetFields();
        }
        setFileList([]); // Reset file list in both cases
    }, [status, book, form]);

    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };

    const options: SelectProps['options'] = genres.map((genre) => ({
        value: genre.id,
        label: genre.name,
    }));

    const onCancel = () => {
        if (confirm('Are you sure you want to cancel?')) {
            toggleShow();
            form.resetFields();
        }
    };

    const onCreate = async () => {
        try {
            if (confirm('Are you sure you want to CREATE this book?')) {
                const data = form.getFieldsValue();
                await bookService.create(data);
                toast.success('Book created successfully');
                toggleShow();
                form.resetFields();
                setFileList([]); // Ensure file list is reset after creating
            }
        } catch (error) {
            console.error('Error creating book:', error);
            toast.error('Error creating book');
        }
    };

    const onUpdate = async () => {
        try {
            if (confirm('Are you sure you want to UPDATE this book?')) {
                const data = form.getFieldsValue();
                // console.log({
                //     id: book.id,
                //     ...data,
                // });
                const response = await bookService.update(book.id, data);
                setBooks(response);
                toast.success('Book updated successfully');
                toggleShow();
                form.resetFields();
                setFileList([]); // Ensure file list is reset after updating
            }
        } catch (error) {
            console.error('Error updating book:', error);
            toast.error('Error updating book');
        }
    };

    return (
        <Modal
            visible={show}
            title={status === 'create' ? 'Create a new book' : 'Update book'}
            onCancel={onCancel}
            onOk={status === 'create' ? onCreate : onUpdate}
            width={1200}
        >
            <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }}>
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please input the title of the book!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please input the description of the book!' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name="avatar"
                    label="Avatar"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        if (Array.isArray(e)) {
                            return e;
                        }
                        return e && e.fileList;
                    }}
                >
                    <Upload name="avatar" {...props} listType="picture">
                        <Button icon={<UploadOutlined />}>{'Select file(s)'}</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="author"
                    label="Author"
                    rules={[{ required: true, message: 'Please input the author name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="genreId"
                    label="Genre"
                    rules={[{ required: true, message: 'Please select the genres!' }]}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select genres"
                        options={options}
                    />
                </Form.Item>
                <Form.Item name="isbn" label="ISBN" rules={[{ required: true, message: 'Please input the ISBN!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="stock" label="Stock" rules={[{ required: true, message: 'Please input the stock!' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateBookModal;
