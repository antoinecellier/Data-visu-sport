module.exports = function (grunt){
	grunt.initConfig({
		compass: {                 
			dev : {
		   		options: {
		      		httpPath : '/',     
					sassDir: ['assets/sass'],
					cssDir: ['assets/stylesheets'],
					imagesDir: ['assets/sass/img'],
					fontsDir: ['assets/fonts'],
					relativeAssets: false,
		        	noLineComments: false
		      	}
		   } 
		},
       express: {
            dev: {
                options: {
                	script: 'server.js',
                    port: 8080,
                    delay: 1000,
                    background: true,
                }
            }
        },
	    watch: {
	    	css: {
	    		files: 'assets/sass/*.scss',
	    		tasks: ['compass:dev']
	    	},
	    	express : {
	    		files : ['server.js'],
	    		tasks: ['express:dev'],
	    		options: {
		        	spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
		      	}
	    	}
	    }
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['express:dev','watch']);
}