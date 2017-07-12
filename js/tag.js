import {
    tinkerUtil
} from './util';

let initTag = function () {
    let contentJSON,
        tagMap = new Map();
    getTagInfo();

    // get tag info
    function getTagInfo() {
        // jsInfo is from js-info.ejs
        let tagURL = jsInfo.root + 'content.json?t=' + (+ new Date());
        let xhr = new XMLHttpRequest();
        xhr.responseType = '';
        xhr.open('get', tagURL, true);
        xhr.onload = function () {
            if (this.status == 200 || this.status == 304) {
                contentJSON = JSON.parse(this.responseText);
                initTagMap(contentJSON);
            }
        };
        xhr.send();
    }

    // init tagMap
    function initTagMap(contentJSON) {
        for (let postIndex = 0; postIndex < contentJSON.length; postIndex++) {
            let currPostTags = contentJSON[postIndex].tags;
            if (currPostTags.length) {
                currPostTags.forEach(function (tag) {
                    if (tagMap.has(tag.name)) {
                        let addedIndex = tagMap.get(tag.name) + ',' + postIndex.toString();
                        tagMap.set(tag.name, addedIndex);
                    } else {
                        tagMap.set(tag.name, postIndex.toString());
                    }
                }, this);
            }
        }
    }

    // change model to dom
    function createTagDom(post) {
        let item = document.createElement('li');
        item.className = 'tag-post-item';
        let itemDate = document.createElement('span');
        itemDate.className = 'archive-post-date';
        itemDate.innerHTML = tinkerUtil.dateFormater(new Date(Date.parse(post.date)), 'yyyy-MM-dd');
        let itemTitle = document.createElement('a');
        itemTitle.className = 'archive-post-title';
        itemTitle.href = jsInfo.root + post.path;
        itemTitle.innerHTML = post.title;
        item.appendChild(itemDate);
        item.appendChild(itemTitle);
        return item;
    }

    document.getElementsByClassName('sidebar-tags-name')[0].addEventListener('click', function (event) {
        event.preventDefault();
        let realTarget = event.target;
        let realTagName;
        if (this.compareDocumentPosition(realTarget) & 16) {
            if (realTarget.tagName === 'SPAN') {
                realTagName = realTarget.firstChild.innerHTML;
            } else {
                realTagName = realTarget.innerHTML;
            }
        }
        let indexs = tagMap.get(realTagName);
        if (!indexs) {
            return;
        }
        let indexsArr = indexs.split(',');
        // append lists
        let frag = document.createDocumentFragment(),
            postList = document.getElementsByClassName('sidebar-tag-list')[0];
        postList.innerHTML = '';
        indexsArr.forEach(function (item) {
            frag.appendChild(createTagDom(contentJSON[item]));
        });
        postList.appendChild(frag);
    });
};




export {
    initTag
};