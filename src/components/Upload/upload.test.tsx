import { render, type RenderResult, fireEvent, waitFor, queryByText } from '@testing-library/react'
import '@testing-library/jest-dom';
import React from 'react'
import axios from 'axios'
import { Upload, UploadProps } from './upload';

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
    action: "fakeur.com",
    //生命周期
    onSuccess: jest.fn(),
    onChange: jest.fn(),
    onRemove: jest.fn(),
    drag: true
}
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })
//change隐藏的input的值，改变的值为要上传的文件，
// 触发axios.post上传文件，希望看到展示上传成功的列表
//并且触发对应的生命周期函数
describe('test upload component', () => {
    beforeEach(() => {
        wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
        fileInput = wrapper.container.querySelector('.viking-file-input')
        uploadArea = wrapper.queryAllByText('Click to upload')
    })
    it('upload process should works fine', async () => {
        const { queryAllByText } = wrapper
        // mockedAxios.post.mockImplementation(() => {
        //     return Promise.resolve({ 'data': 'cool' })
        // })
        mockedAxios.post.mockResolvedValue({ 'data': 'cool' })
        expect(uploadArea).toBeInTheDocument()
        expect(fileInput).not.toBeVisible()
        fireEvent.change(fileInput, { target: { files: [testFile] } })
        expect(queryByText('spinner')).toBeInTheDocument() //图标
        await waitFor(() => {
            expect(queryByText('test.png')).toBeInTheDocument()
            expect(queryByText('check-circle')).toBeInTheDocument() //成功图标
        })
        expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
            raw: testFile,
            status: 'success',
            response: 'cool',
            name: 'test.png'
        }))
        expect(testProps.onChange).toHaveBeenCalledWith(expect.objectContaining({
            raw: testFile,
            status: 'success',
            response: 'cool',
            name: 'test.png'
        }))
        //remove the uploaded file
        expect(queryByText('times')).toBeInTheDocument() //图标
        fireEvent.click(getByText('times'))
        expect(queryByText('test.png')).not.toBeInTheDocument()
        expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
            raw: testFile,
            status: 'success',
            name: 'test.png'
        }))
    })
    it('drag and drop files should works fine', async () => {
        mockedAxios.post.mockResolvedValue({ 'data': 'cool' })
        fireEvent.dragOver(uploadArea)
        expect(uploadArea).toHaveClass('is-dragover')
        fireEvent.dragLeave(uploadArea)
        expect(uploadArea).not.toHaveClass('is-dragover')
        // const mockDropEvent = createEvent.drop(uploadArea)
        // Object.defineProperty(mockDropEvent, "dataTransfer", {
        //   value: {
        //     files: [testFile]
        //   }
        // })
        // fireEvent(uploadArea, mockDropEvent)
        fireEvent.drop(uploadArea, {
            dataTransfer: {
                files: [testFile]
            }
        })
        await waitFor(() => {
            expect(wrapper.queryByText('test.png')).toBeInTheDocument()
            // expect(wrapper.queryByText('check-circle')).toBeInTheDocument()
        })
        expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
            raw: testFile,
            status: 'success',
            response: 'cool',
            name: 'test.png'
        }))
    })
})