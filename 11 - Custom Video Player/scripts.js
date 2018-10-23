// 获取节点
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// 播放、暂停
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// 更新图标
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// 快进快退
function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

// 调整声音和速度
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// 更新进度条
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// 设置播放进度
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// 监听点击视频
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

// 监听点击按钮
toggle.addEventListener('click', togglePlay);
// 监听快进快退
skipButtons.forEach(button => button.addEventListener('click', skip));
// 监听声音和速度进度条
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
// 监听进度条事件
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
