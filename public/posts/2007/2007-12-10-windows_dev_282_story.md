---
layout: post
title: 레이몬드 첸의 윈도우 개발 282 스토리 - 윈도우의 현재를 말해주는 비하인드 스토리
date: 2007-12-10
categories: [서평]
tags: [윈도우]
comments: true
---
윈도우 개발 스토리? 저는 매우 궁금했습니다. 맥이나 리눅스에 비해 윈도우가 압도적인 점유율을 갖고 있지만 그만한 인정은 못받고 있지만, 저는 윈도우가 매우 뛰어나고 M$라 불릴만큼 악덕 기업은 아니라고 생각하기 때문입니다. 

그들은 비주얼 스튜디오 만으로도 존경 받을만하죠. (MS만세~)

레이몬드 첸씨의 이름을 달고 나온 책인 만큼 그가 누구인지 매우 궁금했는데, 윈도우 개발에 수석 프로그래머 이셨더군요. 부럽습니다!

이 책은 주로 윈도우를 개발하며 겪은 에피소드와 왜 윈도우가 이렇게 돌아가는 지에 대한 항변(?)을 하는 식으로 이루어져 있습니다.

윈도우는 대부분 사용자 편의에 큰 가치를 두고 있고, 그 대표적인 방침중 하나가 하위 호환이라 할 수 있습니다.

하위 호환을 위해 유지해야 했던 문제 되는 함수들, 잘못된 사용법으로 인해 윈도우가 망가졌던 일, 그런 사용에도 망가지지 않기 위해 했던 예외처리 등 윈도우의 파란만장한 주옥같은 일화들이 많이 있었습니다.

그 중에서도 특히 심시티를 하위 호환하기 위해서 집어넣었던 예외 처리 코드가 정말 인상적이었는데요, 심시티가 그만큼 큰 파급효과를 가졌었다는 점에서 부럽기도 했습니다. (MS가 그 게임 하나만을 위한 코드를 작성해주다니... 쳇... 멋진데?)

WIN16 호환을 위한 수많은 역사와 얽혀있는 코드들에 대해서 설명해주는데, 다른 내용도 매우 많지만 hPrevInstance에 대해 이보다 자세하게 설명해준 책은 아마 없었던 것 같네요. (이 부분은 Windows API 정복을 비롯한 윈도우 프로그래밍 서적들에어느정도 설명이 나오기도 했지만 깊이가 다르다! 깊이가!) 

설명 위주의 책이긴 하지만 조각 코드도 꽤 되고, 궁금했던 얘기들로 꼭 집어 설명해주는 것은 수석 프로그래머 였던 그가 아니면 불가능 했을 거란 생각이 드네요.

MS가 윈도우에서 가져간 정책의 밑바탕에는 사용자가 중심이었습니다. 어찌보면 당연한 얘기지만 내가 얼마나 그렇게 해왔나라는 반성이 들어 부끄럽기도 했습니다.

개발을 하다보면 기획자나 그래픽 디자이너가 힘든 방법이지만 내가 편하거나, 코드 상으로 간결한 해결책을 가져다 주는 방법을 선택하고 싶은 욕심이 생길때가 있고, 실제 그런 선택을 할 때가 있습니다.

어찌보면 프로그래머로써 우선시 여기는 유지보수 쉬운 코드, 퍼포먼스 좋은 코드 같은 가치 보다,  중요한 가치가 사용자나 팀웍이 될 수도 있다는 생각이 들기도 했습니다.

물론 이 책을 다 읽고 난 지금은 전보다 사용자나 팀을 위한 노력을 조금 더 기울이게 됐지만, 여전히 저에게 우선 되는 가치는 유지보수 쉬운 코드나 퍼포먼스 좋은 코드지만 말이죠. (..... -_-;; 제가 고집이 좀 쎕니다...쿨럭!)

이 책은 제가 전공서를 읽을때 조차 중요시 여기는 가치인 재미를 주는 책이었습니다. 마냥 윈도우 매뉴얼을 읽고 싶으신 분들은 MSDN을 찾아보세요. 파라미터 하나 하나 자세히 알려줄테니까요.

하지만 조금이라도 윈도우 프로그래밍 하실 여지가 있다면, 아니 윈도우를 조금 더 잘 사용하시려는 일반 사용자라고 하실지라도 윈도우의 기본 철학, 윈도우를 만들었던 과정들에 대해 알고 싶다면 이 책을 반드시 읽어보시기 바랍니다.