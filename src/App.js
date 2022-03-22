import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props) {
  return <header>
  <h1><a href="/" onClick={(e)=>{
    e.preventDefault();
    props.onChangeMode();
  }}>{props.title}</a></h1>
</header>
}
function Nav(props) {
  let list = props.topics.map((topic) => 
    <li key={topic.id}>
      <a id={topic.id} href={"/read/" + topic.id} onClick={(e)=>{
        e.preventDefault();
        props.onChangeMode(Number(e.target.id));
      }}>{topic.title}</a>
    </li>
  )
  return <nav>
        <ol>
          {list}
        </ol>
      </nav>
}
function Article(props) {
  return <article>
        <h2>{props.title}</h2>
        {props.body}
      </article>
}
function App() {
  // const _mode = useState('WELCOME');
  // const mode = _mode[0];
  // const setMode = _mode[1];
  //useState리턴값인 배열의 0번째 요소는 mode, 1번째 요소는 setMode란 뜻이구나
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const topics = [
    {id: 1, title: 'html', body: 'html is...'},
    {id: 2, title: 'css', body: 'css is...'},
    {id: 3, title: 'javascript', body: 'javascript is...'}
  ]
  let content = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if (mode === 'READ') {
    // content = topics.filter(topic => topic.id.toString() === id)
    //   .map(rst => 
    //     {
    //       return <Article key={rst.id} title={rst.title} body={"Hello, " + rst.body}></Article>;
    //     }
    //   )
    let t = topics.filter(topic => topic.id === id)[0]
    content = <Article title={t.title} body={"Hello, " + t.body}></Article>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME')
      }}></Header> 
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ')
        setId(_id)
      }}></Nav> 
      {content}
    </div>
  );
}

export default App;
