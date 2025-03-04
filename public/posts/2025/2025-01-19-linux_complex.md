---
layout: post
title: 리눅스 컴플렉스
date: 2025-01-19
categories: [OS]
tags: [Windows, Linux, OS]
comments: true
---

# 개요
나는 게임 클라이언트 프로그래머 지망생이었다.

그리고 첫 취업을 한 2005년 당시에는 당연하게도 윈도우를 썼고, 윈도우용 게임을 개발해야 했으며, 클라이언트다 보니 당시 서버가 (당시엔 당연한 줄 알았지만 보기 드문)리눅스용 소켓서버였음에도 나는 윈도우만 썼다.

그리고 그게 전혀 이상하지 않았다.

나에게 리눅스란 먼 존재였다.

내가 직접 게임 서버를 개발한 시기에는 리눅스 서버가 아닌 윈도우 게임 서버를 썼기에, 리눅스를 잘 써야 할 상황은 없었다.

2014년까지의 나에게 리눅스는 먼 존재였고, 책에서 읽으면 리눅스에 대한 호기심이 생기긴 했지만, 업무에서 쓸 확률이 낮은 OS를 가볍게 쓰는 것 이외에는 하기 어려웠고, 파고들기엔 다른 중요한 것들이 너무나 많았다.

# 컴플렉스

나는 게임에서도 관심가는 게임이라면 찍먹이라도 해봐야 하는 성향이다.

현실적 이슈로 못할 지언정, 성향적으로 그렇다보니 리눅스에 대해 분명히 관심이 생겼는데 이를 해소하지 못한 불편함이 마음 한켠에 존재했다.

특히 IT 관련 서적을 읽을 때 마다, 해킹 관련 서적은 물론이고, 다양한 기술 서적의 실습에서도 제약이 따르는 기분을 지울 수가 없었다.

또한 리눅스와 유닉스의 그 문화를 공감하지 못한다는 것이 더욱 큰 아쉬움이자 불편한 마음을 만들었다.

# 해소

2015년 즈음 나는 루비 온 레일즈로 리눅스 환경에서 서비스를 배포하고, 처음으로 웹 서버로 게임을 서비스하게 됐다. 물론 게임 서버로써였고, API 서버에 가까웠으며, 나의 많은 업무 시간은 유니티 클라이언트 개발도 하다보니 리눅스 이해도가 높아지진 않았따.

2년여가 더 지낫 결국 여러가지 이유가 복합적이었지만 나는 플랫폼 개발자로 전향해보기로 했고, 마침 그 회사가 당시 트래픽이 많던 넷마블이었고, 심지어 그 부서가 Private Cloud를 개발하는 부서라서 인프라를 제공하는 과정에서 다양한 팀의 리눅스 환경 구성을 돕게 됐고, 이로 인해 나 역시 자연스레 리눅스 이해도가 극적으로 높아졌다.

메인 데스크탑은 여전히 윈도우였지만, 적어도 리눅스 서버에서 하게 되는 수 많은 작업이 나에게 리눅스 이해도를 높여줬다.

특히 당시만 해도 Docker가 활성화되기 전이라, daemonize와 배포 및 가동에 골치를 썩었는데 이러한 과정 역시 나에게 리눅스 이해도를 높여주게 됐다.

이 시기 쯤해서 홈 서버를 리눅스로 바꾸기 시작했다.

중간에 라즈베리 파이로 홈서버를 쓰기도 했으나 너무 저성능이라 결국 미니 PC로 바꾸긴 했지만, 라즈베리 파이 역시 리눅스를 깔아서 썼다.

여러 이슈를 겪으면서 막연한 두려움은 사라지고 훨씬 더 익숙해져서 나에게 서버는 리눅스가 더 익숙해지기까지 했는데, 이 과정으로 오는 과정에 리눅스 데스크탑 강제로 써보기, 맥만 쓰기 운동 등을 통해서 익숙하지 않은 환경을 강제화 하는 것도 크게 도움이 됐다.

# 마치며

리눅스는 나에게 있어 컴플렉스가 아니게 됐는데, 아마도 그렇게 된 시점이 내가 순혈 게임 개발자로 남는 길 보다, 다재다능한 제너럴 리스트가 되기로 마음 먹고, 노력하는 과정에서 극복 된 것 같다.

이미 익숙하고, 많은 경험을 쌓은 환경을 선호하는 것은 나 역시 마찬가지 였고, 배우는 것 까지는 좋아하는 개발자가 많지만, 익숙하지 않은 환경에서 낮은 퍼포먼스가 날 때의 저항감을 이겨내는 것이 쉽지 않은데, 나는 이 과정을 전향과, 집에서의 Dev Toy와 학습, 회사에서도 가능한 상황에선 강제로 OS를 바꿔서 사용해보며 극복하고자 했었다.

순혈 게임 서버 개발자는 평생 윈도우 게임 서버만으로 서비스 할 수도 있는데, 그러한 개발자가 어떻게 리눅스와 리눅스 서버에 익숙해졌는지 가볍게 이야기 해보고 싶었다.