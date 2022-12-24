let questions_count =document.querySelector(".questions-count span");
let question_area=document.querySelector(".question-area");
let answers_area=document.querySelector(".answers-area");
let submit_button=document.querySelector(".submit-button");
let spans_container=document.querySelector(".spans");
let result_container=document.querySelector(".result");

let index=0;
let rightAnswers=0;


function getQuestions() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        let questions_object = JSON.parse(this.responseText);
        let questions_array=questions_object.quiz_array;
        console.log(questions_array);
        let array_length=questions_array.length;
        // console.log(array_length);
        questions_count.innerHTML=array_length;//show the questions count in the html file

        for (let i = 0; i < array_length; i++) {
            let span = document.createElement("span");
            span.innerHTML=i+1;
            if(i+1==1){
                span.className="on";
            }
            spans_container.appendChild(span);
         }
        

         addQuestionData(questions_array[index],00);
        
         //onclick method
         submit_button.onclick = () => {
            let right_answer=questions_array[index].right_answer;
            checkAnswer(right_answer,00);
        
            index++;

            if(index<array_length){
                //empty the previous question area and the answers area
                question_area.innerHTML="";
                answers_area.innerHTML="";
                //fill the question area and the answers area
                addQuestionData(questions_array[index],00);

                //paint the span
                paintSpan();

            }else if(index==array_length){
                showResult(array_length);
            }
            
         }
         

    }
}
    myRequest.open("GET","questions.json", true);
    myRequest.send();
}
 getQuestions();

function addQuestionData(obj, count) {
    // the question

    let question = document.createElement("h2");
    // Create Question Text
    let question_text = document.createTextNode(obj.question);
    question.appendChild(question_text);
    // Append The H2 To The question area
    question_area.appendChild(question);

    // the answers

    for (let i=1; i <= 4; i++) {

        // Create parent div
        let parent_div = document.createElement("div");
        // Add class
        parent_div.className = 'answer';

        // Create Radio Input
        let radio_input = document.createElement("input");
        radio_input.name = 'answer_radio';
        radio_input.type = 'radio';
        radio_input.id = `answer_${i}`;
        radio_input.dataset.answer=obj[`answer_${i}`];
        if(i==1){
            radio_input.checked=true;
        }

        //ceate the label
        let label=document.createElement("label");
        label.htmlFor = `answer_${i}`;// add the attribute for
        // Create Label Text
        let label_text = document.createTextNode(obj[`answer_${i}`]);
        label.appendChild(label_text);

        // append Input + Label To the parent div
        parent_div.appendChild(radio_input);
        parent_div.appendChild(label);

        // Append the parent div to the answers area
        answers_area.appendChild(parent_div);
    }
}

function checkAnswer (right_answer, count) {
    let answers = document.getElementsByName("answer_radio");
    let chosen_answer;
    for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
    chosen_answer = answers[i].dataset.answer;
    }
    }
    // console.log(`Right Answer Is: ${right_answer}`);
    // console.log(`Chosen Answer Is: ${chosen_answer}`);
    if (right_answer === chosen_answer) {
    rightAnswers++;
    console.log("Good Answer");
    }
}

function paintSpan(){
    let spans = document.querySelectorAll(".spans span");
    spans[index].className="on";
}

function showResult(array_length){
    question_area.remove();
    answers_area.remove();
    submit_button.remove();
    spans_container.remove();
    console.log(array_length);   
    console.log(index);
    if(rightAnswers>array_length*(70/100)){
        result_container.innerHTML=`<span class=on>Perfect</span> you answered ${rightAnswers} from ${array_length}`;
    }else if(rightAnswers<=array_length*(7/10)&&rightAnswers>=array_length*(1/2)){
        result_container.innerHTML=`<span class=on>Good</span> you answered ${rightAnswers} from ${array_length}`;
    }else{
        result_container.innerHTML=`<span class=on>Not Good</span> you answered ${rightAnswers} from ${array_length}`;
    }
    
}


 
