module.exports.ext = function (fileName) {return fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();}




module.exports.formatDate = function (date,format)  {
    if (format.length < 2) return "Invalid Format.";
    const localDate = new Date(date);
    const year = localDate.getFullYear().toString(),
        month = localDate.getMonth().toString(),
        day = localDate.getDate().toString(),
        mhour = localDate.getHours().toString(),
        hour = (localDate.getHours() > 12? localDate.getHours()%12:localDate.getHours()).toString(),
        minutes = localDate.getMinutes().toString(),
        seconds = localDate.getSeconds().toString(),
        milSeconds = localDate.getMilliseconds().toString(),
        time =  (localDate.getMinutes() > 12? "PM" : "AM");
    let dateSeg = new Map();
    dateSeg.set('y',year);
    dateSeg.set('M',month);
    dateSeg.set('d',day);
    dateSeg.set('H',mhour);
    dateSeg.set('h',hour);
    dateSeg.set('m',minutes);
    dateSeg.set('s',seconds);
    dateSeg.set('t',time);

    const padding = (seq,date) => {
        const diff = seq - date.length;
        if (diff > 0) {
            date = ("0"*diff)+date;
        }
        else if (diff < 0 && date.length > 3) {
            date = date.substring(Math.abs(diff));
        }
        return date;
    }

    let sequence = 0; 
    let out = "";
    for (var index = 0; index < format.length; index ++) {
        const curr =  dateSeg.get(format.charAt(index));
        const pre =  dateSeg.get(format.charAt(index-1));
        if (curr){
            if (pre && curr != pre) {
                out += padding(sequence,dateSeg.get(format.charAt(index-1)));
                sequence = 1;
            } else {
                sequence++;
            }
            
        }
        else if (sequence > 0 && !curr) {
            out += padding(sequence,dateSeg.get(format.charAt(index-1)));
            out += format.charAt(index);
            sequence = 0;
        }
        else {
            out += format.charAt(index);
        }
        if( index == format.length - 1 && sequence > 0) {
        
            out += padding(sequence,curr);
        }
        
    }
    return out;
}
