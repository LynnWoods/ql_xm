import CryptoJS from 'crypto-js'

const keyStr = 'wcjl_ecology_abc'
export default {
    encrypt(word) {
        var key = CryptoJS.enc.Utf8.parse(keyStr)
        var srcs = CryptoJS.enc.Utf8.parse(word)
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.ZeroPadding
        })

        return encrypted.toString()
    },
    decrypt(word) {
        var key = CryptoJS.enc.Utf8.parse(keyStr)
        var decrypt = CryptoJS.AES.decrypt(word, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.ZeroPadding
        })
        return CryptoJS.enc.Utf8.stringify(decrypt).toString()
    }
}
