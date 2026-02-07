import React from 'react'
import type { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react'
// import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'

export type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    className?: string;
    /**设置 Input 的禁用 */
    disabled?: boolean;
    /**设置 Input 的尺寸 */
    size?: InputSize;
    /**Input前缀 */
    prepend?: string | ReactElement;
    /**Input前缀 */
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 * 
 * ~~~js
 * // 这样引用
 * import { Input } from 'vikingship'
 * ~~~
 * 
 * 支持 HTMLInput 的所有基本属性
 */
export const Input: FC<InputProps> = (props) => {
    //取出各种属性
    const {
        disabled,
        size,
        prepend,
        append,
        style,
        ...restProps
    } = props
    //根据属性计算不同的className
    const cnames = classNames('viking-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
    })
    const fixControlledValue = (value:any) =>{
        if(typeof value === 'undefined' || value === null){
            return ''
        }
        return value;
    }
    if('value' in props){
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value)

    }
    return (
        //根据属性判断是否要添加特定的节点
        <div className={cnames} style={style}>
            {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
            {/* {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>} */}
            <input
                className="viking-input-inner"
                disabled={disabled}
                {...restProps}
            />
            {append && <div className="viking-input-group-append">{append}</div>}
        </div>
    )
}

export default Input;