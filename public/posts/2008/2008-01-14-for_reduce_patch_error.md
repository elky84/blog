---
layout: post
title: 패치의 악몽을 피하기 위해
date: 2008-01-14
categories: [소프트웨어 공학]
tags: [소프트웨어 공학]
comments: true
---

패치시에 문제가 하나도 발생하지 않는다면 얼마나 좋겠냐만은... 패치 과정에서 실수가 생기는 경우가 많은 것이 사실이다. 패치 준비과정에서의 피로와, 수작업으로 인해 사소한 실수가 큰 파장을 일으키는 것이 현실.

주로 점검시에 발생하는 문제는 패치 준비가 제대로 되지 않아 생기는 문제가 많다. 
다음은 실 서비스 적용시 문제를 덜 일으키기 위한 방법이다.
 
### 테스트는 최대한 실 서버와 같은 환경에서
* 가급적이면 서버는 테스트 코드나 테스트 데이터를 적게 사용해야 한다. 

QA와 같은 테스트는 가급적이면 실 서버와 같은 환경과 데이터로 하는 것이, 실 서버 패치 시에 생기는 문제를 줄일 수 있다. 
점검시 실서버 QA의 경우 특히나 가급적이면 테스트 데이터를 사용하지 말자.

또한 환경 설정 파일 (cfg, ini를 비롯한 데이터 파일)의 검사도 반드시 하도록 하자. 만약, 테스트 데이터를 사용했다면, 테스트 데이터를 이용하고 있기에 실 서비스 오픈을 중지 시키자.

### DB 스키마 적용 및, 데이터 복사는 가급적이면 자동화 하자.
* DB스키마 적용이나, 데이터 복사를 수작업으로 했을때는 빼놓는 테이블이 생길 수 있고, 데이터 복사도 마찬가지다.

개발시에 실 서비스에서 변경된 스키마에 대한 쿼리문을 저장해두고, 패치시 사용한다면 문제를 줄일 수 있다. 하지만, 이런 작업도 번거로운 편이기 때문에, 가능하다면  실 서비스 스키마와 패치할 개발 DB 스키마와의 차이에 따른 쿼리를 생성해내는 생성기를 만들면 더욱 편하다.

대부분 DBMS는 export를 지원하므로, CFG같은 데이터 참조용 테이블의 경우는 export된 스키마와 데이터를 import해서 그대로 적용하면 쉽게 실 서비스에 적용 시킬 수 있다.

### 실 서비스에 적용할 바이너리/데이터에 대한 점검은 신중히 하자.
* 실 서비스에 적용될 파일은 반드시 테스트 해보자. 특히 파일 복사시 잘못된 파일이 복사 될 수 있으니, 이를 검사해주는 유틸리티를 만들어 검사하는 것도 좋은 방법이다. 

물론, 가장 좋은 방법은 패치 절차 자체를 자동화하는 것이다.

또한 데이터 (설정 파일 또는 디비 데이터)도 마찬가지다. 실서비스용이 아닌 데이터라는 것을 체크해두고, 해당 데이터로 서비스 오픈 시도시 에러를 발생시키도록 하자.

### Lan에서 환경에서 잘 적용된 것들이, Wan 환경에서도 잘 적용될꺼란 생각을 버려라.
* Wan 환경에서는 추가적인 지연이 있기 때문에 성능이 안정적이지 않다.

그렇기에 Lan에서 잘 작동하는 듯이 보였던 잘못된 코드들이 Wan에서는 실패할 가능성이 있다.

실제 서버에 적용하기 전에 Wan환경에서 서버를 켠 후, 스트레스 클라이언트를 통해 테스트 한다면 잘못된 코드를 찾는데에 도움이 될 것이다.