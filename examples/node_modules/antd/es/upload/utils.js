import _extends from 'babel-runtime/helpers/extends';
export function T() {
    return true;
}
// Fix IE file.status problem
// via coping a new Object
export function fileToObject(file) {
    return _extends({}, file, { lastModified: file.lastModified, lastModifiedDate: file.lastModifiedDate, name: file.name, size: file.size, type: file.type, uid: file.uid, percent: 0, originFileObj: file });
}
/**
 * 生成Progress percent: 0.1 -> 0.98
 *   - for ie
 */
export function genPercentAdd() {
    var k = 0.1;
    var i = 0.01;
    var end = 0.98;
    return function (s) {
        var start = s;
        if (start >= end) {
            return start;
        }
        start += k;
        k = k - i;
        if (k < 0.001) {
            k = 0.001;
        }
        return start;
    };
}
export function getFileItem(file, fileList) {
    var matchKey = file.uid !== undefined ? 'uid' : 'name';
    return fileList.filter(function (item) {
        return item[matchKey] === file[matchKey];
    })[0];
}
export function removeFileItem(file, fileList) {
    var matchKey = file.uid !== undefined ? 'uid' : 'name';
    var removed = fileList.filter(function (item) {
        return item[matchKey] !== file[matchKey];
    });
    if (removed.length === fileList.length) {
        return null;
    }
    return removed;
}