const

  toObject = (arr, key) => (
    arr.reduce((res, a) => {
      res[a[key]] = a
      return res
    }, {})
  ),

  sortAlphabetically = (arr, prop) => {
    arr = Array.isArray(arr) ? arr : Object.values(arr)
    return arr.sort((a, b) => {
      const
        aText = prop === 'ArtistName'
          ? a[prop].split(' ')[a[prop].split(' ').length - 1]
          : a[prop],
        bText = prop === 'ArtistName'
          ? b[prop].split(' ')[b[prop].split(' ').length - 1]
          : b[prop]
      return aText.localeCompare(bText)
    })
  },

  sortByUpdate = (arr) => {
    arr = Array.isArray(arr) ? arr : Object.values(arr)
    return arr.sort((a, b) => (
      new Date(b.updated_at) - new Date(a.updated_at)
    ))
  },
  
  // sortBy = (arr, sort) => (
  //   sort == 'updated_at' ? sortByUpdate(arr) :
  //   sort == 'alphabetical' ? sortAlphabetically(arr) :
    
  // ),
  
  highlight = (source, queries) => {
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
  toObject,
  sortAlphabetically, 
  sortByUpdate, 
  // sortBy,
  highlight,
  processImages
}