import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        // 从请求中获取参数


        // 先获取access_token
        let access_token = '89_kyLVsg2FvGYc7mTuCUqOBR1qP9BYQZ10QHhaKishu8a_lHyfylTQFRZTzVAaYId3zgwcB8wuGUU6PkhycwnCYkSOCXeQk_gFKMpMhEhVVFhyr0ro48B3mkXBgAMRTAaAIAHJQ'

        // 构造微信请求
        const wxResponse = await fetch(`https://api.weixin.qq.com/wxa/generatescheme?access_token=${access_token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

        });

        const data = await wxResponse.json();

        if (data.errcode) {
            return NextResponse.json(
                { error: data.errmsg, code: data.errcode },
                { status: 400 }
            );
        }

        return NextResponse.json({
            scheme: data.openlink
        });

    } catch (error) {
        console.error('生成Scheme失败:', error);
        return NextResponse.json(
            { error: '服务器内部错误' },
            { status: 500 }
        );
    }
} 