import React, { useState, useEffect } from 'react';
import { Button ,Toast} from 'antd-mobile';
import Http from '../../../../utils/http';

export default function (props) {
  const [state, setState] = useState()

  useEffect(() => {

  }, [])
  const handlePay = async ()=>{
    const  result = await Http({
      url:"/orders/pay",
      body:{
        id:props.id
      }
    })
    if(result){
      Toast.success("支付成功")
      window.location.reload()
    }else{
      Toast.success("支付失败")
    }

  }

  const renderPay = () => {
    switch (props.type) {
      case 0:
        return <Button type='warning' size='small' onClick={handlePay}>去支付</Button>
      case 1:
        return <Button size='small'>已完成</Button>
      default:
        break;
    }
  };

  return (
    <div className='order-item'>
      <img alt='order' src={props?.house?.imgs[0]?.url} />
      <div className='center'>
        <div className='title'>{props?.house?.name}</div>
        <div className='price'>￥{props?.house?.price}</div>
        <div className='time'>{props?.house?.createTime}</div>
      </div>
      <div className='pay'>
        {renderPay()}
      </div>
    </div>
  )
}