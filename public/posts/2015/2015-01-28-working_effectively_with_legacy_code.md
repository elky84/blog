---
layout: post
title: 레거시 코드 활용 전략
date: 2015-01-28
categories: [서평]
tags: [서평]
comments: true
---
최근 레거시 코드 활용 전략이라는 책을 읽고 있다.

업계에서 흔히 레거시 코드라 불리는 코드를 많이 만져보게 되죠. 굳이 라이브팀이 아니더라도, 자주 만나게 된다.

내 주변에서도 흔히 사용하는 용어로써의 레거시 코드는 복잡한 코드, 결합도 높은 코드, 제약이 많은 코드, 너무 긴 메소드 등을 통칭하는 용도로 쓰인다

대략 외국에서도 낡은 코드, 유효하지 않게 된 코드 등을 지칭할 때도 쓰는 거 보면, 레거시 코드의 개념이 부정적인 것은 확실한 가보다.

저도 그렇게 좋지 않은 코드에 대한 통칭으로 레거시 코드라는 용어를 사용해오던 찰나에 레거시 코드 활용 전략 (Working Effectively with LEGACY CODE) 라는 책을 읽게 되었다.

이 책에서의 레거시 코드에 대한 정의는 저에게 큰 공감이 했다.

>"내게 있어서 레거시 코드는 테스트 루틴이 없는 단순한 코드일 뿐으로, 난 그 정의에 대해 유감을 가져왔다.
코드가 얼마나 훌륭하게 작성되어 있는지 여부와는 상관없이 테스트 루틴이 없는 코드는 불량 코드다. 
얼마나 멋지게 작성되어 있는가와 객체지향의 사용 여부, 그리고 캡슐화의 정도도 참작 요소가 전혀 되지 못한다. 테스트 루틴이 있으면 코드의 동작을 빠르고 검증 가능하게 변경시킬 수 있다. 하지만 테스트 루틴이 없으면 실제로 우리 코드가 더 나아지는지 더 나빠지는지를 알 수 없게 된다."

사실 좋은 코드의 기준은 너무 다양하다.

다른 사람이 작성해둔 코드 베이스 위에 작업해야 되는 경우, 선택지는 더 좁아진다.
내가 원치 않는 결합도, 내가 원치 않는 클래스 구조, 내가 원치 않는 기준으로 코드가 작성되어져 있고, 그 룰을 깨지 않는 선에서 작업해야 하는 경우가 많기 때문이다.

코드의 디테일을 보는 기준이 사람마다 다른 것도, 좋은 코드가 무엇인지의 논지를 흐리게 된다.

누군가는 속도, 누군가는 메모리 사용량, 누군가는 코드의 가독성 (나열한 것 중에 가장 주관적인 지표이기도 한)을 지표로 삼기 때문이다.

이러한 주관적 여지가 있는 기준이 아닌, 명확한 기준인 테스트 루틴이 포함된 코드냐는 우리가 지향할 목표를 명확히 해준다.

결국엔 유닛 테스트를 강조하고, 기존 작성된 코드에 유닛 테스트를 붙이자는 이야기에 귀결된다.

그러기 위한 테크닉에는 여러가지가 있고, 그 중 결합도 낮추기 같은 것은 경험과 언어에 대한 능숙도에 귀결되기도 한다.

결합도란 다양한 언어의 특성과 표현력에 따라 맺어지기 때문이다.


실례로, 루비의 경우는 결합도 높게 작성해야 되는 프로그램에는 그리 적합치 않은데, 다행히도 그렇게 억지로 짜려고해도 쉽지 않다.

반대로 C++의 경우 적절하게 (이 말이 굉장히 모호한 말임을 인정한다) 쪼개져 있지 않은 경우, 슈퍼 메소드나, 슈퍼 클래스, 또는 클래스간 관계에 따른 지나치게 높은 결합도를 보여주곤 하니 말이다.

특히나 코드 작성자의 의도를 강조하기 위해 클래스간 결합도를 일부러 높은 코드도 수두룩하게 보아왔다.

그런 코드에 결합도를 낮추는 일은 쉬운 일이 아니다.

그렇기에 이런 책이 나온게 아닌가 싶다.

Test Driven Refactoring을 알리기 위해서 말이다.