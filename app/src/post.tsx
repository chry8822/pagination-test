import React,{ useState, useEffect,useRef } from 'react';
import styled from 'styled-components'
import Pagination from './Pagination';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

const Label = styled.label`
  text-align : center;
`;

const TopButton = styled.button`
  position: fixed;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: grey;
  color: black;
  font-weight : bold;
  font-size: 15px;
  opacity: 0.5;
  bottom: 50px;
  right: 10px;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const Posts = () => {

    const viewPointRef = useRef<HTMLDivElement>(null)
    // 페이지 변경시 

    const [posts, setPosts] = useState([]);
    // 게시물 데이터
    const [limit, setLimit] = useState(10);
    // 페이지당 보여질 데이터 (기본값 10)
    const [page, setPage] = useState(1);
    // 페이지 정보
    const offset = (page - 1) * limit;
    // 페이지당 첫 게시문의 위치
    // 페이지넘버 - 1 * 페이지당 보여질 데이터
    // 1페이지 일 경우 (1 - 1) * 10 = 0 이므로 0번째 인덱스에 첫 번째 게시물이 위치
    // 2페이지 일 경우 (2 - 1) * 10 = 10 이브로 10번째 인덱스에 첫번째 게시물이 위치
    // limit 데이터가 12 일 경우
    // (2 - 1) * 12 = 12 번째 인덱스에 첫번째 게시물이 위치

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data))
    },[]);

    useEffect(()=> {
        viewPointRef.current?.scrollIntoView();
    },[page])
    //  숫자 페이지 버튼 클릭시 화면 하단

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // },[page])
    

    return (
        <Layout>
            <header>
                <h1>게시물 목록</h1>
            </header>

            <Label>
                페이지 당 표시할 게시물수
                <br />
                <select
                    typeof='number'    
                    value={limit}
                    onChange={(e)=>{
                        const value = e.target.value
                        setLimit(Number(value))
                    }}
                    // onChange={({ target: {value} }) => setLimit(Number(value))}
                    // onChange에 event가 들어오고 event안에 target 이 있고
                    // const { target } = event 로 target을 가져올수 있고
                    // onChange={({ target : {value} }) => } 
                    // event 에서 target을 그리고 target 에서 value 를 꺼네온거
                >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </Label>

            <main>
                {posts.slice(offset, offset + limit).map(({ id, title, body })=> (
                    // 1페이지 기준 posts 개시물에서 offset = 0, offset + limit = 10
                    // (0번째부터 10까지(2번째 인자인 10의 값은 포함하지 않는다)) 
                    // 10개의 개시물을 map으로 렌더링
                    <article key={id}>
                        <h3>
                            {id}, {title}
                        </h3>
                        <p>{body}</p>
                    </article>
                ))}
                {/* 페이지당 보여질 게시물 렌더링(limit = 보여질 갯수, offset = 게시물 시작 위치) */}
            </main>
            {/* 
                2페이지 기준 
                    offset = ( 2 - 1 ) * limit(10) = 10;
                    offset(10) + limit(10) = 20
                    posts.slice(10, 20) 10 번째 부터 19 번째 까지의 데이터를 map으로 렌더링
            */}



            <footer>
                <Pagination
                total={posts.length}
                limit={limit}
                page={page}
                setPage={setPage}
                />
                <TopButton
                    onClick={()=> {
                        window.scrollTo(0,0)
                    }}
                >Top</TopButton>
                <div ref={viewPointRef}></div>
            </footer>
        </Layout>
    )
}

export default Posts;