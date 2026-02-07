import React, { useEffect, useLayoutEffect, type ReactElement, type KeyboardEvent, useRef } from "react"
import classNames from "classnames"
import { type FC, useState, type ChangeEvent } from 'react'
import type { InputProps } from "../Input/input"
import { Input } from "../Input/input"
import useDebouce from "../../hooks/useDebounce"
import useClickOutside from "../../hooks/useClickOutside"

export interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    /**支持自定义渲染下拉项，返回 ReactElement */
    renderOption?: (item: DataSourceType) => ReactElement;
}

/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式
 * 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 * 
 * ~~~js
 * import { AutoComplete } from 'vikingship'
 * ~~~
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        renderOption,
        value,
        ...restProps
    } = props

    const [inputValue, setInputValue] = useState(value as string)
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const [loading, setLoading] = useState(false)
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const debouceValue = useDebouce(inputValue, 500)
    useClickOutside(componentRef, () => { setSuggestions([]) })
    useEffect(() => {
        if (debouceValue && triggerSearch.current) {
            const results = fetchSuggestions(debouceValue)
            if (results instanceof Promise) {
                console.log("进入promise分支")
                setLoading(true)
                results.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                })
            } else {
                setSuggestions(results)
            }
        } else {
            setSuggestions([])
        }
        setHighlightIndex(-1)
    }, [debouceValue])

    const highlight = (index: number) => {
        if (index < 0) index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1
        }
        setHighlightIndex(index)
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'Enter':
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex])
                }
                break
            case 'ArrowUp':
                highlight(highlightIndex - 1)
                break
            case 'ArrowDown':
                highlight(highlightIndex + 1)
                break
            case 'Escape':
                setSuggestions([])
                break
            default:
                break
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value);
        triggerSearch.current = true;
    }
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value) //点击下拉栏后加入input里
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }
        console.log(item)
        triggerSearch.current = false;
    }
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }
    const generateDropdown = () => {
        return (
            <ul className="viking-suggestion-list">
                {loading && <h2>……Loading……</h2>
                }
                {suggestions.map((item, index) => {
                    const cnames = classNames('suggestion-item', {
                        'is-active': index === highlightIndex
                    })
                    return (
                        <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                            {renderTemplate(item)}
                        </li>
                    )
                })}
            </ul>
        )
    }
    return (
        <div className="viking-auto-complete" ref={componentRef}>
            <Input
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
            {loading && <h2>……Loading……</h2>}
            {(suggestions.length > 0) && generateDropdown()}
        </div>
    )
}

export default AutoComplete;

//优化
//custom option
//keyboard support
//debouce
//click outside