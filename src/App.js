import logo from './logo.svg';
import './App.css';

function Header(props){//컴포넌트 생성(대문자로 시작)
  return <header> 
  <h1><a href="/">{props.title}</a></h1> 
</header>

}
function Nav(props){
  const lis =[]
  for(let i=0; i<props.topics.length; i++){ //topics의 개수만큼 반복
      let t = props.topics[i]; 
      lis.push(<li key={t.id}><a href={'/read/'+t.id}>{t.title}</a></li>)  //lis에 하나씩 넣기, 동적으로 바뀔대상이 있으면 중괄호 사용
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
function Article(props){//props를 사용시 함수 외부에서 입력값으로 사용가능
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  const topics = [//topics를 배열 설정
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'},
  ]
  return (
    <div>
      <Header title="WEB"></Header>
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
      
    </div>
  );
}

export default App;
