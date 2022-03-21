import logo from './logo.svg';
import './App.css';

function Header(props){//컴포넌트 생성(대문자로 시작)
  return <header> 
  <h1><a href="/" onClick={(event)=>{ //event객체를 첫번째 파라미터로
      event.preventDefault(); //<a>태그 의 기본동작 방지-> reload 되지 않게
      props.onChangeMode(); // alert 호출
  }}>{props.title}</a></h1>   
</header>

}
function Nav(props){
  const lis =[]
  for(let i=0; i<props.topics.length; i++){ //topics의 개수만큼 반복
      let t = props.topics[i]; 
      lis.push(<li key={t.id}>
        <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{ //id값을 부여해주기
          event.preventDefault();
          props.onChangeMode(event.target.id);  //event를 동작시킨 태그의 id
        }}>{t.title}</a></li>)  //lis에 하나씩 넣기, 동적으로 바뀔대상이 있으면 중괄호 사용
      //<li>태그가 구별되도록 key값을 고유값으로 설정
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
      <Header title="WEB" onChangeMode={()=>{ // onChangeMode prop값으로 함수 호출, function() == ()=>
        alert('Header');
      }}></Header>
      <Nav topics={topics} onChangeMode={(id)=>{  //id값을 입력받는 함수 호출
        alert(id);
      }}></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
      
    </div>
  );
}

export default App;
