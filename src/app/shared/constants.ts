
import { environment } from '../../environments/environment';

export class AppSettings {
    public static YOUTUBE_API_KEY: string = 'AIzaSyBgJ0KTiDr4VQKrAJ9-BmR7oMFMivAksEc';
    //public static  SOLR_SERVER_PATH: string = 'http://ec2-34-209-114-162.us-west-2.compute.amazonaws.com:8983/solr/';
    public static SOLR_SERVER_PATH: string = (environment.production) ? 'http://ec2-34-209-114-162.us-west-2.compute.amazonaws.com:8983/solr/' : 'http://10.0.0.106:8983/solr/';
    public static EXPRESS_API_PATH: string = 'localhost';
    public static base_url: string = 'https://www.googleapis.com/youtube/v3/';
    public static max_results: number = 12;
    public static LOCATION_SERVICE_PATH: string = 'http://api.hostip.info/get_json.php';

}


