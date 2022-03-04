import OSS from "ali-oss";

export function getClient() {
    const client = new OSS({
        accessKeyId: 'LTAI5tLz4wt7CKc2WiDDLGMZ',
        accessKeySecret: 'kpTVa5emqIfu2fnhdmtqnXqzvJgpL3',
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
