let bookmarkWrapper = findElement('.bookmark-wrapper', document)
let bookmarkBtn = findElement('.bookmark_btn')
// let allBookmark = []

// let createBookmarkItem = (movie) => {
//     let templateClone = bookmarkTemplate.cloneNode(true)

//     let bookmarkItem = findElement('.bookmarked-movie', templateClone)
//     let bookmarkTitle = findElement('.bookmarked-title', templateClone)
//     let bookmarkDeleteBtn = findElement('.js-bookmarked-btn', templateClone)


//     bookmarkWrapper.append(templateClone)
// }

// createBookmarkItem()


let handleBookmarkBtn = () => {
    bookmarkWrapper.classList.toggle('bookmark-list')
}

bookmarkBtn.addEventListener ('click', handleBookmarkBtn)

// moviesList.addEventListener('click', handleClickList)

let localData = JSON.parse(localStorage.getItem('movies'))
var bookmarks = localData || []


let i = localData?.at(-1).id || 0

let elList = findElement('.bookmark-wrapper')
let bookmarkTemplate = findElement('.bookmark-template', document).content

function handleClickItem(evt) {
   if (evt.target.matches('.js-bookmarked-btn')) {
    deleteMovie(evt.currentTarget.dataset.id)
   }
    
}

function createItem(element) {
    let cloneTemplate = bookmarkTemplate.cloneNode(true)

    let elItem = findElement('.bookmark-item', cloneTemplate)
    let bookmarkedTitle = findElement('.bookmarked-title', cloneTemplate)
    let bookmarkedDeleteBtn = findElement('.js-delete-btn', cloneTemplate)
    
    bookmarkedTitle.textContent = element.title 
    elItem.dataset.id = element.id

    elItem.addEventListener('click', handleClickItem)
    // bookmarkedDeleteBtn.addEventListener ('click', deleteMovie)

    elList.append(cloneTemplate)
}

function deleteMovie (id) {
    let deletedMovies = bookmarks.filter((movie) => movie.id !== Number(id))
        console.log(deletedMovies);

        bookmarks = deletedMovies
        localStorage.setItem('movies', JSON.stringify(bookmarks))

        elList.innerHTML = null
        deletedMovies.forEach(element => {
          createItem(element);
        })
}

function handleLikeBtn(evt) {
  
    if (evt.target.matches('.js-save-btn')) {
      
      let foundMovie = MOVIES.find(
        (movie) => movie.imdbId === evt.target.dataset.id
      );
  
  
        let newTodo = {
          id: ++i,
          title: foundMovie.title,
        }
  
        bookmarks.push(newTodo)

        elList.innerHTML = null
  
        bookmarks.forEach(element => {
          createItem(element);
        })
    }

    localStorage.setItem('movies', JSON.stringify(bookmarks))
  }

  bookmarks.forEach(title => {
    createItem(title);
  })