---
layout: post
title: 거짓 공유 (false sharing)
date: 2010-08-19
categories: [비동기]
tags: [시스템 프로그래밍, 병렬 프로그래밍, 비동기]
comments: true
---
캐싱의 기본은 지역성에 근거하는데요, 이는 프로그래밍단의 최적화에서도 유명한 80-20법칙과도 일맥상통하는 이야기죠.

지역성(locality)은 아래 추정에 근거합니다.
1. 지금 읽힌 데이터는 이후에도 자주 사용될 가능성이 높다.
2. 지금 읽힌 데이터와 인접한 데이터는 이어서 사용될 가능성이 높다.

이는 코드 실행시 스택 처리를 통해 얻게 되는 장점과 유사합니다.

단일 코어가 아닌 멀티 코어 CPU는 데이터를 읽어올때, 캐시 라인 (cache line)이란 단위로 읽어옵니다. 
캐시 라인이라 함은 지역성에 근거해 인접한 데이터를 미리 읽어옴으로써 속도향상을 노리는 것이지요.

하지만 이는 장점이자 독이 되기도 합니다.

멀티코어에서는 A스레드와 B스레드에서 인접 메모리를 접근할때, 캐시에 있던 내용을 메모리에 반영하려 시도합니다.
인접 메모리를 읽고 있는 상태이기에 병행 수행시 데이터의 유효성을 조금이라도 높이기 위해 메모리에 반영하는 과정에서 속도 저하가 발생하는 것이죠.

실제로 인접메모리일뿐 동시 접근이 일어나지 않는 코드라고 할지언정, 해당 코드가 어떻게 작성되었는지는 중요치 않습니다. 
캐시 라인은 코드의 작성 여부까지 판단하고 동작하지 않기 때문에 (그렇게 할 수 가 없기에), 인접 메모리 접근만으로도 성능 손해를 보면서라도 데이터의 유효성을 높이고자 하는 판단을 내릴 수 밖에 없습니다.

convoying (무분별한 lock의 사용으로 멀티 스레드를 활용하지 못하고, 한개 스레드 동작시 다른 스레드들은 그 스레드가 unlock 할때 까지 대기 해야만 하는 상황) 보다야 낫겠지만, 멀티 코어가 일반화 되면서 이를 얼마나 잘 활용하는가가 화두가 되고 있는 이 시점에 메모리 거짓 공유로 인한 속도 저하는 반드시 염두에 두어야 하는 이슈입니다.

멀티코어 프로그래밍에서는, 자주 읽히는 데이터가 인접해 있다면, cache line 크기만큼의 간격을 두도록 하는 것이 좋습니다. 
패딩(padding)을 이용해서 메모리를 손해보더라도 속도에서 이득을 보라는 얘기죠.

옛말에 "메모리 공간을 팔아 속도를 산다"는 말 처럼, 메모리와 속도는 반비례 그래프와 같다는 생각이 다시 한번 드네요.

### 참고 자료
- [art.oriented - false sharing](http://minjang.egloos.com/1848130)
- [메모리 거짓 공유](http://blog.naver.com/hermet/68290454)
- [Locality 그리고, 거짓 공유](http://rein.kr/blog/archives/906)
- [cache line bouncing](http://barriosstory.blogspot.com/2008/03/cache.html)
- [멀티스레드 프로그래밍이 어려운 까닭](http://summerlight.textcube.com/12)