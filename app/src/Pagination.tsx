import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button:any = styled.button`
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  color: black;
  font-size: 1rem;
  border: none;

  &:hover {
    background: grey;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: royalblue;
    font-weight: bold;
    cursor: revert;
    transform: revert;
    color: yellow;
  }
`;



interface PaginationProps {
    total: number,
    limit: number,
    page: number,
    setPage: any
}

const Pagination = ({ total, limit, page, setPage }:PaginationProps) => {
    const numPages = Math.ceil(total / limit);
    // 데이터 총 갯수를 limit 으로 나누고 반올림해서 총 페이지 갯수를 구함
    return (
        <>
            <Nav>
                <Button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)} 
                >
                    &lt;
                </Button>

                {Array(numPages).fill(undefined).map((_, i) => (
                        <Button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            aria-current={page === i + 1 ? "page" : null}
                        >
                         {i + 1}
                        </Button>
                ))}
                {/*
                    총 페이지 수만큼 배열을 만들고 클릭 시 해당 인덱스에서 + 1 된 페이지로 상태 업데이트

                */}
                <Button 
                    disabled={page === numPages}
                    onClick={() => setPage(page + 1)} 
                >
                 &gt;
                </Button>
            </Nav>
        </>
    )
}


export default Pagination;