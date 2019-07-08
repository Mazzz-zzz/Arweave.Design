import Arweave from 'arweave/web';

const arweave = Arweave.init({
    host: '45.77.54.133',
    port: 1984
});

console.log("yolo")
arweave.wallets.generate().then((key) => {
    console.log(key);
