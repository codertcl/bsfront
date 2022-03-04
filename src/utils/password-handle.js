import crypto from 'crypto'
export const md5password = (password) => {
    const md5 = crypto.createHash('md5');
    const result = md5.update(password).digest('hex')//转换为16进制
    return result
}
