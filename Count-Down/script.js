const startButton = document.querySelector('.start');
const addButton = document.querySelector('.add');
const errorMessage = document.querySelector('.dateErrorMessage');
const container = document.querySelector('.container');
const inputContainer = document.querySelector('.inputContainer');
const resultContainer = document.querySelector('.resultContainer');
const audio = new Audio('audio.wav');

startButton.addEventListener("click", (e) => {
    e.preventDefault();
    const userTitle = document.querySelector('#userTitle').value;
    const endDate = new Date(document.querySelector('#userDateNTime').value);
    const currentDate = new Date();
    if (endDate < currentDate) {
        errorMessage.innerHTML = "Please enter valid date";
    }
    else {
        document.querySelector('#userTitle').value = "";
        document.querySelector('#userDateNTime').value = "";
        errorMessage.innerHTML = "";
        addCountDown(userTitle, endDate);
    }
})

addButton.addEventListener('click',() =>{
    container.style.opacity = "0.1";
    inputContainer.style.display = "flex";
})

function addCountDown(userTitle, endDate) {
    const currentDate = new Date();
    let diff = (endDate - currentDate) / 1000;
    if (diff > 0) {
        container.style.opacity = "1";
        inputContainer.style.display = "none";
        container.style.display = "block";
        let countDown = document.createElement('div');
        countDown.classList.add('countDown');
        countDown.innerHTML = `
            <h2 id="title">${userTitle}</h2>
            <h3 id="futureDate">${formattedDate(endDate)}</h3>
            <div class="timer">
                <div class="box">
                    <span class="number">00</span>
                    <span class="text">Days</span>
                </div>
                <div class="box">
                    <span class="number">00</span>
                    <span class="text">Hours</span>
                </div>
                <div class="box">
                    <span class="number">00</span>
                    <span class="text">Minutes</span>
                </div>
                <div class="box">
                    <span class="number">00</span>
                    <span class="text">Seconds</span>
                </div>
        `;
        const intervalId = setInterval(() => {
            const currentDate = new Date();
            let diff = (endDate - currentDate) / 1000;
            if (diff > 0) {
                const displayTime = countDown.querySelectorAll('.number');
                displayTime[0].textContent = Math.floor(diff / 3600 / 24)
                displayTime[1].textContent = Math.floor((diff / 3600) % 24)
                displayTime[2].textContent = Math.floor((diff / 60) % 60)
                displayTime[3].textContent = Math.floor(diff % 60)
            }
            else{
                countDownCompleted(countDown,userTitle,endDate);
                clearInterval(intervalId);
                return;
            }
        }, 1000);
        container.insertBefore(countDown, container.lastElementChild);
    }
}

function formattedDate(date1) {
    const date = new Date(date1);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
}

function countDownCompleted(countDown,userTitle,endDate) {
    resultContainer.innerHTML =`
         <h2>${userTitle} is here!!!</h2>
         <i class="fa-regular fa-calendar-check"></i>
         <h3>${formattedDate(endDate)}</h3>
         <h2>Countdown Completed!!</h2>
         <button class="okay">Ok</button>
    `;
    resultContainer.style.display = "block";
    audio.currentTime = 0;
    audio.play();
    inputContainer.style.display = "none";
    container.style.opacity = "0.1";
    const okayButton = resultContainer.querySelector('.okay')
    okayButton.addEventListener('click', ()=>{
        countDown.remove();
        audio.pause();
        resultContainer.style.display = "none";
        if(container.children.length > 2){
            inputContainer.style.display = "none";
            container.style.opacity = "1";
        }
        else{
            inputContainer.style.display = "flex";
            container.style.display = "none";
        }
    })
}