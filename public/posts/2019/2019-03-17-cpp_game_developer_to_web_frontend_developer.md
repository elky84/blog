---
layout: post
title: C++ 게임 서버 개발자의 웹 프론트엔드 적응기
date: 2019-03-17
categories: [주절주절]
tags: [게임개발,웹개발]
comments: true
---

## 개요

다른 언어도 몇년간 실무에 썼음에도, 난 아직도 C++이 아직도 가장 익숙한 언어다.

C++을 제외하고, 내가 가장 적응하기 쉬웠던 다른 언어는 C#과 루비다.

사실 파이썬은 indent 강제에 대한 거부감이 크게 작용해서 기피했었는데, 막상 업무상 필요해서 써보니 indent 강제는 장점도 많았고, 루비와 비슷한 측면도 꽤 많아서 (다른 측면도 매우 많지만) 쉽게 적응할 수 있었다.

사실 의외로 자바는 적응하기 힘들었는데, 이는 다른 글에서 몇 번 언급한 자바 개발자들의 문화와 규칙 때문이었다. 하지만, 이는 게임 서버도 나름의 규칙과 접근, 룰이 이해할 수 있는 부분이었다.

또 다른 어려웠던 점은 자바의 발전 속도가 더뎌 다른 언어에서 이미 사용하던 기능 여럿을 쓸 수 없었고, 어노테이션 같은 확장 기능으로 커버해도 여타 언어만큼 편의성을 제공하지도 못한 자바를 (타의로) 사용하게 되고 나서 보니, 불편함 덩어리라서 굳이 이걸 각 잡고 배워야하는 가에 대한 회의감도 함께 했음을 고백한다.

여하튼 그렇게 웹 개발, 플랫폼 개발에 발을 들였는데 처음 발을 들였을 때는 플랫폼과 백엔드 작업으로 한정짓다보니 자바에 비중이 높았고, 시간이 약이라고 나도 자바에 어느정도는 익숙해져가고 있었다.

---

## 마주치게 된 현실, 적응을 위한 노력

그러던 와중 합류한 팀에서 1-tier 개발을 한다고 하더라. 그래서 자바 스크립트도 배워야 했는데, 나는 [Jscript](https://ko.wikipedia.org/wiki/J%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8)라는 Java Script의 윈도우 스크립트 엔진으로 써본게 다였다보니, 조금 걱정이 됐다.

다행히 Admin Tool 작업을 몇번 하다가, 본격적으로 frontend 작업을 하게 됐는데, 이 마저도 몇번의 작업은 국지적인 수정이라서 다행이었다.

하지만 무언가 수정 사항이나 기능 개발, 이슈 확인을 위해선 자바 스크립트 코드를 읽어야 되는 상황을 맞이하게 됐고, 이 부담감을 지워내기 위해 본격적인 학습에 돌입했다.

그렇게 만든 것이 [Community Board](https://github.com/elky84/community_board) 였다.
Vue.js를 팀 내부적으로 사용하고 있었고, 나도 이에 맞춰 복습 및 경험치 획득을 위해 만들게 됐다. 

이렇게 데브 토이로 Vue.js를 썼음에도, 자바 스크립트 자체에 대한 낮은 숙련도는 계속 업무적 비효율로 이어지고 있었고, 스트레스의 원인 중 하나가 됐다.

그러던 차에 업무적으로 진행된 서비스 하나가, backend/frontend 중에 선택 가능한 상황이 됐고, 나는 여기서 자바스크립트 숙련도 향상을 위해 frontend를 선택하게 됐다.

그 결과 확실히 거부감이 많이 줄어들었고, 익숙해졌고, 그만큼 많은 감상이 들었다.

1. 자바 스크립트 자체는 linter가 없인 너무 큰 자유도로 코드 가독성이 들쭉날쭉해지기 쉽상이라는 것.
   * 이를 해소하기 위한 방법으로 linter와 framework를 사용함으로써 팀 규칙대로 코드를 작성하게 (반)강제하고, 다양한 스타일의 난립을 억제하려 하는 것 같다.
2. 자바 스크립트 자체는 아직도 불편하지만, lodash 같은 편의성 높은 패키지로 대체하고, [module counts](http://www.modulecounts.com/) 의 최다 패키지 보유 플랫폼 답게, 수많은 기능을 가져다 사용해서 개발 공수를 낮출 수 있다는 것
   * download 카운트가 높다고해서, 딱히 완성도 있거나, 깔끔하게 동작하지만은 않았다.
   * 초기에 만들어진 패키지라 다운로드 수가 많고, 이후에도 낚인 사람이 많아서 높은 download 수인 경우가 많으니 이 점에 주의하라.
3. 웹 프론트엔드에선 (변환기로써 구현되는 경우를 제외하면) 사실상 javascript가 필수나 다름없다보니 javascript 자체에 익숙해지려고 노력해온게 frontend 개발자 다수의 선택이고, 그렇다보니 javascript 자체의 점유율이 늘고 있다.
   * 앞으로의 javascript 성장세는 미지수지만, frontend에서라도 확고한 위치는 확실하다는 것
   * 개인적으로는 backend에서의 성장세는 꺾였고, 더 늘진 않을 것이라고 생각한다.
4. JSON을 다루는 것이 너무나도 편하다는 것.
   * 애초에 Java Script Object Notation의 약자가 말해주듯, 다루기 너무 쉽다. 다른 동적언어보다도 훨씬 쉽다.
5. 역시 동적 언어는 까다롭다는 점.
   * 여러 번 언급한 얘기지만, 동적 언어는 테스트 코드로 이를 커버해야 한다.
   * 하지만 아래에 언급할 프론트엔드가 단위 테스트를 작성하기 상대적으로 까다롭고, 내가 익숙하지 못한 이유도 있다.
   * 또한 단위 테스트로 커버를 한다고 해도, 정적 언어보다 실수할 여지, 놓치는 부분이 있을 여지는 압도적으로 많다.
6. 자동화 테스트에 대한 해결책은 아직 갖추지 못했다. 남들은 다 잘 하는 것 같은데, 내 프론트엔드 테스트 코드는 제로에 가깝다.
   * 이는 자바 스크립트의 문제라기 보단, 프론트엔드 단위 테스트, 자동화 테스트가 로직 테스트보다 어려운 문제에 가깝다.
   * 아직 이 문제에 대한 완벽한 해결책을 갖지 못한 것이 큰 아쉬움.

결과적으로 아주 좋은 경험이었는데, 내가 가진 자바스크립트라는 언어 자체에 대한 편견을 조금 내려 놓는다면, 그만큼 많은 성장과 시야가 넓어지는 계기가 될 수 있을 거라는 생각이 들었다.
또한 아직은 몇가지 편견을 버리지 못했다. 언어적 한계로, backend에 어울리지 못하는 언어라는 생각. Node.js처럼 학습 코스트는 높을대로 높고, 언어적 한계는 명확히 가졌고, 자유도 마저 쥐어줘서 생기는 복잡도에 대한 리스크가 내가 가진 편견이다.
이 편견을 과연 깰 수 있을지는 잘 모르겠다. 나는 아직도 여전히, 프레임워크가 도와준다해도 동적 언어가 가질 수 있는 안정성은 한계가 있다고 생각하기 때문이다.

---

## 마치며

반면 frontend로 한정 짓는다면 패키지를 조합해서 해결 할 수 있는 문제가 아주 많았다. 프레임워크도 훌륭하고, 관련한 레퍼런스나 질의 응답도 많아서, 해결책이 존재하는 편이었다. HTML 코드와 자바스크립트 코드간의 연동도 프레임워크가 적정선으로 끌어내려준 느낌을 확실히 받을 수 있었다.
과거의 노가다스러웠다던 frontend 개발을 모르지만, 적어도 지금의 frontend 개발 환경은 충분히 장점이 많았다. Webpack의 도움도 아주 아주 편하고 좋은 개발 환경에 보탬이 됐다고 할 수 있겠다.

아직은 내가 frontend 개발자라는 말을 꺼내기엔 경험치도, 이해도도 부족하지만, 그럼에도 서비스 하나에 frontend를 온전히 구현하고 나서의 감상을 꼭 한번 정리하고 싶었다.

내가 게임 클라이언트에서도 재미를 느꼈던 만큼, frontend도 꽤나 재밌었다.

두번째, 세번째 경험도, 또 요구 사항이 조금 더 복잡한 경험도 해보고 싶을 만큼 재밌는 요소가 많았기에, 멀지 않은 시기에 다음 기회도 있었으면 하는 바램이다.