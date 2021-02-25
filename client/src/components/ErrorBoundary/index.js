import React, { Component } from 'react';
import './index.less';

export default class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flag: false
    };
  }

  static getDerivedStateFromError(error) {
    console.log(121212)
    return {
      flag: true
    }
  }

  /* error: 抛出的错误
   * info: 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息
  */
  componentDidCatch(error, info) {
    console.log(121212)

    return {
      flag: true
    }
    
  }

  render() {
    console.log(this.state.flag,"error-error")

    return (
      <div>
        {this.state.flag ? <h1 className='mk-error-page'>网络异常，请稍后再试！</h1> : this.props.children}
      </div>
    )
  }
}