import React from 'react'
import type { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from "classnames";

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
    className?: string;
    /**设置 Button 的禁用 */
    disabled?: boolean;
    /**设置 Button 的尺寸 */
    size?: ButtonSize;
    /**设置 Button 的类型 */
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 * 
 * ```javascript
 * import { Button } from 'shark-design'
 * ```
 */
export const Button: FC<ButtonProps> = (props) => {
    const {
        btnType = 'default',
        className,
        disabled = false,
        size,
        children,
        href,
        ...restProps
    } = props

    //btn, btn-lg,btn-primary
    //专门用来 动态拼接 CSS 类名
    //link的disabled属性是直接加到classname里面的
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })

    if (btnType === 'link' && href) {
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button className={classes} disabled={disabled} {...restProps}>{children}</button>
        )
    }
}

export default Button;


