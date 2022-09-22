let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
function dateFormat(dateVal) {
    return dateVal.toLocaleDateString('en-us', options)
}

module.exports = dateFormat;