// let cubies = window.data; //checklist data  가져오기
let cubies = window.alpha; //checklist data  가져오기
cubies.forEach(addThings); //merge data
let myStorage = window.localStorage; //로컬 저장소 만들기

//download number check하기. 처음이면 0
// let dnNum;
// if (myStorage.getItem('downloadToday') !== null) {
//     dnNum = myStorage.getItem('downloadToday');
// } else {
//     dnNum = 0;
//     myStorage.setItem('downloadToday', dnNum);
// }

//Daily cubie 2시간에 한번씩 리셋되게 하기
let targetDaily = document.querySelector('div.get-cubie');
let nextEndtime, downloaded, tempImg, tempName, timenow;
refreshStoredData(); //initial data load as opening site

function refreshStoredData() { // get cubie버튼 누르는 부분마다 data refresh  될 수 있도록 모듈화
    nextEndtime = 0; //endTime
    downloaded = 0;
    tempImg = 'Qub87'; //김밥
    tempName = 'TEST'; // 블랭크 이미지로 바꿔와야 함. 안쓰이지만 값 필요
    timenow = Date.now();
    if (myStorage.getItem('nextEndtime') !== null) {
        nextEndtime = myStorage.getItem('nextEndtime');
    }

    if (nextEndtime > timenow) { // endtime지났으면 초기화 상태로 유지
        if (myStorage.getItem('downloaded') !== null) {
            downloaded = myStorage.getItem('downloaded');
        }
        if (myStorage.getItem('tempImg') !== null) {
            tempImg = myStorage.getItem('tempImg');
        }
        if (myStorage.getItem('tempName') !== null) {
            tempName = myStorage.getItem('tempName');
        }
    }
}

// test용 초기화하기 - testcode
let btnInit = document.querySelector('.btn-init');
btnInit.onclick = initStorage;

function initStorage() {
    console.log('Storage daily, downloaded,tempImg will be removed')
    localStorage.removeItem('nextEndtime');
    localStorage.removeItem('downloaded');
    localStorage.removeItem('tempImg');
    // ownership초기화
    cubies.forEach(cubie => localStorage.removeItem(cubie['cubie-name']));
}
// test용 초기화하기 끝



//menu bar
let menuItems = document.querySelector('menu-item');
let checklist = document.querySelector('div.checklist');
let aboutUs = document.querySelector('div.about-us');
let getCubie = document.querySelector('div.get-cubie');

let btnChecklist = document.querySelector('.btn-checklist');
btnChecklist.onclick = showChecklist;
let btnAboutUs = document.querySelector('.btn-about-us');
btnAboutUs.onclick = showAboutUs;
let btnGetCubie = document.querySelector('.btn-get-cubie');
btnGetCubie.onclick = showGetCubie;
// let btnClose = document.querySelector('.btn-close');
// btnClose.onclick = closeStory;

let targetList = document.querySelector('div.card-list');
let seasonBtns = document.querySelectorAll('.season-btn');
let rarityBtns = document.querySelectorAll('.rarity-btn');


for (let i = 0; i < seasonBtns.length; i++) {
    seasonBtns[i].onclick = showSeason;
}
for (let i = 0; i < rarityBtns.length; i++) {
    rarityBtns[i].onclick = showRarity;
}

function showSeason() {
    targetList.textContent = '';
    seasonBtns.forEach(seasonBtn => {
        seasonBtn.style.color = 'white';
        seasonBtn.style.background = '#ffd5e5';
    });
    rarityBtns.forEach(rarityBtn => {
        rarityBtn.style.color = 'white';
        rarityBtn.style.background = '#ffd5e5';
    });
    // console.log(this);
    this.style.color = '#303960';
    this.style.background = '#81f5ff';
    let seasonCubies = cubies.filter(cubie => cubie['cubie-season'] === this.classList[1]);
    seasonCubies.forEach(createList);
}

function showRarity() {
    targetList.textContent = '';
    seasonBtns.forEach(seasonBtn => {
        seasonBtn.style.color = 'white';
        seasonBtn.style.background = '#ffd5e5';
    });
    rarityBtns.forEach(rarityBtn => {
        rarityBtn.style.color = 'white';
        rarityBtn.style.background = '#ffd5e5';
    });
    // console.log(this);
    this.style.color = '#303960';
    this.style.background = '#81f5ff';
    let rarityCubies = cubies.filter(cubie => cubie['cubie-rarity'].toLowerCase() === this.classList[1]);
    rarityCubies.forEach(createList);
}

function showChecklist() {
    //Checklist 만들기 - show할때 만들기
    // cubies.forEach(createList);
    // let prevStory;
    seasonBtns[2].onclick(); //최근 시즌 먼저 보여주기

    //refresh owership
    // cubies.forEach(refreshOwnership);

    // function refreshOwnership(cubie) {
    //     let ownership = myStorage.getItem(cubie['cubie-name']);

    //     if (Number(ownership) >= 1) {

    //         let toggleBtn = document.querySelector('div.story-toggle.' + cubie['cubie-name']);

    //         toggleBtn.style.display = 'block';
    //         let checkOwn = document.querySelector('input.own-check.' + cubie['cubie-name']);
    //         checkOwn.checked = true;
    //     } else {
    //         let toggleBtn = document.querySelector('div.story-toggle.' + cubie['cubie-name']);

    //         toggleBtn.style.display = 'none';
    //         let checkOwn = document.querySelector('input.own-check.' + cubie['cubie-name']);
    //         checkOwn.checked = false;
    //     }
    // }
    aboutUs.style.display = 'none';
    getCubie.style.display = 'none';
    checklist.style.display = 'block';
}



function createList(cubie) {
    let temp = document.querySelector('#card-temp');
    let newCubie = document.importNode(temp.content, true);
    for (let key in cubie) {
        if (newCubie.querySelector('.' + key) !== null) {
            if (key === 'cubie-story-content') {
                newCubie.querySelector('.' + key).textContent = cubie[key];
            } else {
                newCubie.querySelector('.' + key).textContent = key.slice(6, 7).toUpperCase() + key.slice(7) + " : " + cubie[key];
            }
        }
    }
    newCubie.querySelector('img.cubie-img').src = 'images/' + cubie['cubie-img'] + '.JPG';
    newCubie.querySelector('img.cubie-img').onclick = imgPop;
    newCubie.querySelector('img.cubie-img-big').src = 'images/' + cubie['cubie-img'] + '.JPG';
    newCubie.querySelector('img.cubie-img-big').onclick = closeThis;
    newCubie.querySelector('div.thumb-card').id = cubie['cubie-name'];
    newCubie.querySelector('input').classList.add(cubie['cubie-name']);
    newCubie.querySelector('div.cubie-story').classList.add(cubie['cubie-name']);
    newCubie.querySelector('.btn-close').classList.add(cubie['cubie-name']);
    newCubie.querySelector('.story-toggle').classList.add(cubie['cubie-name']);
    newCubie.querySelector('.btn-story-toggle').classList.add(cubie['cubie-name']);

    targetList.insertBefore(newCubie, targetList.childNodes[0]);
    //check ownership from local storage, check and show story toggle button - 다운로드 받으면 ownership 증가되게 함 
    let ownership = myStorage.getItem(cubie['cubie-name']);

    if (Number(ownership) >= 1) {

        let toggleBtn = document.querySelector('div.story-toggle.' + cubie['cubie-name']);

        toggleBtn.style.display = 'block';
        let checkOwn = document.querySelector('input.own-check.' + cubie['cubie-name']);
        checkOwn.checked = true;
    }
    refreshBtns();
}

function addThings(obj) {
    let cubieBeta = window.beta.filter(b => b['name'] === obj['cubie-name'])[0];
    obj['cubie-species'] = cubieBeta['species'];
    obj['cubie-story-content'] = cubieBeta['story'];
    obj['cubie-name'] = window.atob(obj['cubie-name']);
    obj['cubie-rarity'] = window.atob(obj['cubie-rarity']);
    obj['cubie-img'] = window.atob(obj['cubie-img']);
}

function showAboutUs() {
    aboutUs.style.display = 'block';
    getCubie.style.display = 'none';
    checklist.style.display = 'none';
}

function showGetCubie() {
    aboutUs.style.display = 'none';
    getCubie.style.display = 'block';
    checklist.style.display = 'none';
    refreshStoredData();
    refreshDailyCubie();

    if (nextEndtime < timenow) {
        document.querySelector('.before-get').style.display = 'block';
        document.querySelector('div.download-bar').style.display = 'block';
        document.querySelector('.after-get').style.display = 'none';
    } else {
        document.querySelector('.before-get').style.display = 'none';
        document.querySelector('.after-get').style.display = 'block';
        document.querySelector('.remaining-time').textContent = getTimeRemaining(nextEndtime);
    }

}

function refreshBtns() {
    //story 창 close 버튼 모든 cubie에 붙이기
    let closeBtn = document.getElementsByClassName('btn-close');

    for (let i = 0; i < closeBtn.length; i++) {
        closeBtn[i].onclick = closeStory;
    }

    function closeStory() {
        let closingStory = document.querySelector('div.cubie-story.' + this.classList[1]);
        closingStory.style.display = 'none';
        let toggleBtn = document.querySelector('.btn-story-toggle.' + this.classList[1]);
        // toggleBtn.style.display = 'block';
        toggleBtn.textContent = 'My Story';
        // prevStory = undefined;
    }
    //uncheck될때 mystory button없애기
    let el = document.getElementsByTagName('input');

    for (let i = 0; i < el.length; i++) {
        if (el[i].type === 'checkbox') {
            el[i].onclick = showToggle;
        }
    }

    function showToggle() {
        let cubieName = this.classList[1];
        if (this.checked === true) {

            let cubieStory = document.querySelector('div.cubie-story.' + cubieName);

            // if (prevStory !== undefined) {

            //     prevStory.style.display = 'none';
            //     let toggleBtn = document.querySelector('div.story-toggle.' + prevStory.classList[1]);
            //     toggleBtn.style.display = 'block';
            // }
            let toggleBtn = document.querySelector('div.story-toggle.' + cubieName);
            toggleBtn.style.display = 'block';
            let myStoryBtn = document.querySelector('.btn-story-toggle.' + cubieName);
            myStoryBtn.textContent = 'My Story';
            // cubieStory.style.display = 'block';
            // prevStory = cubieStory;
            myStorage.setItem(cubieName, 1);

        } else {
            let cubieName = this.classList[1];
            let cubieStory = document.querySelector('div.cubie-story.' + cubieName);
            cubieStory.style.display = 'none';
            let toggleBtn = document.querySelector('div.story-toggle.' + cubieName);
            toggleBtn.style.display = 'none';
            // if (prevStory !== undefined) {
            //     if (prevStory.classList[1] === cubieName) {
            //         prevStory = undefined;
            //     }
            // }
            myStorage.removeItem(cubieName);
        }
    }

    //my story button으로 스토리 다시열어보기
    let myStoryBtn = document.getElementsByClassName('btn-story-toggle');

    for (let i = 0; i < myStoryBtn.length; i++) {
        myStoryBtn[i].onclick = storyOpen;
    }

    function storyOpen() {
        let cubieName = this.classList[1];
        let cubieStory = document.querySelector('div.cubie-story.' + cubieName);
        // if (prevStory !== undefined) {
        //     prevStory.style.display = 'none';
        //     let toggleBtn = document.querySelector('div.story-toggle.' + prevStory.classList[1]);
        //     toggleBtn.style.display = 'block';
        // }
        if (cubieStory.style.display === 'block') {
            this.textContent = "My Story"
            cubieStory.style.display = 'none';
        } else {
            this.textContent = "Close Story";
            cubieStory.style.display = 'block';
        }
        // prevStory = cubieStory;
    }

}

//getcubie누른 후에는 template과 다운로드 버튼, 다운로드 한 후에는 다시 물음표와 몇시간 후에 니 튜비 나온다는걸로 변경
createDailyCubie(Number(nextEndtime));


function createDailyCubie(endstamp) {
    targetDaily = document.querySelector('div.get-cubie');
    //lucky-btn, get-cubie btn click시 refresh
    if (targetDaily.textContent !== '') {
        targetDaily.textContent = '';
    }
    let temp = document.querySelector('#daily-temp');
    let newDaily = document.importNode(temp.content, true);
    if (endstamp < timenow) {
        // newDaily.querySelector('div.before-message').textContent = 'Your Cubie is waiting for you';
        newDaily.querySelector('div.before-get').style.display = 'block';
        newDaily.querySelector('div.after-get').style.display = 'none';
    } else {
        newDaily.querySelector('div.before-get').style.display = 'none';
        newDaily.querySelector('div.after-get').style.display = 'block';
        newDaily.querySelector('div.lucky-template').style.backgroundImage = 'url("images/' + tempImg + '.png")';
        newDaily.querySelector('h2.lucky-title').textContent = tempName + '이(가) 찾아왔어요!';
        if (downloaded === '1') {

            newDaily.querySelector('div.download-bar').style.display = 'none';

            newDaily.querySelector('div.after-message').textContent = tempName + '과(와) 함께 즐거운 추억 만들고 있나요?';
            newDaily.querySelector('div.remaining-time').textContent = getTimeRemaining(endstamp);
        } else {
            newDaily.querySelector('div.download-bar').style.display = 'block';

            newDaily.querySelector('div.after-message').textContent = '다운로드 버튼을 클릭하시고 이미지를 저장해주세요.';
            newDaily.querySelector('div.remaining-time').textContent = getTimeRemaining(endstamp);
        }


    }
    // targetDaily.insertBefore(newDaily, targetDaily.childNodes[0]);
    targetDaily.appendChild(newDaily);
}

function refreshDailyCubie() {
    document.querySelector('div.lucky-template').style.backgroundImage = 'url("images/' + tempImg + '.png")';
    document.querySelector('h2.lucky-title').textContent = tempName + '이(가) 찾아왔어요!';
    if (downloaded === '1') {

        document.querySelector('div.download-bar').style.display = 'none';
        document.querySelector('div.after-message').textContent = tempName + '과(와) 함께 즐거운 추억 만들고 있나요?';
        document.querySelector('div.remaining-time').textContent = getTimeRemaining(nextEndtime);

    } else if (downloaded === '0') {
        document.querySelector('div.download-bar').style.display = 'block';
        document.querySelector('div.after-message').textContent = '다운로드 버튼을 클릭하시고 이미지를 저장해주세요.';
        document.querySelector('div.remaining-time').textContent = getTimeRemaining(nextEndtime);
    }
}

function getTimeRemaining(endtime) {
    let t = endtime - Date.now();
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);

    return hours + ' hours  ' + minutes + ' mins  ' + seconds + ' secs';
}


//Daily random cubie 뽑기, 다운로드 받기, 몇번 받았는지 몇시간 남았는지 시간 계산하기
let getCubieBtn = document.querySelector('.btn-lucky');
getCubieBtn.onclick = getRandomCubie;


function getRandomCubie() {
    refreshStoredData();
    // console.log(tempName);
    if (tempName === 'TEST') {

        // let templates = window.templateData;
        let preTemplates = window.gamma;
        let templates = {};
        for (let key in preTemplates) {

            // window.atob(cubieObj['cubie-name'])
            let cName = window.atob(key);
            templates[cName] = [];
            templates[cName][0] = window.atob(preTemplates[key][0]);
            templates[cName][1] = preTemplates[key][1];
        }

        let randomCubies = [];
        let rarityFreq = [1, 10, 20, 30]


        for (let key in templates) {
            ownership = myStorage.getItem(key);
            // console.log('ownership', key, ownership);
            // 한 템플릿이 3 번이상 다운로드 되었으면 확률을 2 로 낮춤
            if (ownership > 2) {
                for (let i = 0; i < 3; i++) {
                    randomCubies.push(key);
                }
            } else {
                for (let i = 0; i < rarityFreq[templates[key][1] - 1]; i++) {
                    randomCubies.push(key);
                }
            }
        }


        let randomCubie = randomCubies[Math.floor(Math.random() * randomCubies.length)];
        let dailyChance = document.querySelector('div.daily-chance');
        let afterGet = dailyChance.querySelector('div.after-get');
        let beforeGet = dailyChance.querySelector('div.before-get');
        afterGet.style.display = 'block';
        beforeGet.style.display = 'none';
        let cubieTemplate = dailyChance.querySelector('div.lucky-template');
        let luckyTitle = dailyChance.querySelector('h2.lucky-title');
        luckyTitle.textContent = randomCubie + '이(가) 찾아왔어요!';


        cubieTemplate.style.backgroundImage = 'url("images/' + templates[randomCubie][0] + '.png")';

        myStorage.setItem('downloaded', 0);
        downloaded = 0;
        myStorage.setItem('tempImg', templates[randomCubie][0]);
        tempImg = templates[randomCubie][0];
        myStorage.setItem('tempName', randomCubie);
        tempName = randomCubie;
        // console.log('chancenum', chanceNum);
        //time set-up   
        myStorage.setItem('nextEndtime', timenow + (2 * 1000 * 60 * 60));
        nextEndtime = timenow + (2 * 1000 * 60 * 60);

        //test time set-up    - testcode
        // myStorage.setItem('nextEndtime', timenow + (1 * 1000 * 60));
        // nextEndtime = timenow + (1 * 1000 * 60);
        //testcode

        // console.log('endtime calculate', daily[chanceNum]);
        let remainingTime = dailyChance.querySelector('div.remaining-time');
        // console.log('remainingTime',remainingTime);
        remainingTime.textContent = getTimeRemaining(nextEndtime);
        let afterMessage = dailyChance.querySelector('div.after-message');
        // console.log('remainingTime',remainingTime);
        afterMessage.textContent = '다운로드 버튼을 클릭하시고 이미지를 저장해주세요.';
    } else {
        showGetCubie();
    }


}

//Download Button download 받았다고 카운트 되고,  download버튼이 없어지고 Downloaded로 메세지 바뀜. 
let downloadBtn = document.querySelector('.btn-download');
downloadBtn.onclick = tempDown;

function tempDown() {
    // if (dnNum !== null) {
    //     dnNum++;
    // } else {
    //     dnNum = 1;
    // }
    // // myStorage.setItem('downloadToday', dnNum);
    // // alert('you downloaded ' + dnNum + 'times!')
    // if (dnNum > 5) {
    //     this.style.display = 'none';
    //     myStorage.removeItem('downloadToday');
    // }
    this.parentNode.style.display = 'none';
    document.querySelector('div.after-message').textContent = tempName + '과(와) 함께 즐거운 추억 만들고 있나요?';

    myStorage.setItem('downloaded', 1);
    downloaded = 1;
    //download  받을때 회수 ownership 회수 하나 올리기
    ownership = myStorage.getItem(tempName);
    // console.log('download할때 ownership', ownership);
    if (ownership === null) {
        myStorage.setItem(tempName, 1);
        ownership = 1;
        // console.log('download후 1로 바꿈', ownership);
    } else {
        myStorage.setItem(tempName, ownership++);
        // console.log('download할때마다 1씩 증가', ownership);
    }
    window.open('images/' + tempImg + '.png');

}

let helpIcon = document.getElementById('help-icon');
let helpSection = document.getElementById('help-section');
let helpClose = document.getElementById('help-close');

helpIcon.onclick = openHelp;
helpClose.onclick = closeHelp;

function openHelp() {
    helpIcon.style.display = 'none';
    helpSection.style.display = 'block';
}

function closeHelp() {
    helpSection.style.display = 'none';
    helpIcon.style.display = 'block';
}

let timeRefresh = document.querySelector('div.time-refresh');
timeRefresh.onclick = refreshTime;

function refreshTime() {
    timenow = Date.now();
    if (nextEndtime < timenow) {
        // document.querySelector('.before-message').textContent = 'Your Cubie is waiting for you';
        document.querySelector('.before-get').style.display = 'block';
        document.querySelector('.after-get').style.display = 'none';
    } else {
        document.querySelector('.remaining-time').textContent = getTimeRemaining(nextEndtime);

    }
}

// let cubieImgs = document.getElementsByClassName('cubie-img');
// let cubieImgBigs = document.getElementsByClassName('cubie-img-big');

// for (let i = 0; i < cubieImgs.length; i++) {
//     cubieImgs[i].onclick = imgPop;
//     cubieImgBigs[i].onclick = closeThis;
// }

function imgPop() {

    let parentImg = this.parentNode;

    let cubieImgBig = parentImg.getElementsByClassName('cubie-img-big')[0];

    cubieImgBig.src = this.src;
    cubieImgBig.style.display = 'block';
}

function closeThis() {
    this.style.display = 'none';
}