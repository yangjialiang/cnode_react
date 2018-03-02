import {Component} from 'react';
import { getInfo } from '../../common/axiosUtil';
import BScroll from 'better-scroll';
import styles from './TopicList.css';

export default class TopicList extends Component{
  constructor(props){
    super(props);
    this.state={
      listType:'all',//请求类型
      page:1,//请求页数
      refreshTips:false,//列表更新提示
      listUpdate:false,//判断是否在更新中
      allLoaded:false,//判断是否到达底部
      dataList:[],//数据列表
      listBtn: [{type:'all',text:'全部'},{type:'good',text:'精选'},{type:'share',text:'分享'},{type:'ask',text:'问答'},{type:'job',text:'招聘'},{type:'dev',text:'测试'}]
    }
  }
  lineAni = (index) => {
    this.setState((prevState)=>{
      return{listType:prevState.listBtn[index].type,dataList:[],refreshTips:true};
    })
    this.line.style.transform='translate('+(index*100)+'%,0)';
    this.resetList(this.state.listBtn[index].type);
  }
  componentDidMount(){
    this.resetList();
    const wrapper = document.querySelector('#List');
    this.scroll = new BScroll(wrapper, {
      click: true,
      pullDownRefresh: true,
      pullUpLoad: true,
    });
    
    this.scroll.on('pullingDown', () => {
      this.setState({refreshTips:true});
      this.resetList();
    });
    this.scroll.on('pullingUp', () => {
      this.loadMore();
    });
  }
  componentDidUpdate(){
    if (this.state.listUpdate) {
      this.setState({
        refreshTips:false,
        listUpdate:false
      })
      this.scroll.finishPullDown();
      this.scroll.finishPullUp();
      this.scroll.refresh();
    }
  }
  loadMore=(listType)=> {
    // 上拉加载更多
    this.setState((prevState)=>{
      return{page:prevState.page+1}
    })
    getInfo(
      'https://cnodejs.org/api/v1/topics?', {
        page: this.state.page,
        tab: listType || this.state.listType
      }, (data) => {
        if (data.success) {
          this.setState((prevState)=>{
            return{
              dataList:[...prevState.dataList,...data.data],
              listUpdate:true
            }
          })
          if (data.data.length === 0) {
            this.setState({allLoaded:true});
          } else {
            this.setState({allLoaded:false});
          }
        }
      }
    );
  }
  resetList = (listType) => {
    // 列表初始化
    this.setState({page:1,allLoaded:false});
    getInfo(
      'https://cnodejs.org/api/v1/topics?',
      {
        page: this.state.page,
        tab: listType || this.state.listType
      },
      (data) => {
        if (data.success) {
          this.setState({
            listUpdate:true,
            refreshTips: false,
            dataList:data.data,
          })
        }
      }
    );
    if(this.scroll){
      this.scroll.scrollTo(0, 0);
    }
  }
  render(){
    return (
      <div className={styles.TopicListCon}>
        <ul className={styles.listBtnCon}>
          <ListBtn list={this.state.listBtn} changeState={this.lineAni}/>
          <div ref={(input)=>{this.line=input}}></div>
        </ul>
        <div id='List' className={styles.listCon}>
          <div>
            {this.state.refreshTips&&(<div className={styles.refreshTips}><span><div></div> 正在刷新...</span></div>)}
            {this.state.dataList.length>0&&this.state.dataList.map((obj,index)=>{
              return <List key={obj.id+index} obj={obj}/>
            })}
            {!this.state.refreshTips&&!this.state.allLoaded&& (<div className={styles.refreshTips}><span><div></div> 加载中...</span></div>)}
            {this.state.allLoaded&&(<div className={styles.refreshTips}><span> 全部加载完啦^_^</span></div>)}
          </div>
        </div>
      </div>
    )
  }
}
//文章类型选项按键
function ListBtn(props){
  return(
    props.list.map((item,index)=>{
      return (<li key={'listBtn'+index}  onClick={()=>props.changeState(index)}><span>{item.text}</span></li>)
    })
  )
}
//文章列表
function List(props){
  return (
    <div className={styles.list}>
      <div className={styles.header} style={{backgroundImage:'url('+props.obj.author.avatar_url+')'}}>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          {props.obj.title}
        </div>
        <div className={styles.tab}>
          {props.obj.author.loginname}
        </div>
      </div>
    </div>);
}
