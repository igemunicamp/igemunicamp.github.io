import setupForm from './forms.js';
import { searchRequest } from './search.js';

//generate team and country list - once it is done, it will call the function to enable the search button
setupForm();
var searchstr = 'http://127.0.0.1:8000/projects/';
searchstr = searchstr + window.location.search + '&format=json';
searchRequest(searchstr);



