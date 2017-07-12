'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initTag = undefined;

var _util = require('./util');

var initTag = function initTag() {
    var contentJSON = void 0,
        tagMap = new Map();
    getTagInfo();

    // get tag info
    function getTagInfo() {
        // jsInfo is from js-info.ejs
        var tagURL = jsInfo.root + 'content.json?t=' + +new Date();
        var xhr = new XMLHttpRequest();
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
        var _this = this;

        var _loop = function _loop(postIndex) {
            var currPostTags = contentJSON[postIndex].tags;
            if (currPostTags.length) {
                currPostTags.forEach(function (tag) {
                    if (tagMap.has(tag.name)) {
                        var addedIndex = tagMap.get(tag.name) + ',' + postIndex.toString();
                        tagMap.set(tag.name, addedIndex);
                    } else {
                        tagMap.set(tag.name, postIndex.toString());
                    }
                }, _this);
            }
        };

        for (var postIndex = 0; postIndex < contentJSON.length; postIndex++) {
            _loop(postIndex);
        }
    }

    // change model to dom
    function createTagDom(post) {
        var item = document.createElement('li');
        item.className = 'tag-post-item';
        var itemDate = document.createElement('span');
        itemDate.className = 'archive-post-date';
        itemDate.innerHTML = _util.tinkerUtil.dateFormater(new Date(Date.parse(post.date)), 'yyyy-MM-dd');
        var itemTitle = document.createElement('a');
        itemTitle.className = 'archive-post-title';
        itemTitle.href = jsInfo.root + post.path;
        itemTitle.innerHTML = post.title;
        item.appendChild(itemDate);
        item.appendChild(itemTitle);
        return item;
    }

    document.getElementsByClassName('sidebar-tags-name')[0].addEventListener('click', function (event) {
        event.preventDefault();
        var realTarget = event.target;
        var realTagName = void 0;
        if (this.compareDocumentPosition(realTarget) & 16) {
            if (realTarget.tagName === 'SPAN') {
                realTagName = realTarget.firstChild.innerHTML;
            } else {
                realTagName = realTarget.innerHTML;
            }
        }
        var indexs = tagMap.get(realTagName);
        if (!indexs) {
            return;
        }
        var indexsArr = indexs.split(',');
        // append lists
        var frag = document.createDocumentFragment(),
            postList = document.getElementsByClassName('sidebar-tag-list')[0];
        postList.innerHTML = '';
        indexsArr.forEach(function (item) {
            frag.appendChild(createTagDom(contentJSON[item]));
        });
        postList.appendChild(frag);
    });
};

exports.initTag = initTag;