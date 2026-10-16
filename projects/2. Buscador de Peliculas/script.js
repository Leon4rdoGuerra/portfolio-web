class MovieExploarer {
    constructor() {
        this.API_KEY = "c5746b6711191be693fe4876ad7e8b6c";
        this.BASE_URL = "https://api.themoviedb.org/3";
        this.IMG_BASE_URL = "https://image.tmdb.org/t/p/w342";
        this.FALLBACK_IMG = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDI4MCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjE0MCIgeT0iMTUwIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==";
        this.genres = {};
        this.isSearching = false;
        this.currentFilters = {
            genre: "",
            year: "",
            sort: ""
        }

        this.init()
    }

    async init() {
        await this.loadTrendingMovies();
        this.setupEventListeners();
        this.setupYearFilter();
        await this.loadGenres();
        await this.loadRandomMovies();
    }

    setupEventListeners() {
        const searchInput = document.querySelector(".search-input")
        const genreFilter = document.querySelector(".genreFilter")
        const yearFilter = document.querySelector(".yearFilter")
        const sortFilter = document.querySelector(".sortFilter")
        const clearBtn = document.querySelector(".clear-btn")
        const trendingPrev = document.querySelector(".trendingPrev")
        const trendingNext = document.querySelector(".trendingNext")

        let searchTimeout;
        searchInput.addEventListener("input", (e) => {
            clearTimeout(searchTimeout)
            searchTimeout = setTimeout(() => {
                this.handleSearch(e.target.value)
            }, 500)
        })

        genreFilter.addEventListener("change", ()=> this.handleFilterChange());
        yearFilter.addEventListener("change", ()=> this.handleFilterChange());
        sortFilter.addEventListener("change", ()=> this.handleFilterChange());
        clearBtn.addEventListener("click", ()=> this.clearAllFilters());

        trendingPrev.addEventListener("click", () => this.scrollCarousel("prev"))
        trendingNext.addEventListener("click", () => this.scrollCarousel("next"))

    }
    
    async loadGenres() {
        try {
            const res = await fetch(`${this.BASE_URL}/genre/movie/list?api_key=${this.API_KEY}&language=es-ES`)
            const data = await res.json()
            
            this.genres = data.genres.reduce((acc, genre) => {
                acc[genre.id] = genre.name
                return acc
            },{})

            const genreSelect = document.querySelector(".genreFilter")
            data.genres.forEach(genre => {
                const option = document.createElement("option")
                option.value = genre.id
                option.textContent = genre.name
                genreSelect.appendChild(option)
            });
            
        } catch (error) {
            console.log(("Error cargando generos:", error))
        }
    }
    
    setupYearFilter() {
        const yearSelect = document.querySelector(".yearFilter")
        const currentYear = new Date().getFullYear()
        
        for(let year=currentYear; year>=1900; year--) {
            const option = document.createElement("option")
            option.value = year
            option.textContent = year 
            yearSelect.appendChild(option)
        }
    }
    
    async loadTrendingMovies() {
        try {
            const res = await fetch(`${this.BASE_URL}/trending/movie/week?api_key=${this.API_KEY}&language=es-ES`);
            const data = await res.json();
            
            const trendingMovies = data.results.slice(0, 10);
            this.displayTrendingMovies(trendingMovies)
        } catch (error) {
            console.log(("Error cargando peliculas en tendencia: ", error))
            document.querySelector(".trending-carousel").innerHTML = `<div class="error">Fallo al cargar peliculas en tendencia</div>`
        }
    }
    
    displayTrendingMovies(movies) {
        const carousel = document.querySelector(".trending-carousel")
        carousel.innerHTML = movies.map((movie, index) => 
            this.createTrendingCard(movie, index+1)
    ).join("");
}

createTrendingCard(movie, rank) {
    const posterPath = movie.poster_path ? `${this.IMG_BASE_URL}${movie.poster_path}` : this.FALLBACK_IMG;
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "TBA";
    const genres = movie.genre_ids && movie.genre_ids.length ? movie.genre_ids.slice(0, 2).map(id => this.genres[id]).filter(Boolean).join(", "): "N/A";
    
    return `
    <div class="trending-card">
    <img src="${posterPath}" alt="${movie.title}" class="movie-poster" loading="lazy" onerror="this.src='${this.FALLBACK_IMG}'">
    <div class="trending-rank">${rank}</div>
    <div class="trending-overlay">
    <div class="trending-title">${movie.title}</div>
    <div class="trending-details">
    <span class="trending-year">${year}</span>
    <span class="trending-rating">${rating}</span>
    </div>
    <div class="trending-genres">${genres}</div>
    </div>
    </div>
    
    `;
}

async loadRandomMovies() {
    try {
        const randomPage = Math.floor(Math.random() * 10) + 1;
        let url = `${this.BASE_URL}/discover/movie?api_key=${this.API_KEY}&page=${randomPage}&language=es-ES`
        
        if (this.currentFilters.sort) {
            url += `&sort_by=${this.currentFilters.sort}`
        }
        
        if (this.currentFilters.genre) {
            url += `&with_genres=${this.currentFilters.genre}`
        }
        
        if (this.currentFilters.year) {
            url += `&primary_release_year=${currentFilters.year}`;
        }
        
        const res = await fetch(url)
        const data = await res.json()
        
        this.displayMovies(data.results, ".movies-grid")
        
    } catch (error) {
        console.log(("Error cargando peliculas:", error))
        document.querySelector(".movies-grid").innerHTML = `<div class="error">Carga Fallida. Por favor intente de nuevo</div>`
    }
}

displayMovies(movies, containerClass) {
    const container = document.querySelector(containerClass)
    
    if (movies.length === 0) {
        container.innerHTML = `
        <div class="no-results">
        <h2>Ninguna pelicula encontrada</h2>
        <p>Intenta ajustando tus filtros</p>
        </div>
        `;
        return
    }
    
    container.innerHTML = movies.map(movie => 
        this.createMovieCard(movie)
    ).join("")
    
    const modalBtns = document.querySelectorAll(".modal-btn")
    modalBtns.forEach((btn, index) => 
        btn.addEventListener("click",() => { this.showModal(movies[index])})
    )
    }
    
    createMovieCard(movie) {
        const posterPath = movie.poster_path ? `${this.IMG_BASE_URL}${movie.poster_path}` : this.FALLBACK_IMG;
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
        const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "TBA";
        const genres = movie.genre_ids && movie.genre_ids.length? movie.genre_ids.slice(0, 2).map(id => this.genres[id]).filter(Boolean).join(", "): "N/A";
        
        return `
        <div class="movie-card">
        <img src="${posterPath}" alt="${movie.title}" class="movie-poster" loading="lazy" onerror="this.src='${this.FALLBACK_IMG}'">
        <div class="movie-info">
        <div class="movie-title">${movie.title}</div>
        <div class="movie-details">
        <span class="movie-year">${year}</span>
        <span class="movie-rating">${rating}</span>
        </div>
        </div>
        <div class="movie-genres">${genres}</div>
        <button class="modal-btn">Ver mas</button>
        </div>
        `
    }
    
    async handleSearch(query) {
        const trimmedQuery = query.trim()
        const clearBtn = document.querySelector(".clear-btn")
        const sectionTitle = document.querySelector(".randomSectionTitle")
        const trendingSection = document.querySelector(".trendingSection")
        
        if (trimmedQuery === "") {
            this.isSearching = false;
            clearBtn.classList.remove("show")
            sectionTitle.textContent = "Descubir Peliculas"
            trendingSection.style.display = "block"
            await this.loadRandomMovies()
            return;
        }
        
        this.isSearching = true 
        clearBtn.classList.add("show")
        sectionTitle.textContent = `Buscando resultados para "${trimmedQuery}"`
        trendingSection.style.display = "none"
        
        try {
            document.querySelector(".movies-grid").innerHTML = `<div class="loading">Buscando peliculas...</div>`
            let url = `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&query=${encodeURIComponent(trimmedQuery)}&language=es-ES&page=1`

            if (this.currentFilters.year) {
                url += `&primary_release_year=${this.currentFilters.year}`
            }
            
            const res = await fetch(url)
            const data = await res.json()

            let results = data.results

            if (this.currentFilters.genre) {
                results = results.filter(movie => 
                    movie.genre_ids.includes(parseInt(this.currentFilters.genre, 10))
                )
            }

            if (this.currentFilters.sort) {
                results = this.sortMovies(results, this.currentFilters.sort)
            }

            this.displayMovies(results, ".movies-grid")
            
        } catch (error) {
            console.log(("Error buscando peliculas:", error))
            document.querySelector(".movies-grid").innerHTML = `<div class="error">Busqueda Fallida. Por favor intente de nuevo</div>`
        }
    }

    sortMovies(movies, sortBy) {
        switch(sortBy) {
            case "popularity.desc":
                return movies.sort((a, b) => b.popularity - a.popularity)
            case "vote_average.desc":
                return movies.sort((a, b) => b.vote_average - a.vote_average)
            case "release_date.desc":
                return movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
            case "title.asc": 
                return movies.sort((a, b) => a.title.localeCompare(b.title))
            default: 
                return movies;
        }
    }

    async handleFilterChange() {
        const searchInput = document.querySelector(".search-input")
        const genreFilter = document.querySelector(".genreFilter")
        const yearFilter = document.querySelector(".yearFilter")
        const sortFilter = document.querySelector(".sortFilter")
        const clearBtn = document.querySelector(".clear-btn")
        const trendingSection = document.querySelector(".trendingSection")

        this.currentFilters = {
            genre: genreFilter.value,
            year: yearFilter.value,
            sort: sortFilter.value
        }

        if (this.currentFilters.genre || this.currentFilters.year || this.currentFilters.sort || searchInput.value.trim()) {
            clearBtn.classList.add("show");
        } else {
            clearBtn.classList.remove("show")
        }

        if (searchInput.value.trim()) {
            trendingSection.style.display = "none"
            await this.handleSearch(searchInput.value.trim())
        } else {
            if (this.currentFilters.genre || this.currentFilters.year || this.currentFilters.sort) {
                trendingSection.style.display = "none"
                document.querySelector(".randomSectionTitle").textContent = "Peliculas filtradas"
            } else {
                trendingSection.style.display = "block"
                document.querySelector(".randomSectionTitle").textContent = "Descubre Peliculas"
            }
            
            await this.loadFilteredMovies();
        }
    }

    async loadFilteredMovies() {
        try {
            document.querySelector(".movies-grid").innerHTML = `<div class="loading">Cargando peliculas filtradas...</div>`
            let url = `${this.BASE_URL}/discover/movie?api_key=${this.API_KEY}&language=es-ES&page=1`

            if (this.currentFilters.genre) {
                url += `&with_genres=${this.currentFilters.genre}`
            }
            
            if (this.currentFilters.year) {
                url += `&primary_release_year=${this.currentFilters.year}`
            }
            
            if (this.currentFilters.sort) {
                url += `&sort_by=${this.currentFilters.sort}`
            }

            const res = await fetch(url)
            const data = await res.json()

            let results = data.results

            this.displayMovies(data.results, ".movies-grid")

        } catch (error) {
            console.log(("Error cargando peliculas filtradas:", error))
            document.querySelector(".movies-grid").innerHTML = `<div class="error">Fallo al buscar peliculas filtradas</div>`
        }
    }

    clearAllFilters() {
        const trendingSection = document.querySelector(".trendingSection")
        document.querySelector(".search-input").value = ""
        document.querySelector(".genreFilter").value = ""
        document.querySelector(".yearFilter").value = ""
        document.querySelector(".sortFilter").value = ""

        document.querySelector(".clear-btn").classList.remove("show")
        document.querySelector(".randomSectionTitle").textContent = "Descubre Peliculas"

        trendingSection.style.display = "block"

        this.currentFilters = {
            genre: "",
            year: "",
            sort: ""
        }

        this.isSearching = false
        this.loadRandomMovies()
    }

    scrollCarousel(direction) {
        const carousel = document.querySelector(".trending-carousel")
        const scrollAmount = 320

        if (direction === "prev") {
            carousel.scrollBy({
                left: -scrollAmount, behavior:"smooth"
            })
        } else {
            carousel.scrollBy({
                left: scrollAmount, behavior: "smooth"
            })
        }
    }

    async showModal(movie) {
        const posterPath = movie.poster_path ? `${this.IMG_BASE_URL}${movie.poster_path}` : this.FALLBACK_IMG;
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
        const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "TBA";
        const genres = movie.genre_ids && movie.genre_ids.length? movie.genre_ids.slice(0, 2).map(id => this.genres[id]).filter(Boolean).join(", "): "N/A";
        const description = movie.overview ? movie.overview :  "Sin descripcion disponible"
        const modal = document.createElement("div")
        modal.classList.add("modal-container")
        let movie_id = movie.id
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${this.API_KEY}&language=es-ES`)
        const details = await res.json()
        console.log(details)
        document.body.style.overflow = "hidden"; // bloquea scroll de la página

        modal.innerHTML = `
            <div class="overlay"></div>
            <div class="modal">
                <div class="poster-container">
                    <img src="${posterPath}" alt="${movie.title}" class="poster-modal">
                </div>
                <div class="details-container">
                    <div class="modal-title">${movie.title}</div>
                    <div class="modal-stats">
                        <div class="modal-rating">Calificacion: <span>${rating}/10.0</span></div>
                        <div class="modal-release">Estreno: <span>${year}</span></div>
                        <div class="modal-genres">Generos: <span>${genres}</span></div>
                        <div class="modal-duration">Duracion: <span>${details.runtime}min</span></div>
                    </div>
                    <div class="modal-sinopsis">Sinopsis: <span>${description}</span></div>
                </div>
                <button class="close-modal"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg> </button>
            </div>
            `

            let mq = window.matchMedia("(max-width: 900px)")

            if (mq.matches) {
                modal.querySelector(".poster-container").style.display = "none"
                modal.querySelector(".poster-container").style.marginRight = "0"
                modal.querySelector(".modal").style.padding = "0"
                modal.querySelector(".modal").style.minHeight = "50rem"
                modal.querySelector(".modal").style.backgroundImage = `url(${posterPath}` 
                modal.querySelector(".modal").style.backgroundRepeat = "no-repeat"
                modal.querySelector(".modal").style.backgroundSize = "cover"
                modal.querySelector(".modal").style.backgroundImage = `url(${posterPath}` 
                modal.querySelector(".modal").style.backgroundPosition = "center"
                modal.querySelector(".details-container").style.backgroundColor = "#000c"
                modal.querySelector(".details-container").style.padding = "1rem"
            }

        document.body.append(modal)
        
        modal.querySelector(".close-modal").focus()
        modal.querySelector(".close-modal").addEventListener("click", () => {
            modal.remove()
            document.body.style.overflow = ""; 
        })

    }

}

const app = new MovieExploarer()