let memory = {
	currentFlip: [],
	icons: ["plane", "coffee", "beer", "bicycle", "umbrella", "heart", "bolt", "tree", "plane", "coffee", "beer", "bicycle", "umbrella", "heart", "bolt", "tree"]
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
				<div class="card ${icon}">
					<div class="front"></div>
					<div class="back">
						<i class="fas fa-${icon}"></i>
					</div>
				</div>
			</div>`)
	}
}

$(document).on("click", ".card", function(){
	if(memory.currentFlip.length == 0){
		memory.currentFlip.push(this.className);
		this.className += " rotate"
	} else {
		memory.currentFlip.push(this.className);
		if(memory.currentFlip[0] == memory.currentFlip[1]){
			let classes = memory.currentFlip[0].split(" ")
			this.className += " rotate";
			$("." + classes[1]).addClass("correct");
		} else{
			let classes1 = memory.currentFlip[0].split(" ");
			let classes2 = memory.currentFlip[1].split(" ");

			this.className += " rotate";
			setTimeout(function(){
				$("." + classes1[1]).removeClass("rotate");
				$("." + classes2[1]).removeClass("rotate");
			}, 1000)
		}

		memory.currentFlip = [];
	}
	
})