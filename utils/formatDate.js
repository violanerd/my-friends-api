function dateFormat(dateVal) {
    let newDate = new Date(dateVal);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
    return newDate.toLocaleDateString('en-us', options)
}

// let date = 'Sat Sep 24 2022 15:41:15 GMT-0500 (Central Daylight Time)'
// const newDate = new Date(date);
// console.log(dateFormat(newDate))

module.exports = dateFormat;