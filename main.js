let memory = {
	currentFlip: [],
	completed: [],
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
	if(!$("#" + this.id).hasClass("block") && memory.currentFlip.length < 2){
		if(memory.currentFlip.length == 0){
			memory.currentFlip.push(this.id);
			this.className += " rotate block"
		} else {
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

async function checkforGameOver(){
	if (memory.completed.length == 16){
		await flipCards();
		$("#game").empty();
		loadIcons(memory.icons);
		memory.currentFlip = [];
		memory.completed = [];
	}
}

async function flipCards(){
	for(const icon of memory.icons){
		await new Promise(resolve => setTimeout(resolve, 150));
		$(".rotate:first").removeClass("rotate");
	}
}
