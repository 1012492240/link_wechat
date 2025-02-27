import { NextResponse } from 'next/server';

// 顶部添加缓存变量
let cachedToken = {
    value: '',
    expiresAt: 0
};

export async function GET() {
    // 如果缓存有效，直接返回
    if (cachedToken.expiresAt > Date.now()) {
        return NextResponse.json({
            access_token: cachedToken.value,
            expires_in: Math.floor((cachedToken.expiresAt - Date.now()) / 1000)
        });
    }

    try {
        // 从环境变量读取凭证
        const appId = process.env.WECHAT_APP_ID;
        const appSecret = process.env.WECHAT_APP_SECRET;

        if (!appId || !appSecret) {
            return NextResponse.json(
                { error: '微信配置信息缺失' },
                { status: 500 }
            );
        }

        // 构造请求参数
        const params = new URLSearchParams({
            grant_type: 'client_credential',
            appid: appId,
            secret: appSecret
        });

        // 调用微信API
        const response = await fetch(`https://api.weixin.qq.com/cgi-bin/token?${params}`);
        const data = await response.json();

        // 处理微信返回错误
        if (data.errcode) {
            return NextResponse.json(
                { error: data.errmsg, code: data.errcode },
                { status: 400 }
            );
        }

        // 获取成功后更新缓存
        cachedToken = {
            value: data.access_token,
            expiresIn: Date.now() + (data.expires_in - 300) * 1000 // 提前5分钟过期
        };

        // 返回有效数据
        return NextResponse.json({
            access_token: data.access_token,
            expires_in: data.expires_in
        });

    } catch (error) {
        console.error('获取微信Token失败:', error);
        return NextResponse.json(
            { error: '服务器内部错误' },
            { status: 500 }
        );
    }
} 