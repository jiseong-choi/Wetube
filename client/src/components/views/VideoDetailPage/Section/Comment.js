import Axios from 'axios'
import React,{useState} from 'react'

function Comment() {

    const [commentValue,setcommentValue] = useState("")

    const handleClick = (e) => {
        setcommentValue(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const variables = {
            content: ,
            writer: ,
            postId: ,

        }
        
        Axios.post('/api/comment/saveComment',variables)
    }
    
    return (
        <div>
            <br />
            <p>Replies</p>
            <hr /> 

            {/* Comment Lists */}
            
            {/* Root Comment Form */}

            <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder='댓글을 작성해 주세요'
                />
                <br />
                <button style={{width:'20%', height:'52px'}} onClick={onSubmit} >Submit</button>
            </form>
        </div>
    )
}

export default Comment
