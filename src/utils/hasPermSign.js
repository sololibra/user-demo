/**判断是否具有按钮权限 
 * @param {String} prem-权限字符串
*/
import Store from "@/store";
import Cookie from "js-cookie";
export default function (prem) {
    const permSign = Store.state.permSign.permSign
    let userName = Cookie.get('user');
    console.log('userName:::',userName)
    if (userName!='admin' && permSign.indexOf(prem) == -1) {
        return true
    }
    return false

}