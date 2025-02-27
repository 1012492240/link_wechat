"use client";

export const WeChatButton = () => {
    return (
        <a
            href="weixin://"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
            onClick={(e) => {
                e.preventDefault();
                window.location.href = 'weixin://dl/business/?t=EEI17FhHPgk';
            }}
        >
            点击前往微信
        </a>
    );
}; 