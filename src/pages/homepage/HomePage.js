import React, { Component } from 'react';
import styles from './HomePage.css';
import TopicList from '../topicList/TopicList';
import ReportPage from '../reportPage/reportPage';
import NewsPage from '../newsPage/newsPage';
import UserPage from '../userPage/userPage';

class HomePage extends Component{
  constructor(props){
    super(props);
    this.state={
      pageType: 'index'//index首页,report发布,news消息,user用户
    }
  }
  changeView = (text) => {
    this.setState({pageType:text});
  }
  render(){
    return (
      <div className={styles.page}>
        <Header text='首页'/>
        {this.state.pageType==='index'&&<TopicList/>}
        {this.state.pageType==='report'&&<ReportPage/>}
        {this.state.pageType==='news'&&<NewsPage/>}
        {this.state.pageType==='user'&&<UserPage/>}
        <NavList pageType = {this.state.pageType} changeView={this.changeView}/>
      </div>
    );
  }

}

function Header(props){
  return(
    <div className={styles.header}>{props.text}</div>
  )
}
function NavList(props){
  return(
    <ul className={styles.NavList}>
      <NavBtn isShow={props.pageType==='index'} type='index' icon='&#xe62f;' text='首页' changeView={props.changeView}/>
      <NavBtn isShow={props.pageType==='report'} type='report' icon='&#xe645;' text='发表' changeView={props.changeView}/>
      <NavBtn isShow={props.pageType==='news'} type='news' icon='&#xe665;' text='消息' changeView={props.changeView}/>
      <NavBtn isShow={props.pageType==='user'} type='user' icon='&#xe886;' text='我的' changeView={props.changeView}/>
    </ul>
  )
}
function NavBtn(props){
  return(
    <li className={styles.item+' '+(props.isShow&&styles.active)}>
      <span onClick={()=>props.changeView(props.type)}><div className={styles.iconfont}>{props.icon}</div>{props.text}</span>
    </li>
    
  )
}

HomePage.propTypes = {
};

export default HomePage;
