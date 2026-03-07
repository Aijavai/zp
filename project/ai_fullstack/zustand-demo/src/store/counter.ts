import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 状态存储的规矩和修改的方式， 专业管理状态
// 企业做大做强， 请管理财务 状态以及修改状态的规矩
// 重要的数据状态
interface CounterState {
    count: number;
    // 状态修改的方法
    increment: () => void;
    decrement: () => void;
    reset: () => void;
}
export const useCountStore = create<CounterState>()
(persist((set, get) => ({
    // 列出状态
    // 状态怎么修改？
    count: 0,
    increment: () => set((state: any) => ({count: state.count + 1})),
    decrement: () => set((state: any) => ({count: state.count - 1})),
    reset: () => set({ count: 0})
}),
{
    name: 'counter',
    partialize: (state) => ({ count: state.count }),
}
));

