export default function IsNull(o) {
    if (o !== null && o !== undefined && o.length !== 0) {
        if (Object.prototype.toString.call(o) === '[object Array]') {
            if (Object.keys(o).length !== 0 && Object.getPrototypeOf(o) !== Object.prototype)
                return false
            else
                return true
        }
        return false
    }
    else
        return true
}

export function GetCurrentDate(separator = '') {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date < 10 ? `0${date}` : `${date}`}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`
}

export function SetTabSession() {

    const SetSessionStorage = () => {
        if (sessionStorage.getItem("tabID") === null
            || sessionStorage.getItem("tabID") === undefined) {
            sessionStorage.setItem("tabID", Math.floor(Math.random() * 100000000));
            window.tabId = sessionStorage.getItem("tabID");
        }
        else {
            window.tabId = sessionStorage.getItem("tabID");
        }
        return null;
    }
    addEventListener("load", SetSessionStorage());
    addEventListener("beforeunload", SetSessionStorage());
    addEventListener("unload", SetSessionStorage());
}