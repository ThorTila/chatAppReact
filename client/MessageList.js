import React from 'react';
import styles from './MessageList.css';

const Message = props => (
  <div className={(props.name === props.from ? styles.MessageRight : '') + ' ' + styles.Message}>
    <strong>{props.from} : </strong>
    <span>{props.text}</span>
  </div>
);

class MessageList extends React.Component {
  constructor() {
    super();
  }
  componentDidUpdate() {
    let element = this.el;
    if(element.clientHeight < element.scrollHeight) {
          element.scrollTop = element.scrollHeight;
    }
  }
  render() {
    return (
      <div 
        className={styles.MessageList}
        ref={ref => this.el = ref}
        >
    {
      this.props.messages.map((message, i) => {
        return (
          <Message
            key={i}
            from={message.from}
            text={message.text}
            name={this.props.name}
          />
        );
      })
    }
  </div>
    );
  }
}
/* const MessageList = props => (
  <div className={styles.MessageList}>
    {
      props.messages.map((message, i) => {
        return (
          <Message
            key={i}
            ref={ref => ref = i}
            from={message.from}
            text={message.text}
            name={props.name}
          />
        );
      })
    }
  </div>
); */

export default MessageList;