/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
		let filteredPeople = searchByName(people);
		mainMenu(filteredPeople[0], people);
		break;
    case 'no':
		searchByTraits(people);
		break;
    default:
		alert("Wrong! Please try again, following the instructions dummy. :)");
		app(people); // restart app
		break;
  }
}

function searchByTraits(people) {
  let filteredPeople = people;
  let continueSearch = true;
  let traits = createTraitsArray();


  while (continueSearch===true){
	let userSearchChoice =   prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
	switch(userSearchChoice) {
		case "height":
			filteredPeople = searchByHeight(filteredPeople);
			break;
		case "weight":
			filteredPeople = searchByWeight(filteredPeople);
			break;
		case "eye color":
			filteredPeople = searchByEyeColor(filteredPeople);	
			break;
		case "occupation":
			filteredPeople = searchByOccupation(filteredPeople);	
			break;
		case "age":
			filteredPeople = searchByAge(filteredPeople);
			break;
		case "gender":
			filteredPeople = searchByGender(filteredPeople);
			break;
		default:
			alert("You entered an invalid search type! Please try again.");
			searchByTraits(filteredPeople);
			break;
	}
		if(filteredPeople.length>1){
			displayPeople(filteredPeople);
			continueSearch = searchAgain(filteredPeople.length);
		}
		else{
			continueSearch = false;
		}
  }
	let foundPerson = filteredPeople[0];
	mainMenu(foundPerson, people);
}

function createTraitsArray(){
	let traits = [
		{
		"trait":"height",
		"searched":false
		},
		{
		"trait":"weight",
		"searched":false
		},
		{
		"trait":"eye color",
		"searched":false
		},
		{
		"trait":"gender",
		"searched":false
		},
		{
		"trait":"age",
		"searched":false
		},
		{
		"trait":"occupation",
		"searched":false
		}];

	return traits;
}
function getUserSearchChoice(heightSearched,weightSearched,eyeColorSearched,genderSearched,ageSearched,occupationSearched){
	
 let searchString = "What would you like to search by?";
 
 if(heightSearched===false){
	searchString +="'height', ";
 }
 if(weightSearched===false){
	searchString +="'weight', ";
 }
 if(eyeColorSearched===true){
	searchString +="'eye color', ";
 }
 if(heightSearched===true){
	searchString +="'height', ";
 }
 if(heightSearched===true){
	searchString +="'height', ";
 }
 
 return prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");	
	
}
function searchAgain(length){
	let continueSearch = promptFor("We have found "+ length +" People with that trait. Would you like to search using another trait? Type 'yes' to search again or 'no' to continue", yesNo).toLowerCase();
	
	if(continueSearch === 'yes'){
		return true;
	}
	else if(continueSearch === 'no'){
		return false;
	}
	else{
		searchAgain(length);
	}
}



function searchByWeight(people) {
  let weightInput = prompt("How much does the person weigh?");
  let peopleWithinCriteria = people.filter(function (el) {
    
     if(el.weight === parseInt(weightInput)) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return peopleWithinCriteria;
}

function searchByHeight(people){

	let heightInput = prompt("What is this persons height?");

	let peopleWithinCriteria = people.filter (function (el){
	if(el.height === parseInt(heightInput)){
	return true;}
	});
	return peopleWithinCriteria;
};

function searchByEyeColor(people){

	let eyeColorInput = prompt("What is this persons eye color?");

	let peopleWithinCriteria = people.filter (function (el){
	if(el.eyeColor === eyeColorInput){
	return true;}
});	
	return peopleWithinCriteria;
};

function searchByOccupation(people){
	let occupationInput = prompt("What is this persons occupation?")

	let peopleWithinCriteria = people.filter (function (el){
	if (el.occupation === occupationInput){
	return true;}
	});
	return peopleWithinCriteria;
};

function searchByGender(people){
	let genderInput = prompt("What is this person gender?")

	let peopleWithinCriteria = people.filter(function (el) {
	if (el.gender === (genderInput)){
	return true;}
	});
	return peopleWithinCriteria;
};

function searchByAge(people){
	
	let ageGoal = prompt("What is the person's age?");
	
	let peopleWithinCriteria = people.filter (function (el){
	if (parseInt(ageGoal) === getAge(el.dob)){
	return true;}
	});
	
	return peopleWithinCriteria;
}

function getAge(dateOfBirth){
  
  let dob = new Date(dateOfBirth);
  let currentDate = new Date();
  
  if(dob.getMonth()<currentDate.getMonth()){
		return currentDate.getFullYear() - dob.getFullYear();
  }
  else if(dob.getMonth()===currentDate.getMonth()){
	  if(dob.getDay()<=currentDate.getDay()){
		return currentDate.getFullYear() - dob.getFullYear();
	  }	  
  }
  
  return currentDate.getFullYear()- dob.getFullYear() -1;
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
		displayPerson(person);
		break;
	case "family":
		displayFamily(person,people);
		break;
    case "descendants": // TODO: get person's descendants
		displayPeople(people);
		break;
	case "restart":
		app(people); // restart
		break;
    case "quit":
		return; // stop execution
    default:
		return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);

  var lastName = promptFor("What is the person's last name?", chars);
  	let peopleWithinCriteria = people.filter (function(el){
  	if (el.firstName.toLowerCase() === firstName.toLowerCase() &&
	el.lastName.toLowerCase() === lastName.toLowerCase()){
	return true;}});

	return peopleWithinCriteria;
  }
	

  // TODO: find the person using the name they entered

function displayFamily(person,people){
	
	let family = [];
		
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
	
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

// user needs list of their full names, descendants are limited 'by blood' (use recursion)

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";  
  personInfo += "Height: " + person.height + "in.\n";
  personInfo += "Weight: " + person.weight + "lbs.\n";
  personInfo += "Eye color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";

  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
