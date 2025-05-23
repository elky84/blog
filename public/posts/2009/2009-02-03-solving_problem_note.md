---
layout: post
title: 문제해결 노트
date: 2009-02-03
categories: [소프트웨어 공학]
tags: [소프트웨어 공학]
comments: true
---

## 나의 리팩토링 기준 및 리팩토링 방법 정리

1. 중복을 제거하라. (DRY. Don't Repeat Yourself)
* 같은 일을 하는 클래스, 혹은 메소드 등이 한 곳에만 존재하도록 하라.

2. 메소드가 존재해야 할 클래스는 명확해야 한다. (직관성)
* 기본적으로 어떤 동작을 행하는 쪽에 메소드를 만들어라. (그 일을 하는데에 필요한 멤버도 포함)
* 예를 들어, 밥을 먹는다면 밥을 먹는 주체는 사람이다. 그렇다면 사람 클래스에 무언가를 먹는다는 메소드(Eat)가 있어야 할것이다.

3. 메소드 이름에 해당하는 일만 해야 한다. (직관성)
* 다른 일을 하게 될 일이 생길 경우 메소드를 분리한다.
* 단어의 포괄적인 의미에 속하는 일을 하게 될지라도 메소드를 하나 더 만들고, 그 메소드를 호출하게 해 Function per method 구조를 지향하도록 하자.

4. 클래스는 너무 커지지 않도록 하라. (Divide and Conquer)
* 너무 작게 나누는 것이 능사는 아니다. 오히려 복잡도가 증가할 가능성도 있지만, 일반적으로 클래스를 작게 쪼깬다면 유지보수에 큰 잇점을 얻을 수 있다.

## 버그 확인 검증법

1. 문제를 재현하라. 
* 문제로 인한 증상을 파악한다.
* 결함을 만든 곳만이 아니라, 감염을 통한 증상이 보여지고 보고 될 수도 있다. 증상은 문제가 있다는 보고로 생각해야지, 결함의 절대적인 원인으로 생각해서는 안된다.

2. 문제 재현해보아라.
* 만약 문제가 발생했다는 사실은 알지만 원인을 찾을 수 없고 재현 방법을 모른다면, 문제가 발생하는 보고를 토대로 원인을 유추해내자.

3. 보고나 확인된 문제와 같은 증상을 보이는지 확인한다. 
* 증상이 다르다면 다른 문제를 찾았거나, 문제가 아닐 것이니 같은 증상이 발생하는 상황을 찾을 때 까지 반복하라.

4. 결함을 제거하라.
* 증상을 보이는 상황을 토대로, 결함을 제거할 방법을 판단하라.
* 결함 제거 시에 유의할 점은, 이 과정에서 새로운 버그를 만들 여지가 있다는 것이다.
* 주로 결함의 원인을 잘못 짚은 경우나 보고된 증상 하나만 해결하려 하는 경우에 버그 제거에 실패하는데, 문제를 일으킨 원인을 찾기 전까지는 수정할 방법을 결정하지 말라.
* 수정시 영향을 줄 수 있는 코드를 모두 찾아보고, (Find in files 등을 이용) 수정된 코드가 불려지는 모든 상황을 테스트 하라. 
* 이 과정은 매우 번거롭기에 자동화 해두는 것이 좋다.

3. 결함이 제거되었는지 확인하라.
* 수정된 상태로 문제 재현을 시도하자.
* 문제가 아직도 발생한다면, 문제 해결 방법을 잘못 결정한 것이다. 
* 무엇 때문에 잘못된 판단을 하게 됐는지 파악하고, 기록하라. 지금의 실수를 다시 반복하지 않도록 하라.
* 문제가 해결되었다면 실제 환경과 최대한 비슷한 환경에서 다시 한번 테스트하라.
* 가능하다면 이 테스트는 재현 방법을 설명해주고, 다른 사람에게 테스트를 맡기는 것이 변경된 코드에서 발생할 수 있는 새 버그나, 미처 발견하지 못했거나 제거하지 못한 결함을 찾는 데에 도움이 될 가능성이 높다. 

## 문제 발생시 마음가짐

1. 긴장하지 말라. 
* 긴장은 시야를 좁게 만들어 실수를 만들 소지가 많다.

2. 시간에 쫓기지 말라. 
* 문제를 빠르게 수정하는 것이 중요하긴하지만, 결함을 제대로 수정하고, 확인하는 과정은 그 이상 중요하다.

3. 절대로 확인 과정을 건너 뛰지말라. 
* 확인 과정을 건너 뛸 경우 또 다른 결함을 만들어 내거나, 제대로 수정되지 않았을 가능성이 높다.