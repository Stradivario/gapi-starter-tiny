### Simplest @gapi Server!



#### Installation

```bash
npm install
```

#### Install Gapi CLI for starting the server globally
```bash
npm i -g @gapi/cli
```


#### Start the server
```bash
npm start
```

#### Fetch the status of the server
```bash
curl http://localhost:9000/graphql?query={status{status}}
```

#### Open Altair Graphql Playground

Open http://localhost:9000/altair