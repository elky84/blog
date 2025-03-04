---
layout: post
title: Ruby vs Python
date: 2017-03-23
categories: [프로그래밍 언어]
tags: [Ruby, Python]
comments: true
---

루비와 파이썬. 2000년대 초반을 후끈 달군 스크립트 언어계의 아이돌인 두 언어.

의외로 두 언어를 다 하는 사람은 별로 없다.

포지션이 비슷해서인걸까?

몇년전 재밌는 블로그 글을 본적이 있다.

[루비와 파이썬에서 함수 호출과 함수 참조에 대한 차이](http://blog.nacyot.com/articles/2014-12-17-diffrence-of-ruby-and-python/)

[Django VS Rails](http://youngrok.com/Django_vs_Rails)

[PHP vs Python vs Ruby](http://secretroute.tistory.com/entry/PHP-vs-Ruby-vs-Python)

펼친 글과, 글 말미에 퍼포먼스 이야기가 나오는데, 현재는 상황에 따라 다른 수준으로 따라 잡혀서 큰 의미가 없다. (Python 3.6, Ruby 2.4 기준)

<https://benchmarksgame.alioth.debian.org/u64q/ruby.html>

내가 직접 측정해본바로는 대다수의 간단한 로직 수행시에 Ruby가 더 빨랐지만, 의미가 있는 수준은 아니었으니 넘어가자.

절대적이라던 패키지 수도 Ruby와 큰 차이가 없다. (Pypi와 비교시에는 Rubygems가 더 많다. 물론 두 언어 모두 node.js 패키지 수와는 큰 격차가 나지만…)

<http://www.modulecounts.com/>

![module count](../..../../blog/img/2017/module_count.png)

실제 웹 서버로 게임 서버를 구현해본 결과 유효 패키지 수는 더 적고 아쉬웠다. Python3.x로 개발해서 그런거라고 하지만, 3.x로 넘어오신 분들도 많아진 이때에 그런 얘기는 핑계에 가까웠다고 느껴졌다.


내가 사용해본바로는 indent 강제에 대한 차이, 메소드 네이밍 룰, 용법의 차이 정도라는 결론이다.

언어의 표현력이 생산성과 발상에 영향을 꽤나 크게 준다.

하지만 그에 못지 않게 언어 사용자들의 문화도 언어 선택에 영향을 준다.


클래스에 메소드 확장이 좋은 사례다.
<https://blog.hongminhee.org/2012/06/30/26202408156/>

>클래스를 확장하여 메서드를 추가하거나 기존 메서드의 행동을 원하는 형태로 변경하는 것은 좋은 것이다. 적은 변경으로 원하는 목표에 도달하게 해준다.  
>하지만 그러한 확장이 원하지 않는 범위에서도 적용되어 예기치 못한 부수 효과를 내는 것은 안 좋은 것이다.


>Ruby나 JavaScript는 전자의 장점을 취하기 위해 후자의 단점을 감수하는 것이다.  
>Python은 전자의 장점을 취하고 싶었으나 후자의 단점이 걸려서 문화적으로 쓰지 않는 방향을 제시했다.  
>Java는 후자의 단점을 막기 위해 전자의 장점을 포기한 것이다.  
>C#은 전자의 장점을 취하면서 후자의 단점을 제거한 것이다.  


자신이 선호하는 성향이 문화로 정착된 언어를 선택하는 것도 꽤나 의미가 깊다.
특히 오픈소스권 문화에서는 기존 코드를 수정하거나 분석해야 하는일이 조금 더 비일비재하다.

이때 자신의 철학과 일치한 언어를 사용하는 것이 여러모로 효율이 더 좋아짐은 당연하다.

또 다른 측면에서 언어를 사용하면서 느끼는 감상이 달랐다.

비슷하면서도 두 언어를 선호하는 이유가 이 부분에서도 갈린다.

두 언어 다 사용해본 입장에서 아래 아티클의 주장에 공감한다.

<http://smores.tistory.com/61>

>ruby: 인간 친화적이냐?  
>python: 간결함이냐?

나는 두 언어 모두 가볍게라도 접해보길 권한다.

의외로 두 언어의 차이를 체감할때마다 재밌다는 생각도 들었고, 그 과정에서 깨닳은 것도 많았기 때문이다.