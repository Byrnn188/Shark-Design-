//@ts-nocheck
import React, { useRef, type ChangeEvent, useState } from 'react';
import axios from 'axios';
import UploadList from './uoloadList';
import Button from '../Button/button';
import { Input } from '../Input/input';
import Dragger from './dragger';
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent: number;
    raw?: File;
    response?: any;
    error?: any;
}

export interface UploadProps {
    /**必选参数, 上传的地址 */
    action: string;
    /**上传的文件列表,*/
    defaultFileList?: UploadFile[];
    /**上传文件之前的钩子(验证)，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 */
    beforeUpload?: (file: UploadFile) => boolean | Promise<UploadFile>;
    /** 文件上传时的钩子 */
    onProgress?: (percentage: number, file: UploadFile) => void;
    /**文件上传成功时的钩子 */
    onSuccess?: (data: any, file: UploadFile) => void;
    /**文件上传失败时的钩子 */
    onError?: (err: any, file: UploadFile) => void;
    /**文件状态改变时的钩子，上传成功或者失败时都会被调用	 */
    onChange?: (file: UploadFile) => void;
    /**文件列表移除文件时的钩子 */
    onRemove?: (file: UploadFile) => void;
    /**设置上传的请求头部 */
    headers?: { [key: string]: any };
    /**上传的文件字段名 */
    name?: string;
    /**上传时附带的额外参数 */
    data?: { [key: string]: any };
    /**支持发送 cookie 凭证信息 */
    withCredentials?: boolean;
    /**可选参数, 接受上传的文件类型 */
    accept?: string;
    /**是否支持多选文件 */
    multiple?: boolean;
    /**是否支持拖拽上传 */
    drag?: boolean;
    children?: React.ReactNode
}

export const Upload: React.FC<UploadProps> = (props) => {
    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        name = 'file',
        headers,
        data,
        withCredentials,
        accept,
        multiple,
        drag,
        children
    } = props

    //为了拿到DOM节点:模拟用户点击了这个 <input type="file">
    const fileInput = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return { ...file, ...updateObj }
                } else {
                    return file
                }
            })
        })
    }
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files //一个 FileList 对象（类似数组），包含用户选中的所有文件
        if (!files) {
            return
        }
        uploadFiles(files)
        if (fileInput.current) {
            fileInput.current.value = ''
        }
    }
    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        if (onRemove) {
            onRemove(file)
        }
    }
    const uploadFiles = (files: FileList, test?: boolean) => {
        const postFiles = Array.from(files) //转换成数组
        if (test) {
            console.log('drag', postFiles[0])
        }
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result === true) {
                    post(file)
                }
            }

        })
    }
    const post = (file: File) => {
        const _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        // setFileList([_file, ...fileList])
        setFileList(prevList => {
            return [_file, ...prevList]
        })
        const formData = new FormData()
        formData.append(name || 'file', file)
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            //axios提供的progress进度,e里面的数据能够算百分比
            onUploadProgress: (e) => {
                const percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' })
                    if (onProgress) {
                        onProgress(percentage, _file)
                    }
                }
            }
        }).then(resp => {
            console.log(resp)
            updateFileList(_file, { status: 'success', response: resp.data })
            _file.status = 'success'
            _file.response = resp.data
            if (onSuccess) {
                onSuccess(resp.data, _file)
            }
            if (onChange) {
                onChange(_file)
            }
        }).catch(err => {
            console.log(err)
            updateFileList(_file, { status: 'error', error: err })
            _file.status = 'error'
            _file.error = err
            if (onError) {
                onError(err, _file)
            }
            if (onChange) {
                onChange(_file)
            }
        })
    }

    return (
        <div
            className="viking-upload-component"
        >
            <div className="viking-upload-input"
                style={{ display: 'inline-block' }}
                onClick={handleClick}>
                {drag ?
                    <Dragger onFile={(files) => { uploadFiles(files, true) }}>
                        {children}
                    </Dragger> :
                    children
                }
                <input
                    className="viking-file-input"
                    style={{ display: 'none' }}
                    ref={fileInput}
                    onChange={handleFileChange}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                />
            </div>

            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    );
};


export default Upload;