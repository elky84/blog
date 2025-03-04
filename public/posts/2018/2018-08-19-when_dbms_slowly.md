---
layout: post
title: 100만건이상의 데이터를 다룰때 생기는 RDB성능 이야기
date: 2018-08-19
categories: [데이터베이스]
tags: [데이터베이스]
comments: true
---

나는 작은 온라인 게임회사에서 커리어를 시작했다.
MMORPG 클라이언트 개발자로 시작했던 나는, 길지 않은 시기에 회사가 매각되면서 자연스레 퇴사하게되었다.

그렇게 군입대를 준비하던 중 병역 특례 지정 업체였던 또 다른 온라인 게임 회사에 지원하게 됐고, 면접 과정을 통해 서버 프로그래머 전향을 권유 받으며, 서버 프로그래머로써의 커리어를 시작하게 됐다.

서버 프로그래머가 되었기에 자연스레 DB를 사용해야했는데, 그 당시 난 DB라고는 기본적인 쿼리정도 밖에 몰랐고, 데이터 저장소로만 사용하고 싶었는데 내 마음과 다르게 컨텐츠는 단순한 쿼리로만 구성하게끔 기획될리 없었다. 컨텐츠가 복잡해져갈수록 쿼리도 복잡해져갔다.

그렇다보니 DB는 점차 무거워져갔고, 자연스레 서버 이슈의 반절은 디비 이슈로 이어졌다.

100만건에 근접해져 갈수록 서버는 느려져갔고, 렉이 한둘 생겨나가기 시작했다.

동접은 3000가량을 왔다갔다했지만 누적된 데이터가 늘어날 수록 렉은 심해져갔다.

이에 대한 카운셀링은 나보다 디비를 훨씬 잘 아는 DBA 출신 서버 프로그래머 분이 많은 도움을 주셨다.

그분의 가르침에 따라 여러가지 작업을 수행했다.

* 쿼리 개수에 대한 통계, 쿼리 수행 시간에 대한 통계 기록
* 점검때마다 인덱스를 리빌드
* 레플리카를 통한 Read/Write 경합 감소
* 쿼리에 맞게끔 전수 검사를 통해서 인덱스를 설정
* 상황에 따라선 서버 메모리단의 캐싱 처리를 통한 DB 조회 이슈 감소
* 디비 로그도 남김으로써 서버 로그와 비교

*문제가 어디인지 파악할 수 있는 근거를 남기기 시작하자, 동접 대비 DB의 수용량이 결정됐고, baseline을 잡아 이 선이 넘어서는 데이터들을 상시 개선할 수 있는 근거가 됐으며, 이를 기반으로 서비스는 점차 안정화되어갔다.*

어떠한 컨텐츠는 서버에서의 호출 횟수를 줄인다거나, 쿼리를 단순화 한다던지 다양한 방식으로 튜닝해나갔으며, DB 관점에서도 단순한 쿼리를 의도하고 어플리케이션이 대신 처리해줄 수 있는 것은 넘김으로써 병목을 줄여나갔다.

데이터는 최대한 가비지가 덜 남는 방식으로 의도했으며, 우리가 사용하는 방식에 맞게끔 하드웨어 스펙을 재조정했다.

우리는 로그성 데이터를 제외하고는 데이터 건수가 적었으므로, 디스크와 RAM을 크게 확보했고 이는 곧 성능향상으로 이루어졌다.

이는 철저히 perfmon의 성능 카운터를 근거로 이루어졌기 때문에 실질적인 성능 향상으로 이어지는 결과를 맞이할 수 있었다.

---

그러고 난 뒤 나는 궁금해졌다.

>100만건이 넘어가면 성능 이슈가 스물스물 올라오기 시작했다. 이는 과연 우리프로젝트만 겪는 문제인가?  
>그렇진 않았다. 하드웨어 스펙에 따라 N은 달라질 수 있으나 RDB의 한계상 데이터 row 수에 따라 성능 이슈가 대두되었고, 각종 대책 (샤딩, 레플리카, 하드웨어 성능 확보, 쿼리수 감소, 쿼리 큐잉, redis와 같은 캐시 서버, nosql 도입 등)을 통해서 우회하고 있을 뿐이었다.

>100만건 이라는 수치가 직접적으로 언급되는 이유는 아마도, 100만건 이상의 테이블을 다룰 때 그런 테이블 여럿을 조인하거나 갱신해야 할 때 이슈가 많이 생겼음을 많은 개발자가 겪었다보니, 100만건이 마치 빅테이블의 기준처럼 불리게 된 것 같다.

물론 테이블 설계 및 예술적 쿼리 작성을 통한 해결도 있겠지만 이보다 다른 해결책을 통한 파훼가 더 합리적이라는 판단을 많이 한게 아닐까 싶다.

*실제로 DB의 성능 이슈를 복잡하디 복잡한 쿼리로 해결하려는 접근을 여전히 하는 곳은 많지만, 그 때 보다 더 많은 데이터를 다루는 요즘 웹 업체 (트위터, 페이스북, 넷플릭스, 구글 등)는 그런 접근으론 단기적인 대안밖에 될 수 없다는 것을 인지하지 않았나 싶다.*

---

사실 DB 성능 이슈를 겪고나서 더 많이 배우게 된 것은 지표 기반으로 판단하고 개선하기라 할 수 있었다.
그리고 그것들 간의 상관관계를 몸소 체험하면서, 생각의 폭이 넓어졌다.

이는 내 첫 서버 프로그래머 경험에서 가장 값인 수확이 아니었나 싶다.
이후에도 나는 계속 지표를 남기고 이를 기반으로 개선하는 작업의 중요성과 재미를 느끼게 됐으니 말이다.

지표는 누군가를 설득하기에도, 검증하기에도, 원인을 파악하기에도 유용하다.
엔지니어링의 기본이 지표라는 것을 깨닳고 나니 시야가 한층 넓어진 기분이었다.

또한 내가 다뤘던 게임 서버보다 더 많은 데이터 처리량을 소화하기 위해선 무엇을 해야 하는가에 대해서도 관심을 갖게 됐고, 이는 내가 학생 수준을 벗어나지 못한 풋내기 프로그래머에서, 소프트웨어 엔지니어로 성장하는데에 큰 도움을 준 계기가 되지 않았나 싶다.