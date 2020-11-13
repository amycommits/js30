// get the elements on the page
const player = document.querySelector(".player")
const video = player.querySelector(".viewer")
const progress = player.querySelector(".progress")
const progressBar = player.querySelector(".progress__filled")

const toggle = player.querySelector(".toggle")
const skipButtons = player.querySelectorAll("[data-skip]")
const ranges = player.querySelectorAll(".player__slider")

//functions
function togglePlay() {
  if(video.paused ){
    video.play()
  } else {
    video.pause()
  }
}

function updatePlayButton() {
  const icon = this.paused ? '►' : '❚ ❚'
  toggle.textContent = icon
  console.log(`updated the button ${icon}`)
}

function skip() {
  console.log(this.dataset.skip)
  video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
  video[this.name] = this.value
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub (e) {
  console.log(e)
  const setTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = setTime
}
//events

video.addEventListener('click', togglePlay)
video.addEventListener('play', updatePlayButton)
video.addEventListener('pause', updatePlayButton)
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)
toggle.addEventListener('play', updatePlayButton)
toggle.addEventListener('pause', updatePlayButton)

skipButtons.forEach(skipButton => {
  skipButton.addEventListener('click', skip)
})


ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate)
  range.addEventListener('mousemove', handleRangeUpdate)
})
let mousedown = false
progress.addEventListener('click', scrub)

progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)

progress.addEventListener('mousemove', (e) => { mousedown && scrub(e) })