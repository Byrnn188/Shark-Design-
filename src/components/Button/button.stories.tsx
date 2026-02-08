import type { Meta, StoryObj } from '@storybook/react-vite';
import React from "react";
import { fn } from 'storybook/test';
import Button from "./button";
import mdx from './button.mdx'

const meta = {
    title: 'Button',
    component: Button,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
        // docs: {
        //     page: mdx
        // }
    },
    tags: ['autodocs'],
    // decorators: [
    //     (Story) => (
    //         <div style={{ margin: '3em' }}>
    //             {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
    //             <Story />
    //         </div>
    //     ),
    // ],
    argTypes: {
        btnType: {
            options: ['primary', 'default', 'danger', 'link'],
            control: { type: 'radio' },
            description: '按钮类型',
            table: {
                type: { summary: 'string' }, // ← 手动指定类型
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: '是否禁止使用',
            table: {
                type: { summary: 'boolean' }, // ← 手动指定类型
            },
        },
        size: {
            options: ['lg', 'sm'],
            control: { type: 'radio' },
            description: '按钮尺寸',
            table: {
                type: { summary: 'string' }, // ← 手动指定类型
            },
        },
        href: {
            control: { type: 'text' }, // ← 文本输入框
            description: '链接地址（仅当 btnType="link" 时生效）',
            table: {
                type: { summary: 'string' }, // ← 手动指定类型
            },
        },
        className: {
            control: { type: 'text' }, // ← 文本输入框
            description: '样式类',
            table: {
                type: { summary: 'string' }, // ← 手动指定类型
            },
        },
        onClick: {
            description: 'Optional click handler () => void '
        }
    },
    args: { onClick: fn() },

} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: (args) => (
        <>
            <Button {...args}>Default Button</Button>
        </>

    ),

    name: '默认按钮样式',
    
}

export const ButtonWithSize: Story = {
    render: (args) => (
        <>
            <Button size="lg" {...args}>large button</Button>
            <Button size="sm" {...args}>small button</Button>
        </>
    ),
    name: '不同尺寸的按钮',
}

export const ButtonWithType: Story = {
    render: () => (
        <>
            <Button btnType="primary"> primary button </Button>
            <Button btnType="danger"> danger button </Button>
            <Button btnType="link" href="https://www.baidu.com"> link button </Button>
        </>
    ),
    name: '不同类型的按钮'
}
