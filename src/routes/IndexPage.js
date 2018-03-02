import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

function IndexPage(props) {
  console.log(props.users);
  return (
    <div className={styles.normal}>
      <h1 className={styles.title} onClick={()=>props.dispatch({ type: 'users/fetch', payload: {page:2} })}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};
function getMessage(state){
  return{users:state.users}
}


export default connect(getMessage)(IndexPage);
