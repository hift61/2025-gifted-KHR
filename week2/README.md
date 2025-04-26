<h1>1.간단한 언어모델의 문제점</h1>
-간단한 언어모델을 통해 10가지 문장을 만들고 문제점을 알아보자.<br>
<br>
<b>*인상 깊었던 것들만 기록</b><br>
1-1.korea was significant emigration to the centuries but exercised full<br>
->Korea was significant in emigration to the centuries but exercised full<br>
해석:한국은 수세기 동안 중요한 이민이었지만 충분한 행사를 했습니다.<br>
<br>
1-2.korea was replaced by the japanese occupation period is said<br>
->Korea was replaced by the Japanese occupation period, it is said.<br>
해석:한국은 일제 강점기에 대체되었다고 합니다.<br>
<br>
1-3.korea although south korea in japanese islands in east and<br>
->Korea, although South Korea is in the Japanese islands in the east,~<br>
해석:한국은 동쪽의 일본 섬에 있지만 한국은<br>
<br>
문제점:문법상에 오류가 많음. 문장의 의미가 말이 안됨.<br>
-> 더욱 고도화된 언어모델을 통해 오류를 줄여보자.<br>
<br>
<h1>2.더 많은 데이터셋을 학습하기</h1>
-더 많은 데이터셋(약 3500개)를 학습하면 어떤 문장이 나오는지 알아보자.<br>
<br>
->사실 그래도 문장이 자연스럽지는 않다..

<h1>3.프롬프트 엔지니어링 체험</h1>
-<a href = "openai-community/gpt2-medium">gpt2</a>에게 적절한 프롬프트를 내려 문장을 번역하게 하기.<br>
<br>
<div>
  <blockquote cite="https://www.huxley.net/bnw/four.html">
    <p>
      GPT-2는 “이 다음엔 뭐가 올까?”만 생각하기 때문에,<br>
네 말처럼 열린 문장, 앞뒤 연결이 자연스러운 구조가 핵심이야.
    </p>
    <p>-ChatGpt</p>
  </blockquote>
</div>
->즉 gpt2는 열린 문장일때 더욱 효과적임.
<br>
<br>
1.열린 문장으로 마무리(ex."Hello" in French is)<br>
2.스토리텔링 형식으로 질문(ex.I told him "Hello", and he said)<br>
<br>
->하지만, 모두 다른 이야기를 하며 논점을 흐림.<br>
->예시를 여러개 주는 것이 더욱 유리함(ex.French:(예1) English:(예1)..French:(질문) English:)
