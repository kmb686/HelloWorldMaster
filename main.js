'use strict';

{
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > p'); 

    const quizSet = shuffle([
        {q: 'Syntax【print \'Hello, World!\'】', c:['Perl','Ruby','pearl','Peru']},
        {q: 'Syntax【puts \'Hello, World!\'】', c:['Ruby or Tcl','Visual Basic','MS-DOS or bash','rugby']},
        {q: 'Syntax【10 PRINT \'Hello World!\'】', c:['BASIC','Visual Basic','COBOL','income']},
        {q: 'Syntax【System.out.println(\'Hello, World!\');】', c:['Java','JavaScript','GO','Japan']},
        {q: 'Syntax【(print \'Hello World!\')】', c:['Lisp','Perl','SmallTalk MT','Lisa']},
        {q: 'Syntax【document.write(\'Hello, World!\');】', c:['JavaScript','Java','Scheme','japon']},
        {q: 'Syntax【Sub Main() | Console.WriteLine(\'Hello, world!\') | End Sub】', c:['Visual Basic','C#','Ruby','Excel']},
        {q: 'Syntax【echo(\'Hello, World!\');】', c:['PHP','MS-DOS or bash','ActionScript','PSP']},
        {q: 'Syntax【printf(\'Hello, World!\');】', c:['C','C#','Perl','D']},
        {q: 'Syntax【System.Console.WriteLine(\'Hello, World!\');】', c:['C#','C','Haskell','T']},
        {q: 'Syntax【SELECT \'Hello World\';】', c:['SQL','PHP','SmallTalk MT','QOL']},
        {q: 'Syntax【NSLog(@\'Hello, World!\');】', c:['Objective-C (Cocoa)','ActionScript','SmallTalk MT','Project-A']},
        {q: 'Syntax【(display \'Hello World!\')】', c:['Scheme','COBOL','Fortran90','Flex']},
        {q: 'Syntax【display dialog \'Hello, World!\'】', c:['AppleScript','Ruby or Tcl','PHP','Adam']},
    ]).splice(0,10);

    let currentNum = 0;                                          
    let isAnswered;　　　　　　　　　　　　　　　　　　　　　　　　　
    let score = 0;

// シャッフル関数
    function shuffle(arr){
        for (let i = arr.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1)); 
            [arr[j],arr[i]] = [arr[i],arr[j]];     
        }
        return arr;    
    }

// 要素li。開始時はfalse、isAnswerがfalseでない(=trueなら)、処理終わり。
    function checkAnswer(li){
        if (isAnswered === true){
            return;
        }
        isAnswered = true;

// 正誤判定、何番目を押すとどのクラスを付与するか。 c[0]⇨correct  c[1.2.3]⇨First Second Third
        if (li.textContent === quizSet[currentNum].c[0]){
            li.classList.add('correct');
            score++;
        }else if(li.textContent === quizSet[currentNum].c[1]){
            li.classList.add('wrongFirst');
        }else if(li.textContent === quizSet[currentNum].c[2]){
            li.classList.add('wrongSecond');
        }else{
            li.classList.add('wrongThird');                       
        }
        btn.classList.remove('disabled');
    }

// 問題せってぃんぐ。「while」
    function setQuiz(){
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;   
    
    while(choices.firstChild){
        choices.removeChild(choices.firstChild);
    }
// quizSet.c　shuffle配置。li要素　CreEle　作成。li.texCon　代入。li click=> checkAnswer関数起動。
    const shuffledChoices = shuffle([...quizSet[currentNum].c]); 
    shuffledChoices.forEach(choice => {
        const li = document.createElement('li');
        li.textContent = choice;
        li.addEventListener('click',() => {
            checkAnswer(li);
        });
        choices.appendChild(li);

// 最後の問題(quizSet.length-1) === => btn texCon
    });
    if(currentNum === quizSet.length - 1 ){
        btn.textContent = '最後の一問です！'                  
    }

    }

// btn cli => if btn.disabled.contain => return
    setQuiz();

    btn.addEventListener('click',() => {
        if(btn.classList.contains('disabled')){
            return;
        }
        btn.classList.add('disabled');
        
//  最後の問題(quizSet.length-1) === => ScoreLabel texCON /// remove hidden 
        if(currentNum === quizSet.length - 1){
            scoreLabel.textContent = `正答率は… ${score} / ${quizSet.length} です！`;   
            result.classList.remove('hidden');
        } else {
          currentNum++;
          setQuiz();    
        }     
    });
    window.onload = function() {
        alert("ソースコードを勉強しようの巻");
      };
}