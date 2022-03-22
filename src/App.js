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
function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={(e)=>{
      e.preventDefault()
      props.onCreate(e.target.title.value, e.target.body.value)
    }}>
      <p>
        <input name="title" type="text" placeholder='title'></input>
      </p>
      <p>
        <textarea name="body" placeholder='body'></textarea>
      </p>
      <p>
        <input type='submit' value='Create'></input>
      </p>
    </form>
  </article>
}
function App() {
  // const _mode = useState('WELCOME');
  // const mode = _mode[0];
  // const setMode = _mode[1];
  //useState리턴값인 배열의 0번째 요소는 mode, 1번째 요소는 setMode란 뜻이구나
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [topics, setTopics] = useState([
    {id: 1, title: 'html', body: 'html is...'},
    {id: 2, title: 'css', body: 'css is...'},
    {id: 3, title: 'javascript', body: 'javascript is...'}
  ])
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
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body)=>{
      let copiedTopics = [...topics]
      const newId = topics.length + 1
      const newTopic = {
        id: newId, title: _title, body: _body
      }
      copiedTopics.push(newTopic)
      setTopics(updatedTopics)
      setId(newId)
      setMode('READ')
    }}></Create>
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
      <a href="/create" onClick={(e)=>{
        e.preventDefault()
        setMode('CREATE')
      }}>Create</a>
    </div>
  );
}

export default App;
