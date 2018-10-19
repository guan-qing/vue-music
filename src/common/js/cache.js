import storage from 'good-storage';

const SEARCH_KEY = '__search__';
const SEARCH_MAX_LENGTH = 15;

const PLAY_KEY = '__play__';
const PLAY_MAX_LENGTH = 200;

const FAVORITE_KEY = '__favorite__';
const FAVORITE_MAX_LENGTH = 200;

function insertArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare);
    if (index === 0) {
        return;
    }
    if (index > 0) {
        arr.splice(index, 1);
    }
    arr.unshift(val);//在数组开头添加数据
    if (maxLen && arr.length > maxLen) {
        arr.pop();
    }
}

export function saveSearch(query) {
    let searches = storage.get(SEARCH_KEY, []);
    insertArray(searches, query, (item) => {
        return item === query;
    }, SEARCH_MAX_LENGTH);
    storage.set(SEARCH_KEY, searches);
    return searches;
}

// 从缓存中获取原保存的数据
export function loadSearch() {
    return storage.get(SEARCH_KEY, []);
}

// 从数组中删除一个指定纪录
function deleteFormArray(arr, compare) {
    const index = arr.findIndex(compare);
    if (index > -1) {
        arr.splice(index, 1)
    }
}

export function deleteSearch(query) {
    let searches = storage.get(SEARCH_KEY, []);
    deleteFormArray(searches, (item) => {
        return item === query;
    });

    storage.set(SEARCH_KEY, searches);
    return searches;
}

export function clearSearch() {
    storage.remove(SEARCH_KEY);
    return [];
}

export function savePlay(song) {
    let songs = storage.get(PLAY_KEY, []);
    insertArray(songs, song, (item) => {
        return item.id === song.id;
    }, PLAY_MAX_LENGTH);

    storage.set(PLAY_KEY, songs);
    return songs;
}

export function loadPlay() {
    return storage.get(PLAY_KEY, []);
}

export function saveFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, []);
    insertArray(songs, song, (item) => {
        return item.id === song.id;
    }, FAVORITE_MAX_LENGTH);
    storage.set(FAVORITE_KEY, songs);
    return songs;
}

export function deleteFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, []);
    deleteFormArray(songs, (item) => {
        return item.id === song.id;
    })
    storage.set(FAVORITE_KEY, songs);
    return songs;
}

export function loadFavorite() {
    return storage.get(FAVORITE_KEY, []);
}

