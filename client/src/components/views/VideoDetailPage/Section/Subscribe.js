import React,{useEffect,useState} from 'react'
import {Button} from 'antd'
import Axios from 'axios'

function Subscribe(props) {
    let variable = { userTo:props.userTo}
    console.log(props.userTo)

    const [subscribeNumber,setsubscribeNumber] = useState(0)
    const [Subscribed,setSubscribed] = useState(false)

    useEffect(() => {
        Axios.post('/api/subscribe/subscribeNumber',variable)
            .then(response=>{
                if(response.data.success){
                    setsubscribeNumber(response.data.subscriberNumber)
                }else{
                    alert('구독자 수 정보를 받아오지 못했습니다.')
                }
            })

            let subscribedvariable = { userTo:props.userTo, userFrom:localStorage.getItem('userId') }

            Axios.post('/api/subscribe/subscribed', subscribedvariable)
                .then(response=>{
                    if(response.data.success){
                        setSubscribed(response.data.result)
                    }else{
                        alert('정보를 불러오지 못했습니다.')
                    }
                })
    }, [])

    const onSubscribe = (e) =>{
        e.preventDefault()
    }

    return (
        <div>
            <Button
                type="primary"
                size="large"
                style={{ backgroundColor:`${Subscribed ?'#AAAAAA':'#cc0000'}`,borderRadius:'4px',color:'white',padding:'10px 16px',fontWeight:'500',fontSize:'1rem',textTransform:'uppercase' }}
                onClick={onSubscribe}
            >
                {subscribeNumber} {Subscribed ? 'Subscribed':'Subscribe'}
            </Button>
        </div>
    )
}

export default Subscribe
