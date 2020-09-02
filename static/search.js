import {printTeam} from './print.js'

//this is the main search and filter function 
export function searchRequest(searchstr){
			// Replace ./data.json with your JSON feed
			fetch(searchstr)
			  .then((response) => {
			    return response.json()
			  })
			  .then((data) => {
			  	$("#filtered_results").append("<p id='found_teams'> Found "+data.count +" result(s).</p>");
			  	if (data.count > 10) {
			  		$("#found_teams").append(" Printing " + data.results.length + " teams:");
			  	}

			  	if(data.previous){
			  		$("#filtered_results").append("<a id='loadPrevious' class='btn btn-outline-primary' href='/?"+ data.previous.split('?')[1] +"' role='button'>Load previous</a>");
			  	}
			  	if(data.next){
			  		$("#filtered_results").append("<a id='loadNext' class='btn btn-outline-primary' href='/?"+ data.next.split('?')[1] +"' role='button'>Load next</a>");
			  	}
			    // Work with JSON data here
			    //once the search is complete print results 
			    for(var team in data.results) {
			    	printTeam("#filtered_results", data.results[team]);
			    }
			  })
			  .catch((err) => {
			    // Do something for an error here
			  })
}