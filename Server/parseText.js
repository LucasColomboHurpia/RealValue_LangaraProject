//parses/clean up texts

const maxNumberOfChars = 25

module.exports = {
    parseTextREW: function (text) {
        let n = maxNumberOfChars;

        let textForQuery = text + ' vancouver'
        const outputString = textForQuery.replace(/\s/g, "+").substring(0, n);//removes spaces for + signs and limitis string to n
    
        let query = `https://www.rew.ca/properties/search/results?initial_search_method=single_field&query=${outputString}`

        return query;

    },
    parseTextPoint2Homes: function (text) {
        let n = maxNumberOfChars;

        let textForQuery = text + ' vancouver'
        const outputString = textForQuery.replace(/\s/g, "+").substring(0, n);//removes spaces for + signs and limitis string to n

        let query = `https://www.point2homes.com/CA/Real-Estate-Listings/BC.html?location=${outputString}&search_mode=location&page=1&SelectedView=listings&location_changed=true&ajax=1`

        return query;

    },

    parseRemax: function (text) {
        let n = maxNumberOfChars;

        let textForQuery = text + ' vancouver'
        const outputString = textForQuery.replace(/\s/g, "+").substring(0, n);//removes spaces for + signs and limitis string to n

        let query = `https://www.remax.ca/find-real-estate?address=${outputString}%2C+Vancouver%2C+BC%2C+Canada&pageNumber=1`

        return query;

    },
};
