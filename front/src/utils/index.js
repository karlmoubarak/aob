const


  // to clea up object repsonses from the API

  objectKeysToLowercase = a => {
    for (let key in a) {
      if (key[0] === key[0].toUpperCase()) {
        a[key[0].toLowerCase() + key.slice(1)] = a[key]
        delete a[key]
      }
    }
    return a
  },
  
  
  // Alphebtical sorting of arrays based on an object
  // key and order passed in as a function parameter

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


  // Reverse-chronological ordering of arrays based
  // on the object 'updated_at' key (from Strapi) 

  sortByUpdate = (arr) => {
    arr = Array.isArray(arr) ? arr : Object.values(arr)
    return arr.sort((a, b) => (
      new Date(b.updated_at) - new Date(a.updated_at)
    ))
  },
  
  
  // Removes new lines from texts and adds a 'highlight' 
  // class in case queries are passed in and matched

  highlight = (source, queries) => {
    source = source.replace(/\n/g, ' ')
    if (queries && queries.length > 0) {
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

  // Replaces relative image paths with absolute URLs
  // to Strapi

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