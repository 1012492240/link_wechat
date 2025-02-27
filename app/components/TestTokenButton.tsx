"use client";
import { useState } from 'react';

export const TestTokenButton = () => {
    const [tokenInfo, setTokenInfo] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [scheme, setScheme] = useState('');

    const fetchToken = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/wechat-token');
            const data = await response.json();

            if (data.error) {
                setTokenInfo(`错误: ${data.error}`);
            } else {
                setTokenInfo(`Token: ${data.access_token?.slice(0, 15)}... 过期时间: ${data.expires_in}秒`);
            }
        } catch (error) {
            setTokenInfo('请求失败，请检查控制台');
            console.error('API请求错误:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateScheme = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/generate-scheme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    path: 'pages/index/index',
                    query: 'from=web'
                })
            });
            const data = await response.json();

            if (data.error) {
                setTokenInfo(`生成Scheme失败: ${data.error}`);
            } else {
                setScheme(data.scheme);
                setTokenInfo('Scheme生成成功');
            }
        } catch (error) {
            setTokenInfo('生成Scheme失败，请检查控制台');
            console.error('生成Scheme错误:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 text-center">
            <div className="flex justify-center gap-4">
                <button
                    onClick={fetchToken}
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                    {loading ? '获取中...' : '测试Token'}
                </button>
                <button
                    onClick={generateScheme}
                    disabled={loading}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                    {loading ? '生成中...' : '生成Scheme'}
                </button>
            </div>

            {tokenInfo && (
                <p className="mt-4 text-sm text-gray-600">{tokenInfo}</p>
            )}

            {scheme && (
                <div className="mt-4">
                    <p className="text-sm mb-2">Scheme链接：</p>
                    <input
                        type="text"
                        value={scheme}
                        readOnly
                        className="w-full max-w-md px-3 py-2 text-sm border rounded"
                        onClick={(e) => e.currentTarget.select()}
                    />
                </div>
            )}
        </div>
    );
}; 