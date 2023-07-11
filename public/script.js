const input = document.querySelector('input');
const searchList = document.querySelector('.searchList');
const button = document.querySelector('button');
const container = document.querySelector('.container');
const pagination = document.querySelector('#pagination');

button.addEventListener('click', () => {
    searchList.innerHTML = '';
    pagination.innerHTML = '';
    const anime = input.value;
    const url = `https://api.jikan.moe/v4/anime?q=${anime}&sfw`;
    resourceFetch(url).then((data) => {
        showResultSet(data);
        paginationBar(data['pagination'])
    })
})

function showResultSet(data) {
    searchList.innerHTML = '';
    const dataArray = data['data'];
    for (let i = 0; i < dataArray.length; i++) {
        const listItem = document.createElement('div');
        listItem.classList.add('card');
        listItem.innerHTML = `
            <div class="posterBox">
                <p id="score">${dataArray[i].score}</p>
                <div class="glass"></div>
                <img src="${dataArray[i].images.jpg.image_url}" alt="" srcset="">
            </div>

            <div class="contentBox">
                <p>${dataArray[i].title}</p>
            </div>`;
        searchList.appendChild(listItem);
    }
}

async function resourceFetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data; //which itself is a promise which is handled in the 'then' block
}

function paginationBar(pages) {
    const anime = input.value;
    const div = document.createElement('div');
    div.innerHTML = `<ul>
            <li class="" id="prev">Prev</li>
            <li class="active">1</li>
            </ul>`;
    pagination.appendChild(div);

    const ul = document.querySelector('ul');
    for (let i = 0; i < pages.last_visible_page - 1; i++) {
        const li = document.createElement('li');
        li.textContent = i + 2;
        ul.appendChild(li);
    }
    const li = document.createElement('li');
    li.id = 'next';
    li.textContent = 'Next';
    ul.appendChild(li);

    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');
    const lis = document.querySelectorAll('li');

    for (let i = 1; i < lis.length - 1; i++) {
        lis[i].addEventListener('click', () => {
            const url = `https://api.jikan.moe/v4/anime?q=${anime}&page=${i}`;
            resourceFetch(url).then((data)=>{
                showResultSet(data);
            });
            lis.forEach((i) => {
                i.classList.remove('active');
            })
            lis[i].classList.add('active');
        })
    }
    prev.addEventListener('click', () => {
        for (let i = 2; i < lis.length - 1; i++) {
            if (lis[1].classList[0] == 'active') {
                break;
            }
            if (lis[i].classList[0] == 'active') {
                lis[i].classList.remove('active');
                lis[i - 1].classList.add('active');
                break;
            }
        }
    })
    next.addEventListener('click', () => {
        for (let i = 1; i < lis.length - 1; i++) {
            if (lis[lis.length - 2].classList[0] == 'active') {
                break;
            }
            if (lis[i].classList[0] == 'active') {
                lis[i].classList.remove('active');
                lis[i + 1].classList.add('active');
                break;
            }
        }
    })
}