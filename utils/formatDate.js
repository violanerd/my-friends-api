function dateFormat(dateVal) {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
    return dateVal.toLocaleDateString('en-us', options)
}

module.exports = dateFormat;