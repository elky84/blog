---
layout: post
title: 게임 서버 개발과 웹 서버 개발의 차이
date: 2019-03-17
categories: [주절주절]
tags: [게임개발,웹개발]
comments: true
---

## 개요

늘 궁금했다. 웹 개발이란 어떤 것인지.

물론 이것저것 관심이 많다 보니, 임베디드, 보안, 인공지능 등 대부분 관심이 많지만, 좀 더 대중화 되고 컨텐츠 개발에서 주류에 있는 웹개발은 조금 더 궁금했다.

사실상 책 따라하기 수준의 방명록, 게시판 정도론 웹 개발자들이 어떻게 생각하고, 무엇을 중요시 여기고, 어떤 것을 잘해야 하고, 어떻게 일하는지 알 수 없었다.

그저 짐작을 할 뿐이나, 웹알못이 짐작하는 수준이라곤 게임 서버도 보이지 않는 backend 관점이니, 웹 백엔드와 큰 차이가 없을거라고 생각했다.

**결론부터 말하자면, 비슷하면서도 아주 많은 간극을 보인다.**

**특히 문제를 해결하는 방법, 중요시 여기는 가치, 기본기라 여기는 기준들 너무 많은 것이 달랐다.**

약간 과장해서, 다른 직업이라고 느껴질 정도로 달랐다. (과장이라고 표현했으나 나는 이렇게 생각하고 있다. 임베디드, 웹, 보안, 플랫폼, 게임 등...각 분야가 의외로 많은 차이를 보인다고 생각한다.)

## 고찰

왜 이런 차이가 생기는 걸까?

**웹의 발전은 브라우저 기반위에서 이루어졌다.**

**브라우저라함은 HTML 파서이자 뷰어라 할 수 있는데, 브라우저가 소화 가능한 규격으로만 통신해야 함을 의미한다.**

이를 주고 받기 위한 HTTP 프로토콜이 반론의 여지가 없는 표준이었다. 웹표준과 별개로 HTTP 프로토콜은 웹에선 빠르고, 당연하게 표준으로 자리 잡았다.

초창기 성능이나 네트웍 속도에 제약으로, 정적 페이지를 적극 사용했는데, 이는 소수의 관리자가 컨텐츠를 편집했기에 가능한 접근이었다.

반면 게임 서버는 커스텀한 클라이언트 프로그램인 게임을 위해 발전해왔다.
브라우저라는 제약이 없었고, 그러므로 반드시 HTTP 프로토콜을 사용할 필요는 없었다. 그렇다 보니, HTTP 프로토콜에서 소요되는 cost마저 아끼고 싶어했다. (소켓을 직접 통제하고, 헤더와 인증, 보안 처리 모두 커스텀하게 처리했음을 말한다.)

또한 HTTP 프로토콜의 특징인 connectionless, stateless는 게임에 어울리지 않았다.

이는 아래서 설명할 반응성이 웹보다 훨씬 중요하기 때문이다.

---

## 차이

당시에도 그랬고, 지금도 게임은 반응성이 웹보다 훨씬 더 중요한 분야다. connection을 맺고 끊는 비용, connection이 생성되고 필요한 작업을 위해 매번 db를 질의하는 비용 모두 줄여서라도 반응성을 유지하는 것이 더 중요했다.

그렇다보니 표준이 아닌, 게임 마다 다른 TCP 프로토콜 위에 게임별 프로토콜이 각기 다른 모습으로 구현됐다.

동적 컨텐츠인 게임은, 웹처럼 다수의 사용자에게 유사한 HTML 코드를 동일하게 전송할 수 없었고, 실시간으로 변동되는 데이터를 다뤄야했기에, 다른 방향으로 발전했다.

요새의 게임 개발에선 아닌 경우가 더 많아 졌지만, 내가 처음 게임 개발에 입문했을 때만해도, 패킷 만들 때 최소한의 비트를 사용하고, 어셈코드로 렌더링하며, 메모리 정렬 단위를 계산하며, 복사 연산을 최소화 하기 위한 코딩을 했어야 했다.

이는 제한된 서버 자원을 잘 활용해야만 동접이 높은 게임을 만들 수 있기 때문이다. 그 게임 내에서 수많은 동작이 실시간으로 이루어지는데, 이 로직들을 최대한 가볍게 짜고, 의도치 않은 큰 연산이 일어나지 않아야 렉이 생기지 않기 때문이다.

실제로 온라인 게임의 렉(latency)은 대부분 네트워크 환경으로 인한 문제보다는 서버 내부의 로직이 도는 시간보다 더 많은 처리 요청이 발생해 처리가 밀리면서 발생한 현상이었다. 멀티스레드로 구현하면서, 블러킹 포인트를 만들어 생기는 경우도 없었다고 할순 없겠다.

이는 패킷을 처리하고, 사용자에게 응답하기 까지의 시간을 유지하지 못하면 응답성이 떨어지며, 이 응답성이 게임 클라이언트가 허용한 범주보다 늦어지게 되면 사용자는 렉을 느끼게 된다. 이를 해결하는 방향성 중 하나는 모든 연산을 최저치로 낮출 수 있는 데로 낮추는 접근이었다고 말할 수 있겠다.

**게임에서는 반응속도와 함께, 데이터 무결성을 보장해주어야 한다. 게임 사용자는 조금의 지연도 용납해주지 않는다.**

내가 조금전 획득한 아이템이 10초후에 인벤토리에 들어온다고 치자. 사용자들은 바로 불편함과 우려를 표할 것이다. 아이템 시스템에 오류가 생긴것이 아닐까 불안해하며, 자신이 획득할 아이템에 대한 신뢰도마저 의심하곤 한다.

마찬가지로, 내가 싸우는 몬스터의 HP 감소가 10초후에 이루어진다면? 내 체력도 10초후에 감소 된다면? 사용자들은 해당 게임이 정상적이지 않고, 문제가 있다고 인지하는 상황이 된다.

그리고 만약 재접속 해야만 아이템 보상이 들어온다면? 현재 내 아이템 상황과, 내 눈에 보이는 상황이 달랐을 때 사용자들은 이 상황을 문제라고 인지하게 된다. 아마도 디아블로2의 복사 아이템 사건등을 겪은 사용자들이, 이런 현상이 아이템 복사 등으로 이어질지 모른다는 불안감도 한몫 해서 불안함을 갖기도 한다.

지연적인 아이템, 상태 반영이 해당 게임의 시스템적으로 구성되어있다면, 불편함과 비직관성으로 큰 비판을 받게될 요소다.

---

**반면 웹은 실제 디비에서 처리되고 있는 데이터보다 조금 예전 데이터를 주더라도 크게 문제 삼지 않는다.**

**그렇다보니 캐싱이 더 쉬워지고, 브라우저도 캐싱을 하며, 사용자도 이를 인정하고 새로운 데이터를 전달 받기 위해 새로고침을 직접 한다. (사용자들 마저 이 과정을 불쾌감으로, 오류로 받아들이지 않고 자연스럽게 받아들이는 것이 포인트다.)**

이는 훨씬 더 많은 사용자에게 컨텐츠를 제공하는 방향으로 발전할 수 있는 원동력이 되기도 했다. 캐싱과 스케일아웃이 유연할 수 있는 근거는, 지금 언급한 조금의 지연이 있는 데이터, 혹은 소수의 사용자가 편집한 데이터를 전달하는 것도 용인 될 수 있는 웹 환경이 그 근거다.

**애초에 데이터의 변화량/응답속도가 너무나도 중요한 가치인 게임과, 생산성/확장성이 더 중요한 웹은 궤를 달리 할 수 밖에 없었던 운명이었던 걸지도 모른다.**

이제와서 서로 간의 기술 융합과 응용이 이루어지고 있는 모습은 아주 긍정적이라고 생각한다. 이 흐름이 상대적으로 서버의 역할을 한정 지었던 모바일 게임에서의 웹 서버 기반의 서비스였긴 하지만, 그렇게 많은 게임 서버 개발자들이 웹 이해도가 늘었다.

---

## 마치며

다시금 모바일 게임도 MMORPG붐이 일면서, C++, C# TCP 게임 서버가 다시금 도입되고 있다. 최근 몇년간 게임 개발을 하고 있지 않아서 정확히 말하긴 어렵지만, 커스텀 게임 서버만으로 모든 컨텐츠를 만들어오던 과거와는 달리 이제는 적절한 지점에 웹서버도 이용하지 않을까 싶은 생각도 든다. 

트랜잭션 위주의 로직 서버로 웹 서버는 탁월한 선택이 될 수 있다. 또한 인게임 컨텐츠 중 일부(예를 들어 인게임 공략, 공지사항, 상점, 광고, 일부 이벤트 등)의 경우 웹 서버를 통해 구현하면 훨씬 더 수월하게 구현 가능하기도 하다.

또한, 게임마다 다른 내부 구조를 이해하지 않고도, 사용되는 웹 프레임워크만 이해하는 사람도, 부분적인 분업도 가능해지므로 이 또한 협업과 분업의 메리트가 생길 수 있는 부분이다.

또한 성능상의 이슈에서 상대적으로 자유로울 수 있는 컨텐츠 위주로 웹 서버를 이용한다면, 생산성 좋은 언어, 프레임워크를 선정할 수 있다는 장점도 있다.

그렇게 유연한 선택을 통해, 안정성과 생산성을 얻을 수 있다면, 좀 더 고민이 많이 필요하고, 시간이 많이 필요한 작업에서 필요한 시간을 버는 데에 쓸 수 있을 것이다. 

**게임 서버는 특수성으로 인해 웹서버만으로 모든 시스템을 구축/운용 하는 것도 안되고, 커스텀 TCP 서버는 생산성이 너무 떨어진다. 이제는 게임 서버 개발에서도 폴리글랏 아키텍쳐가 필요할 때가 아닐까?**
