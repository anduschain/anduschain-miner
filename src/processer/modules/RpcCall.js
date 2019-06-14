import { post } from 'request';
import { nodeOption } from '../config';

const RpcCall = (method, params, id) => {
    let options = {
        method: 'POST',
        url: `http://localhost:${nodeOption.rpcPort[1]}`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            method: method,
            params: params,
            id: id
        })
    };

    return new Promise((resolve, reject) => {
        post(options, (err, res, body) => {
            if (!err) {
                resolve(JSON.parse(body));
            } else {
                reject(err);
            }
        });
    })
};


export default RpcCall;
