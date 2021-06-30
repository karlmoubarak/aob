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
  
  highlight = (source, query) => (
    query ? 
    source.replace(
      new RegExp(query, "gi"), 
      match => ('<span class="highlight">' + match + '</span>')
    ) : source
  )

export { toObject, sortAlphabetically, sortByUpdate, highlight }