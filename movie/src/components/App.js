import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";
import { getReviews } from "../api";

const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]); // 아이템을 불러오기 위해서
  const [order, setOrder] = useState("createdAt"); // 정렬을 위해서
  const [offset, setOffet] = useState(0); // 페이지네이션을 위해서
  const [hasNext, setHasNext] = useState(false); // 페이지네이션에서 마지막 부분 처리하기 위해서
  const [isLoading, setIsLoading] = useState(false); // 더보기를 한번에 여러번 눌러버리면 request요청이 여러번이 나감 그걸 방지하기 위해

  const sortItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      result = await getReviews(options);
    } catch (error) {
      console.error(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const { reviews, paging } = result;
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((preItems) => [...preItems, ...reviews]);
    }
    setOffet(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  // useEffect를 호출하면 바로 콜백함수를 실행하는 것이 아니라 렌더링이 끝나면 실행한다
  // 이때 디펜던시리스트도 기억해둔다
  // handleLoad() 가 실행되고 위에 있는 handleLoad()안에 setItems가 실행되면서 다시 렌더링이 된다
  // 다시 렌더링이 되면 디펜던시리스트에 있는 부분과 앞에서 기억했던 값이랑 비교한다
  // 앞에 있는 값이랑 비교했을 때 다를 때만 디펜던시리스트를 실행한다. > 디펜던시값이 바뀔 때만 렌더링 한다!!
  // 최신순에서 별점순을 누르면 최신순(앞에 있는 값)이랑 별점순은 다르기 때문에 디펜던시리스트를 실행

  //useEffect를 통해 서버에서 정렬한 데이터를 받아오는 이유
  //데이터의 개수가 많은 경우에 일부 데이터만 받아오게 되는데요 (예를들어서 42개 중에 10개만 받아오는 식)
  //만약에 리뷰 평점 순으로 정렬한 다음에 제일 높은 순으로 10개를 가져오려면 이건 서버에서 정렬을 해줘야 합니다.

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT }); //콜백함수 부분
  }, [order]); // 디펜던시리스트 부분

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>별점순</button>
      </div>
      <ReviewList items={sortItems} onDelete={handleDelete} />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
    </div>
  );
}

export default App;
