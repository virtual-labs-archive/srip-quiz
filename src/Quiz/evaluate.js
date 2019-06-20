var UserAnswers = [];
var RandomNumbers = [];
var ArrayEmpty = 1;
var CorrectCount = 0;
var TotalContainer = 25;
var title = "Quiz for Cryptography";

var jsonData = [];

function Constructer(question, o1, o2, o3, an, des) {
    this.q = question;
    this.opt1 = o1;
    this.opt2 = o2;
    this.opt3 = o3;
    this.answer = an;
    this.description = des;
}
function load() {
    initialize_array();
}
function initialize_array() {
    $.ajax(
        {
            url: "quiz-data.json",
            dataType: 'json',
            type: 'get',
            cache: false,
            success: function (data) {
                $(data.artciles).each(function (a, b) {
                    var obj = new Constructer(b.q, b.opt1, b.opt2, b.opt3, b.answer, b.description);
                    jsonData.push(obj);
                });
            }

        }
    );

}

var color_status = 0;
function generateQuestionContainer(QID, AID, OID, status) {
    var containerDiv = document.getElementById("quizBody");
    var parentDiv = document.createElement("div");
    var QuestionDiv = document.createElement("div");

    var hr = document.createElement("HR");
    QuestionDiv.id = QID;       //Q1
    parentDiv.style = "padding:2em 2em 2em 2em";
    parentDiv.className = "question";
    parentDiv.appendChild(QuestionDiv);
    parentDiv.appendChild(hr);

    for (var i = 0; i < 3; i++) {
        var OptionDiv = document.createElement("LABEL");
        OptionDiv.classList.add("answer");
        OptionDiv.classList.add("labelContainer");

        var input = document.createElement("INPUT");
        input.setAttribute("type", "radio");
        input.id = AID.concat((i + 1).toString());    //A11
        input.name = QID;     //Q1

        var spanI = document.createElement("SPAN");
        spanI.className = "labelcheckmark";

        var span = document.createElement("SPAN");
        span.id = OID.concat((i + 1).toString());     //O11

        OptionDiv.appendChild(input);
        OptionDiv.appendChild(spanI);
        OptionDiv.appendChild(span);
        parentDiv.appendChild(OptionDiv);
        if (i !== 0) {
            var br = document.createElement("BR");
            parentDiv.insertBefore(br, OptionDiv);
        }
    }

    containerDiv.appendChild(parentDiv);
    if (status != 0 && status != TotalContainer) {
        var br = document.createElement("BR");
        containerDiv.insertBefore(br, parentDiv);
    }

}
function generateResultContainer(RID, SId, CId, ROID,DesID,SyId, status) {
    var containerDiv = document.getElementById("displayResult");
    var tempDiv = document.createElement("div");
    var parentDiv = document.createElement("div");
    var divS = document.createElement("div");
    divS.id = SId;     //S1

    var QuestionDiv = document.createElement("div");
    var hr = document.createElement("HR");
    QuestionDiv.id = RID;       //R1
    parentDiv.style = "padding:2em 2em 2em 2em";
    parentDiv.className = "question";
    tempDiv.appendChild(divS);
    tempDiv.appendChild(QuestionDiv);
    tempDiv.appendChild(hr);
    parentDiv.appendChild(tempDiv);

    for (var i = 0; i < 4; i++) {
        var AnswerDiv = document.createElement("LABEL");
        AnswerDiv.classList.add("answer");
        AnswerDiv.classList.add("labelContainer");
        if (i !== 3) {
            var input = document.createElement("INPUT");
            input.setAttribute("type", "radio");
            input.disabled = true;
            input.id = CId.concat((i + 1).toString());  //C11

            var spanI = document.createElement("SPAN");
            spanI.className = "labelcheckmark";
            AnswerDiv.appendChild(input);
            AnswerDiv.appendChild(spanI);

            var spanS = document.createElement("I");
            spanS.id = SyId.concat((i + 1).toString());     //SY11

            var spanR = document.createElement("SPAN");
            spanR.id = ROID.concat((i + 1).toString());     //RO11
            spanR.className = "paddingClass";

            AnswerDiv.appendChild(spanR);
            AnswerDiv.appendChild(spanS);
        }

        if (i == 3) {
            AnswerDiv = document.createElement("div");
            AnswerDiv.className = "descript";

            var x = document.createElement("H4");
            var t = document.createTextNode("Explanation :- ");
            x.appendChild(t);
            var hr = document.createElement("HR");
            AnswerDiv.appendChild(x);
            AnswerDiv.appendChild(hr);

            var spanR = document.createElement("div");
            spanR.id =DesID;     //D1
            AnswerDiv.appendChild(spanR);

        }

        parentDiv.appendChild(AnswerDiv);
    }

    containerDiv.appendChild(parentDiv);
    if (status != 0 && status != TotalContainer) {
        var br = document.createElement("BR");
        containerDiv.insertBefore(br, parentDiv);
    }
}
function putContainers() {
    console.log("In put containers");
    var QId = "Q";
    var AId = "A";
    var RId = "R";
    var SId = "S";
    var CId = "C";
    var OId = "O";
    var ROID = "RO";
    var DesID="D";
    var SyId="SY";
    for (var i = 0; i < TotalContainer; i++) {
        var Qstring = QId.concat((i + 1).toString());
        var Astring = AId.concat((i + 1).toString());
        var Rstring = RId.concat((i + 1).toString());
        var Sstring = SId.concat((i + 1).toString());
        var Cstring = CId.concat((i + 1).toString());
        var Ostring = OId.concat((i + 1).toString());
        var ROstring = ROID.concat((i + 1).toString());
        var DesIDstring = DesID.concat((i + 1).toString());
        var SyIdString = SyId.concat((i + 1).toString());
        generateQuestionContainer(Qstring, Astring, Ostring, i);
        generateResultContainer(Rstring, Sstring, Cstring, ROstring, DesIDstring,SyIdString,i);
    }
}

function putResult() {
    var ROID = "RO";
    var RID = "R";
    var QID = "O";
    var SID = "S";
    var CID = "C";
    var DesId="D";
    var SyId="SY";
    for (var i = 0; i < TotalContainer; i++) {
        var SymbID = SyId.concat((i + 1).toString());    //SY1
        var SymbolID = SID.concat((i + 1).toString());    //S1
        var TempQID = QID.concat((i + 1).toString());    //O1
        var TempRID = RID.concat((i + 1).toString());   //R1
        var TempROID = ROID.concat((i + 1).toString());   //RO1
        var AnsID1 = TempROID.concat("1");   //RO11
        var AnsID2 = TempROID.concat("2");    //RO12
        var AnsID3 = TempROID.concat("3");    //RO13
        var descriptionID = DesId.concat((i + 1).toString());    //D1
        var TempCID = CID.concat((i + 1).toString());   //C1


        document.getElementById(TempRID).innerHTML = jsonData[RandomNumbers[i]].q;
        document.getElementById(AnsID1).innerHTML = jsonData[RandomNumbers[i]].opt1;
        document.getElementById(AnsID2).innerHTML = jsonData[RandomNumbers[i]].opt2;
        document.getElementById(AnsID3).innerHTML = jsonData[RandomNumbers[i]].opt3;
        document.getElementById(descriptionID).innerHTML = jsonData[RandomNumbers[i]].description;
        document.getElementById(descriptionID).style.textDecoration = "none";
        document.getElementById(descriptionID).style.color = "grey";

        if (jsonData[RandomNumbers[i]].opt1 == jsonData[RandomNumbers[i]].answer) {
            document.getElementById(SymbID.concat("1")).classList.add("fa");
            document.getElementById(SymbID.concat("1")).classList.add("fa-check");
            document.getElementById(SymbID.concat("1")).style.color = "green";
        }
        else if (jsonData[RandomNumbers[i]].opt2 == jsonData[RandomNumbers[i]].answer) {
            document.getElementById(SymbID.concat("2")).classList.add("fa");
            document.getElementById(SymbID.concat("2")).classList.add("fa-check");
            document.getElementById(SymbID.concat("2")).style.color = "green";
        }
        else if (jsonData[RandomNumbers[i]].opt3 == jsonData[RandomNumbers[i]].answer) {
            document.getElementById(SymbID.concat("3")).classList.add("fa");
            document.getElementById(SymbID.concat("3")).classList.add("fa-check");
            document.getElementById(SymbID.concat("3")).style.color = "green";
        }

        var t2 = jsonData[RandomNumbers[i]].answer;
        var t1;

        if (UserAnswers[i] === 1) {
            t1 = document.getElementById(TempQID.concat("1")).innerHTML;
        }
        else if (UserAnswers[i] === 2) {
            t1 = document.getElementById(TempQID.concat("2")).innerHTML;
        }
        else if (UserAnswers[i] === 3) {
            t1 = document.getElementById(TempQID.concat("3")).innerHTML;
        }
        if (t1 !== t2) {

            document.getElementById(SymbolID).innerHTML = "Incorrect";
            document.getElementById(SymbolID).className = "resultStatus";
            document.getElementById(SymbolID).style.color = "red";
        }
        else {
            document.getElementById(SymbolID).innerHTML = "Correct";
            document.getElementById(SymbolID).className = "resultStatus";
            document.getElementById(SymbolID).style.color = "green";
        }


        if (t1 == jsonData[RandomNumbers[i]].opt1) {

            var checkedInputID = TempCID.concat("1"); //C11
            document.getElementById(checkedInputID).checked = true;

            if (t1 == jsonData[RandomNumbers[i]].answer) {
                document.getElementById(SymbID.concat("1")).classList.add("fa");
                document.getElementById(SymbID.concat("1")).classList.add("fa-check");
                document.getElementById(SymbID.concat("1")).style.color = "green";
            }
            else {
                document.getElementById(SymbID.concat("1")).classList.add("fa");
                document.getElementById(SymbID.concat("1")).classList.add("fa-close");
                document.getElementById(SymbID.concat("1")).style.color = "red";
            }

        } else if (t1 == jsonData[RandomNumbers[i]].opt2) {

            var checkedInputID = TempCID.concat("2"); //C11
            document.getElementById(checkedInputID).checked = true;

            if (t1 == jsonData[RandomNumbers[i]].answer) {
                document.getElementById(SymbID.concat("2")).classList.add("fa");
                document.getElementById(SymbID.concat("2")).classList.add("fa-check");
                document.getElementById(SymbID.concat("2")).style.color = "green";
            }
            else {
                document.getElementById(SymbID.concat("2")).classList.add("fa");
                document.getElementById(SymbID.concat("2")).classList.add("fa-close");
                document.getElementById(SymbID.concat("2")).style.color = "red";
            }

        } else if (t1 == jsonData[RandomNumbers[i]].opt3) {

            var checkedInputID = TempCID.concat("3"); //C11
            document.getElementById(checkedInputID).checked = true;

            if (t1 == jsonData[RandomNumbers[i]].answer) {
                document.getElementById(SymbID.concat("3")).classList.add("fa");
                document.getElementById(SymbID.concat("3")).classList.add("fa-check");
                document.getElementById(SymbID.concat("3")).style.color = "green";
            }
            else {
                document.getElementById(SymbID.concat("3")).classList.add("fa");
                document.getElementById(SymbID.concat("3")).classList.add("fa-close");
                document.getElementById(SymbID.concat("3")).style.color = "red";
            }
        }
    }

}
function removeChilds() {
    console.log("Remove child");
    var qDiv = document.getElementById("quizBody");
    while (qDiv.hasChildNodes()) {
        qDiv.removeChild(qDiv.firstChild);
    }

    var rDiv = document.getElementById("displayResult");
    while (rDiv.hasChildNodes()) {
        rDiv.removeChild(rDiv.firstChild);
    }
    var resultdiv = document.getElementById("result");
    resultdiv.removeChild(resultdiv.childNodes[2]);
}
function startQuizinit() {
    if (TotalContainer > 0 && jsonData.length > 0 && TotalContainer <= jsonData.length) {
        document.getElementById("startBtnInit").style.display = "none";

        document.getElementById("instructions").style.display = "none";
        document.getElementById("TaskTitle").innerHTML = title;
        document.getElementById("result").style.visibility = "hidden";
        document.getElementById("displayResult").style.display = "none";
        removeChilds();
        putContainers();
        document.getElementById("submitBtn").style.display = "block";
        putQuestion();
        document.getElementById("quizBody").style.display = "block";
        console.log("Total questions->" + jsonData.length);
    }
    else {
        console.log(TotalContainer + "    " + jsonData.length);
        alert("Either minimum questions set to zero or no questions in json file or minimum questions exceeded limit");
    }
}
function startQuiz() {

    document.getElementById("instructions").style.display = "none";
    document.getElementById("TaskTitle").innerHTML = title;
    document.getElementById("result").style.visibility = "hidden";
    document.getElementById("displayResult").style.display = "none";
    removeChilds();
    putContainers();
    document.getElementById("startBtn").style.visibility = "hidden";
    document.getElementById("submitBtn").style.display = "block";
    putQuestion();
    document.getElementById("quizBody").style.display = "block";

}
function isSubmittable() {
    var AID = "A";
    var status = 0;
    for (var i = 0; i < TotalContainer; i++) {
        var TempAID = AID.concat((i + 1).toString());
        var TempAID1 = TempAID.concat("1");
        var TempAID2 = TempAID.concat("2");
        var TempAID3 = TempAID.concat("3");
        if (document.getElementById(TempAID1).checked) {
            status = 1;
        }
        else if (document.getElementById(TempAID2).checked) {
            status = 1;
        }
        else if (document.getElementById(TempAID3).checked) {
            status = 1;
        }
        else {
            status = 0;
        }
    }
    return status;
}
function submitQuiz() {
    var status = isSubmittable();
    if (status == 0) {
        alert("Please attempt all questions");
    }
    else {
        document.getElementById("submitBtn").style.display = "none";
        document.getElementById("startBtn").style.visibility = "visible";
        submitAnswers();
        document.getElementById("quizBody").style.display = "none";
        var t = document.createTextNode("Your Score is : " + (CorrectCount).toString() + " out of " + TotalContainer);
        document.getElementById("result").appendChild(t);
        putResult();
        document.getElementById("TaskTitle").innerHTML = "Quiz Results";
        document.getElementById("result").style.visibility = "visible";
        document.getElementById("displayResult").style.display = "block";
        CorrectCount = 0;
        ArrayEmpty = 1;
        UserAnswers = [];
        RandomNumbers = [];
    }
}

function generateRandomIndex() {
    var x = Math.floor((Math.random() * TotalContainer) + 0);
    var temp = RandomNumbers.indexOf(x);
    while (temp != -1 && ArrayEmpty === 0) {
        x = Math.floor((Math.random() * TotalContainer) + 0);
        temp = RandomNumbers.indexOf(x);
    }
    RandomNumbers.push(x);
    ArrayEmpty = 0;
    return x;
}

function getContent(TempQID, OptionOID) {
    var RandomIndex = generateRandomIndex();
    console.log("Get content->>>>Qid->" + TempQID + "  " + RandomIndex);
    var tempStack = [];
    for (var i = 0; i < 3; i++) {

        var x = Math.floor((Math.random() * 3) + 1);
        var temp = tempStack.indexOf(x);
        while (temp != -1) {
            x = Math.floor((Math.random() * 3) + 1);
            temp = tempStack.indexOf(x);
        }
        tempStack.push(x);
    }

    document.getElementById(TempQID).innerHTML = jsonData[RandomIndex].q;
    document.getElementById(OptionOID.concat((tempStack[0]).toString())).innerHTML = jsonData[RandomIndex].opt1;
    document.getElementById(OptionOID.concat((tempStack[1]).toString())).innerHTML = jsonData[RandomIndex].opt2;
    document.getElementById(OptionOID.concat((tempStack[2]).toString())).innerHTML = jsonData[RandomIndex].opt3;
    console.log("Question putted is->" + jsonData[RandomIndex].q);
    console.log("Question putted in->" + document.getElementById(TempQID).innerHTML);
}

function putQuestion() {
    var QID = "Q";
    var OID = "O";
    for (var i = 0; i < TotalContainer; i++) {
        var OptionOID = OID.concat((i + 1).toString());
        var TempQID = QID.concat((i + 1).toString());
        getContent(TempQID, OptionOID);
    }
}

function checkAnswer(AnsId, JsonId, OId) {
    var userAns = -1;
    if (document.getElementById(AnsId.concat("1")).checked) {
        userAns = 1;
        if (document.getElementById(OId.concat("1")).innerHTML == jsonData[JsonId].answer) {
            CorrectCount = CorrectCount + 1;
        }
        console.log(CorrectCount + " " + document.getElementById(OId.concat("1")).innerHTML + "  ->>" + jsonData[JsonId].answer);
    }
    else if (document.getElementById(AnsId.concat("2")).checked) {
        userAns = 2;
        if (document.getElementById(OId.concat("2")).innerHTML == jsonData[JsonId].answer) {
            CorrectCount = CorrectCount + 1;
        }
        console.log(CorrectCount + " " + document.getElementById(OId.concat("2")).innerHTML + "  ->>" + jsonData[JsonId].answer);
    }
    else if (document.getElementById(AnsId.concat("3")).checked) {
        userAns = 3;
        if (document.getElementById(OId.concat("3")).innerHTML == jsonData[JsonId].answer) {
            CorrectCount = CorrectCount + 1;
        }
        console.log(CorrectCount + " " + document.getElementById(OId.concat("3")).innerHTML + "  ->>" + jsonData[JsonId].answer);
    }
    return userAns;
}

function submitAnswers() {
    var AID = "A";
    var OID = "O";
    for (var i = 0; i < TotalContainer; i++) {
        var TempAID = AID.concat((i + 1).toString());   //A1
        var JsonId = RandomNumbers[i];    //contains the questions index
        var TempOID = OID.concat((i + 1).toString());       //O1
        var userAns = checkAnswer(TempAID, JsonId, TempOID);
        UserAnswers.push(userAns);
    }
}