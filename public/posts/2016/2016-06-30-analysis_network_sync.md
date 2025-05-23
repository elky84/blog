---
layout: post
title: 동기화에 대한 간략 정리
date: 2016-06-30
categories: [서버]
tags: [서버, 동기화]
comments: true
---
## 동기화 기본
### 목적
* 모든 피어가 같은 결과를 얻게 하기 위함.

### 난제
* 랜덤값 (시드 동기화)
* 부동 소수점 실수 오차.

### 환경 변수
* 어떠한 변수들을 동기화할것인가를 잘 결정지어야 한다.
* 애니메이션 시스템에 영향을 주는 요소가, 커맨드 패턴으로 받는 변수 이외의 변수에 영향을 받는다면, 애니메이션 동기화는 불가능하다.
* 또한 오브젝트간 충돌등의 물리처리가 중요하다면 이 것도 마찬가지로 관리해주어야 한다.

### 커맨드 패턴 사용
* 서버가 난수까지 결정해서 주면 좋음.
    * 그럴러면 로직이 서버에 있는게 좋다.
        * 클라이언트는 결정지어진 결과값만 수신받아 표현한다라는 개념으로 가야 한다.
* 티어간에 커맨드로 동기화를 하기 때문에, 동기화에 영향을 줄 임의 동작이 존재하면 안된다.

## 동기화 적용 시점

### 선동작 후보정
* 액션성을 강조하기에 좋다.
* 레이턴시가 클 수록 동작이 튄다.
    * A위치로 움직였다가, 서버 응답받고는 뜬금없이 B위치로 워프 하는 등의 동작을 함.
* 지나치게 레이턴시가 커졌거나, 통신 오류가 발생했을 시에는 피어간 아예 다른 결과를 보게 되기도 한다.
* 네트웍이 불안정할 수록 부적절하다.

### 응답 후동작
* 레이턴시가 크면 클 수록, 느린 반응성으로 보인다.
    * 다만 모든 유저가 같은 결과를 볼 수 있다.
        * 결과를 받게 되는 타이밍은 차이가 날 수 있음. [응답을 받게 되는 시간이 얼마가 걸리냐에 달려있음]
* 반응이 없을 순 있어도, 잘못된 결과를 보여주진 않는다.
    * 주로 MMORPG가 이렇게 구현되곤한다.

## 주고 받는 데이터의 형식
### 이벤트 단위
* 어떤 동작을 했음을 전달하고, 해당 동작에 대한 동기화를 한다.
* 커맨드 패턴화하기 딱 좋은 구조.
* 로직 구현시 같은 Input (이벤트) -> Ouput을 보장하게 만들어야 한다.

### 상태 기반
* 현재 어떤 상태가 됐음을 전송한다.
* 기존 상태 -> 변경된 상태를 보간해야 하고, 보정 로직이 모든 유저가 일치하게 구현해야 하는 이슈가 있다.

## 동기화 주기
### 턴 베이스
* 내부적으로 턴을 구성하는 방식이다.
    * 턴으로 구성된 로직 동기화 주기에 맞춰서, 패킷을 전송하고, 수신받아 이벤트 들을 처리한다.
* 명확한 지연 허용 범위가 존재한다
    * n턴 이상 수신 받지 못하면, 통신 오류로 판정 가능하다.
* 반응성에 대한 기준치도 존재해, baseline을 잡고 튜닝하기 좋다.
    * 결국 한 턴의 단위가 시간을 기준으로 하기 때문에 서버에서도 비정상적 일만큼 많은 패킷이나 과도하게 많은 액션을 수행하고 있는지 판별할 수 있는 기준이 되어준다.
    * 초당 처리 가능 패킷 수가 계산 가능한 수치가 되기 때문에, 기준을 잡을 수 있어 서버 당 수용 동접을 결정 짓기 쉬워진다.

### 패킷 단위
* 동작마다 실시간 전송한다. nagle 알고리즘을 끄고 바로 바로 전송함으로써, 최대한 빠른 전송을 의도하고, 그만큼 빠른 반응성을 보여주기 위함이다.
* 패킷은 하나당 패킷 헤더를 차지함으로, 뭉쳐서 보내기보다 패킷양도 큰 단점도 있다.
* 이벤트 폭발에 취약하다.
    * 과도한 패킷이란걸 검증할 baseline을 잡기 어렵기 때문.
        * 그럼에도, 일정 수치 이상은 baseline을 벗어났다고 판정해 anti-floording 처리 해야 한다.