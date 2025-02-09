const fs = require("fs");
const RSS = require("rss");

const generateRSS = () => {
  // RSS 피드 초기화
  const feed = new RSS({
    title: "Elky's blog",
    description: "blog 블로그",
    feed_url: "https://elky84.github.io/blog/rss.xml",
    site_url: "https://elky84.github.io/blog",
    language: "ko",
    pubDate: new Date(),
  });

  // postsData.json 읽기
  const postsData = JSON.parse(fs.readFileSync("./public/postsData.json", "utf-8"));

  // 날짜 기준으로 내림차순 정렬
  const sortedData = postsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 정렬된 JSON 데이터로부터 RSS 아이템 추가
    sortedData.forEach((post) => {
      try {
        feed.item({
          title: post.title,
          description: `${post.title} - 태그: ${post.tags.join(", ")}`,
          url: `https://elky84.github.io/blog#/posts/${post.slug}`,
          date: post.date,
        });
      }
      catch (error) {
        console.error('Error parsing metadata:', error);
        console.error('Post: ', post);
      }  
  });

  // XML 파일로 저장
  const xml = feed.xml({ indent: true });
  fs.writeFileSync("./public/rss.xml", xml);
  console.log("RSS 피드 생성 완료: public/rss.xml");
};

generateRSS();
