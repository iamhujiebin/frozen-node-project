import {Row, Col, Button, Drawer, message, Input, Avatar, List, Radio} from 'antd';
import ReactPlayer from "react-player";
// import {MusicList} from "./musicList";
import "./index.scss"
import {useEffect, useState} from "react";
import {http} from "@/utils";

const {Search} = Input

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
    const [musicIdx, setMusicIdx] = useState(0)
    // const lyric = MusicList[musicId].lyric
    const [musicList, setMusicList] = useState([{"name": "你好", "artist": "Frozen", "cover": "", "lyric": ""}])
    const [currentLyric, setCurrentLyric] = useState([])
    const [matchedTimeIndex, setMatchTimeIndex] = useState([])
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [playing, setPlaying] = useState(false)
    const [searchData, setSearchData] = useState([])
    const [searchListData, setSearchListData] = useState([])
    const [playlistId, setPlaylistId] = useState(0)
    const [playlist, setPlaylist] = useState([])
    useEffect(() => {
        document.body.style.overflow = "hidden" // 防止移动端下拉刷新。进入页面时给body添加行类样式 overflow:hidden
        return () => {
            document.body.style.overflow = "visible" //离开页面时给body还原 overflow 为默认值
        }
    }, [])
    useEffect(() => {
        http.get(`/music/list?playlistId=${playlistId}`).then(r => {
            const list = r.data ? r.data : []
            setMusicList(list)
            if (list.length > 0) {
                setMusicIdx(0)
            }
        }).catch(e => message.error("fail").then())
    }, [playlistId])
    const fetchMusicList = () => {
        http.get("/music/list").then(r => {
            const list = r.data ? r.data : []
            setMusicList(list)
        }).catch(e => message.error("fail").then())
    }
    const fetchPlayList = () => {
        http.get("/music/author/list").then(r => {
            const list = r.data ? r.data : []
            setPlaylist(list)
        }).catch(e => message.error("fail").then())
    }
    const showDrawer = () => {
        fetchPlayList()
        setOpen(true)
    };
    const onClose = () => {
        setOpen(false)
    };
    const showDrawer1 = () => {
        setOpen1(true)
    };
    const onClose1 = () => {
        setOpen1(false)
    };
    const showDrawer2 = () => {
        setOpen2(true)
    };
    const onClose2 = () => {
        setOpen2(false)
    };
    const handleReady = () => {
        // console.log("视频准备就绪")
    }

    const handleStart = () => {
        setPlaying(true)
    }

    const handlePause = () => {
        console.log("视频暂停")
        getCurrentLyric()
    }

    const handleEnded = () => {
        nextSong()
    }
    const handleError = (e) => {
        message.error(`${musicList[musicIdx].name}无法加载`).then()
        nextSong()
    }
    const handleProgress = (e) => {
        getCurrentLyric(e.playedSeconds)
    }
    const nextSong = () => {
        let nextId = musicIdx + 1
        if (nextId >= musicList.length) {
            nextId = 0
        }
        setMusicIdx(nextId)
    }
    const previousSong = () => {
        let nextId = musicIdx - 1
        if (nextId < 0) {
            nextId = musicList.length - 1
        }
        setMusicIdx(nextId)
    }
    const chooseSong = (id) => {
        setMusicIdx(id)
        setOpen(false)
        setPlaying(true)
    }
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
    const getCurrentLyric = (currentTime) => {
        const lyricsArray = musicList[musicIdx].lyric.split('\n').map(i => i.replace('[', '').split(']'));
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

        let nextLyric = [];
        if (matchedTimeIndexArray.length < lyricsTimeArray.length - 1) {
            nextLyric.push(lyricsMap.get(lyricsTimeArray[matchedTimeIndexArray[matchedTimeIndexArray.length - 1] + 1]))
            nextLyric.push(lyricsMap.get(lyricsTimeArray[matchedTimeIndexArray[matchedTimeIndexArray.length - 1] + 2]))
        }

        if (matchedTimeIndexArray.length > 3) {
            matchedTimeIndexArray = matchedTimeIndexArray.slice(matchedTimeIndexArray.length - 3);
        }

        const currentLyrics = [];
        for (let index of matchedTimeIndexArray) {
            currentLyrics.push(lyricsMap.get(lyricsTimeArray[index]));
        }
        if (nextLyric.length > 0) {
            currentLyrics.push(...nextLyric);
        }
        setCurrentLyric(currentLyrics)
        setMatchTimeIndex(matchedTimeIndexArray)
    }
    const onSearch = (value) => {
        http.get(`/music/search?q=${value}`).then(r => {
            const list = r.data ? r.data : []
            setSearchData(list)
        }).catch(e => message.error("fail").then())
    }
    const onSearchList = (value) => {
        http.get(`/music/author/search?q=${value}`).then(r => {
            const list = r.data ? r.data : []
            setSearchListData(list)
            showDrawer()
        }).catch(e => message.error("fail").then())
    }
    const downMusic = (id) => {
        http.get(`/music/down?id=${id}`).then(r => {
            fetchMusicList()
            setOpen1(false)
            setPlaying(true)
        }).catch(e => message.error("fail").then())
    }
    const downMusicList = (id, name, desc, pic) => {
        http.post(`/music/author/down`, {id: id, name: name, desc: desc, pic: pic}).then(r => {
            setOpen2(false)
            showDrawer()
        }).catch(e => message.error("fail").then())
    }
    return (
        <>
            <Drawer title="音乐清单" placement="right" onClose={onClose} open={open}>
                <Radio.Group
                    optionType="button"
                    value={playlistId}
                    onChange={(e) => {
                        setPlaylistId(e.target.value);
                    }}
                >
                    {playlist.map((item) => (
                        <Radio.Button key={item.id} value={item.id}>
                            {item.name}
                        </Radio.Button>
                    ))}
                </Radio.Group>
                {/*{*/}
                {/*    musicList.map((item, index) => (*/}
                {/*        <p className={'pick'} key={index}*/}
                {/*           onClick={() => chooseSong(index)}>{item.name}</p>*/}
                {/*    ))*/}
                {/*}*/}
                <List
                    itemLayout="horizontal"
                    dataSource={musicList}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a onClick={() => chooseSong(index)}>{item.name}</a>}
                                description={`歌手:${item.artist}`}
                            />
                        </List.Item>
                    )}
                />
            </Drawer>
            <Drawer title="音乐搜索" placement="right" onClose={onClose1} open={open1}>
                <Search
                    placeholder="input search text"
                    onSearch={onSearch}
                    style={{
                        width: "100%",
                    }}
                />
                <List
                    itemLayout="horizontal"
                    dataSource={searchData}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                // avatar={<Avatar
                                //     src={item.cover}/>}
                                title={<a onClick={() => downMusic(item.id)}>{item.name}</a>}
                                description={`歌手:${item.artist} 时长:${item.duration}`}
                            />
                        </List.Item>
                    )}
                />
            </Drawer>
            <Drawer title="歌单搜索" placement="right" onClose={onClose2} open={open2}>
                <Search
                    placeholder="input search text"
                    onSearch={onSearchList}
                    style={{
                        width: "100%",
                    }}
                />
                <List
                    itemLayout="horizontal"
                    dataSource={searchListData}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar
                                    src={item.pic}/>}
                                title={<a
                                    onClick={() => downMusicList(item.id, item.name, item.desc, item.pic)}>{item.name}</a>}
                                description={`${item.desc}`}
                            />
                        </List.Item>
                    )}
                />
            </Drawer>
            <div className='show-component'>
                <div>
                    <Row justify='center' type='flex'>
                        <Col className='music-cover music-cover-vertical'>
                            <img src={musicList[musicIdx].cover}/>
                        </Col>
                    </Row>
                    <Row justify='center' type='flex' className='text-center'>
                        <Col className='music-info music-info-vertical'>
                            <h1>{musicList[musicIdx].name}</h1>
                            <h2>{musicList[musicIdx].artist}</h2>
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
                            height={'auto'}
                            config={reactPlayerStyle}
                            url={musicList[musicIdx].url}
                            playing={playing}
                            loop={false}
                            controls={true}
                            volume={1}
                            onReady={handleReady}
                            onStart={handleStart}
                            onPause={handlePause}
                            onEnded={handleEnded}
                            onError={handleError}
                            onProgress={(e) => handleProgress(e)}
                        />
                    </Row>
                    <Row justify='center' type='flex'>
                        <Button onClick={previousSong}>上一首</Button>
                        <Button onClick={nextSong}>下一首</Button>
                        <Button onClick={showDrawer}>选歌</Button>
                        <Button onClick={showDrawer1}>搜歌</Button>
                        <Button onClick={showDrawer2}>搜歌手</Button>
                    </Row>
                </div>
            </div>
        </>)
}

export default Music