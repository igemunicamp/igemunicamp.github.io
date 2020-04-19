$.getJSON( "./static/teams.json", function( all_teams_info ) {

	
	//generate team and country list - once it is done, it will call the function to enable the search button
	setup_lists(all_teams_info);
	
	
	//Place all the team information in the general printing div for users to browse
	
	/*
	x = Math.floor(Math.random() * all_teams_info.length); 

	$("#general_all_teams").append("<p> RANDOM TEAM </p></div>"+
							  "<div class='clear extra_space'>");



	print_this_team("#general_all_teams", all_teams_info[x]);
	*/
	
	//user clicks to load more teams (50 teams have been printed by default)
	var print_round = 0;
	$('#load_more_teams').click(function(){
		//make sure the limit is not exceeded 
		if( (print_round + 50 )  <= all_teams_info.length  ) {
			print_round = print_round+50;
		}
		else{
			print_round = print_round + (all_teams_info.length - print_round);
			
		}
		
		//remove the button if the limit has passed
		if(print_round + 50 > all_teams_info.length){
			$('#load_more_teams').hide();
		}
		
		//print round = start
		//print round + 50 = end 
		for( x = print_round; x < (print_round+50); x++) {
			print_this_team("#general_all_teams", all_teams_info[x]);
		}
		

	});

	$(".filter_button").show();
	
	/*
	//switch between the categories
	$('.filter_categories_titles').click(function() {
		
		//get the id of the selected one
		var filter = this.id;
		
		//remove previous intances of the class
		$('.showing').removeClass('showing');
		
		//append the showing class to the selected ones
		$("#"+filter).addClass('showing');
		$("#category_"+filter).addClass('showing');	
		
		
		if(filter == "complete_team_list"){
			$(".filter_button").hide();
		}
		else{
			$(".filter_button").show();
		}
		
	});
	
	//if the user is selecting something from the team list dropdown
	$( "#team_list" ).change(function() {
		
		//empty all previous results
		$("#filtered_results").empty();	
		
		//get what team the user is looking for
		var team_to_look_for = $('#team_list').val();
		
		//if the user selected all teams, display general all teams
		if(team_to_look_for == 'all_teams'){
			$("#general_all_teams").fadeIn(500);
		}
		//if not, search for that team
		else{
			$("#general_all_teams").fadeOut(500);
			find_selected_team(team_to_look_for, all_teams_info);
		}
		
	});

	*/
	
	
	//if the user clicks on a filter subcategory
	$('.horizontal_select li').click(function() {
		
		var x = $(this).closest('ul').attr('id');
		
		$("#"+x+' li').removeClass('selected_subcategory');
		$(this).addClass('selected_subcategory');
		 
		special_conditions();
			
	});
		
	
	//if the user requests a specific search
	$('#go_search_filter').click(function() {

		//$("#loading_stuff").show();
  		search_request(all_teams_info);

	});
	
	
});

	

	//functions
	//this appends the team list and countries to the dropdowns
	function setup_lists(team_list){
	
		var clean_name;
		//generate the team list 
		for (x=0; x< team_list.length; x++){
		
			clean_name = (team_list[x].team_name).replace(/ /g, "_");
		
			$("#team_list").append("<option value='"+clean_name+"'>"+team_list[x].team_name+"</option>");

		}

		
		
				
		//clean the previous variable
		clean_name = "";
		
		//generate the list of unique countries 
		var countries = [... new Set(team_list.map(x => x.location))];
		
		//order alphabetically 
		countries.sort();
		
		for (x=0; x< countries.length; x++){
		
			clean_name = (countries[x]).replace(/ /g, "_");
		
			$("#country_list").append("<option value='"+clean_name+"'>"+countries[x]+"</option>");

		}

		//generate the list of unique countries 
		var years = ['2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019'];
		
		
		for (x=0; x< years.length; x++){
		
			$("#year_list").append("<option value='"+years[x]+"'>"+years[x]+"</option>");

		}
		
		
		//clean the previous variable
		clean_name = "";
		var all_awards_str ="";
		
		//generate a string with all the awards
		for (x=0; x< team_list.length; x++){
					
			if(team_list[x].award != '-' && team_list[x].award != "" && team_list[x].award !=" " && team_list[x].year == "2019"){
					
				all_awards_str = all_awards_str + team_list[x].award +",";		
				
			}		
		}
		
		//split the string into an array
		var all_awards_ar = all_awards_str.split(','); 
		all_awards_ar.sort();
		
		for(x=0; x < all_awards_ar.length; x++){
			if( all_awards_ar[x].charAt(0) == " "){
				
				all_awards_ar[x] = (all_awards_ar[x]).substring(1, all_awards_ar[x].length);
				
			}
		}
		
		
		//get all the unique values of the array
		const unique = (value, index, self) => {
  			return self.indexOf(value) === index;
		}
		const unique_awards = all_awards_ar.filter(unique);
		
		//sort the unique values
		unique_awards.sort();
		
		//generate the list of unique awards and nominations 
		//note: this will be this starts in 1 since the array has an empty spot at the beginning
		
		for (x=1; x< unique_awards.length; x++){
		
			clean_name = (unique_awards[x]).replace(/ /g, "_");
		
			$("#awards_list").append("<option value='"+clean_name+"'>"+unique_awards[x]+"</option>");

		}
		
		//once the lists are ready, enable the search button 
		enable_search_button();
	}

	//this function enables the search button
	function enable_search_button(){
		$("#go_search_filter").removeClass("button_disabled");
		console.log("The search button is now enabled");
	}

	//this function finds a specific team from the dropdown and then sends it to print
	function find_selected_team(team_name, all_teams_info){
		
		var temp_clean_name;
		
		for (x=0; x< all_teams_info.length; x++){

			temp_clean_name = (all_teams_info[x].team_name).replace(/ /g, "_");
			
			if(team_name == temp_clean_name) {	
						
				print_this_team("#filtered_results", all_teams_info[x]);

			}
		}
	}
	
	//this is the general function for printing team information
	function print_this_team(where_to_append, team_to_print){
		
		//this contains the specifications for the icons used 
		var svgs_coordinates = [
			// institution
			"<svg class='small_icon' height='20px' enable-background='new 0 0 250 250' version='1.1' viewBox='0 0 250 250' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'><style type='text/css'>.st0{fill:#085156;}</style><path class='st0' d='m218.4 95.6c3.1 0 5.6-2.3 5.6-5.1v-10.7c0-2.1-1.5-4-3.8-4.8l-93.5-29.9c-1.3-0.4-2.5-0.4-3.8 0l-93.4 29.9c-2.3 0.8-3.8 2.7-3.8 4.8v10.7c0 2.9 2.5 5.1 5.6 5.1h27.4v90.2h-27.3c-3.1 0-5.6 2.3-5.6 5.1v9.1c0 2.9 2.5 5.1 5.6 5.1h187.2c3.1 0 5.6-2.3 5.6-5.1v-9.3c0-2.9-2.5-5.1-5.6-5.1h-27.9v-90h27.7zm-140.5 0h37.4v90.2h-37.7l0.3-90.2zm94 90.2h-37.7v-90.2h37.7v90.2z'/></svg>",
			
			//location
			"<svg class='small_icon' enable-background='new 0 0 250 250' version='1.1' viewBox='0 0 250 250' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'  height='20px' > <style type='text/css'>.st0{fill:#085156;}</style> <path class='st0' d='m168.5 104.1l32-44.8c2.2-3.1 1.5-7.5-1.6-9.7-1.2-0.8-2.6-1.3-4-1.3h-132.7v-7c0-3.9-3.1-7-7-7s-7 3.1-7 7v167.5c0 3.9 3.1 7 7 7s7-3.1 7-7v-48.8h132.6c3.9 0 7-3.2 6.9-7 0-1.4-0.5-2.8-1.3-4l-31.9-44.9z'/></svg>",
			
			//region
			"<svg class='small_icon' height='20px' enable-background='new 0 0 250 250' version='1.1' viewBox='0 0 250 250' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'><style type='text/css'>.st0{fill:#085156;}</style><path class='st0' d='m126 34c-34.7 0-63 26.8-63 59.6 0 12 5.7 28.1 11.7 37.5l51.3 79.4 51.3-79.3c6-9.5 11.7-25.7 11.7-37.6 0-33-28.3-59.6-63-59.6zm-1 80c-12.2 0-22-9.8-22-22s9.8-22 22-22 22 9.8 22 22-9.8 22-22 22z'/></svg>",
			
			//section
			"<svg class='small_icon' enable-background='new 0 0 250 250' version='1.1' viewBox='0 0 250 250' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' height='20px'><style type='text/css'> .st0{fill:#085156;} </style>	<g transform='translate(0 -952.36)'><path class='st0' d='m105.7 990.4l-2.3 20.3c-9.5 3.1-18.1 8.1-25.4 14.7l-18.7-8.2-19.3 33.4 16.5 12.1c-1 4.7-1.6 9.6-1.6 14.7 0 5 0.6 9.9 1.6 14.7l-16.5 12 19.3 33.5 18.7-8.2c7.2 6.5 15.9 11.6 25.4 14.7l2.3 20.3h38.7l2.3-20.3c9.5-3.1 18.1-8.1 25.4-14.7l18.7 8.2 19.3-33.5-16.5-12.1c1-4.7 1.6-9.6 1.6-14.7 0-5-0.6-9.9-1.6-14.7l16.5-12.1-19.3-33.5-18.7 8.2c-7.2-6.5-15.9-11.6-25.4-14.7l-2.3-20.3h-38.7zm19.3 45.9c22.7 0 41.1 18.4 41.1 41.1s-18.4 41.1-41.1 41.1-41.1-18.4-41.1-41.1 18.4-41.1 41.1-41.1z'/></g></svg>",
			
			//track
			{'Diagnostics':'<svg class="small_icon" height="20px" enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g fill="#FA7C89"><path d="M17.093,50h9.857l6.699-16.9l9.2,23.701l5-12.601l3.5,9.001h3.399l9.2-23.602l8,20.3l11.398-0.1   c1.5-3,2.5-6,2.5-9.1c0-10.4-8.5-18.9-18.898-18.9c-11,0-16.801,10.3-16.801,10.3s-5.699-10.3-16.8-10.2   C22.95,22,14.45,30.4,14.45,40.8c0,3.5,1.3,7.1,3.399,10.501L17.093,50z"/><path d="m70.35 52.5l-6.199-16-7.699 19.301h-6.7l-1.902-4.801-4.9 12.5-9.2-23.5-5 12.6-10-0.1c9.399 14 31.6 25.701 31.6 25.701 2.7-1.4 23.1-12.201 31.8-25.701h-11.8z"/></g></svg>',
			'Energy':'<svg class="small_icon" height="20px" enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m56.726 25.6v-6.2h-13.4v6.2h-11.8v55h37.3v-55h-12.1zm-9.401 49.3l0.2-20.602h-9.601l14-22.599-0.5 18.2h10.801l-14.9 25.001z" fill="#FFD377"/></svg>',
			'Environment':'<svg class="small_icon" height="20px" enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g fill="#8EDCED"><path d="m64.15 44.5c0 3-2.3 5.4-5.3 5.5-3 0-5.4-2.3-5.5-5.3 0-3 5.199-9.5 5.199-9.5s5.501 6.3 5.601 9.3z"/><path d="m77.851 47.1c-0.4 0-0.801 0-1.2 0.1 0.399-1.5 0.6-3 0.6-4.6 0-10.6-8.6-19.2-19.2-19.2-10.2 0-18.6 8-19.2 18.1 0 0.2-0.101 0.4-0.101 0.5-0.6-0.5-1.2-1-1.8-1.4-2.1-1.4-4.6-2.3-7.3-2.3-7.101 0-12.9 5.8-12.9 12.899 0 1.9 0.4 3.6 1.101 5.201h-0.2c-5.601 0-10.101 4.5-10.101 10.1s4.5 10.1 10.101 10.1h0.3l27.4-0.1h32s0.399-0.1 0.5-0.1h0.699c7.801-0.4 14-6.801 14-14.602 0.1-8.198-6.5-14.698-14.699-14.698zm-19.401 10.5c-8.201 0-14.901-6.7-14.901-14.9s6.7-14.9 14.901-14.9c8.2 0 14.9 6.7 14.9 14.9s-6.6 14.9-14.9 14.9z"/></g></svg>',
			'Food and Nutrition':'<svg class="small_icon" height="20px" enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g fill="#49D492"><path d="m64.3 28.5c-5.8 0-11.1 2.4-14.8 6.3-3.7-3.9-9-6.3-14.8-6.3-11.3 0-18.2 9.2-18.2 20.5s11 30.9 22.3 30.9c9.8 0 10.7-3.101 10.7-3.101s0.9 3.101 10.7 3.101c11.3 0 22.3-19.6 22.3-30.9s-6.9-20.5-18.2-20.5zm-4.7 27.8c-1.399 1.9-4.1 2.2-5.899 0.8-1.9-1.399-4.2-8.6-4.2-8.6s7.5 0.4 9.4 1.9c1.699 1.4 2.099 4.1 0.699 5.9zm-1.9-10.6c0-2.3 4.2-8.5 4.2-8.5s4.199 6.2 4.199 8.6c0 2.3-1.899 4.2-4.199 4.2s-4.2-2-4.2-4.3zm12.4 11.4c-1.9 1.4-4.5 1.1-5.9-0.8s-1.1-4.5 0.8-5.9 9.4-1.9 9.4-1.9-2.4 7.2-4.3 8.6z"/><path d="m46.5 30.8c1.9 1.4 4.5 1.1 5.9-0.8 1.399-1.9 1.8-9.4 1.8-9.4s-7.1 2.4-8.6 4.2c-1.3 1.9-1 4.6 0.9 6z"/></g></svg>',
			'Foundational Advance':'<svg class="small_icon" height="20px" enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><polygon points="77.074 73.5 77.074 47.4 65.176 47.4 65.176 73.5 59.176 73.5 59.176 42.2 82.574 42.2 49.975 21.3 17.475 42.2 41.275 42.2 41.275 73.5 35.375 73.5 35.375 47.4 23.375 47.4 23.375 73.5 17.475 73.5 17.475 78.699 82.975 78.699 82.975 73.5" fill="#CDA58D"/></svg>',
			'High School':'<svg class="small_icon" height="20px" enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g fill="#FFA16B"><circle cx="50.15" cy="50" r="8.3"/><path d="m50.15 18.8c-17.2 0-31.2 14-31.2 31.2 0 17.199 14 31.199 31.2 31.199s31.2-14 31.2-31.199c0-17.2-14-31.2-31.2-31.2zm14.799 31.2c0 1.5-0.199 2.899-0.6 4.199l5.2 3.101c0.899 0.5 1.2 1.7 0.6 2.5l-1.899 3.2c-0.5 0.899-1.7 1.199-2.5 0.6l-5.2-3.1c-1.8 1.8-4.101 3.1-6.7 3.8v6c0 1-0.8 1.8-1.8 1.8h-3.7c-1 0-1.8-0.8-1.8-1.8v-6c-2.6-0.7-4.9-2-6.7-3.8l-5.2 3.1c-0.9 0.5-2 0.2-2.5-0.6l-1.9-3.2c-0.5-0.9-0.2-2 0.6-2.5l5.2-3.101c-0.4-1.3-0.6-2.699-0.6-4.199s0.2-2.9 0.6-4.2l-5.2-3.1c-0.9-0.5-1.2-1.7-0.6-2.5l1.9-3.2c0.5-0.9 1.7-1.2 2.5-0.601l5.2 3.101c1.8-1.8 4.1-3.101 6.7-3.8v-6c0-1 0.8-1.801 1.8-1.801h3.7c1 0 1.8 0.801 1.8 1.801v6c2.6 0.699 4.9 2 6.7 3.8l5.2-3.101c0.899-0.5 2-0.199 2.5 0.601l1.899 3.2c0.5 0.899 0.2 2-0.6 2.5l-5.2 3.1c0.401 1.3 0.6 2.7 0.6 4.2z"/></g></svg>',
			'Manufacturing':'<svg class="small_icon" height="20px" enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m63.5 51.5v-12.5l-19.3 12.5v-12.5l-15.4 10v-28.7h-11.6v59.399h65.601v-40.599l-19.301 12.4zm-23.9 18.801h-7.7v-9.4h7.7v9.4zm17.701 0h-7.701v-9.4h7.701v9.4zm17.799 0h-7.7v-9.4h7.7v9.4z" fill="#5F7687"></svg>',
			'New Application':'<svg class="small_icon" height="20px" enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g fill="#D1A5E0"><rect x="40.49" y="73.851" width="19" height="3.8"/><rect x="40.49" y="80.75" width="19" height="3.8"/><path d="m70.09 26.45c-4.1-6.6-11.5-11-20-11s-15.9 4.4-20 11c-2.2 3.5-3.4 7.5-3.4 11.9 0 4.5 1.3 8.699 3.6 12.3 2.3 4.3 5.1 8 6.5 10.899 2.5 5 3.7 9.4 3.7 9.4h19s1.199-4.4 3.699-9.4c1.4-2.8 4.2-6.6 6.5-10.899 2.301-3.5 3.601-7.7 3.601-12.3 0.2-4.4-1.101-8.4-3.2-11.9zm-13.8 15.2l1.399 8.399-7.7-4-7.7 3.9 1.5-8.4-6.2-5.899 8.6-1.2 3.9-7.6 3.8 7.6 8.601 1.2-6.2 6z"/></g></svg>',
			'Therapeutics':'<svg class="small_icon" height="20px" enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g fill="#FFABC1"><path d="M63.25,51.25v3.2h-8.899v8.9h-8.9v-8.9h-8.8v-3.2h-6.7v13c0,11,9,20,20,20s20-9,20-20v-13H63.25z"/><path d="M49.95,15.75c-11,0-20,9-20,20v13h6.7v-3.2h8.899V36.65h8.9v8.899h8.9v3.2h6.7v-13   C69.95,24.75,60.95,15.75,49.95,15.75z"/></g></svg>',
			'Software':'<svg class="small_icon" height="20px"  enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m84.05 25.55c0-0.9-0.8-1.7-1.699-1.7h-64.7c-0.9 0-1.7 0.8-1.7 1.7v48.899c0 0.9 0.8 1.701 1.7 1.701h64.7c0.899 0 1.699-0.801 1.699-1.701v-48.899zm-3.4 24.6l-22.6 22.6-3.8-3.801 18.9-18.899-18.9-18.9 3.8-3.8 22.6 22.8zm-38.1 11.1l-3.8-3.801 18.7-18.599 3.8 3.8-18.7 18.6zm3.2-30.3l-18.899 18.9 18.899 18.9-3.8 3.801-22.6-22.601 22.5-22.5h0.199l3.701 3.5z" fill="#B2C4CB"/></svg>',
			'Open':'<svg class="small_icon" height="20px" enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><style type="text/css"> .st0{fill:#019CDB;}</style><circle class="st0" cx="50.1" cy="50.6" r="6"/><path class="st0" d="m63.8 22.4h-27.6l-18.3 27.6 18.4 27.6h27.6l18.2-27.6-18.3-27.6zm2.1 27.9c0 8.8-7.1 15.9-15.9 15.9s-16-7.1-16-15.9 7.1-15.9 15.9-15.9 16 7.1 16 15.9z"/></svg>',
			'-':'<svg class="small_icon" height="20px" enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><style type="text/css"> .st0{fill:#019CDB;}</style><circle class="st0" cx="50.1" cy="50.6" r="6"/><path class="st0" d="m63.8 22.4h-27.6l-18.3 27.6 18.4 27.6h27.6l18.2-27.6-18.3-27.6zm2.1 27.9c0 8.8-7.1 15.9-15.9 15.9s-16-7.1-16-15.9 7.1-15.9 15.9-15.9 16 7.1 16 15.9z"/></svg>'
			},

			//parts
			"<svg class='small_icon' enable-background='new 0 0 250 250' version='1.1' viewBox='0 0 250 250' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'  height='20px' ><style type='text/css'> .st0{fill:#085156;}</style><path class='st0' d='m204.8 76.3c-3.3 1.5-5.1 4.6-5.2 8.1l-13.8 4.6c-2.4-3.9-5.4-7.2-9-9.6l4.7-11.4c3.1 0.2 6.3-1.4 7.8-4.2 2.1-3.9 0.6-8.8-3.3-10.9s-8.8-0.6-10.9 3.3c-1.6 3.1-1.1 6.4 0.8 8.8l-6.6 9.9c-5.3-2.1-11.2-3.1-17.1-2.5l-2.9-15.9c3-1.6 5-5 4.6-8.6-0.3-5-4.7-8.6-9.7-8.2-5 0.3-8.6 4.7-8.2 9.7 0.4 3.6 2.7 6.6 6.1 7.7l-0.2 17.8c-1.2 0.6-2.6 1.3-3.9 1.9l-8.7 5-4.3-7.3c1.7-1.9 2.3-4.7 1.1-7.1-1.5-3.3-5.4-4.9-8.7-3.4s-4.9 5.4-3.4 8.7c1.2 2.4 3.6 4.1 6.1 4l2.9 8.7-14.1 8-4.7-8.6c2-2 2.6-5.2 1.5-8.1-1.7-3.9-6.1-5.6-9.8-4-3.9 1.7-5.6 6.1-4 9.8 1.1 2.9 4 4.6 7 4.6l3.3 10.2-13.8 7.6-10.2-10.7c1.6-3.1 1.4-6.9-0.8-9.8-3.1-4-8.8-4.6-12.5-1.3-4 3.1-4.6 8.8-1.3 12.5 2.2 2.8 6.1 4 9.3 3l7 10.9c-3.9 2.6-7.1 5.6-9.7 9.5l-16.3-4.6c-0.1-3.5-2.2-6.6-5.6-7.8-4.5-1.7-9.4 0.5-11.4 4.8-1.7 4.5 0.5 9.4 4.8 11.4 3.4 1.3 6.9 0.5 9.4-1.9l14 7.2c-1.1 3.4-1.7 6.8-1.8 10.3l-13.4 4.3c-2-2.9-5.5-4.4-9.2-3.5-4.8 1-8.1 5.7-7 10.7 1 4.8 5.7 8.1 10.7 7 3.5-0.8 6.2-3.5 7-7l12.9-1.3c0.7 3.1 1.9 6.2 3.4 9 1 1.8 2.2 3.5 3.4 5l-10.2 10.3c-3.6-1.9-8.4-1.4-11.7 1.2-4.7 3.7-5.2 10.6-1.5 15.1 3.7 4.7 10.6 5.2 15.1 1.5 3.3-2.9 4.6-7.2 3.6-11.3l13.4-8.9c4 2.3 8.2 4 12.7 5l-1.9 7.6c-2.5 0.1-4.8 1.7-5.9 4.3-1.3 3.4 0.6 7.3 4 8.6s7.3-0.6 8.6-4c0.9-2.6 0.2-5.4-1.7-7.2l4.1-8.7c5.6-0.1 11-1.4 16-4.1l5.8 13.1c-2.8 2.5-3.9 6.3-2.6 9.9 1.7 4.8 7 7.7 11.8 6s7.7-7 6-11.8c-1.1-3.6-4.4-6.1-8-6.4l-3.6-15.9 16.6-9.2 9 11.3c-1.9 2.9-2.2 6.7-0.1 9.8 2.6 4.1 8.2 5.5 12.5 2.8 4.1-2.6 5.5-8.2 2.8-12.5-2.1-3.1-5.6-4.6-9.1-4l-6.3-12.3 17.9-10.1 12.9 11.2c-1.5 3.5-1 7.5 1.7 10.4 3.8 4 9.8 4 13.7 0.5 4-3.8 4-9.8 0.5-13.7-2.7-2.9-6.9-3.7-10.3-2.5l-9.2-11.9c4.3-3.4 7.7-7.7 10-12.5l8.5 1.2c0.5 2.4 2.3 4.7 4.9 5.3 3.5 0.8 7-1.4 7.8-4.9s-1.4-7-4.9-7.8c-2.5-0.6-5.2 0.4-6.7 2.5l-7.3-2.5c1.6-6.3 1.6-13.1-0.3-19.5l12.5-7c2.5 2.3 6 3.1 9.3 1.6 4.3-2 6.5-7.1 4.5-11.4-1.6-5.3-6.7-7.5-11.2-5.4z'/></svg>",
			
			//wiki
			"<svg class='small_icon' enable-background='new 0 0 250 250' version='1.1' viewBox='0 0 250 250' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' height='20px' ><style type='text/css'> .st0{fill:#085156;} </style><path class='st0' d='m216.3 37.1h-182.6c-5.1 0-9.1 4-9.1 9.1v123.9c0 4.8 4 8.9 9.1 8.9h73.3v16.5h-16.3c-2.6 0-4.5 2.1-4.5 4.5v8.5c0 2.6 2.1 4.5 4.5 4.5h68.3c2.6 0 4.5-1.9 4.5-4.5v-8.5c0-2.6-1.9-4.5-4.5-4.5h-16.3v-16.5h73.6c4.8 0 9.1-4 9.1-8.9v-123.8c0-5-3.9-9.2-9.1-9.2zm-91.3 132.4c-3.4 0-6.3-2.7-6.3-6.3 0-3.4 2.7-6.3 6.3-6.3s6.3 2.7 6.3 6.3c-0.2 3.6-2.9 6.3-6.3 6.3zm93.4-16.9h-186.8v-106.7h186.7l0.1 106.7z'/></svg>",
			
			//medal
			"<svg class='small_icon' height='20px' enable-background='new 0 0 250 250' version='1.1' viewBox='0 0 250 250' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'> <style type='text/css'>.st0{fill:#085156;}</style><path class='st0' d='m189 127.1c3.9-8.7 6-18.4 6-28.5 0-38.7-31.4-70.1-70.1-70.1s-70.1 31.4-70.1 70.1c0 10.1 2.1 19.7 6 28.4l-11.7 11.7-33 33.2 41.3 8 8.3 41.5 53-53.1c2 0.2 4.1 0.3 6.2 0.3s4.2-0.1 6.3-0.3l19.9 19.9 33 33.2 8.3-41.5 41.3-8-44.7-44.8zm-13.2-29c0 28.1-22.8 50.9-50.9 50.9s-50.9-22.8-50.9-50.9 22.8-50.9 50.9-50.9 50.9 22.8 50.9 50.9z'/></svg>",
			
			//nomination
			"<svg class='small_icon' height='20px' enable-background='new 0 0 250 250' version='1.1' viewBox='0 0 250 250' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'><style type='text/css'>.st0{fill:#085156;}</style><path class='st0' d='m56 167.9c-2-7.8-3.1-16-3.1-24.4v-42.1h-39.8l18.4 33.2-18.4 33.2h42.9v0.1z'/><path class='st0' d='m196.5 102.5v42.1c0 8.4-1.1 16.6-3.1 24.4h43.6l-16-33.2 15.9-33.2-40.4-0.1z'/><rect class='st0' x='66.5' y='70' width='117' height='99'/></svg>",
			
			//award
			"<svg class='small_icon' height='20px' enable-background='new 0 0 250 250' version='1.1' viewBox='0 0 250 250' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'><style type='text/css'>.st0{fill:#085156;} </style><path class='st0' d='M56,163.5c-2-7.8-3.1-16-3.1-24.4V97H13.1l18.4,33.2l-18.4,33.2H56V163.5z'/><path class='st0' d='m196.5 98.1v42.1c0 8.4-1.1 16.6-3.1 24.4h43.6l-16-33.2 15.9-33.2-40.4-0.1z'/>	<path class='st0' d='m123.2 200c31.9 0 58-26 58-58v-90h-115.9v90c0 31.9 26 58 57.9 58zm-35.8-94.8l15.6-4.6c2.6-0.8 6.1-3.4 7.8-5.6l9.3-13.4c1.6-2.3 4.1-2.3 5.8 0l9.3 13.4c1.6 2.3 5.1 4.9 7.8 5.6l15.6 4.6c2.6 0.8 3.5 3.3 1.8 5.5l-9.9 12.9c-1.8 2.3-3 6.4-3 9.1l0.5 16.3c0.1 2.8-2 4.4-4.6 3.4l-15.4-5.5c-2.6-0.9-7-0.9-9.6 0l-15.4 5.5c-2.6 0.9-4.8-0.6-4.6-3.4l0.5-16.3c0.1-2.8-1.3-6.9-3-9.1l-9.9-12.9c-2.1-2.3-1.3-4.7 1.4-5.5z'/></svg>"
			
		];
		
			$(where_to_append).append("<div class='column full_size general_p'>"+ 
									  "<div class='team_information_wrapper'><h2>"+team_to_print.team_name+" ("+team_to_print.year+")"+"</h2></div>"+
									  "<div class='team_information_wrapper institution'><p>"+svgs_coordinates[0]+"<b>Institution: </b> "+team_to_print.institution+"</p></div>"+
									  "<div class='clear'></div>"+
									  "<div class='team_information_wrapper'>"+
									  "<p>"+svgs_coordinates[1]+"<b>Location: </b> "+team_to_print.location+
									  "<br>"+svgs_coordinates[2]+"<b>Region: </b> "+team_to_print.region+"</p>"+
									  "</div>"+
									  "<div class='team_information_wrapper'>"+
									  "<p>"+svgs_coordinates[3]+"<b>Section: </b>"+team_to_print.section+
									  "<br>"+svgs_coordinates[4][team_to_print.track]+"<b>Track: </b> "+team_to_print.track+"</p>"+
									  "</div>"+		
									  "<div class='team_information_wrapper'>"+
									  "<p>"+svgs_coordinates[5]+"<b>Registry: </b> <a href='"+team_to_print.parts_link+"'> Team Parts </a>"+
									  "<br>"+svgs_coordinates[6]+"<b>Wiki: </b> <a href='"+team_to_print.wiki_link+"'> Team Website </a>"+
									  "</div>"+	
									  "<div class='clear'></div>"+
									  "<p>"+svgs_coordinates[7]+"<b>Medal: </b> "+team_to_print.medal+
									  "<br>"+svgs_coordinates[8]+"<b>Nomination: </b> "+team_to_print.nomination+
									  "<br>"+svgs_coordinates[9]+"<b>Award: </b> "+team_to_print.award+"</p>"+
									  "<div class='clear'></div>"+
									  "<div class='line_divider soft'></div>"+
									  "<div class='clear extra_space'></div>"+
									  "<h4>"+team_to_print.title+"</h4>"+
									  "<p>"+team_to_print.abstract+"</p></div>"+
									  "<div class='clear extra_space'>");
		
	}
									 			  
	//this is the main search and filter function 
	function search_request(all_teams_info){
	
		//variable to check if the search can be done
		var requested_a_search = true;
		
		//create a temp object for searching 
		var current_team_obj ={};
		
		//list of objects to hold all the results
		var found_teams =[];
		
		//remove any results from previous searches, 
		$("#filtered_results").empty();

		
		//get the values to search for each category, replace all '_' with " "
		var values_to_search = {
			location: ($('#country_list').val()).replace(/_/g, " "),
			track: ($('#track_list').val()).replace(/_/g, " "),
			section: ($('#section_list > li.selected_subcategory').attr('id')).replace(/_/g, " "),
			region: ($('#region_list > li.selected_subcategory').attr('id')).replace(/_/g, " "),
			medal: ($('#medal_list > li.selected_subcategory').attr('id')).replace(/_/g, " "),
			award: ($('#awards_list').val()).replace(/_/g, " "),
			keyword: $('#keyword').val(),
			year: $('#year_list').val(),
			institution: $('#institution').val()
		};
		
		//get what categories is the user searching in 
		var categories_being_searched = $('.showing').attr('id');
	
		console.log(values_to_search)
		//searching in General information for : location, track, section and/or region
		if(categories_being_searched == 'general_information'){
			
			// if the user hasn't selected any particular category, display all results 
			if(values_to_search.location == 'all' &&
			 values_to_search.track == 'all' && values_to_search.section =='all'
			  && values_to_search.region =='all' && values_to_search.medal == 'all'
			   && values_to_search.award == 'all' && values_to_search.keyword == ''
			   && values_to_search.institution == '' && values_to_search.year == 'all'
			   ) {

				r = Math.floor(Math.random() * all_teams_info.length); 

				$("#filtered_results").append("<p> Nothing in mind? Here is a random team:</p></div>"+
										  "<div class='clear extra_space'>");

				print_this_team("#filtered_results", all_teams_info[r]);

				requested_a_search = false ;

			}  
			
		
			
			//if user selected at least one category, let's search for it!
			if(requested_a_search == true){

				for (x=0; x< all_teams_info.length; x++){

					//populate temp object with current team
					current_team_obj = all_teams_info[x];
	
				//depending on what category the user is looking, search those subcategories 
				
					if( (current_team_obj.location == values_to_search.location || values_to_search.location == 'all') &&
						(current_team_obj.track == values_to_search.track || values_to_search.track == 'all' ) &&
						(current_team_obj.year == values_to_search.year || values_to_search.year == 'all' ) &&
						((current_team_obj.abstract).includes(values_to_search.keyword) == true) &&
						((current_team_obj.institution.toLowerCase()).includes(values_to_search.institution.toLowerCase()) == true) &&
						(current_team_obj.section == values_to_search.section || values_to_search.section == 'all' ) &&
						(current_team_obj.region == values_to_search.region || values_to_search.region == 'all' ) &&
						(current_team_obj.medal == values_to_search.medal || values_to_search.medal == 'all') &&
					  (((current_team_obj.award).includes(values_to_search.award) == true ) ||  ((current_team_obj.nomination).includes(values_to_search.award) == true) || 
						values_to_search.award == 'all' ) ) {
						
						found_teams.push(current_team_obj);
						
					}
					
					
				}
			
			}
	
		}
		


		
		if(requested_a_search == true){

			$("#filtered_results").append("<h3> Found "+found_teams.length+" result(s).</h3>");
			
			//once the search is complete print results 
			for( x=0; x< found_teams.length; x++) {

				print_this_team("#filtered_results", found_teams[x]);
		 
			}
			
		}
	}

	//this will enable and disable filters depending on other being selected
	function special_conditions(){
		
		
		//if a region is selected, don't allow the user to search by country
		//note, this will be improved later on 
		var region_filter = $("#region_list > .selected_subcategory").attr('id');

		if (region_filter != "all"){
			//reset to default
			$("#country_list > option[value='all']").attr('selected', true);
			$("#country_list option:eq(0)").prop("selected", true);
			
			//disable
			$("#country_list").prop("disabled", true);
		}
		else {
			//enable
			$("#country_list").prop("disabled", false);
		}
		
		
		
		
		//if high school section is selected, disable the tracks 
		var section_filter = $("#section_list > .selected_subcategory").attr('id');

		if (section_filter == "High_School"){
			//reset to default
			$("#track_list > option[value='all']").attr('selected', true);
			$("#track_list option:eq(0)").prop("selected", true);
			
			//disable
			$("#track_list").prop("disabled", true);
		}
		else {
			//enable
			$("#track_list").prop("disabled", false);
		}
		
		
		// if the user, selected undergrad or overgrad sections, disable the high school track
		if(section_filter == "Undergrad" || section_filter == "Overgrad"){
			
			$("#track_list > option[value='High_School']").prop("disabled", true);
		
		}
		else{
			
			$("#track_list > option[value='High_School']").prop("disabled", false);
		}
		

}

