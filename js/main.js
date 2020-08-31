var app = new Vue({
 el: '#app',
 data: {
        results 			: " ",
        responseAvailable	: false,
        client_key			: 'b0c253c9aa2debe',
        section				: 'top',
        viral 				: 'true',
        window 				: 'all',
        sort				: 'top',
    },
	created(){
		this.getImugr();
	},
	computed:{
		 filteredResults() {
		    return this.results.filter( el => typeof(el.images) !== 'undefined' && el.images[0].type != 'video/mp4')
		 }
	},
	methods:{
		getImugr(){
			document.body.classList.add('loading_state');
			this.responseAvailable = false;

			fetch("https://api.imgur.com/3/gallery/"+this.section+"/"+this.sort+"/"+this.window+"/1?showViral="+this.viral+"&mature=true&album_previews=true", {
			    "method": "GET",
			    "headers": {
			        "Authorization": "Client-ID "+this.client_key
			    }
			})
			.then(response => { 
			    if(response.ok){
			        return response.json()    
			    } else{
			        alert("Server returned " + response.status + " : " + response.statusText);
			    }                
			})
			.then(response => {
			    this.results = response.data; 
			    this.responseAvailable = true;
			})
			.catch(err => {
			    console.log(err);
			});
		},
		activeImage(event){
			event.target.parentElement.parentElement.classList.add('active');
			document.body.classList.add('active_image');
		},
		closeImage(event){
			event.target.parentElement.classList.remove('active');
			document.body.classList.remove('active_image');
		},
		lazyloader(){
			var lazyLoadInstance = new LazyLoad({});
			setTimeout(function() {
			        lazyLoadInstance.update();
			        document.body.classList.remove('loading_state');
			    }, 1000)
		}
	}
})
