const formatTime = (value) => {
    const minArray = value.toString().split(':');
    const min = minArray[0];
    if (minArray.length > 1) {
        const secArray = minArray[1].split('.');
        const sec = secArray[0];
        const mill = secArray[1];
        return Number(min * 60) + Number(sec) + Number(mill / 100);
    }
}

const lyric = "[00:00.00] 作词 : 九把刀\n" +
    "[00:00.15] 作曲 : 木村充利\n" +
    "[00:00.30] 编曲 : 侯志坚/林冠吟\n" +
    "[00:00.45] 制作人 : 薛忠铭\n" +
    "[00:00.60]\n" +
    "[00:18.21]又回到最初的起点\n" +
    "[00:21.16]记忆中你青涩的脸\n" +
    "[00:24.31]我们终于\n" +
    "[00:25.95]来到了这一天\n" +
    "[00:30.41]桌垫下的老照片\n" +
    "[00:33.56]无数回忆连结\n" +
    "[00:35.76]今天男孩要赴女孩最后的约"

const lyricArray = lyric.split('\n').map(i => i.replace('[', '').split(']'));

console.log(lyricArray)

const lyricsMap = new Map(lyricArray);
console.log(lyricsMap)
const lyricsTimeArray = Array.from(lyricsMap.keys());
console.log(lyricsTimeArray)

lyricsTimeArray.forEach((time) => {
    console.log(time, formatTime(time))
})
