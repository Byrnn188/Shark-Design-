import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from "react";
import { Input } from './input';

const ControlledInput = () => {
  const [value, setValue] = useState('');
  return <Input value={value} defaultValue={value} onChange={(e) => {setValue(e.target.value)}} />
}


const meta = {
  title: 'Input',
  id: 'Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
  // 你可以根据需要在此添加 argTypes，参考 Button 的写法
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

// ADefault -> Default
export const ADefault: Story = {
  args: {
    placeholder: '漂亮的 Input'
  },
  name: '默认的 Input'
};

// BDisabled -> Disabled
export const BDisabled: Story = {
  args: {
    placeholder: 'disabled input',
    disabled: true
  },
  name: '被禁用的 Input'
};

// CIcon -> Icon
// export const CIcon: Story = {
//   args: {
//     placeholder: 'input with icon',
//     // icon: 'search'
//   },
//   name: '带图标的 Input'
// };

// DSizeInput
export const DSizeInput: Story = {
  render: () => (
    <>
      <Input
        defaultValue="large size"
        size="lg"
      />
      <Input
        placeholder="small size"
        size="sm"
      />
      <ControlledInput/>
    </>
  ),
  name: '大小不同的 Input'
};

// EPandInput
export const EPandInput: Story = {
  render: () => (
    <>
      <Input
        defaultValue="prepend text"
        prepend="https://"
      />
      <Input
        defaultValue="google"
        append=".com"
      />
    </>
  ),
  name: '带前后缀的 Input'
};