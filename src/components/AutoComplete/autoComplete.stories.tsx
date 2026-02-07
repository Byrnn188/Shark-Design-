import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from "react";
import { AutoComplete, type DataSourceType } from './autoComplete';
import { fn } from 'storybook/test';
import { action } from 'storybook/actions'

interface LakerPlayerProps {
    value: string;
    number: number;
}

const meta = {
    title: 'AutoComplete',
    id: 'Input',
    component: AutoComplete,
    tags: ['autodocs'],
    argTypes: {

    }
} satisfies Meta<typeof AutoComplete>;
export default meta;
type Story = StoryObj<typeof meta>;


export const SimpleComplete: Story = {
    render: () => {
        const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];
        const lakersWithNumber = [
            { value: 'bradley', number: 11 },
            { value: 'pope', number: 1 },
            { value: 'caruso', number: 4 },
            { value: 'cook', number: 2 },
            { value: 'cousins', number: 15 },
            { value: 'james', number: 23 },
            { value: 'AD', number: 3 },
            { value: 'green', number: 14 },
            { value: 'howard', number: 39 },
            { value: 'kuzma', number: 0 },
        ]
        //针对lakers
        // const handleFetch = (query: string) => {
        //     return lakers.filter(name => name.includes(query)).map(name => ({value: name}));
        // };
        const handleFetch = (query: string) => {
            return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(({items}) => {
                console.log(items)
                return items.slice(0, 10).map(item => ({value: item.login, ...item}))
            })
        }
        //针对lakersWithNumber对象
        // const handleFetch = (query: string) => {
        //     return lakersWithNumber.filter(player => player.value.includes(query))
        // }
        // const renderOption = (item: DataSourceType<LakerPlayerProps>) => {
        //     return (
        //         <>
        //         <h2>Name: {item.value}</h2>
        //         <p>Number: {item.number}</p>
        //         </>
                
        //     )
        // }
        return (
            <>
                <AutoComplete
                    placeholder='输入湖人队球员英文名试试'
                    fetchSuggestions={handleFetch}
                    onSelect={action('selected')}
                    // renderOption={renderOption}
                />
            </>
        )
    },
    name: '基本的搜索',
};

// export const SimpleComplete1: Story = () => {
//         const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];
//         const handleFetch = (query: string) => {
//             return lakers.filter(name => name.includes(query));
//         };
//         return (
//             <>
//                 <AutoComplete fetchSuggestions={handleFetch} />
//             </>
//         )
// };
// SimpleComplete1.storyName = '基本的搜索1'

// export const SimpleComplete2= () => {
//         const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];
//         const handleFetch = (query: string) => {
//             return lakers.filter(name => name.includes(query));
//         };
//         return (
//             <>
//                 <AutoComplete
//                     fetchSuggestions={handleFetch}
//                     onSelect={action('selected')}
//                 />
//             </>
//         )
// };
// SimpleComplete2.storyName = '基本搜索2'



