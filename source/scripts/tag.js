'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initTag = undefined;

var _util = require('./util');

var initTag = function initTag() {
    var contentJSON = void 0,
        tagMap = new Map();
    initTagInfo();

    // 获取所有文章信息的json
    function initTagInfo() {
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

    // 建立map
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

    // 将对应的postInfo生成dom
    function createTagDom(postInfo) {
        var $tagItem = $('<li class="tag-post-item"><span class="archive-post-date">' + _util.archUtil.dateFormater(new Date(Date.parse(postInfo.date)), 'yyyy-MM-dd') + '</span></li>');
        var $aItem = $('<a class="archive-post-title" href="' + jsInfo.root + postInfo.path + '">' + postInfo.title + '</a>');
        $tagItem.append($aItem);
        return $tagItem;
    }

    //     
    $('.sidebar-tags-name:first').on('click', function (event) {
        event.preventDefault();
        var realTarget = event.target;
        var realTagName = void 0;

        // 点击大框可显示对应tag的文章
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
            frag.appendChild(createTagDom(contentJSON[item])[0]);
        });
        postList.appendChild(frag);
    });
};

exports.initTag = initTag;