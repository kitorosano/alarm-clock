const $currentTime = document.querySelector('h1'),
  $content = document.querySelector('.content'),
  $selectMenu = document.querySelectorAll('select'),
  $setAlarmBtn = document.querySelector('button')

let alarmTime,
  isAlarmSet,
  ringtone = new Audio('./assets/ringtone.mp3')

for (let i = 12; i > 0; i--) {
  i = i < 10 ? '0' + i : i
  let option = document.createElement('option')
  option.value = i
  option.textContent = i

  $selectMenu[0].firstElementChild.insertAdjacentElement('afterend', option)
}

for (let i = 59; i > 0; i--) {
  i = i < 10 ? '0' + i : i
  let option = document.createElement('option')
  option.value = i
  option.textContent = i

  $selectMenu[1].firstElementChild.insertAdjacentElement('afterend', option)
}

for (let i = 2; i > 0; i--) {
  let ampm = i === 1 ? 'AM' : 'PM'
  let option = document.createElement('option')
  option.value = ampm
  option.textContent = ampm

  $selectMenu[2].firstElementChild.insertAdjacentElement('afterend', option)
}

setInterval(() => {
  let date = new Date(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    ampm = hours >= 12 ? 'PM' : 'AM'

  hours = hours > 12 ? hours - 12 : hours
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  $currentTime.textContent = `${hours}:${minutes}:${seconds} ${ampm}`

  if (isAlarmSet && alarmTime === $currentTime.textContent) {
    ringtone.play()
    ringtone.loop = true
  }
})

function setAlarm() {
  if (isAlarmSet) {
    isAlarmSet = false
    ringtone.pause()
    ringtone.currentTime = 0

    $content.classList.remove('disable')
    $setAlarmBtn.textContent = 'Set Alarm'
    return
  }

  let hours = $selectMenu[0].value,
    minutes = $selectMenu[1].value,
    ampm = $selectMenu[2].value

  console.log(hours, minutes, ampm)

  if (
    hours.includes('Hour') ||
    minutes.includes('Minute') ||
    ampm.includes('AM/PM')
  ) {
    alert('Please select a valid option')
    return
  }

  alarmTime = `${hours}:${minutes}:00 ${ampm}`
  $content.classList.add('disable')
  $setAlarmBtn.textContent = 'Clear Alarm'
  isAlarmSet = true
}

$setAlarmBtn.addEventListener('click', setAlarm)
