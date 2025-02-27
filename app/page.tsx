'use client'
import Image from "next/image";

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

      {/* 跳转按钮 */}
      <a
        href="weixin://"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = 'weixin://';
        }}
      >
        点击前往微信
      </a>
    </div>
  );
}
