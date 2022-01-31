// biza elementlarni chaqirib olishimiz uchun function ichiga berb ketvomiz va 
// return qb qaytarvoti

function findElement(selector, element = document) {
  return element.querySelector(selector)
}

// biza 6 xil functionni bitta object yegvolib wu objectni sortlab render qvomiz
const obj = {
  az: (a, b) => {
    if (a.title > b.title) {
      return 1
    }

    if (b.title > a.title) {
      return -1
     }

     return 0
  },

  za: (a, b) => {
    if (a.title > b.title) {
      return -1
    }

    if (b.title > a.title) {
      return 1
    }

    return 0
  },

  'new-old': (a, b) => {
    return b.year - a.year
  },
  'old-new': (a, b) => {
    return a.year - b.year
  },

  'high-low': (a, b) => {
    return b.imdbRating - a.imdbRating
  },
  'low-high': (a, b) => {
    return a.imdbRating - b.imdbRating
  }
}