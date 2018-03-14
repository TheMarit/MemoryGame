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
	memory.currentFlip.push(this.className);
	this.className += " rotate"
})