const Pusher = require('pusher');
const compilerun = require('compile-run');

var pusher = new Pusher({
    appId: '914079',
    key: '9825537940e24e3e22f3',
    secret: 'e97f7f16e709f925842d',
    cluster: 'mt1',
    encrypted: true
  });
module.exports = {
    compileCode: (req, res, next) => {
        const sourceCode = req.body.sourceCode;
        console.log('Params=>', req.params)
        const compileResultPromise = compilerun[req.params.language].runSource(sourceCode);
        compileResultPromise.then(result => res.send(result))
            .catch(err => res.send(err));
    },

    updateEditor: (req, res, next) => {
        console.log(req.body);
        pusher.trigger(`editor-${req.params.id}`, 'text-update', {
            ...req.body,
        });
        res.status(200).send('OK');
    }
}