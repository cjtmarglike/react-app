import logo from './logo.svg';
import './App.css';
function Header(props) {
  return <header>
  <h1><a href="/">{props.title}</a></h1>
</header>
}
function Nav(props) {
  let list = props.topics.map((topic) => 
    <li key={topic.id}><a href={"/read/" + topic.id}>{topic.title}</a></li>
  )
  console.log(list)
  return <nav>
        <ol>
          {list}
        </ol>
      </nav>
}
function Article() {
  return <article>
        <h2>Welcome</h2>
        Hello, WEB
      </article>
}
function App() {
  const topics = [
    {id: 1, title: 'html', body: 'html is...'},
    {id: 2, title: 'css', body: 'css is...'},
    {id: 3, title: 'javascript', body: 'javascript is...'}
  ]
  return (
    <div>
      <Header title="WEB"></Header> 
      <Nav topics={topics}></Nav> 
      <Article></Article> 
    </div>
  );
}

export default App;
