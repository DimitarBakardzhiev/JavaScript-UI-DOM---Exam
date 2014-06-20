function createImagesPreviewer(selector, items) {
    var container = document.querySelector(selector);
    var lDiv = document.createElement('div'),
        rDiv = document.createElement('div'),
        fragment = document.createDocumentFragment(),
        filter = document.createElement('input'),
        image = document.createElement('img'),
        title = document.createElement('h1'),
        filterSpan = document.createElement('span'),
        listItemContainer = document.createElement('div');

    listItemContainer.className = 'list-item-container';
    filterSpan.innerText = 'Filter';
    image.className = 'img';
    image.style.width = 155 + 'px';
    image.style.borderRadius = 10 + 'px';
    title.className = 'list-titles';
    title.style.margin = 0;


    //fill rDiv
    fragment.appendChild(filterSpan);
    fragment.appendChild(filter);
    for (var i = 0, len = items.length; i < len; i++) {
        var titles = title.cloneNode(true),
            img = image.cloneNode(true),
            itemContainer = listItemContainer.cloneNode(true);
        titles.innerHTML = items[i].title;
        img.src = items[i].url;
        if (i === 0) {
            itemContainer.id = 'first';
        }
        itemContainer.appendChild(titles);
        itemContainer.appendChild(img);
        itemContainer.addEventListener('mouseover', function () {
            this.style.background = '#ccc';
        });
        itemContainer.addEventListener('mouseout', function () {
            this.style.background = '';
        });
        itemContainer.addEventListener('click', function () {
            lDiv.innerHTML = '';
            lDiv.appendChild(this.firstChild.cloneNode(true));
            lDiv.appendChild(this.lastChild.cloneNode(true));
            lDiv.lastChild.style.width = 600 + 'px';
            lDiv.lastChild.style.borderRadius = 25 + 'px';
        });
        fragment.appendChild(itemContainer);
    }

    rDiv.style.textAlign = 'center';
    rDiv.style.width = 180 + 'px';
    rDiv.style.height = 500 + 'px';
    rDiv.style.overflowY = 'scroll';
    rDiv.style.position = 'absolute';
    rDiv.style.left = 750 + 'px';
    lDiv.style.width = 600 + 'px';
    lDiv.style.height = 500 + 'px';
    lDiv.style.position = 'absolute';
    lDiv.style.left = 130 + 'px';
    lDiv.style.top = 50 + 'px';
    lDiv.style.textAlign = 'center';
    filter.type = 'text';
    filter.id = 'filter';

    rDiv.appendChild(fragment);
    document.body.appendChild(rDiv);

    lDiv.appendChild(document.getElementById('first').firstChild.cloneNode(true));
    lDiv.appendChild(document.getElementById('first').lastChild.cloneNode(true));
    lDiv.lastChild.style.width = 600 + 'px';

    filter.addEventListener('keyup', function () {
        var divs = rDiv.querySelectorAll('div');
        for (var i = 0, len = divs.length; i < len; i++) {
            divs[i].style.display = 'block';
        }

        var val = this.value;
        for (var i = 0, len = divs.length; i < len; i++) {
            var title = divs[i].firstChild.innerText;
            if (title.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) === -1) {
                divs[i].style.display = 'none';
            }
        }
    });

    document.body.appendChild(lDiv);
}