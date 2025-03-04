---
layout: post
title: 서버 프로그래밍시 주의 사항
date: 2008-01-14
categories: [서버]
tags: [서버]
comments: true
---

# 멀티 쓰레드 시 동기화는 주의 깊게 하라
* 멀티 쓰레드에서 같은 데이터를 동시에 접근하지 못하도록 동기화는 필수다. 
* 현재 사용중인 데이터가 특정 시점까지 변해선 안 된다면, 데이터 사용이 끝나기 전까지 다른 쓰레드에서 접근이 불가능 하도록 해야 한다.
* 물론, 동기화를 항시 고려하지 않게끔 이를 구조적으로 분리해두는 것이 더 좋다.
 
# DB처리를 하러 간 사이에 벌어질 수 있는 일에 주의하라
* DB처리를 위해 블럭이 되는 서버가 아니고선, DB처리를 하러 간 사이에는 간극이 존재한다.  이 때를 주의하자. 또, 서버가 여러 대인 경우, 다른 서버로 처리하러 떠난 상태까지 고려하도록 하자.

# 돈은 signed 형을 사용한다. 
* unsigned형을 쓰다 잘못해 언더플로우가 나는 것보다, 돈이 –가 되는 것이 낫다.
 
# 검사 시점을 주의하라
* 즉시 이뤄지는 처리가 아닌, 다른 곳에서 인증이나 처리를 하고 온 후 처리 되는 경우라면, 민감해야 한다.
다른 곳으로 처리를 하러 간 도중에, 이 값을 어떤 식으로든 사용하게 된다면, 오차가 생기기 때문이다.
* 돈의 경우에도 사용되는 서버가 여러곳이라고 한다면, DB와 각 서버에서 들고 있는 돈의 값에 차이가 있을 수 있기에, 처리 주체와 과정을 일체화시키고, lock을 통한 동기화가 필요하다.
* 디비로 처리를 요청하고 결과를 기다리는 과정에서, 클라이언트에서 데이터를 원한다 해도 절대로 응해선 안된다. 결과를 기다리는 과정은 lock 상태여야 한다.
* 클라이언트에 검사 결과를 전달했다 하더라도, 클라이언트에서 온 결과를 신용해선 안된다. 반드시 서버에서 트랜잭션 잡고 다시 한번 더 검사하라.

# 패킷 버퍼 크기에 주의 하자
* 한 패킷이 큰 것이던, 패킷이 너무 많이 발생한 상황이던 간에 패킷 최대 크기를 넘어서는 상황이 나오지 않도록 조절해야 한다. (분산 패킷 등을 통해서 처리 하는 것이 좋다)
* 클라이언트에서 올려보내는 패킷의 경우 너무 많이 올려보내면 연결을 닫는 것이 좋다.
* 클라이언트에서 보내는 패킷의 경우 유효 시간으로 관리하는 것이 좋지만, 이 역시 비정상적으로 많은 량이 발생시에는 연결을 닫는 것이 좋다.
* 서버와 서버간의 패킷의 경우 무조건 소화시켜야한다. 버그가 있어 많은 량이 되더라도 우선 처리하고 봐야한다. 

# 단일 패킷의 최대 크기를 설정하라.
* 단일 패킷의 최대 크기를 지정하라. 패킷 하나의 크기가 설정 되어 있어야 버퍼의 효율적 사용에 유연하다.
* 최대 크기 이상의 패킷은 비정상으로 판단할 수 있는 수단이 되기 때문에 정하는 것이 좋다.
 
# 저장 주체가 변경될 때에는 반드시 저장해주고 처리 하자.
* 20분에 한번 저장하거나, 변동 상황이 누적되었을 때 저장하는 경우, 그 주체가 변했을 때를 주의 하자. 교환 같은 처리의 경우, 교환 될 아이템은 DB에 저장하고 교환 처리 하여 무결성을 유지하도록 하자.

# EventSelect와, AsyncSelect 도 recv시 실패를 하는 상황이 존재한다.
* blocking socket이 아닌 non-blocking socket에서도 recv함수가 SOCKET_ERROR(-1)를 리턴하는 경우가 존재한다. 다른 스레드에서 close 소켓을 한 상황등에서 그렇다. FD_READ 신호가 왔지만, SOCKET_ERROR가 리턴되는 상황에도 대비해서 소켓 관련 코드를 작성하라.

# 끊긴 상황과, 끊는 동작을 명확히 구분하라.
* 접속이 끊어진 상황과 자신이 접속을 끊는 동작과 명확하게 구분하라.
두가지 상황에서 이뤄져야할 처리는 많이 다르다. 의도치 않은 동작이 이루어졌는지 서버와, 클라이언트 사이의 규약을 정하고, 그 규약에서 어긋난 상황을 기록하고 수정하라.

# 트랜잭션이 필요할때를 판단하라.
* 아이템 4개를 한꺼번에 지급해야 한다고 했을때, 코드에서 루프를 돌며 4개를 지급하는 것은 옳지 않다.
아이템 지급중에 오류가 발생하거나, 조건을 만족하지 않았을 때 롤백을 해야 하는데, 그 롤백이 코드에선 쉽지 않기 때문이다. (물론 가능하긴하다. 취소용 sp 또는 메소드를 제공함으로써. 그러나 db에서 처리하는 것보단 불편한 것이 사실이다.)