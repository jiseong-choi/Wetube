import React,{useEffect} from 'react'
import {Tooltip ,Icon} from 'antd'
import Axios from 'axios'

function LikeDislikes(props) {

    const variable = {

    }

    if (props.Video) {
        variable = {videoId: props.videoId, userId:props.userId }
    } else {
        //variable = {commentId :, userId:}
    }

    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success) {
                    
                } else {
                    alert('likes의 정보를 가져오지 못했습니다.')
                }
            })
    }, [])

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme="filled"
                        onClick
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>1</span>
            </span>
        <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme="outlined"
                        onClick
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>1</span>
            </span>
            </div>
    )
}

export default LikeDislikes
