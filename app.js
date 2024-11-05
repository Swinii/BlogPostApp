import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];

app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

app.get('/new-post', (req, res) => {
    res.render('new-post');
});

app.post('/new-post', (req, res) => {
    const post = {
        id: Date.now().toString(),
        title: req.body.title,
        content: req.body.content
    };
    posts.push(post);
    res.redirect('/');
});

app.get('/edit-post/:id', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    res.render('edit-post', { post: post });
});

app.post('/edit-post/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === req.params.id);
    posts[postIndex].title = req.body.title;
    posts[postIndex].content = req.body.content;
    res.redirect('/');
});

app.post('/delete-post/:id', (req, res) => {
    posts = posts.filter(p => p.id !== req.params.id);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
