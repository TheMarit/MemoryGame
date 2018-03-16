let memory = {
	currentFlip: [],
	completed: [],
	moves: 0,
	firstClick: true,
	timer: 0,
	icons: [{"name": "plane", "num": 1}, {"name": "plane", "num": 2}, {"name": "coffee", "num": 1}, {"name": "coffee", "num": 2},  {"name": "beer", "num": 1}, {"name": "beer", "num": 2}, {"name": "bicycle", "num": 1}, {"name": "bicycle", "num": 2},  {"name": "umbrella", "num": 1},  {"name": "heart", "num": 1},  {"name": "bolt", "num": 1},  {"name": "tree", "num": 1}, {"name": "umbrella", "num": 2},  {"name": "heart", "num": 2},  {"name": "bolt", "num": 2},  {"name": "tree", "num": 2},]
}

Array.prototype.shuffle = function() {
    let input = this;
    for (let i = input.length-1; i >=0; i--) {
        let randomIndex = Math.floor(Math.random()*(i+1)); 
        let itemAtIndex = input[randomIndex]; 
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}

$(document).ready(loadIcons(memory.icons));

function loadIcons(arr){
	arr.shuffle();
	for (let icon of arr){
		$("#game").append(
			`<div class="cardcontainer">
				<div class="card ${icon.name}" id="${icon.num}${icon.name}">
					<div class="front"></div>
					<div class="back">
						<i class="fas fa-${icon.name}"></i>
					</div>
				</div>
			</div>`);
	}
}

$(document).on("click", ".card", function(){
	if(memory.firstClick){
		console.log("start Timer");
		memory.firstClick = false;
		window.intervalID = setInterval(function(){
			memory.timer += 1;
			let [hours, min, sec] = changeSecIntoTime(memory.timer);
			updateTime(hours, min, sec);
		}, 1000);
	}
	if(!$("#" + this.id).hasClass("block") && memory.currentFlip.length < 2){
		if(memory.currentFlip.length == 0){
			memory.currentFlip.push(this.id);
			this.className += " rotate block"
		} else {
			memory.moves += 1;
			updateMoves();
			memory.currentFlip.push(this.id);
			if(memory.currentFlip[0].slice(1) == memory.currentFlip[1].slice(1)){
				$("#" + this.id).addClass("rotate");
				$("." + this.id.slice(1)).addClass("correct block");
				memory.completed.push(memory.currentFlip[0], memory.currentFlip[1]);
				memory.currentFlip = [];
				checkforGameOver();
			} else{
				$("#" + memory.currentFlip[0]).addClass("wrong")
				$("#" + this.id).addClass("rotate wrong block");
				setTimeout(function(){
					$("#" + memory.currentFlip[0]).removeClass("rotate");
					$("#" + memory.currentFlip[1]).removeClass("rotate");
				}, 1000)
				setTimeout(function(){
					$("#" + memory.currentFlip[0]).removeClass("wrong block");
					$("#" + memory.currentFlip[1]).removeClass("wrong block");
					memory.currentFlip = [];
				}, 1500)
			}

		}
	}
	
});

function updateMoves(){
	$("#movesCounter").html(memory.moves);
}

function displayWinMessage(){
	let [hours, min, sec] = changeSecIntoTime(memory.timer);
	$("h2").html(`You Win!<br/>You used ${memory.moves} moves and <br/> took <span id="displayMessageMin"></span>${sec} seconds`);
	if(min !=0){
		if(min == 1){
			$("#displayMessageMin").html(`<span id="displayMessageHours"></span>${min} minute and `)
		} else{
			$("#displayMessageMin").html(`<span id="displayMessageHours"></span>${min} minutes and `)
		}
	}
	if(hours !=0){
		$("#displayMessageHours").html(`${hours} hours and `)
	}
	$("#messageWrapper").css("display", "block");
	setTimeout(function(){
		$(".container").css("opacity", "0.5");
		setTimeout(function(){
			$("#messageWrapper").css("opacity", "1");
		}, 500);
	}, 500);
}
$(document).on("click", "#close", function(){
	$(".container").css("opacity", "1");
	$("#messageWrapper").css("display", "none");
	$("#messageWrapper").css("opacity", "0");
});

async function checkforGameOver(){
	if (memory.completed.length == 16){
		clearInterval(intervalID);
		displayWinMessage()
		await flipCards();
		$("#game").empty();
		loadIcons(memory.icons);
		memory.currentFlip = [];
		memory.completed = [];
		memory.moves = 0;
		updateMoves();
		memory.timer = 0;
		memory.firstClick = true;
		$(".time").html(`time: <span id="timerHours"></span><span id="timerMin">0</span>:<span id="timerSec">00</span>`)
	}
}

async function flipCards(){
	for(const icon of memory.icons){
		await new Promise(resolve => setTimeout(resolve, 150));
		$(".rotate:first").removeClass("rotate");
	}
}

function changeSecIntoTime(sec){
	var min = 0;
	var hours = 0;
	while(sec >= 3600){
		hours++
		sec = sec - 3600;
	}
	while(sec >= 60){
		min++
		sec = sec - 60
	}
	return [hours, min, sec]
}
function updateTime(hours, min, sec){
	if (hours != 0){
		$("#timerHours").text(hours + ":");
	}
	$("#timerMin").text(min);
	if(sec.toString().length === 1){
		$("#timerSec").text("0" + sec);
	} else{
		$("#timerSec").text(sec);
	}
		
	
}