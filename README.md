# SpeekVideo

## Development

`npm start`

### Staging

Server

`npm run gateway`

Client

`npm run webapp`


### SSL Certificate localhost

```sh
mkdir -p server/private

# Generates a new private key
npm run gen-key

# Generates a self-signed certificate
npm run gen-cert

# Generates a new subscription request
# to send to a certification authority
npm run gen-csr
```

---

Visit [Nx Cloud](https://nx.app/) to learn more.
