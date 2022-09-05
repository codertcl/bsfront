import OSS from "ali-oss";

export function getClient() {
    const client = new OSS({
        // 阿里云OSS申请
        accessKeyId: 'xxxx',
        accessKeySecret: 'xxxxx',
        bucket: 'serverresource',// 填写Bucket名称。
        region: 'oss-cn-hangzhou',
    });
    return client
}

/**
 * 生成随机文件名称
 * 规则八位随机字符，加下划线连接时间戳
 */
export const getFileNameUUID = () => {
    function rx() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return `${+new Date()}_${rx()}${rx()}`
}
