
// transform chart data from data=[1, 2, 3] labels=[a, b, c] to [{x: 'a', y: 1}....]
// data can take from of [1, 2, 3], or {series1: [1, 2, 3]...}
// label is always an array of strings
export const transformChartData = (data:any, labels:any) => {
    if (Array.isArray(data)) {
        return data.map((v, i)=> ({x: labels ? labels[i].toString() : i, y: v}));
    }
    else {  // data takes form of an object
        let result = [];
        for(let i=0; i<labels.length; i++) {
            for (let k in data) {
                result.push({x: labels ? labels[i].toString() : i, y: data[k][i], c: k});
            }
        }
        return result;
    }
}