import setupForm from './forms.js';
import { searchRequest } from './search.js';

//generate team and country list - once it is done, it will call the function to enable the search button
setupForm();
var searchstr = 'https://igemapi.herokuapp.com/projects/';
searchstr = searchstr + window.location.search + '&format=json';
searchRequest(searchstr);



