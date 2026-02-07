import React, { type FC } from 'react'
import { type UploadFile } from './upload'
// import Icon from '../Icon/icon'
import Button from '../Button/button'
import Progress from '../Progress/progress'
interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
    const {
        fileList,
        onRemove,
    } = props
    console.log('firelist', fileList)
    return (
        <ul className="viking-upload-list">
            {fileList.map(item => {
                return (
                    <li className="viking-upload-list-item" key={item.uid}>
                        <span className={`file-name file-name-${item.status}`}>
                            √
                            {item.name}
                        </span>
                        <span className="file-status">
                            {(item.status === 'uploading' || item.status === 'ready') && <Button btnType='primary' size='sm'>uploading</Button>}
                            {item.status === 'success' && <Button btnType='primary' size='sm'>success</Button>}
                            {item.status === 'error' && <Button btnType='primary' size='sm'>error</Button>}
                        </span>
                        <span className="file-actions">
                            <Button btnType='primary' size='sm' onClick={() => { onRemove(item)}}>close</Button>
                        </span>
                        {item.status === 'uploading' &&
                            <Progress
                                percent={item.percent || 0}
                            />
                        }
                    </li>
                )
            })}
        </ul>
    )

}

export default UploadList;