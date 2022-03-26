import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts/Posts';
import { loadPosts } from '../../utilitys/load-posts';
import { Button } from '../../components/Button/Button';
import { TextInput } from '../../components/TextInput/TextInput';

export class Home extends Component {

  //ESTADOS GLOBAIS DO MEU CODIGO
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  }

  //COMPONENT DIDMOUNT QUE EXECUTA TODA VEZ QUE O ESTADO É ALTERADO
  async componentDidMount() {
    await this.loadPosts();
  }

  //FUNÇAO ASSINCRONA QUE CARREGA OS DADOS DA REQUISIÇAO DAS IMAGENS E POSTS
  loadPosts = async () => {
    

    const {page, postsPerPage} = this.state;
    
    const postAndPhotos = await loadPosts();
    
    this.setState({
      posts: postAndPhotos.slice(page, postsPerPage),
      allPosts: postAndPhotos,
    });

  }

  //FUNÇAO QUE CARREGA MAIS CARDS NA TELA
  loadMorePosts = () =>{
    
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    this.setState({posts, page: nextPage})

  }

  //FUNÇAO QUE EXECUTA TODA VEZ QUE O VALOR DO INPUT É ALTERADO
  handleChange = (e) =>{
    const { value } = e.target;
    this.setState({searchValue: value});
  }

  //FUNÇAO RENDER 
  render() {

    //VARIAVEIS
    const { posts,  page, postsPerPage, allPosts,searchValue } = this.state;
    const  noMorePosts = page + postsPerPage >= allPosts.length;
    
    //CONDIÇAO PARA FILTRAR OS POSTS DE ACORDO COM O INPUT DIGITADO
    const filteredPosts = !!searchValue ? 
      posts.filter(post =>{
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      })
      : posts;

    return (
      //CONTAINER CONTENDO OS POSTS
      <section className="container">
        <div className="search-container">
          {/*INPUT USADO PRA REALIZAR PESQUISA*/}
          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>
        {/*CONDIÇAO QUE MOSTRA OS POSTS NA TELA CASO A QUANTIDADE SEJA MAIOR QUE 0*/}
        <Posts posts={ filteredPosts }/>
        {/*BOTÃO QUE CARREGA MAIS POSTS AO SER ACIONADO */}
        <div className="button-container">
          <Button
            searchValue={searchValue}
            text="Load more posts"
            onClick={this.loadMorePosts}
            disabled={noMorePosts}  
          /> 
        </div>
      </section>
    );
  }
}

