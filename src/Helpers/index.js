export const o_O = (promise) => {
    return promise.then(data => {
        if(data instanceof Error) return [data]
        return [null, data]
    }).catch(err => [err])
}

export const urlString = (str) => {
    return str.toLowerCase().replace(new RegExp(' ', 'g'), '+');
}

export const isEmpty = (obj) => {
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj,key))
            return false;
    }
    return true;
}

export const goBack = () => window.history.go(-1);
export const isUrl = (url) => window.route().current(url);
export const goForward = () => window.history.go(1);

export const formatDate = (template, date) => {
    var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
    date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4);
    return date.toISOString().split(/[-:.TZ]/).reduce(function(template, item, i) {
      return template.split(specs[i]).join(item);
    }, template);
}

export const showDate = (date) => {
    var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
    date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4);
    // date = date.
    specs = date
    console.log(specs)

}
