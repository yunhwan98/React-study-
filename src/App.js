import logo from './logo.svg';
import './App.css';
import  {useState} from 'react'; //state 사용

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
          props.onChangeMode(Number(event.target.id));  //event를 동작시킨 태그의 id
          //문자가 된 데이터를 숫자로 변환  
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

function Create(props){  //Create 컴포넌트 생성
  //텍스트 제목과 텍스트 영역, Create 버튼 생성
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value; //event target은 form 태그 지칭
      const body = event.target.body.value;
      props.onCreate(title,body);
    }}>
      <p><input type="text" name="title" placeholder="title"/></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"></input></p> 
    </form>
  </article>

}


function App() {
  //const _mode = useState('WELCOME');  //mode의 값에 따라 본문 변화
  //const mode = _mode[0];  //상태의 값 읽기 가능
  //const setMode = _mode[1]; //mode의 값을 바꿀 수 있음
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] =useState(4); //state의 초기값의 id가 4
  const [topics, setTopics] = useState([ //state로 승격시키기
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'},
  ]);
  let content = null;
  if(mode === 'WELCOME'){ //mode의 따라 결정
      content = <Article title="Welcome" body="Hello, WEB"></Article>
  }else if(mode === 'READ'){
      let title, body = null;
      for(let i=0; i<topics.length; i++){ //topics.id와 id state가 일치하면 title,body 값 설정
        console.log(topics[i].id, id);
        if(topics[i].id === id){
            title = topics[i].title;
            body = topics[i].body;
        }
      }
      content = <Article title={title} body={body}></Article>

  }else if(mode === 'CREATE'){
      content = <Create onCreate={(_title, _body)=>{  //Create버튼 눌렀을 때 실행함수
      const newTopic = {id:nextId,title:_title, body:_body} 
      const newTopics = [...topics] //복제본을 생성
      newTopics.push(newTopic);//복제본에 추가
      setTopics(newTopics); //새로들어온 데이터가 기존과 다르다면 컴포넌트 다시 실행
      setMode('READ'); //상세 페이지 이동
      setId(nextId);  
      setNextId(nextId+1);  //다음에 글을 추가할 때 대비
      }}></Create>

  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{ // onChangeMode prop값으로 함수 호출, function() == ()=>
        setMode('WELCOME');  //값을 바꿀 때는 setMode
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{  //id값을 입력받는 함수 호출
        setMode('READ');      //값을 바꿀 때는 setMode
        setId(_id);   //_id값이 바뀌면 컴포넌트가 새로 실행되며 새로운 id값 지정 해줌
      }}></Nav>
      {content}
      <a href = "/create" onClick={event=>{
        event.preventDefault(); //url 바뀌는 것 방지
        setMode('CREATE');
      }}>Create</a>
    </div>
  );
}

export default App;
