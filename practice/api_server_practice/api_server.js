let express = require('express')

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world!\n');
})

app.get('/users', (req, res) => {
    // res에 response 정보들이 담겨 있다.
    // console.log(res)
    return res.json(users)
});

app.get('/users/:id', (req, res) => {
    // req의 params로 변수화된 id 조회 가능.
    console.log(req.params.id)

    const id = ParseInt(req.params.id, 10);
    if(!id){
        return res.status(400).json({err: 'Incorrect id'})
    }
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});




let users = [
    {
        id: 1,
        name: 'Hyun'
    },
    {
        id: 2,
        name: 'Alice'
    },
    {
        id: 3,
        name: 'Kelly'
    }
]






