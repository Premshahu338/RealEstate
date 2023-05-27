var primary = sessionStorage.getItem("primary") || '#000';
var secondary = sessionStorage.getItem("secondary") || '#ba895d';

window.vihoAdminConfig = {
	// Theme Primary Color
	primary: primary,
	// theme secondary color
	secondary: secondary,
};





// defalt layout
$("#default-demo").click(function(){      
    sessionStorage.setItem('page-wrapper', 'page-wrapper compact-wrapper');
    sessionStorage.setItem('page-body-wrapper', 'sidebar-icon');
});


// compact layout
$("#compact-demo").click(function(){   
    sessionStorage.setItem('page-wrapper', 'page-wrapper compact-wrapper compact-sidebar');
    sessionStorage.setItem('page-body-wrapper', 'sidebar-icon');
});



// modern layout
$("#modern-demo").click(function(){   
    sessionStorage.setItem('page-wrapper', 'page-wrapper compact-wrapper modern-sidebar');
    sessionStorage.setItem('page-body-wrapper', 'sidebar-icon');
});