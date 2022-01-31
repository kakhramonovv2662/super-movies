// bizaga kevotgan movies.jsdan 100ta kinoni tanlab ovomiz (ixtiyoriy)
const MOVIES = movies.splice(0, 50)

// bu bizada necinci pagedan bowlab qowiliw yoki ayriliwini belgilab ketvomiz
let page = 1
// bu bizada bitta pagecda necta kino ciqib turiwini tamilavoti
let limit = 8

// elementlarni tanlab ovomiz
let formSearch = findElement('.search-form')
let elSelect = findElement('.js-select')
const searchInput = findElement('.js-input', formSearch)
const selectSort = findElement('.js-sort', formSearch)
let moviesList = findElement('.js-list')
const nextBtn = findElement('.next-btn')
const prevBtn = findElement('.prev-btn')
const movieTemplate =  findElement('.movie-card').content

// bu function bizada render qiliw ucun kerak bovoti
function createMovieCard(movie) {
  //tamplatedan clone ovomiz
  let movieTemplateClone = movieTemplate.cloneNode(true)

  // MOVIES ning icidan elementlarni tanlab brauzerga yonaltirvomiz
  let movieImg = findElement('.js-img', movieTemplateClone)
  let movieTitle = findElement('.js-title', movieTemplateClone)
  let movieCategories = findElement('.js-text', movieTemplateClone)
  let movieDates = findElement('.movie-date', movieTemplateClone)
  let movieRayting = findElement('.movie-rayting', movieTemplateClone)
  let moreBtn = findElement ('.js-more', movieTemplateClone)
  let saveBtn = findElement ('.js-save-btn', movieTemplateClone)

  // Buyoda tanlavogan elementlarimizni src yoki textcontentini brauzerda ciqiwi ucun iwlatvomiz
  movieImg.src = movie.smallPoster
  movieTitle.textContent = movie.title
  movieCategories.textContent = movie.categories.join(', ')
  movieDates.textContent = movie.year + 'y'
  movieRayting.textContent = '★' + movie.imdbRating
  moreBtn.dataset.id = movie.imdbId
  saveBtn.dataset.id = movie.imdbId

  // hamma iw sodir bogandan keyin itemlarni ulga qowib qoyvomiz
  moviesList.appendChild(movieTemplateClone)
}

// kevotgan categoriyalarni bitta arrayga yegvomiz
let categoriesArray = []

// bu functioni vazifasi option qowiw va categoryalarni render qiliw
function uniqueCategories(category) {
  // jsda option yasavomiz
  let elOption = document.createElement('option')

  // ifni sharti biz yegvogan arrayni icidan bir xil bomaganlarini topib ozimizga qaytarvoti
  if (!categoriesArray.includes(category)) {
    // songra bow arrayga push qivomiz
    categoriesArray.push(category)

    // textcontenti ciqib turiwi ucun brauzerda categoryga tenglavomiz
    elOption.textContent = category

    // hamma iw bogandan song selectga qowb qoyvomiz
    elSelect.append(elOption)
  }
}

// bu function haligi limitni yani bitta pageda necta item ciqiwini taminlab bervoti
function renderMovies(movies) {
  movies.slice(0, limit).forEach((movie) => {
    createMovieCard(movie)

    movie.categories.forEach((category) => {
      uniqueCategories(category)
    })
  })
}

renderMovies(MOVIES)

// bu functioni vazifasi formga quloq soluvci va berilgan wart boyica iwlovci function
function handleSubmit(evt) {
  // brauzerda abnavleniya bob ketmasligi ucun
  evt.preventDefault()

  // codeni kamaytriw maqsadida bitta ozgaruvciga tenglab qoyvomiz
  const categoryName = elSelect.value

  // bundayam wu holat takrorlanvoti yani bitta ozgaruvciga tenglab qoyvomiz
  let searchText = searchInput.value

  // bunda inputni iciga kelgan malumotni qidir beriw ucun xizmat qivoti
  const patern = new RegExp(searchText, 'gi')

  // ekrani tozalab bervoti
  moviesList.innerHTML = null

  // bow arrayga render qvomiz
  let filtredMovies = []

  // bu ifni vazifasi categoriyalarni icida allga teng bolmasa, filtredMovies icidan filterlab ber,  categoryaga qarab,
  // aks xolda allga teng bolsa biz tenglab qoygan ozgaruvci icida barcasini ober
  if (categoryName !== 'all') {
    filtredMovies = MOVIES.filter((movie) => movie.categories.includes(categoryName))
  } else {
    filtredMovies = MOVIES
  }

  // buyoda biz bergan wartga kora tekwir bervoti, 
  // yani inputdan kelgan malumot bizda berilgan itemlarni titleda bormi yokmi db va sortlab render qvomiz
  filtredMovies = filtredMovies.filter((movie) => movie.title.match(patern)).sort(obj[selectSort.value])

  filtredMovies.forEach((movie) => {
    createMovieCard(movie)
  })
}

// quloq vazifasini bajarvoti
formSearch.addEventListener('submit', handleSubmit)

// bu function vazifasi birinci pagedan bowlab hisobla, yani next btnda bosilganida iwlawi ucun xizmat qvoti
function pagination() {
  // bu bizada asosan necta page boliwi ucun xizmat qvoti
  MOVIES.slice((page-1) * limit, page * limit).forEach((movie) => {
    createMovieCard(movie)
  })
}

// bu functioni vazifasi bolsa birinci pageda turganda prev btn bosilmasin, aksxolda iwlawi davom etsn
function disabletPrevBtn() {
  if (page === 1) {
    prevBtn.disabled = true
  } else {
    prevBtn.disabled = false
  }
}

// bu aksinca naxt btn oxirgi pagega kelganda yani page qolmasa iwlawdan toxtasin va bosilmasn
function disabletNextBtn() {
  let lastPage = Math.ceil(MOVIES.length / limit)

  if (page === lastPage) {
    nextBtn.disabled = true
  } else {
    nextBtn.disabled = false
  }
}

// bu function nextbtn bosilganda ekrani tozalavoti va har safar pagega 1 tadan qowb ketvoti 
function handleNextBtn() {
  moviesList.innerHTML = null
  page = page + 1

  // pagination functioni ham wu wartga qarab iwlaydi 
  pagination()
  // prevBtn functioni tenglab qoygandan sabab orqaga bosilganida next btn bosiliwi yoki 
  // bosilmasligiga qarab xarakat qladi
  disabletPrevBtn()
  // nextBtn functioni tenglab qoygandan sabab orqaga bosilganida prev btn bosiliwi yoki 
  // bosilmasligiga qarab xarakat qladi
  disabletNextBtn()
}

// bu esa huddi tepadagi holatni teskarisi yani prevBtn bosilganda ekrani tozalavoti
// va har safar bosilganda bitta page ayirib ketvoti
function handlePrevBtn() {
  moviesList.innerHTML = null

  page = page - 1

  pagination()
  disabletPrevBtn()
}

disabletPrevBtn()

// btnlar bosiliwiga quloq solinvoti
nextBtn.addEventListener('click', handleNextBtn)
prevBtn.addEventListener('click', handlePrevBtn)

function handleClickList(evt) {
  let modalTitle = findElement('.modal-title')
  let modalImg = findElement('.modal-images')
  let modalLink = findElement('.modal-link')
  let modalText = findElement('.modal-text')
  let bookTitle = findElement('.script-title')


  if (evt.target.matches('.js-more')) {
    let foundMovie = MOVIES.find(
      (movie) => movie.imdbId === evt.target.dataset.id
    );

    modalTitle.textContent = foundMovie.title;
    modalImg.src = foundMovie.smallPoster;
    modalLink.href = foundMovie.trailer;
    modalText.textContent = foundMovie.summary;
  }

  handleLikeBtn(evt)
}

moviesList.addEventListener('click', handleClickList)


// if (evt.target.matches('.js-save-btn')) {
  //   let bookMovie = MOVIES.find(
  //     (movie) => movie.imdbId === evt.target.dataset.id
  //   );


  //   !bokmarks.includes(bookMovie.title) ? bokmarks.push(bookMovie.title) : bokmarks.splice((bookMovie.title.indexOf()),1)
  //   console.log(bokmarks)
  //   bookmarkWrapper.textContent = bokmarks

  // }