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


	if(memory.currentFlip.length == 0){
		memory.currentFlip.push(this.className);
		this.className += " rotate"
	} else {
		memory.currentFlip.push(this.className);
		if(memory.currentFlip[0] == memory.currentFlip[1]){
			let classes = memory.currentFlip[0].split(" ");
			this.className += " rotate";
			$("." + classes[1]).addClass("correct");
			memory.completed.push(classes[1]);
		} else{
			let classes1 = memory.currentFlip[0].split(" ");
			let classes2 = memory.currentFlip[1].split(" ");
			$(".rotate." + classes1[1]).addClass("rotate wrong");
			this.className += " rotate wrong";
			setTimeout(function(){
				$("." + classes1[1]).removeClass("rotate");
				$("." + classes2[1]).removeClass("rotate");
			}, 1000)
			setTimeout(function(){
				$("." + classes1[1]).removeClass("wrong");
				$("." + classes2[1]).removeClass("wrong");
			}, 1500)
		}

		memory.currentFlip = [];
	}
	
})