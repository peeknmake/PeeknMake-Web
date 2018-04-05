
module.exports = Object.freeze({
    YOUTUBE_SEARCH_URL : 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBgJ0KTiDr4VQKrAJ9-BmR7oMFMivAksEc&videoEmbeddable=true',
    YOUTUBE_VIDEO_URL : 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBgJ0KTiDr4VQKrAJ9-BmR7oMFMivAksEc&videoEmbeddable=true',
    SOLR_URI : (process.env.NODE_ENV == 'DEV') ? 'http://10.0.0.106:8983/solr/foodx' :'http://ec2-34-209-114-162.us-west-2.compute.amazonaws.com:8983/solr/foodx',
    SOLR_LOC_URI : (process.env.NODE_ENV == 'DEV') ? 'http://10.0.0.106:8983/solr/location' :'http://ec2-34-209-114-162.us-west-2.compute.amazonaws.com:8983/solr/location',
    MAX_COUNT :50,
    LOGLVEL:'info',
    WORKING_DIR : '/Users/bhabanidas/Work/DATA/foodxdata',
});