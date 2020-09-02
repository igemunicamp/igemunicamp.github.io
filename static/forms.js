//this appends the team list and countries to the dropdowns
export default function setupForm(){
	
		var clean_name = "";			
		var countries = ["Argentina", "Australia", "Austria", "Belgium", "Brazil", 
		"Bulgaria", "Canada", "Chile", "China", "Colombia", "Colombia, Israel", 
		"Congo, The Democratic Republic Of The", "Costa Rica", "Czech Republic", 
		"Denmark", "Ecuador", "Egypt", "Estonia", "Finland", "France", "Germany", 
		"Ghana", "Greece", "Honduras", "Hong Kong", "Hungary", "India", "Indonesia", 
		"Ireland", "Israel", "Italy", "Japan", "Kazahkstan", "Kazakhstan", "Korea", 
		"Korea, Republic Of", "Lithuania", "Macao", "Mexico", "Nepal", "Netherlands",
		 "New Zealand", "Norway", "Pakistan", "Panama", "Peru", "Poland", "Puerto Rico"
		 , "Qatar", "Rusia", "Russian Federation", "Singapore", "Slovenia", "South Africa", 
		 "Spain", "Sweden", "Switzerland", "Taiwan", "Thailand", 
		"Turkey", "Uganda", "United Arab Emirates", "United Kingdom", "United States"];

		var x = 0;
		
		for (x=0; x< countries.length; x++){
			clean_name = (countries[x]).replace(/ /g, "_");
			$("#SelectLocation").append("<option value='"+clean_name+"'>"+countries[x]+"</option>");
		}

		//generate the list of unique countries 
		var years = ['2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019'];
		
		for (x=0; x< years.length; x++){
		
			$("#SelectYear").append("<option value='"+years[x]+"'>"+years[x]+"</option>");

		}

		var unique_awards = ["Best Diagnostics Project", "Best Education and  Public Engagement", "Best Energy Project", 
		"Best Environment Project", "Best Food and Nutrition Project", "Best Foundational Advance Project", 
		"Best Hardware", "Best Integrated Human Practices", "Best Manufacturing Project", "Best Measurement",
		"Best Model", "Best New Application Project", "Best New Basic Part", "Best New Composite Part", 
		"Best Open Project", "Best Part Collection", "Best Plant Synthetic Biology", "Best Poster", 
		"Best Presentation", "Best Software Project", "Best Software Tool", "Best Supporting Entrepreneurship", 
		"Best Therapeutics Project", "Best Wiki", "Finalist", "First Runner up", "Grand Prize Winner", "Second Runner up"]

		for (x=1; x< unique_awards.length; x++){
		
			clean_name = (unique_awards[x]).replace(/ /g, "_");
			$("#SelectAward").append("<option value='"+clean_name+"'>"+unique_awards[x]+"</option>");

		}

		var tracks = ['Diagnostics','Energy','Environment', 
					'Food and Nutrition','Foundational Advance',
					'High School','Manufacturing','New Application',
					'Open','Software','Therapeutics'];
		
		for (x=0; x< tracks.length; x++){
		
			$("#SelectTrack").append("<option value='"+tracks[x]+"'>"+tracks[x]+"</option>");

		}
		

		var medals = ['Gold','Silver','Bronze'];

		for (x=0; x< medals.length; x++){
		
			$("#RadioMedal").append(
				'<div class="form-check form-check-inline"> <input class="form-check-input" type="radio" name="medal" id="' 
				+ medals[x] + '" value="' + medals[x]
				+  '"><label class="form-check-label" for="'
				+ medals[x] +'">' + medals[x] + '</label></div>'
				);
		}

		var sections = ['High School','Undergrad','Overgrad'];

		for (x=0; x< sections.length; x++){
		
			$("#RadioSection").append(
				'<div class="form-check form-check-inline"> <input class="form-check-input" type="radio" name="section" id="' 
				+ sections[x] + '" value="' + sections[x]
				+  '"><label class="form-check-label" for="'
				+ sections[x] +'">' + sections[x] + '</label></div>'
				);
		}

		var regions = ['Africa','Asia','Europe','Latin America','North America'];

		for (x=0; x< regions.length; x++){
		
			$("#RadioRegion").append(
				'<div class="form-check form-check-inline"> <input class="form-check-input" type="radio" name="region" id="' 
				+ regions[x] + '" value="' + regions[x]
				+  '"><label class="form-check-label" for="'
				+ regions[x] +'">' + regions[x] + '</label></div>'
				);
		}


		//once the lists are ready, enable the search button 
		$(".filter_button").show();
		$("#go_search_filter").removeClass("button_disabled");
	}



