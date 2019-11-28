import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import GeneroCad from './pages/generoCad';
import GeneroList from './pages/generoList';
import LivroList from './pages/livroList';
import LivroCad from './pages/livroCad';
import AutorList from './pages/autorList';
import AutorCad from './pages/autorCad';
import EmprestimoList from './pages/emprestimoList';
import EmprestimoCad from './pages/emprestimoCad';
import EditoraList from './pages/editoraList';
import EditoraCad from './pages/editoraCad';
import EnderecoList from './pages/enderecoList';
import EnderecoCad from './pages/enderecoCad';
import ClienteList from './pages/clienteList';
import ClienteCad from './pages/clienteCad';
import Home from './pages/home';
const Routes = createAppContainer(
    createDrawerNavigator({
        Home: {
            screen: Home,
            navigationOptions: {
                drawerLabel: "Home"
            }
        },
        ListaEmprestimo: {
            screen: EmprestimoList,
            navigationOptions: {
                drawerLabel: "Lista de emprestimo"
            }
        },
        CadastroEmprestimo: {
            screen: EmprestimoCad,
            navigationOptions: {
                drawerLabel: "Cadastro de emprestimo"
            }
        },
        AutorCadastro: {
            screen: AutorCad,
            navigationOptions: {
                drawerLabel: "Cadastro de Autores"
            }
        },
        ListaAutor: {
            screen: AutorList,
            navigationOptions: {
                drawerLabel: "Lista de Autores"
            }
        },
        ListaEditora: {
            screen: EditoraList,
            navigationOptions: {
                drawerLabel: "Lista de editora"
            }
        },
        CadastroEditora: {
            screen: EditoraCad,
            navigationOptions: {
                drawerLabel: "Cadastro de editora"
            }
        },
        ListaLivro: {
            screen: LivroList,
            navigationOptions: {
                drawerLabel: "Lista de livro"
            }
        },
        CadastroLivro: {
            screen: LivroCad,
            navigationOptions: {
                drawerLabel: "Cadastro de Livro"
            }
        },
        ListaGenero: {
            screen: GeneroList,
            navigationOptions: {
                drawerLabel: "Lista de genero"
            }
        },
        CadastroGenero: {
            screen: GeneroCad,
            navigationOptions: {
                drawerLabel: "Cadastro de genero"
            }
        },
        ListaEndereco: {
          screen: EnderecoList,
          navigationOptions: {
            drawerLabel: "Lista de endereço"
          }
        },
        CadastroEndereco: {
          screen: EnderecoCad,
          navigationOptions: {
            drawerLabel: "Cadastro de endereço"
          }
        },
        ListaCliente: {
          screen: ClienteList,
          navigationOptions: {
            drawerLabel: "Lista de cliente"
          }
        },
        CadastroCliente: {
          screen: ClienteCad,
          navigationOptions: {
            drawerLabel: "Cadastro de cliente"
          }
        }
    })
);
export default Routes;