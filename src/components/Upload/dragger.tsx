import React, { type FC, useState, type DragEvent, type ReactNode } from 'react'
import classNames from 'classnames'

interface DraggerProps {
  onFile: (files: FileList) => void;
  children?: ReactNode
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props
  const [ dragOver, setDragOver ] = useState(false)
  const klass = classNames('viking-uploader-dragger', {
    'is-dragover': dragOver
  })
  //用户松开鼠标放下文件
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault() //防止浏览器默认打开文件
    setDragOver(false)
    console.log('inside drag', e.dataTransfer.files)
    onFile(e.dataTransfer.files) //拖放文件的核心数据，把文件传给父组件
  }
  //统一处理dragover和dragleave
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault() //浏览器会认为你接收拖放
    setDragOver(over)
  }
  return (
    <div 
      className={klass}
      onDragOver={e => { handleDrag(e, true)}} //鼠标拖着文件进入区域
      onDragLeave={e => { handleDrag(e, false)}} //鼠标拖着文件里离开区域
      onDrop={handleDrop} //松开鼠标
    >
        <p>Drag file over to upload</p>
      {children}
    </div>
  )
}

export default Dragger;