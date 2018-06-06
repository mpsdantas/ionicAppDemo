import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';
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
    public loader;
    public refresher;
    public isRefreshing: boolean = false;
    public page = 1;
    public infinitScroll 
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
        private movieProvider: MoovieProvider,
        public loadingCtrl: LoadingController
    ) {
    }
    abreCarregando() {
        this.loader = this.loadingCtrl.create({
            content: "Carregando filmes..."
        });
        this.loader.present();
    }
    fecharCarregando() {
        this.loader.dismiss();
    }
    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        this.refresher = refresher;
        this.isRefreshing = true;
        this.carregarFilmes();
        /*setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);*/
    }
    ionViewDidEnter() { //Só carrega no ciclo de vida uma vez 
        this.abreCarregando();
        this.carregarFilmes();
    }
    abrirDetalhes(filme) {
        this.navCtrl.push(FilmeDetalhesPage, { id: filme.id })
    }
    doInfinite(infiniteScroll) {
        this.page++;
        this.infinitScroll = infiniteScroll;
        this.carregarFilmes(true);
    }
    carregarFilmes(newPage: boolean = false) {

        this.movieProvider.getLatestMovies(this.page).subscribe(
            data => {
                const response = (data as any);
                const objeto_retorno = JSON.parse(response._body);
                if(newPage){
                    this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
                    this.infinitScroll.complete();
                }else{
                    this.lista_filmes = objeto_retorno.results;
                }
                
                this.fecharCarregando();
                if (this.isRefreshing) {
                    this.refresher.complete();
                    this.isRefreshing = false;
                }
            }, error => {
                console.log(error);
                this.fecharCarregando();
                if (this.isRefreshing) {
                    this.refresher.complete();
                    this.isRefreshing = false;
                }
            }

        );
    }
}
