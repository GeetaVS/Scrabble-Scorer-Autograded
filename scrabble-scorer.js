// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toLowerCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  const word = input.question("Let's play some scrabble! Enter a word to score:");
   const score = oldScrabbleScorer(word);
   console.log(score);
   return word;
};

let newPointStructure = transform(oldPointStructure);

function simpleScorer(word){
   word = word.toLowerCase();
   return word.length;
   const score = oldScrabbleScorer(word);
   console.log(score);
}

function vowelBonusScorer(word){
   word = word.toUpperCase();
   const vowels = ['A','E','I','O','U'];
   let score = 0;
   for(let i=0;i<word.length;i++){
      if(vowels.includes(word[i])){
         score +=3;
      }else {
         score +=1
      }
   }
   return score;
}

function scrabbleScorer(word){
   word = word.toLowerCase();
   let score = 0;
   for(let i=0;i < word.length;i++){
      score +=newPointStructure[word[i]];
   }
   return score
}

const scoringAlgorithms = [
   {
      Name: "Simple Score" ,
      Description: "Each Letter is worth 1 point" ,
      scororFunction: simpleScorer
   },
   {
      Name: "Bonus Vowel" ,
      Description: "Vowels are 3 points and consonents are 1 point" ,
      scororFunction: vowelBonusScorer
   },
   {
      Name: "Scrabble" ,
      Description: "The traditional scoring algorithim" ,
      scororFunction: scrabbleScorer
   },
];

function scorerPrompt() {
   console.log("Which scoring ALgorithim would you like to use:?\n");
   console.log("0-Simple:One Point for Each Charcter.");
   console.log("1-Vowel Bonus:Vowels are Worth Three Points.");
   console.log("2-Scrabble: Uses scrabble point system");
   let choice =' ';
   while(true){
      choice = input.question("Enter 0, 1 or 2: ");
      if(choice === '0' || choice ==='1'|| choice ==='2' ){
         break;
      }else{
         console.log("Invalid input. Please enter 0,1,or2 only");
      }
   }
  return scoringAlgorithms[Number(choice)]; 
}

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (let pointValue in oldPointStructure){
      let letters = oldPointStructure[pointValue];
      for(let i=0;i<letters.length;i++){
         let letter = letters[i].toLowerCase();
         newPointStructure[letter]= +pointValue
      }
   }
   return newPointStructure;
};

function runProgram() {
    const word = initialPrompt();
const selectedAlgorithim = scorerPrompt();
const score = selectedAlgorithim.scororFunction(word);
console.log(`Score for '${word}': '${score}':`);   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
