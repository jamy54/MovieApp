$(document).ready(function () {
    var web="https://api.themoviedb.org/3/",
        modeUpcoming="movie/upcoming",
        modeLatest="movie/now_playing",
        modePopular="movie/popular",
        modeTop="movie/top_rated",
        id,
        movieById="movie/",
        api="?api_key=f0a79ca1977d6244779472576361db6f";

    singleMovieInfo=function(id,imageUrl,imdbId,title){
        $("#MovieList").hide();
        $("#singleMovieInfo").show();
        //alert('s');
        var img = new Image();
        var width,height;
        img.src=imageUrl+api;

        if(imdbId) {
            $.ajax({
                type: 'GET',
                url: "http://www.omdbapi.com/?i=" + imdbId + "&plot=full&r=json",
                data: {get_param: 'value'},
                success: function (data) {
                    var obj = jQuery.parseJSON(data);
                    var plot = obj.Plot;
                    var actor = obj.Actors;

                    document.getElementById("singleMovieInfo").innerHTML =
                        "<div class='singleMovieContent'>" +
                        '<div class="movieImage"><img src=' + img.src + ' width=' + img.width / 2 + ' height=' + img.height / 2 + '></img></div>' +
                        "<div class='movieContent' style='margin-left: 35%;'>" +
                        "<h1>" + title + "</h1>" + "<small> Rating: <em>" + obj.imdbRating + "</em> <span style='float: right'>Release:<em>" + obj.Released + "</em></span></small><br>" +
                        plot + "<br><br><br>Genere: "+obj.Genre+"<br> Actor: " + actor + "<br>Director: "+obj.Director+
                        "</div>" +
                        "<div style='clear: both'></div></div>";
                },
                error: function () {
                    alert('fails')
                }
            });
        }
        else{document.getElementById("singleMovieInfo").innerHTML ="<h2>Not Found</h2>"}
    }
    function upcomingMovies(theUrl,typeTitle){
        $("#MovieList").show();
        $.ajax({
            type: 'GET',
            url: theUrl,
            data: { get_param: 'value' },
            success: function (data) {
                console.log(theUrl);
                //console.log(data.data.length);
                document.getElementById("MovieList").innerHTML =  "<h2>"+typeTitle+"</h2>";
                for(i=0;i<data.results.length;i++){
                    //console.log(data.results[i]['original_title']);
                    id=data.results[i]['id'];
                    specificMovies(id,typeTitle);
                }
            },
            error: function(){
                alert('fails')
            }
        });
    }

    function specificMovies(mid,typeTitle){

        $.ajax({
            type: 'GET',
            url: web+movieById+mid+api,
            data: { get_param: 'value' },
            success: function (data) {
                if(data['title']!=null) {
                    var imagelink="http://image.tmdb.org/t/p/w500",
                        id=data['id'],
                        imdb_id=data['imdb_id'],
                        title=data['title'],
                        overview=data['overview'],
                        imagePath=data['poster_path'],
                        releasDate=data['release_date'],
                        rating=data['vote_count'];

                    var img = new Image();
                    var width,height;
                    img.src=imagelink+imagePath+api;

                    document.getElementById("MovieList").innerHTML +=
                        "<div class='singleMovieContent'>" +
                            '<div class="movieImage"><img src='+img.src+' width='+img.width/4+' height='+img.height/4+'></img></div>'+
                            "<div class='movieContent'>" +
                                "<h1><a href='#' onclick='singleMovieInfo("+id+',"'+imagelink+imagePath+'","'+imdb_id+'","'+title+'"'+")'>"+data['title']+"</a></h1>"+
                                data['overview']+
                            "</div>"+
                        "<div style='clear: both'></div></div>";
                }

            },
            error: function(){
                alert('fails')
            }
        });
    }
    $("#upcomingMovie").click(function() {
        //singleMovieInfo
        $("#singleMovieInfo").hide();
        upcomingMovies(web+modeUpcoming+api,"Upcoming Movies");
    });

    $("#topMovies").click(function() {
        $("#singleMovieInfo").hide();
        upcomingMovies(web+modeTop+api,"Top Movies");
    });

    $("#latestMovies").click(function() {
        $("#singleMovieInfo").hide();
        upcomingMovies(web+modeLatest+api,"Now Playing Movies");
    });


    $("#popularMovies").click(function() {
        $("#singleMovieInfo").hide();
        upcomingMovies(web+modeTop+api,"Popoular Movies");
    });
});