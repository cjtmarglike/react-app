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
          const title = e.target.title.value
          const body = e.target.body.value
          props.onCreate(title, body)
        }}>
          <p><input name='title' type='text' placeholder='topic'></input></p>
          <p><textarea name='body' type='textarea' placeholder='tell me all about it'></textarea></p>
          <p><input type='submit' value='Create'></input></p>
        </form>
      </article>
}
function Update(props) {
  const [title, setTitle] = useState(props.title)
  const [body, setBody] = useState(props.body)
  return <article>
        <h2>Update</h2>
        <form onSubmit={(e)=>{
          e.preventDefault()
          /* when not using state */
          // const title = e.target.title.value
          // const body = e.target.body.value
          props.onUpdate(title, body)
        }}>
          {/* Ways to set value without using onChange func */}
          {/* mutable field ? use defaultValue(as below) : add readOnly */}
          {/* <p><input name='title' type='text' placeholder='title' defaultValue={props.title}></input></p>
          <p><input name='body' type='textarea' placeholder='body' defaultValue={props.body}></input></p> */}
          <p><input name='title' type='text' placeholder='topic' value={title} onChange={(e)=>{
            e.preventDefault();
            setTitle(e.target.value);
          }}></input></p>
          <p><textarea name='body' placeholder='what was that again?' value={body} onChange={(e)=>{
            e.preventDefault();
            setBody(e.target.value);
          }}></textarea></p>
          <p><input type='submit' value='Update'></input></p>
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
  const [newId, setNewId] = useState(4);
  const [topics, setTopics] = useState([
    {id: 1, title: 'html', body: 'html is...'},
    {id: 2, title: 'css', body: 'css is...'},
    {id: 3, title: 'javascript', body: 'javascript is...'}
  ])
  let content = null;
  let contextControll = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if (mode === 'READ') {
    const t = topics.find(topic=>topic.id === id)
    content = <Article title={t.title} body={"Hello, " + t.body}></Article>
    contextControll = <>
      <li>
        <a href={"/update/" + id} onClick={(e)=>{
          e.preventDefault()
          setMode('UPDATE')
        }}>Update</a>
      </li>
      <li>
        <button onClick={()=>{
          const newTopics = topics.filter(topic=>topic.id !== id)
          setTopics(newTopics)
          setId(null)
          setMode('WELCOME')
        }}>Delete</button>
      </li>
  </>
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body)=>{
      let copiedTopics = [...topics]
      const newTopic = {
        id: newId, title: _title, body: _body
      }
      copiedTopics.push(newTopic)
      setTopics(copiedTopics)
      setId(newId)
      setNewId(newId + 1)
      setMode('READ')
    }}></Create>
  } else if (mode === 'UPDATE') {
    const updateTopic = topics.find(topic=>topic.id === id)
    let curTitle = updateTopic?.title
    let curBody =  updateTopic?.body
    content = <Update title={curTitle} body={curBody} onUpdate={(_title, _body)=>{
        let updatedTopics = [...topics]
        updatedTopics.forEach(topic=>{
          if (topic.id === id) {
            topic.title = _title
            topic.body = _body
          }
        })
        setTopics(updatedTopics)
        setMode('READ')
    }}></Update>
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
      <ul>
        <li>
          <a href="/create" onClick={(e)=>{
            e.preventDefault()
            setMode('CREATE')
          }}>Create</a>
        </li>
        { contextControll }
      </ul>
    </div>
  );
}

export default App;