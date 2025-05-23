---
layout: post
title: L4 스위치 도입시 생겼던 이야기
date: 2018-08-19
categories: [네트워크]
tags: [네트워크,L4스위치]
comments: true
---

예전 회사 이야기다.

적어도 나는 알지 못하던 상태에서 L4 스위치가 점검 시간에 도입이 됐다.

네트워크 트래픽 제어는 기존 라우터에서 중간 L4 스위치를 하나 더 거치게 됐다.

나로썬 왜 되입되는지 이유를 알 수 없었다. 왜냐면 TCP 서버이다보니 로드밸런싱의 주체는 로직이 들어간 우리 게임 서버 일부이기 때문이다.

브로드 캐스팅 대상을 좁히기 위함이라고 생각하면 그럴순 있을 것 같았다.
나중에야 알게 된 사실이지만, 개발팀 누구도 L4 스위치 도입시 검토해야 될 이슈나, 설정 값 검토, QA 서버에 선 도입 해볼 생각을 하지 못했고, 그렇게 위험을 감지도 불안정한 상태에서 L4는 도입됐다.

도입되자마자 이슈가 터졌고, 커넥션 유실이 두 종류가 발생했다.

1. 디비 커넥션 유실  
하나는 디비 커넥션이 끊어지면서, 나약하게 짜여져 있던 ODBC를 이용하는 코드에서 무한루프가 돈 것이다.
장애가 나고나서야 덤프를 떠서 확인하고, 처리했다.  
DB 서버와 게임 서버간의 커넥션이 끊어지는 일이 없어서 발생하지 않았던, 코드 자체의 while 문 조건이 잘못되어있던 코드의 문제였다.

2. 사용자와의 커넥션 유실  
L4 스위치 자체에서 일정 시간 이상 지난 커넥션을 자동으로 제거했기 때문이다. 제거 원인은 배포된 클라이언트나 서버에서 지정된 KeepAlive 패킷을 주고 받는 주기보다 L4 스위치에서의 KeepAlive 유효성 판단 주기가 짧아 발생했다.

이 값을 늘림으로써 임시적으로 해결됐지만, 과연 이 장비 도입 이슈가 적절했는가에 대한 생각을 떨칠 수 없었다.

이런 장애를 겪고나니 인프라, 네트워크에 대한 궁금증이 생겨나기 시작했다.

---

아주 간단히 설명하자면, 내가 관리하는 최상단 라우터까지 들어올 수 있는 대역폭은 계약 및 인프라에 달려있다.

이게 초당 10GB라고 하자. 그리고 내 라우터가 처리할 수 있는 데이터가 마찬가지로 10GB로 치자.
깔끔해보이는가?

잘못됐다. 내 라우터는 그 밑에 물려있는 장치마다 브로드캐스트를 거친 뒤에야 적절한 대상지를 정할 수 있다.

라우터 내부 통신에서도 대역폭을 사용한다.

그러므로 외부 트래픽 유입+내부 트래픽+대상지 선정을 위한 브로드캐스트를 합친 양이 라우터보다 커야 한다.

스위치는 주로 로드밸런싱이나, 경로 탐색 코스트를 낮추기 위해 사용한다.
같은 스위치 내에서의 통신은 라우터의 대역폭을 사용하지 않고 통신 할 수 있기 때문이다.

>즉 L4 스위치 도입 자체가 문제는 아니나, 내부통신보다는 외부 통신이 많은 경우에는 로드밸런싱의 잇점을 이외에는 얻을 수 없었는데, 이마저도 장비의 설정값과 어플리케이션 설정값 간의 검토가 필요했는데 이 절차 없이 바로 실기에 도입된 것은 철저히 엔지니어링 관점에서 큰 실수라고 할 수 있었다.

---

>로드 밸런싱은 웹서버에서 좀 더 적절하다. 특히 스케일 아웃이야 그렇다쳐도, 스케일 인에서는 어플리케이션 레이어의 커넥션 스위칭 이슈, 처리중이던 메모리 데이터 이전 등의 복잡한 문제들을 해결을 위한 많은 준비가 이루어져야 하기에 그렇다.  
>
>무중단 패치가 웹 서버에서 훨씬 쉬운 것은 stateless한 경우가 많기 때문이다.  
>반면 TCP 서버에 도입하려 할때는 많은 검토와 검증이 이루어져야 했다.

특히 이미 L7 로드밸런서가 존재하는 상황에서 그 앞단의 로드밸런서는 큰 의미가 없기도하다.
내부 트래픽 감소를 위한 결정이었다손 치더라도 서버 프로그래머와의 소통없이 이루어진 도입은 운이 좋아 문제가 없을 순 있어도, 장애 가능성이 지나치게 높았던 전형적인 인재가 아닌가 싶다.

또한 내부 트래픽 감소가 그렇게 큰 가치가 있는 상태의 게임 서버 구조가 아니었다. 서버간 통신은 극도로 적은 편이었고 대다수 트래픽은 라우터를 거치는 외부 트래픽이었기 때문이다.

결론적으로 이해도가 부족한 상태에서의 무리한 도입은 리스크이고, 사건 사고를 불러온다는 결론을 내릴 수 있었다. 이 과정에서 내가 부족했던 네트워크 장치에 대한 이해도를 부분적으로나마 보충하고자 하는 계기가 됐고, 전체적인 네트워크 아키텍쳐를 구성하는 데에 도움이 되긴했으나 여러모로 씁쓸 할 수 밖에 없는 사건이었다.