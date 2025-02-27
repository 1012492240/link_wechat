import type { Metadata } from 'next';
import { WeChatButton } from './components/WeChatButton'; // 确保按钮组件是客户端组件


export const metadata: Metadata = {
  title: '微信跳转页面 - 快速打开微信客户端',
  description: '正在为您跳转至微信客户端，若未自动跳转请点击页面中的跳转按钮手动前往微信',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* 微信Logo */}
      <div className="mb-8">
        <img
          src="https://img.icons8.com/color/96/weixing.png"
          alt="WeChat Logo"
          className="w-24 h-24"
        />
      </div>

      {/* 提示文字 */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">正在跳转微信...</h1>
        <p className="text-gray-600">如果未自动打开微信请点击下方按钮</p>
      </div>

      {/* 使用客户端组件处理点击事件 */}
      <WeChatButton />

    </div>
  );
}
