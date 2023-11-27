
const $ = document.querySelector.bind(document);
const playBtn = $('.play')
const nameSong = $('.name-song');
const cd = $('.cd');
const audio = $('#audio')
const progress = $('.slider')
const nextBtn = $('.next')
const prevBtn = $('.prev')
const randomBtn = $('.shuffle')
const repeatBtn = $('.repeat')
const playList = $('.main')
const playList2 = $('.main-2')
const mobile = $('.mobile')
const desk = $('.desk')
const color = $('.color')
const timertop = $('.timertop')
const timerbottom = $('.timerbottom')


const app = {
    isColor: false,
    currenIndex: 0,
    isRepeat: false,
    isPlaying: false,
    israndom: false,
    songs: [
        {
            id: 1,
            name: '100 Years Love',
            song: './nhac/years.mp3',
            image: 'https://i1.sndcdn.com/artworks-4VN4srK9aaTVEOlz-97l08A-t500x500.jpg'
        },
        {
            id: 1,
            name: 'Forget',
            song: './nhac/forget.mp3',
            image: './pic/forget.jfif'
        },
        {
            id: 1,
            name: 'Set Fire to the Rain',
            song: './nhac/setfire.mp3',
            image: './pic/setfire.png'
        },
        {
            id: 1,
            name: 'Nhìn kìa trời tối rồi',
            song: './nhac/nhinhkiatroitoiroi.mp3',
            image: './pic/nhinkiatroitoiroi.jfif'
        },
        {
            id: 1,
            name: 'Nothin on me',
            song: './nhac/nothinonme.mp3',
            image: './pic/nothinonme.jpg'
        },
        {
            id: 1,
            name: 'Trance',
            song: './nhac/trance.mp3',
            image: './pic/trance.jfif'
        },
        {
            id: 1,
            name: 'Vành khuyên Remix',
            song: './nhac/vanhkhuyen.mp3',
            image: './pic/vanhkhuyen.jfif'
        },
        {
            id: 2,
            name: 'Rhymastic Yêu 5',
            song: './nhac/Yeu-5-Remix-Tiktok-Rhymastic.mp3',
            image: './pic/yeu5.png'

        },
        {
            id: 3,
            name: 'Nevada',
            song: './nhac/Mashup-Di-Di-Di-x-NEVADA-Remix-Tiktok.mp3',
            image: 'https://i1.sndcdn.com/artworks-5Z483EjS9Xn4-0-t240x240.jpg'

        },
        {
            id: 4,
            name: 'Tây Du Ký',
            song: './nhac/Tay-Du-Ki-Le-Bao-Remix.mp3',
            image: './pic/tayduky.jfif'
            
        },{
            id: 5,
            name: 'Decade',
            song: './nhac/decade.mp3',
            image: './pic/decade.png'
            
        },{
            id: 5,
            name: 'Memory Reboot',
            song: './nhac/memory-reboot.mp3',
            image: './pic/memory-reboot.png'
            
        },

    
    ],
    defineProperty: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currenIndex]
            }
        })
    },

    loadNextSong: function() {
        app.currenIndex++;
        console.log(app.currenIndex,app.songs.length)
        if(app.currenIndex >= app.songs.length) {
            app.currenIndex = 0;
            app.currenIndex--
        } else app.loadCurrentSong()
    },
    loadPrevSong: function() {
        if(app.currenIndex <= 0) {
            app.currenIndex = app.songs.length
        } else if (app.currenIndex <= app.songs.length) {
            app.currenIndex--;
        }
        app.loadCurrentSong()
    },
    loadRandomSong: function() {
        var newIndex;
        do {
            newIndex = Math.floor(Math.random() * app.songs.length)
        } while (newIndex === app.currenIndex)
        app.currenIndex = newIndex;
        app.loadCurrentSong()
    },


    handleEvents: function() {
        // const _this = this;D
        document.onscroll = function() {
            var scrollTop = window.scrollY || document.documentElement.scrollTop
            
        }
        playBtn.onclick = function() {
            if (app.isPlaying) {
                $('.fa-pause').classList.remove('fa-pause');
                $('.playicon').classList.add('fa-play');
                
                audio.pause();
            } else {
                audio.play();
                $('.fa-play').classList.remove('fa-play');
                $('.playicon').classList.add('fa-pause');
                
            }

                
                
        }
        audio.onplay = function() {
            app.isPlaying = true;
        }
        audio.onpause = function() {
            app.isPlaying = false;
        }
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration *100)
                progress.value = progressPercent;
            }
        }
        progress.onchange = function(e) {
            const seekTime =  audio.duration /100 * e.target.value
            audio.currentTime = seekTime
        }
        nextBtn.onclick = function() {
            if (app.israndom) {
                app.loadRandomSong()
            } else {app.loadNextSong()}
            
            audio.play()
            app.render()
        }
        prevBtn.onclick = function() {
            if(app.israndom) {
                app.loadRandomSong()
            } else {
                app.loadPrevSong();
            }
            
            audio.play()
            app.render()
        }
        randomBtn.onclick = function() {
            app.israndom = !app.israndom
            $('.shuffleicon').classList.toggle('active');
        }
        // xu ly nextsong khi end
        audio.onended = function() {
            if (app.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }
        // Repeat
        repeatBtn.onclick = function() {
            app.isRepeat = !app.isRepeat
            $('.repeaticon').classList.toggle('active');
        }
        //lang nghe click vao PlayList
        playList.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)') 
            if(songNode || e.target.closest('.bar'))
            { 
                console.log(songNode)
                if (songNode) {
                    app.currenIndex = Number(songNode.dataset.index);
                    app.loadCurrentSong()
                    app.render()
                    app.isPlaying = false;
                    playBtn.click()
                     
                }
                // xy ly clixk vao song option
            }
        }
        playList2.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)') 
            if(songNode || e.target.closest('.bar'))
            { 
                console.log(songNode)
                if (songNode) {
                    app.currenIndex = Number(songNode.dataset.index);
                    app.loadCurrentSong()
                    app.render()
                    app.isPlaying = false;
                    playBtn.click()
                    
                }
                // xy ly clixk vao song option
            }
        }
    },

    loadCurrentSong: function() {
        $('title').textContent =   `Free Music - ${this.currentSong.name}`
        nameSong.textContent = this.currentSong.name
        cd.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src= this.currentSong.song
    },
    
    render: function () {
        
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song" ${index == app.currenIndex ? 'active' : ''}" data-index="${index}">
                    <div class="name-songs" >${song.name}</div>
                    <div class="song-image"  style= "background: url(${song.image}); background-size: cover;"></div>
                    <div class="bar" ><i class="fa-solid fa-ellipsis bar-icon"></i></div>
                    </div>
                    `
        })
        $(".main").innerHTML = htmls.join('');
    },
    render2: function () {
        
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song" id="song-2" ${index == app.currenIndex ? 'active' : ''}" data-index="${index}">
                    <div class="name-songs" >${song.name}</div>
                    <div class="song-image"  style= "background: url(${song.image}); background-size: cover;"></div>
                    <div class="bar" ><i class="fa-solid fa-ellipsis bar-icon"></i></div>
                    </div>
                    `
        })
        $(".main-2").innerHTML = htmls.join('');
    },
    getScreen: function() {
        let widthNow = window.screen.availWidth
        if (widthNow >= 100 && widthNow <= 950) {
            mobile.style.display = 'block'
            desk.style.display = 'none'

        } else {
            app.render2()
            mobile.style.display = 'none'
            desk.style.display = 'block'

        }
    },
    handleResizeScreen: function() {
    window.onresize = function() {
        app.getScreen()
        console.log(window.screen.availWidth)
    }
    },
    
    handleTimer: function() {
        setInterval(()=> {
        let time = new Date
        let hours = time.getHours()
        let minutes = time.getMinutes()
        let seconds = time.getSeconds()
        document.querySelector('.hours').innerText = hours
        document.querySelector('.minutes').innerText = minutes
        document.querySelector('.second').innerText = seconds
        }, 1000)
    
    },
    handleChangeColor: function() {
        let a = app.isColor
        let b = document.querySelectorAll('.song')
        color.onclick = function() {
            if (a== false) {
                timertop.style.backgroundColor = "rgb(69 101 157)"
            timerbottom.style.backgroundColor = "rgb(69 101 157)"
            document.querySelector('body').style.backgroundColor = "rgb(178, 222, 255)"
            document.querySelector('.taskbar-bottom').style.backgroundColor = "rgb(69 101 157)"
            document.querySelector('.logo').style.backgroundColor = "rgb(69 101 157)"
            document.querySelector('.menu').style.backgroundColor = "#9bd2ff"
            document.querySelector('.settingicon2').style.color = "rgb(69 101 157)"
            document.querySelector('.play').style.backgroundColor = "rgb(69 101 157)"
            document.querySelector('.timer').style.backgroundColor = "#ffffff"
            document.querySelector('.hours').style.backgroundColor = "rgb(69 101 157)"
            document.querySelector('.minutes').style.backgroundColor = "rgb(69 101 157)"
            document.querySelector('.second').style.backgroundColor = "rgb(69 101 157)"
            
            // for (let i = 0; i<=b.length; i++) {
            //     b[i].style.backgroundColor = "rgb(69 101 157)"
            // }
            document.querySelector('.slider-2').classList.add('slider-3')
            document.querySelector('.slider-2').classList.remove('slider')
            // document.querySelector('.taskbar-left').style.backgroundColor = "white"
            a = true
            } else {
            timertop.style.backgroundColor = "#ff2152"
            timerbottom.style.backgroundColor = "#ff2152"
            document.querySelector('body').style.backgroundColor = "#243342"
            document.querySelector('.taskbar-bottom').style.backgroundColor = "#243342"
            document.querySelector('.logo').style.backgroundColor = "#ff2152"
            document.querySelector('.menu').style.backgroundColor = "#243342"
            document.querySelector('.settingicon2').style.color = "#ff2152"
            document.querySelector('.play').style.backgroundColor = "#ff2152"
            document.querySelector('.timer').style.backgroundColor = "#243342"
            document.querySelector('.hours').style.backgroundColor = "#151d26"
            document.querySelector('.minutes').style.backgroundColor = "#151d26"
            document.querySelector('.second').style.backgroundColor = "#151d26"
            // for (let j = 0; j<=b.length; j++) {
            //     b[j].style.backgroundColor = "#243342"
            // }
            document.querySelector('.slider-2').classList.remove('slider-3')
            document.querySelector('.slider-2').classList.add('slider')

            // document.querySelector('.taskbar-left').style.backgroundColor = "#bfdfff"

            a = false
            }
        }
    },
    start: function() {
        this.getScreen()
        this.handleResizeScreen()
        this.defineProperty()
        this.handleEvents()
        this.loadCurrentSong()
       this.handleTimer()
       this.handleChangeColor()
        this.render()
    }
}

app.start()


