:: 구현 목표
About React.JS

- Section 10-2

  :: 구현 사항 설명

- useReducer & useEffect

- 중첩 속성을 useEffect에 종속성으로 추가하기

<!-- useEffect()에 객체 속성을 종속성으로 추가하기 위해 dstructuring을 사용했습니다.

const { someProperty } = someObject;
useEffect(() => {
  // code that only uses someProperty ...
}, [someProperty]);
이것은 매우 일반적인 패턴 및 접근 방식이며, 이것이 제가 일반적으로 이 방식을 사용하는 이유이며 여기서 보여드리는 이유입니다(코스 내내 계속 사용할 것입니다).

핵심은 우리가 destructuring을 사용한다는 것이 아니라, 전체 개체 대신 특정 속성을 종속성으로 전달한다는 것입니다.

우리는 이와 같이 코드를 작성할 수도 있으며 같은 방식으로 작동합니다.

useEffect(() => {
  // code that only uses someProperty ...
}, [someObject.someProperty]);
이것은 잘 작동합니다!

하지만 여러분은 이 코드 사용을 피해야 합니다 -->
