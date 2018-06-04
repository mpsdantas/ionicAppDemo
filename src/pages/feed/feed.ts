import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-feed',
    templateUrl: 'feed.html',
    providers: [
        MoovieProvider
    ]
})
export class FeedPage {
    lista_filmes: any;
    public objeto_feed = {
        titulo: "Marcus Paulo",
        data: "November 5, 1955",
        descricao: "App legal",
        qntd_likes: 50,
        qntd_comments: 500,
        time_comment: "11h ago"
    }
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private movieProvider: MoovieProvider
    ) {
    }

    ionViewDidLoad() {
        this.movieProvider.getLatestMovies().subscribe(
            data => {
                const response = (data as any);
                const objeto_retorno = JSON.parse(response._body);
                this.lista_filmes = objeto_retorno.results;
            }, error => {
                console.log(error);
            }

        );
    }

}
