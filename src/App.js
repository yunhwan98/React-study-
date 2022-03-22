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

function Update(props){
  const [title, setTitle] =useState(props.title); //props에 들어온 title에서 state로
  const [body, setBody] =useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value; //event target은 form 태그 지칭
      const body = event.target.body.value;
      props.onUpdate(title,body);
    }}>
      <p><input type="text" name="title" placeholder="title" value={title} onChange={event=>{//state를 value값으로 줌
          setTitle(event.target.value); //새로 입력할때 마다 setTitle지정, 컴포넌트 다시 실행

      }}/></p>
      <p><textarea name="body" placeholder="body" value={body} onChange={event=>{//state를 value값으로 줌
          setBody(event.target.value); //새로 입력할때 마다 setTitle지정, 컴포넌트 다시 실행

      }}></textarea></p>
      <p><input type="submit" value="Update"></input></p> 
    </form>
  </article>
  //기존 내용이 저장되게 value값을 설정해줌
  //react에서는 값을 입력할 때마다 onChange 발생

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
  let contextControl = null;
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
      contextControl = <li><a href ={'/update/'+id} onClick={event=>{
          event.preventDefault();
          setMode('UPDATE');  //mode를 UPDATE로 변경
      }}>Update</a></li> //mode가 READ일 때만 나타나기
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
  }else if(mode === 'UPDATE'){
    //title과 body 알아내기 위해 앞의 코드 복사
    let title, body = null;
      for(let i=0; i<topics.length; i++){ //topics.id와 id state가 일치하면 title,body 값 설정
        console.log(topics[i].id, id);
        if(topics[i].id === id){
            title = topics[i].title;
            body = topics[i].body;
        }
      }
    content = <Update title={title} body={body} onUpdate={(title,body)=>{
        console.log(title,body);
        const newTopics = [...topics]  //기존 토픽 복제
        const updatedTopic = {id:id, title:title, body:body}  //수정할 토픽 생성
        for(let i=0; i<newTopics.length; i++){  //기존토픽과 일치하는 id찾기
          if(newTopics[i].id === id){
            newTopics[i] = updatedTopic;
            break;
          }

        }
        setTopics(newTopics); //토픽이 바뀌면 컴포넌트 새로 실행
        setMode('READ');
    }}></Update>
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
      <ul>
        <li><a href = "/create" onClick={event=>{
          event.preventDefault(); //url 바뀌는 것 방지
          setMode('CREATE');
        }}>Create</a></li>
        {contextControl}
      </ul>
      
    </div>
  );
}

export default App;
