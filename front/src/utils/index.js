const

  objectKeysToLowercase = a => {
    for (let key in a) {
      if (key[0] === key[0].toUpperCase()) {
        a[key[0].toLowerCase() + key.slice(1)] = a[key]
        delete a[key]
      }
    }
    return a
  },

  sortAlphabetically = (arr, prop, order) => {
    prop = prop === 'organisation' ? 'slug' : prop
    return arr.sort((a, b) => {
      const
        aText = 
          typeof a[prop] === 'string' ?
          a[prop] :
          a[prop] && a[prop][0] && a[prop][0]['slug'] || '',
        bText = 
          typeof b[prop] === 'string' ?
          b[prop] :
          b[prop] && b[prop][0] && b[prop][0]['slug'] || ''
      return (
        aText && bText && order > 0 ?
        aText.localeCompare(bText) :
        bText.localeCompare(aText)
      )
    })
  },

  sortByUpdate = (arr) => {
    arr = Array.isArray(arr) ? arr : Object.values(arr)
    return arr.sort((a, b) => (
      new Date(b.updated_at) - new Date(a.updated_at)
    ))
  },

  highlight = (source, queries) => {
    source = source.replace(/\n/g, ' ')
    if (queries.length > 0) {
      for (let query of queries) {
        if (query && source) {
          source = source.replace(
            new RegExp(query, "gi"),
            match => ('<span class="highlight">' + match + '</span>')
          )
        }
      }
    }
    return source
  },

  apiURL = process.env.VUE_APP_API,

  processImages = text => {
    if (text) {
      text = text.replace(/\]\(\/uploads\//g, `](${apiURL}/uploads/`)
    }
    return text
  }

export {
  objectKeysToLowercase,
  sortAlphabetically,
  sortByUpdate,
  highlight,
  processImages
}