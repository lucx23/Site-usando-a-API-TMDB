const axios = require('axios');
const apiKey = process.env.API_KEY;


module.exports = {
    async filmesPopulares(req, res) {
        const pagina = req.query.page || 1
        try {
            const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey + '&language=pt-BR&page=' + pagina);

            const filmes = response.data.results;
            res.render('pages/filmes-populares', { filmes, error: null, paginaAtual: parseInt(pagina), totalPaginas: response.data.total_pages });
        } catch (error) {
            console.error('Erro ao buscar filmes populares:', error.response?.data || error.message);
            res.status(500).render('pages/filmes-populares', {
                filmes: [],
                error: 'Nao foi possivel carregar os filmes agora. Tente novamente em instantes.', 
                paginaAtual: 1,
                totalPaginas: 1
            });
        }
    },

    async filmes(req, res) {
        const filmes = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey + '&language=pt-BR&page=1');
        res.render('pages/filmes-populares', { filmes: filmes.data.results });
    },

    async detalhesFilme(req, res) {
        const filmeId = req.params.id;

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=pt-BR`);
            const filme = response.data;
            res.render('pages/detalhes-filme', { detalhes: [filme], error: null });
        } catch (error) {
            console.error('Erro ao buscar detalhes do filme:', error.response?.data || error.message);
            res.status(500).render('pages/detalhes-filme', {
                detalhes: [],
                error: 'Nao foi possivel carregar os detalhes do filme agora. Tente novamente em instantes.',
            });
        }
    },

    async buscarFilme(req, res) {
        const query = (req.query.buscar || '').trim();

        if (!query) {
            return res.render('pages/resultado-pesquisa', {
                filmes: [],
                query: '',
                error: null,
            });
        }

        
        if(query == ' ') {
            return res.render('pages/resultado-pesquisa', {
                filmes: [],
                query: '',
                error: null,
            });
        }
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(query)}&page=1&include_adult=false`);
            const filmes = response.data.results;
            res.render('pages/resultado-pesquisa', { filmes, query, error: null });
        } catch (error) {
            console.error('Erro ao buscar filmes:', error.response?.data || error.message);
            res.status(500).render('pages/resultado-pesquisa', {
                filmes: [],
                query,
                error: 'Nao foi possivel carregar os filmes agora. Tente novamente em instantes.',
            });
        }
    }
}