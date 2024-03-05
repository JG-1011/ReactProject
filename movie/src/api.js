export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 6,
}) {
  // 주소값에 ?하고 뒤에 붙는 옵션들 적어주는 거임
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(
    `https://learn.codeit.kr/api/film-reviews?${query}`
  );
  const body = await response.json();
  return body;
}
