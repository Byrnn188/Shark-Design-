import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from "react";
import { fn } from 'storybook/test';
import { action } from 'storybook/actions';
import Upload from './upload';

const meta = {
    title: 'Upload',
    id: 'Upload',
    component: Upload,
    tags: ['autodocs'],
    argTypes: {

    }
} satisfies Meta<typeof Upload>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleUpload: Story = () => {

    const checkFileSize = (file: File) => {
        if (Math.round(file.size / 1024) > 50) {
            alert('file too big')
            return false;
        }
        return true;
    }
    //如果是文件的重命名用promise，用以处理异步处理逻辑
    const filePromise = (file: File) => {
        const newFile = new File([file], 'new_name.docx', {type: file.type})
        return Promise.resolve(newFile)
    }

    return (
        <Upload
            action='https://jsonplaceholder.typicode.com/posts/'
            onChange={action('changed')}
            name='fileName'
            data={{'key': 'value'}}
            headers={{'X-Powered-By': 'shark-design'}}
            accept=".docx"
            multiple
            drag
            // beforeUpload={filePromise}
            // onProgress={action('progress')}
            // onSuccess={action('success')}
            // onError={action('error')}

        />
    )
}