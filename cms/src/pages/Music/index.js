import {Row, Col} from 'antd';
import ReactPlayer from "react-player";
import {MusicList} from "./musicList";
import "./index.scss"
import {useState} from "react";

const audioStyle = {
    margin: "10px",
    width: '100%',
    height: '30px',
    // backgroundColor: 'red',
};

const reactPlayerStyle = {
    file: {
        attributes: {
            style: audioStyle
        }
    }
};

const Music = () => {
    const currentMusic = MusicList[1]
    const lyric = currentMusic.lyric
    const [currentLyric, setCurrentLyric] = useState([])
    const [matchedTimeIndex, setMatchTimeIndex] = useState([])
    const handleReady = () => {
        console.log("视频准备就绪")
    }

    const handleStart = () => {
        console.log("视频开始播放")
    }

    const handlePause = () => {
        console.log("视频暂停")
        getCurrentLyric()
    }

    const handleEnded = () => {
        console.log("视频播放结束")
    }
    const handleProgress = (e) => {
        console.log(e)
        getCurrentLyric(e.playedSeconds)
    }
    const formatTime = (value) => {
        const minArray = value.toString().split(':');
        const min = minArray[0];
        const secArray = minArray[1].split('.');
        const sec = secArray[0];
        const mill = secArray[1];
        return Number(min * 60) + Number(sec) + Number(mill / 100);
    }
    const getCurrentLyric = (currentTime) => {
        const lyricsArray = lyric.split('\n').map(i => i.replace('[', '').split(']'));
        const lyricsMap = new Map(lyricsArray);
        const lyricsTimeArray = Array.from(lyricsMap.keys());
        let matchedTimeIndexArray = [];

        for (let time of lyricsMap.keys()) {
            let ft = formatTime(time);
            if (ft <= currentTime) {
                let index = lyricsTimeArray.findIndex((value) => (value === time));
                matchedTimeIndexArray.push(index);
            }
        }

        if (matchedTimeIndexArray.length < 3) {
            matchedTimeIndexArray = [0, 1, 2];
        }

        let nextLyric = '';
        if (matchedTimeIndexArray.length < lyricsTimeArray.length) {
            nextLyric = lyricsMap.get(lyricsTimeArray[matchedTimeIndexArray[matchedTimeIndexArray.length - 1] + 1]);
        }

        if (matchedTimeIndexArray.length > 3) {
            matchedTimeIndexArray = matchedTimeIndexArray.slice(matchedTimeIndexArray.length - 3);
        }

        const currentLyrics = [];
        for (let index of matchedTimeIndexArray) {
            currentLyrics.push(lyricsMap.get(lyricsTimeArray[index]));
        }
        if (nextLyric) {
            currentLyrics.push(nextLyric);
        }
        console.log("currentLyrics:", currentLyrics)
        setCurrentLyric(currentLyrics)
        setMatchTimeIndex(matchedTimeIndexArray)
    }
    return (
        <>
            <div className='show-component'>
                <div>
                    <Row justify='center' type='flex'>
                        <Col className='music-cover music-cover-vertical'>
                            <img src={currentMusic.cover}/>
                        </Col>
                    </Row>
                    <Row justify='center' type='flex' className='text-center'>
                        <Col className='music-info music-info-vertical'>
                            <h1>{currentMusic.title}</h1>
                            <h2>{currentMusic.singer}</h2>
                        </Col>
                    </Row>
                    {currentLyric.map((item, index) => (
                        <Row key={index} justify='center' type='flex'>
                            <Col
                                className={index === 2 && matchedTimeIndex[0] !== 0 ? 'lyric-item active' : 'lyric-item inactive'}>
                                {item}
                            </Col>
                        </Row>
                    ))}
                    <Row justify='center' type='flex' className='text-center'>
                        <ReactPlayer
                            config={reactPlayerStyle}
                            url={currentMusic.url}
                            playing={false}
                            loop={true}
                            controls={true}
                            volume={0.5}
                            onReady={handleReady}
                            onStart={handleStart}
                            onPause={handlePause}
                            onEnded={handleEnded}
                            onProgress={(e) => handleProgress(e)}
                        />
                    </Row>
                </div>
            </div>
        </>)
}

export default Music